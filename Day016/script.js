let targetNumber = Math.floor(Math.random() * 100) + 1;
let guessesRemaining = 5;

function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const hint = document.getElementById('hint');
    const remaining = document.getElementById('remaining');
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    guessesRemaining--;
    remaining.textContent = `Chances Remaining: ${guessesRemaining}`;

    if (guess === targetNumber) {
        hint.textContent = "Congratulations! You guessed it right!";
        document.querySelector('button').disabled = true;
    } else if (guessesRemaining === 0) {
        hint.textContent = `Game Over! The number was ${targetNumber}.`;
        document.querySelector('button').disabled = true;
    } else if (guess < targetNumber) {
        hint.textContent = "Higher!";
    } else {
        hint.textContent = "Lower!";
    }

    guessInput.value = ''; // Clear the input after each guess
}

document.getElementById('guessInput').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        makeGuess();
    }
});
