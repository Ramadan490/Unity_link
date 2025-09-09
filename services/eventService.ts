import { Event } from '../types';
import { apiFetch } from '../utils/api';

const mockEvents: Event[] = [
  { id: '1', title: 'Community Meeting', date: '2025-09-12T10:00:00Z', location: 'Hall A' },
  { id: '2', title: 'Fundraiser', date: '2025-09-15T18:00:00Z', location: 'Garden' },
];

// GET events
export async function getEvents(): Promise<Event[]> {
  try {
    return await apiFetch<Event[]>('/events');
  } catch {
    return new Promise((resolve) => setTimeout(() => resolve(mockEvents), 500));
  }
}

// POST new event
export async function addEvent(event: Event): Promise<Event> {
  try {
    return await apiFetch<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  } catch {
    const newEvent = { ...event, id: String(mockEvents.length + 1) };
    mockEvents.push(newEvent);
    return new Promise((resolve) => setTimeout(() => resolve(newEvent), 300));
  }
}
