<?php
require 'config.php'; // Make sure this file contains your database connection details

try {
    $stmt = $pdo->query('SELECT * FROM users LIMIT 1'); // Try to fetch a user from the users table
    if ($stmt->rowCount() > 0) {
        echo "Connection to the database is successful!";
    } else {
        echo "Connected, but no users found.";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
