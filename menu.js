// Lógica de funcionamento do menu
const startButton = document.getElementById('start-button');
const instructionsButton = document.getElementById('instructions-button');


startButton.addEventListener('click', () => {
  window.location.href = 'index.html'; 
});


instructionsButton.addEventListener('click', () => {
  window.location.href = 'instrucoes.html'; 
});