import { render, screen, fireEvent } from '@testing-library/react';
import Reading from '../../pages/Reading';
import { describe, it, expect } from 'vitest';

describe('Reading Page', () => {
  it('renders title and initial reading', () => {
    render(<Reading />);
    expect(screen.getByText(/Cosmic Weather Update/i)).toBeInTheDocument();
    expect(screen.getByText(/ARIES/)).toBeInTheDocument();
  });

  it('navigates to next reading', () => {
    render(<Reading />);
    const nextButton = screen.getByText('Next ▶');
    
    // Initial is Aries
    expect(screen.getByText(/ARIES/)).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    
    // Next is Taurus
    expect(screen.getByText(/TAURUS/)).toBeInTheDocument();
  });

  it('navigates to previous reading', () => {
    render(<Reading />);
    const prevButton = screen.getByText('◀ Previous');
    
    // Initial is Aries, previous should be Pisces (loop)
    expect(screen.getByText(/ARIES/)).toBeInTheDocument();
    
    fireEvent.click(prevButton);
    
    expect(screen.getByText(/PISCES/)).toBeInTheDocument();
  });
});
