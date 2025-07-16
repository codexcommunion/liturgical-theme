# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-15

### Added
- Initial release of @codexcommunion/liturgical-theme
- Core liturgical utilities with romcal integration
- Catholic CSS color scheme support
- Docusaurus theming integration
- React components and hooks
- TypeScript support
- Comprehensive documentation
- Unit tests
- CI/CD pipeline
- ESLint and Prettier configuration

### Features
- `getCurrentLiturgicalInfo()` - Get current liturgical information
- `getLiturgicalInfoForDate()` - Get liturgical info for specific date
- `getLiturgicalColorScheme()` - Get Catholic CSS color variables
- `generateDocusaurusCSS()` - Generate Docusaurus-compatible CSS
- `generateGenericCSS()` - Generate framework-agnostic CSS
- `getSeasonClasses()` - Get liturgical season CSS classes
- `<LiturgicalTheme>` - React component for automatic theming
- `<LiturgicalCard>` - Card component with liturgical styling
- `<LiturgicalBadge>` - Badge component for liturgical information
- `useLiturgicalInfo()` - React hook for liturgical information
- `useLiturgicalTheme()` - React hook for theme management

### Dependencies
- catholic-css: ^1.0.0
- romcal: ^1.5.0
- react (peer): >=16.8.0
- react-dom (peer): >=16.8.0
