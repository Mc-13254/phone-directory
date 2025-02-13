<?php
// Configuration
include 'db.php';

// Get the ID from the request body
$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data['id']) ? intval($data['id']) : 0;

// Prepare the delete query
$stmt = $conn->prepare("DELETE FROM employees_gmc WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute the query
if ($stmt->execute()) {
    $response = array(
        'success' => true,
        'message' => 'Employee deleted successfully.'
    );
} else {
    $response = array(
        'success' => false,
        'message' => 'Error deleting employee: ' . $conn->error
    );
}

// Close the connection
$stmt->close();
$conn->close();

// Return the response
header('Content-Type: application/json');
echo json_encode($response);
?>