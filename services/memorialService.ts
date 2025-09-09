import { Memorial } from '../types';
import { apiFetch } from '../utils/api';

const mockMemorials: Memorial[] = [
  { id: '1', name: 'John Doe', message: 'Forever in our hearts.', createdAt: new Date().toISOString() },
];

// GET memorials
export async function getMemorials(): Promise<Memorial[]> {
  try {
    return await apiFetch<Memorial[]>('/memorials');
  } catch {
    return new Promise((resolve) => setTimeout(() => resolve(mockMemorials), 500));
  }
}

// POST new memorial
export async function addMemorial(name: string, message: string): Promise<Memorial> {
  const memorial: Omit<Memorial, 'id'> = { name, message, createdAt: new Date().toISOString() };

  try {
    return await apiFetch<Memorial>('/memorials', {
      method: 'POST',
      body: JSON.stringify(memorial),
    });
  } catch {
    const newMemorial: Memorial = { ...memorial, id: String(mockMemorials.length + 1) };
    mockMemorials.push(newMemorial);
    return new Promise((resolve) => setTimeout(() => resolve(newMemorial), 300));
  }
}
