import { render, screen, fireEvent } from '@testing-library/react';
import PopupMessage from '../../components/PopupMessage';
import { describe, it, expect, vi } from 'vitest';

// Mock ScratchCard
vi.mock('react-scratchcard-v2', () => ({
  default: ({ children }) => <div data-testid="scratch-card">{children}</div>,
}));

describe('PopupMessage Component', () => {
  it('renders nothing when not visible (but initial state is visible)', () => {
    // The component manages its own visibility state starting as true.
    // If we want to test "not visible", we have to trigger close or control it if props allowed (prop only for initial state? No, internal state).
    // Let's just test it renders first.
    render(<PopupMessage message="Test Message" onClose={vi.fn()} />);
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<PopupMessage message="Test Message" onClose={onCloseMock} />);
    
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('hides component when close button is clicked', () => {
    render(<PopupMessage message="Test Message" onClose={vi.fn()} />);
    
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);
    
    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });
});
