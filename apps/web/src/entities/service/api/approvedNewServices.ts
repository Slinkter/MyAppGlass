import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import type { CreateServiceInput } from "@/shared/api/firebase/types";

export interface ApprovedNewServiceDefinition extends CreateServiceInput {
  id: string;
}

export const APPROVED_NEW_SERVICES: readonly ApprovedNewServiceDefinition[] = [
  {
    id: "espejos",
    slug: "espejos",
    title: "Espejo",
    category: "Vidrio procesado",
    shortDescription:
      "Espejo de vidrio flotado con recubrimiento de plata a medida en 3, 4 y 6 mm en montaje flotante o con marco de aluminio.",
    fullDescription:
      "Espejo a medida de vidrio flotado con recubrimiento de plata en espesores de 2, 3 y 4 mm (6 mm recomendado en paños mayores a 2.00 m), en montaje flotante directo o con marco de aluminio.\n\nIncluye corte exacto, cinta doble contacto de espuma acrílica de celda cerrada, silicona neutra antimancha, perfiles de marco opcionales e instalación en La Molina, Surco, San Borja, San Isidro y Miraflores. No incluye obra eléctrica ni nivelación de muro húmedo.",
    specs: [
      { grupo: "Material", label: "Sustrato", value: "Vidrio flotado con recubrimiento reflectante de plata" },
      { grupo: "Dimensiones", label: "Espesores", value: "2, 3 y 4 mm estándar; 6 mm comercial para paños > 2.00 m" },
      {
        grupo: "Accesorios",
        label: "Fijación incluida",
        value: "Cinta doble contacto de espuma acrílica de celda cerrada + silicona neutra; marco de aluminio opcional",
      },
      {
        grupo: "Acabado",
        label: "Biselado y LED",
        value: "Biselado, canto pulido o LED: Precio a definir según disponibilidad",
      },
      { grupo: "Comercial", label: "Unidad de cotización", value: "Por m² o unidad instalada (Precio a definir)" },
    ],
    features: [
      "Corte a la medida exacta del muro o mobiliario.",
      "Fijación con cinta acrílica y silicona neutra (no oxida la plata).",
      "Opción flotante sin borde o con marco perimetral de aluminio.",
      "Selección de espesor según tamaño para evitar distorsiones.",
    ],
    systems: ["Espejo biselado", "Marco de aluminio", "Retroiluminado LED", "Flotante pegado"],
    benefits: [
      "Amplía luz y profundidad en baños, vestidores y salas.",
      "Protege los cantos frente a humedad cuando usa marco o sellado neutro.",
      "Instalación limpia sobre porcelanato, mayólica, drywall o muro.",
    ],
    systemSheets: [
      {
        nombre: "Espejo Flotante a Medida",
        resumen: "Espejo adherido directamente al muro o bastidor nivelado sin marco visible.",
        specs: [
          { label: "Espesores de trabajo", value: "3 mm, 4 mm y 6 mm según formato" },
          { label: "Superficies aptas", value: "Porcelanato, mayólica, drywall o muro plano firme" },
          {
            label: "Accesorios incluidos",
            value: "Cinta doble contacto de espuma acrílica de celda cerrada + silicona neutra compatible con plata",
          },
        ],
        usos: [
          "Baños principales y de visita",
          "Vestidores y clósets",
          "Salas, comedores y gimnasios",
        ],
      },
    ],
    coverImage: "/images/services/espejos-placeholder.webp",
    gallery: [],
    faqs: [
      {
        question: "¿Qué espesor de espejo conviene según el tamaño?",
        answer:
          "En formatos pequeños o medianos funcionan bien 3 mm y 4 mm. Sobre los 2.00 m de largo conviene 6 mm para mantener la planitud sin deformar el reflejo.",
      },
      {
        question: "¿Cómo se evitan manchas en los bordes en baños?",
        answer:
          "Usando silicona neutra compatible con plata en el montaje y limpiando el cristal con paño suave sin rociar líquido directo sobre los cantos.",
      },
    ],
    order: 11,
    published: true,
  },
  {
    id: "frenos-hidraulicos",
    slug: "frenos-hidraulicos",
    title: "Freno Hidráulico",
    category: "Herrajes y calibración",
    shortDescription:
      "Freno hidráulico de piso y bisagra aérea para puertas de vidrio templado: suministro, montaje, accesorios de sujeción y calibración.",
    fullDescription:
      "Suministro, instalación y calibración de frenos hidráulicos de piso (con cierre en dos velocidades y retención a 90°) y bisagras aéreas hidráulicas (hasta 65 kg) para puertas de vidrio templado en edificios, oficinas y locales.\n\nIncluye caja hidráulica, pin, tapa, perno y herrajes superior e inferior según modelo, adecuación de alojamiento, nivelación de hoja y regulación de válvulas en La Molina, Surco, San Borja, San Isidro y Miraflores. No incluye reposición de vidrios rotos ni picado mayor de mármol.",
    specs: [
      {
        grupo: "Freno de piso",
        label: "Control y retención",
        value: "Doble velocidad regulable (barrido y golpe final) con retención fija a 90°",
      },
      { grupo: "Freno de piso", label: "Variantes disponibles", value: "Estándar y reforzado con pin, tapa y perno" },
      {
        grupo: "Accesorios",
        label: "Sujeción inferior y superior",
        value: "Herrajes superior e inferior en acabado mate (estándar o reforzado)",
      },
      {
        grupo: "Cierrapuertas aéreo",
        label: "Capacidad y acabados",
        value: "Hasta 65 kg de peso de hoja; acabados mate, negro y blanco",
      },
      { grupo: "Compatibilidad", label: "Aplicaciones", value: "Puertas de vidrio templado y carpintería liviana" },
      {
        grupo: "Comercial",
        label: "Unidad de cotización",
        value: "Por unidad instalada o servicio de calibración (Precio a definir)",
      },
    ],
    features: [
      "Regulación independiente de velocidad de barrido y golpe final.",
      "Retención abierta a 90° para paso continuo o mudanzas.",
      "Versiones estándar y reforzadas con pin, tapa y perno.",
      "Opción de bisagra aérea hasta 65 kg cuando no se pica el piso.",
      "Calibración de eje, nivel y holguras tras el montaje.",
    ],
    systems: ["Freno de piso estándar", "Freno de tráfico pesado", "Bisagra aérea hidráulica"],
    benefits: [
      "Evita golpes bruscos del cristal templado al cerrar.",
      "Prolonga la vida útil de herrajes y cerraduras en alto tránsito.",
      "Corrige puertas descolgadas o frenos desregulados.",
    ],
    systemSheets: [
      {
        nombre: "Freno Hidráulico de Piso",
        resumen:
          "Mecanismo empotrado en piso que soporta la puerta de vidrio templado, amortigua el cierre en dos velocidades y retiene la hoja a 90°.",
        specs: [
          { label: "Regulación", value: "2 válvulas independientes (barrido y golpe final) + retención 90°" },
          { label: "Versiones", value: "Estándar y reforzado para tránsito intenso" },
          {
            label: "Accesorios incluidos",
            value: "Caja hidráulica, pin, tapa superior, perno de fijación y herrajes superior e inferior acabado mate",
          },
        ],
        usos: [
          "Fachadas de edificios",
          "Recepciones de oficinas y hoteles",
          "Ingresos comerciales en vidrio templado",
        ],
      },
      {
        nombre: "Bisagra Aérea Hidráulica",
        resumen:
          "Cierrapuertas superior instalado en cabezal y hoja para puertas de hasta 65 kg sin perforar el piso.",
        specs: [
          { label: "Capacidad de carga", value: "Hasta 65 kg" },
          { label: "Acabados disponibles", value: "Mate, negro y blanco" },
          {
            label: "Accesorios incluidos",
            value: "Cuerpo hidráulico aéreo, brazo articulado/guía, placas de montaje y tornillería de fijación",
          },
        ],
        usos: [
          "Puertas interiores en aluminio en serie",
          "Oficinas de tránsito moderado",
          "Vanos con losa que no admite picado",
        ],
      },
      {
        nombre: "Freno hidráulico de piso Sevax",
        resumen:
          "Freno hidráulico de piso para puertas de vidrio con herraje inferior reforzado en acabado mate.",
        specs: [
          { label: "Tipo", value: "Freno hidráulico de piso (estándar / tránsito alto)" },
          { label: "Acabado de herraje", value: "Mate reforzado" },
          {
            label: "Accesorios incluidos",
            value: "Caja de piso, tapa y accesorio de puerta inferior reforzado en acabado mate",
          },
        ],
        usos: [
          "Puertas de cristal templado comerciales",
          "Ingresos de condominios",
          "Reemplazo en caja existente",
        ],
      },
      {
        nombre: "Freno hidráulico de piso Dorma",
        resumen:
          "Freno hidráulico de piso reforzado para puertas de vidrio de uso continuo con juego completo de fijación.",
        specs: [
          { label: "Tipo", value: "Freno hidráulico de piso reforzado (BTS-75R)" },
          { label: "Acabado de herrajes", value: "Mate" },
          {
            label: "Accesorios incluidos",
            value: "Mecanismo de piso reforzado, pin, tapa, perno y accesorios de puerta superior e inferior mate",
          },
        ],
        usos: [
          "Fachadas corporativas",
          "Edificios y hoteles de alto tránsito",
          "Puertas pesadas de cristal templado",
        ],
      },
    ],
    coverImage: "/images/services/frenos-hidraulicos-placeholder.webp",
    gallery: [],
    faqs: [
      {
        question: "¿Cuál es la diferencia entre freno de piso y bisagra aérea?",
        answer:
          "El freno de piso va empotrado en el suelo, soporta puertas pesadas de vidrio templado y ofrece retención a 90°. La bisagra aérea se fija arriba del marco sin picar piso y soporta hasta 65 kg.",
      },
      {
        question: "¿Cuándo un freno hidráulico requiere calibración o reemplazo?",
        answer:
          "Si la puerta golpea al cerrar o está descolgada suele bastar calibración de válvulas y herrajes; si presenta fuga de aceite en la caja de piso corresponde reemplazar la unidad.",
      },
      {
        question: "¿Qué datos se necesitan para cotizar?",
        answer:
          "Medidas aproximadas de la puerta, espesor del cristal y fotos de la caja actual en piso o cabezal superior. Precio a definir tras evaluación técnica.",
      },
    ],
    order: 12,
    published: true,
  },
  {
    id: "mantenimiento",
    slug: "mantenimiento",
    title: "Mantenimiento",
    category: "Servicio técnico",
    shortDescription:
      "Servicio técnico preventivo y correctivo para ventana, mampara, puerta y box de ducha: cambio de garruchas, felpas, burletes, brazos y sellado.",
    fullDescription:
      "Mantenimiento preventivo (cada 12–18 meses) y correctivo para recuperar el deslizamiento, cierre y estanqueidad en ventanas, mamparas, puertas y boxes de ducha instalados.\n\nIncluye diagnóstico, limpieza técnica de rieles, lubricación, regulación y reposición de repuestos (garruchas, felpas F-10/F-15, burletes EPDM, guías plásticas, vinil sellador, brazos o seguros) en La Molina, Surco, San Borja, San Isidro y Miraflores. No repara cristales fisurados ni perfiles doblados.",
    specs: [
      {
        grupo: "Periodicidad",
        label: "Preventivo y cuidado",
        value: "Revisión técnica cada 12–18 meses; limpieza en casa con franela seca 2 veces/mes",
      },
      {
        grupo: "Accesorios",
        label: "Rodamientos y guías",
        value: "Garruchas simples/dobles o triangulares (nylon, teflón o latón) y guías plásticas",
      },
      {
        grupo: "Accesorios",
        label: "Sellado y herrajes",
        value: "Felpa siliconada (F-10/F-15), burlete EPDM 4–8 mm, vinil de ducha, brazos proyectantes, seguros y tornillería",
      },
      {
        grupo: "Comercial",
        label: "Modalidad de cotización",
        value: "Por visita técnica o unidad atendida (Precio a definir)",
      },
    ],
    features: [
      "Limpieza técnica de rieles y extracción de suciedad en felpas.",
      "Lubricación de billas en garruchas, seguros y cerraduras.",
      "Cambio puntual de felpas, burletes EPDM y vinil de ducha.",
      "Regulación de hojas desniveladas y brazos proyectantes.",
      "Resellado perimetral con silicona en juntas con filtración.",
    ],
    systems: ["Mantenimiento preventivo", "Cambio de garruchas", "Sellado hermético y felpas"],
    benefits: [
      "Extiende la vida útil evitando cambiar cerramientos completos.",
      "Elimina roces, vibraciones por viento y silbidos.",
      "Recupera cierre seguro en seguros, cremonas y puertas.",
    ],
    systemSheets: [
      {
        nombre: "Mantenimiento Preventivo y Correctivo",
        resumen:
          "Revisión mecánica, limpieza técnica, regulación de herrajes y reemplazo de piezas de desgaste.",
        specs: [
          { label: "Frecuencia recomendada", value: "Cada 12 a 18 meses" },
          { label: "Cobertura", value: "La Molina, Surco, San Borja, San Isidro y Miraflores" },
          {
            label: "Accesorios incluidos",
            value: "Garruchas, guías plásticas, felpas F-10/F-15, burletes EPDM, vinil sellador, tornillería y sellado según diagnóstico",
          },
        ],
        usos: [
          "Ventanas y mamparas pesadas al deslizar",
          "Boxes de ducha con filtración o roce",
          "Puertas y ventanas proyectantes desreguladas",
        ],
      },
    ],
    coverImage: "/images/services/mantenimiento-placeholder.webp",
    gallery: [],
    faqs: [
      {
        question: "¿Por qué vibran las ventanas con el viento o se ponen duras al deslizar?",
        answer:
          "Ocurre cuando el polvo traba las garruchas o las felpas y burletes EPDM pierden espesor o elasticidad. Se corrige limpiando rieles, lubricando rodamientos y renovando felpas o burletes.",
      },
      {
        question: "¿Qué datos se necesitan para cotizar un mantenimiento?",
        answer:
          "Distrito del inmueble, cantidad aproximada de unidades a revisar y fotos o video corto de la falla (Precio a definir según diagnóstico y repuestos).",
      },
    ],
    order: 13,
    published: true,
  },
] as const;

/**
 * Da de alta los servicios aprobados si no existen en Firestore.
 * Si ya existen, no sobrescribe cambios realizados por el administrador.
 */
export async function seedApprovedNewServices(): Promise<{
  created: string[];
  existing: string[];
}> {
  const created: string[] = [];
  const existing: string[] = [];

  for (const service of APPROVED_NEW_SERVICES) {
    try {
      const docRef = doc(db, "services", service.id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        existing.push(service.id);
      } else {
        await setDoc(docRef, {
          ...service,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        created.push(service.id);
        logger.info(`Servicio nuevo dado de alta en Firestore: ${service.id}`);
      }
    } catch (err) {
      logger.error(`Error al dar de alta servicio ${service.id} en Firestore`, err, {
        serviceId: service.id,
      });
      throw err;
    }
  }

  return { created, existing };
}
