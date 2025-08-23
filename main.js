const slider = new Siema()

const buttonPrev = document.querySelector('#prev')
const buttonNext = document.querySelector('#next')
const btnUp = document.getElementById("up")

buttonPrev.addEventListener('click', () => slider.prev())
buttonNext.addEventListener('click', () => slider.next())

btnUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

//cria outro js p mexer