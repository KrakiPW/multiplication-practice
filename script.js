let timer;
let timeLeft;
let score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function newProblem() {
    const num1 = getRandomInt(9);
    const num2 = getRandomInt(9);
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 8;
    document.getElementById('time').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
            document.getElementById('result').textContent += ' You lost!';
            document.getElementById('result').style.color = 'red';
            resetScore();
            setTimeout(newProblem, 2000);
        }
    }, 1000);
}

function checkAnswer() {
    const num1 = parseInt(document.getElementById('num1').textContent);
    const num2 = parseInt(document.getElementById('num2').textContent);
    const answer = parseInt(document.getElementById('answer').value);
    const result = document.getElementById('result');

    if (answer === num1 * num2) {
        result.textContent = 'Correct!';
        result.style.color = 'green';
        clearInterval(timer);
        updateScore();
        setTimeout(newProblem, 2000);
    } else if (!isNaN(answer)) {
        result.textContent = 'Incorrect! The correct answer is ' + (num1 * num2);
        result.style.color = 'red';
        clearInterval(timer);
        resetScore();
        setTimeout(newProblem, 2000);
    }
}

function showCorrectAnswer() {
    const num1 = parseInt(document.getElementById('num1').textContent);
    const num2 = parseInt(document.getElementById('num2').textContent);
    const result = document.getElementById('result');
    result.textContent = 'The correct answer is ' + (num1 * num2) + '.';
    result.style.color = 'red';
}

function updateScore() {
    score += 10;
    document.getElementById('score-value').textContent = score;
}

function resetScore() {
    score = 0;
    document.getElementById('score-value').textContent = score;
}

// Add event listener to submit answer when Enter key is pressed
document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Initialize the first problem when the page loads
window.onload = newProblem;
