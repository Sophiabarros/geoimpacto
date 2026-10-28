/* ==========================================================================
   Login e cadastro — o formulário define o modo via data-auth="login|cadastro"
   ========================================================================== */
(function () {
  const { api, session } = window.GeoImpacto;
  const form = document.querySelector("[data-auth]");
  if (!form) return;

  const mode = form.dataset.auth;
  const message = form.querySelector(".form-message");
  const submit = form.querySelector('button[type="submit"]');
  const submitLabel = submit.innerHTML;

  // Destinos permitidos após o login (evita redirecionar para sites externos)
  const DESTINOS = { quiz: "./quiz.html", "minha-pontuacao": "./minha-pontuacao.html" };
  const next = new URLSearchParams(window.location.search).get("next");

  function showMessage(content, type = "error") {
    message.replaceChildren(...[].concat(content));
    message.dataset.type = type;
    message.hidden = false;
  }

  function markInvalid(name) {
    form.querySelectorAll("input").forEach((input) => input.removeAttribute("aria-invalid"));
    if (name && form.elements[name]) {
      form.elements[name].setAttribute("aria-invalid", "true");
      form.elements[name].focus();
    }
  }

  function setLoading(isLoading, text) {
    submit.disabled = isLoading;
    if (isLoading) submit.textContent = text;
    else submit.innerHTML = submitLabel;
  }

  const value = (name) => (form.elements[name] ? form.elements[name].value.trim() : "");

  // Se já está logado, avisa na tela de login
  if (mode === "login" && session.getUser()) {
    showMessage(`Você já está conectado como ${session.getUser().nome}. Entrar com outra conta substitui a atual.`, "info");
  }

  async function entrar() {
    try {
      const data = await api.login({ email: value("email"), password: value("senha") });
      session.setUser({ id: data.id, nome: data.nome });
      showMessage(`${data.message || "Login realizado!"} Redirecionando…`, "success");
      window.location.href = DESTINOS[next] || "../index.html";
    } catch (error) {
      if (error.status === 400) {
        markInvalid("email");
        const link = document.createElement("a");
        link.href = "./cadastro.html";
        link.textContent = "Crie uma conta";
        showMessage([`${error.message} Confira o e-mail digitado ou `, link, "."]);
      } else if (error.status === 401) {
        markInvalid("senha");
        form.elements.senha.select();
        showMessage(`${error.message} Verifique a senha e tente de novo.`);
      } else {
        showMessage(error.message);
      }
    }
  }

  async function cadastrar() {
    try {
      const data = await api.register({
        nome: `${value("nome")} ${value("sobrenome")}`.trim(),
        email: value("email"),
        password: value("senha"),
      });
      form.reset();
      showMessage(`${data.message || "Usuário cadastrado com sucesso!"} Redirecionando para o login…`, "success");
      setTimeout(() => (window.location.href = "./login.html"), 1400);
    } catch (error) {
      if (error.status === 400 && /email/i.test(error.message)) markInvalid("email");
      showMessage(error.message);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.hidden = true;
    markInvalid(null);

    if (!form.checkValidity()) {
      const invalid = form.querySelector(":invalid");
      markInvalid(invalid && invalid.name);
      showMessage("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true, mode === "login" ? "Entrando…" : "Cadastrando…");
    try {
      await (mode === "login" ? entrar() : cadastrar());
    } finally {
      setLoading(false);
    }
  });
})();
