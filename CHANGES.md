# Changes and proposed improvements

## Latest update

- Added support for saving dark-mode preferences by host or by full URL, with a configurable scope in the options page.
- Updated the extension metadata and documentation for the published GitHub repository.
- Added an MIT license and improved project documentation.

## High priority

- Migrate to Manifest V3 — Manifest V2 is deprecated in many browsers. Update background scripts to service workers and review permissions and `host_permissions`.
- Add support for per-site toggling and a host/URL scope preference for saved dark-mode choices.
- Add basic automated tests and a CI pipeline (GitHub Actions) for linting and packaging.

## Medium priority

- Support settings sync via `storage.sync` if desired.
- Improve the `options` UI for managing themes and site rules.
- Review or rotate the published extension `key` if it is not needed during development.

## Low priority

- Add a scheduled night mode.
- Improve CSS coverage and rules for new sites.
- Provide an onboarding or bug-report page.

## Notes

- The manifest currently uses escaped `\u003Call_urls>` for `<all_urls>`; it works but can be simplified.
- The extension is published on GitHub at https://github.com/bigbear2/Dark-Mode-Plus.

## Recommended next steps

1. Confirm the preferred project branding and release name.
2. Plan the Manifest V3 migration in a separate branch.
3. Add a basic `package.json` workflow and GitHub Actions pipeline.
