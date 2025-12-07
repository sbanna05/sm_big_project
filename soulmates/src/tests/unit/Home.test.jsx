import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserAuth } from '../../context/AuthContext';
import * as api from '../../api/route';
import * as horoscopeService from '../../services/horoscopeService';
import { supabase } from '../../services/supabaseClient';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  UserAuth: vi.fn(),
}));

// Mock API
vi.mock('../../api/route', () => ({
  getCurrentUser: vi.fn(),
  getMoods: vi.fn(),
}));

// Mock HoroscopeService
vi.mock('../../services/horoscopeService', () => ({
  getOrCreateUserDailyHoroscope: vi.fn(),
}));

// Mock PopupMessage
vi.mock('../../components/PopupMessage', () => ({
  default: ({ message, onClose }) => (
    <div data-testid="popup-message">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  ),
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

describe('Home Page', () => {
  const mockUser = { id: 'test-user-id', name: 'Test User', starsign: 'Leo', moonsign: 'Aries', ascendent: 'Cancer' };
  const mockSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    UserAuth.mockReturnValue({
      user: { uid: 'auth-id' },
      loading: false,
      signOutUser: mockSignOut,
    });
    api.getCurrentUser.mockResolvedValue(mockUser);
    api.getMoods.mockResolvedValue({ type: 'Happy' });
    horoscopeService.getOrCreateUserDailyHoroscope.mockResolvedValue({
      horoscope_id: 'h1',
      description: 'Cosmic forecast',
      is_read: false
    });
  });

  it('renders home page with user data', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
        expect(screen.getByText('Leo')).toBeInTheDocument();
        expect(screen.getByText('Happy')).toBeInTheDocument();
    });

    // Check for "!" on button
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('opens popup and marks message as read', async () => {
    // Spy on supabase update
    const fromSpy = vi.spyOn(supabase, 'from');
    // We mock the update chain to avoid MSW setup for this specific call
    const mockUpdate = vi.fn();
    const mockEq = vi.fn();
    const mockSelect = vi.fn();
    const mockSingle = vi.fn().mockResolvedValue({ data: { is_read: true } });

    fromSpy.mockReturnValue({
        update: mockUpdate.mockReturnValue({
            eq: mockEq.mockReturnValue({
                select: mockSelect.mockReturnValue({
                    single: mockSingle
                })
            })
        })
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Wait for data to load (important! ensures dailyMessage is set)
    await waitFor(() => expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Daily Message'));

    expect(screen.getByTestId('popup-message')).toBeInTheDocument();
    expect(screen.getByText('Cosmic forecast')).toBeInTheDocument();

    // Check if update was called
    await waitFor(() => {
        expect(fromSpy).toHaveBeenCalledWith('daily_horoscope');
        expect(mockUpdate).toHaveBeenCalledWith({ is_read: true });
    });
  });

  it('handles logout', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
