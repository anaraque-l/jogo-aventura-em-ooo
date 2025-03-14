const startButton = document.getElementById('start-button');
const instructionsButton = document.getElementById('instructions-button');

// Botão "Iniciar Jogo"
startButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redireciona para a página do jogo
});

// Botão "Instruções"
instructionsButton.addEventListener('click', () => {
  alert('Instruções:\n\n1. Pressione ESPAÇO para pular.\n2. Evite os obstáculos!\n3. Salve a Princesa Jujuba!');
});