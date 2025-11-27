// Mostra o nome do usuário logado
const user = JSON.parse(sessionStorage.getItem("user"));
const span = document.getElementById("user-name");
span.textContent = user ? user.nome : "";

// Atualiza o ranking
async function atualizarRanking() {
  try {
    const response = await fetch("https://backend-geoimpacto.vercel.app/ranking"); // ajuste a URL
    if (!response.ok) throw new Error("Falha ao carregar o ranking");

    const ranking = await response.json();

    const primeiro = document.querySelector(".user-primeiro p");
    const segundo = document.querySelector(".user-segundo p");
    const terceiro = document.querySelector(".user-terceiro p");

    if (ranking[0]) primeiro.textContent = `${ranking[0].nome} - ${ranking[0].maior_pontuacao}`;
    if (ranking[1]) segundo.textContent = `${ranking[1].nome} - ${ranking[1].maior_pontuacao}`;
    if (ranking[2]) terceiro.textContent = `${ranking[2].nome} - ${ranking[2].maior_pontuacao}`;

  } catch (error) {
    console.error("Erro ao atualizar ranking:", error);
  }
}

// Atualiza o ranking ao carregar a página
window.addEventListener("DOMContentLoaded", atualizarRanking);
