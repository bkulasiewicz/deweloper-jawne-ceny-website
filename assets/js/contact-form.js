// Contact form handler for Netlify Forms
function initContactForm() {
    console.log('Initializing contact form');
    
    const contactForm = document.getElementById('contact-form');
    console.log('Contact form found:', contactForm);
    
    if (!contactForm) {
        console.log('Contact form not found, retrying in 500ms...');
        setTimeout(initContactForm, 500);
        return;
    }

    console.log('Adding submit listener to contact form');
    contactForm.addEventListener('submit', function(e) {
        console.log('Form submitted via Netlify Forms');

        // Track form submission in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'qualify_lead_question', {
                'currency': 'PLN',
                'value': 1499,
                'method': 'Contact Form'
            });
        }

        const form = this;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Show submitting message
        formMessage.innerHTML = `
            <div class="alert alert--info">
                <strong>📧 Dziękujemy! Wkrótce prześlemy Ci link do zakupu pełnej wersji.</strong>
            </div>
        `;
        
        // Let Netlify handle the form submission naturally
        // No e.preventDefault() - let the form submit normally to Netlify
    });
}

// Start initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);