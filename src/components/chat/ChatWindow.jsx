import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({
  messages,
  sessionId,
  onSend,
  onFileDrop,
  progress,
  uploading,
}) {
  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSend={onSend} isSending={false} />
    </div>
  );
}
