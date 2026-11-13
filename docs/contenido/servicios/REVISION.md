# Revisión Final de Fichas Técnicas — Catálogo de 13 Servicios

**Rol revisor:** `redactor-tecnico-marca`
**Fecha de revisión:** 2026-11-13
**Alcance:** Validación automatizada y editorial de los 13 archivos JSON en `docs/contenido/servicios/*.json` (Tarea 1.6 de `docs/claude/specs/catalogo-13-servicios/02-FASE-1-fichas-tecnicas.md`).

---

## 1. Checklist de Validación (Tarea 1.6)

- [x] JSON válido y exactamente los 13 slugs esperados (`ventana`, `mampara`, `ducha`, `pvidrio`, `pserie`, `parapeto`, `baranda`, `balcones`, `techo`, `celosias`, `espejos`, `frenos-hidraulicos`, `mantenimiento`).
- [x] 0 apariciones de marcas de la lista negra (`HPD`, `Glassgroup`, `Corporación Corrales`, `Corrales`, `Eduhg`, `Hermeti`, `Maderacor`, `Favitem`, `Alborada`, `La Jolla`, `ISO 9001`, `ISO 45001`).
- [x] 0 apariciones de verbos prohibidos (`fabricamos`, `fabricación`, `producimos`, `manufacturamos`, `importamos`).
- [x] 0 apariciones de `"antirruido"` fuera de contexto PVC (solo aparece en `ventana.json` para aclarar explícitamente que el término aplica exclusivamente a sistemas de PVC).
- [x] 0 porcentajes acústicos presentados como dato absoluto; los porcentajes presentes corresponden únicamente a rechazo solar/UV (`balcones.json`) y transmisión luminosa en policarbonato (`techo.json`).
- [x] 0 URLs de imágenes de terceros (`http://`, `https://`, `unsplash`).
- [x] N-gramas de 8+ palabras: 0 coincidencias en texto público contra `GUIA_PREGUNTAS_RESPUESTAS_VIDRIO_ALUMINIO.md`, `hpd_glass_base_conocimiento.md`, `corporacion_corrales_base_conocimiento.md`, `eduhg_base_conocimiento.md` y `favitem_base_conocimiento.md` (se corrigieron 3 coincidencias detectadas inicialmente en `ventana.json`, `ducha.json` y `espejos.json`).
- [x] Longitudes y cantidades dentro de los límites establecidos (`title` ≤ 45 car., `shortDescription` ≤ 180 car., `fullDescription` 250–400 pal., `specs` 8–15, `features` 5–7, `benefits` 3–4, `systemSheets` 1–5, `faqs` 40–90 pal. por respuesta).
- [x] Cada `specs` incluye al menos una fila con unidad de medida explícita.
- [x] Lista consolidada de `[POR CONFIRMAR]` extraída desde `notasInternas` para revisión del dueño.

> **Nota sobre `systemSheets[].nombre` vs `gallery[].system` de Firestore:** La validación contra los documentos en vivo de Firestore no forma parte de este script local sin conexión a base de datos y queda sujeta a verificación durante la carga/sincronización en Firestore.

---

## 2. Tabla Resumen de los 13 Servicios

| Slug | Título | `title` (ch) | `shortDesc` (ch) | `fullDesc` (pal.) | `specs` | `features` | `benefits` | `systemSheets` | `faqs` (pal./resp.) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `ventana` | Ventanas de aluminio y vidrio | 29 | 146 | 273 | 11 | 6 | 4 | 4 | 10 (53–59) |
| `mampara` | Mamparas de aluminio y vidrio | 29 | 146 | 267 | 10 | 6 | 4 | 2 | 6 (47–61) |
| `ducha` | Boxes de ducha en vidrio templado | 33 | 136 | 261 | 9 | 6 | 4 | 1 | 5 (52–56) |
| `pvidrio` | Puertas de Vidrio Templado | 26 | 152 | 289 | 10 | 6 | 4 | 1 | 4 (64–66) |
| `pserie` | Puertas de Aluminio en Serie | 28 | 142 | 273 | 10 | 6 | 4 | 1 | 3 (56–61) |
| `parapeto` | Parapetos de vidrio y muros cortina | 35 | 144 | 262 | 10 | 6 | 4 | 3 | 4 (53–61) |
| `baranda` | Barandas de vidrio, aluminio y acero | 36 | 128 | 266 | 9 | 6 | 3 | 2 | 4 (48–57) |
| `balcones` | Cerramientos y barandas para balcones | 37 | 143 | 286 | 9 | 6 | 3 | 1 | 3 (47–51) |
| `techo` | Techos sol y sombra de aluminio | 31 | 132 | 269 | 9 | 6 | 3 | 1 | 4 (47–57) |
| `celosias` | Celosías de aluminio y vidrio | 29 | 136 | 261 | 9 | 6 | 3 | 1 | 2 (49–49) |
| `espejos` | Espejos a medida para interiores | 32 | 138 | 259 | 8 | 6 | 4 | 1 | 3 (51–55) |
| `frenos-hidraulicos` | Frenos Hidráulicos y Cierrapuertas | 34 | 152 | 297 | 8 | 6 | 4 | 2 | 4 (48–58) |
| `mantenimiento` | Mantenimiento de vidrio y aluminio | 34 | 148 | 257 | 9 | 6 | 4 | 1 | 4 (51–57) |

