// Article loader
document.addEventListener('DOMContentLoaded', function() {
    // Get article ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || 'default';
    
    // Load article data
    loadArticle(articleId);
    
    // Load related articles
    loadRelatedArticles(articleId);
});

function loadArticle(articleId) {
    const article = window.articlesData[articleId];
    
    // If article doesn't exist, redirect to articles page
    if (!article) {
        window.location.href = 'artykuly.html';
        return;
    }
    
    // Update page title and meta
    document.getElementById('article-title').textContent = article.title + ' - DeweloperJawneCeny';
    document.getElementById('article-description').setAttribute('content', article.description);
    document.getElementById('article-keywords').setAttribute('content', article.keywords);
    document.getElementById('og-title').setAttribute('content', article.title);
    document.getElementById('og-description').setAttribute('content', article.description);
    
    // Update canonical URL
    document.getElementById('canonical-url').setAttribute('href', `https://www.deweloperjawneceny.pl/artykul.html?id=${articleId}`);
    
    // Update breadcrumb
    document.getElementById('breadcrumb-title').textContent = article.title;
    
    // Update article header
    document.getElementById('main-title').textContent = article.title;
    document.getElementById('article-date').textContent = article.date;
    document.getElementById('article-read-time').textContent = article.readTime;
    
    // Update article content
    document.getElementById('article-content').innerHTML = article.content;

    // Update page title in browser
    document.title = article.title + ' - DeweloperJawneCeny';

    // Render FAQ if article has it
    const faqContainer = document.getElementById('article-faq-container');
    if (article.faq && article.faq.length > 0) {
        faqContainer.innerHTML = `
            <section class="faq-section">
                <div class="faq-container">
                    <h2>Najczęściej zadawane pytania</h2>
                    <div id="article-faq-list" class="faq-list"></div>
                </div>
            </section>
        `;
        // Check if renderFAQ function exists (from faq-loader.js)
        if (typeof renderFAQ === 'function') {
            renderFAQ(article.faq, 'article-faq-list');
        }
    } else {
        faqContainer.innerHTML = '';
    }
}

function loadRelatedArticles(currentArticleId) {
    const relatedContainer = document.getElementById('related-articles');
    let relatedHTML = '';
    
    // Get all articles except current one
    const allArticles = Object.keys(window.articlesData)
        .filter(id => id !== currentArticleId)
        .slice(0, 3); // Show max 3 related articles
    
    allArticles.forEach(articleId => {
        const article = window.articlesData[articleId];
        relatedHTML += `
            <div class="related-card">
                <h3><a href="artykul.html?id=${articleId}">${article.title}</a></h3>
                <p>${article.description.substring(0, 120)}...</p>
                <div class="article-meta">
                    <span class="article-date">${article.date}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
            </div>
        `;
    });
    
    // If no related articles, show default message
    if (relatedHTML === '') {
        relatedHTML = `
            <div class="related-card">
                <h3><a href="artykuly.html">Zobacz wszystkie artykuły</a></h3>
                <p>Sprawdź naszą pełną bazę wiedzy o automatyzacji zgodności prawnej.</p>
            </div>
        `;
    }
    
    relatedContainer.innerHTML = relatedHTML;
}