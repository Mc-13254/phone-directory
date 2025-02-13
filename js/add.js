document.addEventListener("DOMContentLoaded", function() {
    const addEmployeeForm = document.getElementById("addEmployeeForm");
    const phoneInput = addEmployeeForm.querySelector('input[name="phone_number"]');
    const employeeTableBody = document.querySelector("#employeeTable tbody");

    // Add an input event listener to the phone number field
    phoneInput.addEventListener("input", function() {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    addEmployeeForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(addEmployeeForm);

        // Send the data to the PHP API
        fetch("php/post.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            if (data.success) {
                alert("✅ " + data.message); // Success alert with emoji
                addEmployeeForm.reset(); // Clear the form

                // Create a new row for the employee table
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${data.employee.id}</td>
                    <td>${data.employee.service}</td>
                    <td>${data.employee.name}</td>
                    <td>${data.employee.phone_number}</td>
                    <td>
                        <button class='update-btn' data-id='${data.employee.id}'>Update</button>
                        <button class='delete-btn' data-id='${data.employee.id}' onclick="return confirm('Are you sure you want to delete this employee?');">Delete</button>
                    </td>
                `;
                employeeTableBody.appendChild(newRow); // Add the new row to the table body
            } else {
                alert("❌ " + data.message); // Error alert with emoji
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ An error occurred. Please try again."); // General error alert
        });
    });
});