# ESPECIFICAÇÃO DO FRONT-END — React

## 1. Estrutura de Pastas

```
src/
├── main.jsx                              # Entry point (ReactDOM.createRoot)
├── App.jsx                               # Router + providers
├── routes.jsx                            # Definição de rotas (React Router)
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx                    # Título + ações globais
│   │   └── Sidebar.jsx                   # Lista de sessões
│   │
│   ├── chat/
│   │   ├── ChatWindow.jsx                # Container do chat
│   │   ├── MessageList.jsx              # Lista de mensagens (scroll)
│   │   ├── MessageBubble.jsx            # Bolha individual (role=USER/ASSISTANT)
│   │   └── MessageInput.jsx             # Input de texto + botão enviar
│   │
│   ├── upload/
│   │   ├── DropZone.jsx                 # Zona de arrastar-e-soltar (drag-and-drop)
│   │   ├── UploadButton.jsx             # Botão de upload (fallback)
│   │   ├── ProgressBar.jsx              # Barra de progresso visual do upload
│   │   └── FilePreview.jsx              # Preview do arquivo anexado
│   │
│   ├── session/
│   │   ├── SessionList.jsx              # Lista de sessões na sidebar
│   │   └── SessionItem.jsx              # Item individual da sessão
│   │
│   └── common/
│       ├── LoadingSpinner.jsx           # Spinner de carregamento
│       ├── ErrorMessage.jsx             # Mensagem de erro reutilizável
│       └── EmptyState.jsx               # Estado vazio (ex: nenhuma mensagem)
│
├── hooks/
│   ├── useChat.js                       # Estado e ações do chat
│   ├── useUpload.js                     # Estado e ações de upload
│   ├── useSession.js                    # Estado e ações de sessão
│   └── useHealthCheck.js                # Health check periódico
│
├── services/
│   ├── api.js                           # Instância axios (baseURL, interceptors)
│   ├── messageService.js                # Chamadas aos endpoints de mensagem
│   ├── sessionService.js                # Chamadas aos endpoints de sessão
│   └── uploadService.js                 # Chamadas ao endpoint de upload
│
├── context/
│   └── ChatContext.jsx                  # Contexto global (opcional, se necessário)
│
└── utils/
    ├── constants.js                     # URLs, limites, enums
    ├── formatters.js                    # Formatação de data, tamanho de arquivo
    └── validators.js                    # Validações de input (cliente-side)
```

---

## 2. Componentes Principais

### 2.1 ChatWindow

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Container que orquestra o chat de uma sessão               |
| Contém         | `MessageList` + `MessageInput` + `DropZone` + `ProgressBar` |
| Estado         | Recebe `messages`, `sessionId`, `onSend`, `onFileDrop`, `progress`, `uploading` via props |
| Lógica         | Nenhuma — apenas layout                                     |

### 2.2 MessageList

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Renderizar a lista de mensagens com scroll automático       |
| Props          | `messages[]` — array de objetos `{id, role, content, timestamp, file?}` |
| Comportamento  | Scroll suave para o final ao receber nova mensagem           |
| Subcomponentes | `MessageBubble` para cada item                               |

### 2.3 MessageBubble

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Renderizar uma bolha de mensagem (estilo varia por `role`)   |
| Props          | `role`, `content`, `timestamp`, `file?`                      |
| Variação visual| USER = alinhada à direita, cor X / ASSISTANT = alinhada à esquerda, cor Y |
| Upload         | Se `file` presente, exibir `FilePreview`                     |

### 2.4 MessageInput

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Input de texto + botão de envio                              |
| Estado interno | `text` (controlado), `isSending` (desabilitar durante envio) |
| Callback       | `onSend(text)` — chamado ao pressionar Enter ou clicar enviar |
| Validação      | Não enviar se texto vazio ou apenas espaços                  |

