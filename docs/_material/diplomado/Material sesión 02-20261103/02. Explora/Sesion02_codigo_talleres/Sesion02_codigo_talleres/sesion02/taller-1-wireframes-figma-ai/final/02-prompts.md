# Prompts para Figma Make (FINAL)

## Prompt maestro · 6 bloques

```text
[1 · CONTEXTO]
Diseña los wireframes de TurnoYa, una app web de reservas de citas para negocios de servicios.
El negocio de ejemplo es "Barbería Don Raúl", Av. Larco 345, Miraflores.

[2 · USUARIO]
La usuaria principal es Camila, 29 años. Reserva desde el celular, en el bus y con una sola mano.
No quiere crear cuenta. Su objetivo: ver horarios libres y confirmar en menos de 60 segundos.

[3 · PANTALLAS Y FLUJO]
Crea 4 pantallas móviles conectadas en este orden, navegables con clic:
1) Catálogo de servicios  2) Selección de horario  3) Tus datos  4) Confirmación.
Cada pantalla tiene botón "Volver" excepto la primera y la última.

[4 · CONTENIDO REAL]
Servicios: Corte clásico (30 min, S/ 35), Perfilado de barba (20 min, S/ 25),
Corte + barba (45 min, S/ 55), Corte para niños (25 min, S/ 30).
Filtros: Todos, Cortes, Barba, Combos, Tintes (Tintes aún no tiene servicios).
Días: Lun 27 a Vie 31 de octubre. Horarios cada 30 min de 9:00 a 11:30 y de 3:00 a 4:00;
ocupados: 9:00, 11:00 y 4:00.
Campos: "Tu nombre" y "Celular" (9 dígitos). Texto: "Puedes cancelar gratis hasta 2 horas antes".
Código de reserva: TY-4821.

[5 · FIDELIDAD Y RESTRICCIONES]
Wireframe de baja fidelidad: solo escala de grises, cajas con una X en lugar de imágenes,
sin colores de marca, sin íconos decorativos, sin gradientes ni sombras. Ancho 360 px.
Es una app, no una landing: sin hero, sin testimonios, sin footer de marketing.

[6 · ESTADOS Y ACCESIBILIDAD]
Muestra junto al estado normal: catálogo cargando (skeleton) y filtro sin resultados;
día sin horarios con el próximo libre; error en el celular; botón "Reservando…" bloqueado.
Botones y horarios de al menos 44 px de alto. Horario ocupado: tachado y fondo gris;
seleccionado: relleno oscuro y check. Etiquetas siempre visibles sobre cada campo.
Los errores aparecen debajo del campo, en lenguaje simple, sin borrar lo escrito.
```

## Prompts de iteración (lo que realmente hizo falta)

```text
I-1 · Estados
En la pantalla "Catálogo de servicios", agrega debajo de la lista dos bloques de estado
con borde punteado: "Cargando" con 2 líneas skeleton y "Sin resultados" con el texto
'No hay servicios en "Tintes" por ahora' y un botón secundario "Ver todos los servicios".
No cambies nada más.

I-2 · No solo color
En la pantalla "Selección de horario", los horarios ocupados solo se ven en gris claro.
Agrégales texto tachado y deshabilítalos. Al seleccionado agrégale un check (✓) antes de la hora.
Mantén la grilla de 3 columnas.

I-3 · Zona del pulgar
En las pantallas "Selección de horario" y "Tus datos", fija el botón principal en la parte
inferior de la pantalla, a todo el ancho, con 48 px de alto. Encima del botón muestra
el día y la hora elegidos en texto pequeño.

I-4 · Tablet
Agrega una quinta pantalla para tablet horizontal de 1024 px: "Agenda del negocio" para el dueño,
Don Raúl. Columnas por profesional (Raúl, Diego, Lucía) y filas cada 30 min de 9:00 a 11:30.
Panel izquierdo con: "9 citas hoy", botón principal "+ Bloquear horario", botón "Nueva cita manual"
y la próxima cita. Los horarios bloqueados usan trama diagonal. Agrega un estado "Sin conexión".
Mismo estilo de baja fidelidad.
```

## Registro de prompts
| # | Prompt (resumen) | ¿Funcionó? | Qué aprendiste |
|---|---|---|---|
| M | Prompt maestro 6 bloques | Parcial | Generó el flujo y contenido real, pero omitió estados y usó solo color en horarios |
| I-1 | Estados en catálogo | Sí | Nombrar la pantalla y decir "no cambies nada más" evita efectos colaterales |
| I-2 | Horarios no solo color | Sí | Pedir la señal concreta (tachado, check) en vez de "hazlo accesible" |
| I-3 | CTA fijo | Sí, con ajuste | Cambió también el header; se corrigió con Point and edit |
| I-4 | Agenda tablet | Sí | Un prompt por pantalla nueva; repetir "mismo estilo de baja fidelidad" |
