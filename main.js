const slider = new Siema()

const buttonPrev = document.querySelector('#prev')
const buttonNext = document.querySelector('#next')
const btnUp = document.getElementById("up")

buttonPrev.addEventListener('click', () => slider.prev())
buttonNext.addEventListener('click', () => slider.next())

btnUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  //cria outro js p mexerconst carousel = document.querySelector('.selecao');

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('grabbing');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.classList.remove('grabbing');
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.classList.remove('grabbing');
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return; // só arrasta se o mouse estiver pressionado
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.2; // multiplicador = sensibilidade
  carousel.scrollLeft = scrollLeft - walk;
});