### 2.5 DropZone (Drag-and-Drop)

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Zona de arrastar-e-soltar para envio de arquivos (PDF/TXT)   |
| Props          | `onFileDrop(file)`, `disabled`, `acceptedTypes`              |
| Estado visual  | **idle** → borda tracejada cinza / **dragover** → borda azul highlight + ícone animado / **error** → borda vermelha |
| Eventos DOM    | `onDragEnter`, `onDragOver`, `onDragLeave`, `onDrop`         |
| Validação      | Aceitar apenas `.pdf` e `.txt`; rejeitar outros tipos com mensagem de erro visual |
| Fallback       | Contém `UploadButton` internamente para seleção via clique   |
| Acessibilidade | `role="button"`, `aria-label="Arraste um arquivo ou clique para enviar"`, navegável por teclado (Enter/Space abre o seletor) |

### 2.6 UploadButton

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Botão de fallback que abre seletor de arquivo nativo (PDF/TXT) |
| Callback       | `onUpload(file)` — chamado após seleção                      |
| Restrições     | Filtro: `accept=".pdf,.txt"`; valida tamanho < 10MB          |
| Feedback       | Desabilitado enquanto upload está em andamento               |

### 2.7 ProgressBar

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Exibir o progresso percentual do upload em tempo real        |
| Props          | `progress` (0–100), `fileName`, `status` (`uploading` / `success` / `error`) |
| Comportamento  | Barra horizontal animada que preenche de 0% a 100%. Exibe nome do arquivo e percentual numérico ao lado |
| Estado `success` | Barra fica verde + ícone de check por 2s, depois desaparece com fade-out |
| Estado `error`   | Barra fica vermelha + mensagem de erro abaixo               |

### 2.8 Sidebar

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Listar sessões existentes + botão "Nova sessão"             |
| Contém         | `SessionList`                                                |
| Callback       | `onSelectSession(sessionId)` — navega para a sessão clicada  |

### 2.9 Header

| Aspecto        | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| Responsabilidade | Exibir título do sistema + status do servidor               |
| Estado         | Consome `useHealthCheck` para exibir indicador verde/vermelho |

---

## 3. Custom Hooks

### 3.1 useChat

```javascript
function useChat(sessionId) {
  // Estado interno
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ações expostas
  const sendMessage = async (text) => { /* ... */ };
  const loadHistory = async () => { /* ... */ };
  const clearMessages = () => { /* ... */ };

  // Efeitos
  useEffect(() => {
    if (sessionId) loadHistory();
  }, [sessionId]);

  // Retorno
  return { messages, loading, error, sendMessage, loadHistory, clearMessages };
}
```

**Responsabilidade:**
- Gerenciar estado das mensagens da sessão ativa.
- Chamar `messageService.send()` e `messageService.getBySession()`.
- Atualizar estado local após sucesso da API.

### 3.2 useUpload

```javascript
function useUpload(sessionId) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);        // 0–100 (percentual)
  const [uploadError, setUploadError] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);

  const uploadFile = async (file) => {
    // 1. Validação client-side
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Tipo de arquivo não suportado. Envie PDF ou TXT.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('O arquivo excede o limite de 10MB.');
      return;
    }

    // 2. Upload com tracking de progresso
    setUploading(true);
    setProgress(0);
    setUploadError(null);
    try {
      const result = await uploadService.upload(file, sessionId, (percentCompleted) => {
        setProgress(percentCompleted); // callback do onUploadProgress
      });
      setLastUpload(result);
      setProgress(100);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Erro ao enviar arquivo.');
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setProgress(0);
    setUploadError(null);
    setLastUpload(null);
  };

  return { uploading, progress, uploadError, lastUpload, uploadFile, resetUpload };
}
```

**Responsabilidade:**
- Gerenciar estado completo do upload (progresso, erro, resultado).
- Validar arquivo antes de enviar (tipo, tamanho) no client-side.
- Chamar `uploadService.upload()` com callback de progresso.
- Expor `progress` (0–100) para alimentar o componente `ProgressBar`.
- Expor `resetUpload()` para limpar o estado após conclusão.

### 3.3 useSession

```javascript
function useSession() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const createSession = async (title) => { /* ... */ };
  const listSessions = async () => { /* ... */ };
  const selectSession = (id) => { setActiveSessionId(id); };

  useEffect(() => {
    listSessions();
  }, []);

  return { sessions, activeSessionId, loading, createSession, listSessions, selectSession };
}
```

