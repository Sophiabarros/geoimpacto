/* ==========================================================================
   GeoImpacto — configuração do ambiente
   Único lugar onde fica o endereço da API. Carregado antes de api.js.

   Por padrão o site SEMPRE usa a API de produção (Vercel), inclusive quando
   aberto pelo Live Server — assim funciona sem rodar o backend na máquina.

   Só se você estiver rodando o backend localmente: abra o site com
   ?api=local no endereço (ex.: http://127.0.0.1:5500/?api=local).
   A escolha fica salva neste navegador; para voltar, use ?api=producao.
   ========================================================================== */
(function () {
  const API_PRODUCAO = "https://backend-geoimpacto.vercel.app";
  const API_LOCAL = "http://localhost:3333";

  const STORAGE_KEY = "geoimpacto:api";
  let modo = null;
  try {
    const param = new URLSearchParams(window.location.search).get("api");
    if (param === "local" || param === "producao") localStorage.setItem(STORAGE_KEY, param);
    modo = localStorage.getItem(STORAGE_KEY);
  } catch {
    // armazenamento bloqueado: usa produção
  }

  window.GEOIMPACTO_CONFIG = Object.freeze({
    API_URL: modo === "local" ? API_LOCAL : API_PRODUCAO,
    // O banco "pausa" quando fica sem uso; a primeira requisição pode demorar.
    REQUEST_TIMEOUT_MS: 30000,
    SLOW_REQUEST_MS: 3000,
  });
})();
