const player = document.querySelector('.player');
const gameOverScreen = document.getElementById('game-over');
const menuButton = document.getElementById('menu-button');
const finalScoreElement = document.getElementById('final-score');
const princesa = document.getElementById('princesa');
const scoreElement = document.getElementById('score');
const pontosElement = document.getElementById('pontos');

const reiGelado = document.getElementById('reiGelado');
/* Adicionar lógica rei gelado,  aumento velocidade e outra princesa*/
let score = 0;
let escudoAtivo = false;
let playerEstaPulando = false;
let scoreIntervalo;
let velocidadeDoObstaculo = 2;
let playerEstaAbaixado = false;
let pontos = 0;

setInterval ( () => {
  if(velocidadeDoObstaculo > 0.5){
    velocidadeDoObstaculo -= 0.3;
    obstaculo.style.animationDuration = `${velocidadeDoObstaculo}`;
  }
}, 30000);

// Função para atualizar o score
function atualizarScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // Mostrar a princesa quando o score 3
  if (score === 16 || (score > 10 && (score - 16) % 50 === 0)) {
    princesa.style.display = 'block'; 
  
  setTimeout(() => {
    princesa.style.display = 'none';
  }, 5000);
}
if (score === 20 || (score > 20 && (score - 20) % 30 === 0)) {
  reiGelado.style.display = 'block'; 
  reiGelado.style.animationPlayState = 'running'; 

  setTimeout(() => {
    reiGelado.style.display = 'none'; 
    reiGelado.style.animationPlayState = 'paused';  
  }, 5000);
}

}

scoreIntervalo = setInterval(atualizarScore, 1000);







// Função para abaixar 
document.addEventListener('keydown', (event) => {
  if (event.code === "ArrowDown" || event.key === "ArrowDown") {
    playerEstaAbaixado = true;
    player.style.bottom = "0px"; 
    player.style.height = "180px"; 
    
    

    setTimeout(() => {
      playerEstaAbaixado = false;
      player.style.bottom = "50px"; 
      player.style.height = "300px";
    }, 600);
  }
});

const verificarColisaoReiGelado = () => {
  const reiGeladoPosition = reiGelado.getBoundingClientRect();
  const playerPosition = player.getBoundingClientRect();

  if (playerEstaAbaixado) {

    return;
  }


  if (
    playerPosition.top <= reiGeladoPosition.bottom &&
    playerPosition.left + playerPosition.width >= reiGeladoPosition.left &&
    playerPosition.left <= reiGeladoPosition.left + reiGeladoPosition.width
  ) {
    
    gameOver();
  }
};

const gameOver = () => {
  clearInterval(scoreIntervalo); 
  gameOverScreen.style.display = 'flex'; 
  finalScoreElement.textContent = `Score: ${score}`;
};
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
    pontos++; // Incrementa os pontos
    pontosElement.textContent = `Pontos: ${pontos}`;
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
    
    gameOver();
  }

  verificarColisaoPrincesa();
  verificarColisaoReiGelado();

}, 10);



// Botão para voltar ao menu
menuButton.addEventListener('click', () => {
  window.location.href = 'menu.html';
});
