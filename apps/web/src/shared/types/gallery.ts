export interface GalleryItem3DConfig {
  numSashes?: 2 | 4;
  aluminumId?: "blanco" | "negro" | "natural" | "champagne";
  glassId?: "incoloro" | "bronce" | "gris" | "satinado";
  systemVariant?:
    | "corrediza"
    | "piso-techo-pivot"
    | "proyectante"
    | "pivotante"
    | "fija"
    | "celosias";
  titleSuffix?: string;
}

/**
 * @interface GalleryItem
 * @description Consistent structure for gallery items across the application.
 */
export interface GalleryItem {
  id: string | number;
  src: string;
  title: string;
  description?: string;
  category?: string;
  config3D?: GalleryItem3DConfig;
}

