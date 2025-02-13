<?php
session_start();
include 'db.php'; // Include your database connection

// Fetch all users from the database
$query = "SELECT id, username, password FROM users"; // Adjust the query as needed
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while ($user = $result->fetch_assoc()) {
        $userId = $user['id'];
        $username = $user['username'];
        $plainPassword = $user['password']; // Assuming this is the plain text password

        // Hash the password
        $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

        // Update the user's password in the database
        $updateQuery = "UPDATE users SET password = ? WHERE id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("si", $hashedPassword, $userId);

        if ($stmt->execute()) {
            echo "Password for user '$username' has been updated successfully.<br>";
        } else {
            echo "Error updating password for user '$username': " . $stmt->error . "<br>";
        }
    }
} else {
    echo "No users found in the database.";
}

// Close the database connection
$conn->close();
?>