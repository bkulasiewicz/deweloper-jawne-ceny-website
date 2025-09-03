// Simple include functionality for HTML
document.addEventListener('DOMContentLoaded', function() {
    // Determine base path for includes
    const currentPath = window.location.pathname;
    let includesPath = 'includes/';
    
    if (currentPath.includes('/artykuly/')) {
        includesPath = '../includes/';
    }

    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch(includesPath + 'header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }

    // Load contact section
    const contactPlaceholder = document.getElementById('contact-placeholder');
    if (contactPlaceholder) {
        fetch(includesPath + 'contact-section.html')
            .then(response => response.text())
            .then(data => {
                contactPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading contact section:', error);
            });
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch(includesPath + 'footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});

// Navigation functions
function navigateToSection(sectionId) {
    // Check if we're on the main page
    if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/' || window.location.pathname === '/website/') {
        // We're on the main page, scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
            const targetPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    } else {
        // We're on a different page, navigate to main page with anchor
        window.location.href = 'index.html#' + sectionId;
    }
}

function navigateToPage(pageName) {
    // Check current directory level
    const currentPath = window.location.pathname;
    let basePath = '';
    
    if (currentPath.includes('/artykuly/')) {
        basePath = '../';
    }
    
    window.location.href = basePath + pageName;
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav__links');
    if (navLinks) {
        navLinks.classList.toggle('nav--open');
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav__links');
    if (navLinks) {
        navLinks.classList.remove('nav--open');
    }
}

// Enhanced navigation functions that close mobile menu
function navigateToSectionMobile(sectionId) {
    closeMobileMenu();
    setTimeout(() => navigateToSection(sectionId), 100);
}

function navigateToPageMobile(pageName) {
    closeMobileMenu();
    setTimeout(() => navigateToPage(pageName), 100);
}