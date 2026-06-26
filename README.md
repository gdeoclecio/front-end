# Front-end — Projeto de IA

Este repositório contém a Single Page Application (SPA) desenvolvida em React para interagir com a API de mensagens e upload de arquivos. 

## Tecnologias e Arquitetura
- **React**: Biblioteca principal (geralmente orquestrada por Vite).
- **Gestão de Estado Isolada**: O projeto utiliza intensivamente Custom Hooks para isolar o comportamento e as chamadas à API da apresentação visual.
- **Componentização Declarativa**: A interface de usuário (UI) é formada por componentes puros focados estritamente na exibição dos dados.

## Pré-requisitos
- Node.js (versão 18 ou superior recomendada).
- npm, yarn ou pnpm.

## Como Executar

1. Navegue até o diretório do projeto:
   ```bash
   cd front-end
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado nas configurações esperadas (ex: `VITE_API_URL=http://localhost:8080`).

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação no navegador (geralmente em `http://localhost:5173`).

## Documentação da Especificação
Para detalhes arquiteturais, árvore de componentes, uso de hooks e fluxos de dados, consulte o arquivo [ESPECIFICACAO_FRONTEND.md](./ESPECIFICACAO_FRONTEND.md).