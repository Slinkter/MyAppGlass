import { GalleryItem } from "@/shared/types/gallery";
import d_01 from "@/assets/services/products/03.Ducha/ducha01.jpeg";
import d_02 from "@/assets/services/products/03.Ducha/ducha02.jpeg";
import d_03 from "@/assets/services/products/03.Ducha/ducha03.jpeg";

import d_04 from "@/assets/services/products/03.Ducha/ducha04.jpeg";
import d_05 from "@/assets/services/products/03.Ducha/ducha05.jpeg";
import d_06 from "@/assets/services/products/03.Ducha/ducha06.jpeg";

import d_07 from "@/assets/services/products/03.Ducha/ducha07.jpeg";
import d_08 from "@/assets/services/products/03.Ducha/ducha08.jpeg";
import d_09 from "@/assets/services/products/03.Ducha/ducha09.jpeg";

import d_10 from "@/assets/services/products/03.Ducha/ducha10.jpeg";
import d_11 from "@/assets/services/products/03.Ducha/ducha11.jpeg";
import d_12 from "@/assets/services/products/03.Ducha/ducha12.jpeg";

interface DuchaData {
  kit: GalleryItem[];
}

const listDucha: DuchaData = {
  kit: [
    {
      id: 1,
      src: d_01,
      title: "ducha",
    },
    {
      id: 2,
      src: d_02,
      title: "ducha",
    },
    {
      id: 3,
      src: d_03,
      title: "ducha",
    },
    {
      id: 4,
      src: d_04,
      title: "ducha",
    },
    {
      id: 5,
      src: d_05,
      title: "ducha",
    },
    {
      id: 6,
      src: d_06,
      title: "ducha",
    },
    {
      id: 7,
      src: d_07,
      title: "ducha",
    },
    {
      id: 8,
      src: d_08,
      title: "ducha",
    },
    {
      id: 9,
      src: d_09,
      title: "ducha",
    },
    {
      id: 10,
      src: d_10,
      title: "ducha",
    },
    {
      id: 11,
      src: d_11,
      title: "ducha",
    },
    {
      id: 12,
      src: d_12,
      title: "ducha",
    },
  ],
};

export { listDucha };
