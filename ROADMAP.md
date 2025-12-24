# Roadmap

This file provides full information regarding features to be implemented.

## Major Features

- [ ] Switch from `localStorage` (blocking) to `indexedDB` (async) using a wrapper (like `idb` or `Dexie.js`)
- [ ] Implement `StorageManager` browser API to allow persistence with the local machine and allow approximation of taken space
- [ ] Explore the possibility of making the application to be PWA with Service Workers
- [ ] Proper file structure (with directories)

## Minor Features

- [ ] Extended theming (modern, neumorphism, glass; accent colors)
- [ ] Searching and sorting
- [ ] Add automatic title option based on content
- [ ] Verbose file panel (with partial content display)
- [ ] Introduce a panel collapse button for large screens for the file panel
- [ ] Allow to pin notes

## Technical Features

- [x] Migrate to TS (cleanup `tsconfig.json`)
- [x] Add `npm run ts:check` step to CI/CD pipeline
- [ ] Add `npm run a11y:all` step to CI/CD pipeline for accessability testing
- [x] Add comprehensive accessability support – focus management, ARIA labels, hints, add live regions (for notifications and errors)
- [ ] Refactor the project to use React context API
- [ ] Implement debouncing for writing data
- [ ] Refactor CSS for easier customizability – extract colors and variables
