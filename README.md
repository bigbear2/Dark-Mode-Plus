# Dark Mode Plus

## English

**Project**: Dark Mode Plus — A global dark theme for the web (extension).

- **Folder**: root contains the extension manifest, `data/` assets, and `lib/` scripts.
- **Install**: load as an unpacked extension in Chromium-based browsers via the project folder.
- **Developer**: bigbear2

Quick start:

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable Developer mode.
3. Click "Load unpacked" and select this project folder.

Files of interest:
- `manifest.json` — extension metadata and permissions.
- `data/content_script/` — injected CSS/JS and per-site rules.
- `lib/` — background helpers and runtime logic.

Development notes:
- This project is built for Manifest V3 and uses a service worker in `lib/service_worker.js`.
- Recent fixes include replacing `chrome.browserAction` with `chrome.action` and avoiding `window` in the service worker context.
- If the theme does not persist after reload, reload the extension and verify the content script is injected for the target page.
- Debug logging has been added in `data/content_script/inject.js` and `lib/chrome.js`.
- Open DevTools in the page and in the service worker console to capture logs.

Contributing: create issues or pull requests in the repository. Contact: GitHub user `bigbear2`.

## Italiano

**Progetto**: Dark Mode Plus — Tema scuro globale per il web (estensione).

- **Cartella**: la root contiene il `manifest.json`, le risorse in `data/` e gli script in `lib/`.
- **Installazione**: caricare come estensione non impacchettata nei browser Chromium dalla cartella del progetto.
- **Sviluppatore**: bigbear2

Avvio rapido:

1. Apri `chrome://extensions` (o `edge://extensions`).
2. Abilita la Modalità sviluppatore.
3. Clicca su "Load unpacked" e seleziona la cartella del progetto.

File principali:
- `manifest.json` — metadati e permessi dell'estensione.
- `data/content_script/` — CSS/JS iniettati e regole per sito.
- `lib/` — helper in background e logica runtime.

Contribuire: apri issue o pull request. Contatto: GitHub `bigbear2`.
