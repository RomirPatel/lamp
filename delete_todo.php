<?php
require 'config.php';
session_start();

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $todo_id = $_POST['todo_id'];

    // Debugging line
    error_log('Received todo_id: ' . $todo_id);

    $stmt = $pdo->prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
    if ($stmt->execute([$todo_id, $user_id])) {
        if ($stmt->rowCount() > 0) {
            echo 'To-do deleted successfully!';
        } else {
            echo 'To-do not found or already deleted.';
        }
    } else {
        echo 'Failed to delete to-do.';
    }
} else {
    echo 'User not authenticated!';
}
