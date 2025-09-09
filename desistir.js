  const btnDesistir = document.getElementById('btn-desistir');

  btnDesistir.addEventListener('click', () => {
    const confirmar = confirm("Tem certeza? Você perderá o seu progresso e voltará para games.html");
    if(confirmar){
      window.location.href = "games.html";
    }
  });
