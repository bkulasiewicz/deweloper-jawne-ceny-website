// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing__card, .testimonial, .step, .demo__item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Demo button functionality
    document.querySelectorAll('a[href="demo.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Normal navigation to demo.html - no preventDefault needed
        });
    });

    // Contact form handling
    const contactButtons = document.querySelectorAll('a[href="#kontakt"], a[href="mailto:kontakt@deweloperjawneceny.pl"]');
    contactButtons.forEach(button => {
        if (button.href.includes('mailto:')) {
            // Track email clicks
            button.addEventListener('click', function() {
                // Track email click in Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact', {
                        'method': 'email',
                        'contact_type': 'direct_email'
                    });
                }
                console.log('Email contact initiated');
            });
        }
    });

    // FAQ accordion logic moved to faq-loader.js (reusable component)

    // Enhanced Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav__links');
    const header = document.querySelector('.header');
    
    if (mobileMenuButton && navLinks) {
        // Toggle menu on button click
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Note: Menu closing is now handled by navigation functions with proper timing
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && navLinks.classList.contains('nav--open')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('nav--open')) {
                closeMobileMenu();
            }
        });
        
        // Prevent body scroll when menu is open
        function toggleBodyScroll(prevent) {
            if (prevent) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        function toggleMobileMenu() {
            const isOpen = navLinks.classList.contains('nav--open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        function openMobileMenu() {
            navLinks.classList.add('nav--open');
            mobileMenuButton.classList.add('menu--open');
            toggleBodyScroll(true);
        }
        
        function closeMobileMenu() {
            navLinks.classList.remove('nav--open');
            mobileMenuButton.classList.remove('menu--open');
            toggleBodyScroll(false);
        }
        
        // Make functions globally available for HTML onclick
        window.toggleMobileMenu = toggleMobileMenu;
        window.closeMobileMenu = closeMobileMenu;
        window.openMobileMenu = openMobileMenu;
    }

    // Stats counter animation
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat__number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 30; // 30 frames
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 50);
        });
    }

    // Trigger number animation when stats come into view
    const statsSection = document.querySelector('.preview-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // Add loading states for CTA buttons
    document.querySelectorAll('.card__cta').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Zacznij') || this.textContent.includes('Wypróbuj')) {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.textContent = 'Ładowanie...';
                this.disabled = true;
                
                // Simulate loading
                setTimeout(() => {
                    alert('Dziękujemy za zainteresowanie! Skontaktuj się z nami: kontakt@deweloperjawneceny.pl');
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });


    // Add typewriter effect to hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment to enable typewriter effect
    // const heroTitle = document.querySelector('.hero__title');
    // if (heroTitle) {
    //     const titleText = heroTitle.textContent;
    //     typeWriter(heroTitle, titleText, 50);
    // }

    // Video overlay functionality
    const videoOverlay = document.querySelector('.video-overlay');
    const videoIframe = document.querySelector('.video-wrapper iframe');

    if (videoOverlay && videoIframe) {
        videoOverlay.addEventListener('click', function() {
            // Track video play in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'video_start', {
                    'video_title': 'Demo Video',
                    'video_provider': 'youtube',
                    'video_url': videoIframe.src
                });
            }

            // Hide overlay
            this.classList.add('hidden');

            // Get current src and add autoplay parameter
            const currentSrc = videoIframe.src;
            const separator = currentSrc.includes('?') ? '&' : '?';
            videoIframe.src = currentSrc + separator + 'autoplay=1';
        });
    }

    // Track demo report downloads
    const downloadLinks = document.querySelectorAll('a[download]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.getAttribute('href').split('/').pop();
            const reportType = fileName.includes('raport-demonstracyjny-A') ? 'Raport A' :
                             fileName.includes('raport-demonstracyjny-B') ? 'Raport B' :
                             'Unknown Report';

            // Track file download in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'file_download', {
                    'file_extension': 'xml',
                    'file_name': fileName,
                    'link_text': reportType
                });
            }
        });
    });

    // Track legal pages clicks
    const legalLinks = document.querySelectorAll('a[href*="polityka-prywatnosci"], a[href*="warunki-wspolpracy"]');
    legalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageName = this.href.includes('polityka-prywatnosci') ? 'Polityka Prywatności' : 'Warunki Współpracy';

            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_legal_page', {
                    'event_category': 'engagement',
                    'event_label': pageName
                });
            }
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('a.btn--primary, button.btn--primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();

            // Track different CTA buttons
            if (buttonText.includes('Wykup') || buttonText.includes('pełną wersję')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'begin_checkout', {
                        'currency': 'PLN',
                        'value': 1499,
                        'items': [{
                            'item_name': 'DeweloperJawneCeny Plugin',
                            'item_category': 'WordPress Plugin',
                            'price': 1499,
                            'quantity': 1
                        }]
                    });
                }
            } else if (buttonText.includes('Skontaktuj')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click_cta_contact', {
                        'event_category': 'engagement',
                        'event_label': 'Skontaktuj się z nami'
                    });
                }
            } else if (buttonText.includes('Prezentacja wtyczki')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click_demo', {
                        'event_category': 'engagement',
                        'event_label': 'Demo Page Navigation'
                    });
                }
            }
        });
    });
});