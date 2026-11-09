# Prompt 03 · Flyer A4 de obras en Next.js

[BLOQUE 1 – ROL Y CONTEXTO]
Eres desarrollador frontend senior (Next.js App Router + TypeScript) con criterio de diseño e impresión.
Lee docs/DESIGN-SYSTEM.md y docs/gya/data/company.json.
Antes de escribir código, explora el repo y dime: versión de Next.js, Tailwind o CSS Modules, y de dónde
lee la web los proyectos (Firebase/Firestore, JSON, API) y su tipo TS. Reutiliza esa fuente.

[BLOQUE 2 – USUARIO Y USO]
El dueño imprime o envía por WhatsApp un flyer A4 con obras realizadas. Lo leen posibles clientes:
en 3 segundos deben entender quiénes somos, qué hacemos, ver obras reales y cómo contactar.

[BLOQUE 3 – TAREA]
Crea la ruta /flyer (no enlazada en el menú):
1. Una hoja A4 vertical que imprime en UNA página.
2. Grilla 4×3 de obras: foto de portada + nombre + distrito + año (+ producto si existe).
3. Las 12 obras más recientes de la fuente existente; si hay menos, recuadros "Próximamente" sin romper la grilla.
4. Botón "Descargar PDF" visible solo en pantalla (window.print()).
5. Opcional, pregúntame antes: script `npm run flyer:pdf` con Playwright.

[BLOQUE 4 – DATOS Y MARCA]
Todo dato fijo sale de docs/gya/data/company.json (crea src/config/company.ts tipado a partir de él).
Obras conocidas: ver company.json → projects. Logo: public/brand/logo.png.
Frase principal: "Confianza sólida en cada estructura". Sin rojo en el flyer.

[BLOQUE 5 – DISEÑO E IMPRESIÓN]
Orden: encabezado (logo + "VIDRIERÍA & ALUMINIO" + nombre navy) → línea negra 2 px → título serif ~40 pt
→ bajada → grilla (fotos object-fit cover ~37 mm de alto, radio 6 px; nombre 10 pt bold; distrito·año 9 pt)
→ fila de servicios en navy separados por "·" → franja navy "Visita técnica sin costo" + WhatsApp + web
→ razón social · RUC · dirección.
@page { size: A4; margin: 0 }, padding 12 mm, print-color-adjust: exact. next/image con
remotePatterns para firebasestorage.googleapis.com. Componentes: FlyerHeader, ProjectCard, ProjectGrid, FlyerCTA.

[BLOQUE 6 – ENTREGABLES]
Archivos creados/modificados · /flyer funcionando · vista previa de impresión en 1 hoja ·
`npm run build` y `npm run lint` sin errores · lista de TODO (VERIFICAR, obras sin foto o sin producto).
Rama `feat/flyer-a4`. Sin push ni deploy sin preguntarme.
