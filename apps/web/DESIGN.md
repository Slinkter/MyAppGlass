---
name: Glass & Aluminum Company S.A.C.
description: Sistema de diseño del sitio corporativo de una vidriería y carpintería de aluminio de Lima. Blanco, negro de marca y Lora, con vidrio esmerilado solo sobre fotos.
colors:
  ink: "#111111"
  ink-soft: "#4A4A4A"
  page: "#FFFFFF"
  line: "#E6E3DE"
  line-strong: "#D9D6D0"
  quote-red: "#D62828"
  logo-coral: "#FF5A5A"
  whatsapp: "#15803D"
  whatsapp-hover: "#166534"
  whatsapp-active: "#14532D"
  danger-text: "#B91C1C"
  success-text: "#047857"
  warning-text: "#B45309"
  info-text: "#0369A1"
  dark-page: "#09090B"
  dark-section: "#121215"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  card: "16px"
  modal: "24px"
  field: "12px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.page}"
    rounded: "{rounded.pill}"
    height: "44px"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "48px"
  card:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Glass & Aluminum Company S.A.C.

> **En revisión.** Este documento se deriva del manual de marca (`docs/marca/MANUAL-DE-MARCA.md`), que está en la versión 0.1. Cuando el manual llegue a la 1.0, el sistema se redefine aquí y en `/design-system`, y solo después se lleva a las páginas con la aprobación del dueño. Mientras tanto describe lo que hay en producción.

## Overview

**Creative North Star: "El Plano de Obra"**

El sitio se lee como un plano de carpintería bien dibujado: fondo blanco, trazo negro, títulos serif y medidas claras. Una constructora que revisa capacidad, series y obras encuentra orden y precisión; una familia que pide un presupuesto desde el móvil encuentra el mismo orden con un tono amable. El vidrio, la materia del negocio, aparece donde tiene sentido: como una leyenda esmerilada sobre una foto de obra o como la barra de navegación.

La densidad es de mucho aire: pocas tarjetas por pantalla, un ritmo vertical constante y una acción principal por sección. La calidez viene de las esquinas amplias, del serif y de los botones en minúsculas, no de colores extra. El negro es el único color protagonista.

**Key Characteristics:**
- Fondo blanco, texto y botones en negro de marca; sin azul de marca.
- Lora 700 para títulos, Inter para todo lo demás.
- Superficies planas con borde fino; vidrio esmerilado solo sobre fotos y en la barra de navegación.
- Esquinas amplias (16 px en tarjetas, píldora en botones) y objetivos táctiles de 44 px.
- Modo claro y oscuro con la misma jerarquía.

## Colors

Paleta mínima: blanco, negro y gris cálido para líneas. Los colores de estado solo aparecen en mensajes.

