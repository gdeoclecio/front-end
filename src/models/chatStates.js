/**
 * @typedef {'idle'|'loading-history'|'sending'|'retry'} ChatStatus
 *
 * Máquina de estados do chat:
 *   idle ──► loading-history ──► idle (sucesso)
 *   idle ──► sending ──► idle (sucesso)
 *   idle ──► loading-history ──► error
 *   idle ──► sending ──► error
 *   error ──► retry ──► loading-history (retry histórico)
 *   error ──► retry ──► sending (retry envio)
 *   retry ──► idle (sucesso)
 *   retry ──► error (falha)
 */

export const CHAT_STATUS = {
  IDLE: 'idle',
  LOADING_HISTORY: 'loading-history',
  SENDING: 'sending',
  RETRY: 'retry',
};

/**
 * Códigos de erro estruturados.
 * Cada código indica a origem do problema para tratamento direcionado.
 */
export const CHAT_ERROR = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  RAG: 'RAG_ERROR',
  LLM: 'LLM_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN: 'UNKNOWN',
};

/**
 * @typedef {Object} ChatError
 * @property {string}   code        - Código do erro (CHAT_ERROR.*)
 * @property {string}   message     - Mensagem amigável para o usuário
 * @property {*}        [details]   - Informações técnicas (opcional)
 * @property {boolean}  recoverable - Se a operação pode ser repetida
 * @property {number}   [httpStatus] - Status HTTP (se aplicável)
 */

/**
 * Cria um objeto de erro estruturado a partir de uma exceção.
 *
 * @param {Error} err          - Exceção capturada
 * @param {string} [fallback]  - Mensagem padrão se err não tiver resposta
 * @returns {ChatError}
 */
export function createChatError(err, fallback) {
  if (!err) {
    return {
      code: CHAT_ERROR.UNKNOWN,
      message: fallback || 'Erro desconhecido.',
      details: null,
      recoverable: true,
      httpStatus: 0,
    };
  }

  const response = err.response;
  const httpStatus = response?.status || 0;
  const serverMessage = response?.data?.message || response?.data?.error;
  const message = serverMessage || fallback || err.message || 'Erro inesperado.';

  if (!response) {
    return {
      code: CHAT_ERROR.NETWORK,
      message: 'Servidor indisponível. Verifique sua conexão.',
      details: message,
      recoverable: true,
      httpStatus: 0,
    };
  }

  if (httpStatus === 400) {
    return {
      code: CHAT_ERROR.VALIDATION,
      message,
      details: response.data,
      recoverable: false,
      httpStatus,
    };
  }

  if (httpStatus === 502 && message.includes('EMBEDDING')) {
    return {
      code: CHAT_ERROR.RAG,
      message: 'O sistema de busca não está disponível no momento.',
      details: message,
      recoverable: true,
      httpStatus,
    };
  }

  if (httpStatus === 502 && message.includes('LLM')) {
    return {
      code: CHAT_ERROR.LLM,
      message: 'O modelo de IA não está disponível no momento.',
      details: message,
      recoverable: true,
      httpStatus,
    };
  }

  if (httpStatus === 504 || httpStatus === 408) {
    return {
      code: CHAT_ERROR.TIMEOUT,
      message: 'A consulta excedeu o tempo limite. Tente novamente.',
      details: message,
      recoverable: true,
      httpStatus,
    };
  }

  return {
    code: CHAT_ERROR.UNKNOWN,
    message,
    details: response.data,
    recoverable: httpStatus >= 500 || httpStatus === 0,
    httpStatus,
  };
}

/**
 * Verifica se o erro permite tentativa de recuperação.
 *
 * @param {ChatError} chatError
 * @returns {boolean}
 */
export function isRecoverable(chatError) {
  return chatError?.recoverable === true;
}
