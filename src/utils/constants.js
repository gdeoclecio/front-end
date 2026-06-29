export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const UPLOAD_MAX_SIZE = Number(import.meta.env.VITE_UPLOAD_MAX_SIZE) || 10 * 1024 * 1024;

export const HEALTH_CHECK_INTERVAL = Number(import.meta.env.VITE_HEALTH_CHECK_INTERVAL) || 30000;

export const ALLOWED_FILE_TYPES = ['application/pdf', 'text/plain'];

export const ALLOWED_EXTENSIONS = '.pdf,.txt';

export const ROLES = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
};

/**
 * Score mínimo de similaridade semântica para considerar
 * um chunk como relevante (alinhado com MIN_SIMILARITY do backend).
 */
export const SOURCE_MIN_SCORE = 0.7;

/**
 * Nome do evento de log para rastrear uso de sources RAG.
 */
export const RAG_LOG_EVENT = '[RAG]';
