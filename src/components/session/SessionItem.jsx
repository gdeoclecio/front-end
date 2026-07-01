import { formatDate } from '../../utils/formatters';

/**
 * Item individual da sessão na sidebar.
 * Exibe título e data. Acessível via teclado (Enter/Space).
 */
export default function SessionItem({ session, isActive = false, onSelect, onDelete }) {
  const handleClick = () => {
    if (onSelect) onSelect(session.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevents triggering select when clicking delete
    if (onDelete && window.confirm('Tem certeza que deseja apagar essa conversa?')) {
      onDelete(session.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`session-item ${isActive ? 'session-item--active' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="session-item__content">
        <p className="session-item__title">
          {session.title || 'Nova conversa'}
        </p>
        <span className="session-item__date">
          {formatDate(session.updatedAt || session.createdAt)}
        </span>
      </div>
      <button 
        className="session-item__delete-btn" 
        onClick={handleDelete}
        title="Apagar conversa"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
}
