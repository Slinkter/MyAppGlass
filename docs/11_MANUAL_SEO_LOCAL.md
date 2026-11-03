# 🚀 GUÍA Y MANUAL DE SEO LOCAL, SEARCH CONSOLE, GOOGLE BUSINESS PROFILE Y GA4
> **Proyecto:** Glass & Aluminum Company S.A.C. (`https://www.gyacompany.com`)  
> **Objetivo:** Posicionar la web en el **Top 3 de Google** y activar **Sitelinks** para: *"vidriería en la molina"*, *"ventanas antirruido lima"*, *"mamparas de vidrio la molina"*, *"glass & aluminum company"*.  
> **Cuenta Administradora del Ecosistema Google:** `luis.j.cueva@gmail.com` (Google Business Profile, Google Search Console, Google Analytics 4 `G-TY0NJP1S81`, Firebase `gya-app-4c8a9`)  
> **Datos Oficiales NAP (`companyData`):** Dirección **`Av. Los Fresnos 1250 - La Molina`** | WhatsApp **`974 278 303`** | Teléfono **`996-537-435`** | Correo Corporativo Público **`acueva@gyacompany.com`**  
> **Última actualización:** Noviembre 2026

> **Qué está implementado en el código (verificado noviembre 2026):**
> - `apps/web/src/app/sitemap.ts` genera `sitemap.xml` dinámico en build con páginas estáticas (`/`, `/contacto`, `/presupuesto`, `/simulador-ai`, `/blog`, legales), los 10 servicios con prioridad `0.9` en los 5 Sitelinks principales (`ventana`, `mampara`, `baranda`, `techo`, `ducha`), los 10 artículos del blog y los proyectos con **Image Sitemap** (`<image:image>`).
> - `apps/web/src/app/robots.ts` permite el rastreo de `/_next/static/*` para Googlebot, bloquea rutas privadas (`/admin/`, `/auth/`, `/design-system*`, `/servicios/ver`, `/proyectos/ver`), habilita bots IA de búsqueda (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`) y declara `Sitemap: https://www.gyacompany.com/sitemap.xml`.
> - `apps/web/src/shared/utils/seo-utils.ts` inyecta el grafo `@graph` (`WebSite` + `LocalBusiness`/`HomeAndConstructionBusiness` + `ItemList` de `SiteNavigationElement` `#sitelinks`) y construye metadatos canónicos sin títulos duplicados con `buildPageMetadata()`.
> - `apps/web/src/shared/lib/analytics.ts` y `GoogleMetricsProvider.tsx` conectan Firebase / Google Analytics 4 (`G-TY0NJP1S81`) y contenedor opcional GTM (`NEXT_PUBLIC_GTM_ID`).

---

## 📌 Checklist Maestro de Configuración Externa (Consolas de Google)

- [ ] **Fase 1: Google Business Profile (Maps)** con cuenta `luis.j.cueva@gmail.com` y dirección exacta `Av. Los Fresnos 1250 - La Molina`
- [ ] **Fase 2: Redirección Canónica 301 en Firebase Hosting** (`gyacompany.com` → `https://www.gyacompany.com`)
- [ ] **Fase 3: Verificación en Google Search Console, Validación y Envío de `sitemap.xml`**
- [ ] **Fase 4: Consolidación de Google Analytics 4 (`G-TY0NJP1S81`) y Limpieza de Proyectos Antiguos Firebase**
- [ ] **Fase 5: Citas Locales (NAP) y Reseñas Continuas**

---

## 🗺️ FASE 1: Configuración y Actualización de Google Business Profile (Google Maps)
> *Google ubica el bloque de mapas arriba de los resultados orgánicos. La consistencia NAP entre la web (`LocalBusiness` JSON-LD + Footer) y la ficha de Google Maps es el factor #1 de posicionamiento local.*

### Pasos exactos:
1. Ingresa a [Google Business Profile](https://www.google.com/business/) iniciando sesión con la cuenta propietaria **`luis.j.cueva@gmail.com`**.
2. Verifica o actualiza el **Nombre del Negocio**:
   > **`Glass & Aluminum Company S.A.C.`** *(o `Glass & Aluminum Company S.A.C. - Vidriería en La Molina`)*
3. **Categoría principal:** `Tienda de cristales` o `Contratista de ventanales` (Categorías secundarias: `Carpintería metálica y de aluminio`, `Proveedor de ventanas`).
4. **Dirección física oficial (NAP 100% idéntico a `companyData` y Schema.org):**
   - **Dirección:** `Av. Los Fresnos 1250 - La Molina` *(Nota: NO usar la dirección antigua de Ficha RUC 2022 ni numeraciones anteriores).*
   - **Distrito / Ciudad / Código Postal:** `La Molina, Lima 15024 - Perú`
   - **Coordenadas de referencia:** `-12.0867, -76.9315`
5. **Teléfonos y Contacto:**
   - **Teléfono principal / WhatsApp:** `+51 974 278 303`
   - **Teléfono secundario:** `996-537-435`
   - **Sitio web:** `https://www.gyacompany.com`
   - *(Nota sobre correo público en la web: se mantiene `acueva@gyacompany.com` en el sitio y JSON-LD mientras la migración de Resend + DNS sigue en evaluación).*
6. **Horario de atención (sincronizado con `OpeningHoursSpecification`):**
   - **Lunes a Sábado:** `08:00 – 18:00` (`8:00 am – 6:00 pm`)
   - **Domingo:** Cerrado
7. **Servicios destacados a cargar en la ficha:**
   - Ventanas antirruido (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`)
   - Mamparas de vidrio templado
   - Boxes y puertas de ducha
   - Barandas de vidrio y acero inoxidable
   - Techos de policarbonato y sol y sombra

---

## 🔗 FASE 2: Redirección Canónica 301 (`gyacompany.com` → `www.gyacompany.com`)
> *Actualmente tanto `https://gyacompany.com` como `https://www.gyacompany.com` responden `HTTP 200`. Configurar el redirect 301 consolida toda la autoridad de dominio y acelera los Sitelinks.*

### Configuración en Firebase Console:
1. Ingresa a [Firebase Console](https://console.firebase.google.com/) con **`luis.j.cueva@gmail.com`**.
2. Selecciona el proyecto activo **`GYA-App` (`gya-app-4c8a9`)** → menú lateral **Hosting**.
3. En la sección **Dominios personalizados**, ubica el dominio raíz `gyacompany.com`.
4. Haz clic en los 3 puntos verticales → **Editar / Redireccionar** y configura una **Redirección 301 permanente** hacia **`https://www.gyacompany.com`**.

---

## 🔍 FASE 3: Guía de Verificación en Google Search Console y Envío de `sitemap.xml`
> *Guía paso a paso para validar, probar y enviar el nuevo `sitemap.xml` y activar el rastreo de las rutas clave de Sitelinks.*

### Paso 3.1: Alta y Verificación de Propiedad
1. Ingresa a [Google Search Console](https://search.google.com/search-console) con **`luis.j.cueva@gmail.com`**.
2. Crea o selecciona la propiedad de **Dominio** (`gyacompany.com`) o **Prefijo de URL** (`https://www.gyacompany.com`):
   - **Opción A (Recomendada - DNS):** Verifica mediante registro TXT en el proveedor de dominio.
   - **Opción B (Meta Tag HTML ya soportado en código):** Copia el token de verificación HTML y defínelo en `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` antes de compilar (`apps/web/src/app/layout.tsx` inyecta automáticamente `<meta name="google-site-verification" content="..." />`).

### Paso 3.2: Validación Previa del Sitemap y Robots en Producción
Antes de enviarlo en Search Console, verifica que las rutas respondan `200 OK` y contengan las URLs canónicas:
```bash
# 1. Verificar robots.txt (debe permitir /_next/ y declarar Sitemap)
curl -I https://www.gyacompany.com/robots.txt
curl -s https://www.gyacompany.com/robots.txt

# 2. Verificar cabeceras y estructura XML de sitemap.xml
curl -I https://www.gyacompany.com/sitemap.xml
curl -s https://www.gyacompany.com/sitemap.xml | head -n 40
```

### Paso 3.3: Envío del `sitemap.xml` en Search Console
1. En el menú lateral izquierdo de Search Console, entra a **Indexación → Sitemaps**.
2. En el campo **"Añadir un nuevo sitemap"**, ingresa:
   ```text
   https://www.gyacompany.com/sitemap.xml
   ```
3. Haz clic en **Enviar** y verifica que el estado cambie a **`Correcto` (Success)** y que el número de URLs e imágenes descubiertas coincida con el export estático (~37 URLs públicas).

### Paso 3.4: Inspección de URLs y Solicitud de Indexación Prioritaria (Sitelinks)
Usa la barra superior **"Inspeccionar cualquier URL de `https://www.gyacompany.com/`"**, ejecuta **"Probar URL publicada"** (verifica que Googlebot cargue CSS/JS sin bloqueo de `/_next/` y detecte los schemas `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Service` y `FAQPage`) y haz clic en **"Solicitar indexación"** para estas 7 URLs en orden:
1. `https://www.gyacompany.com/` *(Home - actualiza el grafo `WebSite` + `SiteNavigationElement` `#sitelinks`)*
2. `https://www.gyacompany.com/servicios/ventana` *(Prioridad Sitelink 1: Ventanas Antirruido)*
3. `https://www.gyacompany.com/servicios/mampara` *(Prioridad Sitelink 2: Mamparas de Vidrio Templado)*
4. `https://www.gyacompany.com/servicios/baranda` *(Prioridad Sitelink 3: Barandas de Vidrio y Acero)*
5. `https://www.gyacompany.com/servicios/techo` *(Prioridad Sitelink 4: Techos de Policarbonato)*
6. `https://www.gyacompany.com/servicios/ducha` *(Prioridad Sitelink 5: Boxes y Puertas de Ducha)*
7. `https://www.gyacompany.com/contacto` y `https://www.gyacompany.com/presupuesto` *(Conversión directa)*

---

## 📊 FASE 4: Consolidación de Google Analytics 4 (`G-TY0NJP1S81`) y Proyectos Firebase
> *El frontend (`apps/web/src/shared/lib/analytics.ts` + `GoogleMetricsProvider.tsx`) ya envía eventos `page_view` y conversiones al flujo `G-TY0NJP1S81` del proyecto `gya-app-4c8a9`.*

1. **Vinculación GA4 ↔ Search Console:**
   - En [Google Analytics 4](https://analytics.google.com/) (cuenta `luis.j.cueva@gmail.com`, propiedad vinculada a `G-TY0NJP1S81`) → **Administrar → Vinculaciones con otros productos → Vinculaciones con Search Console**, vincula la propiedad `https://www.gyacompany.com` para ver consultas orgánicas dentro de GA4.
2. **Desvinculación de proyectos Firebase antiguos (previo a su eliminación futura):**
   - Los proyectos históricos (`vcrapp-993e5`, `gya-reclamos` y el tercer proyecto antiguo de pruebas) ya fueron retirados de `.firebaserc`.
   - En Firebase Console → Configuración del proyecto → **Integraciones → Google Analytics**, asegúrate de que solo **`GYA-App` (`gya-app-4c8a9`)** esté vinculado a la propiedad GA4 `G-TY0NJP1S81` antes de programar la eliminación definitiva de los 3 proyectos antiguos.

---

## 🌐 FASE 5: Citas Locales (Backlinks) y Seguimiento Mensual
1. **Perfiles y Directorios con NAP idéntico (`Av. Los Fresnos 1250 - La Molina`, `974 278 303`, `https://www.gyacompany.com`):**
   - Facebook Business Page (`/gyacompany`), Instagram (`@gyacompany`), TikTok (`@gyacompany`), Waze Local y Páginas Amarillas Perú.
2. **Métricas clave a revisar mensualmente en Search Console y GA4:**
   - **Rendimiento → Consultas:** Impresiones, clics y CTR para *"vidriería en la molina"*, *"ventanas antirruido lima"*, *"mamparas de vidrio templado"*.
   - **Indexación → Páginas:** Confirmar 0 errores de bloqueo CSS/JS y 0 páginas privadas (`/admin`, `/auth`, `/servicios/ver`, `/proyectos/ver`) indexadas.
   - **Mejoras / Datos estructurados:** Validar `LocalBusiness`, `BreadcrumbList`, `FAQPage` y `Product`/`Service` sin advertencias.
