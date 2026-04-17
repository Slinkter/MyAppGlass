import { GalleryItem } from "@/shared/types/gallery";
import image01 from "@/assets/services/products/05.Parapeto/IMG_2724.jpeg";
import image02 from "@/assets/services/products/05.Parapeto/IMG_2728.jpeg";
import image03 from "@/assets/services/products/05.Parapeto/IMG_2742.jpeg";

import image04 from "@/assets/services/products/05.Parapeto/IMG_2744.jpeg";
import image05 from "@/assets/services/products/05.Parapeto/parapeto03.jpg";
import image06 from "@/assets/services/products/05.Parapeto/parapeto04.png";

interface ParapetoData {
  parapeto: GalleryItem[];
}

const listParapeto: ParapetoData = {
  parapeto: [
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
  ],
};

export { listParapeto };
