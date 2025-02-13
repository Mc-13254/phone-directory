<?php
// Start session
session_start();
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database connection
include 'db.php'; // Ensure this path is correct

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the required fields are set
    if (isset($data['username']) && isset($data['password']) && isset($data['cpassword'])) {
        $username = $data['username'];
        $password = $data['password'];
        $cpassword = $data['cpassword'];

        // Check if username already exists
        $stmt = $conn->prepare("SELECT * FROM users_GMC WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => '🚫 Username already exists.']);
            exit();
        }

        // Password validation
        if (strlen($password) < 6) {
            echo json_encode(['success' => false, 'message' => '🚫 Password must be at least 6 characters long.']);
            exit();
        }

        if ($password !== $cpassword) {
            echo json_encode(['success' => false, 'message' => '🚫 Passwords do not match.']);
            exit();
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user into the database
        $stmt = $conn->prepare("INSERT INTO users_GMC (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashed_password);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '✅ Registration successful! You can now log in.']);
        } else {
            echo json_encode(['success' => false, 'message' => '🚫 Error occurred during registration.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => '🚫 Please fill in all fields.']);
        exit();
    }
}

// Close the database connection
$conn->close();
?>