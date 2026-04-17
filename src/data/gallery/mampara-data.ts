import { GalleryItem } from "@/shared/types/gallery";
import mn_01 from "@/assets/services/products/02.Mampara/mampara79.jpeg";
import mn_02 from "@/assets/services/products/02.Mampara/mampara85.jpeg";
import mn_03 from "@/assets/services/products/02.Mampara/mampara53.jpeg";

import mn_04 from "@/assets/services/products/02.Mampara/mampara52.jpeg";
import mn_05 from "@/assets/services/products/02.Mampara/mampara22.jpeg";
import mn_06 from "@/assets/services/products/02.Mampara/mampara77.jpeg";

import mn_07 from "@/assets/services/products/02.Mampara/mampara76.jpeg";
import mn_08 from "@/assets/services/products/02.Mampara/mampara78.jpeg";
import mn_09 from "@/assets/services/products/02.Mampara/mampara12.jpeg";

import mn_10 from "@/assets/services/products/02.Mampara/mampara23.jpeg";
import mn_11 from "@/assets/services/products/02.Mampara/mampara18.jpeg";
import mn_12 from "@/assets/services/products/02.Mampara/mampara26.jpeg";
import mn_13 from "@/assets/services/products/02.Mampara/mampara15.jpeg";

import ms_01 from "@/assets/services/products/02.Mampara/m_serie01.jpeg";
import ms_02 from "@/assets/services/products/02.Mampara/m_serie02.jpeg";
import ms_03 from "@/assets/services/products/02.Mampara/m_serie03.jpeg";

interface MamparaData {
  nova: GalleryItem[];
  serie: GalleryItem[];
}

const listMampara: MamparaData = {
  nova: [
    { id: 1, src: mn_01, title: "mn_01" },
    { id: 2, src: mn_02, title: "mn_02" },
    { id: 3, src: mn_03, title: "mn_03" },
    { id: 4, src: mn_04, title: "mn_04" },
    { id: 5, src: mn_05, title: "mn_05" },
    { id: 6, src: mn_06, title: "mn_06" },
    { id: 7, src: mn_07, title: "mn_07" },
    { id: 8, src: mn_08, title: "mn_08" },
    { id: 9, src: mn_09, title: "mn_09" },
    { id: 10, src: mn_10, title: "mn_10" },
    { id: 11, src: mn_11, title: "mn_11" },
    { id: 12, src: mn_12, title: "mn_12" },
    { id: 13, src: mn_13, title: "mn_13" },
  ],
  serie: [
    { id: 1, src: ms_01, title: "ms_01" },
    { id: 2, src: ms_02, title: "ms_02" },
    { id: 3, src: ms_03, title: "ms_03" },
  ],
};

export { listMampara };
