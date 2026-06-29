import { useState } from "react"

export function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim() || disabled) return
    onSend(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Enviar
      </button>
    </form>
  )
}
