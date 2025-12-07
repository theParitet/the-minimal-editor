# The Minimal Editor

The Minimal Editor is a web plain text editor.

## Tech

- React(19)
- JavaScript (planned migration to TypeScript)
- Vite

## Roadmap

- Switch from `localStorage` (blocking) to `indexedDB` (async) using a wrapper (like `idb` or `Dexie.js`)
- Implement `StorageManager` browser API to allow persistence with the local machine and allow approximation of taken space.
- Explore the possibility of making the application to be PWA with Service Workers
- Searching and sorting
- Proper file structure
