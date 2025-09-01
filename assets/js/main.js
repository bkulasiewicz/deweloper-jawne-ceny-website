// Pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmounts = document.querySelectorAll('.price__amount');

    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            priceAmounts.forEach(function(element) {
                const monthlyPrice = element.dataset.monthly;
                const yearlyPrice = element.dataset.yearly;
                
                if (monthlyPrice && yearlyPrice) {
                    element.textContent = isYearly ? yearlyPrice + ' zł' : monthlyPrice + ' zł';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

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
    const contactButtons = document.querySelectorAll('a[href="#kontakt"], a[href="mailto:bartosz.kulasiewicz@gmail.com"]');
    contactButtons.forEach(button => {
        if (button.href.includes('mailto:')) {
            // Track email clicks
            button.addEventListener('click', function() {
                // Analytics tracking could go here
                console.log('Email contact initiated');
            });
        }
    });

    // FAQ accordion (if added later)
    document.querySelectorAll('.faq__item').forEach(item => {
        item.addEventListener('click', function() {
            // Future: Add accordion functionality
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav__links');
            navLinks.classList.toggle('nav__links--open');
            mobileMenuButton.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinksAll = document.querySelectorAll('.nav__links a');
        navLinksAll.forEach(link => {
            link.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav__links');
                navLinks.classList.remove('nav__links--open');
                mobileMenuButton.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navLinks = document.querySelector('.nav__links');
            const isClickInside = mobileMenuButton.contains(event.target) || navLinks.contains(event.target);
            
            if (!isClickInside && navLinks.classList.contains('nav__links--open')) {
                navLinks.classList.remove('nav__links--open');
                mobileMenuButton.classList.remove('active');
            }
        });
        
        // Close mobile menu on ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const navLinks = document.querySelector('.nav__links');
                navLinks.classList.remove('nav__links--open');
                mobileMenuButton.classList.remove('active');
            }
        });
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
                    alert('Dziękujemy za zainteresowanie! Skontaktuj się z nami: bartosz.kulasiewicz@gmail.com');
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
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
});