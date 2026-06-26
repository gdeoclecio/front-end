import { useState } from 'react';

export default function MessageInput({ onSend, isSending }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim() || isSending) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSending}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={handleSubmit} disabled={!text.trim() || isSending}>
        Enviar
      </button>
    </div>
  );
}
