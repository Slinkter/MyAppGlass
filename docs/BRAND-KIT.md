# Brand Kit — Glass & Aluminum Company S.A.C.

> **Estado (2026-11-09): dirección APROBADA por el dueño** (vidrio esmerilado estilo Apple, navy + serif, modo oscuro conservado, verde de WhatsApp accesible `#15803d`). **Pendiente de decisión:** tono del papel (comparador en `/design-system` > pestaña v2), horario, teléfono secundario, correo público, garantía/IGV, frase de marca, logo vectorial y catálogo. Consolida la identidad que estaba dispersa en `docs/DESIGN-SYSTEM.md` §2, `docs/gya/data/company.json`, `docs/gya/catalogo/CATALOGO.md`, `docs/11_MANUAL_SEO_LOCAL.md`, `AGENTS.md` y el logo de `apps/web/public/brand/logo.png`. Nada de aquí es nuevo salvo lo marcado **(propuesta)**; lo no resuelto está en §12.
> **Regla:** no se rediseña ni se toca la web hasta que este Brand Kit esté aprobado. Una vez aprobado, `DESIGN-SYSTEM.md` §2 pasa a enlazar este documento.
> Los datos de empresa en código salen **siempre** de `companyData` (`@/shared/config/company-data`); este archivo es referencia, no fuente de runtime.

## 1. Esencia

| | |
|---|---|
| Razón social | **Glass & Aluminum Company S.A.C.** (en documentos legales: GLASS & ALUMINUM COMPANY S.A.C.) |
| Marca corta | **GYA** · línea superior **VIDRIERÍA & ALUMINIO** |
| RUC | 20606432870 |
| Frase de marca | **"Confianza sólida en cada estructura"** (alternativa: "Innovación y precisión en cada estructura") |
| Qué es | Vidriería de Lima (La Molina) que **compra** vidrio, aluminio y accesorios a 4 proveedores (Corporación Corrales, HPD Glass, Eduhg, Favitem), **ensambla en su taller** y **vende e instala** en casa del cliente. No fabrica perfiles ni vidrio |
| Promesa | Calidad, seguridad, durabilidad y acabado elegante, con atención técnica cercana |
| Cliente típico | Hogares y constructoras de Lima; llega desde **WhatsApp y móvil** |

**Mensajes de valor (usar tal cual):** visita técnica sin costo · presupuesto rápido por WhatsApp · garantía en productos instalados · boleta o factura electrónica · técnicos capacitados.

**Personalidad:** profesional, técnica, cercana, sobria, cálida. **No es:** ostentosa, tecnológica fría, ni promocional agresiva.

## 2. Voz y tono

- Habla en español neutro de Perú, directo y claro; frases cortas; tuteo/ustedeo cuidado según canal (web: "tú"; presupuesto formal: "usted").
- Cifras y medidas siempre con unidad (mm, m², S/); montos con cifras tabulares.
- Explica lo técnico en lenguaje simple (qué ventaja da, no solo qué es).
- Sin exageraciones, sin signos de exclamación en cadena, sin emojis, sin MAYÚSCULAS para gritar (las etiquetas cortas en mayúscula sí, §5).

| Evitar | Preferir |
|---|---|
| "¡Las mejores ventanas del Perú!!!" | "Ventanas antirruido con instalación y garantía." |
| "Cotiza ya, oferta limitada" | "Pide tu presupuesto por WhatsApp; la visita técnica no tiene costo." |
| "Antiruido", "vidrios y aluminios" | "antirruido", "vidrio y aluminio" |

**Ortografía obligatoria:** *antirruido* (doble r) · *vidrio y aluminio* (singular) · *laminado* · *dormitorio* · *abatible* · *sala*. Los nombres de sistemas se escriben como en el catálogo (§10).

## 3. Logotipo

Archivo: `apps/web/public/brand/logo.png` (1024×1024, fondo blanco). Símbolo: **triángulo coral con un círculo blanco que contiene cuatro paños en rombo**, la lectura de una ventana de 4 hojas. Se usa **con el RUC** en el membrete del presupuesto.

