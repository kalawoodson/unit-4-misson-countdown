// Create Audio for countdown
function createBeep(frequency = 800, duration = 200) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Get DOM Elements
const startTimeoutBtn = document.getElementById('start-timeout');
const timeoutDisplay = document.getElementById('timeout-display');
const startIntervalBtn = document.getElementById('start-interval');
const intervalDisplay = document.getElementById('interval-display');
const repeatGo = document.querySelectorAll('.repeat-go');

//Convert repeat to an array
const repeatGoArray = Array.from(repeatGo);

//Event Listener for clicking the Get Ready Button
startTimeoutBtn.addEventListener('click',function() {
    timeoutDisplay.textContent = "Getting ready...";

    setTimeout(function() {
        timeoutDisplay.textContent = "READY!";
    }, 5000)
});

startIntervalBtn.addEventListener('click', function() {
    let count = 5;
    
    const intervalTimer = setInterval(function() {
        intervalDisplay.textContent = count;
        // Play beep sound for countdown numbers
        if (count > 0) {
            createBeep(800, 200); // 800Hz frequency, 200ms duration
        } else if (count === 0) {
            // Different sound for "GO!"
            createBeep(1200, 500); // Higher pitch, longer duration
        }
        
        count--;
        
        if (count < 0) {
            intervalDisplay.textContent = "GO!";
            clearInterval(intervalTimer);
        }
    }, 1000);
});