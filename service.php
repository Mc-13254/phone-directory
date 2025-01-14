<?php
// services.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Database credentials
$servername = "localhost";
$username = "root"; // Default XAMPP MySQL user
$password = ""; // Default XAMPP MySQL password is empty
$database = "TelephoneDirectory";

// Create connection using mysqli
$conn = new mysqli('localhost', 'root', '', 'TelephoneDirectory');

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// SQL query to fetch names from the service table
$query = "SELECT name FROM service"; // Adjust the table name if necessary

// Execute the query
$result = $conn->query($query);

// Check if any rows are returned
if ($result->num_rows > 0) {
    $services = [];
    while ($row = $result->fetch_assoc()) {
        $services[] = $row; // Add each row to the services array
    }

    // Return the data as JSON
    echo json_encode($services);
} else {
    echo json_encode(["message" => "No services found"]);
}

// Close the connection
$conn->close();
