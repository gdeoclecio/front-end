import { formatFileSize } from '../../utils/formatters';

/**
 * Preview do arquivo anexado — exibe nome, tipo (ícone) e tamanho.
 */
export default function FilePreview({ file }) {
  if (!file) return null;

  const icon = file.mimeType === 'application/pdf' || file.type === 'application/pdf'
    ? '📄'
    : '📃';

  const name = file.originalName || file.name || 'Arquivo';
  const size = file.size;

  return (
    <div className="file-preview">
      <span className="file-preview__icon">{icon}</span>
      <div className="file-preview__info">
        <p className="file-preview__name">{name}</p>
        <p className="file-preview__size">{formatFileSize(size)}</p>
      </div>
    </div>
  );
}
