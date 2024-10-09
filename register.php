<?php
require 'config.php';
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Basic input validation
    if (strlen($username) < 3 || strlen($password) < 6) {
        echo 'Username or password is too short!';
        exit;
    }

    // Check if username already exists
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        echo 'Username already taken!';
        exit;
    }

    // Insert new user
    $stmt = $pdo->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    if ($stmt->execute([$username, $password])) {
        echo 'User registered successfully!';
    } else {
        $errorInfo = $stmt->errorInfo();
        echo 'Registration failed: ' . $errorInfo[2];
    }
}
