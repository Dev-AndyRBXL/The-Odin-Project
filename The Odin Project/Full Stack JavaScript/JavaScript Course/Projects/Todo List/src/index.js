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

      const newDiv = () => document.createElement('div'); // lmao

      const div = newDiv();
      div.classList.add('item');
      div.dataset.itemIndex = index;

      const top = newDiv();
      top.classList.add('top');
      const topContainer = newDiv();
      topContainer.classList.add('top-container');
      const checkbox = newDiv();
      checkbox.classList.add('item-checkbox');
      const title = newDiv();
      title.innerText = task.name;
      title.classList.add('item-title');
      const desc = newDiv(); // show in task-info (when the user clicks on the task) - PENDING
      desc.innerText = task.desc;
      desc.classList.add('item-description');

      topContainer.appendChild(checkbox);
      topContainer.appendChild(title);
      top.appendChild(topContainer);

      const bottom = newDiv();
      bottom.classList.add('bottom');
      const bottomContainer = newDiv();
      bottomContainer.classList.add('bottom-container');
      bottomContainer.style.cssText =
        'background-color: inherit; border: none;';
      const el = document.createElement('i');
      el.innerText = '#';
      const button = document.createElement('button');
      const dueDate = newDiv();
      task.dueDate
        ? (dueDate.innerText = task.dueDate.split('T').join(' at '))
        : (dueDate.innerText = 'No due date');
      const priority = newDiv();
      priority.innerText = 'Priority:' + task.priority;

      bottomContainer.appendChild(el);
      bottomContainer.appendChild(button);
      bottomContainer.appendChild(dueDate);
      bottom.appendChild(bottomContainer);

      div.appendChild(top);
      div.appendChild(bottom);

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

/* PENDING
 (function () {
  const form = document.getElementById('projectForm');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(form);
  })
})();
 **/

console.log('a' + 'b');
