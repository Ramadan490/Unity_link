// constants/Roles.ts

// All role labels (with icons if you like)
export const ROLE_LABELS = {
  super_admin: "Super Admin 🔑",
  board_member: "Board Member 📝",
  community_member: "Community Member 👥",
} as const;

// Type-safe keys for roles
export type RoleKey = keyof typeof ROLE_LABELS;
