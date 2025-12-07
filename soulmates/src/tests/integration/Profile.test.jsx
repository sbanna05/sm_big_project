import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Profile from '../../pages/Profile';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserAuth } from '../../context/AuthContext';
import * as api from '../../api/route';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  UserAuth: vi.fn(),
}));

// Mock API
vi.mock('../../api/route', () => ({
  updateUserProfile: vi.fn(),
}));

describe('Profile Page', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    vi.clearAllMocks();
    UserAuth.mockReturnValue({
      user: mockUser,
    });
  });

  it('renders profile form and loads data', async () => {
    // MSW loads data
    render(<Profile />);

    // Wait for data to load (Name field populated)
    await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Budapest')).toBeInTheDocument();
    });
  });

  it('updates profile on submit', async () => {
    api.updateUserProfile.mockResolvedValue({
        starsign: 'Leo',
        moonsign: 'Aries',
        ascendent: 'Cancer'
    });
    
    // Mock alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Profile />);

    await waitFor(() => expect(screen.getByDisplayValue('Test User')).toBeInTheDocument());

    // Change name
    fireEvent.change(screen.getByPlaceholderText('username'), { target: { name: 'name', value: 'New Name' } });
    
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
        expect(api.updateUserProfile).toHaveBeenCalledWith('test-user-id', expect.objectContaining({
            name: 'New Name'
        }));
        expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Profile saved!'));
    });
  });
});
