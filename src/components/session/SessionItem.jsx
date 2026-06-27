import { formatDate } from '../../utils/formatters';

/**
 * Item individual da sessão na sidebar.
 * Exibe título e data. Acessível via teclado (Enter/Space).
 */
export default function SessionItem({ session, isActive = false, onSelect }) {
  const handleClick = () => {
    if (onSelect) onSelect(session.id);
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
      <p className="session-item__title">
        {session.title || 'Nova conversa'}
      </p>
      <span className="session-item__date">
        {formatDate(session.updatedAt || session.createdAt)}
      </span>
    </div>
  );
}
