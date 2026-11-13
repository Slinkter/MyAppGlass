# Fase 1 — Matriz de hechos y fichas técnicas

**Objetivo:** producir 13 fichas técnicas originales, verificables y publicables, una por servicio.

**Duración estimada:** 2–3 días.
**Depende de:** Fase 0.
**Agentes:** `curador-proveedores` (o `general`), `arquitecto-vidrieria`,
`ingeniero-civil-vidrieria`, `disenador-interiores-vidrieria`, `redactor-tecnico-marca`.

---

## Tarea 1.1 — Matriz de hechos

**Archivo:** `docs/proveedores/matriz-hechos.md`

Descarga los 4 documentos y extrae **solo hechos**. Formato de tabla:

| ID | Hecho (1 frase) | Servicio(s) | Fuente | Sección/línea | Nivel de confianza |
| --- | --- | --- | --- | --- | --- |
| H-001 | El vidrio templado se calienta a ~650 °C y se enfría bruscamente | ducha, pvidrio | guia_preguntas_respuestas | Pregunta 2 | alto |
| H-002 | Espesores de espejo comercial: 3, 4, 5 y 6 mm | espejos | guia_preguntas_respuestas | Pregunta 16 | alto |
| H-003 | La línea de frenos de piso incluye modelos estándar y reforzados | frenos-hidraulicos | corporacion_corrales | "FRENOS HIDRAULICOS" | alto |

Reglas:
- Prohibido pegar párrafos: cada fila es un hecho atómico.
- "Nivel de confianza": `alto` (dato explícito), `medio` (inferido de dos fuentes), `bajo`
  (una sola mención). Los `bajo` no se publican sin confirmación.
- Toda cifra publicada en una ficha debe tener fila aquí.

**Aceptación:** ≥ 120 hechos, todos con fuente identificable, sin nombres de proveedor en la
columna "Hecho".

---

## Tarea 1.2 — Estructura obligatoria de cada ficha

**Ubicación:** `docs/contenido/servicios/{slug}.md` (borrador) → `{slug}.json` (final).

```json
{
  "slug": "baranda",
  "title": "Barandas de acero y aluminio",
  "shortDescription": "Máx. 180 caracteres, orientada al beneficio.",
  "fullDescription": "250–400 palabras, 3–5 párrafos cortos.",
  "specs": [
    { "grupo": "Estructura", "label": "Material", "value": "Aluminio estructural o acero inoxidable AISI 304" },
    { "grupo": "Vidrio", "label": "Espesor", "value": "10 mm templado (8 mm en tramos cortos)" }
  ],
  "features": ["5 a 7 viñetas cortas"],
  "benefits": ["3 a 4 viñetas orientadas al cliente"],
  "systemSheets": [
    {
      "nombre": "Debe coincidir con gallery[].system",
      "resumen": "2–3 frases",
      "specs": [{ "label": "…", "value": "…" }],
      "usos": ["Escaleras interiores", "Terrazas"]
    }
  ],
  "faqs": [{ "question": "…", "answer": "Respuesta autosuficiente de 2–4 frases." }],
  "notasInternas": ["Qué se tomó de qué fuente", "Qué quedó [POR CONFIRMAR]"]
}
```

### Límites duros

| Campo | Límite |
| --- | --- |
| `title` | ≤ 45 caracteres |
| `shortDescription` | ≤ 180 caracteres |
| `fullDescription` | 250–400 palabras |
| `specs` | 8–15 filas |
| `features` | 5–7 |
| `benefits` | 3–4 |
| `systemSheets` | 1 por sistema real; mínimo 1, máximo 5 |
| `faqs` | 3–6; respuesta 40–90 palabras |

### Reglas de redacción

1. Segunda persona formal ("su proyecto", "su vivienda"); nunca "tú".
2. Primera persona plural solo para acciones propias: "seleccionamos", "ensamblamos", "instalamos".
3. Cada `specs.value` es un dato: número + unidad + condición. Nada de adjetivos.
4. Cada FAQ debe funcionar sola, porque se publica en `FAQPage` de Google.
5. Si falta precio, plazo o garantía: `"Precio a definir"` en lo público, `[POR CONFIRMAR]` en notas.
6. Nada de comparaciones con competidores ni promesas absolutas ("el mejor", "garantizado").

