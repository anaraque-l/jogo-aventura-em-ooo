const player = document.querySelector('.player');
const gameOverScreen = document.getElementById('game-over');
const menuButton = document.getElementById('menu-button');
const finalScoreElement = document.getElementById('final-score');
const princesa = document.getElementById('princesa');
const scoreElement = document.getElementById('score');
/* Adicionar lógica rei gelado,  aumento velocidade e outra princesa*/
let score = 0;
let escudoAtivo = false;
let playerEstaPulando = false;
let scoreIntervalo;

// Função para atualizar o score
function atualizarScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // Mostrar a princesa quando o score 3
  if (score === 10 || (score > 10 && (score - 10) % 50 === 0)) {
    princesa.style.display = 'block'; 
  
  setTimeout(() => {
    princesa.style.display = 'none';
  }, 5000);
}
}

scoreIntervalo = setInterval(atualizarScore, 1000);

// Função para pular
const jump = () => {
  if (player.classList.contains('jump')) return; // Pra impedir o pulo duplo

  playerEstaPulando = true;
  player.classList.add('jump'); // Aplica a animação do pulo

  setTimeout(() => {
    player.classList.remove('jump'); // Para removee a animação do pulo após 0.5s
    playerEstaPulando = false;
  }, 500); 
};

document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    jump();
  }
});


const verificarColisaoPrincesa = () => {
  const princesaPosition = princesa.getBoundingClientRect();
  const playerPosition = player.getBoundingClientRect();


  if (
    playerPosition.top <= princesaPosition.bottom &&
    playerPosition.left + playerPosition.width >= princesaPosition.left &&
    playerPosition.left <= princesaPosition.left + princesaPosition.width &&
    playerEstaPulando
  ) {
    if (!escudoAtivo) {
      ativarEscudo(); 
      princesa.style.display = 'none'; 
    }
  }
};

// Ativar o escudo por 5 segundos
const ativarEscudo = () => {
  escudoAtivo = true;
  player.classList.add('escudo-ativo');
  
 
  setTimeout(() => {
    escudoAtivo = false;
    player.classList.remove('escudo-ativo');
  }, 5000);
};


const loop = setInterval(() => {
  const obstaculoPosition = obstaculo.offsetLeft;
  const playerPosition = +window.getComputedStyle(player).top.replace('px', '');

  // Verifica a colisão
  if (
    obstaculoPosition <= 120 &&
    obstaculoPosition > 0 &&
    playerPosition >= 400 &&
    playerPosition <= 550 &&
    !escudoAtivo // Logica1: O jogador só morre se o escudo não estiver ativo
  ) {
    // Para a animação 
    obstaculo.style.animation = 'none';
    obstaculo.style.left = `${obstaculoPosition}px`;

    // Para a animação do player
    player.style.animation = 'none';
    player.style.top = `${playerPosition}px`;

    // Para o loop do jogo
    clearInterval(loop);
    clearInterval(scoreIntervalo);
    finalScoreElement.textContent = `Score: ${score}`;
    
    // Mostra a tela de game over
    gameOverScreen.style.display = 'flex';
  }

  // Verifica a colisão com a princesa
  verificarColisaoPrincesa();
}, 10);



// Botão para voltar ao menu
menuButton.addEventListener('click', () => {
  window.location.href = 'menu.html';
});
