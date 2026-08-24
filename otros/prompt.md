Actúa como desarrollador 3D y crea un script en Python (generar_ventana.py) compatible con la API bpy de Blender headless.

Requisitos de la geometría:

1. Función principal: crear_ventana_corrediza(ancho_mm=1200, alto_mm=1000, sistema="SERIE_26", color="MATE")
2. Marco perimetral: Extruir 4 perfiles rectangulares (marco superior, inferior y 2 jambas laterales) basados en las medidas de Limatambo.
3. Dos hojas corredizas (SX: 1 fija, 1 corrediza):
    - Cada hoja ocupa (ancho_mm / 2 + 15mm de traslape).
    - Altura de hoja = alto_mm - 45mm (descuento estándar).
4. Materiales PBR:
    - Aluminio: Roughness 0.35, Metalness 0.85 (color según parámetro: Mate, Negro, Blanco).
    - Vidrio: Transmisión 0.95, Roughness 0.05, Alpha/IOR 1.52.
5. Exportar automáticamente la escena limpia en formato /public/models/ventana-serie-26.glb.

// lib/calculo-ventanas.ts

export interface DespieceVentana {
perfilesAluminio: { codigo: string; nombre: string; longitudMm: number; cantidad: number }[];
accesorios: { codigo: string; nombre: string; cantidad: number; unidad: string }[];
vidrio: { anchoMm: number; altoMm: number; areaM2: number; cantidad: number };
}

export function calcularSerie26(anchoVanoMm: number, altoVanoMm: number): DespieceVentana {
const anchoHoja = Math.round((anchoVanoMm + 30) / 2);
const altoHoja = altoVanoMm - 45;

const anchoVidrio = anchoHoja - 60;
const altoVidrio = altoHoja - 60;
const areaVidrio = Number(((anchoVidrio _ altoVidrio _ 2) / 1_000_000).toFixed(2));

return {
perfilesAluminio: [
{ codigo: '2601', nombre: 'Marco Superior Serie 26', longitudMm: anchoVanoMm, cantidad: 1 },
{ codigo: '2603', nombre: 'Marco Inferior Serie 26', longitudMm: anchoVanoMm, cantidad: 1 },
{ codigo: '2609', nombre: 'Jamba Lateral Serie 26', longitudMm: altoVanoMm, cantidad: 2 },
{ codigo: '2604', nombre: 'Zócalo Superior Hoja', longitudMm: anchoHoja, cantidad: 2 },
{ codigo: '2605', nombre: 'Zócalo Inferior Hoja', longitudMm: anchoHoja, cantidad: 2 },
{ codigo: '2610', nombre: 'Marco Lateral de Hoja', longitudMm: altoHoja, cantidad: 2 },
{ codigo: '2607', nombre: 'Traslape Serie 26', longitudMm: altoHoja, cantidad: 2 },
],
accesorios: [
{ codigo: '03G100322', nombre: 'Garrucha Serie 25/26 Rodattech', cantidad: 2, unidad: 'unidades' },
{ codigo: '03SG00261', nombre: 'Seguro Caracol Aluminio Corrales', cantidad: 1, unidad: 'unidades' },
{ codigo: '03CF000SN', nombre: 'Felpa Systral 5.5mm', cantidad: Math.round(((altoHoja * 4) + (anchoHoja * 4)) / 1000), unidad: 'metros' },
{ codigo: '03BU00008', nombre: 'Burlete EPDM p/vidrio 6mm', cantidad: Math.round(((anchoVidrio * 4) + (altoVidrio * 4)) / 1000), unidad: 'metros' }
],
vidrio: {
anchoMm: anchoVidrio,
altoMm: altoVidrio,
areaM2: areaVidrio,
cantidad: 2
}
};
}

=======================
Actúa como Ingeniero Especialista en Carpintería de Aluminio, Vidriería y Modelador 3D Paramétrico con Blender (bpy).

Tu objetivo es leer las especificaciones de perfilería de Corporación Limatambo y los accesorios de Corporación Corrales para ensamblar la geometría 3D de ventanas, mamparas y puertas de ducha a escala real (unidades en metros).

---

