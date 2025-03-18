const player = document.querySelector('.player');
const gameOverScreen = document.getElementById('game-over');
const menuButton = document.getElementById('menu-button');
const finalScoreElement = document.getElementById('final-score');
const princesa = document.getElementById('princesa');
const scoreElement = document.getElementById('score');
const pontosElement = document.getElementById('pontos');
const musicaFundo = document.getElementById('musicaFundo');
const muteButton = document.getElementById('muteButton');
const somGameOver = document.getElementById('somGameOver');
const somPrincesa = document.getElementById('somPrincesa');
const reiGelado = document.getElementById('reiGelado');

let score = 0;
let escudoAtivo = false;;
let playerEstaPulando = false;
let scoreIntervalo;
let velocidadeDoObstaculo = 2;
let playerEstaAbaixado = false;
let pontos = 0;
somGameOver.volume = 0.7; 
document.addEventListener('DOMContentLoaded', () => {
  musicaFundo.play().catch(error => {
    console.log('A música será iniciada após a primeira interação');
  });
});
muteButton.addEventListener('click', () => {
  musicaFundo.muted = !musicaFundo.muted;
  muteButton.textContent = musicaFundo.muted ? 'Desmutar' : 'Mutar';
});
const iniciarMusica = () => {
  if(musicaFundo.paused) {
    musicaFundo.play();
  }
  document.removeEventListener('click', iniciarMusica);
  document.removeEventListener('keydown', iniciarMusica);
};

document.addEventListener('click', iniciarMusica);
document.addEventListener('keydown', iniciarMusica);
//velocidade do jogo 
setInterval(() => {
  if (velocidadeDoObstaculo > 0.5) {
    velocidadeDoObstaculo = Math.max(0.5, velocidadeDoObstaculo - 0.8); 
    obstaculo.style.animationDuration = `${velocidadeDoObstaculo}s`; 
  }
}, 30000);

const intervaloRei = score >= 50 ? 20 : 30;

function atualizarScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // Mostrar a princesa quando o score 16 e por mútiplos de 50
  if (score === 16 || (score > 10 && (score - 16) % 50 === 0)) {
    princesa.style.display = 'block'; 
  
  setTimeout(() => {
    princesa.style.display = 'none';
  }, 5000);
}
if (score === 20 || (score > 20 && (score - 20) % intervaloRei === 0)) {
  reiGelado.style.display = 'block'; 
  reiGelado.style.animationPlayState = 'running'; 

  setTimeout(() => {
    reiGelado.style.display = 'none'; 
    reiGelado.style.animationPlayState = 'paused';  
  }, 5000);
}
if (score === 100) {
  document.body.classList.add('cenario-noturno');
 
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



const gameOver = () => {
  musicaFundo.pause();
  musicaFundo.currentTime = 0;

  setTimeout(() => {
    somGameOver.currentTime = 0;
    somGameOver.play().catch(error => {
      console.log("Erro ao tocar som:", error);
    });
  }, 300);
  clearInterval(scoreIntervalo); 
  gameOverScreen.style.display = 'flex'; 
  finalScoreElement.textContent = `Score: ${score}`;
  finalScoreElement.textContent = `Score: ${score} | Pontos: ${pontos}`; 
};
// Função para pular
const jump = () => {
  if (player.classList.contains('jump')) return; // Pra impedir o pulo duplo

  playerEstaPulando = true;
  player.classList.add('jump');

  setTimeout(() => {
    player.classList.remove('jump');
    playerEstaPulando = false;
  }, 500); 
};



document.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    jump();
  } 
});



somPrincesa.volume = 0.7;
const verificarColisaoPrincesa = () => {
  const princesaPosition = princesa.getBoundingClientRect();
  const playerPosition = player.getBoundingClientRect();

  // Verifica a colisão quando o jogador estiver pulando e colidir com a princesa
  if (
    playerPosition.top <= princesaPosition.bottom &&
    playerPosition.left + playerPosition.width >= princesaPosition.left &&
    playerPosition.left <= princesaPosition.left + princesaPosition.width &&
    playerEstaPulando
  ) {
    somPrincesa.currentTime = 0; 
    somPrincesa.play().catch(error => {
      console.log("Erro ao tocar som da princesa:", error);
    });
    // Incrementa os pontos quando a princesa é tocada
    pontos++;
    pontosElement.textContent = `Pontos: ${pontos}`;

    // Ativa o escudo se não estiver ativo
    if (!escudoAtivo) {
      ativarEscudo();
      princesa.style.display = 'none'; 
    }
  }
};
;

// Ativar o escudo por 5 segundos
const ativarEscudo = () => {
  escudoAtivo = true;
  player.classList.add('escudo-ativo');
  
 
  setTimeout(() => {
    escudoAtivo = false;
    player.classList.remove('escudo-ativo');
  }, 5000);
};




// Ativar o escudo por 5 segundos
const ativarEscudo2 = () => {
  escudoAtivo2 = true;
  player.classList.add('escudo-ativo');
  
 
  setTimeout(() => {
    escudoAtivo2 = false;
    player.classList.remove('escudo-ativo');
  }, 5000);
};


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



const loop = setInterval(() => {
  const obstaculoPosition = obstaculo.offsetLeft;
  const playerPosition = +window.getComputedStyle(player).top.replace('px', '');

  // Verifica a colisão
  if (
    obstaculoPosition <= 120 &&
    obstaculoPosition > 0 &&
    playerPosition >= 400 &&
    playerPosition <= 550 &&
    !escudoAtivo // Logica Geral: O jogador só morre se o escudo não estiver ativo
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
