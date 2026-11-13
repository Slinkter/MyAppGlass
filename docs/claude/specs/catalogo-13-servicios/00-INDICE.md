# Catálogo de 13 servicios — Índice maestro

> **Para el agente que ejecuta:** lee este archivo completo antes de tocar nada. Luego abre el
> archivo de la fase que te toque. Cada fase es autónoma, tiene tareas con ID y criterios de
> aceptación verificables. No inventes datos: si falta algo, escribe `[POR CONFIRMAR]` y anótalo.

---

## Decisiones ya tomadas por el dueño (no re-preguntar)

| Punto | Decisión |
| --- | --- |
| Home `#servicios` | Muestra **las 13 tarjetas de golpe** (sin scroll progresivo). |
| Ficha técnica | Se **carga por script**; el dueño solo edita textos después. |
| Blog | Pasa a **Firestore** para poder editarlo desde `/admin`. |
| Atenuación acústica | Se publica como **"atenuación estimada"**, nunca como "antirruido" ni como cifra absoluta. |
| Precios | Los servicios sin tarifa muestran **"Precio a definir"**. |
| Servicios | **13 categorías** por ahora; el modelo debe permitir crecer. |

---

## Reglas del negocio (aplican a TODO el contenido)

| Regla | Consecuencia |
| --- | --- |
| La empresa **no fabrica** vidrio ni perfiles | Prohibido "fabricamos", "producimos", "manufacturamos". Usar: **seleccionamos, calculamos, ensamblamos, instalamos**. |
| La empresa **no importa** | Se dice "productos importados disponibles en el mercado peruano". Nunca "importamos". |
| **Compra a proveedores** y vende al cliente final | El cliente nunca ve proveedores, marcas, catálogos ni certificaciones de terceros. |
| Solo **ensambla e instala** | La ficha describe el sistema constructivo, no una planta de producción. |
| Certificaciones de proveedor **no son nuestras** | Prohibido ISO 9001/45001, "certificado", "marca líder", proyectos de terceros. |
| **"Antirruido" = solo PVC** | El aluminio se describe como "atenuación acústica según serie y composición del vidrio". |
| Datos faltantes | `[POR CONFIRMAR]` en el borrador interno; "Precio a definir" en lo público. |

**Vocabulario oficial:** `antirruido` (doble r, solo PVC) · `vidrio y aluminio` (singular) ·
`celosías` · `frenos hidráulicos` · `mantenimiento` (singular) · `boxes de ducha`.

**Trato al cliente:** de usted. Empresa fundada en 2021, 4 personas, no fabrica.
Zona de proyectos: La Molina, Surco, San Borja, San Isidro y Miraflores.

---

## Catálogo final (13 servicios, orden 1–13)

| # | slug | Título público | Estado actual |
| --- | --- | --- | --- |
| 1 | `ventana` | Ventanas | Publicado, ord. 1 |
| 2 | `mampara` | Mamparas | Publicado, ord. 2 |
| 3 | `ducha` | Boxes de ducha | Publicado, ord. 3 |
| 4 | `pvidrio` | Puertas de vidrio | Publicado, ord. 8 → **4** |
| 5 | `pserie` | Puertas de aluminio | Publicado, ord. 9 → **5** |
| 6 | `parapeto` | Parapetos y muros cortina | Publicado, ord. 4 → **6** |
| 7 | `baranda` | Barandas de acero y aluminio | Publicado, ord. 5 → **7** |
| 8 | `balcones` | Balcones | Publicado, ord. 6 → **8** |
| 9 | `techo` | Techos sol y sombra | Publicado, ord. 7 → **9** |
| 10 | `celosias` | Celosías de aluminio | Publicado, ord. 10 |
| 11 | `espejos` | Espejos | **Solo en código** |
| 12 | `frenos-hidraulicos` | Frenos hidráulicos para puertas | **Solo en código** |
| 13 | `mantenimiento` | Mantenimiento en general | **Solo en código** |