### Primary
- **Tinta de Plano** (#111111): texto principal, botón primario, títulos, íconos de acción. En modo oscuro se invierte a blanco.

### Secondary
- **Rojo de Presupuesto** (#D62828): una palabra destacada en un título, por pantalla, y la palabra "PRESUPUESTO" en el documento impreso. Contraste 5,0:1 sobre blanco.
- **Verde WhatsApp accesible** (#15803D): únicamente el botón y los accesos a WhatsApp (blanco sobre este verde, 5:1). El verde de marca de WhatsApp (#25D366) no se usa porque no pasa contraste.

### Neutral
- **Blanco de Página** (#FFFFFF): fondo de página y de tarjetas. Reemplaza al papel cálido #F7F6F3.
- **Tinta Suave** (#4A4A4A): etiquetas y texto secundario.
- **Línea Cálida** (#E6E3DE): separadores y bordes de tarjeta.
- **Línea Firme** (#D9D6D0): bordes con más presencia (campos en hover).
- **Fondo Oscuro** (#09090B) y **Sección Oscura** (#121215): equivalentes en modo oscuro.
- **Coral del Logo** (#FF5A5A): exclusivo del logo; nunca en texto, botones ni íconos.

### Named Rules
**The One Red Rule.** El rojo aparece una sola vez por pantalla y solo en un título destacado. Si hay dos rojos, uno sobra.
**The Logo Coral Rule.** El coral vive en el logo. No se usa como acento, ni siquiera como borde.
**The No Blue Rule.** El azul no es de marca. Solo existe como anillo de foco del teclado y en enlaces de texto.

## Typography

**Display Font:** Lora (con Georgia, serif)
**Body Font:** Inter (con system-ui, sans-serif)
**Label/Mono Font:** Inter para etiquetas; fuente monoespaciada del sistema solo para códigos (GYA-AAAA-XXXX).

**Character:** serif con peso para los títulos y sans neutra para el trabajo. La combinación recuerda a una ficha técnica bien editada.

### Hierarchy
- **Display** (700, 30/36/48/60 px según ancho, 1.08): solo el título principal de la página de inicio.
- **Headline** (700, 30/36/48 px, 1.1, -0.02em): título de cada sección (Servicios, Proyectos, Clientes).
- **Title** (700, 1.5rem, 1.2): títulos de tarjetas y de bloques.
- **Body** (400, 1rem, 1.625): párrafos; líneas de hasta 65 a 75 caracteres.
- **Label** (700, 0.75rem, 0.14em, mayúsculas): etiqueta pequeña sobre un título. Nunca como único texto de un estado.

### Named Rules
**The Seven-Hundred Rule.** Lora se usa solo en 700 e Inter en 400 a 700. El peso 900 (`black`) no está cargado y no se usa.
**The Tabular Money Rule.** Montos y medidas con cifras tabulares y la unidad siempre visible (mm, m², S/).

## Layout

Mobile-first: la mayor parte del tráfico llega desde WhatsApp en un móvil de 360 px. Se diseña en 360, 768 y 1280 px.

- **Contenedor:** tres anchos de página únicos: estrecho (4xl, 896 px), estándar (6xl, 1152 px) y amplio (7xl, 1280 px).
- **Gutter:** 24 px en móvil, 56 px desde `md`.
- **Ritmo vertical:** 64 px entre secciones en móvil, 96 px en escritorio.
- **Grillas:** 1 columna, 2 desde `sm` y 3 desde `lg` para tarjetas; 4 en escritorio para listas de beneficios.
- **Objetivos táctiles:** mínimo 44 px de alto y ancho.

## Elevation & Depth

Plano por defecto: las superficies son blancas, con borde fino de Línea Cálida. La profundidad se expresa con el borde y el espacio, no con sombras.

El vidrio esmerilado se usa en dos sitios: la leyenda sobre fotos de las tarjetas y la barra de navegación. Con transparencia reducida o contraste alto, pasa a fondo sólido.

### Shadow Vocabulary
- **Navegación** (`box-shadow: 0 8px 32px rgba(0,0,0,0.08)`): barra de escritorio flotante.
- **Elevación suave** (`box-shadow: 0 8px 32px rgba(0,0,0,0.12)`): menús y paneles abiertos.
- **Modal** (`box-shadow: 0 20px 50px rgba(0,0,0,0.3)`): solo diálogos.

### Named Rules
**The Flat-By-Default Rule.** Una tarjeta en reposo no tiene sombra. La elevación aparece como respuesta al cursor o al foco, nunca como decoración.
**The Glass-On-Photo Rule.** El vidrio nunca cubre texto sobre fondo blanco; solo aparece sobre una foto o en la barra que flota.

## Shapes

Lenguaje cálido y redondeado: tarjetas con esquinas amplias (16 px), modales de 24 px, campos de 12 px y botones en píldora. No hay esquinas vivas salvo en tablas. Los bordes son de 1 px; el foco usa un anillo de 2 px con 2 px de separación.

## Components

### Buttons
- **Shape:** píldora completa (9999 px), alto mínimo 44 px.
- **Primary:** fondo Tinta de Plano, texto blanco, en minúsculas, peso 600. En modo oscuro invierte colores. Al pasar el cursor se aclara a #2A2A2A; al presionar se escala a 0,98.
- **Outline:** borde de 1,5 px en Tinta de Plano, fondo transparente. Hover con un velo negro de 4 %.
- **WhatsApp:** fondo verde accesible; es la acción principal en móvil.
- **Ghost:** solo texto, para acciones terciarias.
- **Nota:** las únicas variantes son `primary`, `outline`, `ghost` y `whatsapp`. Las antiguas en mayúsculas (`aura`, `navy`, `studio`, `brand`) ya no existen en el tema.

### Chips and badges
- **Style:** píldora de 28 px de alto, texto de 12 px en peso 600, fondo suave del color de estado.
- **State:** solo informativos; no se usan como botones.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** blanco con borde Línea Cálida.
- **Shadow Strategy:** ninguna en reposo (ver Elevación).
- **Internal Padding:** 16 px en móvil, 24 px desde `md`.
- **Tarjeta con foto (servicio, proyecto):** la imagen llena la tarjeta; el título y la acción van en una leyenda de vidrio claro (90 % blanco, desenfoque 24 px) con texto negro. Alto 260, 280 y 310 px por ancho.

### Inputs / Fields
- **Style:** fondo blanco, borde 1 px Línea Cálida, esquina 12 px, 48 px de alto.
- **Focus:** borde en el color del anillo de foco y anillo de 2 px.
- **Error / Disabled:** borde y mensaje en rojo de estado accesible (#B91C1C); el estado deshabilitado reduce la opacidad a 50 %.

### Navigation
- **Escritorio:** píldora flotante de vidrio, items de 44 px, pastilla negra en el item activo y `aria-current="page"`.
- **Móvil:** barra superior fija de 60 px con logo, botón de WhatsApp y menú; la hoja del menú cubre la pantalla en tres zonas (cabecera, lista con scroll y pie con acción de WhatsApp).
- **Items principales:** Inicio, Servicios, Proyectos, Ubicación y Contacto.

### Foto con leyenda de vidrio (componente propio)
Marco de foto con proporción fija, cobertura total y leyenda flotante de vidrio con el nombre del proyecto o servicio. Es la marca visual del sitio: la materia prima del negocio sobre la obra terminada.

## Do's and Don'ts

### Do:
- **Do** usar fondo blanco, texto negro y Lora 700 para los títulos.
- **Do** reservar el rojo #D62828 para una palabra destacada por pantalla.
- **Do** mantener objetivos táctiles de 44 px y foco visible en todo elemento interactivo.
- **Do** mostrar unidades (mm, m², S/) junto a cada medida y monto.
- **Do** respetar `prefers-reduced-motion` y `prefers-reduced-transparency`.
- **Do** tomar los datos de la empresa de `companyData`.

### Don't:
- **Don't** usar navy, azul de marca ni papel cálido #F7F6F3 como fondo.
- **Don't** usar el coral del logo (#FF5A5A) en texto, botones o íconos.
- **Don't** usar degradados, emojis ni sombras fuertes.
- **Don't** poner vidrio sobre fondo blanco ni apilar capas de vidrio.
- **Don't** usar Lora en 900 ni tamaños de texto de 10 px.
- **Don't** mostrar proveedores ni usar fotos o planos de proveedores.
- **Don't** escribir valores de color, píxeles o sombras sueltos en componentes: se usan los tokens del tema.

## Deriva conocida (código frente a este documento)

Lo que el código todavía no cumple tras la migración del 2026-11-09.
- **Nombres de token:** `border.warm` y `border.warmStrong` conservan ese nombre (56 usos); falta renombrarlos a `line` y `line-strong`.
- **Hover a mano:** quedan 51 `_hover={{`, parte de ellos con varias propiedades (tarjetas del admin y de servicios, flechas de la galería).
- **`px` literales:** en los prototipos de `DesignSystemUbicacion`.
- **Colores crudos de paleta:** `purple.400` y `blue.400` en cinco archivos.
- **Tarjetas:** `ClientCard` no tiene destino (no es enlace).
- **Datos:** el horario del footer está escrito a mano porque `companyData` no tiene ese campo.
- **Auditoría automática:** `scripts/audit-design-system.mjs` y `scripts/audit-landing.mjs` no se han corrido (falta `npx playwright install`).
