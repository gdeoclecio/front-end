import { useState } from 'react';

/**
 * Input de texto com botão de envio.
 * Envia ao pressionar Enter ou clicar no botão. Valida texto vazio.
 */
export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        id="message-text-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
        autoComplete="off"
      />
      <button
        id="message-send-btn"
        type="submit"
        disabled={disabled || !text.trim()}
        title="Enviar mensagem"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
