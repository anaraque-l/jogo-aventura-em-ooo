const player = document.querySelector('.player');
const princesa = document.querySelector('.princesa');
const gameOverScreen = document.getElementById('game-over');
const menuButton = document.getElementById('menu-button');
const finalScoreElement = document.getElementById('final-score');

let score = 0;
let scorePrincesa = 0;
let escudoAtivo = false;

const scoreElement = document.getElementById('score');
const scorePrincesaElement = document.getElementById('princesa-score');

let scoreIntervalo;

// Atualiza o score do jogo a cada segundo
function atualizarScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // Quando o score chega a 15, faz a princesa aparecer
  if (score === 15) {
    princesa.style.display = 'block'; // Mostra a princesa
    princesa.style.animation = 'mover-princesa 5s linear forwards'; // Inicia o movimento da princesa
  }
}

scoreIntervalo = setInterval(atualizarScore, 1000);

// Função para pular
const jump = () => {
  if (player.classList.contains('jump')) return;

  player.classList.add('jump');
  setTimeout(() => {
    player.classList.remove('jump');
  }, 500); 
};

// Ativa um escudo temporário no jogador
function ativarEscudo() {
  escudoAtivo = true;
  player.classList.add('escudo'); // Adiciona classe visual de escudo (borda amarela)
  setTimeout(() => {
    escudoAtivo = false;
    player.classList.remove('escudo');
  }, 5000); // Escudo dura 5 segundos
}

// Verifica a colisão do player com a princesa (para pulo)
function verificarColisaoPrincesa() {
  const princesaPosition = princesa.getBoundingClientRect();
  const playerPosition = player.getBoundingClientRect();

  // Verifica se o jogador está em cima da princesa
  return (
    playerPosition.bottom >= princesaPosition.top && // O jogador está em cima da princesa
    playerPosition.top <= princesaPosition.bottom && // O jogador está embaixo da princesa
    playerPosition.left < princesaPosition.right && // O jogador está dentro da área horizontal
    playerPosition.right > princesaPosition.left
  );
}

// Função para capturar a princesa enquanto o jogador pula
function verificarCapturaPrincesa() {
  if (verificarColisaoPrincesa()) {
    scorePrincesa++;
    scorePrincesaElement.textContent = `Princesa Score: ${scorePrincesa}`;
    princesa.style.display = 'none'; // Faz a princesa sumir
    ativarEscudo(); // Dá o escudo ao jogador
  }
}

// Evento de captura da princesa ao pular
document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    jump();
  }
});

// Intervalo para verificar captura de princesa
setInterval(verificarCapturaPrincesa, 50); // Verifica a cada 50ms

// Função para esconder a princesa após ela passar pela tela
function esconderPrincesaQuandoSair() {
  const princesaPosition = princesa.getBoundingClientRect();
  // Se a princesa passou completamente pela tela
  if (princesaPosition.right <= 0) {
    princesa.style.display = 'none'; // Esconde a princesa
  }
}

// Verifica se a princesa passou pela tela e esconde
setInterval(esconderPrincesaQuandoSair, 50);

// Loop para detectar colisão com o obstáculo
const loop = setInterval(() => {
  const obstaculoPosition = obstaculo.offsetLeft;
  const playerPosition = +window.getComputedStyle(player).top.replace('px', '');

  // Verifica a colisão com o obstáculo
  if (
    obstaculoPosition <= 120 &&
    obstaculoPosition > 0 &&
    playerPosition >= 400 &&
    playerPosition <= 550 &&
    !escudoAtivo // O jogador só morre se o escudo não estiver ativo
  ) {
    // Para a animação do obstáculo
    obstaculo.style.animation = 'none';
    obstaculo.style.left = `${obstaculoPosition}px`;

    // Para a animação do jogador
    player.style.animation = 'none';
    player.style.top = `${playerPosition}px`;

    // Para o loop do jogo
    clearInterval(loop);
    clearInterval(scoreIntervalo);
    finalScoreElement.textContent = `Score: ${score}`;
    
    // Mostra a tela de game over
    gameOverScreen.style.display = 'flex';
  }
}, 10);

// Botão para voltar ao menu
menuButton.addEventListener('click', () => {
  window.location.href = 'menu.html';
});