**Responsabilidade:**
- Gerenciar lista de sessões e sessão ativa.
- Chamar `sessionService.create()` e `sessionService.list()`.

### 3.4 useHealthCheck

```javascript
function useHealthCheck(interval = 30000) {
  const [status, setStatus] = useState('checking'); // 'up' | 'down' | 'checking'

  useEffect(() => {
    const check = async () => {
      try {
        await api.get('/api/health');
        setStatus('up');
      } catch {
        setStatus('down');
      }
    };
    check();
    const timer = setInterval(check, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return status;
}
```

**Responsabilidade:**
- Polling periódico do endpoint `/api/health`.
- Expor status para o `Header` exibir indicador.

---

## 4. Services de API

### 4.1 api.js (instância axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log ou tratamento global de erros
    return Promise.reject(error);
  }
);

export default api;
```

### 4.2 messageService.js

| Função          | Método | Rota                    | Parâmetros                        |
|-----------------|--------|-------------------------|-----------------------------------|
| send()          | POST   | /api/messages           | `{ sessionId, role, content }`    |
| getBySession()  | GET    | /api/messages/{id}      | `sessionId`, `?page&size&sort`    |

```javascript
export const messageService = {
  send: (data) => api.post('/api/messages', data).then(r => r.data),
  getBySession: (sessionId, params) =>
    api.get(`/api/messages/${sessionId}`, { params }).then(r => r.data),
};
```

### 4.3 sessionService.js

| Função          | Método | Rota                    | Parâmetros                        |
|-----------------|--------|-------------------------|-----------------------------------|
| create()        | POST   | /api/sessions           | `{ title }`                       |
| list()          | GET    | /api/sessions           | —                                 |

```javascript
export const sessionService = {
  create: (data) => api.post('/api/sessions', data).then(r => r.data),
  list: () => api.get('/api/sessions').then(r => r.data),
};
```

### 4.4 uploadService.js

| Função          | Método | Rota                    | Parâmetros                        |
|-----------------|--------|-------------------------|-----------------------------------|
| upload()        | POST   | /api/upload             | `FormData` (file + sessionId)     |

```javascript
export const uploadService = {
  upload: (file, sessionId, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);
    return api.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    }).then(r => r.data);
  },
};
```

---

## 5. Fluxos de Dados

### 5.1 Fluxo de Chat (envio de mensagem)

```
[Usuário digita texto] → [MessageInput]
                              ↓ onSend(text)
                         [useChat.sendMessage(text)]
                              ↓
                     [messageService.send({ sessionId, role:"USER", content })]
                              ↓
                         POST /api/messages
                              ↓
                     [Backend persiste e retorna MessageResponse]
                              ↓
                     [useChat] atualiza estado messages[]
                              ↓
                     [MessageList] re-renderiza com nova mensagem
```

Se houver resposta do assistente (via backend ou IA):

```
[useChat.sendMessage] aguarda resposta do backend
                              ↓
         Backend pode retornar mensagem do ASSISTANT na mesma resposta
         ou o front pode fazer polling / nova chamada
                              ↓
         [useChat] adiciona mensagem do ASSISTANT ao estado
                              ↓
         [MessageList] re-renderiza
```

### 5.2 Fluxo de Upload (com Drag-and-Drop e Barra de Progresso)

```
[Usuário arrasta arquivo sobre DropZone]    OU    [Usuário clica UploadButton]
              ↓                                              ↓
   onDragEnter → visual: borda azul              input file nativo abre
   onDragOver  → preventDefault                       ↓
   onDrop      → extrai file do event          seleção do arquivo
              ↓                                        ↓
              └──────────── onFileDrop(file) ───────────┘
                               ↓
                     [useUpload.uploadFile(file)]
                               ↓
                  Validação client-side:
                  - Tipo: .pdf / .txt apenas
                  - Tamanho: < 10MB
                               ↓ inválido → setUploadError → DropZone exibe erro visual
                               ↓ válido
                  setUploading(true), setProgress(0)
                               ↓
              [uploadService.upload(file, sessionId, onProgress)]
                               ↓
                  POST /api/upload (multipart/form-data)
                               ↓
              onUploadProgress callback atualiza progress (0→100)
                               ↓
              [ProgressBar] renderiza barra animada em tempo real
                               ↓
                  [Backend retorna UploadResponse]
                               ↓
              setProgress(100) → ProgressBar exibe ✓ (verde, 2s, fade-out)
                               ↓
          [useChat.sendMessage] cria mensagem com fileId e texto extraído
                               ↓
          [MessageList] exibe FilePreview + conteúdo extraído
