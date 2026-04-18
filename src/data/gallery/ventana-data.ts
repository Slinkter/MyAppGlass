import { GalleryItem } from "@/shared/types/gallery";

/* serie31 */

interface VentanaData {
    nova: GalleryItem[];
    serie25: GalleryItem[];
    serie31: GalleryItem[];
}

const _rawListVentana: VentanaData = {
    nova: [
        { id: 10, src: '/images/services-products-01.Ventanas-nova-a10.webp', title: "vn_10" },
        { id: 7, src: '/images/services-products-01.Ventanas-nova-a7.webp', title: "vn_07" },
        { id: 1, src: '/images/services-products-01.Ventanas-nova-a13.webp', title: "vn_13" },
        { id: 2, src: '/images/services-products-01.Ventanas-nova-a2.webp', title: "vn_02" },
        { id: 3, src: '/images/services-products-01.Ventanas-nova-a3.webp', title: "vn_03" },
        { id: 4, src: '/images/services-products-01.Ventanas-nova-a4.webp', title: "vn_04" },
        { id: 5, src: '/images/services-products-01.Ventanas-nova-a5.webp', title: "vn_05" },
        { id: 6, src: '/images/services-products-01.Ventanas-nova-a6.webp', title: "vn_06" },

        { id: 8, src: '/images/services-products-01.Ventanas-nova-a8.webp', title: "vn_08" },
        { id: 9, src: '/images/services-products-01.Ventanas-nova-a9.webp', title: "vn_09" },

        { id: 11, src: '/images/services-products-01.Ventanas-nova-a11.webp', title: "vn_11" },
        { id: 12, src: '/images/services-products-01.Ventanas-nova-a12.webp', title: "vn_12" },
        { id: 13, src: '/images/services-products-01.Ventanas-nova-a16.webp', title: "vn_16" },
    ],
    serie25: [
        { id: 1, src: '/images/services-products-01.Ventanas-serie-IMG_0294.webp', title: "vs25_01" },
        { id: 2, src: '/images/services-products-01.Ventanas-serie-IMG_0292.webp', title: "vs25_02" },
        { id: 3, src: '/images/services-products-01.Ventanas-serie-IMG_0799.webp', title: "vs25_03" },
        { id: 4, src: '/images/services-products-01.Ventanas-serie-IMG_0294.webp', title: "vs25_04" },
        { id: 5, src: '/images/services-products-01.Ventanas-serie-IMG_0300.webp', title: "vs25_05" },
        { id: 6, src: '/images/services-products-01.Ventanas-serie-IMG_0304.webp', title: "vs25_06" },
        { id: 7, src: '/images/services-products-01.Ventanas-serie-IMG_0303.webp', title: "vs25_07" },
        { id: 8, src: '/images/services-products-01.Ventanas-serie-IMG_9209.webp', title: "vs25_08" },
    ],
    serie31: [
        { id: 1, src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_110742.webp', title: "vs31_01" },
        { id: 2, src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_110803.webp', title: "vs31_02" },
        { id: 3, src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_114159.webp', title: "vs31_03" },
    ],
};

export const listVentana = _rawListVentana;
