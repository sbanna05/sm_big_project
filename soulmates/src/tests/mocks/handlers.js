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
  http.get('*/rest/v1/daily_moods', ({ request }) => {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get('user_id') || '';
    
    let type = 'Happy';
    if (userIdParam.includes('user-2')) type = 'Sad';
    
    return HttpResponse.json([
      { type, logged_at: '2023-01-01T10:00:00Z', user_id: 'test-user-id' }
    ]);
  }),

  // Mock fetch users (list or single)
  http.get('*/rest/v1/users', ({ request }) => {
    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    
    if (idParam) {
        // Single user fetch (e.g. Profile or getCurrentUser)
        return HttpResponse.json({
            id: 'test-user-id',
            name: 'Test User',
            starsign: 'Leo', 
            moonsign: 'Aries', 
            ascendent: 'Cancer',
            date_of_birth: '2000-01-01',
            birthplace: 'Budapest',
            time_of_birth: '12:00',
            pronouns: 'they'
        });
    }

    // List fetch (e.g. Friends)
    return HttpResponse.json([
        { id: 'user-1', name: 'Alice', starsign: 'Aries' },
        { id: 'user-2', name: 'Bob', starsign: 'Taurus' },
        { id: 'auth-user-id', name: 'Me', starsign: 'Leo' }
    ]);
  }),

  // Mock add friend
  http.post('*/rest/v1/friends', () => {
    return HttpResponse.json(null, { status: 201 });
  }),
];