| Regla | Valor |
|---|---|
| Color del símbolo | Coral `#FF5A5A` sobre blanco; el coral es **exclusivo del logo** |
| Sobre fondo oscuro | **(propuesta)** versión en blanco de un solo color; falta crear el archivo |
| Zona de respeto | **(propuesta)** 1/4 del ancho del triángulo por cada lado |
| Tamaño mínimo | **(propuesta)** 24 px en pantalla / 12 mm en impresión |
| Prohibido | Recolorear, deformar, rotar, añadir sombra o degradado, ponerlo sobre fotos sin velo plano, usar coral en textos |
| Logo de BBVA | Va en el pie bancario; tampoco se modifica |
| Wordmark | Texto "Glass & Aluminum Company S.A.C." en Source Serif 4 700, navy (no es imagen) |

**Pendiente:** el PNG actual tiene mucho margen blanco y no hay SVG ni versiones horizontal/monocromo (§12).

## 4. Color

El color de la marca es **navy** (acento institucional) sobre **papel cálido**, con texto casi negro. El coral vive solo en el logo; el rojo solo en la palabra "PRESUPUESTO". Valores en `docs/DESIGN-SYSTEM.md` §2.2 (donde la v1 y la v2 difieren, manda la v2).

| Token | Hex | Uso | Contraste sobre blanco / paper |
|---|---|---|---|
| `ink` | `#111111` | Todo el texto | 18,88 / 17,47 |
| `ink-soft` | `#4A4A4A` | Etiquetas, texto secundario | 8,86 / 8,20 |
| `brand-navy` | `#002060` | Nombre de la empresa, títulos de sección, franjas de acción, pie bancario, botón primario | 15,27 / 14,13 |
| `brand-red` | `#D62828` | **Solo** la palabra "PRESUPUESTO" | 5,01 / 4,63 |
| `logo-coral` | `#FF5A5A` | **Solo** el logo; **no usar en texto** (3,06 sobre blanco no pasa AA) | 3,06 |
| `tint-navy` | `#F3F5F9` | Fondos de bloques destacados (grupos, totales) | navy/tint 13,99 |
| `paper-warm` | `#F7F6F3` | Fondo cálido y tarjetas de datos clave. En el tema web hoy existe `bg.paper` `#FBF8F3`: **unificar (decisión §12)** | — |
| `line` | `#E6E3DE` | Separadores | decorativo |
| `line-strong` | `#D9D6D0` | Bordes de tarjeta | decorativo |

Contrastes medidos con la fórmula WCAG 2.x (2026-11-09). Reglas:
- Texto normal ≥ 4,5:1, texto grande y componentes ≥ 3:1, en claro **y** oscuro.
- Un solo rojo por página. Sin degradados, sin sombras fuertes; los velos sobre fotos son **planos** (`blackAlpha.600`, decisión del 2026-11-08).
- Legible en blanco y negro (el presupuesto se imprime).
- **Estados** (éxito, aviso, peligro, info) con tokens `status.*` y texto de versión oscura aprobado por contraste (`status.*Text`); no se usan como identidad de marca.
- **Modo oscuro:** existe en la web; navy se aclara (`accent.navyContrast`, `blue.200/300` en chips y botones) y los fondos se oscurecen. La v2 de marca no lo define aún: **propuesta** conservarlo (§12).

## 5. Tipografía

| Rol | Fuente | Pesos | Uso |
|---|---|---|---|
| Títulos, nombre de empresa, montos | **Source Serif 4** | 700 | H1–H3, membrete, totales (cifras tabulares) |
| Texto e interfaz | **Inter** | 400 / 500 / 600 / 700 | Párrafos, tablas, botones, etiquetas |
| Monoespaciada | `fonts.mono` del tema | — | Códigos y correlativos (GYA-AAAA-XXXX) |

- Carga con `next/font/google` (ya en `app/layout.tsx`: `--font-source-serif`, `--font-inter`).
- Etiquetas cortas en Inter 11 px (≥ 0,6875 rem) **solo** mayúsculas con tracking amplio y nunca como único texto de estado.
- Impresión: cuerpo ≥ 10 pt, notas ≥ 9 pt.
- Escala web: la definida en el tema (`xs`–`6xl`); títulos de enlaces móviles 32–36 px serif.

## 6. Forma, espacio e iconografía

