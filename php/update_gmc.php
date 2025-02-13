<?php
include 'db.php'; // Include your database connection

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if the required fields are set
if (isset($data['id'], $data['service'], $data['name'], $data['phone_number'])) {
    $id = $data['id'];
    $service = $data['service'];
    $name = $data['name'];
    $phone_number = $data['phone_number'];

    // Prepare an SQL statement to prevent SQL injection
    $stmt = $conn->prepare("UPDATE employees_gmc SET service = ?, name = ?, phone_number = ? WHERE id = ?");
    $stmt->bind_param("sssi", $service, $name, $phone_number, $id);

    if ($stmt->execute()) {
        // Return a success response
        echo json_encode([
            "success" => true,
            "message" => "Employee updated successfully!"
        ]);
    } else {
        // Return an error response
        echo json_encode([
            "success" => false,
            "message" => "Error updating employee: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    // Return an error response if required fields are missing
    echo json_encode([
        "success" => false,
        "message" => "Invalid input data."
    ]);
}

$conn->close();
?>