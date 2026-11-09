# Cuestionario de diseño · Glass & Aluminum Company S.A.C.

> Objetivo: definir **un solo sistema de diseño** (marca, color, tipografía, componentes, catálogo y tono) que sea la única fuente de verdad del proyecto. Las respuestas alimentarán `docs/DESIGN-SYSTEM.md`, que reemplazará a `BRAND-KIT.md`, `PROMPT-REDISENO-DS.md` y las decisiones dispersas del plan 23.
>
> **Cómo responder:** marca una opción con `[x]` o escribe directamente sobre la línea. Cada pregunta trae **lo que hoy dice el repo** para que solo corrijas lo que no sea cierto. Si no sabes, escribe `NS` (no sé): lo dejaré como pendiente y no lo inventaré.

---

## A. Negocio y público

**A1. ¿Qué peso tiene cada cliente en el ingreso?** Hoy el sitio habla casi solo a hogares.

- [ ] Hogares (ventanas, duchas, mamparas) — **20** %
- [ ] Constructoras e inmobiliarias (partidas de carpintería de aluminio y vidrio) — **75** %
- [ ] Otros (comercios, mantenimiento) — **5** %

**A2. Como proveedor de constructoras, ¿qué debe ver primero un constructor que entra al sitio?**

- [ ] Capacidad de suministro y plazos
- [x ] Proyectos terminados (obras)
- [x ] Catálogo técnico (series, espesores, normas)
- [ ] Otro: \_\_\_\_

**A3. ¿Qué proyectos B2B puedo mostrar?** (Hoy: Palmer, Vittorie, Elenor, Maddy, Vidamor y Ventura, solo como referencia.) ¿Alguno requiere autorización del cliente?

> **todos,falta agregar fotos de las obra en album quedo pendiente agregar las foto pero se iba hacer un cmr para agregar o modificar desde el admin con firebase storage firestore pero por el moneto se estaba crear la pagina para ver como acaba y alli recien agregar todas las fotos ahora solo 2 o 3 proyecto esta completo con su informacion foto y album de fotos **

**A4. Servicios:** el sitio muestra 10 servicios; el catálogo propone 13 (faltan espejos, frenos Sevax y mantenimiento). ¿Cuál lista debe verse en la web?

- [ ] Solo los 10 actuales hasta que haya fotos y precios
- [x ] Los 13, aunque los 3 nuevos no tengan foto todavía
- [ ] Otro: \_\_\_\_

---

## B. Marca

**B1. Color protagonista.** El código ya usa **negro `#111111`**. La versión anterior (plan 22, `DESIGN-SYSTEM.md`) decía **navy `#002060`**.

- [ ] Negro de marca (confirmado)
- [ ] Navy de marca
- [ x] Otro: **que decidad el agente ux cual es el mas adecuad**

**B2. Coral `#FF5A5A`** (solo logo, según el Brand Kit).

- [ x] Solo en el logo, nunca en texto ni botones (vigente)
- [ ] Permitirlo también en acentos: \_\_\_\_

**B3. Rojo `#D62828`.** Hoy solo en la palabra "PRESUPUESTO".

- [ ] Solo ahí (vigente)
- [ x] Otro uso: \_se puede usar el rojo en texto pero como es titulo tiene que resaltar \_\_\_

**B4. Papel de fondo.** Decidido en el plan: `#F7F6F3`.

- [ ] Confirmado
- [ x] Otro: \_ debe ser blanco \_\_\_

**B5. Modo oscuro.** Existe en la web.

- [ x] Mantenerlo
- [ ] Retirarlo

**B6. Frase de marca.** Hoy dos opciones.

- [x ] "Confianza sólida en cada estructura"
- [ ] "Innovación y precisión en cada estructura"
- [ ] Otra: \_\_\_\_

**B7. Logo.** Hoy es un PNG con mucho margen blanco. ¿Puedes conseguir un SVG vectorial y versiones horizontal y monocroma?

- [ x] Sí, la pasaré: pero el archivo esta en .svg me es raro eso \_\_\_\_
- [ ] No, usar el PNG actual

---

## C. Tipografía

**C1. Fuente de títulos.** El código y la mayoría de documentos usan **Lora**; el plan 22 propone **Source Serif 4**.

- [x ] Lora (vigente en código, decidido 2026-11-09)
- [ ] Source Serif 4
- [ ] Otra: \_\_\_\_

**C2. Fuente de texto.** Inter en todos los documentos.

- [x ] Inter (confirmado)
- [ ] Otra: \_\_\_\_

**C3. Pesos de títulos.** Hoy Lora 700.

