const player = document.querySelector('.player');
const obstaculo = document.querySelector('.obstaculo');
const gameOverScreen = document.getElementById('game-over');
const menuButton = document.getElementById('menu-button');

const jump = () => {
  if (player.classList.contains('jump')) return;
  player.classList.add('jump');
  setTimeout(() => {
    player.classList.remove('jump');
  }, 500); 
};

const loop = setInterval(() => {
  const obstaculoPosition = obstaculo.offsetLeft;
  const playerPosition = +window.getComputedStyle(player).top.replace('px', '');

  // Verifica a colisão
  if (
    obstaculoPosition <= 120 &&
    obstaculoPosition > 0 &&
    playerPosition >= 400 &&
    playerPosition <= 550
  ) {
    // Para a animação do obstáculo
    obstaculo.style.animation = 'none';
    obstaculo.style.left = `${obstaculoPosition}px`;

    // Para a animação do jogador (se houver)
    player.style.animation = 'none';
    player.style.top = `${playerPosition}px`;

    // Para o loop do jogo
    clearInterval(loop);

    // Mostra a tela de "Game Over"
    gameOverScreen.style.display = 'flex';
  }
}, 10);

menuButton.addEventListener('click', () => {
    alert("voltando ao menu principal...")
})

document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    jump();
  }
});