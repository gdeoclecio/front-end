const MOCK_DELAY = 1500

const MOCK_RESPONSES = [
  "Entendi! Pode me contar mais sobre isso?",
  "Ótimo ponto! Vou analisar essa informação.",
  "Interessante! Como posso ajudar com isso?",
  "Certo, estou processando sua solicitação.",
  "Obrigado pelo feedback! Há algo mais que precisa?",
  "Boa pergunta! Deixe-me verificar isso para você.",
  "Sim, isso faz sentido. Continue...",
  "Perfeito! Já anotei sua mensagem.",
]

function getRandomResponse() {
  const index = Math.floor(Math.random() * MOCK_RESPONSES.length)
  return MOCK_RESPONSES[index]
}

export const ChatService = {
  sendMessage(userMessage) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          text: getRandomResponse(),
          sender: "bot",
          timestamp: new Date().toISOString(),
        })
      }, MOCK_DELAY)
    })
  },
}
