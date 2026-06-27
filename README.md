# Chat IA — Front-end

Este repositório contém a interface de usuário (SPA) do sistema **Chat IA**, desenvolvida como parte da residência Serratec 2026.1. O front-end é responsável por gerenciar sessões de conversa, interagir com um assistente virtual e permitir o upload de documentos (PDF/TXT) para extração de contexto.

O projeto foi construído utilizando **React** e **Vite**, seguindo princípios rígidos de **Clean Code**, **SOLID** e separação de responsabilidades (Apresentação vs. Comportamento). O design utiliza um tema escuro (Dark Mode) premium com micro-animações, focado em alta usabilidade.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite** (Build tool e Dev Server)
- **React Router DOM** (Navegação client-side)
- **Axios** (Cliente HTTP)
- **CSS3** (Variáveis nativas, animações, flexbox)

---

## 🏗️ Arquitetura e Estrutura de Pastas

A arquitetura do front-end é guiada por um **isolamento de domínio** estrito:

| Camada | Responsabilidade | Regra |
|--------|-----------------|-------|
| `components/` | Renderização visual, estilos, captura de eventos de UI | **Sem chamadas de API ou lógica de estado complexa.** Funções puras orientadas a props. |
| `hooks/` | Lógica de estado e efeitos colaterais (API calls) | Centralizam a "inteligência" (ex: `useChat`, `useSession`, `useUpload`). |
| `services/` | Chamadas HTTP (Axios) puros | **Sem estado.** Isolam rotas, payloads e headers (ex: `messageService`, `api`). |
| `utils/` | Funções utilitárias puras | **Sem side-effects.** Formatação de datas, tamanho de arquivo e validações. |

### Estrutura de Diretórios
```text
src/
├── components/
│   ├── chat/        # Componentes do chat (ChatWindow, MessageBubble, MessageInput)
│   ├── common/      # Componentes globais genéricos (LoadingSpinner, ErrorMessage)
│   ├── layout/      # Componentes estruturais (Header, Sidebar)
│   ├── session/     # Gerenciamento visual de sessões na sidebar
│   └── upload/      # Drag and drop, barras de progresso e botões de arquivo
├── hooks/           # Custom hooks para lógica de negócio
├── services/        # Configuração do Axios e chamadas de API
├── utils/           # Constantes, formatadores e validadores locais
├── App.jsx          # Configuração de Rotas e Layout Base
├── index.css        # Design System (Variáveis e classes CSS globais)
└── main.jsx         # Entry point do React
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- O serviço de **Back-end** (`localhost:8080`) precisa estar em execução para que o chat funcione adequadamente.

### Passos

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone https://github.com/seu-usuario/front-end.git
   cd front-end
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Certifique-se de que o arquivo `.env` na raiz contenha as rotas corretas para o backend:
   ```env
   VITE_API_URL=http://localhost:8080
   VITE_UPLOAD_MAX_SIZE=10485760
   VITE_HEALTH_CHECK_INTERVAL=30000
   ```

4. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```

5. O aplicativo estará disponível em: `http://localhost:5173`

---

## 📄 Documentação

Para mais detalhes sobre como os agentes de IA foram utilizados para gerar essa base de código, consulte o arquivo [AGENTS.md](./docs/AGENTS.md). 
Para visualizar os contratos de API e a especificação completa de design de software do front-end, veja o [ESPECIFICACAO_FRONTEND.md](./docs/ESPECIFICACAO_FRONTEND.md).
