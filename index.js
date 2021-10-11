const startBtn = document.querySelector('#startBtn');

const NUMBER_OF_ROWS = 15;
const NUMBER_OF_BOMBS = 50;

const startGame = () => {
    initGame(NUMBER_OF_ROWS, NUMBER_OF_ROWS, NUMBER_OF_BOMBS);
};

startBtn.addEventListener('click', startGame);
