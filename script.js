let currentPeriod = 0;
const results = ["SMALL", "SMALL", "BIG", "SMALL", "BIG", "SMALL", "BIG", "SMALL", "BIG"];
let currentResultIndex = 0;

const periodNumberElement = document.getElementById("periodNumber");
const countdownElement = document.getElementById("countdown");
const currentResultElement = document.getElementById("currentResult");
const resultBody = document.getElementById("resultBody");

function updateResults() {
    // Display the current result
    currentResultElement.innerText = `Current Result: ${results[currentResultIndex]}`;

    // Create a new row for the table
    const resultRow = document.createElement("tr");
    resultRow.innerHTML = `<td>${currentPeriod}</td><td>${results[currentResultIndex]}</td>`;
    resultBody.appendChild(resultRow);
    
    // Move to the next result index
    currentResultIndex = (currentResultIndex + 1) % results.length;
}

function startTimer() {
    setInterval(() => {
        currentPeriod++;
        
        // Update Period Number
        periodNumberElement.innerText = `Period Number: ${currentPeriod}`;
        
        // Show Result for the Period
        updateResults();
        
        // Reset the countdown
        let remainingSeconds = 60;
        const countdownInterval = setInterval(() => {
            if (remainingSeconds <= 0) {
                clearInterval(countdownInterval);
                return;
            }
            remainingSeconds--;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            countdownElement.innerText = `Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }, 60000); // Update every minute
}

// Start the timer when the page loads
window.onload = startTimer;
