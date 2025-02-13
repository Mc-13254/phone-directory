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