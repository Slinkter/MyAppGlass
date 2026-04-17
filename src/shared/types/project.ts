import { GalleryItem } from "./gallery";

export interface Project {
  id: string | number;
  residencial: string;
  name: string;
  address: string;
  year: string;
  lat: number;
  lng: number;
  photos: GalleryItem[] | string[];
  category?: string;
  thumbnail?: string;
  client?: string;
}
