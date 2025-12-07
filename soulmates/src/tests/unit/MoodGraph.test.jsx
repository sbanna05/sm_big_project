import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MoodGraph from '../../components/MoodGraph';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../../services/supabaseClient';

// Mock Supabase
vi.mock('../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(),
        })),
      })),
    })),
  },
}));

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
  });

  it('renders "no logged moods" message when no data', async () => {
     // Mock empty response
    const mockUser = { id: 'test-user-id' };
    supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    
    const mockSelect = vi.fn();
    const mockEq = vi.fn();
    const mockOrder = vi.fn().mockResolvedValue({ data: [] });

    supabase.from.mockReturnValue({
        select: mockSelect.mockReturnValue({
            eq: mockEq.mockReturnValue({
                order: mockOrder
            })
        })
    });


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
     // Mock data response
    const mockUser = { id: 'test-user-id' };
    supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    
    const mockMoods = [
        { type: "Happy", logged_at: "2023-01-01T10:00:00Z" },
        { type: "Sad", logged_at: "2023-01-02T10:00:00Z" }
    ];

    const mockSelect = vi.fn();
    const mockEq = vi.fn();
    const mockOrder = vi.fn().mockResolvedValue({ data: mockMoods });

    supabase.from.mockReturnValue({
        select: mockSelect.mockReturnValue({
            eq: mockEq.mockReturnValue({
                order: mockOrder
            })
        })
    });

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
