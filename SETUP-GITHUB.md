# 🚀 Instrukcja utworzenia repozytorium GitHub dla strony

## Krok 1: Utworzenie repozytorium na GitHub

1. **Przejdź do GitHub.com i zaloguj się**
2. **Kliknij "New repository"** (przycisk + w prawym górnym rogu)
3. **Wypełnij formularz:**
   - **Repository name**: `deweloper-jawne-ceny-website`
   - **Description**: `Official website for DeweloperJawneCeny WordPress plugin - housing price transparency law automation`
   - **Visibility**: Public
   - **NIE** zaznaczaj "Add a README file" (już mamy)

4. **Kliknij "Create repository"**

## Krok 2: Połączenie z lokalnym repozytorium

Po utworzeniu repozytorium GitHub pokaże instrukcje. Uruchom te komendy w terminalu:

```bash
# Przejdź do folderu strony
cd /Users/bartoszkulasiewicz/deweloper-jawne-ceny-website

# Dodaj remote origin (zastąp YOUR_USERNAME swoją nazwą użytkownika)
git remote add origin https://github.com/YOUR_USERNAME/deweloper-jawne-ceny-website.git

# Lub jeśli masz skonfigurowany SSH:
git remote add origin git@github.com:YOUR_USERNAME/deweloper-jawne-ceny-website.git

# Push kodu
git branch -M main
git push -u origin main
```

## Krok 3: Konfiguracja Netlify (deployment)

1. **Przejdź do [netlify.com](https://netlify.com) i zaloguj się**
2. **Kliknij "Add new site" → "Import an existing project"**
3. **Wybierz GitHub jako źródło**
4. **Wybierz repozytorium** `deweloper-jawne-ceny-website`
5. **Konfiguracja:**
   - **Branch to deploy**: `main`
   - **Build command**: (pozostaw puste)
   - **Publish directory**: (pozostaw puste lub wpisz `/`)
6. **Kliknij "Deploy site"**

## Krok 4: Konfiguracja domeny (opcjonalne)

1. **W Netlify przejdź do Site settings → Domain management**
2. **Kliknij "Add custom domain"**
3. **Wpisz domenę** (np. `deweloper-jawne-ceny.pl`)
4. **Skonfiguruj DNS** zgodnie z instrukcjami Netlify

---

**Rezultat**: Strona będzie dostępna pod adresem `https://your-site-name.netlify.app` i automatycznie aktualizowana przy każdym push do GitHub.