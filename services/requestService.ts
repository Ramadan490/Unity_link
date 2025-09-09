import { Request } from '../types';
import { apiFetch } from '../utils/api';

const mockRequests: Request[] = [
  { id: '1', message: 'Need community hall booking.', submittedBy: 'Alice', createdAt: new Date().toISOString() },
];

// GET requests
export async function getRequests(): Promise<Request[]> {
  try {
    return await apiFetch<Request[]>('/requests');
  } catch {
    return new Promise((resolve) => setTimeout(() => resolve(mockRequests), 500));
  }
}

// POST new request
export async function addRequest(message: string, submittedBy: string): Promise<Request> {
  const request: Omit<Request, 'id'> = { message, submittedBy, createdAt: new Date().toISOString() };

  try {
    return await apiFetch<Request>('/requests', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  } catch {
    const newRequest: Request = { ...request, id: String(mockRequests.length + 1) };
    mockRequests.push(newRequest);
    return new Promise((resolve) => setTimeout(() => resolve(newRequest), 300));
  }
}
