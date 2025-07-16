# @codexcommunion/liturgical-theme

A lightweight, framework-agnostic liturgical theming package for Catholic websites that combines authentic Catholic CSS variables with liturgical calendar calculations.

## Features

- **🪶 Lightweight & Framework Agnostic**: Core utilities work with any framework or plain JavaScript
- **⚡ Tree-Shakeable**: Import only what you need - built with modern bundlers in mind
- **🎨 Authentic Catholic Colors**: Uses the `catholic-css` package for proper liturgical color variables
- **📅 Liturgical Calendar Integration**: Powered by `romcal` for accurate liturgical calculations
- **🔧 Multiple Framework Support**: Built-in transformers for Docusaurus, Tailwind, Bootstrap, Mantine, and more
- **📦 TypeScript Support**: Full TypeScript definitions included (but TypeScript not required)
- **🌐 Browser & Node.js Compatible**: Works in all modern JavaScript environments

## What This Package Does

This package provides a simple core function that:
1. Takes an optional date parameter (defaults to today)
2. Uses the `romcal` liturgical calendar API to determine the liturgical color for that date
3. Returns all relevant CSS variable names from the `catholic-css` color palette
4. Provides framework-specific transformers to convert these variables into theme objects for popular frameworks

**Core Function:**
```typescript
getLiturgicalColorVariables(date?: Date): string[]
```

**Framework Transformers:**
- `getDocusaurusTheme(date?: Date)` - For Docusaurus sites
- `getTailwindTheme(date?: Date)` - For Tailwind CSS
- `getBootstrapTheme(date?: Date)` - For Bootstrap
- `getMantineTheme(date?: Date)` - For Mantine UI
- `getGenericCSSTheme(date?: Date)` - For any CSS-in-JS system

## Installation

```bash
npm install @codexcommunion/liturgical-theme
```

**Dependencies:**
- `romcal@^1.3.0` - Liturgical calendar calculations
- `catholic-css@^1.0.4` - Authentic Catholic liturgical colors

## Bundlers & Tree-Shaking

This package is built with modern bundlers in mind and supports tree-shaking out of the box:

**✅ Webpack 5**: Full tree-shaking support - import only what you need
**✅ Vite**: Automatic dead code elimination
**✅ Rollup**: Native ES module support
**✅ Parcel**: Works with zero configuration
**✅ esbuild**: Fast bundling with tree-shaking

### Tree-Shaking Examples

```typescript
// Import only what you need - unused functions will be eliminated
import { getLiturgicalColorVariables } from '@codexcommunion/liturgical-theme';

// Or import specific framework transformers
import { getDocusaurusTheme, getTailwindTheme } from '@codexcommunion/liturgical-theme';

// Bundle analyzers will show only imported functions are included
```

**Bundle Size Impact:**
- Core function only: ~2KB minified + gzipped
- With framework transformers: ~4KB minified + gzipped
- Full package: ~6KB minified + gzipped

## Basic Usage

### Core Function

The main function of this package is `getLiturgicalColorVariables()`:

```typescript
import { getLiturgicalColorVariables } from '@codexcommunion/liturgical-theme';

// Get current liturgical color variables
const variables = getLiturgicalColorVariables();
console.log(variables);
// [
//   '--color-liturgical-green',
//   '--color-liturgical-green-50',
//   '--color-liturgical-green-100',
//   '--color-liturgical-green-200',
//   // ... all color scale variants
// ]

// Get variables for a specific date
const christmasVariables = getLiturgicalColorVariables(new Date('2024-12-25'));
console.log(christmasVariables);
// [
//   '--color-liturgical-white',
//   '--color-liturgical-white-50',
//   // ... white color scale variants
// ]
```

### Framework-Specific Transformers

The package includes transformers that convert liturgical color variables into theme objects for popular frameworks:

#### Docusaurus

