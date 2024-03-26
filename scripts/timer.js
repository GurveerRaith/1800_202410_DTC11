let timerInterval = null; // Tracks the setInterval reference
let totalTime = 0; // Total remaining time in seconds
let isTimerRunning = false; // Indicates if the timer is currently running

// Start or Resume Timer
function startTimer() {
    if (!isTimerRunning) { // Check if the timer is not already running
        if (totalTime <= 0) { // If totalTime is 0, get values from the input fields
            const hours = parseInt(document.getElementById('hours').value, 10);
            const minutes = parseInt(document.getElementById('minutes').value, 10);
            const seconds = parseInt(document.getElementById('seconds').value, 10);
            totalTime = hours * 3600 + minutes * 60 + seconds;
        }

        updateDisplay(); // Update display immediately before starting interval

        if (timerInterval) {
            clearInterval(timerInterval); // Clear any existing interval
        }

        timerInterval = setInterval(() => {
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                alert("Time is up!");
                isTimerRunning = false;
            } else {
                totalTime--;
                updateDisplay();
            }
        }, 1000);

        isTimerRunning = true; // Indicate that the timer is now running
    }
}

// Stop Timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        isTimerRunning = false; // Update the state to indicate the timer has been stopped
    }
}

// Reset Timer
function resetTimer() {
    stopTimer(); // Utilize stopTimer function to halt any running timer
    totalTime = 0; // Reset the total time
    document.getElementById('time').textContent = '00:00:00'; // Reset the display
}

// Update Display
function updateDisplay() {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;
    document.getElementById('time').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad numbers to two digits
function pad(number) {
    return number.toString().padStart(2, '0');
}

// Assuming you have button elements with IDs 'start', 'stop', and 'reset'
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
