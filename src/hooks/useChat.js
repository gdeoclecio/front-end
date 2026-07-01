import { useState, useCallback, useEffect, useRef } from 'react';
import { messageService } from '../services/messageService';
import { ROLES } from '../utils/constants';
import { normalizeMessage } from '../models/message';
import { CHAT_STATUS, createChatError, isRecoverable } from '../models/chatStates';

/**
 * Hook que gerencia estado e ações do chat para uma sessão específica.
 *
 * Opera como uma máquina de estados com transições controladas:
 *   idle ──► loading-history ──► idle   (sucesso)
 *   idle ──► loading-history ──► error  (falha)
 *   idle ──► sending ──► idle           (sucesso)
 *   idle ──► sending ──► error          (falha)
 *   error ──► retry ──► idle            (retry sucesso)
 *   error ──► retry ──► error           (retry falha)
 *
 * Cada mensagem do assistente pode conter um array de `sources` (RAG).
 * Mensagens de usuário sempre têm `sources = []`.
 *
 * @param {string|null} sessionId - ID da sessão ativa
 * @returns {{
 *   messages,
 *   status,
 *   isLoadingHistory: boolean,
 *   isSending: boolean,
 *   loading: boolean,
 *   error: string|null,
 *   chatError: ChatError|null,
 *   isRecoverable: boolean,
 *   sendMessage,
 *   retryLast,
 *   loadHistory,
 *   clearMessages,
 * }}
 */
export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(CHAT_STATUS.IDLE);
  const [error, setError] = useState(null);
  const prevSessionId = useRef(null);
  const activeSessionRef = useRef(sessionId);
  const retryContextRef = useRef(null);


  // ─── Helpers internos ──────────────────────────────────────────

  /** Substitui todo o array de mensagens (loadHistory). */
  const replaceMessages = useCallback((rawMessages) => {
    const normalized = (rawMessages || [])
      .map(normalizeMessage)
      .filter(Boolean);
    setMessages(normalized);
  }, []);

  /** Adiciona mensagens ao final do array (sendMessage / retry). */
  const appendMessages = useCallback((rawMessages) => {
    const normalized = rawMessages
      .map(normalizeMessage)
      .filter(Boolean);
    if (normalized.length === 0) return;
    setMessages((prev) => [...prev, ...normalized]);
  }, []);

  // ─── Carregamento de histórico ─────────────────────────────────

  const loadHistory = useCallback(async () => {
    if (!sessionId) return;
    setStatus(CHAT_STATUS.LOADING_HISTORY);
    setError(null);
    try {
      const data = await messageService.getBySession(sessionId);
      if (activeSessionRef.current !== sessionId) return;
      replaceMessages(data.messages);
      setStatus(CHAT_STATUS.IDLE);
    } catch (err) {
      if (activeSessionRef.current !== sessionId) return;
      setError(createChatError(err, 'Erro ao carregar histórico.'));
      setStatus(CHAT_STATUS.ERROR);
      replaceMessages([]);
    }
  }, [sessionId, replaceMessages]);

  // ─── Envio de mensagem ─────────────────────────────────────────

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !sessionId) return;

      retryContextRef.current = { type: 'send', text: text.trim() };
      setStatus(CHAT_STATUS.SENDING);
      setError(null);

      try {
        const data = await messageService.send({
          sessionId,
          role: ROLES.USER,
          content: text.trim(),
        });

        if (activeSessionRef.current !== sessionId) return;

        const batch = [];
        if (data.userMessage) batch.push(data.userMessage);
        if (data.assistantMessage) batch.push(data.assistantMessage);

        appendMessages(batch);
        setStatus(CHAT_STATUS.IDLE);
        retryContextRef.current = null;
      } catch (err) {
        if (activeSessionRef.current !== sessionId) return;
        setError(createChatError(err, 'Erro ao enviar mensagem.'));
        setStatus(CHAT_STATUS.ERROR);
      }
    },
    [sessionId, appendMessages],
  );

  // ─── Retry ─────────────────────────────────────────────────────

  const retryLast = useCallback(async () => {
    const ctx = retryContextRef.current;
    if (!ctx) return;

    setStatus(CHAT_STATUS.RETRY);
    setError(null);

    try {
      const data = await messageService.send({
        sessionId,
        role: ROLES.USER,
        content: ctx.text,
      });

      if (activeSessionRef.current !== sessionId) return;

      const batch = [];
      if (data.userMessage) batch.push(data.userMessage);
      if (data.assistantMessage) batch.push(data.assistantMessage);

      appendMessages(batch);
      setStatus(CHAT_STATUS.IDLE);
      retryContextRef.current = null;
    } catch (err) {
      if (activeSessionRef.current !== sessionId) return;
      setError(createChatError(err, 'Erro ao reenviar mensagem.'));
      setStatus(CHAT_STATUS.ERROR);
    }
  }, [sessionId, appendMessages]);

  // ─── Limpeza ───────────────────────────────────────────────────

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setStatus(CHAT_STATUS.IDLE);
    retryContextRef.current = null;
  }, []);

  // ─── Troca de sessão ───────────────────────────────────────────

  useEffect(() => {
    activeSessionRef.current = sessionId;
    if (sessionId && sessionId !== prevSessionId.current) {
      prevSessionId.current = sessionId;
      setMessages([]);
      setError(null);
      setStatus(CHAT_STATUS.IDLE);
      retryContextRef.current = null;
      loadHistory();
    }
  }, [sessionId, loadHistory]);

  // ─── Saída ─────────────────────────────────────────────────────

  const isLoadingHistory = status === CHAT_STATUS.LOADING_HISTORY;
  const isSending = status === CHAT_STATUS.SENDING || status === CHAT_STATUS.RETRY;
  const loading = isLoadingHistory || isSending;
  const errorMessage = error?.message || null;

  return {
    messages,
    status,
    isLoadingHistory,
    isSending,
    loading,
    error: errorMessage,
    chatError: error,
    isRecoverable: error ? isRecoverable(error) : false,
    sendMessage,
    retryLast,
    loadHistory,
    clearMessages,
  };
}
