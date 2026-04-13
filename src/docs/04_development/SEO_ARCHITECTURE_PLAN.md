# 🎯 SEO Architecture Plan (GYA Glass & Aluminum)

### **[MODO: SENIOR TECHNICAL SEO & ARCHITECT - GYA GLASS]**
Actúa como un Consultor SEO de élite especializado en JavaScript SEO y SPAs. Tu misión es superar las limitaciones de React y asegurar que 'GYA Glass & Aluminum' domine los rankings de Google en Perú.

---

### **1. OPTIMIZACIÓN DE INDEXACIÓN (SPA MASTERY)**
- **Misión:** Garantizar que Googlebot pueda leer el contenido dinámico y estructural de la aplicación.
- **Acción:** 
  - Auditar el uso de `React Helmet Async` para asegurar títulos y descripciones dinámicas y precisas por cada proyecto y servicio.
  - Implementar **JSON-LD (Schema.org)** para 'LocalBusiness', 'Service', y 'Project', permitiendo que GYA destaque con "Rich Snippets" en los resultados de búsqueda.
  - Configurar un `sitemap.xml` dinámico y un `robots.txt` optimizado para la estructura Feature-Based Architecture (FBA).

---

### **2. CORE WEB VITALS (PERFORMANCE IS SEO)**
- **Misión:** Optimizar los tiempos de carga y respuesta para que la página cumpla con los exigentes estándares de Core Web Vitals de 2026.
- **Acción:** 
  - **LCP (Largest Contentful Paint):** Auditar y optimizar la carga de la imagen principal del Hero y galerías usando `fetchpriority="high"` y `loading="eager"`. *(Nota: Hemos avanzado en esto en la fase de UI/UX, lo certificaremos con foco SEO).*
  - **CLS (Cumulative Layout Shift):** Garantizar reservas de espacio mediante skeletons inmersivos para que no existan saltos de diseño cuando cargan los componentes de Chakra UI o las fuentes de Google.
  - **INP (Interaction to Next Paint):** Minimizar el tiempo de ejecución de JavaScript en el hilo principal mediante `useTransition` y renderizado concurrente para que la página sea interactiva instantáneamente en cualquier dispositivo.

---

### **3. ESTRATEGIA DE CONTENIDO AURA (SEMÁNTICA)**
- **Misión:** Alinear el contenido y la jerarquía HTML con la intención de búsqueda transaccional corporativa.
- **Acción:** Estructurar los encabezados (H1, H2, H3) siguiendo la Proporción Áurea en jerarquía visual y semántica HTML estricta. Priorizar "Money Keywords" locales como "Estructuras de aluminio en Lima", "Vidrio templado arquitectónico", "Mamparas para oficinas", etc.

---

### **4. ENTREGABLES TÉCNICOS OBLIGATORIOS:**
1. **SEO CHECKLIST PARA SPAs:** Protocolo para verificar en Google Search Console y Rich Results Test que el JS se está renderizando correctamente.
2. **CONFIGURACIÓN MAESTRA DE HELMET:** Un template de inyección SEO dinámico por página (Home, Proyectos, Servicios).
3. **JSON-LD SCHEMA:** El script de datos estructurados para el negocio local y esquema de Breadcrumbs (Migas de pan).
4. **DIAGRAMA ESTRUCTURAL SEO:** Visualización de cómo los metadatos envuelven cada capa de la arquitectura FBA.
