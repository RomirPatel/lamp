document.addEventListener('DOMContentLoaded', function() {
    const registerToggle = document.getElementById('register-toggle');
    const loginToggle = document.getElementById('login-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message'); // Reference to message area

    // Toggle to registration form
    registerToggle.addEventListener('click', function() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
        messageDiv.style.display = 'none'; // Hide message area when toggling
    });

    // Toggle back to login form
    loginToggle.addEventListener('click', function() {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        messageDiv.style.display = 'none'; // Hide message area when toggling
    });

    // Handle registration
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

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
            showMessage(data); // Show registration feedback
            if (data.includes('User registered!')) {
                // Automatically switch to the login form upon successful registration
                document.getElementById('register-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during registration.'); // Show a generic error message
        });
    });

    // Handle login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
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
                // Hide messageDiv on successful login
                messageDiv.style.display = 'none';
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('todo-app').style.display = 'block';
                document.getElementById('user-info').innerText = `Logged in as: ${username}`;
            } else {
                showMessage(data); // Show the server response
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during login.'); // Show a generic error message
        });
    });

    // Function to display messages
    function showMessage(message) {
        messageDiv.innerText = message;
        messageDiv.classList.remove('alert-success', 'alert-danger'); // Clear previous classes
        if (message.includes('successfully')) {
            messageDiv.classList.add('alert-success');
        } else {
            messageDiv.classList.add('alert-danger');
        }
        messageDiv.style.display = 'block'; // Show message area
    }
});
