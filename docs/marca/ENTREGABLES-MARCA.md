# Entregables del proceso de marca

> **Qué es:** el mapa de lo que entrega un proceso de marca y el estado real de este proyecto.
> **Regla:** un tema, una fuente de verdad. Este documento no repite el contenido del manual, del brand kit ni del sistema de diseño; los enlaza.

## 1. Mapa completo (8 fases)

| Fase | Entregables | Qué resuelve |
|---|---|---|
| 0. Investigación | Auditoría de marca y digital, benchmark de competencia, entrevistas y datos del negocio, mapa de públicos | Saber de dónde se parte y contra quién se compite |
| 1. Estrategia | Posicionamiento, propuesta de valor, promesa, razones para creer, arquitectura de marca, naming | Decidir qué se dice y a quién |
| 2. Identidad verbal | Voz y tono, léxico propio, palabras prohibidas, mensajes por canal, guía de escritura | Que todo suene a la misma empresa |
| 3. Identidad visual | Logo, isotipo, variaciones, monocromo, paleta, tipografía, iconografía, fotografía, patrones | Que todo se vea como la misma empresa |
| 4. Manual de marca | Documento maestro + versión imprimible | La fuente de verdad para todo el equipo |
| 5. Brand kit | Archivos editables y de uso, nomenclatura, organización, licencias | Que cualquiera pueda producir piezas sin improvisar |
| 6. Sistema de diseño digital | Tokens, componentes, accesibilidad, documentación y showcase | Que la web y el producto cumplan la marca |
| 7. Aplicaciones y plantillas | Presupuesto, WhatsApp, flyer, tarjetas, membretada, firma, redes, letrero, vehículo, uniforme, show room | Que la marca salga del PDF y se vea en la calle |
| 8. Implementación y gobernanza | Plan por lotes, responsables, calendario, control de versiones, medición y KPI | Que la marca no se degrade al mes siguiente |

## 2. Estado actual

### 2.1 Entregado

| Entregable | Dónde está |
|---|---|
| Manual de marca v1.0 | `docs/marca/MANUAL-DE-MARCA.md` · `.html` |
| Brand kit revisable | `docs/marca/BRAND-KIT.html` |
| UI kit web revisable | `docs/marca/UI-KIT.html` |
| Sistema de diseño alineado | `apps/web/DESIGN.md` · `apps/web/.impeccable/design.json` · `/design-system` |
| Diagnóstico y plan de mejoras | `docs/marca/PROPUESTA-MEJORAS.md` |
| SEO técnico y jerarquía de rutas | `docs/14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md` · `docs/10_SEO_JERARQUIA.md` |
| Prompts de trabajo | `docs/marca/PROMPT-CONSULTOR-MARCA.md` · `PROMPT-BRANDING.md` |

### 2.2 Parcial

| Entregable | Qué existe | Qué falta |
|---|---|---|
| Identidad visual | Símbolo vectorial, coral, Lora/Inter, reglas de uso | Logo horizontal y versiones monocromo y vertical |
| Plantillas | Presupuesto A4 de ejemplo y mensaje de WhatsApp | Archivos editables (DOCX/PDF) y versión con datos reales |
| Aplicaciones | Propuestas visuales (letrero, vehículo, tarjeta, redes) | Archivos de producción y fotos reales |
| Interfaz web | UI kit con plantillas y componentes documentados | Implementación por lotes y componentes marcados «falta» |
| SEO | Base técnica y jerarquía implementadas | Ejecución de contenido y landings de distrito |
| Medición | Eventos y GA4 existentes | Panel de KPI y línea base |

### 2.3 Pendiente

Ordenado por impacto y dependencia:

1. Logo horizontal y monocromo en SVG, con fondo transparente.
2. Guía de fotografía y fotos de 6 obras y del show room.
3. Plantillas editables de presupuesto, flyer, tarjeta, membretada y firma de correo.
4. Portadas y plantillas de redes.
5. Asset library organizada por pieza, versión y color.
6. Benchmark formal de 3 a 5 competidores.
7. Auditoría de accesibilidad del sitio.
8. Gobernanza: quién aprueba, cómo se versiona y cada cuánto se revisa.
9. Panel de KPI con línea base.
10. Manual final en PDF firmado.

## 3. Fuente única por tema

| Tema | Fuente de verdad | Qué no duplicar |
|---|---|---|
| Negocio, público, voz, identidad | `docs/marca/MANUAL-DE-MARCA.md` | No reescribir la estrategia en otros documentos |
| Identidad visual y aplicaciones | `docs/marca/BRAND-KIT.html` + manual §7 | No crear otro documento de logo o color |
| Plantillas y componentes web | `docs/marca/UI-KIT.html` | No repetir maquetas de página en el manual o el brand kit |
| Sistema de diseño digital | `apps/web/DESIGN.md` + `/design-system` | No repetir tokens en documentos de marca |
| Mejoras, lotes y trabajo abierto | `docs/marca/PROPUESTA-MEJORAS.md` + `docs/PENDIENTES.md` | No abrir planes paralelos |
| Historial | `docs/05_CHANGELOG.md` | No reescribir el pasado |
| Prompts y método | `PROMPT-CONSULTOR-MARCA.md` · `PROMPT-BRANDING.md` | No mezclar método con decisiones |

Regla práctica: si un dato aparece en dos documentos, uno de los dos enlaza al otro; no lo copia.

## 4. Verificación del design system

Las cuatro piezas que deben coincidir son los tokens (`apps/web/src/shared/providers/theme/index.ts`), el documento (`apps/web/DESIGN.md`), los metadatos (`apps/web/.impeccable/design.json`) y el showcase (`/design-system`).

Las reglas de componentes, la deriva conocida y los criterios de validación viven en `apps/web/DESIGN.md`. No se duplican aquí.

## 5. Próximos entregables sin depender del dueño

| Orden | Entregable | Resultado |
|---|---|---|
| 1 | Logo horizontal y monocromo (propuesta SVG) | Identidad usable en documentos y letreros |
| 2 | Guía de fotografía | Fotos consistentes cuando lleguen |
| 3 | Plantillas de presupuesto y WhatsApp | Ventas con la misma voz |
| 4 | Asset library y nomenclatura | Archivos ordenados y versionados |
| 5 | Benchmark y auditoría de accesibilidad | Decisiones con evidencia |

> Los entregables 1 a 4 se producen como propuesta y se aprueban al revisarlos. Los que dependen del dueño están en `docs/PENDIENTES.md`.
