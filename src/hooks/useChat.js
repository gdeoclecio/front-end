import { useState, useEffect, useCallback } from 'react';

export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {}, []);

  const loadHistory = useCallback(async () => {}, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (sessionId) loadHistory();
  }, [sessionId, loadHistory]);

  return { messages, loading, error, sendMessage, loadHistory, clearMessages };
}
