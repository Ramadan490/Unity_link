// types/memorial.ts
export interface Memorial {
  id: string;
  name: string;
  message: string;
  image?: string; // optional (URL or local asset)
  createdAt: string;
}
