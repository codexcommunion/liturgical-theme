import { calendarFor } from 'romcal';

// Re-export romcal for direct use
export { calendarFor } from 'romcal';

/**
 * Get all CSS variable names for today's liturgical color (or a specific date)
 * Takes an optional date param, uses romcal API to get the liturgical color,
 * then returns all relevant color variable names from the catholic-css palette
 */
export function getLiturgicalColorVariables(date?: Date): string[] {
  const targetDate = date || new Date();
  
  try {
    // Get the liturgical calendar for the target year
    const liturgicalCalendar = calendarFor(targetDate.getFullYear());
    
    // Find the celebration for the target date
    const dateString = targetDate.toISOString().split('T')[0];
    const todaysCelebrations = liturgicalCalendar.filter((celebration: any) => {
      // romcal uses 'moment' property
      const celebrationDate = new Date(celebration.moment);
      return celebrationDate.toISOString().split('T')[0] === dateString;
    });
    
    let liturgicalColorName = 'green'; // Default to Ordinary Time
    
    if (todaysCelebrations.length > 0) {
      const primaryCelebration = todaysCelebrations[0];
      // romcal has liturgicalColor in data.meta.liturgicalColor
      const liturgicalColor = (primaryCelebration as any).data?.meta?.liturgicalColor;
      liturgicalColorName = liturgicalColor?.key?.toLowerCase() || 'green';
    }
    
    // Return all the catholic-css color variables for this liturgical color
    return buildCatholicCSSVariableNames(liturgicalColorName);
    
  } catch (error) {
    console.warn('Error getting liturgical color variables:', error);
    // Fallback to Ordinary Time (green)
    return buildCatholicCSSVariableNames('green');
  }
}

/**
 * Build all Catholic CSS variable names for a specific liturgical color
 * Returns all the CSS variable names from the catholic-css palette for the given color
 */
function buildCatholicCSSVariableNames(liturgicalColorName: string): string[] {
  const colorVariablePrefix = `--color-liturgical-${liturgicalColorName.toLowerCase()}`;
  
  // Generate standard color scale based on catholic-css pattern
  const colorScaleSuffixes = ['', '-50', '-100', '-200', '-300', '-400', '-500', '-600', '-700', '-800', '-900', '-950'];
  return colorScaleSuffixes.map(suffix => `${colorVariablePrefix}${suffix}`);
}

// === Framework-specific transformers ===

/**
 * Transform liturgical color variables into a Docusaurus theme object
 * Returns an object that can be used directly in docusaurus.config.js
 */
export function getDocusaurusTheme(date?: Date): Record<string, string> {
  const variables = getLiturgicalColorVariables(date);
  
  // Extract the base color name (e.g., "green" from "--color-liturgical-green-500")
  const baseColorMatch = variables[0]?.match(/--color-liturgical-([a-z]+)(?:-\d+)?/);
  const baseColor = baseColorMatch?.[1] || 'green';
  
  return {
    // Primary color scale for Docusaurus
    '--ifm-color-primary': `var(--color-liturgical-${baseColor}-500)`,
    '--ifm-color-primary-dark': `var(--color-liturgical-${baseColor}-600)`,
    '--ifm-color-primary-darker': `var(--color-liturgical-${baseColor}-700)`,
    '--ifm-color-primary-darkest': `var(--color-liturgical-${baseColor}-800)`,
    '--ifm-color-primary-light': `var(--color-liturgical-${baseColor}-400)`,
    '--ifm-color-primary-lighter': `var(--color-liturgical-${baseColor}-300)`,
    '--ifm-color-primary-lightest': `var(--color-liturgical-${baseColor}-200)`,
  };
}

/**
 * Transform liturgical color variables into a Tailwind CSS theme object
 * Returns an object that can be used in tailwind.config.js
 */
