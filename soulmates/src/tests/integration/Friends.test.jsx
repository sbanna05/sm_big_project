import { render, screen } from '@testing-library/react';
import Friends from '../../pages/Friends';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserAuth } from '../../context/AuthContext';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  UserAuth: vi.fn(),
}));

// Mock API explicitly with factory to ensure no network calls
vi.mock('../../api/route', () => ({
  getUsers: vi.fn().mockResolvedValue([]),
  getMoods: vi.fn().mockResolvedValue(null),
  addFriend: vi.fn(),
}));

// Mock Images
vi.mock('../../public/photos/proff1.png', () => ({ default: 'img1.png' }));
vi.mock('../../public/photos/219964.png', () => ({ default: 'img2.png' }));
vi.mock('../../public/photos/219969.png', () => ({ default: 'img3.png' }));
vi.mock('../../public/photos/219986.png', () => ({ default: 'img4.png' }));
vi.mock('../../public/photos/219987.png', () => ({ default: 'img5.png' }));
vi.mock('../../public/photos/6997662.png', () => ({ default: 'img6.png' }));

describe('Friends Page', () => {
  const mockUser = { id: 'auth-user-id' };

  beforeEach(() => {
    vi.clearAllMocks();
    UserAuth.mockReturnValue({
      user: mockUser,
    });
  });

  it('renders title and filters', () => {
    render(<Friends />);
    expect(screen.getByText(/Cosmic Friend Finder/i)).toBeInTheDocument();
    expect(screen.getByText('Mood')).toBeInTheDocument();
    expect(screen.getByText('Zodiac')).toBeInTheDocument();
  });
});
