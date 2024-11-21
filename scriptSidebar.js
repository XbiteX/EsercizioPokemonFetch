/*sidebar utilities*/
// toggle Sidebar variables
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");

// toggle functions
sidebarToggle.addEventListener("click",() => {
    sidebar.classList.toggle("-translate-x-full");
    sidebar.classList.toggle("hidden");
});

closeSidebar.addEventListener("click", () => {
    sidebar.classList.add("hidden");
});
/* sidebar utilities */

