import { useState, useEffect, useCallback } from 'react';

export function useSession() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const createSession = useCallback(async (title) => {}, []);

  const listSessions = useCallback(async () => {
    const mockSessions = [
      { id: 'session-1', title: 'Sessão 1', lastMessage: 'Olá, como posso ajudar?', createdAt: new Date().toISOString() },
      { id: 'session-2', title: 'Sessão 2', lastMessage: 'Qual é a capital do Brasil?', createdAt: new Date().toISOString() },
    ];
    setSessions(mockSessions);
    setActiveSessionId('session-1');
  }, []);

  const selectSession = useCallback((id) => {
    setActiveSessionId(id);
  }, []);

  useEffect(() => {
    listSessions();
  }, [listSessions]);

  return { sessions, activeSessionId, loading, createSession, listSessions, selectSession };
}
