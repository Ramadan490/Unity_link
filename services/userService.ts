// services/userService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Role, User } from '../types';
import { apiFetch } from '../utils/api';

let mockUsers: User[] = [
  { id: '1', name: 'Alice', role: 'community_member' },
  { id: '2', name: 'Bob', role: 'board_member' },
  { id: '3', name: 'Charlie', role: 'super_admin' },
];

let currentUser: User | null = null;

const STORAGE_KEY = 'currentUser';

/**
 * Load user from AsyncStorage
 */
export async function loadUserFromStorage(): Promise<User | null> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  if (json) {
    currentUser = JSON.parse(json);
    return currentUser;
  }
  return null;
}

/**
 * Save user to AsyncStorage
 */
async function saveUserToStorage(user: User) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  currentUser = user;
}

/**
 * 🔑 Login
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const user = await apiFetch<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    await saveUserToStorage(user);
    return user;
  } catch {
    const user = mockUsers.find((u) => u.name.toLowerCase() === email.split('@')[0]);
    if (!user) throw new Error('Invalid credentials');
    await saveUserToStorage(user);
    return user;
  }
}

/**
 * 📝 Register
 */
export async function registerUser(name: string, email: string, password: string): Promise<User> {
  try {
    const user = await apiFetch<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    await saveUserToStorage(user);
    return user;
  } catch {
    const newUser: User = { id: String(mockUsers.length + 1), name, role: 'community_member' };
    mockUsers.push(newUser);
    await saveUserToStorage(newUser);
    return newUser;
  }
}

/**
 * 🚪 Logout
 */
export async function logoutUser(): Promise<void> {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
  currentUser = null;
  await AsyncStorage.removeItem(STORAGE_KEY);
}

/**
 * 👤 Get current logged-in user (from memory)
 */
export function getCurrentUser(): User | null {
  return currentUser;
}

/**
 * 👥 Get all users
 */
export async function getUsers(): Promise<User[]> {
  try {
    return await apiFetch<User[]>('/users');
  } catch {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 500));
  }
}

/**
 * ✏️ Update user role
 */
export async function updateUserRole(userId: string, role: Role): Promise<User> {
  try {
    return await apiFetch<User>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  } catch {
    mockUsers = mockUsers.map((u) => (u.id === userId ? { ...u, role } : u));
    const updatedUser = mockUsers.find((u) => u.id === userId)!;
    return new Promise((resolve) => setTimeout(() => resolve(updatedUser), 300));
  }
}
