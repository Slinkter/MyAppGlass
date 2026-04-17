import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/13.Celosias/IMG_0755.jpeg";
import image02 from "@/assets/services/products/13.Celosias/IMG_0761.jpeg";
import image03 from "@/assets/services/products/13.Celosias/IMG_0754.jpeg";

import image04 from "@/assets/services/products/13.Celosias/IMG_2043.jpeg";
import image05 from "@/assets/services/products/13.Celosias/IMG_2077.jpeg";
import image06 from "@/assets/services/products/13.Celosias/IMG_2145.jpeg";

import image07 from "@/assets/services/products/13.Celosias/IMG_20201003_092422.jpeg";
import image08 from "@/assets/services/products/13.Celosias/IMG_20201022_134255.jpeg";
import image09 from "@/assets/services/products/13.Celosias/IMG_20210824_144928.jpeg";

interface CelosiasData {
  celocias: GalleryItem[];
}

const listCelosias: CelosiasData = {
  celocias: [
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
    {
      id: 7,
      src: image07,
      title: "techo",
    },
    {
      id: 8,
      src: image08,
      title: "techo",
    },
    {
      id: 9,
      src: image09,
      title: "techo",
    },
  ],
};

export { listCelosias };
