// Countdown Timer
function updateCountdown() {
    const electionDate = new Date('December 10, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = electionDate - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update DOM elements if they exist
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Dramatic countdown text
    const countdownText = document.getElementById('countdown-text');
    if (countdownText) {
        if (days === 0 && hours === 0 && minutes === 0) {
            countdownText.textContent = `Hanya ${seconds} detik lagi!`;
        } else if (days === 0 && hours === 0) {
            countdownText.textContent = `Hanya ${minutes} menit, ${seconds} detik lagi!`;
        } else if (days === 0) {
            countdownText.textContent = `Hanya ${hours} jam, ${minutes} menit lagi!`;
        } else {
            countdownText.textContent = `Tinggal ${days} hari, ${hours} jam lagi!`;
        }
        
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            countdownText.textContent = "Pemilihan telah selesai!";
        }
    }
}

// Update countdown every second
let countdownInterval;
document.addEventListener('DOMContentLoaded', function() {
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
});
