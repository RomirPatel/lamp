<?php
session_start(); // Start the session

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    session_destroy(); // Destroy the session
    echo 'Logout successful!'; // Return this message
} else {
    echo 'No active session found.'; // Return a message if no session exists
}
?>
