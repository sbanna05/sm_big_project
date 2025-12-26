import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserAuth } from '../../context/AuthContext';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  UserAuth: vi.fn(),
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

describe('Login Page', () => {
  const mockSignInUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    UserAuth.mockReturnValue({
      signInUser: mockSignInUser,
    });
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jelszó')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Bejelentkezés/i })).toBeInTheDocument();
  });

  it('navigates to home on successful login', async () => {
    mockSignInUser.mockResolvedValue({ success: true });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Bejelentkezés/i }));

    await waitFor(() => {
      expect(mockSignInUser).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('displays error on failed login', async () => {
    mockSignInUser.mockResolvedValue({ success: false, error: { message: 'Invalid credentials' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Bejelentkezés/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
