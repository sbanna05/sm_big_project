import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MoodGraph from '../../components/MoodGraph';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { supabase } from '../../services/supabaseClient';

// Mock Recharts
vi.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="xaxis" />,
  YAxis: () => <div data-testid="yaxis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
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

describe('MoodGraph Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure auth always returns a user
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
    });
  });

  it('renders "no logged moods" message when no data', async () => {
    // Override handler to return empty list
    server.use(
      http.get('*/rest/v1/daily_moods', () => {
        return HttpResponse.json([]);
      })
    );

    render(
      <BrowserRouter>
        <MoodGraph />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText("You have no logged moods yet.")).toBeInTheDocument();
    });
  });

  it('renders chart when data exists', async () => {
    // Default handler in handlers.js returns data (Happy, Sad)
    
    render(
      <BrowserRouter>
        <MoodGraph />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.queryByText("You have no logged moods yet.")).not.toBeInTheDocument();
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });
  });
});
