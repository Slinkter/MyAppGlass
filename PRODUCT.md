# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias principales, con el mismo peso según la última respuesta del dueño:

- **Hogares** que buscan ventanas antirruido, mamparas, duchas o techos para su casa. Llegan casi siempre desde el móvil y desde WhatsApp. Su trabajo: entender qué sistema les conviene y pedir un presupuesto.
- **Constructoras e inmobiliarias** que necesitan la partida de carpintería de aluminio y vidrio para sus obras. Su trabajo: revisar capacidad de suministro, plazos, catálogo técnico y obras terminadas.

> Abierto: el cuestionario indica 75 % de ingreso de constructoras y 20 % de hogares, lo que no encaja con "igual peso". Hay que confirmar cuál audiencia encabeza la página principal.

## Product Purpose

Sitio corporativo de Glass & Aluminum Company S.A.C. (La Molina, Lima). Presenta los servicios y sistemas, muestra obras realizadas y permite pedir presupuesto por formulario o WhatsApp. Éxito: que cada audiencia llegue a un presupuesto o contacto sin fricción.

## Positioning

Visita técnica sin costo y presupuesto rápido por WhatsApp, respaldados por una empresa que ensambla en su taller e instala en casa del cliente. La empresa compra vidrio, aluminio y accesorios a proveedores y no fabrica perfiles ni vidrio, así que no debe presentarse como fabricante.

## Operating Context

- El cliente llega desde WhatsApp y móvil. El presupuesto se pide por formulario `/presupuesto` o se confirma por WhatsApp.
- La hoja de presupuesto impresa es un documento de la empresa (A4, con datos bancarios y firmas).
- El material de proveedores (catálogos en PDF) se usa como fuente de datos técnicos, no de imágenes.

## Capabilities and Constraints

- Sitio estático (Next.js 16, export estático) con formularios de contacto, reclamos y presupuesto en Firebase Functions.
- Catálogo de 6 sistemas, de carácter **provisional**: Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica y PVC abatible. Se actualizará cuando funcione el CRUD de administración.
- Garantía de 3 meses para todos los productos instalados.
- Precio mostrado incluye IGV.
- Teléfono público: WhatsApp 974 278 303.
- Ortografía obligatoria: "antirruido" (doble r) y "vidrio y aluminio" (singular).
- Horario: lunes a sábado, 08:00 a 18:00 (fuente SEO; `company.json` decía 09:00 a 17:00, por confirmar).

## Brand Commitments

- Nombre: Glass & Aluminum Company S.A.C. Línea superior "VIDRIERÍA & ALUMINIO".
- Frase de marca: "Confianza sólida en cada estructura".
- Color de marca: negro `#111111` (decisión vigente del 2026-11-09). Coral del logo solo en el logo. Rojo solo en la palabra "PRESUPUESTO" o en títulos destacados (el dueño lo amplió; regla por confirmar en `DESIGN-SYSTEM.md`).
- Fondo: blanco puro (respuesta del dueño; reemplaza el papel `#F7F6F3` del plan anterior).
- Tipografía: Lora 700 para títulos, Inter para texto.
- Modo oscuro: se conserva.
- Voz: técnica, cercana, profesional. Sin exclamaciones en cadena ni emojis.
- Logo: `apps/web/src/assets/branding/logosvg.svg` (SVG) y `apps/web/public/brand/logo.png`.
- Proveedores: nunca visibles al cliente. Sin fotos ni planos de proveedores (decisión D9).
- Datos de empresa: solo desde `companyData`, nunca escritos a mano.

## Evidence on Hand

- Obras terminadas: hoy solo 2 o 3 proyectos están completos con fotos y álbum. El resto tiene datos pero le faltan fotos. Las fotos se cargarán desde el panel de administración (Firebase Storage y Firestore) cuando esté listo.
- Proyectos de referencia (solo nombres, sin autorización confirmada del cliente): Palmer, Vittorie, Elenor, Maddy, Vidamor y Ventura.
- Fotos de referencia para presupuesto impreso en `docs/gya/fotos-referencia/`. No se usan en la web.
- Casos de presupuesto reales anonimizados en `docs/gya/data/presupuestos-reales.json`.
- No hay testimonios, premios ni certificaciones confirmados. No inventar ninguno.

## Product Principles

- Un solo sistema de diseño: `docs/DESIGN-SYSTEM.md` es la fuente de verdad; el código lo implementa.
- Datos de proveedores pesan más que las suposiciones locales cuando se contradicen.
- Ningún dato faltante se inventa: se deja marcador visible y se pregunta.
- Constructoras y hogares se atienden con el mismo rigor; la página no debe sacrificar a una por la otra.

## Accessibility & Inclusion

- Uso principal desde móvil de 360 px. Targets táctiles de 44 px como mínimo.
- Contraste de 4.5:1 como mínimo en claro y oscuro.
- Respetar `prefers-reduced-motion` y `prefers-reduced-transparency`.
