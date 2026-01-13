#!/usr/bin/env node
/**
 * Build script - generuje statyczne strony HTML dla artykulow
 * Uruchamiany podczas: npm run build
 *
 * Ten skrypt:
 * 1. Parsuje dane artykulow z assets/js/articles-data.js
 * 2. Generuje statyczne pliki HTML w /artykuly/{slug}/index.html
 * 3. Tworzy pelny HTML z trescia widoczna dla crawlerow i LLM
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Sciezki
const ARTICLES_DATA_PATH = './assets/js/articles-data.js';
const TEMPLATE_PATH = './templates/article.html';
const OUTPUT_DIR = './artykuly';

/**
 * Parsuje articles-data.js (JavaScript -> obiekt)
 * Uzywa vm.runInContext do bezpiecznego wykonania JS
 */
function parseArticlesData() {
    const content = fs.readFileSync(ARTICLES_DATA_PATH, 'utf-8');

    // Utworz kontekst z window jako obiektem
    const context = { window: {} };
    vm.createContext(context);

    // Wykonaj skrypt w kontekscie
    vm.runInContext(content, context);

    if (!context.window.articlesData) {
        throw new Error('Nie znaleziono window.articlesData w pliku');
    }

    return context.window.articlesData;
}

/**
 * Formatuje date do polskiego formatu
 */
function formatDate(dateStr) {
    const months = [
        'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
        'lipca', 'sierpnia', 'wrzesnia', 'pazdziernika', 'listopada', 'grudnia'
    ];
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

/**
 * Skraca tytul do breadcrumb (max 50 znakow)
 */
function shortenTitle(title, maxLength = 50) {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + '...';
}

/**
 * Generuje HTML dla sekcji FAQ
 */
function generateFaqHtml(faq) {
    if (!faq || faq.length === 0) return '';

    const faqItems = faq.map((item, i) => `
                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
                        <span>${escapeHtml(item.q)}</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer" id="faq-answer-${i}" hidden>
                        <p>${item.a}</p>
                    </div>
                </div>`).join('\n');

    return `
            <div class="article-faq" id="article-faq-container">
                <h2>Najczesciej zadawane pytania</h2>
                <div class="faq-list">
${faqItems}
                </div>
            </div>`;
}

/**
 * Generuje Schema.org FAQPage JSON-LD
 */
function generateFaqSchema(faq) {
    if (!faq || faq.length === 0) return '';

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a.replace(/<[^>]*>/g, '') // Usun tagi HTML
            }
        }))
    };

    return `
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 4)}
    </script>`;
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Generuje pojedynczy artykul
 */
function buildArticle(slug, article, template) {
    const outputPath = path.join(OUTPUT_DIR, slug);

    // Utworz katalog jesli nie istnieje
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    // Przygotuj dane
    const title = article.title || 'Artykul';
    const description = article.description || article.excerpt || '';
    const keywords = article.keywords || '';
    const category = article.category || 'Artykul';
    const date = article.date || new Date().toISOString().split('T')[0];
    const content = article.content || '';

    // Zamien placeholdery w szablonie
    let html = template
        .replace(/\{\{TITLE\}\}/g, escapeHtml(title))
        .replace(/\{\{TITLE_SHORT\}\}/g, escapeHtml(shortenTitle(title)))
        .replace(/\{\{DESCRIPTION\}\}/g, escapeHtml(description))
        .replace(/\{\{KEYWORDS\}\}/g, escapeHtml(keywords))
        .replace(/\{\{SLUG\}\}/g, slug)
        .replace(/\{\{DATE\}\}/g, date)
        .replace(/\{\{DATE_FORMATTED\}\}/g, formatDate(date))
        .replace(/\{\{CATEGORY\}\}/g, escapeHtml(category))
        .replace(/\{\{CONTENT\}\}/g, content.trim())
        .replace(/\{\{FAQ_HTML\}\}/g, generateFaqHtml(article.faq))
        .replace(/\{\{FAQ_SCHEMA\}\}/g, generateFaqSchema(article.faq));

    // Zapisz plik
    const filePath = path.join(outputPath, 'index.html');
    fs.writeFileSync(filePath, html, 'utf-8');

    console.log(`  [OK] /artykuly/${slug}/`);
    return { slug, path: filePath, title };
}

/**
 * Generuje sitemap dla artykulow
 */
function generateSitemap(articles) {
    const baseUrl = 'https://www.deweloperjawneceny.pl';
    const today = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/artykuly/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${baseUrl}/demo/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;

    for (const { slug, article } of articles) {
        sitemap += `    <url>
        <loc>${baseUrl}/artykuly/${slug}/</loc>
        <lastmod>${article.date || today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
`;
    }

    sitemap += `</urlset>`;

    fs.writeFileSync('./sitemap.xml', sitemap, 'utf-8');
    console.log('\n  [OK] sitemap.xml zaktualizowany');
}

/**
 * Glowna funkcja
 */
function main() {
    console.log('\n========================================');
    console.log('  Build: Generowanie statycznych artykulow');
    console.log('========================================\n');

    // Sprawdz czy istnieja wymagane pliki
    if (!fs.existsSync(ARTICLES_DATA_PATH)) {
        console.error(`[BLAD] Brak pliku: ${ARTICLES_DATA_PATH}`);
        process.exit(1);
    }

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error(`[BLAD] Brak szablonu: ${TEMPLATE_PATH}`);
        process.exit(1);
    }

    // Wczytaj dane
    console.log('Wczytywanie danych artykulow...');
    const articlesData = parseArticlesData();
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Utworz katalog wyjsciowy
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generuj artykuly
    const slugs = Object.keys(articlesData);
    console.log(`Znaleziono ${slugs.length} artykulow\n`);
    console.log('Generowanie stron:');

    const generated = [];
    for (const slug of slugs) {
        const result = buildArticle(slug, articlesData[slug], template);
        generated.push({ slug, article: articlesData[slug], ...result });
    }

    // Generuj sitemap
    generateSitemap(generated);

    console.log('\n========================================');
    console.log(`  Wygenerowano ${generated.length} artykulow!`);
    console.log('========================================\n');

    // Wyswietl URL-e
    console.log('URL-e artykulow:');
    generated.forEach(({ slug }) => {
        console.log(`  https://www.deweloperjawneceny.pl/artykuly/${slug}/`);
    });
    console.log('');
}

// Uruchom
main();
