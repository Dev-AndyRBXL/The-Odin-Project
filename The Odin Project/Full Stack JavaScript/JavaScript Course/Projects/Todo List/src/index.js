// localStorage.clear();

const todo = (function () {
  const overdueContainer = document.getElementById('overdueContainer');
  const todoContainer = document.getElementById('todoContainer');

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  class LinkedList {
    constructor() {
      this.head = null;
    }

    add(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }

      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    toArray() {
      const arr = [];
      let current = this.head;
      while (current) {
        arr.push(current.data);
        current = current.next;
      }
      return arr;
    }

    save() {
      localStorage.setItem('tasks', JSON.stringify(this.toArray()));
    }
  }

  const tasks = new LinkedList();

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [
    {
      name: 'Create a new project',
      desc: '',
      dueDate: '',
      priority: 4,
      completed: false,
    },
    {
      name: 'Add a new task',
      desc: '',
      dueDate: '',
      priority: 4,
      completed: false,
    },
  ];

  savedTasks.forEach((task) => tasks.add(task));

  function render() {
    overdueContainer.innerHTML = '';
    todoContainer.innerHTML = '';

    const today = new Date();
    const taskArray = tasks.toArray();

    taskArray.forEach((task, index) => {
      const taskDate = new Date(task.dueDate);

      const createDiv = () => document.createElement('div'); // lmao

      const div = createDiv();
      div.classList.add('item');
      div.dataset.itemIndex = index;

      const top = createDiv();
      top.classList.add('top');
      const topContainer = createDiv();
      topContainer.classList.add('top-container');
      const checkbox = createDiv();
      checkbox.classList.add('item-checkbox');
      const title = createDiv();
      title.innerText = task.name;
      title.classList('item-title');
      const desc = createDiv(); // show in task-info (when the user clicks on the task)
      desc.innerText = task.desc;
      desc.classList.add('item-description');

      topContainer.appendChild(checkbox);
      topContainer.appendChild(title);
      top.appendChild(topContainer);

      const bottom = createDiv();
      bottom.classList.add('bottom');
      const bottomContainer = createDiv();
      bottomContainer.classList.add('bottom-container');

      div.appendChild(top);

      div.innerHTML = `
        <div class="top">
          <div>
            <div class="task-checkbox"></div>
            <div class="task-title">${task.name}</div>
          </div>
          <div class="task-description">${task.desc}</div>
        </div>
        <div class="bottom">
          <div style="display: flex; gap: 4px">
            <i>#</i>
            <button style="background-color: inherit; border: none;"></button>
          </div>
          <div>
            ${
              task.dueDate
                ? task.dueDate.split('T').join(' at ')
                : 'No due date'
            }
          </div>
          <div>
            Priority: ${task.priority}
          </div>
        </div>
      `;

      if (!task.dueDate) {
        todoContainer.appendChild(div);
      } else if (taskDate < today) {
        overdueContainer.appendChild(div);
      } else {
        todoContainer.appendChild(div);
      }
    });
  }

  function add(task) {
    tasks.add(task);
    tasks.save();
    render();
  }

  render();

  return {
    add,
  };
})();

(function () {
  const form = document.getElementById('popupForm');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(form);
    const task = {};

    for (const [key, value] of formData.entries()) {
      task[key] = value;
    }

    task.completed = false;
    todo.add(task);

    form.reset();
  });
})();
