document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    button.onclick = (event) => {
        event.preventDefault();
        cadastrar();
    };
});

async function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !sobrenome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const data = {
        nome: nome + " " + sobrenome,
        email: email,
        password: senha
    };

    try {
        const response = await fetch("http://localhost:3333/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const resData = await response.json();

        if (!response.ok) {
            alert(resData.message || "Erro ao cadastrar.");
            return;
        }

        alert("Cadastro realizado com sucesso!");
        window.location.href = "./login.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
}
