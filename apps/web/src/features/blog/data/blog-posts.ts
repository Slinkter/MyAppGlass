/**
 * @file blog-posts.ts
 * @description Semilla de migración para la colección `blogPosts` en Firestore.
 * Se conserva SOLO como semilla y fallback de build; la fuente principal de artículos
 * es Firestore (gestionado desde `/admin/blog`). No importar directamente desde la UI ni el sitemap.
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
      <h2>La Evolución del Vidrio Templado en la Arquitectura</h2>
      <p>El vidrio templado ha dejado de ser un simple material de seguridad para convertirse en un elemento protagonista del diseño arquitectónico. Su capacidad para combinar resistencia estructural con transparencia lo hace ideal para las tendencias minimalistas que lideran el mercado este 2026.</p>
      
      <h3>1. Texturas Orgánicas y Acabados Antirreflejo</h3>
      <p>Atrás quedaron los vidrios puramente lisos. La tendencia ahora se inclina por grabados sutiles y arenados decorativos que juegan con la luz natural, proporcionando privacidad sin sacrificar la luminosidad en <a href="/servicios/mampara">mamparas de vidrio</a>.</p>

      <h3>2. Sostenibilidad y Eficiencia Térmica</h3>
      <p>Los nuevos procesos de templado permiten integrar capas de control solar invisibles, reduciendo el consumo energético en climatización hasta en un 30% en residencias de La Molina y Surco.</p>

      <blockquote>"El vidrio no solo es lo que ves a través de él, es cómo transforma el espacio que habitas."</blockquote>

      <p>En Glass & Aluminum Company S.A.C., estamos a la vanguardia de estas tecnologías para ofrecer cerramientos que superan las exigencias estéticas y estructurales. Conoce más en nuestra sección de <a href="/#servicios">servicios de vidriería</a>.</p>
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
      <h2>Elegancia y Resistencia en cada Perfil</h2>
      <p>El aluminio ha ganado terreno en la arquitectura contemporánea gracias a su increíble relación peso-resistencia. Esto permite crear ventanales de gran formato con perfiles casi invisibles, conectando el interior con el exterior de manera fluida.</p>

      <h3>Durabilidad Extrema Frente a la Humedad de Lima</h3>
      <p>A diferencia de otros materiales, el aluminio anodizado y electropintado resiste la corrosión del salitre limeño y no requiere mantenimiento constante, lo que lo convierte en la inversión más inteligente a largo plazo en <a href="/servicios/ventana">ventanas de aluminio</a>.</p>

      <h3>Colores y Acabados en Tendencia</h3>
      <p>Desde el clásico acabado natural y champagne hasta las pinturas electrostáticas en negro mate y texturas amaderadas, las posibilidades de personalización son ilimitadas.</p>
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
      <h2>Servicios de Vidriería Especializada en La Molina</h2>
      <p>La arquitectura moderna en distritos residenciales exige acabados de alta precisión. Si buscas un servicio de <strong>vidriería en La Molina</strong> que combine puntualidad, materiales certificados por Indecopi y mano de obra experta con más de 12 años de trayectoria, en GYA Company tenemos la solución.</p>
      
      <h3>Mamparas y Terrazas en Zonas Residenciales</h3>
      <p>En La Molina, las residencias suelen destacar por sus amplios jardines y terrazas. Instalar <a href="/servicios/mampara">mamparas de vidrio templado</a> es la mejor solución para conectar la sala con las áreas exteriores, logrando un flujo de luz natural óptimo.</p>

      <h3>Ventanas Antirruido y Herméticas</h3>
      <p>Para viviendas ubicadas cerca de avenidas como Javier Prado, La Fontana o Los Fresnos, recomendamos nuestras <a href="/servicios/ventana">ventanas acústicas antirruido</a> con perfiles herméticos, ideales para aislar el sonido exterior y garantizar el descanso de tu familia. <a href="/contacto">Solicita tu cotización a domicilio aquí</a>.</p>
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
      <p>Las <strong>mamparas de vidrio templado en Lima</strong> se han convertido en la solución predilecta de arquitectos y diseñadores. Permiten maximizar la sensación espacial y garantizan un paso de luz ininterrumpido en departamentos y casas.</p>

      <h3>Sistemas Corredizos para Cada Necesidad (Nova y Serie 25)</h3>
      <p>Nuestras <a href="/servicios/mampara">mamparas de vidrio templado</a> vienen equipadas con sistemas corredizos de alta resistencia (como la Serie 25 y Nova) con felpas perimetrales y rodamientos reforzados que garantizan un deslizamiento ultrasuave y hermético.</p>

      <h3>Puertas Batientes y de Seguridad</h3>
      <p>Si buscas una opción para ingresos principales o divisiones comerciales, las <a href="/servicios/pvidrio">puertas de vidrio templado</a> con cerraduras centrales y freno hidráulico de piso son la alternativa ideal.</p>
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
      <p>Las <strong>barandas de acero y vidrio</strong> son la opción insustituible cuando se busca una protección que no obstaculice la vista ni recargue visualmente los espacios.</p>

      <h3>Materiales Resistentes a la Corrosión (Acero AISI 304 / 316)</h3>
      <p>En el clima húmedo de Lima, emplear conectores de acero inoxidable de alta graduación combinado con cristal templado de seguridad de 8mm o 10mm asegura una durabilidad excepcional para <a href="/servicios/baranda">barandas de vidrio</a>.</p>

      <h3>Aplicaciones en Balcones y Terrazas</h3>
      <p>Son perfectas para proyectos residenciales con <a href="/servicios/balcones">balcones de vidrio templado</a>, aportando valorización inmediata a cualquier inmueble.</p>
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

      <h3>Ventajas del Policarbonato Alveolar</h3>
      <p>Es sumamente ligero, económico y ofrece un filtro UV al 99%, lo cual es ideal para estructuras ligeras de aluminio en jardines y cocheras.</p>

      <h3>Elegancia y Claridad con Vidrio Laminado o Templado</h3>
      <p>Para un acabado premium y libre de ruidos en días de garúa, los <a href="/servicios/techo">techos de cristal templado</a> con perfiles de aluminio estructural son inigualables en estética y resistencia. <a href="/contacto">Cotiza tu terraza a medida</a>.</p>
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
      <h2>Por Qué Elegir Ventanas de Aluminio en Lima</h2>
      <p>Las <strong>ventanas de aluminio</strong> son la mejor solución para resistir el paso del tiempo y la humedad costera sin deformarse, hincharse ni perder su tonalidad original.</p>

      <h3>Sistemas Nova, Serie 25, Serie 35 y Serie 62</h3>
      <p>El sistema Nova es muy popular por su excelente hermeticidad y facilidad de mantenimiento. Para requerimientos acústicos más exigentes, la combinación con cristales insulados en <a href="/servicios/ventana">ventanas de aluminio acústicas</a> garantiza un aislamiento inigualable.</p>

      <h3>Cero Mantenimiento y Gran Estanqueidad</h3>
      <p>El aluminio no se oxida, lo que reduce su costo de conservación al mínimo absoluto durante décadas.</p>
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
      <h2>Duchas Modernas, Higiénicas y Seguras</h2>
      <p>El uso de <strong>vidrio templado para duchas</strong> es la forma definitiva de brindar amplitud, higiene impecable y sofisticación a baños residenciales y hoteleros.</p>

      <h3>Espesor de Seguridad Certificado de 8mm</h3>
      <p>Un box de ducha moderno requiere cristales de seguridad de 8mm para garantizar la máxima estabilidad estructural y resistencia al impacto térmico.</p>

      <h3>Sistemas Corredizos KIT de Acero Inoxidable</h3>
      <p>El sistema KIT con riel superior redondo de acero inoxidable es el más cotizado por su estética minimalista y suave desplazamiento. Visita nuestra sección de <a href="/servicios/ducha">puertas y boxes de ducha</a> para coordinar una visita técnica a domicilio.</p>
    `,
  },
  {
    id: "9",
    slug: "ventanas-antirruido-lima-guia-aislamiento-acustico",
    title: "Guía sobre Ventanas de Aluminio y Atenuación Acústica en Lima",
    description: "Guía técnica sobre ventanas de aluminio con atenuación acústica en Lima: qué influye en el confort sonoro según serie, vidrio y sellado.",
    excerpt: "¿El ruido del tráfico afecta el descanso en su vivienda? Conozca cómo funcionan las ventanas de aluminio con atenuación estimada según serie y composición del vidrio.",
    date: "2026-08-01",
    author: "Glass & Aluminum Company S.A.C.",
    image: "/images/services-general-init01.webp",
    tags: ["Atenuación Acústica", "Ventanas de Aluminio", "Vidrio Laminado", "La Molina"],
    content: `
      <h2>¿Cómo reducir el ruido exterior en su vivienda sin promesas irreales?</h2>
      <p>Si su departamento o casa en La Molina, Surco, San Borja, San Isidro o Miraflores colinda con una avenida transitada, es habitual preguntarse qué tipo de cerramiento ofrece un resultado real frente al tráfico, las bocinas y el bullicio urbano. En el mercado local suele emplearse de forma genérica el término comercial "antirruido", aunque en sentido técnico estricto ese calificativo corresponde a sistemas de PVC con cámara múltiple; en carpintería de aluminio, lo correcto y honesto es hablar de <strong>atenuación estimada según serie y composición del vidrio</strong>.</p>
      <p>Comprender esta diferencia le permitirá tomar una decisión informada, evitar expectativas exageradas y elegir una solución acorde al nivel de ruido de su entorno y a las características del vano existente.</p>

      <h2>¿De qué depende realmente la atenuación acústica de una ventana?</h2>
      <p>El sonido se transmite tanto por vibración directa a través del cristal como por las rendijas de aire entre la hoja y el marco. Por eso, cambiar únicamente el espesor del vidrio sin revisar la perfilería ni los empaques rara vez resuelve el problema. El desempeño sonoro de una <a href="/servicios/ventana">ventana de aluminio</a> responde a la interacción de tres componentes principales:</p>
      <ul>
        <li><strong>Composición del vidrio:</strong> Un vidrio crudo monolítico delgado transmite con facilidad las frecuencias graves y medias del tráfico. En cambio, un <strong>vidrio laminado</strong> une dos hojas mediante una interlámina de polivinil butiral (PVB) que amortigua la vibración mecánica del cristal. Otra alternativa es el <strong>vidrio insulado o DVH</strong>, formado por dos hojas separadas por una cámara de aire deshidratado con sellado perimetral hermético, que combina desempeño térmico y atenuación acústica.</li>
        <li><strong>Tipo de apertura y serie de aluminio:</strong> Las ventanas corredizas convencionales dependen de felpas para sellar el perímetro de las hojas móviles, lo que deja una mínima holgura necesaria para el deslizamiento. Las series proyectantes y batientes con burlete de doble contacto perimetral presionan la hoja contra el marco al cerrar, logrando un cierre más hermético frente al aire y al sonido.</li>
        <li><strong>Sellado perimetral e instalación:</strong> Incluso un buen perfil con cristal laminado o insulado pierde eficacia si quedan fisuras entre el marco de aluminio y el muro de concreto, o si los burletes de EPDM y felpas siliconadas están mal ajustados.</li>
      </ul>

      <h3>Vidrio laminado frente a doble vidriado hermético (DVH)</h3>
      <p>Cada composición responde a una necesidad distinta. El vidrio laminado en espesores como 6.38 mm, 8.38 mm o 10.76 mm aporta masa y amortiguamiento interno gracias a su película de PVB, además de retener los fragmentos en caso de rotura. Por su parte, el DVH destaca cuando se busca controlar simultáneamente la transferencia térmica y el ruido, y su espesor total exige series de aluminio con canal o junquillo compatible, como las proyectantes de serie intermedia o las líneas europeas disponibles en el mercado peruano.</p>

      <h3>El papel de la hermeticidad en puertas y mamparas</h3>
      <p>En ambientes integrados hacia terrazas o balcones, no basta con mejorar solo las ventanas del dormitorio si una <a href="/servicios/mampara">mampara de vidrio y aluminio</a> contigua tiene holguras en el traslape central o felpas desgastadas. Evaluar todo el frente expuesto hacia la fuente sonora evita que el ruido ingrese por el punto más débil de la fachada.</p>

      <h2>Cómo decidir la mejor configuración para su proyecto</h2>
      <p>Antes de solicitar un presupuesto, conviene analizar tres variables concretas de su inmueble:</p>
      <ul>
        <li><strong>Exposición al ruido:</strong> No es lo mismo una calle residencial tranquila que un dormitorio orientado hacia una vía rápida o zona comercial. En frentes de baja exposición, una serie corrediza bien sellada con vidrio laminado puede resultar suficiente; en frentes muy expuestos, conviene priorizar sistemas proyectantes, batientes o corredizos perimetrales de mayor sección.</li>
        <li><strong>Capacidad estructural del marco:</strong> Las series livianas para vidrio de 4 mm no admiten cristales laminados gruesos ni paneles insulados. Seleccionar la serie adecuada garantiza que las garruchas, brazos proyectantes y burletes trabajen dentro de su rango nominal sin descuadrarse.</li>
        <li><strong>Ventilación y uso diario:</strong> Una ventana proyectante ofrece mayor presión de cierre, pero abre hacia el exterior en un ángulo acotado. Una corrediza facilita el paso de aire en mayor porcentaje del vano y no invade el espacio interior ni exterior.</li>
      </ul>
      <p>En Glass &amp; Aluminum Company S.A.C. seleccionamos, calculamos, ensamblamos e instalamos cada cerramiento a la medida del vano existente, sin prometer cifras absolutas sin ensayo acústico en obra, sino explicando con claridad qué mejora puede esperar usted según la serie y el cristal elegidos.</p>

      <h2>¿Cuándo llamar a un especialista para evaluar su vivienda?</h2>
      <p>Es recomendable coordinar una visita técnica cuando percibe filtraciones de ruido acompañadas de corrientes de aire, vibración del cristal al paso de vehículos pesados o dificultad para cerrar los seguros. Un especialista revisará la escuadra del vano, el estado del muro, las medidas máximas recomendadas por serie y la compatibilidad de espesores de vidrio antes de definir el despiece.</p>
      <p>Si desea evaluar una renovación de ventanas en La Molina, Surco, San Borja, San Isidro o Miraflores, puede revisar nuestras opciones en <a href="/servicios/ventana">ventanas de aluminio</a> o escribirnos desde nuestra página de <a href="/contacto">contacto</a> para coordinar una inspección técnica a domicilio.</p>
    `,
  },
  {
    id: "10",
    slug: "vidrio-templado-vs-laminado-mamparas-terrazas",
    title: "Vidrio Templado vs. Laminado: ¿Cuál Elegir para Mamparas de Terraza y Balcones?",
    description: "Comparativa técnica entre vidrio templado y vidrio laminado según la Norma Técnica E.040. Seguridad, resistencia y aplicaciones en Lima.",
    excerpt: "Descubre las diferencias clave entre cristal templado y laminado para mamparas y balcones según las normas de construcción peruanas.",
    date: "2026-08-10",
    author: "GYA Company",
    image: "/images/services-general-init02a.webp",
    tags: ["Vidrio Templado", "Vidrio Laminado", "Normas de Seguridad"],
    content: `
      <h2>Seguridad y Resistencia: Comparativa Técnica de Cristales</h2>
      <p>Al diseñar cerramientos para terrazas, salas o balcones, la elección entre <strong>vidrio templado</strong> y <strong>vidrio laminado</strong> es una de las decisiones más importantes para cumplir con el <em>Reglamento Nacional de Edificaciones (Norma E.040 de Vidrio)</em>.</p>

      <h3>1. Vidrio Templado: Máxima Resistencia Estructural</h3>
      <p>El vidrio templado se somete a un tratamiento térmico a más de 650°C seguido de un enfriamiento rápido por aire. Este proceso le otorga:</p>
      <ul>
        <li><strong>Resistencia de 4 a 5 veces superior</strong> al vidrio común frente a presiones de viento e impactos mecánicos.</li>
        <li><strong>Rotura Segura:</strong> En caso de quebrado accidental, se fragmenta en pequeños trozos granulares no cortantes, minimizando riesgos de accidentes graves.</li>
        <li><strong>Ideal para:</strong> <a href="/servicios/mampara">Mamparas de terrazas</a>, <a href="/servicios/ducha">boxes de ducha</a> y <a href="/servicios/pvidrio">puertas de ingreso</a>.</li>
      </ul>

      <h3>2. Vidrio Laminado: Protección Anti-Desprendimiento y Filtro UV</h3>
      <p>El vidrio laminado está formado por dos láminas de vidrio unidas mediante una película intermedia de polivinil butiral (PVB):</p>
      <ul>
        <li><strong>Seguridad Residual:</strong> Si el vidrio se rompe, los fragmentos quedan firmemente adheridos a la lámina de PVB, manteniendo la barrera protectora sin caer al vacío.</li>
        <li><strong>Filtro Acústico y UV:</strong> Bloquea más del 98% de los rayos ultravioleta, protegiendo muebles y cortinas de la decoloración solar.</li>
        <li><strong>Ideal para:</strong> <a href="/servicios/baranda">Barandas en altura</a>, <a href="/servicios/balcones">balcones de pisos altos</a> y <a href="/servicios/techo">techos de cristal</a>.</li>
      </ul>

      <h3>¿Cuál es la Mejor Opción para tu Proyecto?</h3>
      <p>Para mamparas corredizas de terraza recomendamos <strong>cristal templado de 8mm o 10mm</strong> con perfiles Serie Nova. Para cerramientos en pisos altos o barandas sin marco, la combinación de <strong>vidrio templado-laminado</strong> brinda el estándar más alto de seguridad. <a href="/contacto">Contáctanos para evaluar tu proyecto en obra</a>.</p>
    `,
  }
];

export default BLOG_POSTS;
