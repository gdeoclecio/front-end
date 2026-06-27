import { useState, useCallback, useEffect, useRef } from 'react';
import { messageService } from '../services/messageService';
import { ROLES } from '../utils/constants';

/**
 * Hook que gerencia estado e ações do chat para uma sessão específica.
 * Centraliza: envio de mensagens, carregamento de histórico e estado de loading/erro.
 */
export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevSessionId = useRef(null);

  const loadHistory = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.getBySession(sessionId);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar histórico.');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !sessionId) return;

      setLoading(true);
      setError(null);
      try {
        const data = await messageService.send({
          sessionId,
          role: ROLES.USER,
          content: text.trim(),
        });

        // Backend retorna { userMessage, assistantMessage }
        const newMessages = [];
        if (data.userMessage) newMessages.push(data.userMessage);
        if (data.assistantMessage) newMessages.push(data.assistantMessage);

        setMessages((prev) => [...prev, ...newMessages]);
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao enviar mensagem.');
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  // Carrega histórico quando sessionId muda
  useEffect(() => {
    if (sessionId && sessionId !== prevSessionId.current) {
      prevSessionId.current = sessionId;
      loadHistory();
    }
  }, [sessionId, loadHistory]);

  return { messages, loading, error, sendMessage, loadHistory, clearMessages };
}
