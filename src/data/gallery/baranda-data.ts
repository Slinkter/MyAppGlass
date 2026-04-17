import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/06.Baranda/baranda1.jpg";
import image02 from "@/assets/services/products/06.Baranda/baranda4.jpg";
import image03 from "@/assets/services/products/06.Baranda/baranda01.jpeg";

import image04 from "@/assets/services/products/06.Baranda/IMG_2741.jpeg";
import image05 from "@/assets/services/products/06.Baranda/IMG_2321.jpeg";
import image06 from "@/assets/services/products/06.Baranda/IMG_20221222_204253.jpg";

interface BarandaData {
  baranda: GalleryItem[];
}

const listBaranda: BarandaData = {
  baranda: [
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

export { listBaranda };
