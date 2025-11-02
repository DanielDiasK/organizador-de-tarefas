# Organizador de Tarefas — org-tar

Um organizador de tarefas minimalista e moderno, construído com Next.js, TypeScript, Tailwind CSS e componentes inspirados no shadcn/ui. Desenvolvido em modo escuro (dark-only) com foco em usabilidade, performance e boa experiência no dia a dia.

**Criado por:** Daniel Dias — [DanielDiasK](https://github.com/DanielDiasK)

---

## Destaques

- Tema: dark-only (tema escuro) configurado via variáveis CSS e Tailwind.
- UI: biblioteca local de componentes reutilizáveis (Button, Card, Dialog, Input, Checkbox).
- Persistência: tarefas salvas em `localStorage` via o hook `useTasks`.
- Interações: modal unificado para criar/editar tarefas, filtros com contador, ordenação e badges estilizados.
- Responsividade: modal amplo e cards que se adaptam a textos longos e tamanhos de tela.

---

## Começando (Windows - cmd.exe)

1. Abra o terminal (cmd.exe) na pasta do projeto:

```cmd
cd C:\Users\Daniel\Documents\Projetos\org-tar
```

2. Instale as dependências (usa pnpm neste projeto):

```cmd
pnpm install
```

3. Execute em modo desenvolvimento:

```cmd
pnpm dev
```

4. Abra no navegador:

http://localhost:3000

Se preferir usar `npm` ou `yarn`, adapte os comandos (porém o repositório está configurado com `pnpm`/lockfile).

---

## Visão geral das funcionalidades

- Criar tarefas com título, descrição, prioridade e data limite.
- Editar tarefas (o mesmo modal serve para criação e edição).
- Marcar tarefas como concluídas e desfazer essa ação.
- Filtrar por: Todas / Pendentes / Concluídas (com indicador visual ativo e contador).
- Ordenar por data, prioridade e título (com direção asc/desc).
- Badges para prioridade, status, prazo e data de criação (visual limpo e consistente).

---

## Estrutura do projeto (resumida)

- `app/` — entrypoint e páginas do Next.js (RSC + client components quando necessário).
- `components/` — componentes reutilizáveis e específicos da aplicação:
  - `task-list.tsx` — lista e controles (filtros, busca, ações rápidas).
  - `task-item.tsx` — card da tarefa, badges e ações (editar/excluir/toggle).
  - `add-task-modal.tsx` — modal responsivo para criar/editar tarefas.
  - `ui/*` — primitives (Button, Input, Card, Dialog, Checkbox).
- `hooks/use-tasks.ts` — gerencia estado das tarefas e sincroniza com `localStorage`.
- `public/` — assets estáticos.

---

## Notas de design e decisão técnica

- Tema escuro por padrão: simplifica a consistência visual e foi a preferência do autor.
- Uso de Lucide para ícones leves e consistentes.
- Modal unificado evita interfaces duplicadas e melhora a experiência de edição.
- Persistência local (localStorage) para simplicidade — perfeito para uso pessoal ou prototipagem.

---

## Como testar rapidamente

1. Crie algumas tarefas pelo botão "Adicionar Tarefa".
2. Teste os filtros (Todas / Pendentes / Concluídas) e observe o contador ativo.
3. Edite uma tarefa — o modal deve abrir com os campos preenchidos.
4. Experimente textos longos nas tarefas: os cards agora quebram corretamente sem quebrar o layout.

---

## Personalização rápida

- Para alterar o link do GitHub (header/rodapé): edite `app/page.tsx`.
- Para mudar comportamento de persistência (ex.: usar backend): substitua `hooks/use-tasks.ts` pela integração desejada.

---

## Créditos

Feito com ❤️ por Daniel Dias — [DanielDiasK](https://github.com/DanielDiasK)
