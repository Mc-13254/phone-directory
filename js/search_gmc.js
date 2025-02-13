
// Search functionality
function searchEmployees() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const table = document.getElementById("employeeTable");
    const tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        const tdService = tr[i].getElementsByTagName("td")[0];
        const tdName = tr[i].getElementsByTagName("td")[1];
        const tdPhone = tr[i].getElementsByTagName("td")[2];

        if (tdService || tdName || tdPhone) {
            const txtValueService = tdService.textContent || tdService.innerText;
            const txtValueName = tdName.textContent || tdName.innerText;
            const txtValuePhone = tdPhone.textContent || tdPhone.innerText;

            // Check if the search term matches any of the columns
            if (txtValueService.toLowerCase().indexOf(searchInput) > -1 || 
                txtValueName.toLowerCase().indexOf(searchInput) > -1 || 
                txtValuePhone.toLowerCase().indexOf(searchInput) > -1) {
                tr[i].style.display = ""; // Show the row
            } else {
                tr[i].style.display = "none"; // Hide the row
            }
        }
    }
}

// Sort functionality
function sortEmployees() {
    const sort = document.getElementById('sort').value;
    const order = document.getElementById('order').value;
    window.location.href = `employee_gmc.php?sort=${sort}&order=${order}`;
}

// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", searchEmployees); // Call searchEmployees on keyup
