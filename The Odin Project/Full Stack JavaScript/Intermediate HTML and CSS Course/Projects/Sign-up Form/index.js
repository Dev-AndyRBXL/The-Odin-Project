const mainForm = document.forms["mainForm"];
const createAccountBtn = document.getElementById('createAccount');

createAccountBtn.addEventListener('click', function () {
    mainForm.submit();
});
