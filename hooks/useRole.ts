// hooks/useRole.ts
import { useEffect, useState } from 'react';
import { ROLES } from '../constants/Roles';
import { getCurrentUser, getUsers, updateUserRole } from '../services/userService';
import { User } from '../types/user';

export function useRole() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load current user + all users
  useEffect(() => {
    (async () => {
      const current = await getCurrentUser();
      const allUsers = await getUsers();
      setUser(current);
      setUsers(allUsers);
    })();
  }, []);

  // Update role handler
  const handleUpdateRole = async (id: string, newRole: User['role']) => {
    const updated = await updateUserRole(id, newRole);
    if (updated) {
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    }
  };

  return {
    user,
    users,
    updateUserRole: handleUpdateRole,
    isSuperAdmin: user?.role === ROLES.SUPER_ADMIN,
    isBoardMember: user?.role === ROLES.BOARD_MEMBER,
    isCommunityMember: user?.role === ROLES.COMMUNITY_MEMBER,
  };
}
