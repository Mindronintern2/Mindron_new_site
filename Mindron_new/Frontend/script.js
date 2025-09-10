
let currentTheme = 'dark';
let dropdownOpen = false;
let powerMenuOpen = false;

// delcare the global route..
const route={
    "/":"home",
    "/home":"home",
    "/scan":"scan",
    "/result":"./components/result.html",
    "/compare":"compare",
    "/certificates":"certificates",
    "/history":"history",
    "/settings":"settings"
}
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

// store the state of the div...

// Navigation function to load content based on route
// async function navigateToPage(route) {
//     const mainContent = document.querySelector('.sidebar').parentElement;

//     console.log('this is the main content', mainContent);
    
    
//     if (route === 'result') {
//         try {
//             const response = await fetch('./components/result.html');
//             const resultHTML = await response.text();
            
//             // Hide the current content and show result
//             document.querySelector('.sidebar').style.display = 'none';
//             document.querySelector('.camera-area').style.display = 'none';
//             document.querySelector('.controls-panel').style.display = 'none';
            
//             // Create or update result container
//             let resultContainer = document.getElementById('result');
//             if (!resultContainer) {
//                 resultContainer = document.createElement('div');
//                 resultContainer.id = 'result';
//                 // resultContainer.style.cssText = 'flex: 1; padding: 20px; display: flex; justify-content: center; align-items: center;';
//                 mainContent.appendChild(resultContainer);
//             }
//             // resultContainer.innerHTML = resultHTML;
//             // Extract body content from result.html
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(resultHTML, 'text/html');
//             const bodyContent = doc.querySelector('#result');
            
//             resultContainer.innerHTML = bodyContent ? bodyContent.outerHTML : resultHTML;
//             resultContainer.style.display = 'flex';
            
//         } catch (error) {
//             console.error('Error loading result page:', error);
//         }
//     } else if (route === 'home') {
//         // Show home/default content - restore original layout
//         document.querySelector('.sidebar').style.display = 'block';
//         document.querySelector('.camera-area').style.display = 'block';
//         document.querySelector('.wake-area').style.display = 'block';
//         document.querySelector('.controls-panel').style.display = 'block';
        
//         // Hide result container
//         const resultContainer = document.getElementById('result');
//         if (resultContainer) {
//             resultContainer.style.display = 'none';
//         }
//     } else if(route === 'scan'){
//         try {
//             const response = await fetch('./components/scan.html');
//             const resultHTML = await response.text();
            
//             // Hide the current content and show result
//             document.querySelector('.sidebar').style.display = 'none';
//             document.querySelector('.camera-area').style.display = 'none';
//             document.querySelector('.controls-panel').style.display = 'none';
            
//             // Create or update result container
//             let resultContainer = document.getElementById('scan');
//             if (!resultContainer) {
//                 resultContainer = document.createElement('div');
//                 resultContainer.id = 'scan';
//                 resultContainer.style.cssText = 'flex: 1; padding: 20px; display: flex; justify-content: center; align-items: center;';
//                 mainContent.appendChild(resultContainer);
//             }
//             // resultContainer.innerHTML = resultHTML;
//             // Extract body content from result.html
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(resultHTML, 'text/html');
//             const bodyContent = doc.querySelector('#scan');
            
//             resultContainer.innerHTML = bodyContent ? bodyContent.outerHTML : resultHTML;
//             resultContainer.style.display = 'flex';
            
//         } catch (error) {
//             console.error('Error loading result page:', error);
//         }
//     }
    
    
    
//     else {
//         // Show default content for other routes (scan, compare, etc.)
//         // document.querySelector('.sidebar').style.display = 'block';
//         // document.querySelector('.camera-area').style.display = 'block';
//         // document.querySelector('.controls-panel').style.display = 'block';
        
//         // const resultContainer = document.getElementById('result-container');
//         // if (resultContainer) {
//         //     resultContainer.style.display = 'none';
//         // }
//     }
// }

// // Initialize components and theme when page loads
// document.addEventListener('DOMContentLoaded', async function() {
//     await loadNavbar();
//     await loadFooter();
//     initializeTheme();
    
//     // Add event listeners to footer navigation after footer is loaded
//     setTimeout(() => {
//         const footerNavItems = document.querySelectorAll('.footer-container .nav-item');
        
//         footerNavItems.forEach(item => {
//             item.addEventListener('click', function(e) {
//                 e.preventDefault();
                
//                 // Remove active class from all footer nav items
//                 footerNavItems.forEach(nav => nav.classList.remove('active'));
                
//                 // Add active class to clicked item
//                 this.classList.add('active');
                
//                 // Get the route from data-tab attribute
//                 const route = this.getAttribute('data-tab');
//                 console.log('Navigating to:', route);
                
//                 // Navigate to the selected page
//                 navigateToPage(route);
//             });
//         });
        
//         updateDateTime();
//         // Update every second
//         setInterval(updateDateTime, 1000);
//     }, 100);
// });

async function navigateToPage(route) {
    const mainContent = document.querySelector('.sidebar').parentElement;

    // Hide all core sections initially
    const sections = ['.sidebar', '.camera-area', '.controls-panel', '.wake-area'];
    sections.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.style.display = 'none';
    });

    // Hide all dynamic containers (result, scan, etc.)
    document.querySelectorAll('.page-container').forEach(container => {
        container.style.display = 'none';
    });

    // Handle routes
    if (route === 'home') {
        // Show main layout again
        sections.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = 'block';
        });
        return;
    }

    // For result, scan, compare, etc.
    try {
        const response = await fetch(`./components/${route}.html`);
        const resultHTML = await response.text();

        // Create or update container
        let container = document.getElementById(route);
        if (!container) {
            container = document.createElement('div');
            container.id = route;
            container.classList.add('page-container'); // pick up CSS styles
            mainContent.appendChild(container);
        }

        // Parse HTML and extract matching section
        const parser = new DOMParser();
        const doc = parser.parseFromString(resultHTML, 'text/html');
        const bodyContent = doc.querySelector(`#${route}`);

        container.innerHTML = bodyContent ? bodyContent.outerHTML : resultHTML;
        container.style.display = 'flex';

    } catch (error) {
        console.error(`Error loading ${route} page:`, error);
    }
}

// Initialize components and theme when page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadNavbar();
    await loadFooter();
    initializeTheme();

    setTimeout(() => {
        const footerNavItems = document.querySelectorAll('.footer-container .nav-item');

        footerNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // Toggle active class
                footerNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                const route = this.getAttribute('data-tab');
                console.log('Navigating to:', route);
                navigateToPage(route);
            });
        });

        updateDateTime();
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
