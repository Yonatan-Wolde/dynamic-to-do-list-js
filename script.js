// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't save again to prevent duplication
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const text = typeof taskText === 'string' ? taskText : taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Set click event to remove task from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeFromStorage(text);
        };

        // Append button and item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to local storage only if 'save' is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field if added via UI
        if (!taskText) {
            taskInput.value = "";
        }
    }

    // Function to remove a task from Local Storage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for Add button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing 'Enter' in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
