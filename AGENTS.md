# Documentação de Agentes (AGENTS.md)

Este documento rastreia os comandos (prompts) utilizados via ferramentas de IA generativa para a criação dos artefatos estruturais e de código neste repositório (Front-end).

Todo o desenvolvimento desta SPA React é conduzido sob a premissa do **Spec-Driven Development (SDD)** e guiado pela estrutura de prompts **CRISP**.

---

## Histórico de Prompts

### Prompt 02 — Estrutura inicial do módulo de Chat

> **Aja como um Engenheiro Front-end Sênior especialista em React.**
>
> **CONTEXTO:**  
> Branch feature/chat. Projeto React baseado em ESPECIFICACAO_FRONTEND.md.  
>
> **INTENÇÃO:**  
> Gerar apenas a estrutura inicial do módulo de chat.
>
> **RESTRIÇÕES:**  
> - Não implementar lógica de API  
> - Não incluir upload  
> - Não incluir histórico  
> - Apenas estrutura do chat  
>
> **RESULTADO GERADO:**
> - ChatWindow.jsx  
> - MessageList.jsx  
> - MessageInput.jsx  
> - useChat.js  
> - messageService.js  
> - api.js  

### Exemplo de Template de Prompt de Codificação:
> **Aja como um** Engenheiro de Front-end Sênior especialista em React.
>
> **CONTEXTO:** 
> O foco atual é a criação da fundação de componentes do sistema, especificamente o módulo de histórico e chat visual. A base de referência aprovada é o [ESPECIFICACAO_FRONTEND.md](./ESPECIFICACAO_FRONTEND.md).
> 
> **INTENÇÃO:** 
> Baseado APENAS no documento de especificação aprovado, gere os códigos para os componentes visuais `ChatWindow.jsx`, `MessageList.jsx` e o custom hook `useChat.js`.
> 
> **RESTRIÇÕES INEGOCIÁVEIS:**
> 1. Código limpo, componentização pura (componentes não devem conter lógicas de API).
> 2. Toda a lógica de fetch, tratamento de estado e chamadas à API devem ficar restritas ao hook `useChat.js`.
> 3. Sem o uso de bibliotecas de componentes de terceiros para esta etapa, mantenha HTML/CSS puros ou Styled Components simples caso solicitado.
> 
> **PARÂMETROS DE SAÍDA:**
> Devolva a implementação completa dos três arquivos de código exigidos, separando claramente cada bloco com seu respectivo caminho.
