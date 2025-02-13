<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <title>Phone Directory</title>
</head>
<body>
<header>
    <h1>Welcome to the Phone Directory</h1>
</header>
<div class="container">
    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
        <p>You are logged in as an admin.</p>
        <a href="admin.php">Go to Admin Panel</a>
        <a href="admin.php">Go to Admin Panel</a>
        <br>
        <a href="php/employee.php">View Employee Directory</a>
        <a href="php/employee.php">View Employee Directory</a>
    <?php else: ?>
        <p>You are not logged in.</p>
        <a href="login.html">Login as Admin directory</a>
        <a href="login_gmc.html">Login as Admin GMC</a>
        <br>
        <a href="php/employee.php">View Employee Directory</a>
        <a href="php/employee_gmc.php">View Employee GMC</a>
    <?php endif; ?>
</div>
<footer>
    <p>&copy; <?php echo date("Y"); ?> Phone Directory. All rights reserved.</p>
</footer>
</body>
</html>