# Documentação de Agentes (AGENTS.md) — Front-end

Este documento centraliza e rastreia todos os comandos (prompts) utilizados com ferramentas assistivas de IA para gerar o código e os artefatos estruturais deste repositório (Front-end).

---

## 1. Princípios Metodológicos

O desenvolvimento deste repositório é conduzido sob dois pilares fundamentais:

### 1.1 Spec-Driven Development (SDD)

O código final é um **subproduto** de uma especificação bem elaborada. Nenhuma implementação técnica deve preceder a definição clara do comportamento, das interfaces e dos contratos do sistema. O documento de referência aprovado para este repositório é o [ESPECIFICACAO_FRONTEND.md](./ESPECIFICACAO_FRONTEND.md).

### 1.2 Engenharia de Prompts — Padrão CRISP

Toda comunicação com ferramentas de IA para geração de software segue o framework **CRISP**:

| Letra | Significado | Descrição |
|-------|-------------|-----------|
| **C** | Context (Contexto) | Qual é o projeto, módulo e momento atual? |
| **R** | Role (Papel) | Quem a IA deve ser para executar a tarefa com maestria? |
| **I** | Intent (Intenção) | O que exatamente queremos que ela produza agora? |
| **S** | Strictness (Restrições) | Quais as regras de ouro arquiteturais e limites inegociáveis? |
| **P** | Parameters (Parâmetros) | Qual o formato exato da saída esperada? |

**Fluxo obrigatório em duas etapas:**
1. Utilizar prompts CRISP para gerar os **Documentos de Especificação do Sistema** (System Docs) detalhados.
2. Usar esses documentos validados como o **contexto base** para a geração automatizada dos códigos estruturais.

> **OBS:** O código é a última coisa que geramos. Após a IA responder com a especificação, leia e valide o design. Ajuste o que for necessário. Somente após a aprovação do documento, use um segundo prompt para gerar o código.

---

## 2. Diretrizes Arquiteturais do Front-end (React)

A SPA React deste repositório é projetada sob o paradigma de **orientação a componentes** com prioridade para UX, acessibilidade e desacoplamento lógico. As regras fundamentais são:

### 2.1 Apresentação vs. Comportamento

| Camada | Responsabilidade | Regra |
|--------|-----------------|-------|
| `components/` | Renderização, estilo, eventos de UI | **Sem chamadas de API. Sem lógica de estado complexa.** |
| `hooks/` | Toda a lógica de estado e efeitos colaterais (API calls) | Centralizam mutação de estado, orquestração de chamadas à API e efeitos colaterais complexos. |
| `services/` | Chamadas HTTP puras (axios) | **Sem estado.** Isolam URLs e configurações HTTP. |
| `utils/` | Funções puras de formatação/validação | **Sem estado. Sem side effects.** |

### 2.2 Regras de Ouro

1. **Componentes de UI nunca chamam `axios` ou `fetch` diretamente.** Toda comunicação com o backend passa por um custom hook, que por sua vez chama um service.
2. **Custom Hooks como camada de lógica:** garantem que a "inteligência" do front-end possa ser testada e mantida de forma totalmente independente da biblioteca de renderização visual.
3. **Services como camada HTTP:** isolam o axios e as URLs, facilitando testes e manutenção.
4. **Componentes puramente de apresentação:** recebem dados e callbacks via props — são funções declarativas focadas apenas em renderizar dados.

### 2.3 Contratos com o Back-end

