document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display employees
    function fetchEmployees(searchTerm = '', sortBy = 'id', order = 'ASC') {
        fetch("php/fetch.php") // Call the PHP API
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                const employeeTableBody = document.querySelector("#employeeTable tbody");
                employeeTableBody.innerHTML = ""; // Clear existing rows

                // Filter employee data based on the search term
                const filteredData = data.filter(employee => {
                    return (
                        employee.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.phone_number.includes(searchTerm)
                    );
                });

                // Sort the filtered data
                filteredData.sort((a, b) => {
                    if (a[sortBy] < b[sortBy]) return order === 'ASC' ? -1 : 1;
                    if (a[sortBy] > b[sortBy]) return order === 'ASC' ? 1 : -1;
                    return 0; // Return 0 if they are equal
                });

                // Populate the table with employee data
                filteredData.forEach(employee => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${employee.id}</td>
                        <td>
                            <input type='text' name='service' value='${employee.service}' required>
                        </td>
                        <td>
                            <input type='text' name='name' value='${employee.name}' required>
                        </td>
                        <td>
                            <input type='text' name='phone_number' value='${employee.phone_number}' required>
                        </td>
                        <td>
                            <button class='update-btn' data-id='${employee.id}'>Update</button>
                            <button class='delete-btn' data-id='${employee.id}'>Delete</button>
                        </td>
                    `;
                    employeeTableBody.appendChild(row); // Add the row to the table body
                });

                document.querySelectorAll('.update-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const id = this.getAttribute('data-id');
                        const row = this.closest('tr');
                        const service = row.querySelector('input[name="service"]').value;
                        const name = row.querySelector('input[name="name"]').value;
                        const phone_number = row.querySelector('input[name="phone_number"]').value;
                
                        // Send the update request to the PHP API
                        fetch("php/update.php", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id, service, name, phone_number })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    alert("✅ " + data.message); // Success alert
                                    fetchEmployees(searchTerm, sortBy, order); // Refresh the employee list
                                } else {
                                    alert("❌ " + data.message); // Error alert
                                }
                            })
                            .catch(error => {
                                console.error("Error updating employee:", error);
                                alert("❌ An error occurred. Please try again."); // General error alert
                            });
                    });
                }); // Closing brace for the forEach loop


                // Add event listeners for delete buttons
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const id = this.getAttribute('data-id');
                        const row = this.closest('tr');

                        // Confirm deletion
                        if (confirm("Are you sure you want to delete this employee?")) {
                            // Send the delete request to the PHP API
                            fetch("php/delete.php", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id })
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data); // Debugging: Log the response
                                    if (data.success) {
                                        alert("✅ " + data.message); // Success alert
                                        row.remove(); // Remove the row from the table
                                    } else {
                                        alert("❌ " + data.message); // Error alert
                                    }
                                })
                                .catch(error => {
                                    console.error("Error deleting employee:", error);
                                    alert("❌ An error occurred. Please try again."); // General error alert
                                });
                        }
                    });
                });
            }); // Closing the .then(data => { ... }) block
    } // Closing the fetchEmployees function

    // Fetch employees when the page loads
    fetchEmployees();

    // Search functionality
    function searchContacts() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const sortBy = document.getElementById("sortOptions").value; // Get the current sort option
        const order = document.getElementById("orderOptions").value; // Get the current order option
        fetchEmployees(searchInput, sortBy, order); // Fetch employees with the search term
    } // Closing the searchContacts function

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", searchContacts); // Call searchContacts on keyup

    // Sort functionality
    const sortOptions = document.getElementById("sortOptions");
    const orderOptions = document.getElementById("orderOptions");

    sortOptions.addEventListener("change", function () {
        const sortBy = this.value; // Get the current sort option
        const searchTerm = searchInput.value; // Get the current search term
        const order = orderOptions.value; // Get the current order option
        fetchEmployees(searchTerm, sortBy, order); // Fetch employees with the sort option
    });

    orderOptions.addEventListener("change", function () {
        const order = this.value; // Get the current order option
        const searchTerm = searchInput.value; // Get the current search term
        const sortBy = sortOptions.value; // Get the current sort option
        fetchEmployees(searchTerm, sortBy, order); // Fetch employees with the order option
    });
}); // Closing the DOMContentLoaded event listener