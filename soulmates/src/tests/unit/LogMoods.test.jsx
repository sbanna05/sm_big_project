import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogMoods from '../../components/LogMoods';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../../services/supabaseClient';

// Mock Supabase
vi.mock('../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn(),
    })),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LogMoods Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders mood stars and labels', () => {
    render(
      <BrowserRouter>
        <LogMoods />
      </BrowserRouter>
    );

    const moods = ["Angry", "Sad", "Bored", "Happy", "Excited"];
    moods.forEach(mood => {
      expect(screen.getByText(mood)).toBeInTheDocument();
    });
    
    // There should be 5 stars, but they are icons so we might search by class or other means.
    // However, the stars render, we can just check if container exists or check stars count if possible.
    // For simplicity, checking text is good start.
  });

  it('navigates to graph when button is clicked', () => {
    render(
      <BrowserRouter>
        <LogMoods />
      </BrowserRouter>
    );

    const button = screen.getByText('Mood Graph');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/graph');
  });

  it('logs mood when a star is clicked', async () => {
    // Mock user
    const mockUser = { id: 'test-user-id' };
    supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    const insertMock = vi.fn().mockResolvedValue({});
    supabase.from.mockReturnValue({ insert: insertMock });

    render(
      <BrowserRouter>
        <LogMoods />
      </BrowserRouter>
    );

    // Click the 4th star (Happy - index 3)
    // We need to find the stars. They are rendered as FaStar icons.
    // They don't have aria-labels by default in the component code I read.
    // I can try to find them by index in the container.
    // Since I can't easily select by aria-label (it's not there), I'll rely on the structure or just trust the click handler logic.
    // But to simulate click I need the element.
    // Let's assume the SVG is rendered.
    
    // Actually, `react-icons` usually renders an SVG.
    // We can query by generic selector or add a test-id if I could modify the file, but I should avoid modifying source if possible.
    // I will try to select by class 'star'.
    
    const stars = document.getElementsByClassName('star');
    expect(stars.length).toBe(5);

    fireEvent.click(stars[3]); // Click "Happy"

    await waitFor(() => {
        expect(supabase.auth.getUser).toHaveBeenCalled();
        expect(supabase.from).toHaveBeenCalledWith('daily_moods');
        expect(insertMock).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                user_id: 'test-user-id',
                type: 'Happy'
            })
        ]));
    });
  });
});
