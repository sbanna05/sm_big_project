import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOrCreateUserDailyHoroscope } from '../../services/horoscopeService';
import { getDailyHoroscope } from '../../services/aiService';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// Mock aiService
vi.mock('../../services/aiService', () => ({
  getDailyHoroscope: vi.fn(),
}));

describe('horoscopeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches existing horoscope if present', async () => {
    // Override handler to return existing
    server.use(
      http.get('*/rest/v1/daily_horoscope', () => {
        return HttpResponse.json([{
            horoscope_id: 'existing-id',
            description: 'Existing Horoscope',
            is_read: true
        }]);
      })
    );

    const result = await getOrCreateUserDailyHoroscope('user-id', 'Leo', 'Happy');
    
    expect(result.description).toBe('Existing Horoscope');
    expect(getDailyHoroscope).not.toHaveBeenCalled();
  });

  it('generates new horoscope if missing', async () => {
    // Handler returns empty array (default)
    
    // Mock AI response
    getDailyHoroscope.mockResolvedValue('Generated Horoscope');

    const result = await getOrCreateUserDailyHoroscope('user-id', 'Leo', 'Happy');
    
    expect(result.description).toBe('Generated Horoscope');
    expect(getDailyHoroscope).toHaveBeenCalledWith('Leo', 'Happy');
  });
});
