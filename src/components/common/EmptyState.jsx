export default function EmptyState({ icon = '💬', title, description }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon}</span>
      <h3 className="empty-state__title">{title || 'Nenhuma mensagem ainda'}</h3>
      <p className="empty-state__description">
        {description || 'Comece a conversa enviando uma mensagem ou anexando um documento.'}
      </p>
    </div>
  );
}
