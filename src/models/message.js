/**
 * @typedef {Object} Source
 *
 * Representa um chunk de documento recuperado pelo pipeline RAG.
 *
 * @property {string}  chunkId      - ID único do chunk no banco vetorial
 * @property {string}  documentId   - ID do documento de origem
 * @property {string}  documentName - Nome do arquivo original (ex: "contrato.pdf")
 * @property {number}  chunkIndex   - Índice do chunk dentro do documento
 * @property {number}  score        - Similaridade semântica (0.0 a 1.0)
 */

/**
 * @typedef {Object} Message
 *
 * Representa uma mensagem do chat, enriquecida com sources do RAG
 * quando for uma resposta do assistente.
 *
 * @property {string}        id        - ID único da mensagem
 * @property {'USER'|'ASSISTANT'} role - Papel do remetente
 * @property {string}        content   - Conteúdo textual da mensagem
 * @property {string}        timestamp - ISO-8601 (ex: "2026-06-29T10:30:00Z")
 * @property {string|null}   [fileId]  - ID do arquivo anexado (opcional)
 * @property {Source[]}      sources   - Fontes RAG (sempre array; vazio se sem RAG)
 */

/**
 * Normaliza uma mensagem vinda da API para o formato interno do frontend.
 * Garante compatibilidade com mensagens antigas (sem sources).
 *
 * @param {Object|null|undefined} raw - Mensagem crua da API
 * @returns {Message|null} Mensagem normalizada ou null se entrada inválida
 */
export function normalizeMessage(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    role: raw.role,
    content: raw.content || '',
    timestamp: raw.timestamp,
    fileId: raw.fileId || null,
    sources: normalizeSources(raw.sources),
  };
}

/**
 * Normaliza a lista de sources vindas da API.
 * Mensagens antigas (pré-RAG) não terão o campo sources.
 *
 * @param {Array|undefined} rawSources - Sources cruas da API
 * @returns {Source[]} Sources normalizadas (sempre um array)
 */
export function normalizeSources(rawSources) {
  if (!rawSources || !Array.isArray(rawSources)) return [];

  return rawSources
    .filter((s) => s && s.chunkId && s.score != null)
    .map((s) => ({
      chunkId: s.chunkId,
      documentId: s.documentId || '',
      documentName: s.documentName || 'Documento',
      chunkIndex: s.chunkIndex ?? 0,
      score: Math.round((s.score + Number.EPSILON) * 10000) / 10000,
    }));
}

/**
 * Filtra sources acima do limiar de relevância.
 *
 * @param {Source[]} sources       - Lista de sources
 * @param {number}   [threshold=0] - Score mínimo (0.0 a 1.0)
 * @returns {Source[]} Sources com score >= threshold
 */
export function filterSourcesByScore(sources, threshold = 0) {
  if (!sources || !Array.isArray(sources)) return [];
  return sources.filter((s) => s.score >= threshold);
}

/**
 * Verifica se uma mensagem possui sources RAG.
 *
 * @param {Message} message
 * @returns {boolean} true se a mensagem é do assistente e tem sources
 */
export function hasSources(message) {
  return (
    message?.role === 'ASSISTANT' &&
    Array.isArray(message.sources) &&
    message.sources.length > 0
  );
}