- [x ] Solo 700
- [ ] Varios (400 a 700)

---

## D. Estilo visual

**D1. Superficies.** Hoy hay vidrio esmerilado (estilo Apple) en la navegación, las tarjetas y el mapa; el Brand Kit lo aprobó; el plan 23 lo puso en duda.

- [x ] Vidrio esmerilado (como está)
- [ ] Plano, sin desenfoques
- [ ] Vidrio solo en navegación y mapa, plano en tarjetas

**D2. Sombras.** El Brand Kit dice "sin sombras fuertes".

- [ ] Ninguna
- [x ] Solo elevación suave

**D3. Fotografía.** Hoy hay fotos reales de obras propias y referencias en `docs/gya/fotos-referencia/`.

- [x ] Solo fotos propias de obras terminadas
- [ ] También fotos de referencia (solo para presupuesto impreso)

**D4. Densidad.** Hoy la landing se rediseñó para tener menos pantallas.

- [x ] Mucho aire, pocas tarjetas por pantalla (como está)
- [ ] Más información por pantalla

---

## E. Catálogo y productos

**E1. Sistemas de ventana.** El AGENTS.md dice 6 (Nova, Serie 25, 35, 62, Acústica y PVC abatible), **pero las dos últimas son provisionales**. Los proveedores usan series como 20, 25, 28, 35, 36, 42, 62, 80.

- [ ] Mantener los 6 provisionales hasta el catálogo final
- [x ] Usar las series reales de proveedor ya (dime cuáles: corrales y edu \_\_\_\_)
- [ ] Otro: \_\_\_\_

**E2. Origen del aluminio.** Los proveedores son de procedencia distinta (China y Europa). ¿Cómo se debe comunicar al cliente?

- [x ] No mencionar origen
- [ ] Mencionar origen por sistema (ej. "sistema europeo")
- [ ] Otro: \_\_\_\_

**E3. ¿Qué series vende de verdad?** Ver `docs/gya/catalogo/CATALOGO.md` §3 y §6.

> \_sisema nova ,serie 20,serie 25 , lo que el quiere quiee en mi taller tengo varios modelos como un show room y elciente decide que le gusta mas y segun se presupuesto\_\_\_

**E4. Antirruido.** Hoy: Serie 25 = 50 %, Serie 62 = 70 %, Acústica = 80 %, PVC = 80 %. Solo Serie 25 y 62 tienen respaldo del proveedor; Acústica y PVC no.

- [x] Mantener los % con la nota de "referencial"
- [ ] Quitar los % hasta tener respaldo
- [ ] Otro: \_\_\_\_

**E5. Datos del negocio pendientes:**

| Dato                  | Hoy el repo dice                                         | Tu respuesta                 |
| --------------------- | -------------------------------------------------------- | ---------------------------- |
| Horario               | Lun–sáb 08:00–18:00 (SEO) o 09:00–17:00 (`company.json`) | Lun–sáb 08:00–18:00 (SEO)    |
| Teléfono secundario   | 996 537 435                                              | ¿Se publica? \_si\_\_\_      |
| Correo público        | `acueva@gyacompany.com` o `ventas@gyacompany.com`        | acueva@gyacompany.com        |
| Garantía por producto | Ventanas 6 meses, techos 3 meses (casos reales)          | si\_\_\_\_                   |
| IGV en presupuesto    | Incluido o no, sin decidir                               | incluir precio total\_\_\_\_ |

---

## F. Blog y contenido

**F1. Público del blog.** Hoy hay 11 artículos en `apps/web/src/features/blog/data/blog-posts.ts`.

- [ ] Clientes finales (hogares)
- [ ] Constructores y arquitectos
- [ x] Ambos

**F2. Tono.** Hoy: técnico y cercano, sin exclamaciones.

- [ ]x Mantener
- [ ] Cambiar a: \_\_\_\_

**F3. Datos de proveedores en artículos.** Los proveedores se contradicen entre sí. ¿Qué regla aplico cuando un dato del blog no coincide con el catálogo del proveedor?

- [x ] Prevalece el proveedor (regla propuesta)
- [ ] Prevalece lo que dice el dueño
- [ ] Otro: \_\_\_\_

---

## G. Reglas de trabajo (para el CLI)

**G1. Un agente no debe inventar datos.** Si falta un dato (precio, garantía, horario), ¿qué hace?

- [x ] Deja un marcador visible y me pregunta (regla propuesta)
- [ ] Usa el valor del documento más reciente

**G2. Rediseño por lotes.** Plan propuesto: tokens → componentes → navegación y tarjetas → páginas, con tu OK en cada lote.

