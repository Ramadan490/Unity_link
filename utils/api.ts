import { EXPO_PUBLIC_API_URL } from '@env';

/**
 * Generic API fetch wrapper
 * - Handles base URL from .env
 * - Adds JSON headers
 * - Throws clear errors with response text
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
  const url = `${baseUrl}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }

  return res.json();
}
