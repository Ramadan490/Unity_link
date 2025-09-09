// types/user.ts
export type Role = 'super_admin' | 'board_member' | 'community_member';

export interface User {
  id: string;
  name: string;
  role: Role;
}
