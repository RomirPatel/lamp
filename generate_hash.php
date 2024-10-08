<?php
// This script generates a password hash
$plain_text_password = 'your_plain_text_password'; // Replace with the desired password
$hashed_password = password_hash($plain_text_password, PASSWORD_BCRYPT);
echo "Hashed Password: " . $hashed_password;
?>
