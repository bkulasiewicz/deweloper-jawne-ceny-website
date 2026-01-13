// Simple include functionality for HTML
document.addEventListener('DOMContentLoaded', function() {
    // Use absolute paths for includes (works on all pages)
    const includesPath = '/includes/';

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
function navigateToSection(sectionId, event) {
    // Zapobiegaj domyślnemu zachowaniu linku (scroll do góry przy href="#")
    if (event) {
        event.preventDefault();
    }

    // Ustaw backup timer
    setupMenuCloseBackup();

    // Sprawdź czy element istnieje na stronie
    const element = document.getElementById(sectionId);
    if (element) {
        // Track pricing section view in Google Analytics
        if (sectionId === 'cennik' && typeof gtag !== 'undefined') {
            gtag('event', 'view_pricing', {
                'content_type': 'pricing',
                'section_name': 'Pricing Section'
            });
        }

        // Pobierz aktualną pozycję scroll i docelową pozycję
        const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
        const targetPosition = element.offsetTop - headerHeight - 20; // dodatkowy offset dla lepszego UX
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Sprawdź czy już jesteśmy w okolicy docelowej sekcji (tolerancja ±100px)
        const tolerance = 100;
        if (Math.abs(currentPosition - targetPosition) < tolerance) {
            // Już jesteśmy w docelowej sekcji - nie scrolluj, tylko zamknij menu
            closeMobileMenuSmoothly();
            return;
        }

        // Element istnieje i nie jesteśmy w jego okolicy - wykonaj smooth scroll
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close menu after scroll animation
        setTimeout(() => {
            closeMobileMenuSmoothly();
        }, 800);
    } else {
        // Element nie istnieje - przekieruj na index.html (absolute path)
        window.location.href = '/#' + sectionId;
        // Menu will close when page changes
        setTimeout(() => {
            closeMobileMenuSmoothly();
        }, 200);
    }
}

function navigateToPage(pageName) {
    // Ustaw backup timer
    setupMenuCloseBackup();

    // Use absolute paths
    const currentPath = window.location.pathname;

    // Jeśli próbujemy przejść na index.html i już jesteśmy na index.html
    if (pageName === 'index.html' && (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('/deweloper-jawne-ceny-website/') || currentPath.endsWith('/deweloper-jawne-ceny-website/index.html'))) {
        // Scroll do góry strony
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            closeMobileMenuSmoothly();
        }, 200);
        return;
    }

    // Use absolute path for navigation
    window.location.href = '/' + pageName;

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