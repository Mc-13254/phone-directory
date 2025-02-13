<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])) {
        $service = $_POST['service'];
        $name = $_POST['name'];
        $phone_number = $_POST['phone_number'];

        $stmt = $conn->prepare("INSERT INTO employees (service, name, phone_number) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $service, $name, $phone_number);
        $stmt->execute();
    }

    if (isset($_POST['delete'])) {
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }

    if (isset($_POST['update'])) {
        $id = $_POST['id'];
        $service = $_POST['service'];
        $name = $_POST['name'];
        $phone_number = $_POST['phone_number'];

        $stmt = $conn->prepare("UPDATE employees SET service = ?, name = ?, phone_number = ? WHERE id = ?");
        $stmt->bind_param("sssi", $service, $name, $phone_number, $id);
        $stmt->execute();
    }
}
?>