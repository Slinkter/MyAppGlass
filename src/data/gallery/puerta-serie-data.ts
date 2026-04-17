import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/12.PuertaS/IMG_9734.jpeg";
import image02 from "@/assets/services/products/12.PuertaS/IMG_9735.jpeg";
import image03 from "@/assets/services/products/12.PuertaS/IMG_9736.jpeg";

import image04 from "@/assets/services/products/12.PuertaS/IMG_9737.jpeg";
import image05 from "@/assets/services/products/12.PuertaS/IMG_9738.jpeg";
import image06 from "@/assets/services/products/12.PuertaS/IMG_9739.jpeg";

interface PuertaSerieData {
  puertas: GalleryItem[];
}

const listPuertas: PuertaSerieData = {
  puertas: [
    {
      id: 1,
      src: image01,
      title: "image01",
    },
    {
      id: 2,
      src: image02,
      title: "image02",
    },
    {
      id: 3,
      src: image03,
      title: "image03",
    },
    {
      id: 4,
      src: image04,
      title: "image04",
    },
    {
      id: 5,
      src: image05,
      title: "image05",
    },
    {
      id: 6,
      src: image06,
      title: "image06",
    },
  ],
};

export { listPuertas };
