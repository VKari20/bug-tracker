import { render, screen } from '@testing-library/react';
import axios from 'axios';
import BugList from '../components/BugList';
import '@testing-library/jest-dom';
import { vi, test, expect } from 'vitest';

vi.mock('axios');

test('renders bugs from API', async () => {
  const mockBugs = [
    { _id: '1', title: 'Bug A', status: 'open' },
    { _id: '2', title: 'Bug B', status: 'resolved' },
  ];

  axios.get.mockResolvedValueOnce({ data: mockBugs });

  render(<BugList />);

  expect(await screen.findByText(/Bug A/i)).toBeInTheDocument();
  expect(await screen.findByText(/Bug B/i)).toBeInTheDocument();
});