- **Radios:** tarjeta `xl`, modal `2xl`, botones y chips pill (`full`). **(propuesta, confirmar en puerta)**
- **Espaciado:** escala 4/8 px (`space.1` a `space.16`); targets táctiles ≥ 44 px.
- **Sombras:** solo elevación suave con nombre; nunca sombra fuerte ni animar `box-shadow`.
- **Vidrio esmerilado (dirección Apple, 2026-11-09):** superficies translúcidas con `blur(24px) saturate(180%)`, borde fino de luz y reflejo superior; leyendas flotantes sobre las fotos, barra de navegación y menú de cristal. Es el lenguaje visual de una vidriería. Receta única en `apps/web/src/shared/constants/glass.ts`; con transparencia reducida pasa a sólido. Sin degradados de color.
- **Iconos:** Lucide, solo 16 / 20 / 24 px, trazo uniforme, decorativos con `aria-hidden`, solo-ícono con `aria-label` en español. Sin emojis en la UI.
- **Movimiento:** una sola familia de duraciones y curvas (`apps/web/src/shared/constants/motion.ts`); máximo 2 propiedades en `transition`; `prefers-reduced-motion` respetado.

## 7. Fotografía y dirección de arte

- **Sujeto:** instalaciones reales terminadas (ventana, mampara, ducha, baranda, techo) en espacios habitables de Lima; luz natural; encuadres limpios con la apertura bien visible.
- **Fuentes permitidas:** proyectos propios de la empresa y las referencias de `docs/gya/fotos-referencia/` (baja resolución, solo referencia; ejemplo: `ventana-serie25-dormitorio.png`, `ventana-pvc-abatible.png`, `techo-terraza.png`).
- **Prohibido (D9):** fotos, planos o imágenes del material de proveedores. Del proveedor solo se usan textos y datos técnicos.
- **Sobre fotos:** texto blanco únicamente sobre velo plano `blackAlpha.600`; contraste medido sobre la foto real.
- Fotos con `alt` descriptivo en español y proporción reservada (sin saltos de diseño).
- Los 3 servicios nuevos (espejos, frenos hidráulicos, mantenimiento) no tienen fotografía propia aún: **pendiente** (§12).

## 8. Datos de empresa (referencia)

| Dato | Valor vigente | Fuente |
|---|---|---|
| Dirección | Av. Los Fresnos 1250 - La Molina, Lima 15024 | `companyData` |
| WhatsApp | 974 278 303 (`51974278303`) | `companyData` |
| Teléfono secundario | 996-537-435 (en `companyData.contactPhone` y SEO) | `companyData` — ver §12 |
| Correo | acueva@gyacompany.com (ventas@gyacompany.com en `salesEmail`) | `companyData` |
| Web | https://www.gyacompany.com | `SITE_URL` |
| Gerente General | Juan Carlos Cueva Carrasco | `companyData` |
| Banco | BBVA soles `0011-0106-0100041622`, CCI `011-106-000100041622-20` | `apps/web/src/shared/data/bank-accounts.ts` |
| Pago | 50 % anticipo, 50 % a la entrega; tarjeta +5 %; transferencias sin comisión; días hábiles L–V sin feriados | `company.json` |

Descartados: "Mz H Lt 16" y 998 225 739. La Ficha RUC de SUNAT (2022) no es fuente de contacto.

## 9. Aplicaciones

| Medio | Reglas de marca |
|---|---|
| **Web** | Fondo `paper-warm`/blanco con tarjetas cálidas, títulos Source Serif 4 navy, botón primario navy, WhatsApp como acción principal móvil, modo claro/oscuro |
| **Presupuesto A4** | Membrete: "VIDRIERÍA & ALUMINIO" · nombre en navy serif · "PRESUPUESTO" en rojo serif · dirección, teléfonos, web · logo con RUC · línea negra de 2 px. Jerarquía: membrete → cliente → productos → TOTAL → plazo/garantía → pago → condiciones → firmas → pie bancario. A4 vertical, márgenes ≥ 12 mm. Insignia antirruido (píldora navy de 5 segmentos con el %). 6 conceptos de hoja en `docs/gya/conceptos-presupuesto.md` (base C1) |
| **WhatsApp** | Mensaje breve, saludo + dato + siguiente paso; presupuesto C6 como portada (`docs/gya/prompts/01-redactar-presupuesto-whatsapp.md`) |
| **Flyer A4** | Navy + papel; sin rojo ni degradados (`docs/gya/prompts/03-flyer-a4-nextjs.md`) |
| **SEO / Google** | Nombre y NAP idénticos a `companyData` en Google Business Profile y JSON-LD (`docs/11_MANUAL_SEO_LOCAL.md`) |

## 10. Oferta y nombres oficiales

