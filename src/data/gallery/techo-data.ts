import { GalleryItem } from "@/shared/types/gallery";
import t_01 from "@/assets/services/products/04.Techo/IMG_0032.jpeg";
import t_02 from "@/assets/services/products/04.Techo/IMG_0027.jpeg";
import t_03 from "@/assets/services/products/04.Techo/IMG_0029.jpeg";

import t_04 from "@/assets/services/products/04.Techo/techo312.jpeg";
import t_05 from "@/assets/services/products/04.Techo/techopoli01.jpeg";
import t_06 from "@/assets/services/products/04.Techo/techopoli05.jpeg";

interface TechoData {
  techo: GalleryItem[];
}

const listTecho: TechoData = {
  techo: [
    {
      id: 1,
      src: t_01,
      title: "techo",
    },
    {
      id: 2,
      src: t_02,
      title: "techo",
    },
    {
      id: 3,
      src: t_03,
      title: "techo",
    },
    {
      id: 4,
      src: t_04,
      title: "techo",
    },
    {
      id: 5,
      src: t_05,
      title: "techo",
    },
    {
      id: 6,
      src: t_06,
      title: "techo",
    },
  ],
};

export { listTecho };
