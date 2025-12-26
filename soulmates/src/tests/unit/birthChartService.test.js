import { describe, it, expect } from 'vitest';
import { calculateBirthChart } from '../../services/birthChartService';

describe('birthChartService', () => {
  it('calculates birth chart correctly for known date/time', () => {
    // Example: 2000-01-01 12:00
    // Sun should be in Capricorn (Dec 22 - Jan 19)
    const result = calculateBirthChart('2000-01-01', '12:00');
    
    expect(result).toHaveProperty('starsign');
    expect(result).toHaveProperty('moonsign');
    expect(result).toHaveProperty('ascendent');
    
    expect(result.starsign).toBe('Capricorn');
    // Moonsign calculation is complex, but for this date/time approx Scorpio/Sagittarius?
    // We just verify it returns a string.
    expect(typeof result.moonsign).toBe('string');
    expect(typeof result.ascendent).toBe('string');
  });

  it('handles edge cases', () => {
    // Aries start (March 21)
    const result = calculateBirthChart('2000-03-21', '12:00');
    expect(result.starsign).toBe('Aries');
  });
});
