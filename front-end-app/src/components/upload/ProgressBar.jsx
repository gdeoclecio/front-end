export default function ProgressBar({ progress = 0, fileName = '', status = 'uploading' }) {
  const barColor =
    status === 'success' ? '#22c55e' :
    status === 'error' ? '#ef4444' :
    '#3b82f6';

  return (
    <div style={{ marginTop: '8px' }}>
      {fileName && (
        <p style={{ fontSize: '13px', margin: '0 0 4px' }}>{fileName}</p>
      )}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: '4px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '2px' }}>
        <span>{progress}%</span>
        {status === 'error' && (
          <span style={{ color: '#ef4444' }}>Erro ao enviar arquivo.</span>
        )}
        {status === 'success' && (
          <span style={{ color: '#22c55e' }}>&#10003; Concluído</span>
        )}
      </div>
    </div>
  );
}
