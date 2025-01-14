<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$servername = "localhost";
$username = "root"; // Default XAMPP MySQL user
$password = ""; // Default XAMPP MySQL password is empty
$database = "TelephoneDirectory";

// Establish the database connection
$conn = new mysqli($servername, $username, $password, $database);

// Check for a connection error
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Get the request method (in this case, we are expecting POST)
$method = $_SERVER['REQUEST_METHOD'];

// Read the input JSON data from the request
$input = json_decode(file_get_contents('php://input'), true);

if ($method == 'POST') {
    // Validate that the required input is present
    if (!isset($input['service']) || empty($input['service']) || !isset($input['data']) || empty($input['data'])) {
        echo json_encode(["message" => "Invalid input data, service or data is missing"]);
        exit;
    }

    $service = $input['service'];
    $data = $input['data'];

    // Prepare the SQL query using a prepared statement
    $stmt = $conn->prepare("INSERT INTO TelephoneDirectory (service, name, phone_number) VALUES (?, ?, ?)");

    if ($stmt === false) {
        echo json_encode(["message" => "Error preparing query: " . $conn->error]);
        exit;
    }

    // Flag to track if all inserts succeed
    $insert_successful = true;

    // Iterate through the data and bind parameters for each person
    foreach ($data as $person) {
        if (empty($person['name']) || empty($person['phone_number'])) {
            $insert_successful = false;
            echo json_encode(["message" => "Name or phone number is missing for some entries"]);
            break;
        }

        $name = $person['name'];
        $phone_number = $person['phone_number'];

        // Bind parameters to the statement
        $stmt->bind_param("sss", $service, $name, $phone_number);

        // Execute the statement
        if (!$stmt->execute()) {
            // If insertion fails for this person, set the flag to false and return the error
            $insert_successful = false;
            echo json_encode(["message" => "Error inserting record: " . $stmt->error]);
            break;
        }
    }

    // If all records inserted successfully
    if ($insert_successful) {
        echo json_encode(["message" => "All records added successfully"]);
    }

    // Close the prepared statement after use
    $stmt->close();
} else {
    echo json_encode(["message" => "Method not allowed"]);
}

// Close the database connection
$conn->close();
?>
