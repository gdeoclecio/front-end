export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon">⚠️</span>
      <span className="error-message__text">{message}</span>
      {onRetry && (
        <button
          type="button"
          className="error-message__retry"
          onClick={onRetry}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
