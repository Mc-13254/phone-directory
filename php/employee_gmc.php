<?php
include 'db.php';

// Handle sorting
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'name'; // Default sort by name
$order = isset($_GET['order']) ? $_GET['order'] : 'ASC'; // Default order

// Validate sort and order values to prevent SQL injection
$validSortColumns = ['name', 'service', 'phone_number'];
$validOrderValues = ['ASC', 'DESC'];

if (!in_array($sort, $validSortColumns)) {
    $sort = 'name'; // Default to name if invalid
}

if (!in_array($order, $validOrderValues)) {
    $order = 'ASC'; // Default to ASC if invalid
}

// Fetch employees with sorting
$result = $conn->query("SELECT * FROM employees_gmc ORDER BY $sort $order");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/employee.css">
    <link rel="stylesheet" href="../css/search-sort.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
   
    <title>Employee Directory</title>
</head>
<body>
<header>
    <h1>Employee Phone Directory</h1>
    <button type="button" id="logoutButton" onclick="logoutButton()">
    <i class="fa fa-arrow-left"></i>  back to homepage
    </button>
</header>
<div class="container">
    <div class="search-sort">
        <div class="search-container">
            <input type="text" id="searchInput" onkeyup="searchEmployees()" placeholder="Search employees...">
            <i class="fa fa-search search-icon"></i> <!-- Search icon -->
        </div>
        <div class="sort-container">
            <label for="sort">Sort by:</label>
            <select id="sort" onchange="sortEmployees()">
                <option value="name" <?php if ($sort == 'name') echo 'selected'; ?>>Name</option>
                <option value="service" <?php if ($sort == 'service') echo 'selected'; ?>>Service</option>
                <option value="phone_number" <?php if ($sort == 'phone_number') echo 'selected'; ?>>Phone Number</option>
            </select>
            <select id="order" onchange="sortEmployees()">
                <option value="ASC" <?php if ($order == 'ASC') echo 'selected'; ?>>Ascending</option>
                <option value="DESC" <?php if ($order == 'DESC') echo 'selected'; ?>>Descending</option>
            </select>
        </div>
    </div>
    <table id="employeeTable">
        <thead>
            <tr>
                <th>Service</th>
                <th>Name</th>
                <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['service']); ?></td>
                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                    <td><?php echo htmlspecialchars($row['phone_number']); ?></td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>
<footer>
    <p>&copy; <?php echo date("Y"); ?> Phone Directory. All rights reserved.</p>
</footer>



<script src="../js/script_gmc.js" defer></script>
<script src="../js/search_gmc.js" defer></script>
<script src="../js/logout_gmc.js" defer></script>
</body>
</html>