let countdown = 10;
const timerElement = document.getElementById('timer');

const intervalId = setInterval(() => {
    if (countdown <= 0) {
        clearInterval(intervalId);
        timerElement.textContent = 'Time’s up!';
    } else {
        timerElement.textContent = countdown--;
    }
}, 1000);
