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
    title: "Espejos a Medida y Decorativos",
    category: "Vidrio procesado",
    shortDescription:
      "Venta e instalación de espejos a medida biselados, con marco de aluminio o retroiluminados para baños, salas y dormitorios en La Molina y Lima.",
    fullDescription:
      "Fabricación e instalación de espejos decorativos de alta durabilidad en espesores de 3mm a 6mm. Opciones de cantos pulidos, biselados elegantes, marcos en perfilería de aluminio (mate, negro, champagne) y retroiluminación LED cálida o fría. [Nota técnica: Costos de suministro y flete por m² pendientes de validación con el dueño].",
    features: [
      "Cristal reflectivo de alta precisión libre de distorsión",
      "Bordes pulidos con máquina y biselado milimétrico",
      "Marcos de aluminio anticorrosivo perimetrales opcionales",
      "Retroiluminación LED impermeable para ambientes húmedos",
      "Instalación segura con anclajes ocultos y silicona neutra",
      "Garantía técnica y ajuste preciso a escuadra",
    ],
    systems: ["Espejo biselado", "Marco de aluminio", "Retroiluminado LED", "Flotante pegado"],
    benefits: [
      "Amplitud visual y mayor luminosidad natural",
      "Resistencia a la humedad y hongos en baños",
      "Diseño a medida según vano arquitectónico",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      {
        id: "esp-1",
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        alt: "Espejo a medida con retroiluminación en baño principal",
        system: "Retroiluminado LED",
      },
    ],
    faqs: [
      {
        question: "¿Qué grosor de espejo se recomienda para baños y salas?",
        answer:
          "Se recomienda 4mm o 5mm para evitar distorsiones ópticas en dimensiones medianas o grandes, y 6mm para medidas superiores a 2 metros.",
      },
      {
        question: "¿Se desprenden o manchan con la humedad?",
        answer:
          "Utilizamos silicona neutra especial para espejos que no daña el nitrato de plata posterior, evitando manchas oscuras por humedad.",
      },
    ],
    order: 11,
    published: true,
  },
  {
    id: "frenos-hidraulicos",
    slug: "frenos-hidraulicos",
    title: "Frenos Hidráulicos y Accesorios para Puertas de Vidrio",
    category: "Herrajes y calibración",
    shortDescription:
      "Suministro, cambio y calibración de frenos hidráulicos de piso y accesorios para puertas de vidrio templado en La Molina y Lima.",
    fullDescription:
      "Servicio especializado para puertas de vidrio templado comerciales y residenciales. Diagnóstico, cambio y regulación de cajas de frenos hidráulicos de piso (marcas importadas certificadas), zócalos, pivotes superiores, cerraduras de piso y jaladores de acero inoxidable. [Nota técnica: Costos de repuestos y tarifa base de visita técnica pendientes de confirmación con el dueño].",
    features: [
      "Regulación precisa de doble velocidad de cierre y golpe final",
      "Reemplazo de cajas de piso oxidadas o desgastadas",
      "Pivotes y puntos de giro en acero inoxidable",
      "Ajuste y alineación milimétrica de puertas batientes",
      "Cambio de bisagras hidráulicas aéreas y zócalos",
      "Atención técnica rápida para oficinas y comercios",
    ],
    systems: ["Freno de piso estándar", "Freno de tráfico pesado", "Bisagra aérea hidráulica"],
    benefits: [
      "Cierre suave y seguro que protege el cristal templado",
      "Elimina ruidos molestos y descuadres de puerta",
      "Mayor vida útil de los herrajes y zócalos",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      {
        id: "fr-1",
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        alt: "Calibración de freno hidráulico de piso en puerta de vidrio templado",
        system: "Freno de piso estándar",
      },
    ],
    faqs: [
      {
        question: "¿Por qué mi puerta de vidrio golpea muy fuerte al cerrar?",
        answer:
          "Se debe a pérdida de aceite hidráulico o descalibración de las válvulas de regulación del freno de piso. Requiere calibración o cambio inmediato para evitar roturas del cristal.",
      },
    ],
    order: 12,
    published: true,
  },
  {
    id: "mantenimiento",
    slug: "mantenimiento",
    title: "Mantenimiento y Calibración de Vidrio y Aluminio",
    category: "Servicio técnico",
    shortDescription:
      "Mantenimiento preventivo y correctivo de mamparas, ventanas, puertas y estructuras de vidrio y aluminio en La Molina, Surco y Lima.",
    fullDescription:
      "Restauramos la funcionalidad y hermeticidad de ventanas y mamparas instaladas. Cambio de garruchas de nylon y rodamientos de acero, felpas antirruido y antiviento, brazos proyectantes, sellado perimetral con silicona estructural y alineación de perfiles de aluminio. [Nota técnica: Costo de mano de obra por hora y tarifa mínima de visita técnica pendientes de confirmación con el dueño].",
    features: [
      "Cambio de garruchas simples y tándem regulables",
      "Renovación de felpas perimetrales y burletes de jebe",
      "Sellado estanco contra filtraciones de lluvia y polvo",
      "Calibración de cerraduras, pestillos y manijas",
      "Reemplazo de brazos de empuje y limitadores de ventana",
      "Mantenimiento integral en residencias y condominios",
    ],
    systems: ["Mantenimiento preventivo", "Cambio de garruchas", "Sellado hermético y felpas"],
    benefits: [
      "Recupera el deslizado suave y sin esfuerzo",
      "Mejora el aislamiento térmico y acústico existente",
      "Evita filtraciones de agua en temporadas de llovizna",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      {
        id: "mant-1",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        alt: "Servicio de mantenimiento y cambio de rodamientos de mampara",
        system: "Cambio de garruchas",
      },
    ],
    faqs: [
      {
        question: "¿Con qué frecuencia se debe dar mantenimiento a las mamparas?",
        answer:
          "Es recomendable una revisión cada 12 a 18 meses para lubricar rodamientos, aspirar polvo de los rieles y cambiar felpas desgastadas.",
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
      logger.error(`Error al dar de alta servicio ${service.id} en Firestore`, err);
      throw err;
    }
  }

  return { created, existing };
}