- [ x] De acuerdo
- [ ] Prefiero: \_\_\_\_

---

## Decisiones pendientes que dependen de ti (del plan aprobado)

1. **Agente y skills del CLI:** `.claude/agents/ui-ux-senior.md` y skills en `.claude/skills/`, versionados (quitar del `.gitignore`), o solo en tu usuario sin versionar. Respuesta:sin versionar ,
2. **Skill `impeccable`:** no está instalada. ¿Dónde está su fuente (repo o URL)? instlar con npx impeccable install , https://github.com/pbakaus/impeccable
3. **Carpeta `proveedor_info`:** no está en esta PC (las rutas citadas son de Linux). ¿Dónde la copio o la pones? dejalo como pendiente

---

## H. Pendientes para cerrar el documento (respuesta obligatoria)

> Estas preguntas salen de contradicciones con decisiones ya tomadas o de respuestas incompletas. Sin ellas no puedo escribir `DESIGN-SYSTEM.md` sin inventar.

**H1. Color protagonista (B1).** El 2026-11-09 se decidió negro `#111111`, y el Brand Kit lo aprobó. ¿Cuál queda?

- [x ] Negro `#111111` (decisión vigente)
- [ ] Navy `#002060` (reabrir la decisión)
- [ ] Que lo decida el agente UI/UX, con captura comparada

**H2. Papel de fondo (B4).** Dijiste "debe ser blanco". Hoy el tema usa `#F7F6F3`.

- [ x] Blanco puro `#FFFFFF`
- [ ] Papel cálido `#F7F6F3` (decisión vigente)
- [ ] Otro: \_\_\_\_

**H3. Rojo `#D62828` (B3).** Dijiste que sirve en títulos. La regla vigente lo limita a la palabra "PRESUPUESTO".

- [ ] Solo en "PRESUPUESTO" (regla vigente)
- [x ] También en títulos destacados (cambia la regla)

**H4. Series en el catálogo (E3).** Mencionaste Nova, Serie 20 y Serie 25. `AGENTS.md` dice 6 sistemas y "no inventar Serie 20".

- [x] Mantener los 6 sistemas como **lista provisional**; se actualizará cuando funcione el CRUD/dashboard de administración (Firestore)
- [ ] Usar Nova, Serie 20 y Serie 25 ya, y actualizar `AGENTS.md` ahora
- [ ] Lista exacta de series a mostrar: ____

**H5. Archivo del logo (B7).** En el repo solo hay `apps/web/public/brand/logo.png`. Dijiste que tienes un `.svg`. apps\web\src\assets\branding\logosvg.svg

- [x ] Ruta del `.svg`: apps\web\src\assets\branding\logosvg.svg
- [ ] Lo copiaré a `apps/web/public/brand/` como `logo.svg`
- [ ] No hay SVG, usar el PNG actual

**H6. Garantía por producto (E5).** Respondiste "si", sin valores.

- [ ] Ventanas 6 meses, techos 3 meses (casos reales)
- [x] Otros valores: **3 meses para todos los productos instalados** (reemplaza los 6 meses de ventanas y los 3 de techos de los casos reales)

**H7. IGV (E5).** Respondiste "incluir precio total".

- [ x] El precio mostrado ya incluye IGV
- [ ] El precio es sin IGV y se suma 18 %
- [ ] Depende del cliente (persona o empresa con RUC): \_\_\_\_

**H8. Teléfono público (E5).** Respondiste "si" a publicar el secundario.

- [ ] Publicar WhatsApp 974 278 303 y el secundario 996 537 435
- [x ] Publicar solo WhatsApp 974 278 303
- [ ] Otro: \_\_\_\_

**H9. Agente y skills (decisión 1).** Dijiste "decide tú".

- [ ] Versionar en `.claude/agents/` y `.claude/skills/` (quitar `.claude/` del `.gitignore`)
- [x ] Solo en tu usuario de Claude, sin versionar
- [ ] Otro: \_\_\_\_

**H10. Skill `impeccable` (decisión 2).** Escribiste `npx impeccable install`, sin confirmar la fuente.

- [x] Confirmo que el paquete es `impeccable`; instálalo — **instalado (2026-11-09)**: skill, agentes y hook en `~/.claude` (global, Claude Code). Verificado en el repo oficial `pbakaus/impeccable`
- [ ] Antes busca y dime la fuente oficial
- [ ] No la uses

**H11. Carpeta `proveedor_info` (decisión 3).** Quedó pendiente.

- [ x] La copio más tarde; mientras tanto trabajo con `docs/gya/catalogo/`
- [ ] Ruta en esta PC: \_\_\_\_
