import { useChat } from "../hooks/useChat"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"

export function ChatWindow() {
  const { messages, loading, sendMessage } = useChat()

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <h2>Chat</h2>
      </header>
      <MessageList messages={messages} loading={loading} />
      <MessageInput onSend={sendMessage} disabled={loading} />
    </div>
  )
}