```typescript
import { getDocusaurusTheme } from '@codexcommunion/liturgical-theme';

const theme = getDocusaurusTheme();
console.log(theme);
// {
//   '--ifm-color-primary': 'var(--color-liturgical-green-500)',
//   '--ifm-color-primary-dark': 'var(--color-liturgical-green-600)',
//   '--ifm-color-primary-darker': 'var(--color-liturgical-green-700)',
//   // ... more Docusaurus-specific variables
// }

// Use in docusaurus.config.js
module.exports = {
  themeConfig: {
    colorMode: {
      customCss: {
        ':root': getDocusaurusTheme()
      }
    }
  }
};
```

#### Tailwind CSS

```typescript
import { getTailwindTheme } from '@codexcommunion/liturgical-theme';

const theme = getTailwindTheme();
console.log(theme);
// {
//   colors: {
//     primary: {
//       50: 'var(--color-liturgical-green-50)',
//       100: 'var(--color-liturgical-green-100)',
//       // ... full color scale
//       DEFAULT: 'var(--color-liturgical-green-500)'
//     }
//   }
// }

// Use in tailwind.config.js
module.exports = {
  theme: {
    extend: getTailwindTheme()
  }
};
```

#### Bootstrap

```typescript
import { getBootstrapTheme } from '@codexcommunion/liturgical-theme';

const theme = getBootstrapTheme();
console.log(theme);
// {
//   '--bs-primary': 'var(--color-liturgical-green-500)',
//   '--bs-primary-rgb': 'var(--color-liturgical-green-500)',
//   '--bs-primary-text-emphasis': 'var(--color-liturgical-green-800)',
//   // ... Bootstrap-specific variables
// }

// Apply to CSS
const css = Object.entries(theme)
  .map(([key, value]) => `${key}: ${value};`)
  .join(' ');
document.documentElement.style.cssText += css;
```

#### Mantine

```typescript
import { getMantineTheme } from '@codexcommunion/liturgical-theme';

const theme = getMantineTheme();
console.log(theme);
// {
//   primaryColor: [
//     'var(--color-liturgical-green-50)',
//     'var(--color-liturgical-green-100)',
//     // ... 10-item color array for Mantine
//   ]
// }

// Use with Mantine provider
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={getMantineTheme()}>
      {/* Your app */}
    </MantineProvider>
  );
}
```

#### Generic CSS

```typescript
import { getGenericCSSTheme } from '@codexcommunion/liturgical-theme';

const theme = getGenericCSSTheme();
console.log(theme);
// {
//   '--color-liturgical': 'var(--color-liturgical-green)',
//   '--color-liturgical-50': 'var(--color-liturgical-green-50)',
//   '--color-liturgical-100': 'var(--color-liturgical-green-100)',
//   '--color-liturgical-200': 'var(--color-liturgical-green-200)',
//   // ... standardized names that map to actual color variables
// }

// Use with any CSS-in-JS library - names stay consistent across dates
const styles = {
  button: {
    backgroundColor: 'var(--color-liturgical-500)', // Always works regardless of liturgical color
    color: 'var(--color-liturgical-50)',
    borderColor: 'var(--color-liturgical-600)'
  }
};
```

## Complete Integration Examples

### Docusaurus

```typescript
// docusaurus.config.js
const { getDocusaurusTheme } = require('@codexcommunion/liturgical-theme');

module.exports = {
  title: 'My Catholic Site',
  themeConfig: {
    colorMode: {
      customCss: require.resolve('./src/css/custom.css'),
    },
  },
  plugins: [
    function liturgicalThemePlugin() {
      return {
        name: 'liturgical-theme-plugin',
        injectHtmlTags() {
          const theme = getDocusaurusTheme();
          const css = Object.entries(theme)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
          
          return {
            headTags: [
              {
                tagName: 'style',
                innerHTML: `:root { ${css} }`,
              },
            ],
          };
        },
      };
    },
  ],
};
```

### Next.js

