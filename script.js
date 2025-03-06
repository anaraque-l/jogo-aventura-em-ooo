
const gameContainer = document.getElementById("game-container");
const player = document.querySelector('.player');

const jump = () => {
  player.classList.add('jump');
  setTimeout(() => {
    player.classList.remove('jump'); // Remove a classe após o pulo
  }, 500); // Tempo da animação de pulo
};

// Verifica se a tecla pressionada é a tecla Espaço
document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") { // Verifica a tecla Espaço
    jump();
  }
});

const elementosCenario = document.querySelectorAll(".casaArvore, .grama, .nuvem, .nuvem2, .nuvem3");
let posicoes = {};

elementosCenario.forEach(el => {
  posicoes[el.id] = parseInt(getComputedStyle(el).left) || 0;
});

const speed = 2; // Velocidade do movimento do cenário

const updateGame = () => {
  elementosCenario.forEach(el => {
    posicoes[el.id] -= speed;
    el.style.left = posicoes[el.id] + "px";

    if (posicoes[el.id] < -parseInt(getComputedStyle(el).width)) {
      posicoes[el.id] += 2 * parseInt(getComputedStyle(el).width);
    }
  });

  requestAnimationFrame(updateGame);
};

updateGame();