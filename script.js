const emojis = ['😀', '🎉', '❤️', '🌟', '🚀', '🍀', '💡', '🐶'];
let gameArray = [...emojis, ...emojis]; // Duplicar emojis
gameArray.sort(() => 0.5 - Math.random()); // Embaralhar
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === gameArray.length) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function setupGame() {
    matchedCards = 0;
    gameBoard.innerHTML = '';
    gameArray.forEach(createCard);
}

document.getElementById('restart-btn').addEventListener('click', setupGame);

setupGame();
