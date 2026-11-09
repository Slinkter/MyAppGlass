# Brief de pantallas · TurnoYa (FINAL)

## Producto
- **Qué es:** app web de reservas de citas para negocios de servicios (barberías, consultorios, spas).
- **Negocio de ejemplo:** Barbería Don Raúl · Av. Larco 345, Miraflores.
- **Problema:** agendan por WhatsApp y llamadas: dobles reservas, clientes que no llegan y el dueño
  contestando mensajes en vez de atender.

## Usuarios
| Usuario | Contexto de uso | Necesita |
|---|---|---|
| Camila, 29 · cliente | Celular, en el bus, una mano, sin crear cuenta | Ver horarios libres y confirmar en menos de 60 segundos |
| Don Raúl, 52 · dueño | Tablet en el mostrador, entre cliente y cliente, con prisa | Ver el día de un vistazo y bloquear horarios |

## Flujo y pantallas
| # | Pantalla | HU | Dispositivo | Objetivo del usuario | Contenido real | Estados además del "feliz" |
|---|---|---|---|---|---|---|
| 01 | Catálogo de servicios | HU-01 | móvil 360 | Elegir un servicio | Corte clásico 30 min S/ 35 · Perfilado de barba 20 min S/ 25 · Corte + barba 45 min S/ 55 · Corte para niños 25 min S/ 30. Filtros: Todos, Cortes, Barba, Combos, Tintes (aún sin servicios) | carga (skeleton), vacío por filtro |
| 02 | Selección de horario | HU-02 | móvil 360 | Elegir día y hora libre | Lun 27 a Vie 31 · 9:00 a 11:30 y 3:00 a 4:00 cada 30 min; ocupados 9:00, 11:00, 4:00 | sin disponibilidad + próximo libre |
| 03 | Tus datos | HU-03 | móvil 360 | Dejar nombre y celular | Nombre, Celular (9 dígitos), condiciones de cancelación | error de validación, enviando |
| 04 | Confirmación | HU-03 | móvil 360 | Saber que quedó reservada | Código TY-4821, resumen, agregar a calendario, cancelar | — (es el estado de éxito) |
| 05 | Agenda del negocio | HU-05/06 | tablet 1024 | Ver el día y bloquear horarios | Profesionales: Raúl, Diego, Lucía · citas de 9:00 a 11:30 · almuerzo bloqueado | sin conexión |

## Reglas que la IA debe respetar (de la Sesión 1)
- [x] Baja fidelidad: escala de grises, sin imágenes reales, sin colores de marca
- [x] Áreas táctiles de al menos 44 px
- [x] El estado de un horario no depende solo del color (WCAG 1.4.1)
- [x] Errores junto al campo y sin borrar lo escrito (H9)
- [x] Acción principal en la zona del pulgar (parte inferior)
- [x] Etiquetas visibles en todos los campos, el placeholder es solo un ejemplo (WCAG 3.3.2)
