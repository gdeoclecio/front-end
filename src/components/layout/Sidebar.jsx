import SessionList from '../session/SessionList';

/**
 * Sidebar com lista de sessões e botão de nova sessão.
 * Recebe dados e callbacks via props — sem lógica interna.
 */
export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  loading,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Conversas</h2>
        <button
          type="button"
          className="sidebar__new-btn"
          onClick={onCreateSession}
          disabled={loading}
          title="Criar nova conversa"
        >
          <span>+</span>
        </button>
      </div>
      <div className="sidebar__list">
        <SessionList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
        />
      </div>
    </aside>
  );
}
