const countDisplay = document.getElementById('count');
const messageDisplay = document.getElementById('message');

function updateDisplay(value) {
    countDisplay.innerText = value;
}

function increaseCount() {
    const currentValue = parseInt(countDisplay.innerText);

    updateDisplay(currentValue + 1);
}

function decreaseCount() {
    const currentValue = parseInt(countDisplay.innerText);

    updateDisplay(currentValue - 1);
}

function resetCount() {
    updateDisplay(0);
}

function s() {
    const currentValue = parseInt(countDisplay.innerText);

    messageDisplay.style.display = 'none';
    localStorage.setItem('count', currentValue);
}