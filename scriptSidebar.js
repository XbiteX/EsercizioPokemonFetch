// /*sidebar utilities*/
// // toggle Sidebar variables
// const sidebarToggle = document.getElementById("sidebar-toggle");
// const sidebar = document.getElementById("sidebar");
// const closeSidebar = document.getElementById("close-sidebar");

// // toggle functions
// sidebarToggle.addEventListener("click",() => {
//     sidebar.classList.toggle("-translate-x-full");
//     sidebar.classList.toggle("hidden");
// });

// closeSidebar.addEventListener("click", () => {
//     sidebar.classList.add("hidden");
// });
// /* sidebar utilities */

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("sidebar-toggle");
    const closeButton = document.getElementById("close-sidebar");
    const content = document.getElementById("content");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        content.classList.toggle("sidebar-open");
    });

    closeButton.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        content.classList.remove("sidebar-open");
    });
});
