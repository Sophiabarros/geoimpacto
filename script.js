document.addEventListener("DOMContentLoaded", () => {
    const userSpan = document.querySelector("#user-name");
    const usuario = sessionStorage.getItem("usuario");

    if (usuario) {
        const user = JSON.parse(usuario);
        userSpan.textContent = `${user.nome}`;
        userSpan.style.display = "block";
    } else {
        userSpan.textContent = "";
        userSpan.style.display = "none";
    }
});
