export default function FilePreview({ file }) {
  if (!file) return null;

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      <span style={{ fontSize: '20px' }}>
        {file.type === 'application/pdf' ? '📄' : '📃'}
      </span>
      <div>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 500 }}>{file.name}</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>{formatSize(file.size)}</p>
      </div>
    </div>
  );
}
