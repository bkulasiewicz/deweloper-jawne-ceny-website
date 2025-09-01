// Articles list generator
document.addEventListener('DOMContentLoaded', function() {
    loadArticlesList();
});

function loadArticlesList() {
    const container = document.getElementById('articles-list');
    if (!container) return;
    
    let articlesHTML = '';
    
    // Get all articles and sort by date (newest first)
    const articles = Object.keys(window.articlesData)
        .map(id => ({
            id: id,
            ...window.articlesData[id]
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    articles.forEach(article => {
        articlesHTML += `
            <article class="article-item">
                <div class="article-icon">📖</div>
                <div class="article-content">
                    <h2><a href="artykul.html?id=${article.id}">${article.title}</a></h2>
                    <p>${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="article-date">${article.date}</span>
                        <span class="article-read-time">${article.readTime}</span>
                        <span class="article-category">${article.category}</span>
                    </div>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = articlesHTML;
}