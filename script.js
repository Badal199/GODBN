const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("result");
const period30s = document.getElementById("period30s");
const timer30s = document.getElementById("timer30s");
const resultHistory = document.getElementById("resultHistory");

let periodNumber = 0; // Keep track of the current period
const pattern = ["SMALL", "SMALL", "BIG", "SMALL", "BIG"]; // Define the pattern
let timer;

function startTimer() {
    timer = setInterval(() => {
        const now = new Date();
        const seconds = now.getSeconds();
        const remainingSeconds = 30 - (seconds % 30);
        const minutes = now.getMinutes();
        const totalMinutes = now.getHours() * 60 + minutes;

        // Update period number for 30-second interval
        periodNumber = Math.floor(totalMinutes * 2 + (seconds >= 30 ? 1 : 0));
        period30s.innerText = `Period: ${new Date().toISOString().slice(0, 10).replace(/-/g, '')}30${String(periodNumber).padStart(3, '0')}`;

        // Update timer in format "  x x  :  x x" for 30-second interval
        const formattedTime = String.format("  %02d  :  %02d", 0, remainingSeconds).replaceAll("(?<=\\d)(?=\\d)", " ");
        timer30s.innerText = formattedTime;

        // Show random result based on the current period number
        if (remainingSeconds === 30) { // Trigger on the next period
            const result = pattern[periodNumber % pattern.length];
            resultText.innerText = `Result: ${result}`;
            addResultToHistory(periodNumber, result);
        }
    }, 1000); // Update every second
}

function addResultToHistory(period, result) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${String(period).padStart(3, '0')}</td><td>${result}</td>`;
    resultHistory.appendChild(newRow);
}

window.onload = startTimer;
