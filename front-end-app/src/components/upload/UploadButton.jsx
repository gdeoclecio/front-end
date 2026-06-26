import { useRef } from 'react';

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
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick} disabled={disabled}>
        Selecionar arquivo
      </button>
    </>
  );
}
