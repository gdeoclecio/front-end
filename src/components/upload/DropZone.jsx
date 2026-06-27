import { useState } from 'react';
import UploadButton from './UploadButton';

/**
 * Zona de arrastar-e-soltar para envio de arquivos (PDF/TXT).
 * Contém UploadButton como fallback para seleção via clique.
 * Acessível via teclado (Enter/Space abre o seletor).
 */
export default function DropZone({ onFileDrop, disabled }) {
  const [dragState, setDragState] = useState('idle'); // 'idle' | 'dragover'

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragState('dragover');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState('idle');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState('idle');
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file && onFileDrop) onFileDrop(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById('upload-button-input')?.click();
    }
  };

  const dropzoneClass = `dropzone ${
    dragState === 'dragover' ? 'dropzone--active' : ''
  } ${disabled ? 'dropzone--disabled' : ''}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Arraste um arquivo ou clique para enviar"
      className={dropzoneClass}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
    >
      <div className="dropzone__content">
        <span className="dropzone__icon">
          {dragState === 'dragover' ? '📥' : '📎'}
        </span>
        <span className="dropzone__text">
          {dragState === 'dragover'
            ? 'Solte o arquivo aqui'
            : 'Arraste um PDF ou TXT aqui'}
        </span>
      </div>
      <UploadButton onUpload={onFileDrop} disabled={disabled} />
    </div>
  );
}
