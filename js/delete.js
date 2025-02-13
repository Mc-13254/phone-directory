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
}); // Closing brace for the forEach loop