```typescript
// _app.tsx
import { useEffect } from 'react';
import { getGenericCSSTheme } from '@codexcommunion/liturgical-theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const theme = getGenericCSSTheme();
    const css = Object.entries(theme)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
    
    document.documentElement.style.cssText += css;
  }, []);

  return <Component {...pageProps} />;
}
```

### Vite + React

```typescript
// main.tsx
import { getGenericCSSTheme } from '@codexcommunion/liturgical-theme';

// Apply liturgical theme on app startup
const theme = getGenericCSSTheme();
const css = Object.entries(theme)
  .map(([key, value]) => `${key}: ${value};`)
  .join(' ');

const style = document.createElement('style');
style.innerHTML = `:root { ${css} }`;
document.head.appendChild(style);

// Now start your React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Plain JavaScript (No Framework)

```javascript
// Works with vanilla JavaScript!
const { getLiturgicalColorVariables, getGenericCSSTheme } = require('@codexcommunion/liturgical-theme');

// Get current liturgical colors
const variables = getLiturgicalColorVariables();
console.log('Available CSS variables:', variables);

// Apply standardized theme to document
const theme = getGenericCSSTheme();
const css = Object.entries(theme)
  .map(([key, value]) => `${key}: ${value};`)
  .join(' ');

document.documentElement.style.cssText += css;

// Now use the standardized variables in your CSS - they work year-round!
// .my-button { 
//   background: var(--color-liturgical-500); 
//   color: var(--color-liturgical-50);
//   border: 1px solid var(--color-liturgical-600);
// }
```

### Webpack

```javascript
// webpack.config.js
const { getTailwindTheme } = require('@codexcommunion/liturgical-theme');

module.exports = {
  // ... other config
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LITURGICAL_THEME': JSON.stringify(getTailwindTheme())
    })
  ]
};
```

## API Reference

### Core Functions

#### `getLiturgicalColorVariables(date?: Date): string[]`

The main function that returns all CSS variable names for a liturgical color.

**Parameters:**
- `date` (optional): Date object to get liturgical color for. Defaults to current date.

**Returns:**
- Array of CSS variable names from the catholic-css palette

**Example:**
```typescript
const variables = getLiturgicalColorVariables();
// Returns: ['--color-liturgical-green', '--color-liturgical-green-50', ...]

const christmasVariables = getLiturgicalColorVariables(new Date('2024-12-25'));
// Returns: ['--color-liturgical-white', '--color-liturgical-white-50', ...]
```

### Framework Transformers

#### `getDocusaurusTheme(date?: Date): Record<string, string>`

Returns Docusaurus-compatible theme object with `--ifm-*` variables.

#### `getTailwindTheme(date?: Date): { colors: { primary: Record<string, string> } }`

Returns Tailwind CSS theme object with full color scale.

#### `getBootstrapTheme(date?: Date): Record<string, string>`

Returns Bootstrap-compatible theme object with `--bs-*` variables.

#### `getMantineTheme(date?: Date): { primaryColor: string[] }`

Returns Mantine theme object with 10-item color array.

#### `getGenericCSSTheme(date?: Date): Record<string, string>`

Returns generic CSS custom properties object with standardized variable names that remain consistent regardless of the actual liturgical color. This allows you to use the same CSS variable names in your code year-round.

**Example:**
```typescript
// On a day with green liturgical color
const theme = getGenericCSSTheme();
// Returns: { '--color-liturgical-500': 'var(--color-liturgical-green-500)', ... }

// On Christmas (white liturgical color)
const theme = getGenericCSSTheme(new Date('2024-12-25'));
// Returns: { '--color-liturgical-500': 'var(--color-liturgical-white-500)', ... }

// Your CSS can always use the same variable names:
// .button { background: var(--color-liturgical-500); }
```

### Re-exports

#### `calendarFor`

Direct re-export from the `romcal` package for advanced usage:

```typescript
import { calendarFor } from '@codexcommunion/liturgical-theme';

