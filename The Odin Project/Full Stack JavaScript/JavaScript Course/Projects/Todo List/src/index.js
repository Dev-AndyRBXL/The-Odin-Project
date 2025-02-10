(function () {
  const today = document.getElementById('today');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    { name: 'Create a new project', dueDate: '', completed: false },
    { name: 'Add a new task', dueDate: '', completed: false },
  ];

  // Function to save tasks to localStorage

  // Function to check if a task is overdue

  // Function to render tasks

  // Function to add a new task

  // Function to toggle task completion

  // Function to delete a task

  // Event listeners

  // Render tasks initially
})();

import './assets/style.css'; // goes last to ensure proper load;
