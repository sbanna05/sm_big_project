import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../pages/Register';
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

describe('Register Page', () => {
  const mockSignUpNewUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    UserAuth.mockReturnValue({
      signUpNewUser: mockSignUpNewUser,
    });
  });

  it('renders registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Név')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jelszó')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Regisztráció/i })).toBeInTheDocument();
  });

  it('navigates to login on successful registration', async () => {
    mockSignUpNewUser.mockResolvedValue({ success: true });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Név'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Regisztráció/i }));

    await waitFor(() => {
      expect(mockSignUpNewUser).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('displays error on failed registration', async () => {
    mockSignUpNewUser.mockResolvedValue({ success: false, error: { message: 'Registration failed' } });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Név'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Regisztráció/i }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
