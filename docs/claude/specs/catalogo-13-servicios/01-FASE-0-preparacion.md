# Fase 0 — Preparación

**Objetivo:** dejar listas las herramientas de contenido (perfiles de agente, reglas y placeholders)
antes de escribir una sola ficha técnica.

**Duración estimada:** 0.5 día.
**Depende de:** nada.
**Agente ejecutor:** `general` (creación de perfiles y guía) + `frontend-fsd` (script de imágenes).

---

## Tarea 0.1 — Crear `docs/negocio/reglas-de-contenido.md`

Copia literal de la sección "Reglas del negocio" del `00-INDICE.md`, más:

- Tabla de vocabulario con "se dice / no se dice".
- Lista de marcas prohibidas.
- Ejemplos de reescritura:

| No se dice | Se dice |
| --- | --- |
| "Fabricamos vidrio templado de alta calidad" | "Seleccionamos y ensamblamos vidrio templado para cada proyecto" |
| "Ventanas antirruido Serie 25" | "Ventanas de aluminio Serie 25 con atenuación acústica" |
| "Certificación ISO 9001" | (se omite) |
| "Importamos perfiles europeos" | "Perfilería de línea europea disponible en el mercado peruano" |
| "Aislamiento del 80 %" | "Atenuación estimada según serie y composición del vidrio" |

**Aceptación:** existe el archivo y los cuatro perfiles de agente lo citan como fuente.

---

## Tarea 0.2 a 0.5 — Crear los cuatro perfiles de agente

Ubicación: `.opencode/agents/<nombre>.md`. Formato idéntico a `frontend-fsd.md`
(frontmatter YAML + cuerpo en español). `mode: subagent`.

### 0.2 `arquitecto-vidrieria.md`

```markdown
---
description: >
  Arquitecto especializado en envolvente de vidrio y aluminio para MyAppGlass.
  Redacta la parte de diseño de las fichas técnicas de servicios: muro cortina,
  techos sol y sombra, celosías, barandas, parapetos y balcones. Conoce criterios
  de proporción, orientación solar, ventilación y uso por tipología. Escribe
  contenido original en español peruano, sin mencionar proveedores ni marcas, y
  sin afirmar que la empresa fabrica o importa. Usalo para redactar o revisar
  fichas de servicios donde el criterio de diseño es el eje.
mode: subagent
color: "#0ea5e9"
---

# Arquitecto de vidriería y aluminio

## Rol
Redactas la parte de diseño arquitectónico de cada servicio.

## Reglas duras
- La empresa NO fabrica, NO importa: compra a proveedores, ensambla e instala.
- Prohibido nombrar proveedores, marcas, certificaciones o proyectos de terceros.
- Prohibido "antirruido" aplicado a aluminio (solo PVC).
- Si falta un dato técnico, escribe `[POR CONFIRMAR]` y anótalo al final.

## Fuentes
- `docs/negocio/reglas-de-contenido.md`
- `docs/proveedores/matriz-hechos.md` (lo produce el curador)
- API local `http://localhost:8000/asistente/documentos/*` (solo lectura de hechos)

## Salida
Markdown con: `title`, `shortDescription`, `fullDescription`, `specs`, `features`,
`benefits`, `systemSheets`, `faqs`, `notas-internas`. Sin HTML.
```

### 0.3 `ingeniero-civil-vidrieria.md`

Mismo esqueleto. Rol: ingeniero civil/estructuras. Escribe espesores de vidrio por luz y uso, tipo
de anclaje, fijaciones, cargas de viento, deflexión, seguridad y sellado estructural. Servicios:
barandas, parapetos, muro cortina, puertas de vidrio, frenos hidráulicos. Regla extra: toda cifra
debe poder rastrearse a la matriz de hechos; si no, `[POR CONFIRMAR]`.

### 0.4 `disenador-interiores-vidrieria.md`

Mismo esqueleto. Rol: diseñador de interiores. Servicios: mamparas, boxes de ducha, espejos,
puertas interiores, mantenimiento. Escribe medidas típicas, acabados, percepción de espacio,
limpieza y cuidado.

### 0.5 `redactor-tecnico-marca.md`

Mismo esqueleto. Rol: editor final. Recibe los tres borradores y produce **una sola voz**.

Debe incluir explícitamente:
- Filtro de marcas (lista del índice).
- Filtro de verbos prohibidos.
- Chequeo de n-gramas de 8+ palabras contra los 4 documentos.
- Ajuste de longitudes: `title` ≤ 45 caracteres, `shortDescription` ≤ 180, `fullDescription` 250–400
  palabras.
- Formato de salida JSON listo para Firestore.

**Aceptación de 0.2–0.5:** los cuatro aparecen en la lista de subagentes y cada uno cita
`docs/negocio/reglas-de-contenido.md`.

---

## Tarea 0.6 — Generar 13 imágenes placeholder

**Archivo:** `scripts/generate-service-placeholders.mjs`

**Requisitos:**

- Usa `sharp` (ya está en `package.json` raíz).
- Genera, por cada slug del catálogo, `apps/web/public/images/services/{slug}-placeholder.webp`.
- Dimensiones 1200×800, `quality: 82`.
- Diseño: fondo `#111214`, retícula tenue `#2A2D31`, barra coral `#FF5A5F` de 8 px en el borde
  superior, nombre del servicio en blanco (`#F5F5F5`) centrado y la leyenda
  "Imagen referencial · GYA Company" en gris (`#9CA3AF`).
- El texto se compone como SVG y se rasteriza con `sharp` (no dependas de fuentes del sistema).
- El script acepta `--out` y `--only=slug1,slug2` para regenerar uno solo.
- Debe imprimir la ruta y el peso de cada archivo.

**Slugs:** `ventana, mampara, ducha, pvidrio, pserie, parapeto, baranda, balcones, techo, celosias,
espejos, frenos-hidraulicos, mantenimiento`.

**Uso:** solo los tres servicios nuevos usan placeholder como `coverImage`. Los 10 publicados
conservan su `cover.webp` de Firebase Storage. `shared/utils/imageLoader.ts` devuelve rutas locales
sin transformar, así que no hay que tocarlo.

**Aceptación:**
- 13 archivos existen y pesan menos de 80 KB cada uno.
- Se ven correctamente en una página de prueba con `next/image`.
- `pnpm run build` no emite warnings nuevos por estas imágenes.

---

## Checklist de cierre de fase

- [ ] `docs/negocio/reglas-de-contenido.md` creado.
- [ ] 4 perfiles de agente creados y visibles.
- [ ] 13 placeholders generados.
- [ ] `pnpm run typecheck && pnpm run lint` sin errores nuevos.
