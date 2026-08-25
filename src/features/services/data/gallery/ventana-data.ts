import { GalleryItem } from "@/shared/types/gallery";

interface VentanaData {
    nova: GalleryItem[];
    serie25: GalleryItem[];
    serie35: GalleryItem[];
    serie62: GalleryItem[];
}

const _rawListVentana: VentanaData = {
    nova: [
        { 
            id: 10, 
            src: '/images/services-products-01.Ventanas-nova-a10.webp', 
            title: "Ventana Piso a Techo: Fijo Inferior + Pivotante Superior",
            config3D: { 
                systemVariant: "piso-techo-pivot", 
                aluminumId: "blanco", 
                glassId: "incoloro", 
                titleSuffix: "Piso a Techo (Fijo Inferior + Pivotante Superior Blanco)" 
            }
        },
        { 
            id: 7, 
            src: '/images/services-products-01.Ventanas-nova-a7.webp', 
            title: "Ventanal Piso a Techo Doble: Fijos con Proyección Nova",
            config3D: { 
                systemVariant: "piso-techo-pivot", 
                aluminumId: "blanco", 
                glassId: "incoloro", 
                titleSuffix: "Piso a Techo Doble (Fijos + Pivotantes Blanco)" 
            }
        },
        { 
            id: 1, 
            src: '/images/services-products-01.Ventanas-nova-a13.webp', 
            title: "Ventana Panorámica Vertical con Hoja Batiente Superior",
            config3D: { 
                systemVariant: "piso-techo-pivot", 
                aluminumId: "blanco", 
                glassId: "incoloro", 
                titleSuffix: "Piso a Techo Panorámica (Fijo Inferior + Pivotante Blanco)" 
            }
        },
        { 
            id: 2, 
            src: '/images/services-products-01.Ventanas-nova-a2.webp', 
            title: "Ventana Corrediza 4 Hojas en Blanco Electropintado",
            config3D: { numSashes: 4, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "4 Hojas (Blanco Electropintado)" }
        },
        { 
            id: 3, 
            src: '/images/services-products-01.Ventanas-nova-a3.webp', 
            title: "Ventana Acústica 2 Hojas en Negro Mate con Cristal Gris",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "gris", titleSuffix: "2 Hojas (Negro / Cristal Humo)" }
        },
        { 
            id: 4, 
            src: '/images/services-products-01.Ventanas-nova-a4.webp', 
            title: "Ventana Corrediza 4 Hojas en Champagne Bronce",
            config3D: { numSashes: 4, aluminumId: "champagne", glassId: "bronce", titleSuffix: "4 Hojas (Champagne / Bronce)" }
        },
        { 
            id: 5, 
            src: '/images/services-products-01.Ventanas-nova-a5.webp', 
            title: "Ventana Hermética 2 Hojas en Blanco con Cristal Satinado",
            config3D: { numSashes: 2, aluminumId: "blanco", glassId: "satinado", titleSuffix: "2 Hojas (Blanco / Satinado)" }
        },
        { 
            id: 6, 
            src: '/images/services-products-01.Ventanas-nova-a6.webp', 
            title: "Ventana Corrediza 4 Hojas en Natural Anodizado",
            config3D: { numSashes: 4, aluminumId: "natural", glassId: "incoloro", titleSuffix: "4 Hojas (Natural Anodizado)" }
        },
        { 
            id: 8, 
            src: '/images/services-products-01.Ventanas-nova-a8.webp', 
            title: "Ventana Minimalista 2 Hojas en Negro Mate",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "incoloro", titleSuffix: "2 Hojas (Negro Mate)" }
        },
        { 
            id: 9, 
            src: '/images/services-products-01.Ventanas-nova-a9.webp', 
            title: "Ventanal Panorámico 4 Hojas en Negro Mate Residencial",
            config3D: { numSashes: 4, aluminumId: "negro", glassId: "incoloro", titleSuffix: "4 Hojas (Negro Mate / Panorámica)" }
        },
        { 
            id: 11, 
            src: '/images/services-products-01.Ventanas-nova-a11.webp', 
            title: "Ventana Residencial 2 Hojas en Blanco Minimalista",
            config3D: { numSashes: 2, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "2 Hojas (Blanco Minimalista)" }
        },
        { 
            id: 12, 
            src: '/images/services-products-01.Ventanas-nova-a12.webp', 
            title: "Ventana Gran Formato 4 Hojas en Blanco Electropintado",
            config3D: { numSashes: 4, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "4 Hojas (Blanco Gran Formato)" }
        },
        { 
            id: 13, 
            src: '/images/services-products-01.Ventanas-nova-a16.webp', 
            title: "Ventana Corrediza 2 Hojas en Champagne Bronce",
            config3D: { numSashes: 2, aluminumId: "champagne", glassId: "incoloro", titleSuffix: "2 Hojas (Champagne Bronce)" }
        },
    ],
    serie25: [
        { 
            id: 1, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0294.webp', 
            title: "Ventana Serie 25 Corrediza 2 Hojas Negro",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "incoloro", titleSuffix: "Serie 25 (2 Hojas Negro)" }
        },
        { 
            id: 2, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0292.webp', 
            title: "Ventanal Serie 25 Corredizo 4 Hojas Negro",
            config3D: { numSashes: 4, aluminumId: "negro", glassId: "incoloro", titleSuffix: "Serie 25 (4 Hojas Negro)" }
        },
        { 
            id: 3, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0799.webp', 
            title: "Ventana Serie 25 en Natural Anodizado",
            config3D: { numSashes: 2, aluminumId: "natural", glassId: "incoloro", titleSuffix: "Serie 25 (Natural)" }
        },
        { 
            id: 4, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0294.webp', 
            title: "Ventana Serie 25 en Blanco Electropintado",
            config3D: { numSashes: 2, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "Serie 25 (Blanco)" }
        },
        { 
            id: 5, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0300.webp', 
            title: "Ventanal Serie 25 4 Hojas Blanco Residencial",
            config3D: { numSashes: 4, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "Serie 25 (4 Hojas Blanco)" }
        },
        { 
            id: 6, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0304.webp', 
            title: "Ventana Serie 25 en Negro Mate con Cristal Gris",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "gris", titleSuffix: "Serie 25 (Negro / Cristal Gris)" }
        },
        { 
            id: 7, 
            src: '/images/services-products-01.Ventanas-serie-IMG_0303.webp', 
            title: "Ventana Serie 25 4 Hojas en Champagne Bronce",
            config3D: { numSashes: 4, aluminumId: "champagne", glassId: "bronce", titleSuffix: "Serie 25 (Champagne)" }
        },
        { 
            id: 8, 
            src: '/images/services-products-01.Ventanas-serie-IMG_9209.webp', 
            title: "Ventana Serie 25 2 Hojas en Blanco Residencial",
            config3D: { numSashes: 2, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "Serie 25 (Blanco Residencial)" }
        },
    ],
    serie35: [
        { 
            id: 1, 
            src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_110742.webp', 
            title: "Ventana Serie 35 Acústica Hermética 2 Hojas",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "incoloro", titleSuffix: "Serie 35 Acústica (2 Hojas)" }
        },
        { 
            id: 2, 
            src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_110803.webp', 
            title: "Ventana Serie 35 Acústica Hermética 4 Hojas",
            config3D: { numSashes: 4, aluminumId: "negro", glassId: "incoloro", titleSuffix: "Serie 35 Acústica (4 Hojas)" }
        },
        { 
            id: 3, 
            src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_114159.webp', 
            title: "Ventana Serie 35 Hermética Blanca Gran Formato",
            config3D: { numSashes: 4, aluminumId: "blanco", glassId: "incoloro", titleSuffix: "Serie 35 Hermética (Blanco)" }
        },
    ],
    serie62: [
        {
            id: 1,
            src: '/images/services-products-01.Ventanas-serie31-IMG_20211026_110742.webp',
            title: "Ventana Europea Serie 62 / 80 Termoacústica Hermética",
            config3D: { numSashes: 2, aluminumId: "negro", glassId: "incoloro", titleSuffix: "Serie 62 Europea" }
        }
    ],
};

export const listVentana = _rawListVentana;
