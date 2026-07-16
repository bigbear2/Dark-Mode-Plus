# Dark Mode Plus — AI Agent Guidance

## Purpose
This repository is a Chromium browser extension that applies a global dark theme to websites. AI agents should focus on extension behavior, content-script injection, and site-specific CSS rules rather than generic web app patterns.

## Repository details
- Author: Fabio Lucci
- GitHub username: bigbear2
- Repository: https://github.com/bigbear2/Dark-Mode-Plus

## What matters most
- `manifest.json` is the entry point. It defines Manifest V3, permissions, content scripts, and `web_accessible_resources`.
- `lib/service_worker.js` is the background runtime for MV3 and imports shared logic from `lib/`.
- Content script injection order is important: `data/rules/rules.js`, `data/content_script/inject.js`, `data/content_script/resources/native.js`.
- Site-specific dark styles live in `data/content_script/custom/`; generic themes live in `data/content_script/general/`.
- `data/options/options.html` / `data/options/options.js` implement the options UI and storage interaction.
- `chrome.storage.local` and `chrome.runtime` messaging power runtime updates and reload behavior.

## Key files and directories
- `manifest.json` — extension metadata, permissions, host permissions, and service worker config.
- `lib/` — background helpers and shared runtime utilities.
- `data/content_script/` — injected assets used by the extension in pages.
- `data/content_script/custom/` — per-site CSS overrides.
- `data/content_script/general/` — global dark theme CSS sheets.
- `data/rules/rules.js` — site detection regex and theme selection data.
- `data/options/` — settings UI and option persistence.
- `CHANGES.md` — project priorities and planned improvements.
- `README.md` — install and usage overview.

## Development notes
- There is no automated test or CI setup in this repo yet.
- `package.json` contains only a placeholder `pack` script; packaging is manual via browser extension loader.
- The extension uses `<all_urls>` host permissions, so be careful when modifying URL matching or permissions.
- The manifest already uses `manifest_version: 3`, so preserve MV3 patterns when updating background logic.
- `manifest.json` currently escapes `<all_urls>` as `\u003Call_urls>`; this works but can be simplified for readability.
- Avoid changing the published `key` without explicit reason, as it may affect extension identity.

## Common tasks for agents
- Fix or extend site-specific CSS rules by updating `data/content_script/custom/*.css` and `data/rules/rules.js` regex mapping.
- Improve options behavior in `data/options/options.js` and update the options UI for theme toggles or site preferences.
- Migrate or clean up Manifest V3/permissions logic in `manifest.json` and `lib/service_worker.js`.
- Preserve content-script injection semantics and the message flow between page, background, and options.

## Project conventions
- Use existing Chrome extension APIs (`chrome.runtime`, `chrome.storage`, `chrome.storage.onChanged`, `chrome.runtime.sendMessage`).
- Keep UI and behavior changes minimal unless the task explicitly asks for a feature enhancement.
- Link to existing docs instead of duplicating them: use `README.md` for install/usage and `CHANGES.md` for priority guidance.

## Suggested next customization
- Add a custom skill or instruction focused on Chrome extension manifest and content-script work, especially manifest migration and CSS rule maintenance.
- Optionally create a `.github/copilot-instructions.md` if a second, narrower guidance file is desired for future AI agents.

