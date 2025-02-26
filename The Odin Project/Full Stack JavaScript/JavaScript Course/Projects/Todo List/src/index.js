import './assets/style.css';
import './assets/scripts/inputHandler.js';
import './assets/scripts/ui.js';

localStorage.clear(); // TEST!!!

const todo = (function () {
  const overdueContainer = document.getElementById('overdueContainer');
  const todoContainer = document.getElementById('todoContainer');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    {
      name: 'Create a new project',
      desc: '',
      dueDate: '',
      priority: '4',
      completed: false,
      project: 'undefined',
    },
    {
      name: 'Add a new task',
      desc: '',
      dueDate: '',
      priority: '4',
      completed: false,
      project: 'undefined',
    },
  ];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function render() {
    overdueContainer.innerHTML = '';
    todoContainer.innerHTML = '';

    const today = new Date();

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      const taskDate = new Date(task.dueDate);
      const div = document.createElement('div');
      div.classList.add('item');
      div.dataset.itemIndex = i;

      const top = document.createElement('div');
      top.classList.add('top');
      const topContainer = document.createElement('div');
      topContainer.classList.add('top-container');
      const checkbox = document.createElement('div');
      checkbox.classList.add('item-checkbox');
      const title = document.createElement('div');
      title.innerText = task.name;
      title.classList.add('item-title');
      const desc = document.createElement('div'); // PENDING: Add in item/task overview; show after interaction with it
      desc.innerText = task.desc;
      desc.classList.add('item-description');

      topContainer.append(checkbox, title);
      top.appendChild(topContainer);

      const bottom = document.createElement('div');
      bottom.classList.add('bottom');
      const bottomContainer = document.createElement('div');
      bottomContainer.classList.add('bottom-container');
      bottomContainer.style.cssText =
        'background-color: inherit; border: none;';
      const el = document.createElement('i');
      el.innerText = `# ${task.project}`;
      const dueDate = document.createElement('div');
      dueDate.innerText = task.dueDate
        ? task.dueDate.split('T').join(' at ')
        : 'No due date';
      const button = document.createElement('button');
      button.classList.add('itemProject');
      button.addEventListener('click', (ev) => {
        ev.stopPropagation();
      });
      const priority = document.createElement('div');
      priority.innerText = `Priority: ${task.priority}`;

      button.appendChild(el);
      bottomContainer.append(dueDate, priority, button);
      bottom.appendChild(bottomContainer);
      div.append(top, bottom);

      if (!task.dueDate) {
        todoContainer.appendChild(div);
      } else if (taskDate < today) {
        overdueContainer.appendChild(div);
      } else {
        todoContainer.appendChild(div);
      }
    }

    const projects =
      JSON.parse(localStorage.getItem('projects')) ||
      `
      <div
        class="project"
        id=""
      >
        <button>
          <h4>My First Project</h4>
        </button>
      </div>
      `;

    const container = document.getElementById('userProjectsContainer');
    container.innerHTML = '';

    projects.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.innerHTML = project;
      container.appendChild(projectDiv);
    });
  }

  function add(task) {
    tasks.push(task);
    saveTasks();
    render();
  }

  return { add, render };
})();

(function () {
  const form = document.getElementById('popupForm');
  const overlay = document.getElementById('popupOverlay');
  const createTaskButton = document
    .getElementById('createTask')
    ?.querySelector('button');

  if (createTaskButton) {
    createTaskButton.addEventListener('click', () => {
      overlay.style.display = 'flex';
    });
  }

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  form.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(form);
    const task = Object.fromEntries(formData.entries());
    task.completed = false;

    todo.add(task);
    form.reset();
    overlay.style.display = 'none';
  });
})();

function createProjectElement(name, parent) {
  if (name.length < 3) {
    console.log('please enter 3 or more characters');
    return;
  } else if (name.length > 15) {
    console.log('please enter less than 16 characters');
    return;
  }

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="project" id="${name.replace(/\s+/g, ' ').split(' ').join('-')}">
    <button>
      <h4>${name.replace(/\s+/g, ' ')}</h4>
    </button>
  </div>
  `;
  parent.appendChild(div);

  const existingProjects = JSON.parse(localStorage.getItem('projects'));
  existingProjects.push(div.innerHTML);

  localStorage.setItem('projects', JSON.stringify(existingProjects));
}

(function () {
  const form = document.getElementById('projectForm');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(form);
    const project = Object.fromEntries(formData.entries());
    createProjectElement(project.name, form.parentElement);

    form.reset();
  });
})();

while (true) {
  todo.render();
}
