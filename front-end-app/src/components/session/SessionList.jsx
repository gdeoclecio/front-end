import SessionItem from './SessionItem';

export default function SessionList({ sessions = [], activeSessionId, onSelectSession, onCreateSession }) {
  return (
    <div>
      <button type="button" onClick={onCreateSession} style={{ width: '100%', marginBottom: '8px' }}>
        + Nova sessão
      </button>
      {sessions.length === 0 && (
        <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center' }}>
          Nenhuma sessão ainda.
        </p>
      )}
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          isActive={session.id === activeSessionId}
          onSelect={onSelectSession}
        />
      ))}
    </div>
  );
}