### 1. REGLAS DE ESTRUCTURA Y ENSAMBLAJE (TOPOLOGÍA)

Para armar una "Ventana Corrediza 2 Hojas (OX / Serie 26 o Serie 35)":

1. MARCO EXTERIOR PERIMETRAL (Fijo al vano):
    - Perfil Superior: Riel Superior (Limatambo Serie 26 cód: 2601 / Serie 35 cód: 3501) colocado horizontalmente en Y=Alto.
    - Perfil Inferior: Riel Inferior con pista de rodamiento (Serie 26 cód: 2603 / Serie 35 cód: 3503) colocado horizontalmente en Y=0.
    - Perfiles Laterales: 2 Jambas (Serie 26 cód: 2609 / Serie 35 cód: 3505) unidas a 90° o 45° a los rieles.
2. HOJAS MÓVILES / CORREDIZAS (2 hojas superpuestas):
    - Cada hoja se desplaza sobre su respectivo carril (offset en Z de ~25mm entre hoja interior y exterior).
    - Ancho de cada hoja: (Ancho_Vano + Traslape_30mm) / 2.
    - Alto de cada hoja: Alto_Vano - 45mm (descuento de rieles).
    - Perfilería de cada hoja:
        - Superior: Zócalo/Cabezal de hoja (cód: 2604 / 3507).
        - Inferior: Zócalo de hoja con alojamiento para garruchas (cód: 2605 / 3507).
        - Lateral exterior: Marco lateral de hoja (cód: 2610 / 3509).
        - Lateral interior (encuentro central): Perfil traslape (cód: 2607 / 3510).
3. PANELES DE CRISTAL:
    - Panel plano centrado dentro de cada hoja con descuento perimetral de 25mm respecto a la hoja.
    - Espesor: 6mm.

---

### 2. MATERIALES PBR REALISTAS

