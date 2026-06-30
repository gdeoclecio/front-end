import { useState } from 'react';
import { formatTimestamp } from '../../utils/formatters';
import SourcePanel from './SourcePanel';

/**
 * Bolha individual de mensagem com estilo variado por role.
 * USER → alinhada à direita | ASSISTANT → alinhada à esquerda.
 * Se file/fileId presente, exibe informações do arquivo.
 * Se sources presente (assistant), exibe toggle colapsável de fontes RAG.
 */
export default function MessageBubble({ role, content, timestamp, fileId, sources }) {
  const isUser = role === 'USER';
  const bubbleClass = isUser ? 'message-bubble--user' : 'message-bubble--assistant';
  const hasSources = !isUser && sources && sources.length > 0;
  const [showSources, setShowSources] = useState(false);

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

      {hasSources && (
        <button
          className={`message-bubble__sources-toggle ${showSources ? 'message-bubble__sources-toggle--open' : ''}`}
          onClick={() => setShowSources(!showSources)}
          aria-expanded={showSources}
        >
          <span className="message-bubble__sources-toggle-icon">
            {showSources ? '▾' : '▸'}
          </span>
          {showSources ? 'Ocultar fontes' : `Ver fontes (${sources.length})`}
        </button>
      )}

      {showSources && hasSources && <SourcePanel sources={sources} />}

      <span className="message-bubble__time">{formatTimestamp(timestamp)}</span>
    </div>
  );
}
