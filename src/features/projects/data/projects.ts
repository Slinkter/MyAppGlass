import obra01 from "@/assets/projects/obra01.jpg";
import obra02 from "@/assets/projects/obra02.jpg";
import obra03 from "@/assets/projects/obra03.jpg";
import obra04 from "@/assets/projects/obra04.jpg";
import obra05 from "@/assets/projects/obra05.jpg";
import obra06 from "@/assets/projects/obra06.jpg";
import obra07 from "@/assets/projects/obra07.jpg";
import obra08 from "@/assets/projects/obra08.jpg";
import obra09 from "@/assets/projects/obra09.jpg";
import obra10 from "@/assets/projects/obra10.jpg";
import obra11 from "@/assets/projects/obra11.jpg";
import obra12 from "@/assets/projects/obra12.jpg";
import obra13 from "@/assets/projects/obra13.jpg";
import obra14 from "@/assets/projects/obra14.jpg";

import palmer from "@/data/proyectos/palmer";

export interface ProjectPhoto {
  id: number;
  image: string;
  name: string;
}

export interface Project {
  id: number;
  image: string;
  residencial: string;
  name: string;
  address: string;
  numdpto: string;
  year: string;
  g_maps: string;
  lat: number | null;
  lng: number | null;
  photosObra: ProjectPhoto[];
}

export const projects: Project[] = [
  {
    id: 1,
    image: obra01.src,
    residencial: "Edificio Torre Sipan",
    name: "Inversiones Beraca S.A.C.",
    address: "Miraflores",
    numdpto: "20",
    year: "Mayo 2012",
    g_maps: "C. Chiclayo 170",
    lat: -12.11471777212635, // Manually geocoded
    lng: -77.0305553432827, // Manually geocoded
    photosObra: [],
  },
  {
    id: 2,
    image: obra02.src,
    residencial: "Mirador de la Reserva",
    name: "Inmobiliaria Beraca & Bostad S.A.C.",
    address: "Lince",
    numdpto: "50",
    year: "Octubre 2015",
    g_maps: "Manuel Castañeda 237",
    lat: -12.078399185812227, // Requires manual geocoding
    lng: -77.03037530859106, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 3,
    image: obra03.src,
    residencial: " Bambamarca",
    name: "Personal Natural",
    address: "Cajamarca",
    numdpto: "21",
    year: "Enero 2018",
    g_maps: "Jr. Arequipa 253",
    lat: null, // Requires manual geocoding,
    lng: null, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 4,
    image: obra04.src,
    residencial: " Edificio Verástegui  ",
    name: "GHS CONSTRUCTORA S.A.C.",
    address: "San Juan de Miraflores",
    numdpto: "26",
    year: "Noviembre 2020",
    g_maps: "C. Ignacio Seminario 903",
    lat: -12.169055001965848,
    lng: -76.96787355273776,
    photosObra: [],
  },
  {
    id: 5,
    image: obra05.src,
    residencial: " Puente Verde",
    name: "Grupo DyM Constructora S.A.C.",
    address: "Ate",
    numdpto: "18",
    year: "Junio 2019",
    g_maps: "Av. el Banco N° 214",
    lat: -12.062174912994305, // Requires manual geocoding,
    lng: -76.93561104341636, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 6,
    image: obra06.src,
    residencial: " El Prado",
    name: "Grupo DyM Constructora S.A.C.",
    address: "Ate",
    numdpto: "24",
    year: "Febrero 2020",
    g_maps: "Av. Javier Prado Este 7845",
    lat: -12.052576408736284,
    lng: -76.93825020117286,
    photosObra: [],
  },
  {
    id: 7,
    image: obra07.src,
    residencial: "Monterrico Alto",
    name: "Grupo DyM Constructora S.A.C.",
    address: "Salamanca",
    numdpto: "24",
    year: "Junio 2021 ",
    g_maps: "Calle 3  de Monterrico",
    lat: -12.075676968719952,
    lng: -76.9781046082645,
    photosObra: [],
  },
  {
    id: 8,
    image: obra08.src,
    residencial: "Parque Prada",
    name: "GHS CONSTRUCTORA S.A.C.",
    address: "Magdalena",
    numdpto: "12",
    year: "Agosto de 2021",
    g_maps: "Av. Parque Gonzales Prada 667",
    lat: -12.090379403944693, // Requires manual geocoding  ,
    lng: -77.06352027607038, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 9,
    image: obra09.src,
    residencial: "Ventura",
    name: "Urbanica Proyectos Inmobiliarios S.A.C.",
    address: "San Miguel",
    numdpto: "14",
    year: "Febrero 2022",
    g_maps: "Calle Micaela Bastidas",
    lat: -12.079096840331879, // Requires manual geocoding ,
    lng: -77.1006818116659, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 10,
    image: obra10.src,
    residencial: "Maddy",
    name: "CONSTRUCTORA E INMOBILIARIA ICASA S.A.C",
    address: "Magdalena del mar",
    numdpto: "62",
    year: "Mayo 2022 ",
    g_maps: "Jr. Tacna 1056",
    lat: -12.088537804676479, // Requires manual geocoding , -77.07036389900647
    lng: -77.07036389900647, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 11,
    image: obra11.src,
    residencial: "Vidamor",
    name: "Grupo DyM Constructora S.A.C.",
    address: "ATE",
    numdpto: "60",
    year: "Diciembre 2022 ",
    g_maps: "Av. Javier Prado Este 8111",
    lat: -12.048744707034889, // Requires manual geocoding ,
    lng: -76.9373761882429, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 12,
    image: obra12.src,
    residencial: "Elenor",
    name: "P&D Holding Group S.A.C.",
    address: "Magdalena del mar",
    numdpto: "32",
    year: "Junio 2023 ",
    g_maps: "Jr. Arequipa 253",
    lat: -12.088370270820201, // Requires manual geocoding ,
    lng: -77.07116449920997, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 13,
    image: obra13.src,
    residencial: "Vittorie",
    name: "GRUPO DYM CONSTRUCTORA S.A.C.",
    address: "Surquillo",
    numdpto: "57",
    year: "Diciembre 2024 ",
    g_maps: "Av. Principal 915",
    lat: -12.119551579264126, // Requires manual geocoding ,
    lng: -77.00411297028387, // Requires manual geocoding
    photosObra: [],
  },
  {
    id: 14,
    image: obra14.src,
    residencial: "Palmer",
    name: "GRUPO DYM CONSTRUCTORA S.A.C.",
    address: "Breña",
    numdpto: "102",
    year: "Junio 2025 ",
    g_maps: "Jr. Jorge Chávez 1045",
    lat: -12.059726700425992, // Requires manual geocoding ,
    lng: -77.0480717850658, // Requires manual geocoding
    photosObra: palmer.map((img: string, index: number) => ({
      id: index,
      image: img,
      name: `Proyeto Palmer ${index + 1}`,
    })),
  },
];
