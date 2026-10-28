# GeoImpacto — Frontend

Site educativo sobre desastres naturais: conteúdos sobre furacão, terremoto, tsunami, incêndios florestais,
enchentes e erupções vulcânicas, uma linha do tempo histórica e o quiz **Natural Disaster Survivor**,
com pódio público e página "Minha pontuação".

O frontend é HTML/CSS/JS puro — **não tem build nem dependências**. O backend é uma API Node.js + Express
publicada na Vercel, com banco PostgreSQL (Neon).

## URL da API

A URL fica em um único arquivo: [`assets/js/config.js`](assets/js/config.js).

```js
const API_PRODUCAO = "https://backend-geoimpacto.vercel.app";
const API_LOCAL = "http://localhost:3333";
```

O site usa **sempre a API de produção** — tanto publicado quanto aberto pelo Live Server —, então
funciona sem rodar o backend na sua máquina.

Só se você estiver rodando o backend localmente, abra o site com `?api=local` no endereço
(ex.: `http://127.0.0.1:5500/?api=local`). A escolha fica salva no navegador; para voltar à
produção, abra com `?api=producao`.

## Rodar localmente

1. Sirva esta pasta com um servidor local, por exemplo a extensão **Live Server** do VS Code,
   ou no terminal: `python -m http.server 5500` e acesse `http://localhost:5500`.
2. Pronto: o site já fala com a API de produção.

Para conferir se a API está no ar, abra `https://backend-geoimpacto.vercel.app/ranking`:
deve aparecer `[]` (ninguém jogou ainda) ou a lista do pódio.

> O banco "pausa" quando fica sem uso: a primeira requisição pode levar alguns segundos
> (o site mostra "Carregando…"). Se o banco estiver fora do ar (resposta 503) ou a internet
> cair, aparece "Servidor indisponível, tente de novo em instantes" com um botão para tentar de novo.

## Publicar o frontend

Como o site é estático, basta publicar a pasta inteira (onde está o `index.html`).
Não precisa configurar nada: `API_PRODUCAO` em `assets/js/config.js` já aponta para o backend.

**Vercel**
1. Envie o projeto para o GitHub.
2. Em vercel.com → *Add New → Project* → importe o repositório.
3. *Framework Preset*: **Other**. Deixe *Build Command* vazio e *Output Directory* como a raiz (`.`).
4. *Deploy*. Cada `git push` na branch principal publica de novo.

**Netlify**
1. Em app.netlify.com → *Add new site → Import an existing project* → escolha o repositório.
2. *Build command*: vazio. *Publish directory*: `.`
3. *Deploy site*. (Ou arraste a pasta do projeto em *Deploy manually*.)

**GitHub Pages**
1. No repositório: *Settings → Pages*.
2. *Source*: **Deploy from a branch** → branch `main`, pasta `/ (root)` → *Save*.
3. O site fica em `https://<usuario>.github.io/<repositorio>/`. Todos os caminhos são relativos,
   então funciona dentro da subpasta.

Depois de publicar, abra o site, veja se o pódio carrega na página inicial e faça um cadastro de teste.
A primeira requisição pode levar alguns segundos (o backend "acorda" na Vercel); o site mostra
"Carregando…" enquanto isso.

## Estrutura

```
index.html                 Home (com o pódio público)
pages/                     learn, games, quiz, ranking, minha-pontuacao, about-us, linha-do-tempo, login, cadastro
pages/learn/               Uma página por desastre natural
assets/css/base.css        Design system (cores, tipografia, cabeçalho, rodapé, botões, formulários, estados)
assets/css/components/     Componentes reutilizáveis (pódio)
assets/css/pages/          CSS de cada página
assets/js/config.js        URL da API (desenvolvimento x produção)
assets/js/api.js           Funções da API + sessão do usuário (localStorage)
assets/js/layout.js        Cabeçalho (Entrar / Minha pontuação / Sair), menu mobile, utilitários de interface
assets/js/podium.js        Pódio top 3 (GET /ranking)
assets/js/pages/           Scripts de cada página (auth, quiz, minha-pontuacao, carousel)
assets/img/                Imagens .webp organizadas por área
```

## Rotas da API usadas

| Método | Rota | Onde |
|---|---|---|
| POST | `/register` | Cadastro |
| POST | `/login` | Login — guarda `{ id, nome }` no `localStorage` (nunca a senha) |
| POST | `/score` | Fim do quiz — `{ user_id, score }` |
| GET | `/ranking` | Pódio na home, na página do pódio e no fim do quiz (público) |
| GET | `/score/:user_id` | Fim do quiz e "Minha pontuação" |

## Equipe

Roberta V., Letícia, Sophia B., Isabelli, Camily e Sophia L. — Unasp SP.
