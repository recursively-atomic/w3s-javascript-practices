const countDisplay = document.getElementById('count');
const messageDisplay = document.getElementById('message');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');

countDisplay.innerText = 0;
localStorage.clear();

function updateCount(value) {
    countDisplay.innerText = value;;
}

function updateMessage(button, string) {
    messageDisplay.style.display = 'block';
    messageDisplay.innerText = string;

    button.disabled = true;

    setTimeout(() => {
        messageDisplay.style.display = 'none';
        messageDisplay.innerText = '';

        button.disabled = false;
    }, 1000);
}

function increaseCount() {
    const currentValue = parseInt(countDisplay.innerText);

    updateCount(currentValue + 1);
}

function decreaseCount() {
    const currentValue = parseInt(countDisplay.innerText);

    updateCount(currentValue - 1);
}

function resetCount() {
    updateCount(0);
}

function saveCount() {
    const currentValue = parseInt(countDisplay.innerText);
    localStorage.setItem('count', currentValue);

    updateMessage(saveButton, `Count saved to ${currentValue}!`);
}

function loadCount() {
    const previousValue = localStorage.getItem('count');

    updateCount(previousValue);
    updateMessage(loadButton, `Count loaded to ${previousValue}!`);
}