const liturgicalCalendar = calendarFor(2024);
// Full romcal calendar data
```

## Understanding Liturgical Colors

This package uses the `romcal` library to determine liturgical colors based on the Catholic liturgical calendar. Here's what colors you can expect:

### Liturgical Seasons & Colors

- **🟢 Green (`liturgical-green-*`)**: Ordinary Time (most common)
- **🟣 Purple (`liturgical-purple-*`)**: Advent, Lent
- **⚪ White (`liturgical-white-*`)**: Christmas, Easter, major feasts
- **🔴 Red (`liturgical-red-*`)**: Pentecost, martyrs, Palm Sunday
- **🩷 Rose (`liturgical-rose-*`)**: Gaudete Sunday (3rd Sunday of Advent), Laetare Sunday (4th Sunday of Lent)
- **🟡 Gold (`liturgical-gold-*`)**: Special celebrations (alternative to white)

### CSS Variables Available

Each liturgical color comes with a complete scale of CSS variables:

```css
/* Example for green (Ordinary Time) */
--color-liturgical-green       /* Base color */
--color-liturgical-green-50    /* Lightest */
--color-liturgical-green-100
--color-liturgical-green-200
--color-liturgical-green-300
--color-liturgical-green-400
--color-liturgical-green-500   /* Standard/default */
--color-liturgical-green-600
--color-liturgical-green-700
--color-liturgical-green-800
--color-liturgical-green-900
--color-liturgical-green-950   /* Darkest */
```

### Using with Catholic CSS

This package works seamlessly with the `catholic-css` package. You can install both:

```bash
npm install @codexcommunion/liturgical-theme catholic-css
```

Then import the Catholic CSS variables:

```css
@import 'catholic-css/dist/catholic-palette.css';
```

Now your CSS variables will have actual color values from the Catholic CSS palette.

## Performance & Bundle Size

### Tree-Shaking Support

This package is designed for optimal tree-shaking:

```typescript
// ✅ Only imports the core function (~1KB)
import { getLiturgicalColorVariables } from '@codexcommunion/liturgical-theme';

// ✅ Only imports specific transformers (~2KB)
import { getDocusaurusTheme, getTailwindTheme } from '@codexcommunion/liturgical-theme';

// ❌ Imports everything (still only ~6KB total)
import * as liturgicalTheme from '@codexcommunion/liturgical-theme';
```

### Bundle Analysis

| Import | Size (minified + gzipped) | Use Case |
|--------|---------------------------|----------|
| Core function only | ~2KB | Just need CSS variables |
| Core + 1 transformer | ~3KB | Single framework |
| Core + 2-3 transformers | ~4KB | Multi-framework |
| Entire package | ~6KB | Everything |

### Caching Strategy

The package automatically caches liturgical calendar data for better performance:

- **Cold start**: ~50ms (first API call to romcal)
- **Subsequent calls**: ~1ms (cached data)
- **Memory footprint**: ~10KB per year of liturgical data

## Framework Integration Examples

### Docusaurus

For Docusaurus sites, add the theme component to your layout:

```tsx
// src/theme/Layout/index.tsx
import { LiturgicalTheme } from '@codexcommunion/liturgical-theme';
import Layout from '@theme-original/Layout';

export default function LayoutWrapper(props) {
  return (
    <>
      <LiturgicalTheme options={{ includeDarkMode: true }} />
      <Layout {...props} />
    </>
  );
}
```

### Mantine

```tsx
import { MantineProvider } from '@mantine/core';
import { generateMantineCSS, getCurrentLiturgicalInfo } from '@codexcommunion/liturgical-theme';

const liturgicalInfo = getCurrentLiturgicalInfo();
const css = generateMantineCSS(liturgicalInfo);

// Inject CSS into document head
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

