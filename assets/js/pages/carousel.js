/* Carrossel das páginas de conteúdo (usa a biblioteca Siema) */
(function () {
  const root = document.querySelector(".siema");
  if (!root || typeof Siema === "undefined") return;

  const slider = new Siema({ selector: root, loop: true, duration: 400 });

  document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => slider.prev());
  document.querySelector("[data-carousel-next]")?.addEventListener("click", () => slider.next());
})();
