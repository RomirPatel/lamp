document.addEventListener('DOMContentLoaded', function() {
    const registerToggle = document.getElementById('register-toggle');
    const loginToggle = document.getElementById('login-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const logoutBtn = document.getElementById('logout-btn');

    window.deleteTodo = function(todoId) {
        if (confirm('Are you sure you want to delete this to-do?')) {
            fetch('delete_todo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'todo_id': todoId
                })
            })
            .then(response => response.text())
            .then(data => {
                console.log('Delete response:', data);
                showMessage(data);
                if (data.includes('To-do deleted successfully!')) {
                    fetchTodos();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('An error occurred while deleting the to-do.');
            });
        }
    };

    registerToggle.addEventListener('click', function() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
        messageDiv.style.display = 'none';
    });

    loginToggle.addEventListener('click', function() {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        messageDiv.style.display = 'none';
    });


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
            if (data.includes('User registered successfully!')) {
                document.getElementById('register-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during registration.');
        });
    });


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
                fetchTodos();
            } else {
                showMessage(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during login.');
        });
    });


    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const todoText = document.getElementById('todo-text').value;

        fetch('add_todo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'todo_text': todoText
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('To-do added successfully!')) {
                fetchTodos();
                document.getElementById('todo-text').value = '';
            } else {
                showMessage(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred while adding the to-do.');
        });
    });


    logoutBtn.addEventListener('click', function() {
        console.log('Logout button clicked');
        fetch('log_out.php', {
            method: 'POST'
        })
        .then(response => response.text())
        .then(data => {
            console.log('Logout response:', data);
            if (data.trim() === 'Logout successful!') {
                document.getElementById('todo-app').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
                showMessage('Logged out successfully.');
            } else {
                showMessage(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during logout.');
        });
    });


    function fetchTodos() {
        fetch('fetch_todos.php')
        .then(response => response.text())
        .then(data => {
            todoList.innerHTML = data;

            const checkboxes = document.querySelectorAll('.todo-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const todoId = this.dataset.todoId;
                    const doneStatus = this.checked ? '1' : '0';

                });
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
            showMessage('An error occurred while fetching to-dos.');
        });
    }

    function showMessage(message) {
      messageDiv.innerText = message;
      messageDiv.classList.remove('alert-success', 'alert-danger');

      if (message.includes('successful')) {
          messageDiv.classList.add('alert-success');
      } else {
          messageDiv.classList.add('alert-danger');
      }

      messageDiv.style.display = 'block';
  }
});
