# Revisión Human-in-the-loop de los wireframes (FINAL · ejemplo)

## Checklist
| # | Criterio | Regla | Rev. 1 | Rev. 2 |
|---|---|---|---|---|
| 1 | Flujo de 4 pantallas en orden y navegable | Brief | ✅ | ✅ |
| 2 | Contenido real (nada de "Lorem") | H2 | ✅ | ✅ |
| 3 | Baja fidelidad: solo grises | Fidelidad | ❌ | ✅ |
| 4 | Una sola acción primaria por pantalla, mismo estilo | H4, H8 | ❌ | ✅ |
| 5 | Acción principal en la zona del pulgar | Fitts | ❌ | ✅ |
| 6 | Áreas táctiles ≥ 44 px | WCAG 2.5.8 / 2.5.5 | ✅ | ✅ |
| 7 | Ocupado / seleccionado sin depender del color | WCAG 1.4.1 | ❌ | ✅ |
| 8 | Etiqueta visible en cada campo | WCAG 3.3.2 | ✅ | ✅ |
| 9 | Error junto al campo, sin borrar lo escrito | H9, WCAG 3.3.1 | ✅ | ✅ |
| 10 | Estados: carga, vacío, enviando, éxito | H1 | ❌ | ✅ |
| 11 | Se puede volver atrás desde cada paso | H3 | ✅ | ✅ |
| 12 | Agenda tablet legible y "bloquear" visible | H6, H7 | — | ✅ |

**Puntaje:** Rev. 1 6 / 11 (la tablet aún no existía) · Rev. 2 12 / 12

## Bitácora de decisiones
| # | Pantalla | Qué viste (evidencia) | Regla | Decisión | Acción / prompt |
|---|---|---|---|---|---|
| 1 | Catálogo | Generó tarjetas con foto genérica y un banner azul de "promo" | Fidelidad, H8 | ✏️ Corregir | Point and edit: borrar banner; reemplazar foto por caja con X |
| 2 | Catálogo | No hay estado de carga ni vacío | H1 | ✏️ Corregir | Prompt I-1 |
| 3 | Horario | Ocupados en gris claro sin otra señal; contraste 1.6:1 | WCAG 1.4.1, 1.4.3 | ✏️ Corregir | Prompt I-2 |
| 4 | Horario y Datos | Botón "Continuar" a mitad de pantalla, se mueve con el scroll | Fitts | ✏️ Corregir | Prompt I-3 |
| 5 | Datos | Agregó un checkbox "Acepto recibir promociones" marcado por defecto | Patrón oscuro, H3 | ❌ Rechazar | Point and edit: eliminar el checkbox |
| 6 | Confirmación | "Cancelar cita" con el mismo peso visual que "Volver al inicio" | H4, H5 | ✏️ Corregir | Point and edit: botón secundario punteado |
| 7 | Confirmación | Código de reserva grande y legible, resumen completo | H1, H6 | ✅ Aprobar | — |
| 8 | Agenda | La IA propuso una vista semanal; Don Raúl necesita el día | Brief, H6 | ✏️ Corregir | Prompt I-4 especificando "día" y columnas por profesional |

## Cierre
- Enlace publicado del prototipo: (pega aquí el enlace de Publish)
- ¿Qué decidió la IA que tú no habías pedido? Un banner promocional y un checkbox de marketing pre-marcado.
- ¿Qué aceptaste sin revisar y luego tuviste que corregir? El botón "Cancelar cita" con peso de acción primaria.
- ¿Qué regla agregarías al prompt maestro la próxima vez? "No agregues elementos de marketing ni casillas pre-marcadas".