- **13 servicios** (10 en el sitio + espejos, frenos hidráulicos Sevax y mantenimiento; los 3 nuevos aún por crear en Firestore). Slugs de los 10: `ventana`, `mampara`, `ducha`, `parapeto`, `baranda`, `balcones`, `techo`, `pvidrio`, `pserie`, `celosias`. Fuente de verdad: Firestore; los títulos SEO de respaldo en `serviceMappers.ts`.
- **Sistemas vigentes (6, provisional hasta aprobar el catálogo):** Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica, PVC abatible. No inventar series.
- **Tipos de ventana:** Corrediza, Proyectante, Batiente, Luz Fija. **Vidrio:** Crudo, Laminado, Templado (sin grosor en el nombre); **color de vidrio:** Incoloro, Bronce, Gris; **aluminio:** Negro, Mate, Blanco, Madera, Champagne; **adicionales:** Arenado, Diseño según cliente.
- **Antirruido de referencia:** Serie 25 = 50 %, Serie 62 = 70 %, Acústica = 80 %, PVC abatible = 80 % (Acústica y PVC por confirmar y sin respaldo de proveedor).
- El proveedor es dato interno; **el cliente nunca lo ve**.
- Proyectos de referencia: Palmer (Breña), Vittorie (Surquillo), Elenor y Maddy (Magdalena del Mar), Vidamor (Ate), Ventura (San Miguel).

## 11. Checklist de uso (todo diseño nuevo)

- [ ] Datos de empresa desde `companyData`, no escritos a mano.
- [ ] Solo colores de §4; coral solo en el logo, rojo solo en "PRESUPUESTO".
- [ ] Source Serif 4 en títulos y montos, Inter en lo demás.
- [ ] Sin degradados, emojis ni sombras fuertes; velos planos sobre fotos.
- [ ] Contraste ≥ 4,5:1 medido, claro y oscuro; targets ≥ 44 px; foco visible.
- [ ] "antirruido", "vidrio y aluminio"; nombres de sistemas de §10.
- [ ] Sin fotos de proveedores; imágenes con `alt` en español.
- [ ] Móvil primero (390 px) y sin scroll horizontal.

## 12. Pendientes y decisiones del dueño (no publicar hasta confirmar)

1. **Fondo de página y papel:** `#F7F6F3` (v2) vs `#FBF8F3` (tema actual `bg.paper`). **El dueño decidirá viéndolos lado a lado** en `/design-system` (pestaña v2, «Decisión pendiente · tono del papel»).
2. **Modo oscuro:** ✅ **Decidido: se conserva** (2026-11-09).
3. **Horario:** SEO documenta lun–sáb 8:00–18:00; `company.json` lista 9:00–17:00 como por verificar.
4. **Teléfono secundario 996-537-435:** figura en `companyData` y SEO; el kit solo reconoce WhatsApp 974 278 303 como vigente. ¿Se publica?
5. **Correo público:** `acueva@gyacompany.com` vs `ventas@gyacompany.com`.
6. **Garantía por producto** y **IGV incluido o no** en cada presupuesto (son campos, nunca texto fijo).
7. **Frase de marca:** ¿"Confianza sólida en cada estructura" (principal) o "Innovación y precisión en cada estructura"?
8. **Logo:** SVG vectorial, versión horizontal con wordmark, versión monocroma/blanca y recorte del margen; confirmar zona de respeto y tamaño mínimo.
9. **Catálogo:** series reales de cada servicio, PVC abatible (¿proveedor?), Acústica (¿serie y vidrio?), % antirruido, modelos Sevax (`docs/gya/catalogo/CATALOGO.md` §6).
10. **Fotografía** de los 3 servicios nuevos y banco de fotos propio en alta resolución.
11. **Radios y anchos de página** (`narrow` / `default` / `wide`): valores por aprobar.

## 13. Fuentes

`docs/DESIGN-SYSTEM.md` · `docs/gya/README.md` · `docs/gya/data/company.json` · `docs/gya/data/presupuestos-reales.json` · `docs/gya/conceptos-presupuesto.md` · `docs/gya/catalogo/CATALOGO.md` · `docs/gya/catalogo/rol-vendedor.md` · `docs/11_MANUAL_SEO_LOCAL.md` · `docs/10_SEO_JERARQUIA.md` · `docs/23_PLAN_DESIGN_SYSTEM_V2.md` · `AGENTS.md` · `packages/shared/src/company-data.ts` · `apps/web/public/brand/logo.png`.
