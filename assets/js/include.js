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

// Navigation functions with smooth menu closing
function navigateToSection(sectionId) {
    // Debug - sprawdź ścieżkę
    console.log('DEBUG navigateToSection:', {
        sectionId,
        pathname: window.location.pathname,
        href: window.location.href
    });
    
    // Ustaw backup timer
    setupMenuCloseBackup();
    
    // Nowy elastyczny warunek - sprawdź czy element istnieje na stronie
    const element = document.getElementById(sectionId);
    if (element) {
        // Element istnieje - rób smooth scroll
        console.log('DEBUG: Element found, doing smooth scroll');
        const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
        const targetPosition = element.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close menu after scroll animation (800ms for smooth UX)
        setTimeout(() => {
            console.log('DEBUG: Closing menu after scroll');
            closeMobileMenuSmoothly();
        }, 800);
    } else {
        // Element nie istnieje - przekieruj na index.html
        console.log('DEBUG: Element not found, redirecting');
        window.location.href = 'index.html#' + sectionId;
        // Menu will close when page changes, but add quick close for safety
        setTimeout(() => {
            closeMobileMenuSmoothly();
        }, 200);
    }
}

function navigateToPage(pageName) {
    // Ustaw backup timer
    setupMenuCloseBackup();
    
    // Start navigation immediately
    const currentPath = window.location.pathname;
    let basePath = '';
    
    if (currentPath.includes('/artykuly/')) {
        basePath = '../';
    }
    
    window.location.href = basePath + pageName;
    
    // Close menu quickly since page will change anyway (200ms)
    setTimeout(() => {
        closeMobileMenuSmoothly();
    }, 200);
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav__links');
    if (navLinks) {
        navLinks.classList.toggle('nav--open');
    }
}

// Simple helper to close mobile menu smoothly
function closeMobileMenuSmoothly() {
    const navLinks = document.querySelector('.nav__links');
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks) {
        navLinks.classList.remove('nav--open');
    }
    if (mobileMenuButton) {
        mobileMenuButton.classList.remove('menu--open');
    }
    document.body.style.overflow = '';
    console.log('DEBUG: Menu closed');
}

// Backup timer - fallback zabezpieczenie
let menuCloseBackupTimer = null;

function setupMenuCloseBackup() {
    // Wyczyść poprzedni timer
    if (menuCloseBackupTimer) {
        clearTimeout(menuCloseBackupTimer);
    }
    
    // Ustaw nowy timer - jeśli menu nie zamknie się w 2 sekundy, wymuś zamknięcie
    menuCloseBackupTimer = setTimeout(() => {
        const navLinks = document.querySelector('.nav__links');
        if (navLinks && navLinks.classList.contains('nav--open')) {
            console.log('DEBUG: Backup timer - force closing menu');
            closeMobileMenuSmoothly();
        }
    }, 2000);
}