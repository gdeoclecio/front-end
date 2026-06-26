import { useState } from 'react';
import UploadButton from './UploadButton';

export default function DropZone({ onFileDrop, disabled, acceptedTypes }) {
  const [dragState, setDragState] = useState('idle');

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

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Arraste um arquivo ou clique para enviar"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      style={{
        border: '2px dashed',
        borderColor: dragState === 'dragover' ? '#3b82f6' : dragState === 'error' ? '#ef4444' : '#9ca3af',
        borderRadius: '8px',
        padding: '24px',
        textAlign: 'center',
        backgroundColor: dragState === 'dragover' ? '#eff6ff' : 'transparent',
        transition: 'all 0.2s',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <p>Arraste um arquivo aqui ou clique para selecionar</p>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>
        {acceptedTypes ? `Formatos aceitos: ${acceptedTypes}` : 'Formatos aceitos: .pdf, .txt'}
      </p>
      <UploadButton onUpload={onFileDrop} disabled={disabled} />
    </div>
  );
}
