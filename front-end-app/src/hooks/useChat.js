import { useState, useCallback, useRef } from "react"
import { ChatService } from "../services/ChatService"

export function useChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const idCounter = useRef(0)

  const sendMessage = useCallback((text) => {
    if (!text.trim() || loading) return

    const userMessage = {
      id: `user-${++idCounter.current}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    ChatService.sendMessage(text).then((botMessage) => {
      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    })
  }, [loading])

  return { messages, loading, sendMessage }
}
