let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

function enableDarkmode() {
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkmode', "active")
}
function disableDarkmode() {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('darkmode', null)
}
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

if (darkmode === "active") enableDarkmode()