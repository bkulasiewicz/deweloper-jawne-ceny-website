/**
 * FAQ Loader - Reusable FAQ component with JSON-LD schema generation
 * Renders FAQ sections dynamically and handles accordion functionality
 */

/**
 * Renders FAQ HTML from data array
 * @param {Array} faqData - Array of FAQ objects with {q: "question", a: "answer"}
 * @param {string} containerId - ID of the container element (without #)
 */
function renderFAQ(faqData, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`FAQ container with ID "${containerId}" not found`);
        return;
    }

    if (!faqData || faqData.length === 0) {
        container.innerHTML = '';
        return;
    }

    // Generate HTML for all FAQ items
    let faqHTML = '';

    faqData.forEach(function(item) {
        faqHTML += `
            <article class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    <span>${item.q}</span>
                    <span class="faq-icon">▼</span>
                </button>
                <div class="faq-answer" hidden>
                    <p>${item.a}</p>
                </div>
            </article>
        `;
    });

    container.innerHTML = faqHTML;

    // Initialize accordion for this container
    initializeFAQAccordion(containerId);

    // Generate and inject JSON-LD schema
    generateFAQSchema(faqData, containerId);
}

/**
 * Initializes accordion functionality for FAQ items
 * @param {string} containerId - ID of the container element
 */
function initializeFAQAccordion(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    const buttons = container.querySelectorAll('.faq-question');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;

            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !expanded);

            // Toggle answer visibility with smooth animation
            if (expanded) {
                // Closing
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.hidden = true;
                }, 400); // Match CSS transition duration
            } else {
                // Opening
                answer.hidden = false;
                // Set max-height to scrollHeight for smooth animation
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Generates and injects JSON-LD FAQPage schema into <head>
 * @param {Array} faqData - Array of FAQ objects
 * @param {string} schemaId - Unique ID for the schema script tag
 */
function generateFAQSchema(faqData, schemaId) {
    if (!faqData || faqData.length === 0) return;

    // Remove existing schema with this ID if it exists
    const existingSchema = document.getElementById(`faq-schema-${schemaId}`);
    if (existingSchema) {
        existingSchema.remove();
    }

    // Create JSON-LD schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(function(item) {
            // Strip HTML tags for schema (Google doesn't support HTML in schema)
            const plainAnswer = item.a.replace(/<[^>]*>/g, '');

            return {
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": plainAnswer
                }
            };
        })
    };

    // Create script tag
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = `faq-schema-${schemaId}`;
    scriptTag.textContent = JSON.stringify(schema, null, 2);

    // Inject into <head>
    document.head.appendChild(scriptTag);
}

/**
 * Auto-initialize FAQ accordion for static/pre-rendered FAQ sections
 * This runs on DOMContentLoaded for pages with pre-rendered FAQ HTML
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a pre-rendered FAQ container (from SSR articles)
    const staticFaqContainer = document.getElementById('article-faq-container');
    if (staticFaqContainer) {
        // Initialize accordion for pre-rendered FAQ
        const faqList = staticFaqContainer.querySelector('.faq-list');
        if (faqList) {
            initializeFAQAccordion('article-faq-container');
        }
    }

    // Note: Main page FAQ ('faq-list') is initialized by renderFAQ() call in index.html
    // No need to initialize it here to avoid duplicate event listeners
});
