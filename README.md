# Dark Mode Plus

## English

**Project**: Dark Mode Plus is a Chromium extension that applies a global dark theme to websites and supports per-site preferences.

- **Repository**: https://github.com/bigbear2/Dark-Mode-Plus
- **Author**: Fabio Lucci (GitHub: bigbear2)
- **Folder structure**: the root contains the extension manifest, the `data/` assets, and the `lib/` scripts.
- **Install**: load the project folder as an unpacked extension in Chromium-based browsers.

### Quick start

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable Developer mode.
3. Click **Load unpacked** and select this project folder.

### Main files

- `manifest.json` — extension metadata, permissions, and host permissions.
- `data/content_script/` — injected CSS/JS and site-specific rules.
- `lib/` — background helpers and runtime logic.
- `data/options/` — options page and user settings.

### Features

- Apply a dark theme globally across supported sites.
- Use site-specific rules for popular websites.
- Save dark-mode preferences per host or per full URL.
- Use the support-page option to open the project page after updates or first install.

### Development notes

- The project targets Manifest V3 and uses a service worker in `lib/service_worker.js`.
- Recent updates include support for host-based and URL-based per-site preferences.
- If the theme does not persist after reload, reload the extension and confirm that the content script is injected for the target page.
- Debug logging is available in `data/content_script/inject.js` and `lib/chrome.js`.

Contributing: create issues or pull requests in the repository.

License: this project is distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Italiano

**Progetto**: Dark Mode Plus è un’estensione Chromium che applica un tema scuro globale ai siti web e supporta preferenze per sito.

- **Repository**: https://github.com/bigbear2/Dark-Mode-Plus
- **Autore**: Fabio Lucci (GitHub: bigbear2)
- **Struttura della cartella**: nella root sono presenti il manifest dell’estensione, le risorse in `data/` e gli script in `lib/`.
- **Installazione**: carica la cartella del progetto come estensione non impacchettata nei browser basati su Chromium.

### Avvio rapido

1. Apri `chrome://extensions` (o `edge://extensions`).
2. Abilita la modalità Sviluppatore.
3. Clicca su **Load unpacked** e seleziona questa cartella del progetto.

### File principali

- `manifest.json` — metadati dell’estensione, permessi e host permissions.
- `data/content_script/` — CSS/JS iniettati e regole specifiche per sito.
- `lib/` — helper in background e logica di runtime.
- `data/options/` — pagina delle opzioni e impostazioni utente.

### Funzionalità

- Applica un tema scuro in modo globale sui siti supportati.
- Usa regole specifiche per siti popolari.
- Salva le preferenze del dark mode per host o per URL completo.
- Usa l’opzione della pagina di supporto per aprire la pagina del progetto dopo aggiornamenti o prima installazione.

### Note di sviluppo

- Il progetto è pensato per Manifest V3 e usa un service worker in `lib/service_worker.js`.
- Gli aggiornamenti recenti includono il supporto alle preferenze per host e per URL.
- Se il tema non persiste dopo il reload, ricarica l’estensione e verifica che lo script di contenuto sia iniettato nella pagina di destinazione.
- Il logging di debug è disponibile in `data/content_script/inject.js` e `lib/chrome.js`.

Contribuire: apri issue o pull request nel repository.

Licenza: il progetto è distribuito con licenza MIT. Vedi [LICENSE](LICENSE) per i dettagli.
