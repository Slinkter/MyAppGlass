export type AcabadoAluminioId = "negro" | "gris-claro" | "madera-claro" | "blanco" | "natural" | "madera";
export type TipoVidrioId = "crudo" | "templado" | "laminado" | "pavonado";
export type ColorVidrioId = "incoloro" | "bronce" | "gris";

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
    colorVidrio?: ColorVidrioId;
    anchoMm: number;
    altoMm: number;
}
