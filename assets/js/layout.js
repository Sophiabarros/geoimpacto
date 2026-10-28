/* ==========================================================================
   GeoImpacto — comportamento compartilhado do layout
   - área da conta no cabeçalho (Entrar / Minha pontuação / Sair)
   - menu mobile (hambúrguer)
   - botão "voltar ao topo"
   - utilitários de interface em GeoImpacto.ui
   ========================================================================== */
(function () {
  const { session } = window.GeoImpacto;
  const { SLOW_REQUEST_MS } = window.GEOIMPACTO_CONFIG;

  /* ---------- Utilitários de interface ---------- */

  // Cria elementos com texto seguro (textContent — nunca innerHTML com dados da API)
  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null || value === false) continue;
      if (key === "class") el.className = value;
      else if (key === "text") el.textContent = value;
      else if (key.startsWith("on")) el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value === true ? "" : value);
    }
    el.append(...children.flat().filter((c) => c != null && c !== false));
    return el;
  }

  // Mostra "carregando…" no container. Se demorar, avisa que o servidor está acordando.
  function loading(container, text = "Carregando…") {
    const hint = h("small", { class: "loading-state__hint", hidden: true, text: "O servidor está acordando, isso pode levar alguns segundos." });
    container.replaceChildren(
      h("div", { class: "loading-state", role: "status" }, h("span", { class: "spinner", "aria-hidden": "true" }), h("span", { text }), hint)
    );
    const timer = setTimeout(() => (hint.hidden = false), SLOW_REQUEST_MS);
    return () => clearTimeout(timer);
  }

  // Mensagem de erro amigável com botão "Tentar novamente"
  function errorState(container, message, onRetry) {
    container.replaceChildren(
      h("div", { class: "error-state", role: "alert" },
        h("p", { text: message }),
        onRetry && h("button", { class: "btn btn--azul", type: "button", text: "Tentar novamente", onclick: onRetry }))
    );
  }

  const ordinal = (n) => `${n}º`;

  // Caminho até a raiz do site, a partir do link do logo (./, ../ ou ../../)
  const logoHref = document.querySelector(".logo")?.getAttribute("href") || "./index.html";
  const root = logoHref.replace(/index\.html$/, "");
  const url = (path) => `${root}${path}`;

  function logout() {
    session.clear();
    if (document.body.hasAttribute("data-requires-login")) {
      window.location.href = url("index.html");
      return;
    }
    renderAccount();
    document.dispatchEvent(new CustomEvent("geoimpacto:logout"));
  }

  window.GeoImpacto.ui = { h, loading, errorState, ordinal, url, logout };

  /* ---------- Conta no cabeçalho ---------- */
  function renderAccount() {
    const slot = document.querySelector("[data-account]");
    if (!slot) return;
    const user = session.getUser();

    if (!user) {
      slot.replaceChildren(h("a", { class: "nav-login", href: url("pages/login.html"), text: "Entrar" }));
      return;
    }

    const primeiroNome = String(user.nome || "").trim().split(/\s+/)[0] || "Você";
    slot.replaceChildren(
      h("a", { class: "user-chip", href: url("pages/minha-pontuacao.html"), title: "Minha pontuação", text: primeiroNome }),
      h("button", { class: "nav-logout", type: "button", text: "Sair", onclick: logout })
    );
  }
  renderAccount();

  /* ---------- Menu mobile ---------- */
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
    header.querySelector(".site-nav").addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  }

  /* ---------- Voltar ao topo ---------- */
  const topButtons = document.querySelectorAll("[data-scroll-top]");
  topButtons.forEach((btn) => {
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  });
  // no celular o botão flutua e só aparece depois de rolar um pouco
  if (topButtons.length) {
    const update = () => topButtons.forEach((btn) => btn.classList.toggle("is-visible", window.scrollY > 600));
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
})();