---

## Tarea 1.3 — Reparto por servicio

### Grupo A — Envolvente y estructura (líder: `arquitecto-vidrieria`)

| # | slug | Sistemas que la respaldan | Ejes del texto | FAQ |
| --- | --- | --- | --- | --- |
| 6 | `parapeto` | `BARANDA_PARAPETO_CORRALES/HPD`, `MCF-034`, `MCF-045`, `MCS-034` | Diferencia parapeto / baranda / muro cortina; Stick vs Frame vs unitizado; anclaje y junta | 4 |
| 7 | `baranda` | `BARANDA_PARAPETO_CORRALES/HPD` + accesorios de acero | Aluminio vs acero inoxidable; vidrio con botones/arañas/perfil U; pasamanos | 4 |
| 8 | `balcones` | Sin sistema propio (perfilería + vidrio) | Cerramiento vs baranda; arenado decorativo; normativa de copropiedad | 3 |
| 9 | `techo` | `TECHO_POLICARBONATO_CORRALES` | **"Sol y sombra" como nombre comercial**; alveolar vs compacto; inclinación, canaleta, UV, condensación | 4 |
| 10 | `celosias` | `CELOSIA_LAMAS_HPD` | Ventilación, privacidad, control solar; fija vs móvil | 2 |

### Grupo B — Vidrio estructural y herrajes (líder: `ingeniero-civil-vidrieria`)

| # | slug | Sistemas | Ejes | FAQ |
| --- | --- | --- | --- | --- |
| 4 | `pvidrio` | `PUERTA_VIDRIO_SEVAX_DORMA`, `PUERTA_VIDRIO_HPD` | Puerta simple de vidrio templado para vivienda/baño/local; espesor 10 mm; herrajes | 4 |
| 5 | `pserie` | `SERIE_35`, `SERIE_36` | Puerta batiente de aluminio; diferencia con puerta de vidrio; uso interior/exterior | 3 |
| 12 | `frenos-hidraulicos` | Accesorios de `PUERTA_VIDRIO_*` | Freno de piso y bisagra aérea para **fachada** de edificios, oficinas y hoteles; doble velocidad; mantenimiento | 4 |

### Grupo C — Interior y servicio técnico (líder: `disenador-interiores-vidrieria`)

| # | slug | Sistemas | Ejes | FAQ |
| --- | --- | --- | --- | --- |
| 1 | `ventana` | 17 sistemas (`SERIE_20…80`, `SISTEMA_NOVA_CORRALES`, `VCO-*`, `VPR-*`) | Corrediza vs proyectante vs batiente; serie según luz y uso; **atenuación acústica estimada**, nunca "antirruido" | 10 |
| 2 | `mampara` | `SERIE_7038/36/25/28/80`, `MCO-*`, `MBT-*` | División de ambientes, terrazas y oficinas; 8–10 mm; corrediza vs batiente | 6 |
| 3 | `ducha` | `KIT_BOX_ESQUINERO`, `KIT_BOX_FRONTAL` | 8 vs 10 mm; esquinero vs frontal; sellado; seguridad del templado | 5 |
| 11 | `espejos` | `VIDRIOS_CORRALES`, `VIDRIOS_HPD` | Espesores 3–6 mm; bisel; marco vs flotante; retroiluminación; humedad | 3 |
| 13 | `mantenimiento` | Accesorios (garruchas, felpas, burletes, brazos) | Preventivo vs correctivo; cada 12–18 meses; filtraciones; ruido por felpa seca | 4 |

**Total FAQ:** 44.

---

## Tarea 1.4 — Contenido mínimo exigido por servicio

Cada ficha debe responder, explícita o implícitamente:

