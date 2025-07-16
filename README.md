# @codexcommunion/liturgical-theme

A lightweight, framework-agnostic theming package for Catholic websites. It provides CSS variables tied to the liturgical calendar via `romcal` and integrates seamlessly with the `catholic-css` color palette.

---

## Features

- **Framework Agnostic**: Works with any JS environment
- **Tree-Shakeable**: Import only what you use
- **Authentic Liturgical Colors**: Powered by [`catholic-css`](https://github.com/codexcommunion/catholic-css)
- **Liturgical Calendar Integration**: Uses [`romcal`](https://github.com/romcal/romcal)
- **Multiple Framework Support**: Theme transformers for Docusaurus, Tailwind, Bootstrap, Mantine, and generic CSS-in-JS
- **Typed & Lightweight**: TypeScript support included; \~2-6KB depending on usage

---

## Installation

```bash
npm install @codexcommunion/liturgical-theme catholic-css romcal
```

---

## Usage Overview

### Core Function

```ts
getLiturgicalColorVariables(date?: Date): string[]
```

Returns an array of CSS variable names (e.g. `--color-liturgical-green-500`) for the given date.

### Framework Transformers

- `getDocusaurusTheme(date?)`
- `getTailwindTheme(date?)`
- `getBootstrapTheme(date?)`
- `getMantineTheme(date?)`
- `getGenericCSSTheme(date?)`

Each returns a theme object using CSS variables from `catholic-css` mapped to the liturgical color for that date.

---

## Examples

### Basic

```ts
import { getLiturgicalColorVariables } from '@codexcommunion/liturgical-theme';
const vars = getLiturgicalColorVariables();
```

### Docusaurus

```ts
import { getDocusaurusTheme } from '@codexcommunion/liturgical-theme';
const theme = getDocusaurusTheme();
```

### Tailwind

```ts
import { getTailwindTheme } from '@codexcommunion/liturgical-theme';
module.exports = { theme: { extend: getTailwindTheme() } };
```

### Mantine

```tsx
<MantineProvider theme={getMantineTheme()}>
  {/* Your app */}
</MantineProvider>
```

### Plain JavaScript

```js
const theme = getGenericCSSTheme();
document.documentElement.style.cssText += Object.entries(theme)
  .map(([k,v]) => `${k}: ${v};`).join(' ');
```

---

## API Reference

### getLiturgicalColorVariables(date?)

Returns an array of variable names like `--color-liturgical-green-500`.

### get\*Theme(date?)

Each transformer maps the color of the day into your framework’s theming format.

---

## CSS Variables by Color

Example (Green):

```css
--color-liturgical-green-50
--color-liturgical-green-100
...
--color-liturgical-green-950
```

These are sourced from the `catholic-css` palette:

```css
@import 'catholic-css/dist/catholic-palette.css';
```

---

## Supported Liturgical Colors

- **Green**: Ordinary Time
- **Purple**: Advent, Lent
- **White**: Christmas, Easter
- **Red**: Martyrs, Pentecost
- **Rose**: Gaudete / Laetare Sundays
- **Gold**: Major Feasts (optional alternate)

---

## Performance & Bundle Size

- **Core only**: \~2KB
- **With transformers**: \~4-6KB
- Supports all major bundlers: Webpack, Vite, Rollup, Parcel, esbuild

---

## Related Projects

- [`catholic-css`](https://github.com/codexcommunion/catholic-css): CSS palette
- [`romcal`](https://github.com/romcal/romcal): Liturgical calendar engine

---

## License

MIT License

---

**Made with ❤️ for the Catholic web development community**

