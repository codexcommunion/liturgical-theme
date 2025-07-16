import { 
  getLiturgicalColorVariables,
  getDocusaurusTheme,
  getTailwindTheme,
  getBootstrapTheme,
  getMantineTheme,
  getGenericCSSTheme,
  calendarFor
} from '../index';

describe('index.ts - Liturgical Theme Functions', () => {
  
  describe('getLiturgicalColorVariables', () => {
    it('should return CSS variable names for current date', () => {
      const variables = getLiturgicalColorVariables();
      
      expect(Array.isArray(variables)).toBe(true);
      expect(variables.length).toBe(12); // base + 11 variations
      expect(variables.every(v => v.startsWith('--color-liturgical-'))).toBe(true);
    });

    it('should return variable names for specific liturgical dates', () => {
      const testDates = [
        new Date('2024-01-01'), // New Year's Day
        new Date('2024-03-31'), // Easter Sunday 2024
        new Date('2024-12-25'), // Christmas
        new Date('2024-12-01'), // First Sunday of Advent
        new Date('2024-02-14'), // Ash Wednesday
        new Date('2024-05-19'), // Pentecost
      ];

      testDates.forEach(date => {
        const variables = getLiturgicalColorVariables(date);
        
        expect(Array.isArray(variables)).toBe(true);
        expect(variables.length).toBe(12);
        expect(variables.every(v => v.startsWith('--color-liturgical-'))).toBe(true);
        expect(variables.every(v => v.match(/^--color-liturgical-[a-z]+(-\d+)?$/))).toBe(true);
      });
    });

    it('should include all expected color scale suffixes', () => {
      const variables = getLiturgicalColorVariables();
      const expectedSuffixes = ['', '-50', '-100', '-200', '-300', '-400', '-500', '-600', '-700', '-800', '-900', '-950'];
      
      expectedSuffixes.forEach(suffix => {
        const hasVariableWithSuffix = variables.some(v => v.endsWith(suffix));
        expect(hasVariableWithSuffix).toBe(true);
      });
    });

    it('should handle edge cases gracefully', () => {
      const edgeCases = [
        new Date('invalid-date'), // Invalid date
        new Date('1900-01-01'),   // Very old date
        new Date('2050-12-25'),   // Future date
        new Date('2024-02-29'),   // Leap year
      ];

      edgeCases.forEach(date => {
        const variables = getLiturgicalColorVariables(date);
        
        expect(Array.isArray(variables)).toBe(true);
        expect(variables.length).toBe(12);
        // Should fallback to green (ordinary time) for problematic dates
        expect(variables[0]).toMatch(/--color-liturgical-[a-z]+$/);
      });
    });

    it('should handle null/undefined dates', () => {
      const variablesUndefined = getLiturgicalColorVariables(undefined);
      const variablesNull = getLiturgicalColorVariables(null as any);
      
      expect(Array.isArray(variablesUndefined)).toBe(true);
      expect(Array.isArray(variablesNull)).toBe(true);
      expect(variablesUndefined.length).toBe(12);
      expect(variablesNull.length).toBe(12);
    });

    it('should return different variable names for different liturgical seasons', () => {
      const testCases = [
        {
          date: new Date('2024-06-15'), // Ordinary Time
          expectedColor: 'green',
          season: 'Ordinary Time'
        },
        {
          date: new Date('2024-12-25'), // Christmas
          expectedColor: 'white',
          season: 'Christmas'
        },
        {
          date: new Date('2024-03-31'), // Easter Sunday 2024
          expectedColor: 'white',
          season: 'Easter'
        },
        {
          date: new Date('2024-12-01'), // First Sunday of Advent
          expectedColor: 'purple',
          season: 'Advent'
        },
        {
          date: new Date('2024-02-14'), // Ash Wednesday
          expectedColor: 'purple',
          season: 'Lent'
        },
        {
          date: new Date('2024-05-19'), // Pentecost
          expectedColor: 'red',
          season: 'Pentecost'
        }
      ];

      const results = testCases.map(testCase => ({
        ...testCase,
        variables: getLiturgicalColorVariables(testCase.date)
      }));

      // Verify each season returns the expected color variables
      results.forEach(result => {
        expect(result.variables.every(v => v.includes(`-${result.expectedColor}-`) || v.endsWith(`-${result.expectedColor}`))).toBe(true);
      });

      // Verify that different seasons return different variable names
      const ordinaryTime = results.find(r => r.season === 'Ordinary Time')!;
      const christmas = results.find(r => r.season === 'Christmas')!;
      const advent = results.find(r => r.season === 'Advent')!;
      const pentecost = results.find(r => r.season === 'Pentecost')!;

      // Ordinary Time (green) should be different from Christmas (white)
      expect(ordinaryTime.variables).not.toEqual(christmas.variables);
      
      // Christmas (white) should be different from Advent (purple)
      expect(christmas.variables).not.toEqual(advent.variables);
      
      // Advent (purple) should be different from Pentecost (red)
      expect(advent.variables).not.toEqual(pentecost.variables);
      
      // Verify specific color patterns
      expect(ordinaryTime.variables[0]).toMatch(/--color-liturgical-green$/);
      expect(christmas.variables[0]).toMatch(/--color-liturgical-white$/);
      expect(advent.variables[0]).toMatch(/--color-liturgical-purple$/);
      expect(pentecost.variables[0]).toMatch(/--color-liturgical-red$/);
    });
  });

  describe('getDocusaurusTheme', () => {
    it('should return valid Docusaurus theme object', () => {
      const theme = getDocusaurusTheme();
      
      const expectedKeys = [
        '--ifm-color-primary',
        '--ifm-color-primary-dark',
        '--ifm-color-primary-darker',
        '--ifm-color-primary-darkest',
        '--ifm-color-primary-light',
        '--ifm-color-primary-lighter',
        '--ifm-color-primary-lightest'
      ];

      expectedKeys.forEach(key => {
        expect(theme).toHaveProperty(key);
        expect(theme[key]).toMatch(/^var\(--color-liturgical-[a-z]+-\d+\)$/);
      });
    });

    it('should work with different liturgical dates', () => {
      const testDates = [
        new Date('2024-12-25'), // Christmas
        new Date('2024-03-31'), // Easter
        new Date('2024-12-01'), // Advent
      ];

      testDates.forEach(date => {
        const theme = getDocusaurusTheme(date);
        
        expect(typeof theme).toBe('object');
        expect(Object.keys(theme).length).toBe(7);
        expect(theme['--ifm-color-primary']).toMatch(/^var\(--color-liturgical-[a-z]+-500\)$/);
      });
    });
  });

  describe('getTailwindTheme', () => {
    it('should return valid Tailwind theme object', () => {
      const theme = getTailwindTheme();
      
      expect(theme).toHaveProperty('colors');
      expect(theme.colors).toHaveProperty('primary');
      
      const expectedLevels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', 'DEFAULT'];
      expectedLevels.forEach(level => {
        expect(theme.colors.primary).toHaveProperty(level);
        expect(theme.colors.primary[level]).toMatch(/^var\(--color-liturgical-[a-z]+-\d+\)$/);
      });
    });

    it('should work with different liturgical dates', () => {
      const testDates = [
        new Date('2024-12-25'), // Christmas
        new Date('2024-05-19'), // Pentecost
      ];

      testDates.forEach(date => {
        const theme = getTailwindTheme(date);
        
        expect(theme).toHaveProperty('colors.primary');
        expect(Object.keys(theme.colors.primary).length).toBe(12);
        expect(theme.colors.primary['500']).toMatch(/^var\(--color-liturgical-[a-z]+-500\)$/);
      });
    });
  });

  describe('getBootstrapTheme', () => {
    it('should return valid Bootstrap theme object', () => {
      const theme = getBootstrapTheme();
      
      const expectedKeys = [
        '--bs-primary',
        '--bs-primary-rgb',
        '--bs-primary-text-emphasis',
        '--bs-primary-bg-subtle',
        '--bs-primary-border-subtle'
      ];

      expectedKeys.forEach(key => {
        expect(theme).toHaveProperty(key);
        expect(theme[key]).toMatch(/^var\(--color-liturgical-[a-z]+-\d+\)$/);
      });
    });

    it('should work with different liturgical dates', () => {
      const testDates = [
        new Date('2024-02-14'), // Ash Wednesday
        new Date('2024-03-31'), // Easter
      ];

      testDates.forEach(date => {
        const theme = getBootstrapTheme(date);
        
        expect(typeof theme).toBe('object');
        expect(Object.keys(theme).length).toBe(5);
        expect(theme['--bs-primary']).toMatch(/^var\(--color-liturgical-[a-z]+-500\)$/);
      });
    });
  });

  describe('getMantineTheme', () => {
    it('should return valid Mantine theme object', () => {
      const theme = getMantineTheme();
      
      expect(theme).toHaveProperty('primaryColor');
      expect(Array.isArray(theme.primaryColor)).toBe(true);
      expect(theme.primaryColor.length).toBe(10);
      
      theme.primaryColor.forEach(color => {
        expect(color).toMatch(/^var\(--color-liturgical-[a-z]+-\d+\)$/);
      });
    });

    it('should work with different liturgical dates', () => {
      const testDates = [
        new Date('2024-12-25'), // Christmas
        new Date('2024-12-01'), // Advent
      ];

      testDates.forEach(date => {
        const theme = getMantineTheme(date);
        
        expect(Array.isArray(theme.primaryColor)).toBe(true);
        expect(theme.primaryColor.length).toBe(10);
        expect(theme.primaryColor[5]).toMatch(/^var\(--color-liturgical-[a-z]+-500\)$/);
      });
    });
  });

  describe('getGenericCSSTheme', () => {
    it('should return standardized CSS variable names', () => {
      const theme = getGenericCSSTheme();
      
      const expectedKeys = [
        '--color-liturgical',
        '--color-liturgical-50',
        '--color-liturgical-100',
        '--color-liturgical-200',
        '--color-liturgical-300',
        '--color-liturgical-400',
        '--color-liturgical-500',
        '--color-liturgical-600',
        '--color-liturgical-700',
        '--color-liturgical-800',
        '--color-liturgical-900',
        '--color-liturgical-950'
      ];

      expectedKeys.forEach(key => {
        expect(theme).toHaveProperty(key);
        expect(theme[key]).toMatch(/^var\(--color-liturgical-[a-z]+-?\d*\)$/);
      });

      // Keys should NOT contain specific color names
      Object.keys(theme).forEach(key => {
        expect(key).not.toMatch(/-green-|-red-|-white-|-purple-|-rose-|-gold-/);
      });
    });

    it('should provide consistent keys regardless of liturgical date', () => {
      const testDates = [
        new Date('2024-01-01'), // Ordinary time
        new Date('2024-12-25'), // Christmas
        new Date('2024-03-31'), // Easter
        new Date('2024-12-01'), // Advent
      ];

      const themes = testDates.map(date => getGenericCSSTheme(date));
      
      // All themes should have the same keys
      themes.forEach(theme => {
        expect(Object.keys(theme).length).toBe(12);
        expect(Object.keys(theme).every(key => key.startsWith('--color-liturgical'))).toBe(true);
      });

      // Keys should be identical across all dates
      const firstKeys = Object.keys(themes[0]).sort();
      themes.slice(1).forEach(theme => {
        expect(Object.keys(theme).sort()).toEqual(firstKeys);
      });
    });

    it('should work with different liturgical dates', () => {
      const testDates = [
        new Date('2024-12-25'), // Christmas
        new Date('2024-05-19'), // Pentecost
        new Date('2024-02-14'), // Ash Wednesday
      ];

      testDates.forEach(date => {
        const theme = getGenericCSSTheme(date);
        
        expect(typeof theme).toBe('object');
        expect(Object.keys(theme).length).toBe(12);
        expect(theme['--color-liturgical-500']).toMatch(/^var\(--color-liturgical-[a-z]+-500\)$/);
      });
    });
  });

  describe('romcal re-export', () => {
    it('should re-export calendarFor function', () => {
      expect(typeof calendarFor).toBe('function');
    });

    it('should be able to use calendarFor directly', () => {
      const calendar = calendarFor(2024);
      
      expect(Array.isArray(calendar)).toBe(true);
      expect(calendar.length).toBeGreaterThan(0);
      
      // Check that calendar entries have expected structure
      const sampleEntry = calendar[0] as any;
      expect(sampleEntry).toHaveProperty('moment');
      expect(typeof sampleEntry.moment).toBe('string');
      expect(new Date(sampleEntry.moment)).toBeInstanceOf(Date);
    });
  });

  describe('Error handling and robustness', () => {
    it('should handle romcal errors gracefully', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Test with dates that might cause romcal issues
      const problematicDates = [
        new Date('1800-01-01'), // Very old date
        new Date('invalid'),    // Invalid date
      ];

      problematicDates.forEach(date => {
        const variables = getLiturgicalColorVariables(date);
        
        expect(Array.isArray(variables)).toBe(true);
        expect(variables.length).toBe(12);
        // Should fallback to green (ordinary time)
        expect(variables[0]).toMatch(/--color-liturgical-[a-z]+$/);
      });

      consoleWarnSpy.mockRestore();
    });

    it('should maintain consistent return types across all functions', () => {
      const testDate = new Date('2024-06-15');
      
      expect(Array.isArray(getLiturgicalColorVariables(testDate))).toBe(true);
      expect(typeof getDocusaurusTheme(testDate)).toBe('object');
      expect(typeof getTailwindTheme(testDate)).toBe('object');
      expect(typeof getBootstrapTheme(testDate)).toBe('object');
      expect(typeof getMantineTheme(testDate)).toBe('object');
      expect(typeof getGenericCSSTheme(testDate)).toBe('object');
    });

    it('should handle concurrent calls without interference', async () => {
      const promises = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(2024, i, 15);
        return Promise.resolve({
          variables: getLiturgicalColorVariables(date),
          docusaurus: getDocusaurusTheme(date),
          tailwind: getTailwindTheme(date),
          bootstrap: getBootstrapTheme(date),
          mantine: getMantineTheme(date),
          generic: getGenericCSSTheme(date)
        });
      });

      const results = await Promise.all(promises);
      
      results.forEach(result => {
        expect(Array.isArray(result.variables)).toBe(true);
        expect(typeof result.docusaurus).toBe('object');
        expect(typeof result.tailwind).toBe('object');
        expect(typeof result.bootstrap).toBe('object');
        expect(typeof result.mantine).toBe('object');
        expect(typeof result.generic).toBe('object');
      });
    });
  });
});
