import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Lista de mensagens com scroll automático para a última mensagem.
 * Usa MessageBubble para cada item — campos do backend (role, content, timestamp, fileId).
 */
export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);

  // Scroll suave para o final ao receber nova mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && !loading && (
        <EmptyState
          icon="💬"
          title="Nenhuma mensagem ainda"
          description="Comece a conversa enviando uma mensagem ou anexando um documento PDF/TXT."
        />
      )}

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
          fileId={msg.fileId}
        />
      ))}

      {loading && (
        <div className="message-list__typing">
          <LoadingSpinner size={18} />
          <span>Digitando...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
