const taskInput = document.getElementById('task');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
const messagesContainer = document.getElementById('messages');
const messageTemplate = document.querySelector('.message');

let tasks = [];
/*
task = {content: "text", status: "in progress, finished"}
*/

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateTasks();

    taskInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { addButton.click(); } });
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearTasks);
});

function updateMessage(button, string) {
    const updatedMessage = messageTemplate.cloneNode(true);

    updatedMessage.innerText = string;
    messagesContainer.appendChild(updatedMessage);
    updatedMessage.style.display = 'block';
    button.disabled = true;
    // requestAnimationFrame(() => { updatedMessage.classList.add('show'); });

    setTimeout(() => {
        // updatedMessage.classList.remove('show');

        // updatedMessage.addEventListener('transitionend', () => {
        messagesContainer.removeChild(updatedMessage);
        updatedMessage.style.display = 'none';
        button.disabled = false;
        // }, { once: true });
    }, 1000);
}

function updateTasks() {
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';
    messagesContainer.innerHTML = '';

    if (tasks.length === 0) {
        const message = messageTemplate.cloneNode(true);

        message.innerText = 'No Saved Tasks.';
        messagesContainer.appendChild(message);
        return;
    }

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');

        button.onclick = () => removeTask(index);
        button.innerText = '✖';

        listItem.innerText = tasks[index] + ' ';
        listItem.appendChild(button);
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const inputText = taskInput.value.trim();
    const formatText = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();

    if (inputText === '') {
        updateMessage(addButton, 'Input a valid task!');
        return;
    }

    tasks.push(formatText);
    taskInput.value = '';

    saveTasks();
    updateTasks();
    updateMessage(addButton, `Saved task "${formatText}"!`);
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    updateTasks();
}

function clearTasks() {
    tasks = [];

    saveTasks();
    updateTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let saved = localStorage.getItem('tasks');

    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
}