document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id) {
        alert("Você precisa estar logado para jogar!");
        window.location.href = "./login.html";
        return;
    }

    startQuiz();
});


// =========================================
// QUIZ ORIGINAL (NÃO MEXI NO ARRAY 👍)
// =========================================

const questions = [
    // --- SEU ARRAY COMPLETO AQUI (NÃO ALTERADO) ---
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


const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    shuffleArray(currentQuestion.answers);

    currentQuestion.answers.forEach((answers) => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.dataset.id = answers.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.find(answer => answer.correct);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.id == correctAnswer.id) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.classList.remove("show");
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;

    salvarPontuacao(score);

    nextButton.innerHTML = "Jogue novamente";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


// =========================================
// SALVAR PONTUAÇÃO NO BANCO
// =========================================
async function salvarPontuacao(scoreFinal) {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id) {
        alert("Erro: usuário não identificado.");
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:3333/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                score: scoreFinal
            })
        });

        if (!response.ok) {
            alert("Erro ao salvar pontuação.");
            return;
        }

        alert("Pontuação salva com sucesso!");

    } catch (error) {
        console.error("Erro ao salvar score:", error);
        alert("Não foi possível salvar a pontuação.");
    }
}
