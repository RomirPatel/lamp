<?php
require 'config.php';
session_start(); // Start session

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $todo_text = $_POST['todo_text'];

    // Check if todo_text is not empty
    if (!empty($todo_text)) {
        $stmt = $pdo->prepare('INSERT INTO todos (user_id, todo_text, done) VALUES (?, ?, 0)');
        if ($stmt->execute([$user_id, $todo_text])) {
            echo 'To-do added successfully!';
        } else {
            echo 'Failed to add to-do.';
        }
    } else {
        echo 'To-do text cannot be empty.';
    }
} else {
    echo 'User not authenticated!';
}
?>
