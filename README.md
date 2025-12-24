# The Minimal Editor

<p align="center">
    <img  src="public/thumbnail-v2.png" width="480" alt="the minimal editor thumbnail" />
</p>

The Minimal Editor is a web-based plain text editor designed for simplicity and focus. It runs entirely in your browser and uses local storage to save your work.

> [Live demo](https://theparitet.github.io/the-minimal-editor/)

## Features

- **File Management** – Create, edit, and delete notes with dedicated title and content sections.
- **Import & Export** – Import text files into the editor and export notes to your device.
- **Zen Mode** – A distraction-free mode that hides the interface, allowing to focus solely on writing.
- **Local Storage** – Data is automatically saved to the browser's local storage.
- **Responsive Design** – Accounts for different devices and screen sizes.
- **Configurable Appearance** – Customize the editor visuals through settings.
- **Accessible** – Aligns with WCAG 2.1 Level AA accessability features including screen reader support, keyboard navigation, focus management [and more](/ACCESSIBILITY.md).

## Tech Stack

### Core

- **React 19**
- **TypeScript**
- **CSS**
- **Vite**

### Deployment and Tools

- **GitHub Actions** for deployment on **GitHub Pages**
- **Prettier** for formatting
- **Pa11y** for accessability testing and auditing

## Getting Started

The list of operations to edit, run and preview the project locally:

### Install & Run

1. **Clone the repository** (through SSH in this case)

    ```bash
    git clone git@github.com:theParitet/the-minimal-editor.git
    cd the-minimal-editor
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

### Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Deployment

This project is automatically deployed to **GitHub Pages** via **GitHub Actions** workflows on push. The deployment pipeline enforces code quality standards:

- **Linting** – The code must pass ESLint checks (`npm run lint`).
- **Formatting** – The code must adhere to Prettier formatting (`npm run format:check` to check and `npm run format` to format).
- **Types** – The TypeScript source code files must pass the type-checking (`npm run ts:check`).

Alternatively, to run all the checks at once, you can use:

```bash
npm run check
```

The build is only accepted when these checks pass successfully.

### Accessability Testing

> [!NOTE]
> The project will later move from Pa11y to Pa11y CI for better CI/CD integration and more streamlined test suite creation.

Additionally, the project uses **Pa11y for accessability auditing/testing**. It is currently not enforced into CI/CD pipeline. Nevertheless, it is recommended to pass the audits without errors (or warnings that are easily dealt with).

1. To run Pa11y, you need to start the development server first (`http://localhost:5173/`):

    ```bash
    npm run dev
    ```

2. Then run Pa11y all existing audits:

    ```bash
    npm run a11y:all
    ```

Note that the default [pa11y.json](/a11y/pa11y.json) audit is also used as a template for other audits.

For extended information, refer to [ACCESSIBILITY.md](/ACCESSIBILITY.md).

## Project Structure

The project structure is organized as follows:

```bash
src/
├── assets/         # Static assets (fonts, icons)
│
│   # Components
├── Editor/         # Core editor components (input area, controls)
├── Modal/          # Modal components (Settings)
├── Notifications/  # Notification system components
├── Panel/          # Side panel for file management
├── Statuses/       # Import status indicators
│
│   # App Root
├── App.css         # Main component styles
├── App.tsx         # Main application component
│
│   # Shared
├── constants.tsx   # Application constants
├── types.tsx       # TypeScript type definitions
├── utils.ts        # Utility functions
│
│   # Entry
├── index.css       # Global styles
└── main.tsx        # Entry point
```

## Roadmap

- Switch from `localStorage` (blocking) to `indexedDB` (async) web storage
- Explore persistence with the local machine and with approximation of taken space
- Explore the possibility of making the application work offline
- Extended theming (modern, neumorphism, glass; accent colors)
- Proper file structure (with directories)
- Searching and sorting

For extended roadmap, check out [ROADMAP.md](/ROADMAP.md).
