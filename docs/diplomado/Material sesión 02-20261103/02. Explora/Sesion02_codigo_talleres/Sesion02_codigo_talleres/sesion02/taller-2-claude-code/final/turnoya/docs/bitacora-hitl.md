# Bitácora Human-in-the-loop · HU-01 Catálogo (ejemplo de resultado)

| # | Punto de control | Qué propuso Claude | Decisión | Por qué (regla / criterio) |
|---|---|---|---|---|
| 1 | Plan | Crear `catalogo.html` y agregar una clase `.chip` nueva en `components.css` | ✏️ Corregir | Regla del CLAUDE.md: estilos de una sola página van en su `<style>`. Se pidió con P-3 |
| 2 | Plan | Filtro activo solo con fondo de color | ✏️ Corregir | HU01-3 y WCAG 1.4.1: se agregó check (✓) + `aria-pressed` |
| 3 | Plan | Estado vacío no contemplado porque "todas las categorías tienen servicios" | ✏️ Corregir | HU01-6: el filtro "Tintes" no tiene servicios |
| 4 | Diff | Tarjeta con `<div onclick>` en lugar de enlace | ❌ Rechazar | HU01-4 y WCAG 2.1.1: no es alcanzable con teclado. Se pidió `<a>` envolviendo la tarjeta |
| 5 | Diff | Skeleton con color `#e5e7eb` escrito a mano | ✏️ Corregir | HU01-8: se cambió por `var(--color-surface-muted)` |
| 6 | Diff | Grilla con `repeat(auto-fill, minmax(min(100%, 280px), 1fr))` | ✅ Aprobar | Layout intrínseco de la Sesión 1, sin scroll a 360 px |
| 7 | Verificación manual | Teclado, 360 px, Lighthouse 100, búsqueda de `#` = 0 | ✅ Aprobar | Criterios 7 y 8 verificados por la persona, no solo por la IA |

Tiempo total: 14 min · Correcciones pedidas: 4 · Cambios rechazados: 1
¿Qué regla nueva agregarías al CLAUDE.md para no repetir la corrección?
"Todo elemento interactivo es un `<a>` o un `<button>` nativo; nunca `div` con `onclick`."
