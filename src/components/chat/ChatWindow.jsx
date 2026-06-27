import MessageList from './MessageList';
import MessageInput from './MessageInput';
import DropZone from '../upload/DropZone';
import ProgressBar from '../upload/ProgressBar';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Container que orquestra o chat de uma sessão.
 * Contém: MessageList + MessageInput + DropZone + ProgressBar.
 * Recebe todos os dados e callbacks via props — sem lógica interna.
 */
export default function ChatWindow({
  messages,
  loading,
  error,
  onSend,
  onFileDrop,
  uploading,
  progress,
  uploadError,
  activeSessionId,
}) {
  const uploadStatus = uploadError
    ? 'error'
    : progress >= 100
    ? 'success'
    : 'uploading';

  return (
    <main className="chat-window">
      {error && <ErrorMessage message={error} />}

      <MessageList messages={messages} loading={loading} />

      <div className="chat-window__footer">
        <DropZone
          onFileDrop={onFileDrop}
          disabled={uploading || !activeSessionId}
        />

        {(uploading || progress > 0) && (
          <ProgressBar
            progress={progress}
            status={uploadStatus}
          />
        )}

        {uploadError && <ErrorMessage message={uploadError} />}

        <MessageInput onSend={onSend} disabled={loading || !activeSessionId} />
      </div>
    </main>
  );
}
