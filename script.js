const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");

let playerY = 300; 
let gravidade = 2;
let poderPular = 20;
let velocidadeY = 0;
let estaPulando = false;
let speed = 5; 

const elementosCenario = document.querySelectorAll(".casaArvore, .grama, .nuvem, .nuvem2, .nuvem3");
let posicoes = {};


elementosCenario.forEach(el => {
    posicoes[el.id] = parseInt(getComputedStyle(el).left) || 0;
});


document.addEventListener("keydown", (event) => {
    if ((event.key === " " || event.code === "Space") && !estaPulando) {
        estaPulando = true;
        velocidadeY = -poderPular;
    }
});

function updateGame() {
    velocidadeY += gravidade;
    playerY += velocidadeY;

    
    player.style.top = playerY + "px";

   
    if (playerY >= 350) {
        playerY = 350;
        estaPulando = false;
        velocidadeY = 0;
    }

   
    elementosCenario.forEach(el => {
        posicoes[el.id] -= speed;
        el.style.left = posicoes[el.id] + "px";

       
        if (posicoes[el.id] < -parseInt(getComputedStyle(el).width)) {
            posicoes[el.id] = window.innerWidth;
        }
    });

    requestAnimationFrame(updateGame);
}

updateGame();
