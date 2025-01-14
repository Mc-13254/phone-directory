let editRow = null; // Keep track of the row being edited

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const service = document.getElementById("service").value;
  const names = [];
  const phoneNumbers = [];

  const nameInputs = document.querySelectorAll(
    "#namePhoneContainer input[name='name']"
  );
  const phoneInputs = document.querySelectorAll(
    "#namePhoneContainer input[name='phone']"
  );

  nameInputs.forEach((input) => names.push(input.value));
  phoneInputs.forEach((input) => phoneNumbers.push(input.value));

  // Check if any field is empty before submission
  if (
    !service ||
    names.some((name) => name === "") ||
    phoneNumbers.some((phone) => phone === "")
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (editRow) {
    // Update the data in the database and the table
    const id = editRow.dataset.id;
    updateDatabase(id, service, names, phoneNumbers)
      .then((response) => {
        if (response.ok) {
          const nameCell = editRow.querySelector("td:nth-child(2)");
          const phoneCell = editRow.querySelector("td:nth-child(3)");

          // Update the row in the table
          editRow.querySelector("td:first-child").textContent = service;
          nameCell.textContent = names.join(", ");
          phoneCell.textContent = phoneNumbers.join(", ");

          clearForm();
          editRow = null;
        } else {
          console.error("Error updating row:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating database:", error));
  } else {
    // Add new data if not editing
    addNewData(service, names, phoneNumbers)
      .then((response) => {
        if (response.ok) {
          fetchData();
          clearForm();
        } else {
          console.error("Error adding new data:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding new data:", error));
  }
});

// Function to clear the form fields
function clearForm() {
  document.getElementById("service").value = "";
  document.getElementById("namePhoneContainer").innerHTML = "";
  addNamePhoneInput(); // Reset to a single input field
}

// Function to clear the form fields
function clearForm() {
  document.getElementById("service").value = "";
  document.getElementById("namePhoneContainer").innerHTML = "";
  addNamePhoneInput();
}

// Function to add new name and phone input fields
function addNamePhoneInput() {
  const container = document.getElementById("namePhoneContainer");
  const newDiv = document.createElement("div");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Name";

  const phoneInput = document.createElement("input");
  phoneInput.type = "text";
  phoneInput.name = "phone";
  phoneInput.placeholder = "Phone Number";

  newDiv.appendChild(nameInput);
  newDiv.appendChild(phoneInput);
  newDiv.style.display = "block";
  container.appendChild(newDiv);
}

// Event listener for the Edit button
// document.addEventListener("click", function (e) {
//   if (e.target && e.target.classList.contains("editBtn")) {
//     const row = e.target.closest("tr");
//     editRow = row;

//     const serviceCell = row.querySelector("td:first-child");
//     const nameCell = row.querySelector("td:nth-child(2)");
//     const phoneCell = row.querySelector("td:nth-child(3)");

//     document.getElementById("service").value = serviceCell.textContent;
//     clearForm();

//     const nameInputs = nameCell.textContent.split(", ");
//     const phoneInputs = phoneCell.textContent.split(", ");

//     nameInputs.forEach((name, index) => {
//       addNamePhoneInput();
//       document.querySelectorAll("#namePhoneContainer input[name='name']")[
//         index
//       ].value = name;
//       document.querySelectorAll("#namePhoneContainer input[name='phone']")[
//         index
//       ].value = phoneInputs[index] || "";
//     });
//     if (e.target && e.target.classList.contains("deleteBtn")) {
//         const row = e.target.closest("tr");
//         const id = row.dataset.id;

//         handleDelete(id)
//           .then((response) => {
//             if (response.ok) {
//               row.remove();
//               alert("Record deleted successfully.");
//             } else {
//               console.error("Error deleting row:", response.statusText);
//               alert("Error deleting record: " + response.statusText);
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("An error occurred while deleting the record.");
//           });
//       }
//   }
// document.addEventListener("click", function (e) {
//   if (e.target) {
//     if (e.target.classList.contains("editBtn")) {
//       const row = e.target.closest("tr");
//       editRow = row;

//       const serviceCell = row.querySelector("td:first-child");
//       const nameCell = row.querySelector("td:nth-child(2)");
//       const phoneCell = row.querySelector("td:nth-child(3)");

//       document.getElementById("service").value = serviceCell.textContent;
//       clearForm();

//       const nameInputs = nameCell.textContent.split(", ");
//       const phoneInputs = phoneCell.textContent.split(", ");

//       nameInputs.forEach((name, index) => {
//         addNamePhoneInput();
//         document.querySelectorAll("#namePhoneContainer input[name='name']")[
//           index
//         ].value = name;
//         document.querySelectorAll("#namePhoneContainer input[name='phone']")[
//           index
//         ].value = phoneInputs[index] || "";
//       });
//     }

//     if (e.target.classList.contains("deleteBtn")) {
//       const row = e.target.closest("tr");
//       const id = row.dataset.id;

//       handleDelete(id)
//         .then((response) => {
//           if (response.ok) {
//             row.remove();
//             alert("Record deleted successfully.");
//           } else {
//             console.error("Error deleting row:", response.statusText);
//             alert("Error deleting record: " + response.statusText);
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("An error occurred while deleting the record.");
//         });
//     }
//   }
// });

// document.addEventListener("click", function (e) {
//     if (e.target) {
//       if (e.target.classList.contains("editBtn")) {
//         const row = e.target.closest("tr");
//         editRow = row;

//         const serviceCell = row.querySelector("td:first-child");
//         const nameCell = row.querySelector("td:nth-child(2)");
//         const phoneCell = row.querySelector("td:nth-child(3)");

//         document.getElementById("service").value = serviceCell.textContent;
//         clearForm();

//         const nameInputs = nameCell.textContent.split(", ");
//         const phoneInputs = phoneCell.textContent.split(", ");

//         nameInputs.forEach((name, index) => {
//           addNamePhoneInput();
//           document.querySelectorAll("#namePhoneContainer input[name='name']")[index].value = name;
//           document.querySelectorAll("#namePhoneContainer input[name='phone']")[index].value = phoneInputs[index] || "";
//         });
//       }

//       if (e.target.classList.contains("deleteBtn")) {
//         const row = e.target.closest("tr");
//         const id = row.dataset.id;

//         handleDelete(id)
//           .then((response) => {
//             if (response.ok) {
//               row.remove();
//               alert("Record deleted successfully.");
//             } else {
//               console.error("Error deleting row:", response.statusText);
//               alert("Error deleting record: " + response.statusText);
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("An error occurred while deleting the record.");
//           });
//       }
//     }
//   });

// Function to update the database
function updateDatabase(id, service, names, phoneNumbers) {
  return fetch(`http://localhost/dashboard/phone-directory/api.php/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ service, names, phone_numbers: phoneNumbers }),
  });
}

// Function to add new data to the database
// Function to add new data (e.g., adding a phone directory entry)
const addNewData = async (service, names, phoneNumbers) => {
  try {
    // Structure the request body for sending to the server
    const requestBody = { service, names, phone_numbers: phoneNumbers };

    // Logging for debugging (can be removed in production)
    console.log("Sending request with body:", requestBody);

    // Sending the POST request to the backend API
    const response = await fetch(
      "http://localhost/dashboard/phone-directory/api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    // If the response is not OK, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${errorData.message || "Unknown error occurred"}`
      );
    }

    // Parsing the response JSON
    const data = await response.json();

    // Logging the response for debugging (can be removed in production)
    console.log("API response:", data);

    // Return the data from the API response
    // Assuming the returned data contains an 'id' for the new entry
    // If the entry was successfully added, fetch and refresh the data
    fetchData();

    // Clear the form after adding
    clearForm();

    return data;
  } catch (error) {
    // Catching and handling errors
    console.error("There was a problem with the fetch operation:", error);

    // Returning a structured error response
    return { success: false, message: error.message };
  }
};

// Function to fetch available services from the database
function fetchServices() {
  fetch("http://localhost/dashboard/phone-directory/service.php") // Replace with actual API URL
    .then((response) => response.json())
    .then((data) => {
      const serviceSelect = document.getElementById("service");
      serviceSelect.innerHTML = '<option value="">Select a service</option>'; // Reset options
      data.forEach((service) => {
        const option = document.createElement("option");
        option.value = service.name;
        option.textContent = service.name; // Display service name in the dropdown
        serviceSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching services:", error));
}

// Function to fetch existing data from the API and display it in the table
function fetchData() {
  fetch("http://localhost/dashboard/phone-directory/api.php")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("contactsTableBody");
      tableBody.innerHTML = ""; // Clear existing rows

      data.forEach((row) => {
        const { id, service, names, phone_numbers } = row;

        names.forEach((name, index) => {
          const newRow = document.createElement("tr");
          newRow.dataset.id = id;

          if (index === 0) {
            const serviceCell = document.createElement("td");
            serviceCell.rowSpan = names.length;
            serviceCell.textContent = service;
            newRow.appendChild(serviceCell);
          }
          

          const nameCell = document.createElement("td");
          nameCell.textContent = name;
          newRow.appendChild(nameCell);

          const phoneNumberCell = document.createElement("td");
          phoneNumberCell.textContent = phone_numbers[index] || "";
          newRow.appendChild(phoneNumberCell);

          const actionsCell = document.createElement("td");
          actionsCell.innerHTML =
            '<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>';
          newRow.appendChild(actionsCell);

          tableBody.appendChild(newRow);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call fetchServices on page load to populate the service dropdown
window.addEventListener("load", function () {
  fetchServices();
  fetchData();
});
// Function to handle Delete button click
// function handleDelete(id) {
//     // Confirm deletion action
//     if (confirm("Are you sure you want to delete this record?")) {
//         fetch(`http://localhost/dashboard/phone-directory/api.php`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: id }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             if (data.message === "Record deleted successfully") {
//                 alert("Record deleted successfully.");
//                 // Optionally, remove the row from the table without reloading
//                 document.querySelector(`[data-id='${id}']`).remove();
//             } else {
//                 alert("Error deleting record: " + data.message);
//             }
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("An error occurred while deleting the record.");
//         });
//     }
// }

// Add the delete button functionality when rendering the table rows
fetch("http://localhost/dashboard/phone-directory/api.php")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("contactsTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach((row) => {
      const { id, service, names, phone_numbers } = row;

      names.forEach((name, index) => {
        const newRow = document.createElement("tr");
        newRow.dataset.id = id;

        if (index === 0) {
          const serviceCell = document.createElement("td");
          serviceCell.rowSpan = names.length;
          serviceCell.textContent = service;
          newRow.appendChild(serviceCell);
        }

        const nameCell = document.createElement("td");
        nameCell.textContent = name;
        newRow.appendChild(nameCell);

        const phoneNumberCell = document.createElement("td");
        phoneNumberCell.textContent = phone_numbers[index] || "";
        newRow.appendChild(phoneNumberCell);

        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn" onclick="handleDelete(${id})">Delete</button>
                `;
        newRow.appendChild(actionsCell);

        tableBody.appendChild(newRow);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
// Fetch the data from the server and display it in the table
fetch("http://localhost/dashboard/phone-directory/api.php")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("contactsTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach((row) => {
      const { id, service, names, phone_numbers } = row;

      names.forEach((name, index) => {
        const newRow = document.createElement("tr");
        newRow.dataset.id = id;

        // Add service column, only on the first name (to span across rows)
        if (index === 0) {
          const serviceCell = document.createElement("td");
          serviceCell.rowSpan = names.length;
          serviceCell.textContent = service;
          newRow.appendChild(serviceCell);
        }

        // Add name column
        const nameCell = document.createElement("td");
        nameCell.textContent = name;
        newRow.appendChild(nameCell);

        // Add phone number column
        const phoneNumberCell = document.createElement("td");
        phoneNumberCell.textContent = phone_numbers[index] || "";
        newRow.appendChild(phoneNumberCell);

        // Add actions column with Edit and Delete buttons
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn" onclick="handleDelete(${id})">Delete</button>
                `;
        newRow.appendChild(actionsCell);

        // Append the new row to the table body
        tableBody.appendChild(newRow);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Handle the delete action
// function handleDelete(id) {
//   console.log("Delete function triggered for ID:", id); // Debugging log

//   if (confirm("Are you sure you want to delete this record?")) {
//     fetch("http://localhost/dashboard/phone-directory/api.php", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: id }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Delete response:", data); // Check the response from the server
//         if (data.message === "Record deleted successfully") {
//           alert("Record deleted successfully.");
//           document.querySelector(`[data-id='${id}']`).remove(); // Remove the row from the table
//         } else {
//           alert("Error deleting record: " + data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("An error occurred while deleting the record.");
//       });
//   }
// }
// Define the handleDelete function
// function handleDelete(id) {
//     return fetch("http://localhost/dashboard/phone-directory/api.php", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: id }),
//     });
//   }
  
//   // Event listener for edit and delete buttons
//   document.addEventListener("click", function (e) {
//     if (e.target) {
//       // Handle the edit button click
//       if (e.target.classList.contains("editBtn")) {
//         const row = e.target.closest("tr");
//         editRow = row;
  
//         const serviceCell = row.querySelector("td:first-child");
//         const nameCell = row.querySelector("td:nth-child(2)");
//         const phoneCell = row.querySelector("td:nth-child(3)");
  
//         document.getElementById("service").value = serviceCell.textContent;
//         clearForm();
  
//         const nameInputs = nameCell.textContent.split(", ");
//         const phoneInputs = phoneCell.textContent.split(", ");
  
//         nameInputs.forEach((name, index) => {
//           addNamePhoneInput();
//           document.querySelectorAll("#namePhoneContainer input[name='name']")[index].value = name;
//           document.querySelectorAll("#namePhoneContainer input[name='phone']")[index].value = phoneInputs[index] || "";
//         });
//       }
  
//       // Handle the delete button click
//       if (e.target.classList.contains("deleteBtn")) {
//         const row = e.target.closest("tr");
//         const id = row.dataset.id;
  
//         handleDelete(id)
//           .then((response) => {
//             if (response.ok) {
//               row.remove();
//               alert("Record deleted successfully.");
//             } else {
//               console.error("Error deleting row:", response.statusText);
//               alert("Error deleting record: " + response.statusText);
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("An error occurred while deleting the record.");
//           });
//       }
//     }
//   });
// Define the handleDelete function
// Define the handleDelete function
function handleDelete(id) {
    console.log("ID being passed to the backend:", id); // Log the ID to verify it's correct
  
    return fetch(`http://localhost/dashboard/phone-directory/api.php?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  // Event listener for edit and delete buttons
  document.addEventListener("click", function (e) {
    if (e.target) {
      // Handle the edit button click
      if (e.target.classList.contains("editBtn")) {
        const row = e.target.closest("tr");
        editRow = row;
  
        const serviceCell = row.querySelector("td:first-child");
        const nameCell = row.querySelector("td:nth-child(2)");
        const phoneCell = row.querySelector("td:nth-child(3)");
  
        document.getElementById("service").value = serviceCell.textContent;
        clearForm();
  
        const nameInputs = nameCell.textContent.split(", ");
        const phoneInputs = phoneCell.textContent.split(", ");
  
        nameInputs.forEach((name, index) => {
          addNamePhoneInput();
          document.querySelectorAll("#namePhoneContainer input[name='name']")[index].value = name;
          document.querySelectorAll("#namePhoneContainer input[name='phone']")[index].value = phoneInputs[index] || "";
        });
      }
  
      // Handle the delete button click
      if (e.target.classList.contains("deleteBtn")) {
        const row = e.target.closest("tr");
        const idCell = row.querySelector("td:first-child"); // Get the ID from the first cell
        const id = idCell.textContent.trim(); // Get the ID value
  
        console.log("Row ID from first cell:", id); // Log the ID to verify
  
        handleDelete(id)
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Inspect the server response
            if (data.message === "Record deleted successfully") {
              row.remove();
              alert("Record deleted successfully.");
            } else {
              console.error("Error deleting row:", data.message);
              alert("Error deleting record: " + data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while deleting the record.");
          });
      }
    }
  });
  