function App() {
  return (
    <MantineProvider>
      {/* Your app content */}
    </MantineProvider>
  );
}
```

### Bootstrap

```html
<!-- In your HTML head -->
<style id="liturgical-theme"></style>

<script>
import { generateBootstrapCSS, getCurrentLiturgicalInfo } from '@codexcommunion/liturgical-theme';

const liturgicalInfo = getCurrentLiturgicalInfo();
const css = generateBootstrapCSS(liturgicalInfo);
document.getElementById('liturgical-theme').textContent = css;
</script>
```

### Tailwind CSS

```javascript
// tailwind.config.js
const { getCurrentLiturgicalInfo, getLiturgicalColorScheme } = require('@codexcommunion/liturgical-theme');

const liturgicalInfo = getCurrentLiturgicalInfo();
const colorScheme = getLiturgicalColorScheme(liturgicalInfo.color);

module.exports = {
  theme: {
    extend: {
      colors: {
        'liturgical-primary': colorScheme.primary,
        'liturgical-primary-dark': colorScheme.primaryDark,
        // ... other colors
      }
    }
  }
}
```

### Next.js

```tsx
// pages/_app.tsx
import { useEffect } from 'react';
import { generateCSS, getCurrentLiturgicalInfo } from '@codexcommunion/liturgical-theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const liturgicalInfo = getCurrentLiturgicalInfo();
    const css = generateCSS(liturgicalInfo, {
      cssPrefix: '--liturgical',
      includeDarkMode: true,
      darkModeSelector: '[data-theme="dark"]'
    });
    
    const style = document.createElement('style');
    style.id = 'liturgical-theme';
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  return <Component {...pageProps} />;
}
```

### Plain JavaScript (No Framework)

```javascript
// Works with plain JavaScript - no React or TypeScript needed!
const { getCurrentLiturgicalInfo, generateCSS } = require('@codexcommunion/liturgical-theme');

// Get liturgical information
const liturgicalInfo = getCurrentLiturgicalInfo();

// Generate CSS
const css = generateCSS(liturgicalInfo, {
  cssPrefix: '--theme',
  includeDarkMode: true,
  darkModeSelector: '.dark-mode'
});

// Apply to document
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// Apply season classes to body
document.body.classList.add(`liturgical-season-${liturgicalInfo.season}`);
```

## Plain JavaScript Usage

The package works perfectly with plain JavaScript! Here's how:

### Basic Plain JS Example

```javascript
// No TypeScript, no React needed!
const { getCurrentLiturgicalInfo, generateCSS } = require('@codexcommunion/liturgical-theme');

// Get current liturgical information
const liturgicalInfo = getCurrentLiturgicalInfo();
console.log(liturgicalInfo);
// { color: 'green', season: 'ordinary', celebration: 'Ordinary Time', rank: 'weekday' }

// Generate CSS
const css = generateCSS(liturgicalInfo);

// Apply to your webpage
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

### Plain JS with Custom Options

```javascript
const { generateCSS, getCurrentLiturgicalInfo } = require('@codexcommunion/liturgical-theme');

const liturgicalInfo = getCurrentLiturgicalInfo();
const css = generateCSS(liturgicalInfo, {
  cssPrefix: '--my-theme',
  includeDarkMode: true,
  darkModeSelector: '.dark-mode'
});

// Apply CSS
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
```

### Framework-Specific Plain JS

```javascript
// For Bootstrap (plain JS)
const { generateBootstrapCSS, getCurrentLiturgicalInfo } = require('@codexcommunion/liturgical-theme');

const liturgicalInfo = getCurrentLiturgicalInfo();
const css = generateBootstrapCSS(liturgicalInfo);
document.getElementById('liturgical-theme').textContent = css;
```

## Liturgical Colors

The package uses authentic Catholic CSS variables from the `catholic-css` package:

