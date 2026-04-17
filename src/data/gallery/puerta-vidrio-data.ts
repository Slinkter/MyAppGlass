import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/11.PuertaV/IMG_1992.jpeg";
import image02 from "@/assets/services/products/11.PuertaV/IMG_1999.jpeg";
import image03 from "@/assets/services/products/11.PuertaV/IMG_2008.jpeg";

import image04 from "@/assets/services/products/11.PuertaV/IMG_4534.jpeg";
import image05 from "@/assets/services/products/11.PuertaV/init11.jpg";
import image06 from "@/assets/services/products/11.PuertaV/IMG_20220212_104555.jpeg";

interface PuertaVidrioData {
  puertav: GalleryItem[];
}

const listPuertav: PuertaVidrioData = {
  puertav: [
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

export { listPuertav };
