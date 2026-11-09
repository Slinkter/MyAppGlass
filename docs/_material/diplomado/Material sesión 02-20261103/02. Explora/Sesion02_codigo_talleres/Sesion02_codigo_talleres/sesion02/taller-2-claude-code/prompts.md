# Prompts del Taller 2 · Claude Code (copiar y pegar)

## P-1 · Explorar el proyecto (modo Plan)
```text
Explora este proyecto sin modificar nada y respóndeme:
1. Qué hace cada archivo y cómo se relacionan tokens.css, components.css y las páginas HTML.
2. Cuáles son las 3 capas de tokens y qué regla de dependencia siguen.
3. Qué componentes existen y qué variantes y estados tiene el botón.
4. Qué historia de usuario de docs/historias-de-usuario.md aún no está implementada.
Responde en máximo 15 líneas. Si algo no lo puedes confirmar leyendo el código, dilo.
```

## Bloque "Reglas del proyecto" para agregar al CLAUDE.md (T2-7)
```markdown
## Reglas del proyecto
- HTML, CSS y JavaScript sin frameworks ni dependencias. Se prueba con Live Server.
- Estilos: usa solo tokens de styles/tokens.css. Ningún color hex fuera de tokens.css.
- Los componentes consumen tokens semánticos o de componente, nunca primitivos.
- Reutiliza las clases de styles/components.css (btn, field, card, badge, slot-group) antes de crear nuevas.
- Accesibilidad: WCAG 2.2 AA obligatorio. Etiqueta visible en cada campo, :focus-visible,
  áreas táctiles ≥ 44 px, el estado nunca depende solo del color, errores con aria-describedby.
- Mobile-first: diseña a 360 px y amplía con min-width. Sin scroll horizontal a 360 px.
- Textos en español de Perú, en el lenguaje del cliente. Precios en soles: "S/ 35".
- No modifiques componentes.html (es la vitrina del design system).
- Antes de editar más de un archivo, presenta un plan y espera aprobación.
```

## P-2 · Planificar el catálogo HU-01 (modo Plan)
```text
Implementa la historia HU-01 (catálogo de servicios) en un archivo nuevo catalogo.html.

Contexto:
- Historia y criterios de aceptación: @docs/historias-de-usuario.md
- Wireframe aprobado (baja fidelidad, solo estructura): @docs/wireframes/01-catalogo.png
- Design system: @styles/tokens.css y @styles/components.css
- Página de referencia de estilo y estructura: @reserva.html

Restricciones:
- El wireframe define estructura y contenido, NO colores: aplica los tokens del design system.
- Los datos de servicios van en un arreglo JS dentro de la página; simula 600 ms de carga
  para mostrar el estado skeleton.
- Filtros como botones con aria-pressed. Cada tarjeta es un enlace a reserva.html?servicio=<id>.
- Si necesitas un estilo nuevo, agrégalo en un <style> de la página usando solo tokens.

Antes de escribir código dame un plan con:
1. Estructura HTML (landmarks y encabezados).
2. Clases existentes que reutilizarás y estilos nuevos que crearás.
3. Cómo cumplirás cada uno de los 8 criterios de aceptación.
4. Qué NO vas a hacer.
```

### Checklist para revisar el plan (antes de aprobar)
- [ ] ¿Crea solo `catalogo.html` o también toca otros archivos? (no debería tocar `componentes.html`)
- [ ] ¿Reutiliza `card`, `btn`, `badge` en vez de inventar estilos?
- [ ] ¿Dice cómo distinguirá el filtro activo sin depender del color?
- [ ] ¿Incluye estado de carga **y** estado vacío?
- [ ] ¿Menciona algún color hex, librería o framework? → pedir corrección
- [ ] ¿Responde los 8 criterios uno por uno?

## P-3 · Corregir el plan (si hace falta)
```text
Ajusta el plan:
- <qué cambiar y por qué, citando el criterio o la regla>
No escribas código todavía. Muéstrame solo las partes del plan que cambian.
```

## P-4 · Pedir una corrección puntual después de revisar el diff
```text
En catalogo.html <qué viste>. Incumple <criterio HU-01 / regla del CLAUDE.md>.
Corrígelo sin cambiar nada más y explícame el cambio en 2 líneas.
```

## P-5 · Autoverificación (pídela, pero verifica tú también)
```text
Revisa catalogo.html contra los 8 criterios de HU-01 y las reglas del CLAUDE.md.
Para cada uno responde: Cumple / No cumple / No puedo verificarlo, con la línea de código como evidencia.
No edites nada.
```

## Plantilla · docs/bitacora-hitl.md
```markdown
# Bitácora Human-in-the-loop · HU-01 Catálogo
| # | Punto de control | Qué propuso Claude | Decisión | Por qué (regla / criterio) |
|---|---|---|---|---|
| 1 | Plan | | ✅ / ✏️ / ❌ | |
| 2 | Diff | | | |
| 3 | Diff | | | |
| 4 | Verificación manual | | | |

Tiempo total: ___ min · Correcciones pedidas: ___ · Cambios rechazados: ___
¿Qué regla nueva agregarías al CLAUDE.md para no repetir la corrección? ___
```
