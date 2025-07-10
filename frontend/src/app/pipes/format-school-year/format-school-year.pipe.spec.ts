import { FormatSchoolYearPipe } from './format-school-year.pipe';

describe('FormatSchoolYearPipe', () => {
  let pipe: FormatSchoolYearPipe;

  beforeEach(() => {
    pipe = new FormatSchoolYearPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "2425" to "2024/25"', () => {
    expect(pipe.transform('2425')).toBe('2024/25');
  });

  it('should transform "2526" to "2025/26"', () => {
    expect(pipe.transform('2526')).toBe('2025/26');
  });

  it('should return empty string for falsy values', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should return original value for non-numeric input', () => {
    expect(pipe.transform('abcd')).toBe('abcd');
  });

  it('should return original value for input with incorrect length', () => {
    expect(pipe.transform('123')).toBe('123');
    expect(pipe.transform('12345')).toBe('12345');
  });
});