1. **Qué es** el servicio en una frase que entienda un cliente sin conocimientos técnicos.
2. **Para qué sirve** y en qué casos **no** conviene.
3. **Qué incluye** el suministro y la instalación (y qué no).
4. **Cómo se mide** (por m², por ml, por unidad, por visita).
5. **Qué se necesita** del cliente antes de cotizar (medidas, fotos, tipo de vano).
6. **Cómo se mantiene**.
7. **Qué puede fallar** y cómo se corrige.

Si un servicio no puede responder el punto 4 o 5 con dato verificable, se escribe
`[POR CONFIRMAR]` y se lista en `notasInternas`.

---

## Tarea 1.5 — Hechos técnicos disponibles por bloque

Usa estos datos ya verificados en la matriz (amplía con la Fase 1.1):

**Vidrio**
- Templado: calentamiento ~650 °C + enfriamiento brusco; 4–5× más resistente; fragmentación granular; **no se puede cortar ni perforar después**.
- Laminado: 6.38 / 8.38 / 10.76 mm (dos hojas + PVB); ante rotura queda adherido al PVB.
- Insulado (DVH): dos vidrios + cámara de aire separadora; mejora térmica y acústica; depende del sellado.
- Low-E / control solar: capa de óxidos metálicos; reduce radiación solar; no convierte el vidrio en "antirruido".
- Crudo/recocido: sin tratamiento térmico; fragmentos grandes y peligrosos.
- Espejos: espesores comerciales 3–6 mm; 4–5 mm para dimensiones medianas; 6 mm sobre 2 m.
- Barandas de vidrio: 10 mm templado típico; 8 mm en tramos cortos.
- Ducha: 8 mm estándar; 10 mm en paños grandes o puertas de mayor luz.

**Aluminio**
- Aleación arquitectónica habitual en Perú: 6063-T5 (anodizado o pintado).
- Series 20/25/28/29/35/36/42/45/62/80/3825/3831; Nova como línea hermética.
- Corrediza vs proyectante vs batiente: cambia riel, felpa, burlete, cierre y resistencia al viento.
- Accesorios: garruchas simples y tándem, felpas, burletes, brazos proyectantes, cerraduras, manijas.

**Frenos**
- Freno de piso: doble velocidad (barrido + golpe final), regulable; requiere mantenimiento.
- Bisagra aérea hidráulica: para puertas de menor peso.
- Síntomas de falla: golpe al cerrar, puerta descolgada, aceite en el piso.

**Techos sol y sombra**
- Estructura de aluminio (tubo rectangular) + cobertura de policarbonato alveolar 8 mm.
- Variantes: fijo, corredizo, con tensores; lamas o celosías como alternativa de sombra.
- Requiere inclinación mínima y canaleta; el policarbonato bloquea UV pero acumula calor y condensa.

**Muro cortina**
- Stick (armado en obra), Frame (módulos premontados), Unitizado (módulos completos de fábrica).
- Requiere cálculo de cargas de viento, junta y anclaje; no es un servicio "a medida sin plano".

---

## Tarea 1.6 — Revisión final (`redactor-tecnico-marca`)

Checklist que debe ejecutar y firmar en `docs/contenido/servicios/REVISION.md`:

- [ ] 0 apariciones de marcas de la lista negra.
- [ ] 0 apariciones de "fabricamos", "producimos", "importamos".
- [ ] 0 "antirruido" fuera de PVC.
- [ ] 0 porcentajes acústicos presentados como dato absoluto; siempre "atenuación estimada".
- [ ] 0 URLs de imágenes de terceros.
- [ ] N-gramas de 8+ palabras: sin coincidencias con las fuentes.
- [ ] Longitudes dentro de los límites.
- [ ] `systemSheets[].nombre` coincide con `gallery[].system` de Firestore.
- [ ] Cada `specs` tiene al menos una fila con unidad de medida.

---

## Checklist de cierre de fase

- [ ] `matriz-hechos.md` con ≥ 120 hechos.
- [ ] 13 archivos `.json` en `docs/contenido/servicios/`.
- [ ] `REVISION.md` firmado con todos los checks.
- [ ] Lista de `[POR CONFIRMAR]` enviada al dueño.
