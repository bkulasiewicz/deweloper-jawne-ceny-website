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
        // Format date as "2025 styczeń 9"
        const date = new Date(article.date);
        const months = [
            'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
            'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
        ];
        const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        
        articlesHTML += `
            <a href="/artykuly/${article.id}/" class="article-item-link">
                <article class="article-item">
                    <h2>${article.title}</h2>
                    <p>${article.excerpt}</p>
                    <div class="article-date">${formattedDate}</div>
                </article>
            </a>
        `;
    });
    
    container.innerHTML = articlesHTML;
}