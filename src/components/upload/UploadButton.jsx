import { useRef } from 'react';

/**
 * Botão de fallback que abre seletor de arquivo nativo (PDF/TXT).
 * Filtro: accept=".pdf,.txt". Desabilitado durante upload.
 */
export default function UploadButton({ onUpload, disabled }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) onUpload(file);
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        id="upload-button-input"
        type="file"
        accept=".pdf,.txt"
        className="upload-button__input"
        onChange={handleChange}
      />
      <button
        type="button"
        className="upload-button"
        onClick={handleClick}
        disabled={disabled}
        title="Selecionar arquivo"
      >
        Selecionar arquivo
      </button>
    </>
  );
}
