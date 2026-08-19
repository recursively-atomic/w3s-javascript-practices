const countDisplay = document.getElementById('count');
const messageTemplate = document.querySelector('.message');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');
const clearButton = document.getElementById('clear');

document.addEventListener('DOMContentLoaded', () => {
    countDisplay.innerText = 0;
    messageTemplate.style.display = 'none';
}, { once: true });

function updateCount(value) {
    countDisplay.innerText = value;
}

function updateMessage(button, string) {
    const messagesContainer = document.getElementById('messages');
    const updatedMessage = messageTemplate.cloneNode(true);

    updatedMessage.innerText = string;
    messagesContainer.appendChild(updatedMessage);
    updatedMessage.style.display = 'block';
    button.disabled = true;
    requestAnimationFrame(() => { updatedMessage.classList.add('show'); });

    setTimeout(() => {
        updatedMessage.classList.remove('show');

        updatedMessage.addEventListener('transitionend', () => {
            messagesContainer.removeChild(updatedMessage);
            updatedMessage.style.display = 'none';
            button.disabled = false;
        }, { once: true });
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
    localStorage.setItem('count-onclick', currentValue);

    updateMessage(saveButton, `Count saved to ${currentValue}!`);
}

function loadCount() {
    const previousValue = localStorage.getItem('count-onclick');

    if (previousValue !== null) {
        updateCount(previousValue);
        updateMessage(loadButton, `Count loaded to ${previousValue}!`);
    } else {
        updateMessage(loadButton, 'There is no value saved to load!');
    }
}

function clearCount() {
    localStorage.removeItem('count-onclick');
    updateMessage(clearButton, 'Erased saved count!');
}