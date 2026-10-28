/* ==========================================================================
   Minha pontuação — GET /score/:user_id (só para quem está logado)
   ========================================================================== */
(function () {
  const { api, session, ui } = window.GeoImpacto;
  const { h } = ui;

  const user = session.getUser();
  if (!user) {
    window.location.href = "./login.html?next=minha-pontuacao";
    return;
  }

  const content = document.getElementById("score-content");
  const title = document.getElementById("score-title");

  const formatarData = (iso) => {
    const data = new Date(iso);
    return Number.isNaN(data.getTime()) ? "—" : data.toLocaleString("pt-BR");
  };

  function stat(label, value, extra) {
    return h("div", { class: "stat" },
      h("span", { class: "stat__label", text: label }),
      h("strong", { class: "stat__value", text: value }),
      extra && h("span", { class: "stat__extra", text: extra }));
  }

  function render(dados) {
    title.textContent = `Olá, ${dados.nome || user.nome}!`;

    if (dados.maior_pontuacao == null) {
      content.replaceChildren(
        h("div", { class: "score-empty" },
          h("p", { class: "score-empty__title", text: "Você ainda não jogou." }),
          h("p", { text: "Faça o quiz Natural Disaster Survivor para entrar no ranking." }),
          h("a", { class: "btn btn--lg", href: "./quiz.html", text: "Jogar agora" }))
      );
      return;
    }

    const historico = Array.isArray(dados.historico) ? dados.historico : [];
    content.replaceChildren(
      h("div", { class: "stats" },
        stat("Melhor pontuação", String(dados.maior_pontuacao), "pontos"),
        stat("Posição no ranking", dados.posicao != null ? ui.ordinal(dados.posicao) : "—",
          dados.posicao != null ? `Você está em ${ui.ordinal(dados.posicao)} lugar` : null),
        stat("Partidas jogadas", String(dados.partidas ?? historico.length), dados.partidas === 1 ? "partida" : "partidas")),

      h("section", { class: "history", "aria-labelledby": "historico-titulo" },
        h("h2", { id: "historico-titulo", text: "Últimas partidas" }),
        historico.length === 0
          ? h("p", { text: "Nenhuma partida registrada." })
          : h("ol", { class: "history-list" },
              historico.map((partida) =>
                h("li", { class: `history-item${partida.score === dados.maior_pontuacao ? " is-best" : ""}` },
                  h("time", { datetime: partida.data, text: formatarData(partida.data) }),
                  h("strong", { text: `${partida.score} pts` }))))),

      h("div", { class: "score-actions" },
        h("a", { class: "btn", href: "./quiz.html", text: "Jogar de novo" }),
        h("a", { class: "btn btn--azul", href: "./ranking.html", text: "Ver o pódio" }))
    );
  }

  async function load() {
    const stop = ui.loading(content, "Carregando sua pontuação…");
    try {
      render(await api.getUserScore(user.id));
    } catch (error) {
      if (error.status === 404 || error.status === 400) {
        // usuário salvo no navegador não existe mais no banco
        session.clear();
        window.location.href = "./login.html?next=minha-pontuacao";
        return;
      }
      ui.errorState(content, error.message, load);
    } finally {
      stop();
    }
  }

  document.getElementById("logout-btn").addEventListener("click", ui.logout);
  load();
})();
