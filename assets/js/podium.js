/* ==========================================================================
   Pódio público (top 3) — GET /ranking, não exige login.
   Uso: <div data-podium></div> em qualquer página + este script.
   GeoImpacto.podium.refresh() recarrega todos os pódios da página.
   ========================================================================== */
(function () {
  const { api, ui } = window.GeoImpacto;
  const { h } = ui;

  const LUGARES = [
    { n: 1, label: "Primeiro lugar" },
    { n: 2, label: "Segundo lugar" },
    { n: 3, label: "Terceiro lugar" },
  ];

  const avatarIcon = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    svg.setAttribute("fill", "none");
    svg.innerHTML = '<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    return svg;
  };

  function place({ n, label }, jogador) {
    const nome = jogador ? String(jogador.nome || "Jogador") : null;
    return h("li", { class: `podium-place podium-place--${n}${jogador ? "" : " is-empty"}` },
      h("span", { class: "podium-rank", text: `#${n}` }),
      h("div", { class: "podium-avatar", "aria-hidden": "true" }, nome ? nome.trim().charAt(0).toUpperCase() : avatarIcon()),
      h("p", { class: "podium-name", title: nome || "", text: nome || "Vago" }),
      h("p", { class: "podium-score", text: jogador ? `${jogador.maior_pontuacao} pts` : "" }),
      h("div", { class: "podium-step" }, h("span", { class: "visually-hidden", text: label }))
    );
  }

  async function load(container) {
    const stop = ui.loading(container, "Carregando pódio…");
    try {
      const ranking = await api.getRanking();
      if (ranking.length === 0) {
        // sem botão aqui: as páginas que mostram o pódio já têm o "Jogar agora"
        container.replaceChildren(
          h("div", { class: "podium-empty" },
            h("span", { class: "podium-empty__icon", "aria-hidden": "true", text: "🏆" }),
            h("p", { text: "Ninguém pontuou ainda — seja o primeiro!" }))
        );
        return;
      }
      container.replaceChildren(
        h("ol", { class: "podium", "aria-label": "Pódio: os 3 melhores jogadores" },
          LUGARES.map((lugar) => place(lugar, ranking[lugar.n - 1])))
      );
    } catch (error) {
      ui.errorState(container, `Não foi possível carregar o pódio. ${error.message}`, () => load(container));
    } finally {
      stop();
    }
  }

  function refresh(selector = "[data-podium]") {
    return Promise.all([...document.querySelectorAll(selector)].map(load));
  }

  window.GeoImpacto.podium = { load, refresh };
  // pódios com data-podium-lazy só carregam quando a página pedir (ex.: fim do quiz)
  refresh("[data-podium]:not([data-podium-lazy])");
})();
