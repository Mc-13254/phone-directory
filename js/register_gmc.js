// Function to toggle password visibility
function togglePasswordVisibility(fieldId, iconId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(iconId);
    
    // Check if the elements exist
    if (!passwordField || !eyeIcon) {
        console.error('Element not found:', fieldId, iconId);
        return; // Exit the function if elements are not found
    }

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
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        username: this.username.value,
        password: this.password.value,
        cpassword: this.cpassword.value
    };

    // Send data as JSON to the backend
    fetch('php/register_gmc.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(formData) // Convert the form data to JSON
    })
    .then(response => {
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        // Show success or error message in alert
        alert(data.message);
        if (data.success) {
            // Redirect to the login page on successful registration
            window.location.href = 'login_gmc.html'; // Change this to your actual login page URL
        }
    })
    .catch(error => {
        // Show error in alert
        alert('Error: ' + error.message);
    });
});