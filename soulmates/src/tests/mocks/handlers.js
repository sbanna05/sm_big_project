import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock getUser
  http.get('*/auth/v1/user', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      email: 'test@example.com',
    });
  }),

  // Mock insert mood
  http.post('*/rest/v1/daily_moods', () => {
    return HttpResponse.json(null, { status: 201 });
  }),

  // Mock select moods
  http.get('*/rest/v1/daily_moods', () => {
    return HttpResponse.json([
      { type: 'Happy', logged_at: '2023-01-01T10:00:00Z', user_id: 'test-user-id' },
      { type: 'Sad', logged_at: '2023-01-02T10:00:00Z', user_id: 'test-user-id' }
    ]);
  }),
];
