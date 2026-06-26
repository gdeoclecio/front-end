export function MessageList({ messages, loading }) {
  return (
    <div className="message-list">
      {messages.length === 0 && (
        <p className="message-empty">Nenhuma mensagem ainda. Comece a conversa!</p>
      )}
      {messages.map((msg) => (
        <div key={msg.id} className={`message message--${msg.sender}`}>
          <p className="message__text">{msg.text}</p>
          <span className="message__time">
            {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
      {loading && (
        <div className="message message--bot message--typing">
          <p className="message__text">Digitando...</p>
        </div>
      )}
    </div>
  )
}
