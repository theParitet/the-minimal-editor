# Accessibility

The Minimal Editor aims for **WCAG 2.1 Level AA** compliance. This document outlines what's implemented, how to test, and how to contribute.

## Current Status

**Version:** `v0.1.2`

### Implemented

- Labeled inputs and icon-only buttons
- Semantic HTML with proper list structures
- Focus management (modal trapping via `inert`, auto-focus, focus restoration)
- Keyboard navigation (Tab, Escape to close modal, Enter to confirm)
- `aria-expanded`, `aria-current`, `aria-haspopup` on interactive elements
- Notification live region (`aria-live`, `role="alert"` for errors, always rendered)
- High contrast ratios, visible focus indicators
- Touch-friendly target sizes
- No color-only information
- `prefers-reduced-motion` support (animations/transitions disabled)

### Known Issues

- **Notification announcements during file import:** VoiceOver may not announce error notifications when importing files due to the native file picker's focus announcements taking priority. The notification remains visible.
- **Placeholder contrast:** Empty file title placeholders use intentionally subtle contrast for visual hierarchy. Flagged by some tools but doesn't impact usability.

---

## Testing

### Automated

> [!IMPORTANT]
> The project will later move to Pa11y CI for better CI/CD integration and more streamlined test suite creation.

Run accessibility audits locally (spin up the dev server beforehand):

```bash
npm run a11y          # Main interface
npm run a11y:modal    # Settings modal
npm run a11y:all      # All suites
```

Tools used:

- **Pa11y** – WCAG audit (integrated in npm scripts)
- **Lighthouse** – Chrome DevTools
- **WAVE** – Browser extension
- **Safari Web Inspector** – Accessibility audit

### Manual Test Cases

**Modal focus management:**

1. Tab to the settings button
2. Press Enter -> focus should move to the close button
3. Press Enter -> focus should return to the settings button

**File selection focus:**

1. Tab to a file in the list
2. Press Enter -> focus should move to the title input

**Screen reader (VoiceOver):**

1. Navigate the file list -> should announce "list Saved files, X items"
2. Select a file -> should announce the file name and "currently open" if selected
3. Navigate to settings -> should announce "Settings, dialog pop up"
4. Open settings -> should announce "Settings, dialog"

**Reduced motion:**

1. Enable "Reduce motion" in system settings or dev tools
2. Open the import panel or trigger a notification -> should appear instantly without animation

### Latest Results

| Tool               | Result                                                        |
| ------------------ | ------------------------------------------------------------- |
| Pa11y              | Pass; No issues found (see ignored warnings below)            |
| Lighthouse         | 100 for Accessibility, SEO and Best Practices                 |
| WAVE               | Pass (false positive on GitHub link and intentional contrast) |
| VoiceOver (Chrome) | All interactions announced correctly                          |
| Keyboard           | Full navigation, focus management working                     |
| Zoom 200%          | Fully functional                                              |
| Reduced motion     | Animations disabled instantly                                 |

**Pa11y ignored warnings**:

- `1_4_3.G18.Alpha` & `1_4_3.G145.Alpha` – Contrast warnings for text with alpha transparency. Removed due to intentional styling and false positives.
- `1_4_10` – Reflow/viewport warnings. Fixed positioning warning on modal by design, does not degrade the experience.

---

## Roadmap

- [ ] In-app keyboard shortcuts reference
- [ ] Mobile viewport adjustments for on-screen keyboards

### Lack of Testing

- **NVDA/JAWS testing** – Currently only tested with VoiceOver on macOS
- **Windows screen reader users** – Verify cross-platform compatibility
