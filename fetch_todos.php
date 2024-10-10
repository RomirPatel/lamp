<?php
require 'config.php';
session_start();

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $stmt = $pdo->prepare('SELECT * FROM todos WHERE user_id = ?');
    $stmt->execute([$user_id]);
    $todos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($todos as $todo) {
        // Determine checked status based on done value
        $checked = $todo['done'] ? 'checked' : '';
        echo '<tr>
                <td>' . htmlspecialchars($todo['id']) . '</td>
                <td>' . htmlspecialchars($todo['todo_text']) . '</td>
                <td>
                    <input type="checkbox" class="todo-checkbox" data-todo-id="' . htmlspecialchars($todo['id']) . '" ' . $checked . '>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteTodo(' . htmlspecialchars($todo['id']) . ')">Delete</button>
                </td>
              </tr>';
    }
} else {
    echo 'User not authenticated!';
}
?>
