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
      src: image01.src,
      title: "image01.src",
    },
    {
      id: 2,
      src: image02.src,
      title: "image02.src",
    },
    {
      id: 3,
      src: image03.src,
      title: "image03.src",
    },
    {
      id: 4,
      src: image04.src,
      title: "image04.src",
    },
    {
      id: 5,
      src: image05.src,
      title: "image05.src",
    },
    {
      id: 6,
      src: image06.src,
      title: "image06.src",
    },
  ],
};

export { listPuertas };