O front-end depende **exclusivamente** dos contratos definidos na [ESPECIFICACAO_BACKEND.md](https://github.com/thiago-sinesio/back-end/blob/main/ESPECIFICACAO_BACKEND.md). A tabela de mapeamento Endpoint → Service → Hook está documentada na seção 7 da [ESPECIFICACAO_FRONTEND.md](./ESPECIFICACAO_FRONTEND.md).

---

## 3. Template CRISP — Prompt de Especificação

```
Aja como um [Papel de Especialista, ex: Engenheiro Front-end Sênior especialista em React].

CONTEXTO: 
Estamos desenvolvendo o módulo de [Nome do Módulo] utilizando [Stack Tecnológica]. 
Nesta etapa, o foco é construir [Descreva o foco da etapa]. 
O sistema precisa contemplar [Regra de negócio 1] e [Regra de negócio 2].

INTENÇÃO: 
Crie o Documento de Especificação do Sistema (System Docs) para este escopo. 
Este documento servirá como guia estrutural para a implementação do código posteriormente. 
Não escreva o código final ainda. O objetivo é apenas desenhar a arquitetura e os contratos.

RESTRIÇÕES INEGOCIÁVEIS:
1. Siga estritamente os princípios de Clean Code e SOLID.
2. Componentes de UI não podem conter lógica de API — apenas renderizar dados via props.
3. Toda a lógica de estado do front-end deve ser extraída para Custom Hooks.
4. Não utilize bibliotecas externas de componentes para a camada de apresentação nesta etapa.

PARÂMETROS DE SAÍDA:
Entregue a resposta em formato Markdown profissional contendo:
- Uma proposta de árvore de diretórios demonstrando a organização dos arquivos.
- Uma Lista de Componentes e Props detalhando o que será exposto.
- Uma breve explicação sobre a responsabilidade de cada camada/componente 
  para garantir que as regras de isolamento fiquem claras para a equipe.
```

### Template CRISP — Prompt de Codificação (após especificação aprovada)

```
Aja como um Engenheiro Front-end Sênior especialista em React.

CONTEXTO: 
A especificação do [Módulo X] foi aprovada. O documento de referência é 
ESPECIFICACAO_FRONTEND.md, seção [N]. O foco agora é a implementação dos 
arquivos de código descritos na especificação.

INTENÇÃO: 
Baseado APENAS no documento de especificação aprovado, gere agora o código 
completo para os arquivos: [lista de arquivos].

RESTRIÇÕES INEGOCIÁVEIS:
1. Código limpo, componentização pura (componentes não devem conter lógicas de API).
2. Toda lógica de fetch, tratamento de estado e chamadas à API devem ficar 
   restritas aos hooks customizados.
3. Sem uso de bibliotecas de componentes de terceiros para esta etapa.

PARÂMETROS DE SAÍDA:
Devolva a implementação completa dos arquivos exigidos, separando claramente 
cada bloco com seu respectivo caminho de diretório.
```

---

## 4. Histórico de Prompts

### Prompt 01 — Geração da Especificação do Front-end (System Docs)

> **Aja como um** Arquiteto de Software Sênior especialista em React.
>
> **CONTEXTO:**  
> Estamos desenvolvendo a SPA React para um sistema de chat com IA que integra com um back-end Spring Boot. A [ESPECIFICACAO_BACKEND.md](https://github.com/thiago-sinesio/back-end/blob/main/ESPECIFICACAO_BACKEND.md) já define os contratos REST. O foco é projetar a arquitetura do front-end com isolamento estrito entre apresentação e comportamento.
>
> **INTENÇÃO:**  
> Criar o Documento de Especificação do Sistema (ESPECIFICACAO_FRONTEND.md) definindo: estrutura de pastas, componentes com suas props, custom hooks com seus estados e ações, services de API, e fluxos de dados completos.
>
> **RESTRIÇÕES:**  
> - Separação absoluta: components/ (UI pura) vs hooks/ (lógica + estado) vs services/ (HTTP puro).  
> - Sem bibliotecas de componentes externas.  
> - Drag-and-drop com ProgressBar para uploads.  
>
> **RESULTADO GERADO:**
> - [ESPECIFICACAO_FRONTEND.md](./ESPECIFICACAO_FRONTEND.md) — Documento completo com 10 seções.

---

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
> - messageService.js (como ChatService.js)  
> - api.js (embutido no ChatService.js)  

---

### Prompt 03 — Análise Arquitetural do Backend e Alinhamento de Documentação

> **Aja como um Arquiteto Sênior de React.**
>
> **CONTEXTO:**  
> Pull da main do repositório back-end concluído. 23 arquivos atualizados/criados. Necessidade de validar que o código implementado no backend está aderente à especificação, e que a documentação de ambos os repositórios (AGENTS.md e specs) refletem fielmente os princípios da Parte 1: Fundações e Arquitetura (SDD, CRISP, isolamento de domínio).
>
> **INTENÇÃO:**  
> Analisar todo o código-fonte do backend (controllers, services, models, DTOs, repositories, exceptions, pom.xml), cruzar com a ESPECIFICACAO_BACKEND.md, identificar conformidades e lacunas, e atualizar os AGENTS.md de ambos os repos.
>
> **RESTRIÇÕES:**  
> - Atualizar apenas documentação, sem alterar código-fonte.  
> - Preservar histórico de prompts existente.  
> - Incorporar princípios SDD/CRISP conforme texto da Parte 1.  
>
> **RESULTADO:**  
> - AGENTS.md (front-end) — Reescrito com seções 1-4 completas.  
> - AGENTS.md (back-end) — Reescrito com seções 1-4 completas.  
> - ESPECIFICACAO_BACKEND.md — Adicionada seção 11 (Status de Implementação).  
> - **Lacunas bloqueantes identificadas:** `ChatApplication.java`, `application.yml`, `WebConfig.java`, `GlobalExceptionHandler.java` ausentes no backend.
