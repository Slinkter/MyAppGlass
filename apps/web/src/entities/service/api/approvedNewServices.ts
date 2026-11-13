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
    title: "Espejos a medida para interiores",
    category: "Vidrio procesado",
    shortDescription:
      "Espejos de vidrio flotado con recubrimiento de plata cortados a medida en 3, 4 y 6 mm para baños, vestidores, salas y locales comerciales.",
    fullDescription:
      "Un espejo a medida es una lámina de vidrio flotado con recubrimiento reflectante de plata cortada exactamente a las dimensiones de su muro, baño o mobiliario para ampliar la percepción espacial y multiplicar la luz interior. En nuestro taller seleccionamos espejos comerciales de buena fidelidad óptica, los dimensionamos según el proyecto y los instalamos con fijación segura.\n\nLos espesores habituales disponibles en el mercado local abarcan 2, 3 y 4 mm para formatos pequeños o medianos, y llegan hasta 6 mm en paños de gran formato o superiores a dos metros de lado donde se requiere mayor rigidez para evitar distorsiones visuales. Un espejo delgado sobre un muro irregular puede deformar el reflejo si no se instala sobre una superficie plana.\n\nOfrecemos instalación en formato flotante —adherido directamente al muro o sobre bastidor con cinta doble contacto de espuma acrílica de celda cerrada y silicona neutra— o integrado en carpintería de aluminio cuando se busca protección perimetral en zonas húmedas. Para baños con poca ventilación, recomendamos mantener los bordes bien sellados y limpiar el cristal sin exceso de humedad en los cantos.\n\nNuestro servicio incluye asesoría, toma de medidas en La Molina, Surco, San Borja, San Isidro o Miraflores, corte, transporte y montaje en obra. No incluye trabajos eléctricos ni preparación o nivelación de paredes con humedad activa. Para cotizar, necesitamos ancho y alto deseados, fotografía de la pared (indicando si es cemento, drywall o porcelanato) y confirmación de la zona. Acabados especiales como biselado, formas curvas o retroiluminación LED se evalúan según disponibilidad al momento de su consulta.",
    specs: [
      {
        grupo: "Material",
        label: "Sustrato base",
        value: "Vidrio flotado con recubrimiento de plata",
      },
      {
        grupo: "Dimensiones",
        label: "Espesores en catálogo local",
        value: "2 mm, 3 mm y 4 mm (6 mm en formato comercial)",
      },
      {
        grupo: "Dimensiones",
        label: "Espesor para paños amplios",
        value: "6 mm recomendado sobre 2.00 m de largo",
      },
      {
        grupo: "Montaje",
        label: "Fijación adherida",
        value: "Cinta doble contacto acrílica + silicona neutra",
      },
      {
        grupo: "Montaje",
        label: "Opciones de soporte",
        value: "Flotante directo a muro o con marco de aluminio",
      },
      {
        grupo: "Acabado",
        label: "Biselado y retroiluminación",
        value: "Precio a definir según disponibilidad en taller",
      },
      {
        grupo: "Mantenimiento",
        label: "Limpieza recomendada",
        value: "Paño suave seco o limpiavidrios sin amoníaco",
      },
      {
        grupo: "Comercial",
        label: "Unidad de cotización",
        value: "Por metro cuadrado o unidad (Precio a definir)",
      },
    ],
    features: [
      "Corte a la medida exacta de su muro, vano o mueble de baño.",
      "Vidrio flotado con recubrimiento de plata de alta nitidez y reflejo fiel.",
      "Espesores de 3 mm, 4 mm y 6 mm elegidos según el área total del paño.",
      "Montaje flotante con cinta doble contacto de espuma acrílica y adhesivo neutro.",
      "Alternativa con marco perimetral de aluminio para proteger los bordes.",
      "Instalación cuidadosa sobre cerámica, porcelanato, drywall o muro tarrajeado.",
    ],
    systems: ["Espejo biselado", "Marco de aluminio", "Retroiluminado LED", "Flotante pegado"],
    benefits: [
      "Multiplica la sensación de amplitud y profundidad en baños, pasadizos y salas.",
      "Aprovecha mejor la iluminación natural y artificial del ambiente.",
      "Evita distorsiones ópticas al seleccionar el espesor adecuado según el tamaño.",
      "Se integra limpiamente al diseño interior sin elementos de fijación invasivos.",
    ],
    systemSheets: [
      {
        nombre: "Espejo Flotante a Medida",
        resumen:
          "Solución limpia sin marco visible donde el espejo se fija directamente al muro o sobre un bastidor nivelado. Permite aprovechar toda la superficie reflectante en baños, vestidores y áreas sociales.",
        specs: [
          { label: "Espesores de trabajo", value: "3 mm, 4 mm y 6 mm según formato" },
          {
            label: "Sistema de fijación",
            value: "Cinta doble contacto de celda cerrada + silicona neutra",
          },
          {
            label: "Superficies aptas",
            value: "Porcelanato, mayólica, drywall o muro pintado firme",
          },
          {
            label: "Acabado de bordes",
            value: "Precio a definir para biselado o canto pulido",
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
        question: "¿Qué espesor de espejo conviene elegir según el tamaño de la pared?",
        answer:
          "Para espejos pequeños o de formato mediano —como tocadores o baños de visita— funcionan bien los espesores de 3 mm y 4 mm. Cuando el espejo supera los 2 metros de largo o cubre muros completos de sala y vestidor, se recomienda usar 6 mm para mantener la planitud y evitar distorsiones en el reflejo.",
      },
      {
        question: "¿Es mejor instalar un espejo flotante o con marco de aluminio?",
        answer:
          "El espejo flotante ofrece una estética minimalista y continua, ideal para baños modernos y muros amplios donde no se desean bordes visibles. El marco de aluminio conviene cuando la pared presenta ligeras irregularidades, en zonas con humedad constante que pueden afectar los cantos o cuando se requiere desmontar el espejo en el futuro.",
      },
      {
        question: "¿Cómo se protege un espejo contra la humedad del baño y cómo se cotiza?",
        answer:
          "Para evitar manchas oscuras en los bordes por humedad, utilizamos silicona neutra compatible con el recubrimiento de plata y recomendamos no rociar limpiadores directamente sobre las orillas. Para cotizar envíenos medidas aproximadas y foto de la pared; el costo figura como Precio a definir según espesor, área y tipo de montaje.",
      },
    ],
    order: 11,
    published: true,
  },
  {
    id: "frenos-hidraulicos",
    slug: "frenos-hidraulicos",
    title: "Frenos Hidráulicos y Cierrapuertas",
    category: "Herrajes y calibración",
    shortDescription:
      "Suministro, instalación y regulación de frenos de piso y bisagras aéreas hidráulicas para fachadas de edificios, oficinas, hoteles y puertas de cristal.",
    fullDescription:
      "Los frenos hidráulicos son mecanismos de control de cierre que soportan y regulan el retorno de puertas batientes o pivotantes, evitando golpes bruscos contra el marco o el cristal contiguo. En fachadas de edificios, recepciones de oficinas, hoteles y locales comerciales de alto tránsito, un freno hidráulico de piso empotrado soporta el peso de la puerta de vidrio templado, amortigua el recorrido en dos velocidades independientes y permite retener la hoja abierta a 90°.\n\nEvaluamos si su puerta requiere un freno de piso estándar, un modelo reforzado con pin, tapa y perno para hojas pesadas, o un cierrapuertas aéreo hidráulico. La bisagra aérea resulta recomendable en puertas interiores o de menor peso (hasta 65 kg), mientras que los ingresos principales de cristal templado exigen freno de piso con herrajes superior e inferior dimensionados. No recomendamos instalar un cierrapuertas aéreo estándar en portones que superen su capacidad nominal de carga ni empotrar cajas en pisos con tuberías o losas postensadas sin verificación previa.\n\nEl servicio incluye evaluación del peso y ancho de la hoja, suministro del freno o cierrapuertas con accesorios de sujeción en acabado mate, negro o blanco según modelo, picado o adecuación del alojamiento cuando corresponda, montaje y calibración de las válvulas de barrido y golpe final. No incluye reposición de cristales fracturados ni reconstrucción mayor de pisos de mármol o porcelanato. El presupuesto se cotiza por unidad instalada o por mantenimiento correctivo; Precio a definir tras inspección.\n\nPara cotizar solicitamos fotografías de la puerta completa, del piso o dintel, medidas aproximadas de la hoja y espesor del vidrio. El mantenimiento preventivo periódico evita desajustes prematuros. Si nota cierre violento, hoja descolgada o fuga de aceite en la caja del piso, suspenda el uso intensivo y solicite revisión técnica para regular válvulas o reemplazar el mecanismo.",
    specs: [
      {
        grupo: "Freno de piso",
        label: "Control de cierre",
        value: "Doble velocidad regulable (barrido y golpe final)",
      },
      {
        grupo: "Freno de piso",
        label: "Ángulo de retención",
        value: "Retención abierta a 90° en posición fija",
      },
      {
        grupo: "Freno de piso",
        label: "Variantes disponibles",
        value: "Estándar y reforzado con pin, tapa y perno",
      },
      {
        grupo: "Freno de piso",
        label: "Accesorios de sujeción",
        value: "Herrajes superior e inferior en acabado mate",
      },
      {
        grupo: "Cierrapuertas aéreo",
        label: "Capacidad máxima",
        value: "Hasta 65 kg de peso de hoja",
      },
      {
        grupo: "Cierrapuertas aéreo",
        label: "Acabados disponibles",
        value: "Mate, negro y blanco",
      },
      {
        grupo: "Compatibilidad",
        label: "Aplicaciones principales",
        value: "Puertas de vidrio templado y carpintería liviana",
      },
      {
        grupo: "Servicio",
        label: "Modalidad de cotización",
        value: "Precio a definir por unidad instalada o servicio",
      },
    ],
    features: [
      "Regulación independiente de velocidad de barrido y tramo de golpe final.",
      "Retención automática a 90° para facilitar el paso en mudanzas o ventilación.",
      "Modelos de piso estándar y reforzados para puertas de tránsito intenso.",
      "Alternativa de cierrapuertas aéreo hidráulico de hasta 65 kg en tres acabados.",
      "Calibración de nivel, eje vertical y holguras perimetrales tras el montaje.",
      "Diagnóstico técnico ante fugas de aceite, golpeteo o descuelgue de hoja.",
    ],
    systems: ["Freno de piso estándar", "Freno de tráfico pesado", "Bisagra aérea hidráulica"],
    benefits: [
      "Protege el cristal templado frente a impactos por cierre violento o ráfagas de viento.",
      "Prolonga la vida útil de cerraduras y herrajes en fachadas de edificios y hoteles.",
      "Mejora la seguridad y comodidad de acceso en oficinas y locales comerciales.",
      "Permite recuperar puertas desalineadas mediante regulación o recambio oportuno.",
    ],
    systemSheets: [
      {
        nombre: "Freno Hidráulico de Piso",
        resumen:
          "Mecanismo hidráulico alojado dentro de una caja empotrada en el suelo que carga el peso de la puerta de cristal templado, suaviza el cierre en dos etapas y retiene la hoja a 90°. Disponible en versiones estándar y reforzadas.",
        specs: [
          {
            label: "Velocidades",
            value: "2 válvulas independientes (barrido y golpe final)",
          },
          { label: "Retención", value: "90° de apertura" },
          {
            label: "Configuraciones",
            value: "Estándar y reforzado con pin, tapa y perno",
          },
          {
            label: "Sujeción",
            value: "Herrajes superior e inferior en acabado mate",
          },
        ],
        usos: [
          "Fachadas de edificios corporativos y condominios",
          "Ingresos principales de oficinas, bancos y hoteles",
          "Locales comerciales con puertas batientes de cristal templado",
        ],
      },
      {
        nombre: "Bisagra Aérea Hidráulica",
        resumen:
          "Cierrapuertas hidráulico instalado en la parte superior del marco y la hoja para controlar el retorno de puertas más livianas sin picar el piso. Ofrece regulación hidráulica y acabados discretos.",
        specs: [
          { label: "Capacidad de carga", value: "Hasta 65 kg" },
          { label: "Montaje", value: "Aéreo en cabezal superior sin caja en piso" },
          { label: "Acabados", value: "Mate, negro y blanco" },
        ],
        usos: [
          "Puertas interiores de aluminio en serie o madera liviana",
          "Accesos de oficinas secundarias con tránsito moderado",
          "Vanos donde no es posible perforar la losa del piso",
        ],
      },
    ],
    coverImage: "/images/services/frenos-hidraulicos-placeholder.webp",
    gallery: [],
    faqs: [
      {
        question: "¿Cuál es la diferencia entre un freno hidráulico de piso y una bisagra aérea?",
        answer:
          "El freno hidráulico de piso se empotra bajo el nivel del suelo, soporta directamente el peso de puertas de vidrio templado y ofrece retención a 90° para fachadas y accesos exigentes. La bisagra aérea hidráulica se monta en la parte superior del marco sin picar el piso y está pensada para puertas más livianas de hasta 65 kg.",
      },
      {
        question: "¿Por qué una puerta con freno hidráulico empieza a golpear al cerrar?",
        answer:
          "El golpe al cerrar suele deberse al desajuste de la válvula de segunda velocidad, desgaste por uso intenso o pérdida del fluido hidráulico interno. En una revisión técnica regulamos ambas velocidades (barrido y golpe final) y verificamos la alineación de los herrajes; si el mecanismo presenta fuga de aceite en el piso, corresponde reemplazar la unidad.",
      },
      {
        question: "¿Qué síntomas indican que un freno de piso necesita mantenimiento o cambio?",
        answer:
          "Las señales más claras son manchas o filtración de aceite alrededor de la tapa metálica del suelo, puerta descolgada que roza el piso, pérdida de la retención a 90° o cierre acelerado sin amortiguación. Atender estos síntomas a tiempo evita esfuerzos indebidos sobre las perforaciones del cristal templado.",
      },
      {
        question:
          "¿Qué datos necesitan para cotizar la instalación o el cambio de un freno hidráulico?",
        answer:
          "Necesitamos conocer las medidas aproximadas de la puerta (ancho y alto), el espesor del vidrio o material de la hoja, y recibir fotografías de la tapa actual del piso o del cabezal superior. Con esa información evaluamos si basta una regulación, un recambio en la caja existente o una instalación completa.",
      },
    ],
    order: 12,
    published: true,
  },
  {
    id: "mantenimiento",
    slug: "mantenimiento",
    title: "Mantenimiento de vidrio y aluminio",
    category: "Servicio técnico",
    shortDescription:
      "Servicio técnico preventivo y correctivo para ventanas, mamparas, puertas y boxes de ducha: cambio de garruchas, felpas, burletes, brazos y sellado.",
    fullDescription:
      "El servicio de mantenimiento de vidrio y aluminio consiste en la revisión, limpieza técnica, lubricación, regulación y reemplazo de piezas de desgaste en cerramientos ya instalados, con el fin de recuperar su deslizamiento suave, cierre seguro y hermeticidad original. Atendemos viviendas, oficinas y locales comerciales en La Molina, Surco, San Borja, San Isidro y Miraflores.\n\nDiferenciamos dos modalidades de atención. El mantenimiento preventivo se recomienda cada 12 a 18 meses para limpiar rieles y felpas, lubricar las billas de las garruchas, ajustar tornillos autorroscantes, revisar seguros y verificar el estado del sellado perimetral antes de que aparezcan fallas mayores. El mantenimiento correctivo interviene cuando una hoja ya presenta roce, descarrilamiento, filtración de agua, vibración por felpa seca o descuadre en ventanas proyectantes y puertas batientes.\n\nNo conviene aplicar mantenimiento sobre perfiles estructuralmente doblados por golpes severos ni sobre cristales fisurados o astillados; en esos casos corresponde evaluar el reemplazo del paño o del sistema completo. Asimismo, si usted realiza limpieza doméstica, evite productos abrasivos para pulir metales y limpie el aluminio al menos dos veces al mes con franela suave y seca de color claro.\n\nEl servicio incluye diagnóstico en obra, mano de obra especializada, limpieza de mecanismos, regulación de herrajes y provisión de repuestos compatibles (garruchas, felpas, burletes EPDM, brazos proyectantes, guías o vinil sellador) según evaluación. No incluye trabajos de albañilería ni pintura de muros. Para cotizar, envíenos fotografías o un breve video de la falla, el distrito y la cantidad de unidades a revisar; el costo figura como Precio a definir tras la inspección.",
    specs: [
      {
        grupo: "Periodicidad",
        label: "Mantenimiento preventivo",
        value: "Cada 12 a 18 meses según exposición al polvo o humedad",
      },
      {
        grupo: "Periodicidad",
        label: "Limpieza superficial en casa",
        value: "Mínimo 2 veces al mes con franela seca de color claro",
      },
      {
        grupo: "Rodamientos",
        label: "Garruchas de reemplazo",
        value: "Ruedas de nylon, teflón o latón con billas lubricadas",
      },
      {
        grupo: "Sellado",
        label: "Felpas y burletes",
        value: "Felpa siliconada (F-10 / F-15) y caucho EPDM de 4 a 8 mm",
      },
      {
        grupo: "Proyectantes",
        label: "Brazos de fricción",
        value: "Aluminio (40, 60, 95 cm) o acero inoxidable (12 y 24 pulgadas)",
      },
      {
        grupo: "Boxes de ducha",
        label: "Repuestos específicos",
        value: "Garruchas simples/triangulares, guías plásticas y vinil",
      },
      {
        grupo: "Fijación",
        label: "Tornillería técnica",
        value: "Autorroscantes en acero inoxidable o zincado",
      },
      {
        grupo: "Cuidado",
        label: "Protección de herrajes",
        value: "Limpieza con silicona en paño suave contra corrosión",
      },
      {
        grupo: "Comercial",
        label: "Unidad de cotización",
        value: "Por visita técnica o por unidad (Precio a definir)",
      },
    ],
    features: [
      "Diagnóstico técnico en obra para ventanas, mamparas, puertas y boxes de ducha.",
      "Limpieza profunda de rieles inferiores y retiro de suciedad acumulada en felpas.",
      "Lubricación de billas en garruchas y mecanismo interno de seguros y cerraduras.",
      "Reemplazo de burletes EPDM resecos, felpas desgastadas y vinil sellador.",
      "Regulación de hojas desniveladas y ajuste de brazos en ventanas proyectantes.",
      "Resellado perimetral con silicona para controlar filtraciones de agua y viento.",
    ],
    systems: ["Mantenimiento preventivo", "Cambio de garruchas", "Sellado hermético y felpas"],
    benefits: [
      "Prolonga la vida útil de sus cerramientos evitando reemplazos costosos completos.",
      "Elimina ruidos molestos por vibración de vidrios y esfuerzo excesivo al deslizar hojas.",
      "Previene filtraciones de lluvia y acumulación de polvo en dormitorios y salas.",
      "Restablece la seguridad de cierre en seguros caracol, pico loro y cremonas.",
    ],
    systemSheets: [
      {
        nombre: "Mantenimiento Preventivo y Correctivo",
        resumen:
          "Intervención integral orientada a conservar o recuperar el funcionamiento mecánico y hermético de carpintería en vidrio y aluminio. Combina limpieza técnica, lubricación específica y cambio puntual de accesorios de desgaste.",
        specs: [
          { label: "Frecuencia preventiva", value: "Cada 12 a 18 meses" },
          {
            label: "Componentes atendidos",
            value: "Garruchas, felpas, burletes, seguros, brazos y frenos",
          },
          {
            label: "Cobertura distrital",
            value: "La Molina, Surco, San Borja, San Isidro y Miraflores",
          },
          {
            label: "Tarifa de visita",
            value: "Precio a definir según cantidad de unidades y repuestos",
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
        question: "¿Cuál es la diferencia entre mantenimiento preventivo y correctivo?",
        answer:
          "El mantenimiento preventivo se programa cada 12 a 18 meses cuando los sistemas aún funcionan bien, con el objetivo de limpiar rieles, lubricar garruchas, ajustar tornillos y conservar felpas y burletes. El mantenimiento correctivo se realiza cuando ya existe una falla visible, como hojas trabadas, filtraciones de lluvia, seguros rotos o brazos proyectantes descuadrados.",
      },
      {
        question: "¿Por qué vibran o silban las ventanas con el viento y cómo se corrige?",
        answer:
          "La vibración y el silbido suelen aparecer cuando las felpas perimetrales se resecan, se aplastan o acumulan polvo endurecido, dejando holgura entre el cristal y el marco, o cuando los burletes de caucho EPDM pierden elasticidad. La solución consiste en limpiar la guía con una herramienta sin filo o reemplazar las felpas y burletes por medidas calibradas.",
      },
      {
        question: "¿Qué causa las filtraciones de agua en ventanas o boxes de ducha?",
        answer:
          "En ventanas y mamparas, las filtraciones ocurren por obstrucción de los orificios de desalojo de agua en el riel inferior, sellado perimetral de silicona deteriorado o burletes vencidos. En boxes de ducha, suelen deberse a viniles selladores desgastados o guías plásticas vencidas. Revisamos los puntos de ingreso, limpiamos drenajes y renovamos los sellos.",
      },
      {
        question: "¿Qué información necesitan para cotizar un servicio de mantenimiento?",
        answer:
          "Para preparar una estimación necesitamos el distrito de su inmueble, la cantidad aproximada de ventanas, mamparas o boxes de ducha a revisar y fotografías o un video corto mostrando la falla. El costo figura como Precio a definir porque depende de los repuestos requeridos y el tiempo de intervención en obra.",
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
