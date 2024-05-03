let timeElapsed = 0.0; 
const timerElement = document.getElementById('timer');
const toggleButton = document.getElementById('toggleButton');
const restartButton = document.getElementById('restartButton');
let intervalId = null;
let isRunning = false;

function updateDisplay(time) {
    let seconds = Math.floor(time);
    let milliseconds = Math.floor((time - seconds) * 100);
    timerElement.textContent = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
}

toggleButton.onclick = function() {
    if (!isRunning) {
        isRunning = true;
        toggleButton.textContent = 'Stop';
        intervalId = setInterval(() => {
            timeElapsed += 0.01;
            if (timeElapsed >= 10.0) {
                clearInterval(intervalId);
                intervalId = null;
                timerElement.textContent = 'Time’s up!';
                toggleButton.disabled = true; 
                restartButton.focus();
            } else {
                updateDisplay(timeElapsed);
            }
        }, 10);
    } else {
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        if (timeElapsed.toFixed(2) === '9.99') {
            timerElement.textContent = 'Congratulations! Perfect stop at 9.99 seconds!';
        } else {
            timerElement.textContent = `${timeElapsed.toFixed(2)}, don't stop me now!`;
        }
        toggleButton.textContent = 'Start';
        toggleButton.disabled = false;
    }
};

restartButton.onclick = function() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    timeElapsed = 0.0;
    updateDisplay(timeElapsed);
    timerElement.classList.remove('paused');
    intervalId = null;
    isRunning = false;
    toggleButton.textContent = 'Start';
    toggleButton.disabled = false;
};
