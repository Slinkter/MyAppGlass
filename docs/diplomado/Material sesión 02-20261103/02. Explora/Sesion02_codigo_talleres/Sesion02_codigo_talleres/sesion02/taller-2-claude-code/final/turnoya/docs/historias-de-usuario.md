# TurnoYa · Historias de usuario del MVP

## HU-01 · Catálogo de servicios (móvil) ← se implementa en el Taller 2 de la Sesión 2
**Como** Camila (cliente), **quiero** ver los servicios del negocio con su duración y precio
**para** elegir uno y pasar a reservar sin llamar por teléfono.

Wireframe: `docs/wireframes/01-catalogo.png`

### Criterios de aceptación
1. Muestra nombre, dirección y horario de atención del negocio: "Barbería Don Raúl · Av. Larco 345, Miraflores · Abierto hasta 8:00 p. m.".
2. Lista los servicios con nombre, duración y precio en soles:
   | id | Servicio | Categoría | Duración | Precio | Nota |
   |---|---|---|---|---|---|
   | corte-clasico | Corte clásico | cortes | 30 min | S/ 35 | |
   | perfilado-barba | Perfilado de barba | barba | 20 min | S/ 25 | |
   | corte-barba | Corte + barba | combos | 45 min | S/ 55 | |
   | corte-ninos | Corte para niños | cortes | 25 min | S/ 30 | hasta 12 años |
3. Filtros con selección única: Todos, Cortes, Barba, Combos, Tintes (Tintes aún no tiene servicios: sirve para probar el estado vacío). El filtro activo se distingue por algo más que el color.
4. Cada tarjeta completa es un enlace a `reserva.html?servicio=<id>` con área táctil ≥ 44 px.
5. Estado de carga: mientras llegan los datos se ven tarjetas skeleton (no spinner a pantalla completa).
6. Estado vacío: si un filtro no tiene servicios, muestra "No hay servicios en "<filtro>" por ahora." y un botón "Ver todos los servicios".
7. Se usa solo con teclado y cumple WCAG 2.2 AA. A 360 px no hay scroll horizontal.
8. Usa exclusivamente los tokens de `styles/tokens.css` y los componentes de `styles/components.css`.

## HU-02 · Selección de horario (móvil) · Sesión 4
## HU-03 · Reserva y confirmación (móvil) · implementada en `reserva.html` (Sesión 1)
## HU-05/06 · Agenda del negocio y bloqueo de horarios (tablet) · Sesión 4
