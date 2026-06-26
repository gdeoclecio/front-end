import { useEffect, useRef } from 'react';

export default function MessageList({ messages = [] }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {messages.length === 0 && <p>Nenhuma mensagem ainda.</p>}
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
