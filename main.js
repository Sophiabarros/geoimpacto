const slider = new Siema()

const buttonPrev = document.querySelector('#prev')
const buttonNext = document.querySelector('#next')

buttonPrev.addEventListener('click', () => slider.prev())
buttonNext.addEventListener('click', () => slider.next())

//cria outro js p mexer