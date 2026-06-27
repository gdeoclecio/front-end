import { useState, useEffect, useCallback } from 'react';
import { sessionService } from '../services/sessionService';

/**
 * Hook que gerencia lista de sessões e sessão ativa.
 * Chama sessionService.create() e sessionService.list() reais.
 */
export function useSession() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.list();
      setSessions(data || []);
      // Se não tem sessão ativa e existem sessões, seleciona a primeira
      if (data && data.length > 0 && !activeSessionId) {
        setActiveSessionId(data[0].id);
      } else if (!data || data.length === 0) {
        // Cria uma sessão inicial automaticamente se não houver nenhuma
        const newSession = await sessionService.create({ title: 'Nova conversa' });
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar sessões.');
    } finally {
      setLoading(false);
    }
  }, [activeSessionId]);

  const createSession = useCallback(async (title) => {
    setLoading(true);
    setError(null);
    try {
      const newSession = await sessionService.create({ title: title || null });
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      return newSession;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar sessão.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const selectSession = useCallback((id) => {
    setActiveSessionId(id);
  }, []);

  useEffect(() => {
    listSessions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    sessions,
    activeSessionId,
    loading,
    error,
    createSession,
    listSessions,
    selectSession,
  };
}
