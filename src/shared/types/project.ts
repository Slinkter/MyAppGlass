import { GalleryItem } from "./gallery";

export interface ProjectPhoto {
  id: number;
  image: string;
  name?: string;
}

export interface Project {
  id: number | string;
  image: string;
  residencial: string;
  name: string;
  address: string;
  numdpto?: string;
  year: string;
  g_maps?: string;
  lat: number | null;
  lng: number | null;
  photosObra?: ProjectPhoto[];
  photos?: (GalleryItem | ProjectPhoto | string)[];
  category?: string;
  thumbnail?: string;
  client?: string;
}
