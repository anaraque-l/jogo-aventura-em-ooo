const player = document.querySelector('.player');
const obstaculo = document.querySelector('.obstaculo');

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
  if (
    obstaculoPosition <= 120 &&
    obstaculoPosition > 0 && 
    playerPosition >= 400 &&
    playerPosition <= 550 
  ) {
   
    obstaculo.style.animation = 'none';
    obstaculo.style.left = `${obstaculoPosition}px`;

    
    player.style.animation = 'none';
    player.style.top = `${playerPosition}px`;

  
    clearInterval(loop);

   
    alert('Game Over!');
  }
}, 10);

document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    jump();
  }
});

