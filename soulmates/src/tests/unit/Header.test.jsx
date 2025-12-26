import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
  it('renders the logo text', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/✨ StarMates ✨/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Daily Mood')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Friends')).toBeInTheDocument();
  });

  it('has correct links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home');
    expect(screen.getByText('Reading').closest('a')).toHaveAttribute('href', '/reading');
    expect(screen.getByText('Daily Mood').closest('a')).toHaveAttribute('href', '/moodboard');
    expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile');
    expect(screen.getByText('Friends').closest('a')).toHaveAttribute('href', '/friends');
  });
});
