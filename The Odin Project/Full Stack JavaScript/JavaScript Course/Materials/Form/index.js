const form1 = (function () {
  const form = document.querySelector('form');
  const name = document.getElementById('name');
  const password = document.getElementById('password');
  const errorEl = document.getElementById('error');

  const nameLength = 3;
  const passwordLength = 8;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  form.addEventListener('input', () => {
    let messages = [];

    if (name.value && name.value.length < nameLength) {
      messages.push(`Name must be at least ${nameLength} characters long!`);
    }

    if (password.value && password.value.length < passwordLength) {
      messages.push(
        `Password must be at least ${passwordLength} characters long!`
      );
    }

    errorEl.innerText = messages.join(' ');
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let messages = [];

    if (!name.value.trim()) {
      messages.push('Name is required!');
    }

    if (!password.value.trim()) {
      messages.push('Password is required!');
    } else {
      if (password.value.length < passwordLength) {
        messages.push(
          `Password must be at least ${passwordLength} characters long!`
        );
      } else if (!passwordPattern.test(password.value)) {
        messages.push(
          'Invalid password format! Must contain at least one letter and one number.'
        );
      }
    }

    errorEl.innerText = messages.join(' ');
  });
})();

const form2 = (function () {
  const form = document.getElementById('form2');
  const error = document.getElementById('error2');
  const email = document.getElementById('mail');

  const format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let messages = [];

  form.addEventListener('input', (ev) => {
    ev.preventDefault();
    email.classList.remove('invalid');
    error.innerText = '';
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    messages = [];

    if (!email.value.trim()) {
      email.classList.add('invalid');
      messages.push('Email is required!');
    } else if (!format.test(email.value) && email.value.length > 0) {
      email.classList.add('invalid');
      messages.push('Please enter a valid format!');
    }

    error.innerText = messages.join(' ');
  });
})();
