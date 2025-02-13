<?php
$host = 'localhost';
$db = 'phone_directories';
$user = 'root'; // Change as needed
$pass = ''; // Change as needed

$conn = new mysqli('localhost', 'root', '' ,'phone_directories');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>