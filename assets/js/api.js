/* ==========================================================================
   GeoImpacto — comunicação com o backend e sessão do usuário
   Depende de config.js. Expõe tudo em window.GeoImpacto.

   Funções da API (todas retornam Promise e lançam ApiError em caso de falha):
     api.register({ nome, email, password })
     api.login({ email, password })          → { message, id, nome }
     api.saveScore({ user_id, score })
     api.getRanking()                        → [{ nome, maior_pontuacao }] (até 3)
     api.getUserScore(userId)                → { nome, maior_pontuacao, posicao, partidas, historico }

   ApiError: { message, status }  — status 0 = sem conexão / tempo esgotado;
   503 = banco indisponível. Nesses dois casos a mensagem é amigável e genérica.
   ========================================================================== */
(function () {
  const { API_URL, REQUEST_TIMEOUT_MS } = window.GEOIMPACTO_CONFIG;
  const SESSION_KEY = "user";

  // Falha de rede, tempo esgotado e 503 (banco indisponível) mostram a mesma mensagem amigável.
  const MENSAGEM_INDISPONIVEL = "Servidor indisponível, tente de novo em instantes.";

  class ApiError extends Error {
    constructor(message, status) {
      super(message);
      this.name = "ApiError";
      this.status = status;
    }
  }

  async function request(endpoint, { method = "GET", body } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch (error) {
      throw new ApiError(MENSAGEM_INDISPONIVEL, 0);
    } finally {
      clearTimeout(timer);
    }

    let data = null;
    try {
      data = await response.json();
    } catch {
      // resposta sem corpo JSON
    }

    if (!response.ok) {
      if (response.status === 503) throw new ApiError(MENSAGEM_INDISPONIVEL, 503);
      const message = (data && data.message) || `Erro inesperado (${response.status}). Tente novamente.`;
      throw new ApiError(message, response.status);
    }
    return data;
  }

  const api = {
    register: ({ nome, email, password }) => request("/register", { method: "POST", body: { nome, email, password } }),
    login: ({ email, password }) => request("/login", { method: "POST", body: { email, password } }),
    saveScore: ({ user_id, score }) => request("/score", { method: "POST", body: { user_id, score } }),
    getRanking: async () => {
      const ranking = await request("/ranking");
      return Array.isArray(ranking) ? ranking : [];
    },
    getUserScore: (userId) => request(`/score/${encodeURIComponent(userId)}`),
  };

  // Usuário logado: apenas { id, nome } — nunca senha.
  const session = {
    getUser() {
      try {
        const user = JSON.parse(localStorage.getItem(SESSION_KEY));
        return user && user.id ? user : null;
      } catch {
        return null;
      }
    },
    setUser({ id, nome }) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id, nome }));
    },
    clear() {
      localStorage.removeItem(SESSION_KEY);
    },
  };

  window.GeoImpacto = { API_URL, ApiError, api, session };
})();
