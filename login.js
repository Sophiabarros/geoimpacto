document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    button.onclick = (event) => {
        event.preventDefault();
        login();
    };
});

async function login() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("https://backend-geoimpacto.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Erro ao fazer login.");
            return;
        }

        // SALVAR SOMENTE O NECESSÁRIO
        sessionStorage.setItem("user", JSON.stringify({
            id: data.id,
            nome: data.nome
        }));

        alert("Login realizado com sucesso!");
        window.location.href = "./index.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
}
