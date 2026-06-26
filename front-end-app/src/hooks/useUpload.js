import { useState, useCallback } from 'react';

export function useUpload(sessionId) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);

  const uploadFile = useCallback(async (file) => {}, [sessionId]);

  const resetUpload = useCallback(() => {
    setProgress(0);
    setUploadError(null);
    setLastUpload(null);
  }, []);

  return { uploading, progress, uploadError, lastUpload, uploadFile, resetUpload };
}
