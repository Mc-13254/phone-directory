<?php
session_start();
header('Content-Type: application/json'); // Set the content type to JSON

include 'db.php'; // Ensure this path is correct

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the username and password from the POST request
    $username = trim($_POST['username'] ?? ''); // Trim whitespace
    $password = $_POST['password'] ?? '';

    // Validate input
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please enter both username and password.']);
        exit();
    }

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Database query failed.']);
        exit();
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the username exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verify password
        if (password_verify($password, $row['password'])) {
            // Password is correct, start session
            $_SESSION['user_id'] = $row['id']; // Assuming 'id' is the primary key
            echo json_encode(['success' => true, 'message' => 'Login successful!']);
            exit();
        } else {
            // Invalid password
            echo json_encode(['success' => false, 'message' => 'Invalid password.']);
            exit();
        }
    } else {
        // Invalid username
        echo json_encode(['success' => false, 'message' => 'Invalid username.']);
        exit();
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>