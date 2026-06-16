/**
 * @file blog-posts.ts
 * @description Centralized data for blog posts with SEO-optimized content.
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "tendencias-vidrio-templado-2026",
    title: "Tendencias en Vidrio Templado para el 2026",
    description: "Descubre las últimas innovaciones en vidrio templado y cómo transformar tu hogar con elegancia y seguridad.",
    excerpt: "El vidrio templado sigue evolucionando. En este artículo exploramos las texturas, colores y aplicaciones que dominarán la arquitectura moderna este año.",
    date: "2026-03-15",
    author: "GYA Company",
    image: "/images/home-img_t01.webp",
    tags: ["Vidrio Templado", "Arquitectura", "Diseño"],
    content: `
      <h2>La Evolución del Vidrio Templado</h2>
      <p>El vidrio templado ha dejado de ser un simple material de seguridad para convertirse en un elemento protagonista del diseño arquitectónico. Su capacidad para combinar resistencia estructural con transparencia lo hace ideal para las tendencias minimalistas que veremos este 2026.</p>
      
      <h3>1. Texturas Orgánicas</h3>
      <p>Atrás quedaron los vidrios puramente lisos. La tendencia ahora se inclina por grabados sutiles que juegan con la luz natural, proporcionando privacidad sin sacrificar la luminosidad.</p>

      <h3>2. Sostenibilidad y Eficiencia</h3>
      <p>Los nuevos procesos de templado permiten integrar capas de control solar invisibles, reduciendo el consumo energético en climatización hasta en un 30%.</p>

      <blockquote>"El vidrio no solo es lo que ves a través de él, es cómo transforma el espacio que habitas."</blockquote>

      <p>En GYA Glass & Aluminum, estamos a la vanguardia de estas tecnologías para ofrecer soluciones que no solo cumplen con las normas, sino que superan las expectativas estéticas.</p>
    `,
  },
  {
    id: "2",
    slug: "ventajas-aluminio-minimalista",
    title: "Ventajas del Aluminio en el Diseño Minimalista",
    description: "Por qué el aluminio es el aliado perfecto para las fachadas modernas y perfiles ultra delgados.",
    excerpt: "Analizamos la durabilidad y versatilidad del aluminio en proyectos residenciales y comerciales de alto nivel.",
    date: "2026-04-10",
    author: "GYA Company",
    image: "/images/home-img_t05.webp",
    tags: ["Aluminio", "Minimalismo", "Construcción"],
    content: `
      <h2>Elegancia en cada Perfil</h2>
      <p>El aluminio ha ganado terreno en la arquitectura contemporánea gracias a su increíble relación peso-resistencia. Esto permite crear ventanales de gran formato con perfiles casi invisibles, conectando el interior con el exterior de manera fluida.</p>

      <h3>Durabilidad Extrema</h3>
      <p>A diferencia de otros materiales, el aluminio resiste la corrosión y no requiere mantenimiento constante, lo que lo convierte en la inversión más inteligente a largo plazo para zonas costeras o climas extremos.</p>

      <h3>Colores y Acabados</h3>
      <p>Desde el clásico anodizado hasta las pinturas electrostáticas en tonos mate, las posibilidades de personalización son infinitas.</p>
    `,
  },
  {
    id: "3",
    slug: "vidrieria-en-la-molina-guia",
    title: "Vidriería en La Molina: Soluciones Modernas para tu Hogar",
    description: "Encuentra la mejor vidriería en La Molina. Ofrecemos instalación de mamparas, ventanas de aluminio y acabados de primera.",
    excerpt: "Si buscas renovar tus espacios con vidrio templado de calidad, te mostramos los servicios de vidriería en La Molina más solicitados.",
    date: "2026-05-05",
    author: "GYA Company",
    image: "/images/services-general-init01.webp",
    tags: ["La Molina", "Vidriería", "Decoración"],
    content: `
      <h2>Servicios de Vidriería en La Molina</h2>
      <p>La arquitectura moderna en distritos residenciales exige acabados de alta calidad. Si buscas un servicio de <strong>vidriería en La Molina</strong> que combine puntualidad, materiales certificados y mano de obra experta, estás en el lugar correcto.</p>
      
      <h3>Mamparas y Ventanas en Zonas Residenciales</h3>
      <p>En La Molina, las casas suelen destacar por sus amplios jardines y terrazas. Instalar <a href="/servicios/mampara">mamparas de vidrio</a> templado es la mejor solución para conectar la sala con las áreas exteriores, logrando un flujo de luz natural óptimo.</p>

      <h3>Ventanas Antirruido y Herméticas</h3>
      <p>Para avenidas de alto tránsito, recomendamos nuestras <a href="/servicios/ventana">ventanas de aluminio</a> con sistema acústico, ideales para aislar el ruido exterior y garantizar el descanso de tu familia.</p>
    `,
  },
  {
    id: "4",
    slug: "mamparas-de-vidrio-templado-lima",
    title: "Mamparas de Vidrio Templado en Lima: Espacios Amplios y Seguros",
    description: "Guía completa sobre mamparas de vidrio templado en Lima. Conoce los sistemas Nova y corredizos para optimizar luz y espacio.",
    excerpt: "Las mamparas de vidrio templado son ideales para conectar tu sala con la terraza. Descubre los precios y diseños en tendencia en Lima.",
    date: "2026-05-20",
    author: "GYA Company",
    image: "/images/services-general-init02a.webp",
    tags: ["Mamparas", "Vidrio Templado", "Lima"],
    content: `
      <h2>Espacios Continuos con Mamparas de Vidrio Templado en Lima</h2>
      <p>Las <strong>mamparas de vidrio templado en Lima</strong> se han convertido en la solución favorita de arquitectos y diseñadores. Permiten maximizar el espacio visual y permiten un paso de luz ininterrumpido en departamentos y casas.</p>

      <h3>Sistemas Corredizos para Cada Necesidad</h3>
      <p>Nuestras <a href="/servicios/mampara">mamparas de vidrio templado</a> vienen equipadas con sistemas corredizos de alta resistencia (como la Serie 25 y Nova) que garantizan un deslizamiento suave y seguro.</p>

      <h3>Puertas Batientes y de Seguridad</h3>
      <p>Si buscas una opción para la entrada o divisiones comerciales, las <a href="/servicios/pvidrio">puertas de vidrio templado</a> con cerraduras de seguridad son la alternativa ideal.</p>
    `,
  },
  {
    id: "5",
    slug: "barandas-de-acero-y-vidrio-tendencias",
    title: "Barandas de Acero y Vidrio: Seguridad con Estilo Moderno",
    description: "Las barandas de acero y vidrio ofrecen resistencia y una estética minimalista inigualable. Ideal para balcones y escaleras.",
    excerpt: "Exploramos las ventajas de instalar barandas de acero y vidrio en escaleras internas y terrazas para un look sofisticado.",
    date: "2026-06-02",
    author: "GYA Company",
    image: "/images/services-general-init06.webp",
    tags: ["Barandas", "Acero", "Diseño de Interiores"],
    content: `
      <h2>Modernidad y Seguridad en Escaleras y Balcones</h2>
      <p>Las <strong>barandas de acero y vidrio</strong> son la opción predilecta cuando se busca una protección que no obstaculice la vista ni recargue visualmente los espacios.</p>

      <h3>Materiales Resistentes a la Corrosión</h3>
      <p>En climas húmedos como el de Lima, usar acero inoxidable AISI 304 o AISI 316 combinado con cristal templado de seguridad de 8mm a 10mm asegura una durabilidad excepcional para <a href="/servicios/baranda">barandas de vidrio</a>.</p>

      <h3>Aplicaciones en Balcones y Terrazas</h3>
      <p>Perfectas para proyectos de departamentos con <a href="/servicios/balcones">balcones de vidrio</a>, aportan elegancia y incrementan el valor comercial de cualquier propiedad.</p>
    `,
  },
  {
    id: "6",
    slug: "techos-de-policarbonato-y-vidrio-terrazas",
    title: "Techos de Policarbonato y Vidrio para Terrazas en Lima",
    description: "Compara techos de policarbonato y vidrio templado. Elige la mejor cobertura para proteger tu terraza de la lluvia y el sol.",
    excerpt: "Disfruta de tu terraza todo el año instalando techos de policarbonato o vidrio que garanticen paso de luz y protección total.",
    date: "2026-06-15",
    author: "GYA Company",
    image: "/images/services-general-init04.webp",
    tags: ["Techos", "Policarbonato", "Terrazas"],
    content: `
      <h2>Coberturas para Exteriores: Vidrio vs. Policarbonato</h2>
      <p>Si deseas remodelar tu patio o terraza, los <strong>techos de policarbonato y vidrio</strong> son las dos opciones más demandadas para cubrir estructuras en la ciudad.</p>

      <h3>Ventajas del Policarbonato Alveolar y Click</h3>
      <p>Es sumamente ligero, económico y ofrece una excelente protección contra los rayos UV, lo cual es ideal para estructuras ligeras de aluminio o madera.</p>

      <h3>Elegancia y Claridad con Vidrio Templado</h3>
      <p>Para un acabado premium y libre de ruidos en días de lluvia, los <a href="/servicios/techo">techos de policarbonato y vidrio</a> templado con perfiles de aluminio estructural son inigualables en estética y resistencia.</p>
    `,
  },
  {
    id: "7",
    slug: "guia-ventanas-de-aluminio-lima",
    title: "Guía Completa de Ventanas de Aluminio y Sistemas Herméticos",
    description: "Todo sobre ventanas de aluminio en Lima: sistema Nova, Serie 25 y perfiles acústicos para aislar el ruido exterior.",
    excerpt: "Las ventanas de aluminio son duraderas, ligeras y modernas. Conoce cómo elegir el mejor sistema para tus habitaciones.",
    date: "2026-07-01",
    author: "GYA Company",
    image: "/images/services-general-init01.webp",
    tags: ["Ventanas", "Aluminio", "Aislamiento Acústico"],
    content: `
      <h2>Por Qué Elegir Ventanas de Aluminio</h2>
      <p>Las <strong>ventanas de aluminio</strong> son la mejor solución para resistir el paso del tiempo y la humedad de Lima sin deformarse ni perder su color original.</p>

      <h3>Sistemas Nova y Serie 25</h3>
      <p>El sistema Nova es muy popular por su excelente hermeticidad y facilidad de mantenimiento. Para presupuestos más ajustados sin perder calidad, la Serie 25 ofrece un desempeño fantástico en <a href="/servicios/ventana">ventanas de aluminio</a> de todo tipo.</p>

      <h3>Fácil Limpieza y Cero Óxido</h3>
      <p>A diferencia del hierro, el aluminio no se oxida, lo que reduce su mantenimiento al mínimo absoluto.</p>
    `,
  },
  {
    id: "8",
    slug: "vidrio-templado-para-duchas-modernas",
    title: "Vidrio Templado para Duchas: Transforma tu Baño en un Spa",
    description: "Descubre cómo elegir el vidrio templado para duchas. Diseños en 8mm y sistemas corredizos o batientes para tu baño.",
    excerpt: "Moderniza tu baño con mamparas y vidrio templado para duchas. Más higiénicos, seguros y estéticamente superiores que las cortinas.",
    date: "2026-07-15",
    author: "GYA Company",
    image: "/images/services-general-init03.webp",
    tags: ["Duchas", "Vidrio Templado", "Baños"],
    content: `
      <h2>Duchas Modernas y Seguras</h2>
      <p>El uso de <strong>vidrio templado para duchas</strong> es la forma definitiva de dar un toque de amplitud, limpieza y modernidad a baños de cualquier tamaño.</p>

      <h3>Espesor de Seguridad de 8mm</h3>
      <p>Un box de ducha moderno requiere cristales de seguridad de 8mm para garantizar la máxima estabilidad estructural frente a golpes fortuitos.</p>

      <h3>Sistemas Corredizos KIT</h3>
      <p>El sistema KIT de acero inoxidable o aluminio anodizado es el más buscado por su estética minimalista y su riel superior redondo. Visita nuestra sección de <a href="/servicios/ducha">vidrio templado para duchas</a> para cotizar tu medida.</p>
    `,
  }
];

export default BLOG_POSTS;
