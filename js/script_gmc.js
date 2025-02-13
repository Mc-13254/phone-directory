function searchEmployees() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#employeeTable tbody tr');

    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let found = false;
        for (let cell of cells) {
            if (cell) {
                if (cell.innerHTML.toLowerCase().indexOf(input) > -1) {
                    found = true;
                    break;
                }
            }
        }
        row.style.display = found ? '' : 'none';
    });
}