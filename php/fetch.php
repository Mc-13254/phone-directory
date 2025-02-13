<?php
include 'db.php'; // Include your database connection

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Fetch all employees from the database
    $result = $conn->query("SELECT * FROM employees");

    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row; // Add each employee to the array
    }

    // Return the employees as a JSON response
    echo json_encode($employees);
}

$conn->close();
?>