```

### 5.3 Fluxo de Histórico (troca de sessão)

```
[Usuário clica sessão na Sidebar]
                              ↓
                     [useSession.selectSession(id)]
                              ↓
                     [activeSessionId] muda no estado
                              ↓
         [useChat] detecta mudança via useEffect(sessionId)
                              ↓
                     [useChat.loadHistory()]
                              ↓
              [messageService.getBySession(sessionId)]
                              ↓
              GET /api/messages/{sessionId}
                              ↓
              [Backend retorna lista paginada de mensagens]
                              ↓
              [useChat] substitui messages[] pelo histórico
                              ↓
              [MessageList] re-renderiza com histórico completo
```

---

## 6. Responsabilidade dos Componentes (UI vs Lógica)

| Camada     | Responsabilidade                                                |
|------------|----------------------------------------------------------------|
| **components/** | Renderização, estilo, eventos de UI. **Sem chamadas de API.** |
| **hooks/**     | Toda a lógica de estado e efeitos colaterais (API calls).     |
| **services/**  | Chamadas HTTP puras (axios). **Sem estado.**                  |
| **utils/**     | Funções puras de formatação/validação. **Sem estado.**        |

**Regra de ouro:**
- Componentes de UI **nunca** chamam `axios` ou `fetch` diretamente.
- Toda comunicação com o backend passa por um custom hook, que por sua vez chama um service.

---

## 7. Como o Front-end Consome os Endpoints do Back-end

| Endpoint Back-end              | Consumido por              | Hook que chama              |
|--------------------------------|----------------------------|-----------------------------|
| `GET /api/health`              | `useHealthCheck`           | — (chama `api` diretamente) |
| `POST /api/messages`           | `messageService.send`      | `useChat.sendMessage`       |
| `GET /api/messages/{sessionId}`| `messageService.getBySession` | `useChat.loadHistory`    |
| `POST /api/sessions`           | `sessionService.create`    | `useSession.createSession`  |
| `GET /api/sessions`            | `sessionService.list`      | `useSession.listSessions`   |
| `POST /api/upload`             | `uploadService.upload`     | `useUpload.uploadFile`      |

---

## 8. Configuração de Ambiente

```env
# .env
VITE_API_URL=http://localhost:8080
VITE_UPLOAD_MAX_SIZE=10485760   # 10MB em bytes
VITE_HEALTH_CHECK_INTERVAL=30000
```

---

## 9. Resumo de Rotas (React Router)

| Rota            | Componente          | Descrição                    |
|-----------------|---------------------|------------------------------|
| `/`             | `ChatWindow`        | Chat da sessão ativa         |
| `/session/:id`  | `ChatWindow`        | Chat de sessão específica    |

A navegação entre `/` e `/session/:id` ocorre ao clicar em uma sessão na `Sidebar` ou ao criar uma nova sessão.

---

## 10. Considerações Finais

- **Separação estrita:** Nenhum componente de UI contém lógica de API ou estado global. Tudo é mediado por hooks.
- **Custom hooks como camada de lógica:** centralizam estado, efeitos e chamadas a services.
- **Services como camada HTTP:** isolam o axios e as urls, facilitando testes e manutenção.
- **Componentes puramente de apresentação:** recebem dados e callbacks via props.
- O front-end depende **exclusivamente** dos contratos definidos pelo back-end. Qualquer mudança no back-end deve ser refletida nos services e hooks.
