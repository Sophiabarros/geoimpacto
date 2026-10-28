/* Banco de perguntas do quiz */
const questions = [
    {
        question: "O que é o 'olho' de um furacão?",
        answers: [
            { id: 1, text: "Ponto mais intenso de chuva e vento", correct: false },
            { id: 2, text: "Área de formação de tornados", correct: false },
            { id: 3, text: "Centro calmo com pouco vento", correct: true },
            { id: 4, text: "Região sem influência do furacão", correct: false }
        ]
    },
    {
        question: "Quais ventos caracterizam um furacão de Categoria 5?",
        answers: [
            { id: 1, text: "Menos de 119 km/h", correct: false },
            { id: 2, text: "Mais de 252 km/h", correct: true },
            { id: 3, text: "Entre 178 e 208 km/h", correct: false },
            { id: 4, text: "Entre 154 e 177 km/h", correct: false }
        ]
    },
    {
        question: "Onde está localizado o Círculo de Fogo?",
        answers: [
            { id: 1, text: "Região do Mediterrâneo", correct: false },
            { id: 2, text: "Região que contorna o Oceano Pacífico", correct: true },
            { id: 3, text: "Região do Oceano Atlântico", correct: false },
            { id: 4, text: "Região do Caribe", correct: false }
        ]
    },
    {
        question: "Qual é o ponto na superfície diretamente acima do hipocentro de um terremoto?",
        answers: [
            { id: 1, text: "Falha geológica", correct: false },
            { id: 2, text: "Epicentro", correct: true },
            { id: 3, text: "Foco", correct: false },
            { id: 4, text: "Placa tectônica", correct: false }
        ]
    },
    {
        question: "Qual escala é atualmente mais utilizada para medir terremotos?",
        answers: [
            { id: 1, text: "Escala Richter", correct: false },
            { id: 2, text: "Magnitude de Momento Sísmico (Mw)", correct: true },
            { id: 3, text: "Escala Ms", correct: false },
            { id: 4, text: "Escala Mb", correct: false }
        ]
    },
    {
        question: "O que causa um tsunami?",
        answers: [
            { id: 1, text: "Deslocamento brusco de água no oceano", correct: true },
            { id: 2, text: "Movimento de dunas submarinas", correct: false },
            { id: 3, text: "Chuvas intensas em áreas urbanas", correct: false },
            { id: 4, text: "Ventos fortes na superfície do mar", correct: false }
        ]
    },
    {
        question: "Qual tsunami é considerado catastrófico?",
        answers: [
            { id: 1, text: "Ondas de 5 a 10 metros", correct: false },
            { id: 2, text: "Ondas menores que 1 metro", correct: false },
            { id: 3, text: "Ondas de 1 a 5 metros", correct: false },
            { id: 4, text: "Ondas acima de 10 metros", correct: true }
        ]
    },
    {
        question: "Qual besouro é capaz de detectar incêndios a mais de 50 km?",
        answers: [
            { id: 1, text: "Besouro amazônico", correct: false },
            { id: 2, text: "Besouro flamejante", correct: false },
            { id: 3, text: "Besouro-da-fogo (Melanophila acuminata)", correct: true },
            { id: 4, text: "Besouro de fogo vermelho", correct: false }
        ]
    },
    {
        question: "Quais são as causas mais comuns de incêndios florestais?",
        answers: [
            { id: 1, text: "Ação humana, fogueiras, raios", correct: true },
            { id: 2, text: "Apenas erupções vulcânicas", correct: false },
            { id: 3, text: "Marés altas", correct: false },
            { id: 4, text: "Movimento de dunas", correct: false }
        ]
    },
    {
        question: "O que caracteriza uma enchente relâmpago (flash flood)?",
        answers: [
            { id: 1, text: "Acúmulo de água gradual em rios", correct: false },
            { id: 2, text: "Somente em planícies aluviais", correct: false },
            { id: 3, text: "Rápida chegada após chuvas intensas", correct: true },
            { id: 4, text: "Ocorrência apenas em áreas litorâneas", correct: false }
        ]
    },
    {
        question: "Qual tipo de enchente é causada por marés altas e tempestades?",
        answers: [
            { id: 1, text: "Enchente costeira", correct: true },
            { id: 2, text: "Enchente fluvial", correct: false },
            { id: 3, text: "Enchente pluvial", correct: false },
            { id: 4, text: "Enchente relâmpago", correct: false }
        ]
    },
    {
        question: "Como se forma um vulcão?",
        answers: [
            { id: 1, text: "Ondas de tsunami", correct: false },
            { id: 2, text: "Acúmulo de magma e abertura de fissuras na crosta", correct: true },
            { id: 3, text: "Movimento de dunas de areia", correct: false },
            { id: 4, text: "Erosão costeira", correct: false }
        ]
    },
    {
        question: "O que é liberado durante uma erupção vulcânica?",
        answers: [
            { id: 1, text: "Água do subsolo", correct: false },
            { id: 2, text: "Lava, gases tóxicos e cinzas", correct: true },
            { id: 3, text: "Apenas cinzas", correct: false },
            { id: 4, text: "Somente lava", correct: false }
        ]
    },
    {
        question: "Como prevenir os impactos de furacões?",
        answers: [
            { id: 1, text: "Ignorar alertas", correct: false },
            { id: 2, text: "Construir casas perto da costa", correct: false },
            { id: 3, text: "Monitoramento, evacuação e construções resistentes", correct: true },
            { id: 4, text: "Somente evacuar após o olho passar", correct: false }
        ]
    },
    {
        question: "O que é o efeito Coriolis nos furacões?",
        answers: [
            { id: 1, text: "Criação de marés de tempestade", correct: false },
            { id: 2, text: "Responsável pela rotação em espiral das tempestades", correct: true },
            { id: 3, text: "Aumento da velocidade do vento", correct: false },
            { id: 4, text: "Formação do olho do furacão", correct: false }
        ]
    },
    {
        question: "Quais são os tipos de ondas sísmicas que se propagam pelo interior da Terra?",
        answers: [
            { id: 1, text: "Ondas P e S", correct: true },
            { id: 2, text: "Ondas superficiais apenas", correct: false },
            { id: 3, text: "Ondas Rayleigh e Love", correct: false },
            { id: 4, text: "Ondas gravitacionais", correct: false }
        ]
    },
    {
        question: "O que deve conter em um kit de emergência para terremotos?",
        answers: [
            { id: 1, text: "Água, alimentos, rádio, remédios e documentos", correct: true },
            { id: 2, text: "Apenas alimentos", correct: false },
            { id: 3, text: "Apenas água e roupas", correct: false },
            { id: 4, text: "Somente documentos", correct: false }
        ]
    },
    {
        question: "Qual é o impacto das enchentes na saúde pública?",
        answers: [
            { id: 1, text: "Propagam doenças como leptospirose e dengue", correct: true },
            { id: 2, text: "Apenas prejudicam carros e casas", correct: false },
            { id: 3, text: "Não afetam as pessoas", correct: false },
            { id: 4, text: "Melhoram a saúde do solo", correct: false }
        ]
    },
    {
        question: "Qual é um impacto ambiental dos incêndios florestais?",
        answers: [
            { id: 1, text: "Destruição de ecossistemas e perda de biodiversidade", correct: true },
            { id: 2, text: "Aumento da fertilidade do solo", correct: false },
            { id: 3, text: "Proteção da fauna local", correct: false },
            { id: 4, text: "Resfriamento da atmosfera", correct: false }
        ]
    },
    {
        question: "Qual medida ajuda a prevenir enchentes em áreas urbanas?",
        answers: [
            { id: 1, text: "Evitar o plantio de árvores", correct: false },
            { id: 2, text: "Descarte de lixo em ruas e rios", correct: false },
            { id: 3, text: "Investir em sistemas de drenagem e áreas verdes", correct: true },
            { id: 4, text: "Construir casas sobre rios", correct: false }
        ]
    }
];

