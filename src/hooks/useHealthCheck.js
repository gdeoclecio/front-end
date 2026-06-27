import { useState, useEffect } from 'react';
import api from '../services/api';
import { HEALTH_CHECK_INTERVAL } from '../utils/constants';

/**
 * Hook que faz polling periódico do endpoint /api/health.
 * Expõe status para o Header exibir indicador visual.
 */
export function useHealthCheck(interval = HEALTH_CHECK_INTERVAL) {
  const [status, setStatus] = useState('checking'); // 'up' | 'down' | 'checking'

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      try {
        await api.get('/api/health');
        if (isMounted) setStatus('up');
      } catch {
        if (isMounted) setStatus('down');
      }
    };

    check();
    const timer = setInterval(check, interval);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [interval]);

  return status;
}
