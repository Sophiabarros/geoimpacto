---
name: geoimpacto-fullstack
description: Desenvolvimento full stack no GeoImpacto (site educativo sobre desastres naturais, HTML/CSS/JS puro + API Node/Express na Vercel com PostgreSQL Neon). Use ao criar ou alterar páginas, estilos, scripts, integração com o backend, deploy, ou ao revisar design, responsividade e acessibilidade deste projeto.
---

# GeoImpacto — desenvolvedor full stack

Você atua como dev full stack sênior neste projeto. O frontend é estático (sem build, sem framework)
e é publicado como site estático (Vercel/Netlify/GitHub Pages); o backend é uma API Node/Express
separada, publicada na Vercel (local: `http://localhost:3333`).

## Arquitetura (respeite sempre)

```
index.html                 home (única página na raiz)
pages/*.html               learn, games, quiz, ranking, about-us, linha-do-tempo, login, cadastro
pages/learn/*.html         um arquivo por tema: furacao, terremoto, tsunami, incendios, enchente, vulcao
assets/css/base.css        design system: tokens, reset, tipografia, header, footer, botões, formulários
assets/css/components/     componentes reutilizáveis (podium.css)
assets/css/pages/*.css     um arquivo por página (learn-topic.css serve os 6 temas)
assets/js/config.js        API_URL (local x produção), timeouts
assets/js/api.js           window.GeoImpacto = { api.register/login/saveScore/getRanking/getUserScore, session, ApiError }
assets/js/layout.js        conta no header (Entrar / nome / Sair), menu mobile, GeoImpacto.ui (h, loading, errorState, url, logout)
assets/js/podium.js        pódio top 3 reutilizável
assets/js/pages/*.js       lógica de cada página (auth, quiz, minha-pontuacao, carousel)
assets/js/vendor/          bibliotecas de terceiros (siema)
assets/img/<área>/         imagens .webp, nomes sem acento/espaço
```

Regras:
- Nomes de arquivos e pastas **sem acentos nem espaços** (quebram URLs em servidores).
- Nada de CSS inline nem `<script>` inline nas páginas. Estilo novo vai no CSS da página; algo reutilizável vai para `base.css`.
- Ordem no `<head>`: fonte Lexend → `base.css` → CSS de componentes → CSS da página → `config.js` → `api.js` → `layout.js` → (`podium.js`) → script da página. Todos os scripts com `defer`. Scripts são clássicos (não módulos) para funcionar até sem servidor.
- URL do backend existe **só** em `assets/js/config.js`. Nunca escreva `fetch("http...")` fora de `api.js`.
- Caminhos relativos: raiz usa `./assets/...`, `pages/` usa `../assets/...`, `pages/learn/` usa `../../assets/...`.

## Design system (estética original — preservar)

- Cores em `base.css`: `--azul-escuro #1E3D59` (principal), `--verde-musgo #4A7C59` (destaques/ativo), `--laranja #F77F00` (ações/CTA), `--gelo #F9F9F9` (fundo), `--cinza-claro #D9D9D9`.
- Fonte única: **Lexend** (300–800). Títulos 700–800 em azul; palavra de destaque em `.verde`.
- Raio padrão `--radius: 15px`; imagens com `--radius-sm`; sombras `--shadow-sm/md/lg`.
- Tamanhos fluidos com `clamp()` nos tokens `--fs-*`; espaçamento entre seções `--section-gap`.
- Botões: `<a class="btn">` ou `<button class="btn">` + variantes `btn--verde`, `btn--azul`, `btn--claro`, `btn--lg`, `btn--block`. **Nunca** `<button><a>…</a></button>`.
- Header: mesmo markup em todas as páginas (`.site-header`, `.site-nav`, `.nav-toggle`, `.user-chip[data-user-name]`); link ativo com `aria-current="page"`. Sobre imagem/fundo escuro use `.site-header--overlay`.
- Rodapé `.site-footer` em todas as páginas, exceto login/cadastro (tela dividida).

## Responsividade

Mobile-first na prática: grids com `minmax(0, 1fr)`/`auto-fit`, imagens com `aspect-ratio` + `object-fit: cover`, sem larguras fixas em px/rem para blocos de conteúdo. Breakpoints usados: 1000px, 900px (menu vira hambúrguer), 760px, 700px, 520–480px. Teste sempre em **360px**, 390px e 1440px e confirme que não há scroll horizontal.

