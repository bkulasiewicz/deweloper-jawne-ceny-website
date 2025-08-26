// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Create mailto link
        const mailtoSubject = `[DeweloperJawneCeny] Zapytanie od ${data.email}`;
        const mailtoBody = `Od: ${data.email}

Wiadomość:
${data.message}

---
Wysłano z formularza kontaktowego na stronie DeweloperJawneCeny`;
        
        const mailtoLink = `mailto:bartosz.kulasiewicz@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
        
        // Simulate sending delay
        setTimeout(() => {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show success message
            formMessage.innerHTML = `
                <div class="alert alert--success">
                    <strong>✅ Formularz przygotowany!</strong><br>
                    Kliknij w link email aby wysłać wiadomość.<br>
                    <small>Jeśli link nie zadziałał, napisz bezpośrednio na: bartosz.kulasiewicz@gmail.com</small>
                </div>
            `;
            
            // Open mailto
            window.location.href = mailtoLink;
            
            // Clear form
            form.reset();
            
            // Hide message after 10 seconds
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 10000);
        }, 1000);
    });
});