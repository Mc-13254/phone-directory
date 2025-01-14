<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

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

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $sql = "SELECT service, GROUP_CONCAT(name) AS names, GROUP_CONCAT(phone_number) AS phone_numbers 
                FROM TelephoneDirectory GROUP BY service";
        $result = $conn->query($sql);
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = [
                'service' => $row['service'],
                'names' => explode(',', $row['names']),
                'phone_numbers' => explode(',', $row['phone_numbers'])
            ];
        }
        echo json_encode($rows);
        break;

    case 'POST':
        if (isset($input['service'], $input['names'], $input['phone_numbers'])) {
            $service = $input['service'];
            $names = $input['names'];
            $phoneNumbers = $input['phone_numbers'];

            // Basic input validation
            if (!is_array($names) || !is_array($phoneNumbers) || count($names) !== count($phoneNumbers)) {
                echo json_encode(["message" => "Invalid input: Names and phone numbers must be arrays of the same length."]);
                break;
            }

            // Prepare the statement once
            $stmt = $conn->prepare("INSERT INTO TelephoneDirectory (service, name, phone_number) VALUES (?, ?, ?)");
            if (!$stmt) {
                echo json_encode(["message" => "Database error: " . $conn->error]);
                break;
            }

            // Bind and execute for each entry
            for ($i = 0; $i < count($names); $i++) {
                $name = $names[$i];
                $phone = $phoneNumbers[$i];

                // Execute the prepared statement
                $stmt->bind_param("sss", $service, $name, $phone);
                if (!$stmt->execute()) {
                    echo json_encode(["message" => "Error inserting data: " . $stmt->error]);
                    $stmt->close();
                    break;
                }
            }

            $stmt->close();
            echo json_encode(["message" => "Data successfully inserted."]);
        } else {
            echo json_encode(["message" => "Invalid input."]);
        }
        break;


    case 'PUT':
        $id = isset($input['id']) ? $input['id'] : null;
        $name = isset($input['name']) ? $input['name'] : null;
        $service = isset($input['service']) ? $input['service'] : null;
        $phone_number = isset($input['phone_number']) ? $input['phone_number'] : null;

        if ($id && $name && $service && $phone_number) {
            $stmt = $conn->prepare("UPDATE TelephoneDirectory SET name = ?, service = ?, phone_number = ? WHERE id = ?");
            $stmt->bind_param("sssi", $name, $service, $phone_number, $id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Record updated successfully"]);
            } else {
                echo json_encode(["message" => "Error updating record: " . $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["message" => "Invalid input data"]);
        }
        break;



        case 'DELETE':
            // Retrieve and validate the ID from the input
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    
            if ($id > 0) {
                // Prepare the DELETE statement
                $stmt = $conn->prepare("DELETE FROM TelephoneDirectory WHERE id = ?");
                $stmt->bind_param("i", $id);
    
                if ($stmt->execute()) {
                    if ($stmt->affected_rows > 0) {
                        echo json_encode(["message" => "Record deleted successfully"]);
                    } else {
                        echo json_encode(["message" => "No record found with the provided ID"]);
                    }
                } else {
                    echo json_encode(["message" => "Error deleting record", "error" => $stmt->error]);
                }
    
                $stmt->close();
            } else {
                echo json_encode(["message" => "Invalid ID provided"]);
            }
            break;
    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

$conn->close();
