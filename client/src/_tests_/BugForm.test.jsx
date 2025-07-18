import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BugForm from '../components/BugForm';
import axios from 'axios';
import '@testing-library/jest-dom';
import { vi, test, expect } from 'vitest';

vi.mock('axios');

test('submits form and clears inputs', async () => {
  const mockBug = { _id: '1', title: 'Bug Test', description: 'desc' };
  const onBugCreated = vi.fn();
  axios.post.mockResolvedValue({ data: mockBug });

  render(<BugForm onBugCreated={onBugCreated} />);

  const titleInput = screen.getByPlaceholderText(/Bug Title/i);
  const descInput = screen.getByPlaceholderText(/Description/i);

  fireEvent.change(titleInput, { target: { value: 'Bug Test' } });
  fireEvent.change(descInput, { target: { value: 'desc' } });

  fireEvent.click(screen.getByText(/Submit/i));

  // ✅ Wait until inputs are cleared
  await waitFor(() => {
    expect(titleInput.value).toBe('');
    expect(descInput.value).toBe('');
  });

  // ✅ Callback triggered
  expect(onBugCreated).toHaveBeenCalledWith(mockBug);
});

test('shows loading message during submission', async () => {
  const mockBug = { _id: '2', title: 'Bug A', description: 'desc' };
  const onBugCreated = vi.fn();

  axios.post.mockImplementation(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ data: mockBug }), 100)
      )
  );

  render(<BugForm onBugCreated={onBugCreated} />);

  fireEvent.change(screen.getByPlaceholderText(/Bug Title/i), {
    target: { value: 'Bug A' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Description/i), {
    target: { value: 'desc' },
  });

  fireEvent.click(screen.getByText(/Submit/i));

  // ✅ Shows loading text
  expect(await screen.findByText(/Submitting bug/i)).toBeInTheDocument();

  // ✅ Wait for fields to clear
  await waitFor(() => {
    expect(screen.getByPlaceholderText(/Bug Title/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Description/i).value).toBe('');
  });

  expect(onBugCreated).toHaveBeenCalledWith(mockBug);
});

test('shows error if API fails', async () => {
  const onBugCreated = vi.fn();
  axios.post.mockRejectedValueOnce(new Error('API error'));

  render(<BugForm onBugCreated={onBugCreated} />);

  fireEvent.change(screen.getByPlaceholderText(/Bug Title/i), {
    target: { value: 'Bug A' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Description/i), {
    target: { value: 'desc' },
  });

  fireEvent.click(screen.getByText(/Submit/i));

  // ✅ Wait for error message
  expect(await screen.findByText(/Failed to submit bug/i)).toBeInTheDocument();

  // ✅ Ensure callback wasn't triggered
  expect(onBugCreated).not.toHaveBeenCalled();
});
