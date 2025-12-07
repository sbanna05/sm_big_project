import { render, screen } from '@testing-library/react';
import MoodBoard from '../../pages/MoodBoard';
import { describe, it, expect, vi } from 'vitest';

// Mock LogMoods child component
vi.mock('../../components/LogMoods', () => ({
  default: () => <div data-testid="log-moods">LogMoods Component</div>,
}));

describe('MoodBoard Page', () => {
  it('renders title and LogMoods component', () => {
    render(<MoodBoard />);
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument();
    expect(screen.getByTestId('log-moods')).toBeInTheDocument();
  });
});
