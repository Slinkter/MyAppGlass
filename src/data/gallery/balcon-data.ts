import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/07.Balcones/IMG_0753.jpeg";
import image02 from "@/assets/services/products/07.Balcones/IMG_0759.jpeg";
import image03 from "@/assets/services/products/07.Balcones/IMG_2094.jpeg";

import image04 from "@/assets/services/products/07.Balcones/IMG_0755.jpeg";
import image05 from "@/assets/services/products/07.Balcones/IMG_2091.jpeg";
import image06 from "@/assets/services/products/07.Balcones/IMG_2097.jpeg";

interface BalconData {
  items: GalleryItem[];
}

const listBalcon: BalconData = {
  items: [
    {
      id: 1,
      src: image01,
      title: "techo",
    },
    {
      id: 2,
      src: image02,
      title: "techo",
    },
    {
      id: 3,
      src: image03,
      title: "techo",
    },
    {
      id: 4,
      src: image04,
      title: "techo",
    },
    {
      id: 5,
      src: image05,
      title: "techo",
    },
    {
      id: 6,
      src: image06,
      title: "techo",
    },
  ],
};

export { listBalcon };
