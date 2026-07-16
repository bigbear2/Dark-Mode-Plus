# Modifiche e miglioramenti proposti (priorità)

Alta Priorità:

- Migrare a Manifest V3 — Manifest V2 è deprecato su molti browser. Aggiornare background scripts a service worker, rivedere permessi e `host_permissions`.
- Aggiungere opzione per abilitare/disabilitare l'estensione per sito (per-site toggle).
- Aggiungere test automatici base e pipeline CI (GitHub Actions) per linting e packaging.

Media Priorità:

- Supportare sincronizzazione impostazioni (storage.sync) se desiderato.
- Aggiungere UI migliorata nella `options` per gestione dei temi e regole per sito.
- Rimuovere o rinnovare la chiave (`key`) pubblicata nel manifest se non necessaria durante sviluppo.

Bassa Priorità:

- Aggiungere modalità scheduler (notturna programmata).
- Migliorare copertura CSS e regole per nuovi siti.
- Fornire una pagina di onboarding/bug-report integrata.

Errori/Problemi trovati:

- Il manifest usa stringhe escape `\u003Call_urls>` per `<all_urls>`; funziona ma è poco leggibile — si può sostituire con `<all_urls>` esplicito.
- `manifest_version` è 2: da attenzionare per compatibilità futura.

Passi consigliati immediati:

1. Conferma il nuovo nome o indica il nome preferito.
2. Pianificare migrazione Manifest V3 con un branch separato.
3. Aggiungere file `package.json` e pipeline GitHub Actions di base.
