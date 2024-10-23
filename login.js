document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.login !== login || user.password !== password) {
        errorMessage.textContent = "Неверные логин или пароль.";
        return;
    }

    window.location.href = 'crm.html';
});