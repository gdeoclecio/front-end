import { ALLOWED_FILE_TYPES, UPLOAD_MAX_SIZE } from './constants';

/**
 * Valida se o tipo MIME do arquivo é permitido (PDF ou TXT).
 */
export function isValidFileType(file) {
  return ALLOWED_FILE_TYPES.includes(file.type);
}

/**
 * Valida se o tamanho do arquivo está dentro do limite (10MB).
 */
export function isFileSizeValid(file) {
  return file.size <= UPLOAD_MAX_SIZE;
}

/**
 * Valida o arquivo completo e retorna mensagem de erro ou null se válido.
 */
export function validateFile(file) {
  if (!file) return 'Nenhum arquivo selecionado.';
  if (!isValidFileType(file)) {
    return 'Tipo de arquivo não suportado. Envie PDF ou TXT.';
  }
  if (!isFileSizeValid(file)) {
    return 'O arquivo excede o limite de 10MB.';
  }
  return null;
}
