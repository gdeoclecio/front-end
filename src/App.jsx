import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ChatWindow from './components/chat/ChatWindow';
import { useSession } from './hooks/useSession';
import { useChat } from './hooks/useChat';
import { useUpload } from './hooks/useUpload';

/**
 * Componente interno que orquestra os hooks e conecta Sidebar + ChatWindow.
 * Toda a lógica está nos hooks — este componente apenas passa props.
 */
function ChatLayout() {
  const { id: routeSessionId } = useParams();
  const {
    sessions,
    activeSessionId,
    loading: sessionLoading,
    createSession,
    selectSession,
    deleteSession,
  } = useSession();

  // Usa sessionId da rota se disponível, senão usa o ativo do hook
  const currentSessionId = routeSessionId || activeSessionId;

  const {
    messages,
    loading: chatLoading,
    error: chatError,
    sendMessage,
  } = useChat(currentSessionId);

  const {
    uploading,
    progress,
    uploadError,
    uploadFile,
  } = useUpload(currentSessionId);

  const handleCreateSession = () => {
    createSession('Nova conversa');
  };

  return (
    <div className="app-layout">
      <Sidebar
        sessions={sessions}
        activeSessionId={currentSessionId}
        onSelectSession={selectSession}
        onCreateSession={handleCreateSession}
        onDeleteSession={deleteSession}
        loading={sessionLoading}
      />
      <ChatWindow
        messages={messages}
        loading={chatLoading}
        error={chatError}
        onSend={sendMessage}
        onFileDrop={uploadFile}
        uploading={uploading}
        progress={progress}
        uploadError={uploadError}
        activeSessionId={currentSessionId}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/session/:id" element={<ChatLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
