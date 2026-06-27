import { useState, useCallback } from 'react';
import { uploadService } from '../services/uploadService';
import { validateFile } from '../utils/validators';

/**
 * Hook que gerencia estado completo do upload de arquivos.
 * Validação client-side, progresso em tempo real e reset.
 */
export function useUpload(sessionId) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);

  const uploadFile = useCallback(
    async (file) => {
      // Validação client-side
      const validationError = validateFile(file);
      if (validationError) {
        setUploadError(validationError);
        return;
      }

      if (!sessionId) {
        setUploadError('Nenhuma sessão ativa. Crie uma sessão primeiro.');
        return;
      }

      setUploading(true);
      setProgress(0);
      setUploadError(null);

      try {
        const result = await uploadService.upload(file, sessionId, (percentCompleted) => {
          setProgress(percentCompleted);
        });
        setLastUpload(result);
        setProgress(100);
      } catch (err) {
        setUploadError(err.response?.data?.message || 'Erro ao enviar arquivo.');
      } finally {
        setUploading(false);
      }
    },
    [sessionId]
  );

  const resetUpload = useCallback(() => {
    setProgress(0);
    setUploadError(null);
    setLastUpload(null);
  }, []);

  return { uploading, progress, uploadError, lastUpload, uploadFile, resetUpload };
}
