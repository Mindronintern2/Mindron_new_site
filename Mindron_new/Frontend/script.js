
let currentTheme = 'dark';
let dropdownOpen = false;
let powerMenuOpen = false;

// Load navbar component
async function loadNavbar() {
    try {
        const response = await fetch('./components/navbar.html');
        const navbarHTML = await response.text();
        document.getElementById('navbar-container').innerHTML = navbarHTML;
    } catch (error) {
        console.error('Error loading navbar component:', error);
    }
}

async function loadFooter() {
    try {
        const response = await fetch('./components/footer.html');
        const footerHTML = await response.text();
        document.getElementById('footer').innerHTML = footerHTML
    } catch (error) {
        console.error('Error loading footer component:', error);
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    dropdownOpen = !dropdownOpen;
    
    if (dropdownOpen) {
        dropdown.classList.add('show');
        document.addEventListener('click', closeDropdownOnOutsideClick);
    } else {
        dropdown.classList.remove('show');
        document.removeEventListener('click', closeDropdownOnOutsideClick);
    }
}

function closeDropdownOnOutsideClick(event) {
    const themeSelector = document.querySelector('.theme-selector');
    if (!themeSelector.contains(event.target)) {
        document.getElementById('theme-dropdown').classList.remove('show');
        dropdownOpen = false;
        document.removeEventListener('click', closeDropdownOnOutsideClick);
    }
}

function setTheme(theme) {
    currentTheme = theme;
    const body = document.body;
    const themeIcon = document.querySelector('.theme-button .theme-icon');
    
    // Remove active class from all dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Handle system theme
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        themeIcon.className = 'theme-icon system-icon';
    } else {
        body.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'theme-icon moon-icon';
        } else {
            themeIcon.className = 'theme-icon sun-icon';
        }
    }
    
    // Add active class to selected item
    document.querySelector(`[onclick="setTheme('${theme}')"]`).classList.add('active');
    
    // Close dropdown
    document.getElementById('theme-dropdown').classList.remove('show');
    dropdownOpen = false;
    
    // Store preference
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentTheme === 'system') {
        document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Date and Time functionality
function updateDateTime() {
    const now = new Date();
    
    // Format date as DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    // Format time as HH:MM AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const timeString = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    
    // Update the DOM elements
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    if (dateElement) dateElement.textContent = dateString;
    if (timeElement) timeElement.textContent = timeString;
}

// Initialize components and theme when page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadNavbar();
    await loadFooter();
    initializeTheme();
    
    // Start the date/time updates after footer is loaded
    setTimeout(() => {
        updateDateTime();
        // Update every second
        setInterval(updateDateTime, 1000);
    }, 100);
});


fetch("components/navbar.html")
.then(response => response.text())
.then(data => {
  document.getElementById("navbar").innerHTML = data;
});

function powerButton() {
    const overlay = document.getElementById('power-menu-overlay');
    powerMenuOpen = !powerMenuOpen;
    
    if (powerMenuOpen) {
        overlay.classList.add('show');
        document.addEventListener('click', closePowerMenuOnOutsideClick);
        document.addEventListener('keydown', closePowerMenuOnEscape);
    } else {
        overlay.classList.remove('show');
        document.removeEventListener('click', closePowerMenuOnOutsideClick);
        document.removeEventListener('keydown', closePowerMenuOnEscape);
    }
}

function closePowerMenu() {
    const overlay = document.getElementById('power-menu-overlay');
    overlay.classList.remove('show');
    powerMenuOpen = false;
    document.removeEventListener('click', closePowerMenuOnOutsideClick);
    document.removeEventListener('keydown', closePowerMenuOnEscape);
}

function closePowerMenuOnOutsideClick(event) {
    const powerMenu = document.querySelector('.power-menu');
    if (!powerMenu.contains(event.target)) {
        closePowerMenu();
    }
}

function closePowerMenuOnEscape(event) {
    if (event.key === 'Escape') {
        closePowerMenu();
    }
}

function handlePowerAction(action) {
    // Close the menu first
    closePowerMenu();
    
    // Handle the power action
    switch(action) {
        case 'poweroff':
            alert('Power Off action triggered');
            // Add your power off logic here
            break;
        case 'shutdown':
            alert('Shutdown action triggered');
            // Add your shutdown logic here
            break;
        case 'logout':
            alert('Logout action triggered');
            // Add your logout logic here
            break;
        default:
            console.log('Unknown power action:', action);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // You can add your navigation logic here
            const tab = this.getAttribute('data-tab');
            console.log('Navigating to:', tab);
        });
    });
});


document.getElementById('focusSlider').addEventListener('input', function(e) {
    const value = e.target.value;
    const valueDisplay = e.target.parentElement.querySelector('.focus-value');
    valueDisplay.textContent = value;
});

document.getElementById('exposureSlider').addEventListener('input', function(e) {
    const value = e.target.value;
    const label = e.target.parentElement.querySelector('.control-label');
    label.textContent = `Exposure: ${value}.00 ms`;
});

document.getElementById('gainSlider').addEventListener('input', function(e) {
    const value = e.target.value;
    const label = e.target.parentElement.querySelector('.control-label');
    label.textContent = `Gain: ${value}.00`;
});

// Light button toggle
document.querySelector('.light-btn').addEventListener('click', function() {
    if (this.textContent === 'Turn On Light') {
        this.textContent = 'Turn Off Light';
        this.style.background = '#4CAF50';
    } else {
        this.textContent = 'Turn On Light';
        this.style.background = '#333';
    }
});

document.querySelector('.scan-btn').addEventListener('click', function() {

    if(this.textContent === 'Scan Bangles') {
        this.textContent = 'Stop Scanning';
        this.style.background = '#4CAF50';
    } else {
        this.textContent = 'Scan Bangles';
        this.style.background = '#333';
    }
    
});

// Toggle switch functionality
function toggleSwitch(element) {
    element.classList.toggle('active');
    
    // Update the text content based on state
    const isActive = element.classList.contains('active');
    // element.textContent = isActive ? 'ON' : 'OFF';
    
    // Get the label to know which toggle was clicked
    const label = element.parentElement.querySelector('label').textContent;
    
    // Log the state change (you can add your logic here)
    console.log(`${label} is now ${isActive ? 'ON' : 'OFF'}`);
    
    // You can add specific functionality for each toggle here
    if (label === 'Super Image') {
        handleSuperImageToggle(isActive);
    } else if (label === 'Auto Marking') {
        handleAutoMarkingToggle(isActive);
    }
}

// Handle Super Image toggle functionality
function handleSuperImageToggle(isOn) {
    if (isOn) {
        console.log('Super Image feature enabled');
        // Add your Super Image logic here
    } else {
        console.log('Super Image feature disabled');
        // Add your Super Image disable logic here
    }
}

// Handle Auto Marking toggle functionality
function handleAutoMarkingToggle(isOn) {
    if (isOn) {
        console.log('Auto Marking feature enabled');
        // Add your Auto Marking logic here
    } else {
        console.log('Auto Marking feature disabled');
        // Add your Auto Marking disable logic here
    }
}



