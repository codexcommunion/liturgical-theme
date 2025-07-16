declare module 'romcal' {
  export interface RomcalCelebration {
    date: Date;
    name: string;
    liturgicalColor?: {
      name: string;
    };
  }

  export function calendarFor(year: number, countryCode?: string): RomcalCelebration[];
}
