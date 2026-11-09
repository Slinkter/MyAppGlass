# TurnoYa

App web de reservas de citas para negocios de servicios (barberías, consultorios, spas).
Negocio de ejemplo: Barbería Don Raúl, Miraflores. Usuarios: Camila (cliente, móvil) y Don Raúl (dueño, tablet).

## Stack y cómo se prueba
- HTML, CSS y JavaScript sin frameworks, sin dependencias y sin paso de build.
- No hay tests automatizados ni `npm`. Se prueba abriendo las páginas con Live Server (VS Code).

## Estructura
- `styles/tokens.css`: design tokens en 3 capas (primitivos → semánticos → componente).
- `styles/components.css`: componentes `btn`, `field`, `slot-group`, `card`, `badge`. Cero colores hex.
- `componentes.html`: vitrina del design system. No modificar.
- `reserva.html`: HU-03, reserva y confirmación.
- `catalogo.html`: HU-01, catálogo de servicios.
- `docs/historias-de-usuario.md`: historias y criterios de aceptación. Es la fuente de verdad.
- `docs/wireframes/`: wireframes aprobados en baja fidelidad (estructura y contenido, no colores).

## Reglas del proyecto
- Estilos: usa solo tokens de `styles/tokens.css`. Ningún color hex fuera de `tokens.css`.
- Los componentes consumen tokens semánticos o de componente, nunca primitivos.
- Reutiliza las clases de `styles/components.css` antes de crear nuevas. Estilos de una sola página van en su `<style>`.
- Accesibilidad: WCAG 2.2 AA obligatorio. Etiqueta visible en cada campo, `:focus-visible`,
  áreas táctiles ≥ 44 px, el estado nunca depende solo del color, errores con `aria-describedby`.
- Mobile-first: diseña a 360 px y amplía con `min-width`. Sin scroll horizontal a 360 px.
- Textos en español de Perú, en el lenguaje del cliente. Precios en soles: "S/ 35".

## Forma de trabajo
- Antes de editar más de un archivo, presenta un plan y espera aprobación.
- Cambios pequeños y enfocados en la historia pedida. No refactorices lo que no se pidió.
- Al terminar, lista qué criterios de aceptación cumple cada parte y qué no pudiste verificar.
- Nunca hagas `git push`. Los commits los aprueba la persona.