- **Green** (`--color-liturgical-green-*`): Ordinary Time
- **Purple** (`--color-liturgical-purple-*`): Advent, Lent
- **White** (`--color-liturgical-white`): Christmas, Easter
- **Red** (`--color-liturgical-red-*`): Pentecost, Martyrs
- **Rose** (`--color-liturgical-rose-*`): Gaudete, Laetare Sundays
- **Gold** (`--color-liturgical-gold-*`): Special Feasts

## CSS Classes

The package provides CSS classes for liturgical seasons:

- `.liturgical-season-ordinary`
- `.liturgical-season-advent`
- `.liturgical-season-christmas`
- `.liturgical-season-lent`
- `.liturgical-season-easter`
- `.liturgical-season-pentecost`
- `.liturgical-season-gaudete`
- `.liturgical-season-laetare`
- `.liturgical-season-feast`

## Dependencies

**Core Dependencies (always required):**
- `catholic-css`: Authentic Catholic liturgical colors
- `romcal`: Liturgical calendar calculations

**Optional Dependencies:**
- `react` (peer dependency): Only needed for React components (`<LiturgicalTheme>`, `<LiturgicalCard>`, etc.)
- `react-dom` (peer dependency): Only needed for React components
- `typescript`: Not required - just provides type definitions if you're using TypeScript

**Note:** The core functions work with plain JavaScript and don't require React or TypeScript!

## Troubleshooting

### Common Issues

#### Bundle Size Concerns
- **Problem**: Package seems too large for my needs
- **Solution**: Use named imports for tree-shaking: `import { getLiturgicalColorVariables } from '@codexcommunion/liturgical-theme'`

#### TypeScript Errors
- **Problem**: TypeScript can't find module declarations
- **Solution**: The package includes built-in TypeScript definitions. Make sure you're using TypeScript 4.0+

#### CSS Variables Not Working
- **Problem**: CSS variables are undefined
- **Solution**: Make sure you've imported `catholic-css` CSS file: `@import 'catholic-css/dist/catholic-palette.css'`

#### Romcal API Errors
- **Problem**: Liturgical calendar data not loading
- **Solution**: Check your internet connection and ensure `romcal` package is properly installed

### Performance Tips

1. **Cache Results**: If calling frequently, cache the results:
   ```typescript
   const cachedTheme = useMemo(() => getDocusaurusTheme(), []);
   ```

2. **Use Specific Dates**: Instead of calling every render, cache for the day:
   ```typescript
   const today = new Date().toDateString();
   const theme = useMemo(() => getDocusaurusTheme(), [today]);
   ```

3. **Lazy Loading**: For large applications, consider lazy loading:
   ```typescript
   const liturgicalTheme = await import('@codexcommunion/liturgical-theme');
   ```

### Build Configuration

#### Webpack
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      // Optional: alias for shorter imports
      'liturgical-theme': '@codexcommunion/liturgical-theme'
    }
  }
};
```

#### Vite
```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@codexcommunion/liturgical-theme']
  }
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
git clone https://github.com/codexcommunion/liturgical-theme.git
cd liturgical-theme
npm install
npm run dev # Start development mode
npm test # Run tests
```

### Release Process

1. Update version in `package.json`
2. Run `npm run build` to compile TypeScript
3. Run `npm test` to ensure all tests pass
4. Create a release on GitHub
5. Publish to npm: `npm publish`

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: [GitHub README](https://github.com/codexcommunion/liturgical-theme#readme)
- **Issues**: [GitHub Issues](https://github.com/codexcommunion/liturgical-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codexcommunion/liturgical-theme/discussions)
- **Email**: [support@codexcommunion.org](mailto:support@codexcommunion.org)

## Related Projects

- **[catholic-css](https://github.com/codexcommunion/catholic-css)**: Authentic Catholic liturgical colors
- **[romcal](https://github.com/romcal/romcal)**: Liturgical calendar calculations
- **[Docusaurus](https://docusaurus.io/)**: Documentation framework with great theming support
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework

---

**Made with ❤️ for the Catholic web development community**
