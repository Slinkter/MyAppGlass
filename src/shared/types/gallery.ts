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
}
