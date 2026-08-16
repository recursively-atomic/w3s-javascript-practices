const countDisplay = document.getElementById('count');
const messageDisplay = document.getElementById('message');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');
const clearButton = document.getElementById('clear');

countDisplay.innerText = 0;

function updateCount(value) {
    countDisplay.innerText = value;;
}

function updateMessage(button, string) {
    const updatedMessage = messageDisplay.cloneNode(true);
    updatedMessage.style.display = 'block';
    updatedMessage.innerText = string;

    document.getElementById('displays').append(updatedMessage);
    button.disabled = true;

    setTimeout(() => {
        updatedMessage.style.display = 'none';
        updatedMessage.innerText = '';

        document.getElementById('displays').removeChild(updatedMessage);
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

    if (previousValue !== null) {
        updateCount(previousValue);
        updateMessage(loadButton, `Count loaded to ${previousValue}!`);
    } else {
        updateMessage(loadButton, 'There is no value saved to load!');
    }
}

function clearCount() {
    localStorage.clear();

    updateMessage(clearButton, 'Erased saved count!');
}