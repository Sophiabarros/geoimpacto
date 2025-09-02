const carousel = document.getElementById("carousel");
const items = Array.from(document.querySelectorAll(".item"));
let offset = 0;
const itemWidth = 220; // largura base + margem

// Efeito de destaque e vizinhos menores
items.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    items.forEach((el, i) => {
      el.classList.remove("active", "shrink");
      if (i === index) {
        el.classList.add("active");
      } else if (i === index - 1 || i === index + 1) {
        el.classList.add("shrink");
      }
    });
  });

  item.addEventListener("mouseleave", () => {
    items.forEach(el => el.classList.remove("active", "shrink"));
  });
});

// Navegação lateral
document.querySelector(".nav-left").addEventListener("mouseenter", () => {
  offset += itemWidth;
  moveCarousel();
});

document.querySelector(".nav-right").addEventListener("mouseenter", () => {
  offset -= itemWidth;
  moveCarousel();
});

function moveCarousel() {
  const containerWidth = document.querySelector(".carousel-container").offsetWidth;
  const maxOffset = -(carousel.scrollWidth - containerWidth);
  if (offset > 0) offset = 0;
  if (offset < maxOffset) offset = maxOffset;
  carousel.style.transform = `translateX(${offset}px)`;
}
