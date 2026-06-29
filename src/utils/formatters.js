/**
 * Formata timestamp para exibição de hora (HH:MM).
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata timestamp para exibição de data completa.
 */
export function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formata tamanho de arquivo em bytes para leitura humana.
 */
export function formatFileSize(bytes) {
  if (bytes == null || bytes < 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Formata o score de similaridade semântica para exibição percentual.
 *
 * @param {number|null|undefined} score - Score entre 0.0 e 1.0
 * @returns {string} Ex: "94%" ou string vazia se inválido
 */
export function formatSourceScore(score) {
  if (score == null || typeof score !== 'number') return '';
  return `${(score * 100).toFixed(0)}%`;
}

/**
 * Formata informações de uma source para exibição inline.
 *
 * @param {import('../models/message').Source} source
 * @returns {string} Ex: "contrato.pdf (94%)"
 */
export function formatSourceLabel(source) {
  if (!source) return '';
  const name = source.documentName || 'Documento';
  const score = formatSourceScore(source.score);
  return score ? `${name} (${score})` : name;
}
