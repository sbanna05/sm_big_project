import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogMoods from '../../components/LogMoods';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../../services/supabaseClient';

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
    // Mock getUser to return a user immediately
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
    });

    // Spy on from to verify it's called (MSW will handle the actual request)
    const fromSpy = vi.spyOn(supabase, 'from');
    
    render(
      <BrowserRouter>
        <LogMoods />
      </BrowserRouter>
    );

    const stars = document.getElementsByClassName('star');
    expect(stars.length).toBe(5);

    fireEvent.click(stars[3]); // Click "Happy"

    await waitFor(() => {
        expect(fromSpy).toHaveBeenCalledWith('daily_moods');
    });
  });
});
