<?php
require 'config.php';
session_start();
ini_set('display_errors', 0); // Turn off error reporting in production

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Basic input validation
    if (strlen($username) < 3 || strlen($password) < 6) {
        echo 'Username or password is too short!';
        exit;
    }

    // Check credentials
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user) {
        if ($password === $user['password']) { // Compare with plain text password
            session_regenerate_id(true); // Regenerate session ID
            $_SESSION['user_id'] = $user['id']; // Store user ID in session
            echo 'Login successful!';
        } else {
            echo 'Invalid password!';
        }
    } else {
        echo 'Invalid username!';
    }
}
?>
