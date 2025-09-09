import { Announcement } from '../types';
import { apiFetch } from '../utils/api';

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Holiday Notice', body: 'Office closed on 15th Sep.', authorRole: 'board_member', createdAt: new Date().toISOString() },
  { id: '2', title: 'Meeting', body: 'Board meeting at 10 AM tomorrow.', authorRole: 'super_admin', createdAt: new Date().toISOString() },
];

// GET announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    return await apiFetch<Announcement[]>('/announcements');
  } catch {
    return new Promise((resolve) => setTimeout(() => resolve(mockAnnouncements), 500));
  }
}

// POST new announcement
export async function addAnnouncement(announcement: Announcement): Promise<Announcement> {
  try {
    return await apiFetch<Announcement>('/announcements', {
      method: 'POST',
      body: JSON.stringify(announcement),
    });
  } catch {
    const newAnnouncement = { ...announcement, id: String(mockAnnouncements.length + 1), createdAt: new Date().toISOString() };
    mockAnnouncements.push(newAnnouncement);
    return new Promise((resolve) => setTimeout(() => resolve(newAnnouncement), 300));
  }
}