- Material Aluminio (según parámetro: Mate, Negro o Blanco):
    - Principled BSDF: Metallic = 0.85, Roughness = 0.35.
    - Color base: Mate (#C0C0C0), Negro (#1A1A1A), Blanco (#F0F0F0).
- Material Cristal / Vidrio Templado:
    - Principled BSDF: Transmission = 0.98, Roughness = 0.05, IOR = 1.52, Base Color = (#E8F4F8).

---

### 3. TAREA TÉCNICA A EJECUTAR

Escribe un script de Python `generar_sistemas_3d.py` para Blender (headless / `bpy`) que:

1. Contenga funciones paramétricas:
    - `build_sliding_window(width=1.2, height=1.0, system='SERIE_26', finish='MATE')`
    - `build_shower_door(width=1.5, height=1.8, finish='MATE')`
2. Genere cada pieza extruida con cotas exactas, aplique transforms (`bpy.ops.object.transform_apply()`) y asigne jerarquía de padres (Marco -> Hojas -> Vidrio).
3. Exporte los modelos optimizados listos para WebAR en: - `/public/models/serie-26.glb` - `/public/models/serie-35.glb` - `/public/models/puerta-ducha.glb`
   ========================
   descripcion
   Definir un archivo de configuración estructurado en **JSON** es la mejor estrategia técnica. Sirve como la "única fuente de verdad" (_single source of truth_) que conecta:

4. El cotizador dinámico (cálculo de precios).
5. Los filtros y selectores del catálogo web.
6. Las rutas de los modelos 3D (`.glb` y `.usdz`) para el visor Three.js y WebAR.

---

### 1. Estructura del Archivo `ventanas-catalogo.json`

Crea este archivo en `src/data/ventanas-catalogo.json`:

```json
{
    "categoria": "ventanas",
    "nombre": "Ventanas de Aluminio y Vidrio",
    "espesorVidrioFijoMm": 6,
    "acabadosAluminio": [
        { "id": "negro", "nombre": "Negro", "hex": "#1A1A1A" },
        {
            "id": "natural",
            "nombre": "Natural (Aluminio Mate)",
            "hex": "#C4C4C4"
        },
        { "id": "madera", "nombre": "Madera", "hex": "#8B4513" }
    ],
    "tiposVidrio": [
        { "id": "crudo", "nombre": "Vidrio Crudo 6mm", "factorPrecio": 1.0 },
        {
            "id": "templado",
            "nombre": "Vidrio Templado 6mm",
            "factorPrecio": 1.6
        },
        {
            "id": "laminado",
            "nombre": "Vidrio Laminado (3+3) 6mm",
            "factorPrecio": 1.9
        }
    ],
    "sistemas": [
        {
            "id": "sistema-nova",
            "nombre": "Sistema Nova",
            "descripcion": "Sistema clásico y versátil para ventanas y mamparas ligeras.",
            "tiposDisponibles": [
                {
                    "id": "corredizo",
                    "nombre": "Corrediza (2 Hojas OX)",
                    "modelo3d": {
                        "glb": "/models/ventanas/nova-corrediza.glb",
                        "usdz": "/models/ventanas/nova-corrediza.usdz",
                        "poster": "/posters/nova-corrediza.webp"
                    },
                    "reglasCorte": {
                        "descuentoAltoHojaMm": 35,
                        "traslapeAnchoMm": 30
                    }
                },
                {
                    "id": "fija",
                    "nombre": "Fija",
                    "modelo3d": {
                        "glb": "/models/ventanas/nova-fija.glb",
                        "usdz": "/models/ventanas/nova-fija.usdz",
                        "poster": "/posters/nova-fija.webp"
                    }
                }
            ]
        },
        {
            "id": "serie-20",
            "nombre": "Sistema Serie 20",
            "descripcion": "Línea residencial económica de alta rotación.",
            "tiposDisponibles": [
                {
                    "id": "corredizo",
                    "nombre": "Corrediza",
                    "modelo3d": {
                        "glb": "/models/ventanas/s20-corrediza.glb",
                        "usdz": "/models/ventanas/s20-corrediza.usdz",
                        "poster": "/posters/s20-corrediza.webp"
                    }
                },
                {
                    "id": "fija",
                    "nombre": "Fija",
                    "modelo3d": {
                        "glb": "/models/ventanas/s20-fija.glb",
                        "usdz": "/models/ventanas/s20-fija.usdz",
                        "poster": "/posters/s20-fija.webp"
                    }
                }
            ]
        },
        {
            "id": "serie-25",
            "nombre": "Sistema Serie 25",
            "descripcion": "Mayor hermeticidad con felpas de polipropileno y riel reforzado.",
            "tiposDisponibles": [
                {
                    "id": "corredizo",
                    "nombre": "Corrediza",
                    "modelo3d": {
                        "glb": "/models/ventanas/s25-corrediza.glb",
                        "usdz": "/models/ventanas/s25-corrediza.usdz",
                        "poster": "/posters/s25-corrediza.webp"
                    }
                },
                {
                    "id": "fija",
                    "nombre": "Fija",
                    "modelo3d": {
                        "glb": "/models/ventanas/s25-fija.glb",
                        "usdz": "/models/ventanas/s25-fija.usdz",
                        "poster": "/posters/s25-fija.webp"
                    }
                }
            ]
        },
        {
            "id": "serie-42",
            "nombre": "Sistema Serie VL42",
            "descripcion": "Línea pesada y hermética para vanos amplios o zonas de viento.",
            "tiposDisponibles": [
                {
                    "id": "corredizo",
                    "nombre": "Corrediza",
                    "modelo3d": {
                        "glb": "/models/ventanas/vl42-corrediza.glb",
                        "usdz": "/models/ventanas/vl42-corrediza.usdz",
                        "poster": "/posters/vl42-corrediza.webp"
                    }
                },
                {
                    "id": "proyectante",
                    "nombre": "Proyectante",
                    "modelo3d": {
                        "glb": "/models/ventanas/vl42-proyectante.glb",
                        "usdz": "/models/ventanas/vl42-proyectante.usdz",
                        "poster": "/posters/vl42-proyectante.webp"
                    }
                },
                {
                    "id": "batiente",
                    "nombre": "Batiente",
                    "modelo3d": {
                        "glb": "/models/ventanas/vl42-batiente.glb",
                        "usdz": "/models/ventanas/vl42-batiente.usdz",
                        "poster": "/posters/vl42-batiente.webp"
                    }
                },
                {
                    "id": "pivotante",
                    "nombre": "Pivotante",
                    "modelo3d": {
                        "glb": "/models/ventanas/vl42-pivotante.glb",
                        "usdz": "/models/ventanas/vl42-pivotante.usdz",
                        "poster": "/posters/vl42-pivotante.webp"
                    }
                }
            ]
        },
        {
            "id": "serie-37",
            "nombre": "Sistema Serie 37 / 38",
            "descripcion": "Especializada para ventanas proyectantes y batientes con brazos de extensión.",
            "tiposDisponibles": [
                {
                    "id": "proyectante",
                    "nombre": "Proyectante",
                    "modelo3d": {
                        "glb": "/models/ventanas/s37-proyectante.glb",
                        "usdz": "/models/ventanas/s37-proyectante.usdz",
                        "poster": "/posters/s37-proyectante.webp"
                    }
                },
                {
                    "id": "batiente",
                    "nombre": "Batiente",
                    "modelo3d": {
                        "glb": "/models/ventanas/s37-batiente.glb",
                        "usdz": "/models/ventanas/s37-batiente.usdz",
                        "poster": "/posters/s37-batiente.webp"
                    }
                }
            ]
        },
        {
            "id": "serie-62",
            "nombre": "Sistema Serie 62 / 80",
            "descripcion": "Línea europea de alta gama con cierres multipunto y máxima acústica.",
            "tiposDisponibles": [
                {
                    "id": "corredizo",
                    "nombre": "Corrediza",
                    "modelo3d": {
                        "glb": "/models/ventanas/s62-corrediza.glb",
                        "usdz": "/models/ventanas/s62-corrediza.usdz",
                        "poster": "/posters/s62-corrediza.webp"
                    }
                },
                {
                    "id": "batiente",
                    "nombre": "Batiente",
                    "modelo3d": {
                        "glb": "/models/ventanas/s62-batiente.glb",
                        "usdz": "/models/ventanas/s62-batiente.usdz",
                        "poster": "/posters/s62-batiente.webp"
                    }
                },
                {
                    "id": "oscilobatiente",
                    "nombre": "Oscilobatiente",
                    "modelo3d": {
                        "glb": "/models/ventanas/s62-oscilobatiente.glb",
                        "usdz": "/models/ventanas/s62-oscilobatiente.usdz",
                        "poster": "/posters/s62-oscilobatiente.webp"
                    }
                }
            ]
        }
    ]
}
```

---

### 2. Tipado TypeScript para tu Aplicación (`types/catalogo.ts`)

```typescript
export type AcabadoAluminioId = "negro" | "natural" | "madera";
export type TipoVidrioId = "crudo" | "templado" | "laminado";

export interface Modelo3DConfig {
    glb: string;
    usdz: string;
    poster: string;
}

export interface TipoVentanaConfig {
    id: string;
    nombre: string;
    modelo3d: Modelo3DConfig;
    reglasCorte?: {
        descuentoAltoHojaMm: number;
        traslapeAnchoMm: number;
    };
}

export interface SistemaVentanaConfig {
    id: string;
    nombre: string;
    descripcion: string;
    tiposDisponibles: TipoVentanaConfig[];
}

export interface ConfiguracionCotizacion {
    sistemaId: string;
    tipoId: string;
    acabadoAluminio: AcabadoAluminioId;
    tipoVidrio: TipoVidrioId;
    anchoMm: number;
    altoMm: number;
}
```

---

### 3. Siguiente Paso

Con este JSON ya listo, el flujo en la web queda totalmente modular: cuando el usuario selecciona **Sistema Nova** -> **Corredizo** -> **Color Negro** -> **Vidrio Templado (6mm)**, la interfaz:

1. Lee dinámicamente `/models/ventanas/nova-corrediza.glb`.
2. Aplica el tinte o textura negra al material del perfil en Three.js / WebAR.
3. Envía los datos exactos al módulo de cálculo para arrojar el presupuesto.

¿Quieres que armemos el componente interactivo de selección (Selector de Sistema, Tipo, Color y Medidas) conectado al visor 3D?