---

## 3. Lista Consolidada de `[POR CONFIRMAR]` para el Dueño (37 ítems)

### `ventana`
- Medidas máximas, espesores de vidrio admitidos y ficha de despiece del Sistema Nova (nivel de confianza bajo en H-050).
- Unificación de criterio de espesor de vidrio en Serie 62 (catálogos difieren entre 4 mm a más y 6 a 8 mm según H-043).
- Precio referencial por m², plazo de entrega en días hábiles y condiciones de garantía escrita.

### `mampara`
- Ficha dimensional, espesores de vidrio admitidos y alcance de uso del Sistema Nova en mamparas (H-050).
- Precio por m², plazo de fabricación/entrega en taller y garantía de herrajes.

### `ducha`
- El catálogo local no registra sistemas llamados 'europeo' o 'español' (H-077); se consolida bajo 'Sistema Corredizo'.
- Precio referencial por unidad o m², disponibilidad de acabados negro mate/dorado en kits de ducha y plazo de entrega.

### `pvidrio`
- Precio referencial por unidad instalada y rango comercial vigente.
- Plazo estándar de entrega e instalación desde la aprobación de medidas.
- Condiciones de garantía escrita sobre herrajes y mano de obra.
- Espesor mínimo (8 mm vs 10 mm) para herraje pivotante simple cuando no se usa freno de piso, dado que H-078 registra 6 a 8 mm en catálogo de herrajes y la especificación de puerta de paso indica 10 mm.

### `pserie`
- Precio referencial por unidad instalada según serie y acabado.
- Plazo estándar de ensamblaje e instalación en obra.
- Garantía de perfiles, pintura y cerrajería.
- Uso habitual de perfiles batientes MBT 035 / MBT 036 (H-068, H-069) frente a Serie 35 y Serie 36 en este servicio.

### `parapeto`
- Precio referencial por m² o ml para parapeto y muro cortina.
- Plazo de ejecución y alcance exacto de garantía escrita para envolventes.
- Forma estándar de medición comercial (m² vs ml) en parapetos bajos.

### `baranda`
- (H-099) Grado exacto del acero inoxidable (AISI 304 vs AISI 316) y acabado superficial de los accesorios tubulares.
- Precio por metro lineal según sistema (minimalista empotrada vs tubular).
- Plazo de entrega y condiciones de garantía escrita.

### `balcones`
- Precio referencial por m² / ml y plazo de entrega.
- Alcance de garantía por filtración en cerramientos de balcón expuestos a lluvia directa.

### `techo`
- Disponibilidad exacta y espesor de policarbonato compacto en proveedores locales si el cliente lo solicita.
- Precio referencial por m² según variante (fijo, corredizo o con tensores) y canaleta incluida.
- Plazo de ensamblaje en taller e instalación, y condiciones de garantía contra filtraciones.

### `celosias`
- (H-113) Los catálogos locales no detallan dimensiones ni fichas técnicas específicas de lamas orientadas a ventilación/persianas; confirmar medidas exactas de perfil con proveedor antes de ensamblar.
- Precio referencial por m² y plazo de entrega.
- Condiciones de garantía para mecanismos móviles.

### `espejos`
- Disponibilidad real y precio de espejo de 6 mm en distribuidores locales (en H-115 solo figuran 2, 3 y 4 mm).
- Alcance, maquinaria y precios para biselado, cantos pulidos, formas geométricas y retroiluminación LED (H-116).
- Precio por m², mínimo cobrable y plazo de entrega.

### `frenos-hidraulicos`
- Capacidad máxima exacta en kilogramos y espesor máximo de vidrio para cada modelo de freno de piso (estándar vs reforzado).
- Precio referencial por unidad instalada, recambio de caja y tarifa de regulación/mantenimiento.
- Plazo de atención e instalación y cobertura de garantía.

### `mantenimiento`
- Tarifa fija de visita técnica de diagnóstico y si se descuenta al aprobar el servicio.
- Política de garantía sobre repuestos instalados durante mantenimiento correctivo.

---

**Firma:** `redactor-tecnico-marca`
