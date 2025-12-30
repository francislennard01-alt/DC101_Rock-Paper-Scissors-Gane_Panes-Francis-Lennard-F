// Game state variables
var playerScore = 0;
var computerScore = 0;
var drawScore = 0;
var currentStreak = 0;
var highScore = 0;

// Choice emoji mapping
var choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

/**
 * Initialize game - load high score from localStorage
 */
function initGame() {
    var savedHighScore = localStorage.getItem('rpsHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        document.getElementById('high-score').textContent = highScore;
    }
}

/**
 * Get computer's random choice
 * @returns {string} - 'rock', 'paper', or 'scissors'
 */
function getComputerChoice() {
    var choices = ['rock', 'paper', 'scissors'];
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determine the winner of the game
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} - 'win', 'lose', or 'draw'
 */
function determineWinner(playerChoice, computerChoice) {
    // Check for draw
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    // Check for player win conditions
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    // Otherwise, player loses
    return 'lose';
}

/**
 * Update the score display based on game result
 * @param {string} result - 'win', 'lose', or 'draw'
 */
function updateScores(result) {
    if (result === 'win') {
        // Player wins - increment player score and streak
        playerScore++;
        currentStreak++;
        document.getElementById('player-score').textContent = playerScore;
        
        // Update high score if current streak is higher
        if (currentStreak > highScore) {
            highScore = currentStreak;
            localStorage.setItem('rpsHighScore', highScore);
            document.getElementById('high-score').textContent = highScore;
        }
    } else if (result === 'lose') {
        // Player loses - increment computer score and reset streak
        computerScore++;
        currentStreak = 0;
        document.getElementById('computer-score').textContent = computerScore;
    } else {
        // Draw - increment draw score
        drawScore++;
        document.getElementById('draw-score').textContent = drawScore;
    }
}

/**
 * Display the result of the game round
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 * @param {string} result - 'win', 'lose', or 'draw'
 */
function displayResult(playerChoice, computerChoice, result) {
    var resultDisplay = document.getElementById('result-display');
    var playerChoiceIcon = document.getElementById('player-choice-icon');
    var computerChoiceIcon = document.getElementById('computer-choice-icon');
    var resultText = document.getElementById('result-text');

    // Show result display
    resultDisplay.classList.remove('hidden');

    // Set choice icons with emojis
    playerChoiceIcon.textContent = choiceEmojis[playerChoice];
    computerChoiceIcon.textContent = choiceEmojis[computerChoice];

    // Add bounce animation to icons
    playerChoiceIcon.classList.add('bounce');
    computerChoiceIcon.classList.add('bounce');

    // Remove animation class after animation completes
    setTimeout(function() {
        playerChoiceIcon.classList.remove('bounce');
        computerChoiceIcon.classList.remove('bounce');
    }, 500);

    // Set result text and apply appropriate styling
    resultText.className = 'result-text ' + result;
    
    if (result === 'win') {
        resultText.textContent = '🎉 You Win!';
    } else if (result === 'lose') {
        resultText.textContent = '😢 You Lose!';
    } else {
        resultText.textContent = '🤝 It\'s a Draw!';
    }
}

/**
 * Main game function - plays one round
 * @param {string} playerChoice - Player's choice ('rock', 'paper', or 'scissors')
 */
function playGame(playerChoice) {
    // Get computer's choice
    var computerChoice = getComputerChoice();
    
    // Determine the winner
    var result = determineWinner(playerChoice, computerChoice);
    
    // Update scores
    updateScores(result);
    
    // Display the result
    displayResult(playerChoice, computerChoice, result);
}

/**
 * Hide the result display to play another round
 */
function playAgain() {
    var resultDisplay = document.getElementById('result-display');
    resultDisplay.classList.add('hidden');
}

/**
 * Reset all scores and game state
 */
function resetGame() {
    // Confirm before resetting
    var confirmReset = confirm('Are you sure you want to reset all scores?');
    
    if (confirmReset) {
        // Reset all score variables
        playerScore = 0;
        computerScore = 0;
        drawScore = 0;
        currentStreak = 0;
        
        // Update score display
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('computer-score').textContent = computerScore;
        document.getElementById('draw-score').textContent = drawScore;
        
        // Hide result display
        var resultDisplay = document.getElementById('result-display');
        resultDisplay.classList.add('hidden');
    }
}

// Initialize the game when page loads
initGame();