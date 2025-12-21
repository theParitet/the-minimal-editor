# Roadmap

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

## Technical Features

- [x] Migrate to TS (cleanup `tsconfig.json`)
- [x] Add `npm run ts:check` step to CI/CD pipeline
- [ ] Refactor the project to use React context API
- [ ] Implement debouncing for writing data
- [ ] Refactor CSS for easier customizability – extract colors and variables
