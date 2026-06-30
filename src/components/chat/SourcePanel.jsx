/**
 * Painel de fontes RAG — exibe os chunks de texto que o assistente
 * utilizou como contexto para gerar a resposta.
 * Recebe sources como props, não busca dados diretamente.
 */
export default function SourcePanel({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="source-panel">
      <div className="source-panel__header">
        <span className="source-panel__icon">📚</span>
        <span className="source-panel__title">
          Fontes utilizadas ({sources.length})
        </span>
      </div>
      <ul className="source-panel__list">
        {sources.map((source, index) => (
          <li key={source.chunkId || index} className="source-panel__item">
            <div className="source-panel__item-header">
              <span className="source-panel__item-label">
                {source.documentName || `Trecho ${index + 1}`}
              </span>
              {source.score != null && (
                <span className="source-panel__score">
                  {Math.round(source.score * 100)}% relevância
                </span>
              )}
            </div>
            {source.chunkIndex != null && (
              <span className="source-panel__chunk-index">
                Trecho #{source.chunkIndex + 1}
              </span>
            )}
            <p className="source-panel__chunk">
              {source.content || '(sem conteúdo)'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