/* ==========================================================================
   Quiz — Natural Disaster Survivor
   Ao final: POST /score → GET /score/:user_id → pódio atualizado.
   ========================================================================== */
(function () {
  const { api, session, ui, podium } = window.GeoImpacto;
  const { h } = ui;

  if (!session.getUser()) {
    window.location.href = "./login.html?next=quiz";
    return;
  }

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answer-buttons");
  const nextBtn = document.getElementById("next-btn");
  const quitBtn = document.getElementById("quit-btn");
  const progressEl = document.getElementById("quiz-progress");
  const progressBar = document.getElementById("quiz-progress-bar");
  const feedbackEl = document.getElementById("quiz-feedback");
  const resultEl = document.getElementById("quiz-result");
  const statsEl = document.getElementById("quiz-stats");
  const podiumEl = document.getElementById("quiz-podium");

  let index = 0;
  let score = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function updateProgress() {
    const total = questions.length;
    progressEl.textContent = `Pergunta ${Math.min(index + 1, total)} de ${total}`;
    progressBar.style.width = `${(index / total) * 100}%`;
  }

  function reset() {
    nextBtn.hidden = true;
    feedbackEl.hidden = true;
    answersEl.replaceChildren();
  }

  function startQuiz() {
    index = 0;
    score = 0;
    shuffle(questions);
    nextBtn.textContent = "Próxima";
    resultEl.hidden = true;
    quitBtn.hidden = false;
    showQuestion();
  }

  function showQuestion() {
    reset();
    updateProgress();
    const current = questions[index];
    questionEl.textContent = `${index + 1}. ${current.question}`;

    shuffle([...current.answers]).forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.textContent = answer.text;
      button.dataset.id = answer.id;
      button.addEventListener("click", selectAnswer);
      answersEl.appendChild(button);
    });
  }

  function selectAnswer(event) {
    const correct = questions[index].answers.find((a) => a.correct);
    const selected = event.currentTarget;
    const isCorrect = Number(selected.dataset.id) === correct.id;

    if (isCorrect) score++;
    selected.classList.add(isCorrect ? "is-correct" : "is-incorrect");

    answersEl.querySelectorAll(".answer").forEach((button) => {
      if (Number(button.dataset.id) === correct.id) button.classList.add("is-correct");
      button.disabled = true;
    });

    nextBtn.hidden = false;
    nextBtn.focus();
  }

  /* ---------- Resultado ---------- */
  function setFeedback(type, ...content) {
    feedbackEl.dataset.type = type;
    feedbackEl.replaceChildren(...content);
    feedbackEl.hidden = false;
  }

  function stat(label, value, extra) {
    return h("div", { class: "stat" },
      h("span", { class: "stat__label", text: label }),
      h("strong", { class: "stat__value", text: value }),
      extra && h("span", { class: "stat__extra", text: extra }));
  }

  function renderStats(dados) {
    const total = questions.length;
    // histórico[0] é a partida que acabou de ser salva; as demais são anteriores
    const anteriores = dados && Array.isArray(dados.historico) ? dados.historico.slice(1) : [];
    const recorde = dados && dados.maior_pontuacao === score && !anteriores.some((p) => p.score >= score);
    statsEl.replaceChildren(
      stat("Nesta partida", `${score}/${total}`, `${Math.round((score / total) * 100)}% de acertos`),
      stat("Melhor pontuação", dados && dados.maior_pontuacao != null ? `${dados.maior_pontuacao}` : "—",
        recorde ? "Novo recorde!" : null),
      stat("Posição no ranking", dados && dados.posicao != null ? ui.ordinal(dados.posicao) : "—",
        dados && dados.posicao != null ? `Você está em ${ui.ordinal(dados.posicao)} lugar` : null)
    );
  }

  async function loadUserScore(user) {
    const stop = ui.loading(statsEl, "Carregando sua pontuação…");
    try {
      renderStats(await api.getUserScore(user.id));
    } catch (error) {
      if (error.status === 404) {
        session.clear();
        window.location.href = "./login.html?next=quiz";
        return;
      }
      ui.errorState(statsEl, `Sua pontuação foi salva, mas não conseguimos carregar seus dados. ${error.message}`, () => loadUserScore(user));
    } finally {
      stop();
    }
  }

  async function saveAndShow() {
    const user = session.getUser();
    if (!user) {
      setFeedback("error", "Você precisa estar logado para salvar a pontuação. ",
        h("a", { href: "./login.html?next=quiz", text: "Entrar" }));
      return;
    }

    setFeedback("info", "Salvando sua pontuação…");
    try {
      await api.saveScore({ user_id: user.id, score });
    } catch (error) {
      setFeedback("error", `Não foi possível salvar a pontuação. ${error.message} `,
        h("button", { class: "link-button", type: "button", text: "Tentar novamente", onclick: saveAndShow }));
      renderStats(null);
      return;
    }

    setFeedback("success", "Pontuação salva! ",
      h("a", { href: "./minha-pontuacao.html", text: "Ver minha pontuação" }));
    await Promise.all([loadUserScore(user), podium.load(podiumEl)]);
  }

  function showScore() {
    reset();
    progressEl.textContent = "Resultado";
    progressBar.style.width = "100%";
    questionEl.textContent = `Você acertou ${score} de ${questions.length}!`;
    nextBtn.textContent = "Jogar novamente";
    nextBtn.hidden = false;
    quitBtn.hidden = true;
    resultEl.hidden = false;
    saveAndShow();
  }

  nextBtn.addEventListener("click", () => {
    if (index >= questions.length) return startQuiz();
    index++;
    index < questions.length ? showQuestion() : showScore();
  });

  quitBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja desistir? Sua pontuação não será salva.")) {
      window.location.href = "./games.html";
    }
  });

  startQuiz();
})();
