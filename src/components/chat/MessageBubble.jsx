import { formatTimestamp } from '../../utils/formatters';
import { formatFileSize } from '../../utils/formatters';

/**
 * Bolha individual de mensagem com estilo variado por role.
 * USER → alinhada à direita | ASSISTANT → alinhada à esquerda.
 * Se file/fileId presente, exibe informações do arquivo.
 */
export default function MessageBubble({ role, content, timestamp, fileId }) {
  const isUser = role === 'USER';
  const bubbleClass = isUser ? 'message-bubble--user' : 'message-bubble--assistant';

  return (
    <div className={`message-bubble ${bubbleClass}`}>
      <div className="message-bubble__content">
        {fileId && (
          <div className="message-bubble__file">
            <span className="message-bubble__file-icon">📎</span>
            <span className="message-bubble__file-label">Arquivo anexado</span>
          </div>
        )}
        <p className="message-bubble__text">{content}</p>
      </div>
      <span className="message-bubble__time">{formatTimestamp(timestamp)}</span>
    </div>
  );
}
