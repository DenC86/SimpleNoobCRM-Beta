document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const login = document.getElementById('registerLogin').value;
    const password = document.getElementById('registerPassword').value;
    const repass = document.getElementById('registerRePassword').value;
    const errorMessage = document.getElementById('error-message');

    if (!/^[a-zA-Z0-9]{3,10}$/.test(login) || !/^[a-zA-Z0-9]{3,10}$/.test(password)) {
        errorMessage.textContent = "Логин и пароль могут содержать только буквы или цифры, введите корректные данные пожалуйста.";
        return;
    }

    if (password !== repass) {
        errorMessage.textContent = "Пароли не совпадают, попробуйте снова.";
        return;
    }

    localStorage.setItem('user', JSON.stringify({ login, password }));
    window.location.href = 'login.html';
});