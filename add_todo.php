<?php
require 'config.php';
session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $todo_text = $_POST['todo_text'];

    $stmt = $pdo->prepare('INSERT INTO todos (user_id, todo_text) VALUES (?, ?)');
    $stmt->execute([$user_id, $todo_text]);
    echo 'To-Do added!';
} else {
    echo 'User not authenticated!';
}
?>
