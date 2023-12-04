document.addEventListener('DOMContentLoaded', () => {
    let cardsData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const memoryGame = document.querySelector('.memory-game');
    let flippedCards = [];
    let gameStarted = false;

    // Function to initialize the game
    function initializeGame() {
        // Hide the introductory graphic
        document.querySelector('.game-header').style.display = 'none';

        // Shuffle cards
        const shuffledCards = shuffleArray(cardsData);

        // Create cards dynamically
        shuffledCards.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face front"></div>
                    <div class="card-face back">${cardData}</div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card));
            memoryGame.appendChild(card);
        });
		// Function to flip a card
function flipCard(card) {
    if (!gameStarted) {
        return;
    }

    // Play flip sound
    document.getElementById('flipSound').play();

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}


        // Reset variables
        flippedCards = [];
        gameStarted = true;
        document.querySelector('.congratulations').style.display = 'none';
        document.getElementById('playAgainButton').style.display = 'none';
    }

    // Function to start a new game
    function startNewGame() {
        // Clear existing cards
        memoryGame.innerHTML = '';

        // Reset game state
        cardsData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        gameStarted = false;

        // Hide play again button
        document.getElementById('playAgainButton').style.display = 'none';
		
		    document.querySelector('.congratulations').style.display = 'none';


        // Display start button
        document.getElementById('startButton').style.display = 'block';

        // Display the introductory graphic
        document.querySelector('.game-header').style.display = 'block';
    }

    // Function to flip a card
    function flipCard(card) {
        if (!gameStarted) {
            return;
        }

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    // Function to check for a match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.innerText === card2.innerText;

        if (isMatch) {
            card1.removeEventListener('click', () => flipCard(card1));
            card2.removeEventListener('click', () => flipCard(card2));
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        // Check if all pairs are matched
        if (document.querySelectorAll('.flipped').length === memoryGame.childElementCount) {
            showCongratulations();
        }
    }

    // Function to show congratulations message
    function showCongratulations() {
        document.querySelector('.congratulations').style.display = 'block';
        document.getElementById('playAgainButton').style.display = 'block';
		document.getElementById('weeeSound').play();

    }

    // Function to shuffle an array
    function shuffleArray(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }1
        return shuffledArray;
    }

    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', () => {
        initializeGame();
        document.getElementById('startButton').style.display = 'none';
    });

    // Event listener for play again button
    document.getElementById('playAgainButton').addEventListener('click', () => {
        startNewGame();
    });
});