export function getTailwindTheme(date?: Date): { colors: { primary: Record<string, string> } } {
  const variables = getLiturgicalColorVariables(date);
  
  // Extract the base color name
  const baseColorMatch = variables[0]?.match(/--color-liturgical-([a-z]+)(?:-\d+)?/);
  const baseColor = baseColorMatch?.[1] || 'green';
  
  return {
    colors: {
      primary: {
        50: `var(--color-liturgical-${baseColor}-50)`,
        100: `var(--color-liturgical-${baseColor}-100)`,
        200: `var(--color-liturgical-${baseColor}-200)`,
        300: `var(--color-liturgical-${baseColor}-300)`,
        400: `var(--color-liturgical-${baseColor}-400)`,
        500: `var(--color-liturgical-${baseColor}-500)`,
        600: `var(--color-liturgical-${baseColor}-600)`,
        700: `var(--color-liturgical-${baseColor}-700)`,
        800: `var(--color-liturgical-${baseColor}-800)`,
        900: `var(--color-liturgical-${baseColor}-900)`,
        950: `var(--color-liturgical-${baseColor}-950)`,
        DEFAULT: `var(--color-liturgical-${baseColor}-500)`,
      }
    }
  };
}

/**
 * Transform liturgical color variables into a Bootstrap CSS custom properties object
 * Returns an object that can be used with Bootstrap's CSS custom properties
 */
export function getBootstrapTheme(date?: Date): Record<string, string> {
  const variables = getLiturgicalColorVariables(date);
  
  // Extract the base color name
  const baseColorMatch = variables[0]?.match(/--color-liturgical-([a-z]+)(?:-\d+)?/);
  const baseColor = baseColorMatch?.[1] || 'green';
  
  return {
    '--bs-primary': `var(--color-liturgical-${baseColor}-500)`,
    '--bs-primary-rgb': `var(--color-liturgical-${baseColor}-500)`,
    '--bs-primary-text-emphasis': `var(--color-liturgical-${baseColor}-800)`,
    '--bs-primary-bg-subtle': `var(--color-liturgical-${baseColor}-100)`,
    '--bs-primary-border-subtle': `var(--color-liturgical-${baseColor}-200)`,
  };
}

/**
 * Transform liturgical color variables into a Mantine theme object
 * Returns an object that can be used with Mantine's theme system
 */
export function getMantineTheme(date?: Date): { primaryColor: string[] } {
  const variables = getLiturgicalColorVariables(date);
  
  // Extract the base color name
  const baseColorMatch = variables[0]?.match(/--color-liturgical-([a-z]+)(?:-\d+)?/);
  const baseColor = baseColorMatch?.[1] || 'green';
  
  return {
    primaryColor: [
      `var(--color-liturgical-${baseColor}-50)`,
      `var(--color-liturgical-${baseColor}-100)`,
      `var(--color-liturgical-${baseColor}-200)`,
      `var(--color-liturgical-${baseColor}-300)`,
      `var(--color-liturgical-${baseColor}-400)`,
      `var(--color-liturgical-${baseColor}-500)`,
      `var(--color-liturgical-${baseColor}-600)`,
      `var(--color-liturgical-${baseColor}-700)`,
      `var(--color-liturgical-${baseColor}-800)`,
      `var(--color-liturgical-${baseColor}-900)`,
    ]
  };
}

/**
 * Transform liturgical color variables into a generic CSS custom properties object
 * Returns an object with standardized variable names that can be used consistently
 * regardless of the actual liturgical color (e.g., --color-liturgical-500 instead of --color-liturgical-green-500)
 */
export function getGenericCSSTheme(date?: Date): Record<string, string> {
  const variables = getLiturgicalColorVariables(date);
  
  // Extract the base color name (e.g., "green" from "--color-liturgical-green-500")
  const baseColorMatch = variables[0]?.match(/--color-liturgical-([a-z]+)(?:-\d+)?/);
  const baseColor = baseColorMatch?.[1] || 'green';
  
  // Create standardized variable names that don't include the specific color
  const result: Record<string, string> = {};
  
  // Map to standardized names
  const colorScaleSuffixes = ['', '-50', '-100', '-200', '-300', '-400', '-500', '-600', '-700', '-800', '-900', '-950'];
  colorScaleSuffixes.forEach(suffix => {
    const standardizedName = `--color-liturgical${suffix}`;
    const actualVariable = `--color-liturgical-${baseColor}${suffix}`;
    result[standardizedName] = `var(${actualVariable})`;
  });
  
  return result;
}
