import { useHealthCheck } from '../../hooks/useHealthCheck';

/**
 * Header com título do sistema e indicador de saúde do backend.
 * Consome useHealthCheck para polling automático de /api/health.
 */
export default function Header() {
  const status = useHealthCheck();

  const statusConfig = {
    up: { label: 'Online', className: 'header__status--up' },
    down: { label: 'Offline', className: 'header__status--down' },
    checking: { label: 'Verificando...', className: 'header__status--checking' },
  };

  const current = statusConfig[status] || statusConfig.checking;

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">🤖</span>
        <h1 className="header__title">Chat IA</h1>
      </div>
      <div className={`header__status ${current.className}`}>
        <span className="header__status-dot" />
        <span className="header__status-label">{current.label}</span>
      </div>
    </header>
  );
}
