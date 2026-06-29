import api from './api';
import { normalizeMessage } from '../models/message';

/**
 * Serviço de comunicação com a API de mensagens.
 * Normaliza todas as respostas para garantir compatibilidade
 * com mensagens com e sem sources RAG.
 */
export const messageService = {

  /**
   * Envia uma mensagem do usuário.
   * A resposta inclui userMessage + assistantMessage,
   * onde assistantMessage pode conter sources do RAG.
   *
   * @param {Object} data - { sessionId, role, content }
   * @returns {Promise<{ userMessage: Message, assistantMessage: Message }>}
   */
  send: async (data) => {
    const response = await api.post('/api/messages', data);
    const body = response.data;

    return {
      userMessage: normalizeMessage(body.userMessage),
      assistantMessage: normalizeMessage(body.assistantMessage),
    };
  },

  /**
   * Busca o histórico de mensagens de uma sessão.
   * Mensagens mais antigas (pré-RAG) virão com sources = [].
   *
   * @param {string} sessionId - ID da sessão
   * @param {Object} [params] - Parâmetros de paginação (page, size, sort)
   * @returns {Promise<{ messages: Message[], page: number, size: number, totalElements: number, totalPages: number }>}
   */
  getBySession: async (sessionId, params) => {
    const response = await api.get(`/api/messages/${sessionId}`, { params });
    const body = response.data;

    return {
      ...body,
      messages: (body.messages || []).map(normalizeMessage),
    };
  },
};
