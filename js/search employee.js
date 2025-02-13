// Function to search contacts
function searchContacts() {
    // Get the search input value and convert it to lowercase
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // Get the table and its rows
    const table = document.getElementById('contactTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Loop through all table rows and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;

        // Loop through each cell in the row
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            // Check if the cell text matches the search input
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                found = true; // If a match is found, set found to true
                break; // No need to check other cells in this row
            }
        }

        // Show or hide the row based on whether a match was found
        if (found) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    }
}