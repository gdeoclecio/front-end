import SessionItem from './SessionItem';

/**
 * Lista de sessões para a Sidebar.
 * Recebe dados e callbacks via props — sem lógica interna.
 */
export default function SessionList({ sessions = [], activeSessionId, onSelectSession }) {
  if (sessions.length === 0) {
    return (
      <div className="session-list__empty">
        <p>Nenhuma conversa ainda.</p>
        <p>Clique em <strong>+</strong> para começar.</p>
      </div>
    );
  }

  return (
    <div className="session-list">
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
