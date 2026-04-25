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
    author: "Ing. Roberto García",
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
    author: "Arq. Elena Martínez",
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
];

export default BLOG_POSTS;