### Precisiones por servicio

- **Barandas (7):** estructura y pasamanos en **aluminio o acero inoxidable**, con vidrio templado
  fijado por accesorios mecánicos (botones, arañas, perfil U, pasamanos). Servicio mixto metal + vidrio.
- **Techos sol y sombra (9):** nombre comercial peruano. Estructura de aluminio + cobertura de
  **policarbonato alveolar** (variantes compacto, lamas/celosías, tensores). Los catálogos del
  proveedor solo dicen "Policarbonato Alveolar"; "sol y sombra" es el término de mercado.
- **Puertas de vidrio (4):** puerta simple de vidrio templado para vivienda, baño o local.
- **Frenos hidráulicos (12):** servicio propio para frenos de piso y bisagras aéreas de **puertas de
  vidrio de fachada** en edificios, oficinas y hoteles. Incluye zócalos, pivotes y cierrapuertas.

---

## Fases y orden de ejecución

| Fase | Archivo | Contenido | Depende de |
| --- | --- | --- | --- |
| 0 | `01-FASE-0-preparacion.md` | Perfiles de agente, reglas de contenido, 13 placeholders | — |
| 1 | `02-FASE-1-fichas-tecnicas.md` | Matriz de hechos + 13 fichas técnicas | Fase 0 |
| 2 | `03-FASE-2-firestore-servicios.md` | Modelo, seed de 3 servicios, orden y textos | Fase 1 |
| 3 | `04-FASE-3-frontend-servicios.md` | Modal, ficha en página, navbar, copy "antirruido", 13 tarjetas | Fase 2 |
| 4 | `05-FASE-4-blog-firestore.md` | Blog a Firestore + 6 artículos originales | Fase 3 |
| 5 | `06-FASE-5-qa-publicacion.md` | Gates, revisión, despliegue | Fase 4 |

---

## Fuentes de información (solo lectura, uso interno)

```
GET http://localhost:8000/asistente/documentos/hpd_glass_blogs
GET http://localhost:8000/asistente/documentos/guia_preguntas_respuestas
GET http://localhost:8000/asistente/documentos/hpd_glass
GET http://localhost:8000/asistente/documentos/corporacion_corrales
GET http://localhost:8000/sistemas
GET http://localhost:8000/sistemas/{codigo}
GET http://localhost:8000/productos
```

**Advertencia:** `guia_preguntas_respuestas` tiene 300 preguntas, pero **261 son consultas de SKU o
proveedor** ("¿qué producto corresponde al código 03CF00031 de corporacion_corrales?"). Solo ~39 son
conceptuales. Traduce los hechos; **no copies preguntas ni respuestas**.

---

## Filtros obligatorios antes de publicar contenido

1. **Marcas prohibidas:** `HPD`, `Glassgroup`, `Corporación Corrales`, `Corrales`, `Eduhg`,
   `Hermeti`, `Maderacor`, `Favitem`, `Alborada`, `La Jolla`, `ISO 9001`, `ISO 45001`.
   *Excepción:* nombres genéricos de sistema del mercado peruano (Serie 20, Serie 25, Serie 3831,
   Muro Cortina, sol y sombra).
2. **Verbos prohibidos:** fabricamos, fabricación, producimos, manufacturamos, importamos.
3. **Certificaciones:** ninguna propia ni heredada.
4. **Imágenes:** solo propias (`apps/web/public/images/**`) o placeholders generados. Nunca URLs de
   proveedor ni Unsplash en contenido nuevo.
5. **Copia:** ninguna secuencia de 8+ palabras puede coincidir con los documentos fuente.

---

## Gates de calidad (obligatorios al cerrar cada fase de código)

```bash
pnpm run typecheck && pnpm run lint && pnpm run build
```

- No ejecutar `test:run` salvo pedido explícito del dueño.
- No tocar `apps/functions` (backend congelado).
- No mover `firebase.json`, `firestore.rules`, `storage.rules`, configs de Next/TS.
