import { GalleryItem } from "./gallery";

export interface Project {
  id: string | number;
  residencial: string;
  name: string;
  address: string;
  year: string;
  lat: number | null;
  lng: number | null;
  photos: GalleryItem[] | string[];
  category?: string;
  thumbnail?: string;
  client?: string;
}
