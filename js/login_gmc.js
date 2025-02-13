// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");
    
    if (passwordField.type === "password") {
        passwordField.type = "text"; // Change to text to show password
        eyeIcon.classList.remove("fa-eye"); // Remove eye icon
        eyeIcon.classList.add("fa-eye-slash"); // Add eye-slash icon
    } else {
        passwordField.type = "password"; // Change back to password
        eyeIcon.classList.remove("fa-eye-slash"); // Remove eye-slash icon
        eyeIcon.classList.add("fa-eye"); // Add eye icon
    }
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        username: this.username.value.trim(), // Trim whitespace
        password: this.password.value.trim()  // Trim whitespace
    };

    // Check if username and password are not empty
    if (!formData.username || !formData.password) {
        alert('Please enter both username and password.');
        return; // Exit the function if either field is empty
    }

    // Send data as URL-encoded to the backend
    fetch('php/login_gmc.php', { // Ensure the path to your PHP file is correct
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Set the content type to URL encoded
        },
        body: new URLSearchParams(formData) // Convert the form data to URL encoded format
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        alert(data.message); // Show the message from the server
        if (data.success) {
            window.location.href = 'admin_gmc.php'; // Redirect on success
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});