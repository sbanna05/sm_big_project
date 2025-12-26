import { describe, it, expect, vi } from 'vitest';
import { getDailyHoroscope } from '../../services/aiService';

const mocks = vi.hoisted(() => {
  const generateContent = vi.fn();
  
  // Create a mock class-like function
  const GoogleGenerativeAI = vi.fn();
  GoogleGenerativeAI.prototype.getGenerativeModel = vi.fn(() => ({
    generateContent
  }));
  
  return { GoogleGenerativeAI, generateContent };
});

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: mocks.GoogleGenerativeAI
  };
});

describe('aiService', () => {
  it('generates horoscope', async () => {
    // Setup return value
    mocks.generateContent.mockResolvedValue({
      response: { text: () => 'Your horoscope text.' }
    });

    const text = await getDailyHoroscope('Leo', 'Happy');
    
    expect(text).toBe('Your horoscope text.');
    expect(mocks.generateContent).toHaveBeenCalled();
  });
});
