const player - document.getElementById("player");
const gameContainer = document.getElementById("game-container");

let playerx = 50; 
let playery = 50; 
let gravidade = 2; 
let poderPular = 20; 
let velocidadeY = 0; 
let estaPulando = false; 

document.addEventListener("keydown", (event) => {
    if (event.key === "" && !estaPulando){
        estaPulando  = true; 
        velocidadeY = - poderPular;
    }

});

function updateGame() {
    velocidadeY +=gravity;
    playerY += velocity 
}
