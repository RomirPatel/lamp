<?php
require 'config.php';
session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $stmt = $pdo->prepare('SELECT * FROM todos WHERE user_id = ?');
    $stmt->execute([$user_id]);
    $todos = $stmt->fetchAll();

    foreach ($todos as $todo) {
        echo '<li>' . htmlspecialchars($todo['todo_text']) . '</li>';
    }
} else {
    echo 'User not authenticated!';
}
?>