Padrões de celular já adotados — siga-os em telas novas:
- Cabeçalho `sticky` com fundo translúcido (exceto `--overlay`); logo ganha disco claro sobre fundo escuro.
- Densidade: cards empilhados viram **linhas** (ícone/rótulo à esquerda, conteúdo à direita) — ex.: `.info`, `.stat`.
- Listas de cards de imagem em **2 colunas** (`.topic-grid`), nunca 1 card de tela cheia por vez.
- Hero com altura do conteúdo (`min-height: 0`), título com `min(var(--fs-display), 12vw)` para não encostar nas bordas.
- Ação principal visível cedo (ex.: Games reordena com `display: contents` + `order`); ações secundárias discretas (Desistir, Sair).
- Sem CTA duplicado no mesmo bloco; botão "voltar ao topo" flutuante em páginas longas.
- `text-wrap: pretty` desligado em parágrafos no celular (cria quebras prematuras).

## Backend (contrato da API — use só estas rotas e campos)

API Node/Express na Vercel + PostgreSQL (Neon). Sem token. Erros sempre `{ message }`.
URL definida **só** em `assets/js/config.js`: sempre `https://backend-geoimpacto.vercel.app`; `?api=local` (salvo no navegador) troca para `http://localhost:3333`, `?api=producao` volta.
Qualquer rota pode responder **503** (banco indisponível) e a primeira requisição pode demorar (banco pausado): `api.js` converte 503 e falha de rede em "Servidor indisponível, tente de novo em instantes." (`status` 503 ou 0).

| Função em `api.js` | Rota | Corpo | Sucesso | Erros |
|---|---|---|---|---|
| `api.register` | POST `/register` | `{ nome, email, password }` | 201 `{ message }` | 400 campos/e-mail duplicado, 500 |
| `api.login` | POST `/login` | `{ email, password }` | 200 `{ message, id, nome }` | 400 usuário não encontrado, 401 senha incorreta |
| `api.saveScore` | POST `/score` | `{ user_id, score }` (score 0 é válido) | 200 | 400, 500 (também se `user_id` não existe) |
| `api.getRanking` | GET `/ranking` (público) | — | até 3 `{ nome, maior_pontuacao }`, pode ser `[]` | — |
| `api.getUserScore` | GET `/score/:user_id` | — | `{ nome, maior_pontuacao\|null, posicao\|null, partidas, historico[{score, data}] }` | 400, 404 → limpar sessão e ir ao login |

- Todas lançam `ApiError` com `.message` (da API) e `.status` (`0` = sem conexão/tempo esgotado). Mostre na página (`.form-message`, `ui.errorState`), nunca com `alert()`.
- Sessão: `localStorage["user"] = { id, nome }` via `session.getUser/setUser/clear`. Nunca guarde senha.
- Toda chamada mostra "carregando" (`ui.loading(container)`, que avisa se o servidor estiver acordando) e trata erro com "Tentar novamente".
- Dados da API entram no DOM só via `textContent` (use `ui.h()`), nunca `innerHTML`.
- Pódio: `<div class="podium-wrap" data-podium></div>` + `podium.js` + `components/podium.css`. Use `data-podium-lazy` para carregar sob demanda com `GeoImpacto.podium.load(el)`.
- Páginas que exigem login: `<body data-requires-login>` e redirecionam para `login.html?next=<quiz|minha-pontuacao>`.

## Como adicionar um novo tema em Learn

1. Copie `pages/learn/furacao.html` para `pages/learn/<slug>.html` e troque textos, `data-tema` e imagens.
2. Coloque imagens em `assets/img/learn/<slug>/` (`hero.webp`, `card.webp`, `carrossel.webp`, …).
3. Em `learn-topic.css`, adicione `.intro[data-tema="<slug>"] { background-image: url(../../img/learn/<slug>/hero.webp); }`.
4. Adicione o card em `pages/learn.html` e o link no `.topic-nav` de **todas** as páginas de tema.
5. Os atalhos do hero (`.spam`) apontam para `#id` de uma seção existente da própria página.

## Checklist antes de concluir

- [ ] HTML válido: tags balanceadas, `id` únicos, sem `<div>` dentro de `<ul>`, `alt` nas imagens de conteúdo.
- [ ] Todos os `src`/`href`/`url()` locais existem (atenção a acentos e maiúsculas).
- [ ] Sem erros no console; quiz, login, cadastro, carrossel e menu mobile funcionando.
- [ ] Contraste legível sobre imagens; foco visível (`:focus-visible`) preservado.
- [ ] Conteúdo coerente com o tema da página (já houve texto de furacão copiado na página de vulcão).
