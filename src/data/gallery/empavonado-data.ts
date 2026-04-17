import { GalleryItem } from "@/shared/types/gallery";
import image01 from "./e10.jpeg";
import image02 from "./e22.jpeg";
import image03 from "./e39.jpeg";

import image04 from "./e17.jpeg";
import image05 from "./e6.jpeg";
import image06 from "./e24.jpeg";

interface EmpavonadoData {
  empavonado: GalleryItem[];
}

const listEmpavonado: EmpavonadoData = {
  empavonado: [
    {
      id: 1,
      src: image01.src,
      title: "techo",
    },
    {
      id: 2,
      src: image02.src,
      title: "techo",
    },
    {
      id: 3,
      src: image03.src,
      title: "techo",
    },
    {
      id: 4,
      src: image04.src,
      title: "techo",
    },
    {
      id: 5,
      src: image05.src,
      title: "techo",
    },
    {
      id: 6,
      src: image06.src,
      title: "techo",
    },
    {
      id: 7,
      src: image04.src,
      title: "techo",
    },
    {
      id: 8,
      src: image05.src,
      title: "techo",
    },
    {
      id: 9,
      src: image06.src,
      title: "techo",
    },
  ],
};

export { listEmpavonado };
