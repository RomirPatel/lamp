document.addEventListener('DOMContentLoaded', function() {
    const registerToggle = document.getElementById('register-toggle');
    const loginToggle = document.getElementById('login-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    registerToggle.addEventListener('click', function() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
        messageDiv.style.display = 'none';
    });

    // Toggle back to login form
    loginToggle.addEventListener('click', function() {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        messageDiv.style.display = 'none';
    });

    // Handle registration
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const regUsername = document.getElementById('reg-username').value;
        const regPassword = document.getElementById('reg-password').value;

        fetch('register.php', {
            method: 'POST',
            body: new URLSearchParams({
                'username': regUsername,
                'password': regPassword
            })
        })
        .then(response => response.text())
        .then(data => {
            showMessage(data);
            if (data.includes('User registered successfully!')) { // Update the condition here
                document.getElementById('register-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during registration.');
        });
    });

    // Handle login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('login.php', {
            method: 'POST',
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === 'Login successful!') {
                messageDiv.style.display = 'none';
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('todo-app').style.display = 'block';
                document.getElementById('user-info').innerText = `Logged in as: ${username}`;
            } else {
                showMessage(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during login.');
        });
    });

    // Function to display messages
    function showMessage(message) {
        messageDiv.innerText = message;
        messageDiv.classList.remove('alert-success', 'alert-danger');

        // Change condition to check the success message
        if (message.includes('User registered successfully!')) {
            messageDiv.classList.add('alert-success');
        } else {
            messageDiv.classList.add('alert-danger');
        }

        messageDiv.style.display = 'block';
    }
});
