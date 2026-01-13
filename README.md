# DeweloperJawneCeny - Strona internetowa

Oficjalna strona internetowa pluginu WordPress **DeweloperJawneCeny** do automatyzacji ustawy o jawności cen mieszkań.

## 🌐 Strona

**URL**: [https://deweloper-jawne-ceny.netlify.app](https://deweloper-jawne-ceny.netlify.app)

## 📁 Struktura

```
/
├── index.html              # Strona główna
├── demo.html               # Demonstracja pluginu
├── artykuly.html           # Lista artykułów
├── artykuly/               # Statyczne artykuły (SSR)
│   └── {slug}/index.html   # Wygenerowane strony artykułów
├── templates/              # Szablony do generowania
│   └── article.html        # Szablon artykułu
├── assets/                 # CSS, JS, obrazy
│   ├── css/
│   ├── js/
│   │   └── articles-data.js # Źródło danych artykułów
│   └── images/
├── includes/               # Komponenty HTML
│   ├── header.html
│   └── footer.html
├── build-articles.js       # Skrypt generujący statyczne artykuły
├── package.json            # Konfiguracja Node.js
├── sitemap.xml             # Sitemap (auto-generowany)
└── netlify.toml            # Konfiguracja Netlify
```

## 🎯 Funkcjonalności

- **Responsywna strona główna** z prezentacją pluginu
- **Demo interaktywne** pokazujące funkcjonalności
- **Baza artykułów** SEO-optimized o ustawie
- **Cennik** z planami Free i Professional
- **Newsletter** i kontakt

## 📊 SEO & LLM Visibility

- **Pre-rendered artykuły (SSR)** - pełna treść widoczna w HTML bez JavaScript
- **Statyczne URL-e**: `/artykuly/{slug}/` zamiast dynamicznych parametrów
- Optymalizacja pod kluczowe frazy: "ustawa jawność cen mieszkań", "wtyczka wordpress deweloper"
- Strukturowane dane Schema.org (Article + FAQPage)
- Open Graph meta tags
- Szybkie ładowanie i Core Web Vitals
- **LLM-friendly** - treść dostępna dla ChatGPT, Perplexity, Gemini

## 🔨 Build

Artykuły są generowane podczas builda:

```bash
npm run build    # Generuje statyczne strony artykułów
npm run clean    # Czyści wygenerowane pliki
npm run rebuild  # Czyści i generuje od nowa
```

## 🚀 Deployment

Strona automatycznie deployowana na **Netlify** przy każdym push do main branch.

## 🔗 Powiązania

- **Plugin Repository**: [DeweloperJawneCeny](https://github.com/bkulasiewicz/deweloperJawneCeny)
- **Plugin ZIP**: Dostępne do pobrania na stronie

---

© 2025 DeweloperJawneCeny - Wtyczka WordPress dla zgodności z ustawą o jawności cen mieszkań