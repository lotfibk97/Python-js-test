let users = [];
let currentPage = 1;
const perPage = 10;
let totalUsers = 0;

function fetchUsers() {
  const keyword = document
    .getElementById("search-box")
    .value.trim()
    .toLowerCase();
  const sortBy = document
    .querySelector("#user-table th.sorted")
    .getAttribute("data-column");

  const sortOrder = document
    .querySelector("#user-table th.sorted")
    .getAttribute("data-order");
  const url = `/users/?keyword=${keyword}&sort_by=${sortBy}&sort_order=${
    sortOrder ? sortOrder : "asc"
  }&page=${currentPage}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      users = data.users;
      totalUsers = data.total_users;
      renderTable();
      updatePagination();
    })
    .catch((error) => console.error("Error:", error));
}

function renderTable() {
  const tableBody = document.getElementById("user-table-body");
  tableBody.innerHTML = "";

  for (let user of users) {
    const row = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = user.first_name;
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = user.last_name;
    row.appendChild(lastNameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const roleCell = document.createElement("td");
    roleCell.textContent = user.role;
    row.appendChild(roleCell);

    const departmentCell = document.createElement("td");
    departmentCell.textContent = user.department;
    row.appendChild(departmentCell);

    const actionCell = document.createElement("td");
    const actionButton = document.createElement("button");
    actionCell.append(actionButton);
    actionButton.addEventListener("click", () => showUserDetails(user));
    actionButton.textContent = "View";
    actionButton.className = "btn btn-secondary";
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  }

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(totalUsers / perPage);
  const pageNumber = document.getElementById("page-number");
  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

  const previousButton = document.getElementById("previous-button");
  previousButton.disabled = currentPage === 1;

  const nextButton = document.getElementById("next-button");
  nextButton.disabled = currentPage === totalPages || totalPages === 0;
}

function sortTable(column) {
  const sortBy = document.querySelector("#user-table th.sorted");
  if (column == sortBy.getAttribute("data-column")) {
    sortBy.setAttribute(
      "data-order",
      reverseColumn(sortBy.getAttribute("data-order"))
    );
  }
  const sortableColumns = document.querySelectorAll(
    "#user-table th[data-column]"
  );

  for (let col of sortableColumns) {
    col.classList.remove("sorted");
  }

  const currentColumn = document.querySelector(
    `#user-table th[data-column="${column}"]`
  );
  currentColumn.classList.add("sorted");
  fetchUsers();
}

function reverseColumn(oldOrder) {
  if (oldOrder == "asc") {
    return "desc";
  } else {
    return "asc";
  }
}

function filterUsers() {
  fetchUsers();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers();
  }
}

function nextPage() {
  const totalPages = Math.ceil(totalUsers / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    fetchUsers();
  }
}

function showUserDetails(user) {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("hidden");

    const lightboxName = document.getElementById("lightbox-name");
    if (lightboxName) {
      lightboxName.textContent = `${user.first_name} ${user.last_name}`;
    }

    const lightboxEmail = document.getElementById("lightbox-email");
    if (lightboxEmail) {
      lightboxEmail.innerHTML = `<b>Email:</b> ${user.email}`;
    }

    const lightboxRole = document.getElementById("lightbox-role");
    if (lightboxRole) {
      lightboxRole.innerHTML = `<b>Role</b>: ${user.role}`;
    }

    const lightboxDepartment = document.getElementById("lightbox-department");
    if (lightboxDepartment) {
      lightboxDepartment.innerHTML = `<b>Department:</b> ${user.department}`;
    }

    const lightboxAge = document.getElementById("lightbox-age");
    if (lightboxAge) {
      lightboxAge.innerHTML = `<b>Age</b>: ${user.age}`;
    }

    const lightboxAddress = document.getElementById("lightbox-address");
    if (lightboxAddress) {
      lightboxAddress.innerHTML = `<b>Address:</b> ${user.address}`;
    }
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.add("hidden");
  }
}

window.addEventListener("DOMContentLoaded", fetchUsers);

// Close lightbox when clicking outside the content
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

// Event listeners
const searchBox = document.getElementById("search-box");
if (searchBox) {
  searchBox.addEventListener("input", filterUsers);
}

const previousButton = document.getElementById("previous-button");
if (previousButton) {
  previousButton.addEventListener("click", previousPage);
}

const nextButton = document.getElementById("next-button");
if (nextButton) {
  nextButton.addEventListener("click", nextPage);
}

const sortableColumns = document.querySelectorAll(
  "#user-table th[data-column]"
);
if (sortableColumns) {
  sortableColumns.forEach((column) => {
    column.addEventListener("click", () =>
      sortTable(column.getAttribute("data-column"))
    );
  });
}
