export default function SessionItem({ session, isActive = false, onSelect }) {
  const handleClick = () => {
    if (onSelect) onSelect(session.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        padding: '8px 12px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#eff6ff' : 'transparent',
        borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
        borderRadius: '4px',
        marginBottom: '2px',
        transition: 'background-color 0.15s',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
        {session.title || 'Sem título'}
      </p>
      {session.lastMessage && (
        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {session.lastMessage}
        </p>
      )}
    </div>
  );
}
