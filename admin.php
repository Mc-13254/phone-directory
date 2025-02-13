<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/search-sort.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Admin - Phone Directory</title>
</head>
<body>
<header>
    <h1>Admin Phone Directory</h1>
    <button type="button" id="logoutButton" onclick="logout()">
        <i class="fas fa-sign-out-alt"></i> Logout
    </button>
</header>

<div class="container">
    <form id="addEmployeeForm" onsubmit="addEmployee(event)"> <!-- Added event handler for form submission -->
        <div class="search-sort">
            <div class="search-container">
                <input type="text" id="searchInput" onkeyup="searchContacts()" placeholder="Search for names, services or phone number">
                <i class="fa fa-search search-icon"></i> <!-- Search icon -->
            </div>
            <div class="sort-container">
    <label for="sortOptions">Sort by:</label>
    <select id="sortOptions">
        <option value="service">Service</option>
        <option value="name">Name</option>
        <option value="phone_number">Phone Number</option>
    </select>
    <label for="orderOptions">Order:</label>
    <select id="orderOptions">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
    </select>
</div>

        </div>

        <br>
        <div class="input-container">
            <input type="text" name="service" placeholder="Service" required>
            <input type="text" name="name" placeholder="Name" required>
            <input type="tel" name="phone_number" placeholder="Phone Number" required pattern="[0-9]*" title="Please enter a valid phone number (numbers only)">
        </div>
        <button type="submit">Add Employee</button>
    </form>

    <div class="card">
        <h2>Employee List</h2>
        <table id="employeeTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Employee rows will be populated here by JavaScript -->
            </tbody>
        </table>
    </div>
</div>

<script src="js/fetch.js" defer></script>
<script src="js/add.js" defer></script>
<script src="js/delete.js" defer></script>
<script src="js/update.js" defer></script>
<script src="js/logout.js" defer></script>
</body>
</html>