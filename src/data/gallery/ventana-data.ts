import { GalleryItem } from "@/shared/types/gallery";
import img_nova_a2 from "@/assets/services/products/01.Ventanas/nova/a2.jpeg";
import img_nova_a3 from "@/assets/services/products/01.Ventanas/nova/a3.jpeg";
import img_nova_a4 from "@/assets/services/products/01.Ventanas/nova/a4.jpeg";
import img_nova_a5 from "@/assets/services/products/01.Ventanas/nova/a5.jpeg";
import img_nova_a6 from "@/assets/services/products/01.Ventanas/nova/a6.jpeg";
import img_nova_a7 from "@/assets/services/products/01.Ventanas/nova/a7.jpeg";
import img_nova_a8 from "@/assets/services/products/01.Ventanas/nova/a8.jpeg";
import img_nova_a9 from "@/assets/services/products/01.Ventanas/nova/a9.jpeg";
import img_nova_a10 from "@/assets/services/products/01.Ventanas/nova/a10.jpeg";
import img_nova_a11 from "@/assets/services/products/01.Ventanas/nova/a11.jpeg";
import img_nova_a12 from "@/assets/services/products/01.Ventanas/nova/a12.jpeg";
import img_nova_a13 from "@/assets/services/products/01.Ventanas/nova/a13.jpeg";
import img_nova_a16 from "@/assets/services/products/01.Ventanas/nova/a16.jpeg";
import img_serie_0294 from "@/assets/services/products/01.Ventanas/serie/IMG_0294.jpeg";
import img_serie_0292 from "@/assets/services/products/01.Ventanas/serie/IMG_0292.jpeg";
import img_serie_0799 from "@/assets/services/products/01.Ventanas/serie/IMG_0799.jpeg";
import img_serie_0300 from "@/assets/services/products/01.Ventanas/serie/IMG_0300.jpeg";
import img_serie_0304 from "@/assets/services/products/01.Ventanas/serie/IMG_0304.jpeg";
import img_serie_0303 from "@/assets/services/products/01.Ventanas/serie/IMG_0303.jpeg";
import img_serie_9209 from "@/assets/services/products/01.Ventanas/serie/IMG_9209.jpeg";
/* serie31 */
import img_serie_110742 from "@/assets/services/products/01.Ventanas/serie31/IMG_20211026_110742.jpeg";
import img_serie_110803 from "@/assets/services/products/01.Ventanas/serie31/IMG_20211026_110803.jpeg";
import img_serie_114159 from "@/assets/services/products/01.Ventanas/serie31/IMG_20211026_114159.jpeg";

interface VentanaData {
    nova: GalleryItem[];
    serie25: GalleryItem[];
    serie31: GalleryItem[];
}

const _rawListVentana: VentanaData = {
    nova: [
        { id: 10, src: img_nova_a10.src, title: "vn_10" },
        { id: 7, src: img_nova_a7.src, title: "vn_07" },
        { id: 1, src: img_nova_a13.src, title: "vn_13" },
        { id: 2, src: img_nova_a2.src, title: "vn_02" },
        { id: 3, src: img_nova_a3.src, title: "vn_03" },
        { id: 4, src: img_nova_a4.src, title: "vn_04" },
        { id: 5, src: img_nova_a5.src, title: "vn_05" },
        { id: 6, src: img_nova_a6.src, title: "vn_06" },

        { id: 8, src: img_nova_a8.src, title: "vn_08" },
        { id: 9, src: img_nova_a9.src, title: "vn_09" },

        { id: 11, src: img_nova_a11.src, title: "vn_11" },
        { id: 12, src: img_nova_a12.src, title: "vn_12" },
        { id: 13, src: img_nova_a16.src, title: "vn_16" },
    ],
    serie25: [
        { id: 1, src: img_serie_0294.src, title: "vs25_01" },
        { id: 2, src: img_serie_0292.src, title: "vs25_02" },
        { id: 3, src: img_serie_0799.src, title: "vs25_03" },
        { id: 4, src: img_serie_0294.src, title: "vs25_04" },
        { id: 5, src: img_serie_0300.src, title: "vs25_05" },
        { id: 6, src: img_serie_0304.src, title: "vs25_06" },
        { id: 7, src: img_serie_0303.src, title: "vs25_07" },
        { id: 8, src: img_serie_9209.src, title: "vs25_08" },
    ],
    serie31: [
        { id: 1, src: img_serie_110742.src, title: "vs31_01" },
        { id: 2, src: img_serie_110803.src, title: "vs31_02" },
        { id: 3, src: img_serie_114159.src, title: "vs31_03" },
    ],
};

export const listVentana = _rawListVentana;
