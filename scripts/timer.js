let timerInterval; // Holds the setInterval reference
let totalTime; // Total time in seconds

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    
    totalTime = (hours * 3600) + (minutes * 60) + seconds;
    updateDisplay();
    
    if (timerInterval) clearInterval(timerInterval); // Clear existing interval
    
    timerInterval = setInterval(() => {
    if (totalTime <= 0) {
        clearInterval(timerInterval);
        alert('Time is up!');
    } else {
        totalTime--;
        updateDisplay();
    }
    }, 1000);
}   

function updateDisplay() {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;
    
document.getElementById('time').textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('time').textContent = '00:00:00';
}

