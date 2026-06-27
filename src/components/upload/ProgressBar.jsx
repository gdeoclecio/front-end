import { useEffect, useState } from 'react';

/**
 * Barra de progresso visual do upload em tempo real.
 * Status: 'uploading' (azul), 'success' (verde + ✓ por 2s), 'error' (vermelho).
 */
export default function ProgressBar({ progress = 0, fileName = '', status = 'uploading' }) {
  const [visible, setVisible] = useState(true);

  // Fade-out após sucesso por 2 segundos
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
    setVisible(true);
  }, [status]);

  if (!visible) return null;

  const barClass = `progress-bar__fill progress-bar__fill--${status}`;

  return (
    <div className={`progress-bar ${status === 'success' ? 'progress-bar--fade' : ''}`}>
      {fileName && (
        <span className="progress-bar__filename">{fileName}</span>
      )}
      <div className="progress-bar__track">
        <div
          className={barClass}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="progress-bar__info">
        <span>{progress}%</span>
        {status === 'error' && (
          <span className="progress-bar__error">Erro ao enviar</span>
        )}
        {status === 'success' && (
          <span className="progress-bar__success">✓ Concluído</span>
        )}
      </div>
    </div>
  );
}
