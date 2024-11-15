const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    updateThemeToggleText();
});

function updateThemeToggleText() {
    const isDarkTheme = body.classList.contains('dark-theme');
    themeToggle.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkTheme');
if (savedTheme === 'true') {
    body.classList.add('dark-theme');
}

// Initial update of theme toggle text
updateThemeToggleText();