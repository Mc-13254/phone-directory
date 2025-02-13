<?php
include 'db.php'; // Include your database connection

// Get the form data
$data = $_POST;

// Check if the required fields are set
if (isset($data['service'], $data['name'], $data['phone_number'])) {
    $service = $data['service'];
    $name = $data['name'];
    $phone_number = $data['phone_number'];

    // Check for duplicates based on phone number
    $stmt = $conn->prepare("SELECT * FROM employees WHERE phone_number = ?");
    $stmt->bind_param("s", $phone_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Duplicate found
        echo json_encode([
            "success" => false,
            "message" => "An employee with the same phone number already exists."
        ]);
    } else {
        // No duplicates, proceed to insert
        $stmt = $conn->prepare("INSERT INTO employees (service, name, phone_number) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $service, $name, $phone_number);

        if ($stmt->execute()) {
            // Get the last inserted ID
            $newEmployeeId = $stmt->insert_id;

            // Return the new employee data
            echo json_encode([
                "success" => true,
                "message" => "Employee added successfully!",
                "employee" => [
                    "id" => $newEmployeeId,
                    "service" => $service,
                    "name" => $name,
                    "phone_number" => $phone_number
                ]
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error adding employee: " . $stmt->error
            ]);
        }
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input data."
    ]);
}

$conn->close();
?>