# Pantallas del panel: pedidos y sistemas

Bocetos para que el dueño los revise y corrija antes de construir. Son dibujos de ubicación: los colores, la letra y los íconos salen del diseño ya existente del panel (los mismos de Servicios y Ventas). Lo que usted corrija aquí se ajusta antes de programar.

Reglas que valen para todas las pantallas:

- Nombre de la empresa siempre completo: Glass & Aluminum Company S.A.C.
- Trato de usted en todos los avisos.
- Ningún precio está confirmado: donde falte se muestra "S/ --" o "Sin información de precio". No se inventa ninguno.
- En celular todo botón o fila que se toca mide al menos 44 px de alto.
- Los códigos de los dibujos son reales: 03AM00004 (Corporación Corrales) y 03BU00003 (Eduhg). Los demás datos son de relleno.
- Solo el administrador entra a estas pantallas. Los clientes de la web nunca ven a los proveedores.

Leyenda de los dibujos: `[ Texto ]` es un botón, `[__________]` es un campo para escribir, `[v]` es una lista que se despliega, `(foto)` es la fotografía del producto.

---

## 1. Menú del panel con los enlaces nuevos

Sirve para llegar a todas las secciones del panel; se suman Pedidos, Sistemas y Presupuestos.

Escritorio:

```
+------------------------------------------------------------------------------+
| Dashboard | Servicios | Sistemas | Proyectos | Inventario | Ventas | Pedidos  |
| Presupuestos | Reportes | Clientes | Cotizador                               |
+------------------------------------------------------------------------------+
```

Móvil 360 px (se desliza de lado):

```
+--------------------------------------+
| < Dashboard | Servicios | Sistemas | >|
+--------------------------------------+
```

Lo que se puede hacer:

- Tocar un enlace para ir a esa sección; el enlace de la sección actual queda resaltado.
- Pedidos lleva a `/admin/pedidos`, Sistemas a `/admin/sistemas` y Presupuestos a `/admin/presupuestos`.
- Los enlaces actuales siguen igual: Dashboard, Servicios, Proyectos, Inventario, Ventas, Reportes, Clientes y Cotizador.

Textos exactos: Pedidos, Sistemas, Presupuestos.

Para revisar: ¿el orden de los enlaces le parece bien? ¿Prefiere "Pedidos" o "Compras" como nombre?

---

## 2. Nuevo pedido, escritorio (`/admin/pedidos`)

Sirve para buscar productos de los proveedores y armar un pedido de compra agrupado por proveedor.

```
+------------------------------------------------------------------------------+
| Pedido de compra a proveedores                      [ Ver pedidos anteriores ]|
| Busque por código o nombre y agregue lo que necesita.                        |
+--------------------------------------+---------------------------------------+
| BUSCAR PRODUCTO                      | RESUMEN DEL PEDIDO       3 productos  |
| [Código o nombre______________]      |                                       |
| Proveedor [Todos v]  Categoría [v]   | CORPORACIÓN CORRALES                  |
|                                      | 03AM00004  JALADOR CIRCULAR P/PUERTA  |
| +----+ 03AM00004                    |            TEMPL. NEGRO 10MM          |
| |foto| JALADOR CIRCULAR P/PUERTA    |            Cant. [- 4 +]  S/ --       |
| +----+ TEMPL. NEGRO 10MM            |            [ Quitar ]                 |
|        Corporación Corrales         | Subtotal: Sin información de precio   |
|                       [ Agregar ]    |                                       |
| ------------------------------------ | EDUHG                                 |
| +----+ 03BU00003                    | 03BU00003  BURLETE CUÑA NEGRO P/4MM   |
| |foto| BURLETE CUÑA NEGRO P/4MM     |            (SERIE 35)                 |
| +----+ (SERIE 35)                   |            Cant. [- 10 +]  S/ --      |
|        Eduhg                        |            [ Quitar ]                 |
|                       [ Agregar ]    | Subtotal: Sin información de precio   |
| ------------------------------------ |                                       |
| Mostrando 2 de 435   [ Ver más ]     | Notas [_____________________]        |
|                                      |                                       |
|                                      | [ Guardar borrador ]                  |
|                                      | [ Vista previa A4 ]                   |
|                                      | [ Enviar a aprobación ]               |
+--------------------------------------+---------------------------------------+
```

Lo que se puede hacer:

- Buscar por código o nombre; filtrar por proveedor y por categoría.
- Agregar un producto; si ya está en el pedido, se suma la cantidad.
- Cambiar la cantidad con - y + o escribiéndola.
- Quitar un producto del pedido.
- Guardar el pedido como borrador y seguir después.
- Ver la hoja A4 antes de enviarlo.
- Enviarlo a aprobación (queda en estado "Por aprobar").
- Un producto sin foto muestra un recuadro gris en lugar de la foto.

Textos exactos: "Pedido de compra a proveedores", "Buscar producto", "Código o nombre", "Agregar", "Quitar", "Resumen del pedido", "Sin información de precio", "Guardar borrador", "Vista previa A4", "Enviar a aprobación", "Ver pedidos anteriores".

Avisos: "Borrador guardado." / "Agregue al menos un producto para enviar el pedido." / "Pedido enviado a aprobación."

Para revisar: ¿quiere el resumen a la derecha como se dibuja? ¿El campo de notas es útil? ¿Hace falta mostrar la categoría en cada resultado?

---

## 3. Nuevo pedido, móvil 360 px

Sirve para armar el mismo pedido desde el celular, en una sola columna.

```
+--------------------------------------+
| Pedido de compra                     |
| [Código o nombre________________]    |
| Proveedor [Todos        v]           |
| Categoría [Todas        v]           |
|                                      |
| +------+ 03AM00004                   |
| | foto | JALADOR CIRCULAR P/PUERTA   |
| +------+ TEMPL. NEGRO 10MM           |
|          Corporación Corrales        |
|          [      Agregar       ]      |
| ------------------------------------ |
| +------+ 03BU00003                   |
| | foto | BURLETE CUÑA NEGRO P/4MM    |
| +------+ (SERIE 35)                  |
|          Eduhg                       |
|          [      Agregar       ]      |
|                                      |
|                                      |
+======================================+
| Pedido: 3 productos        [ Ver  ^ ]|
+--------------------------------------+
```

Barra inferior desplegada (ocupa casi toda la pantalla):

```
+======================================+
| Pedido: 3 productos        [ Cerrar v]|
|--------------------------------------|
| CORPORACIÓN CORRALES                 |
| 03AM00004 JALADOR CIRCULAR P/PUERTA  |
| TEMPL. NEGRO 10MM                    |
| [ - ]  4  [ + ]   S/ --  [ Quitar ]  |
| Subtotal: Sin información de precio  |
|                                      |
| EDUHG                                |
| 03BU00003 BURLETE CUÑA NEGRO P/4MM   |
| (SERIE 35)                           |
| [ - ]  10  [ + ]  S/ --  [ Quitar ]  |
| Subtotal: Sin información de precio  |
|                                      |
| [ Guardar borrador ]                 |
| [ Vista previa A4 ]                  |
| [ Enviar a aprobación ]              |
+======================================+
```

Lo que se puede hacer:

- Todo lo de la pantalla 2, con una columna: primero la búsqueda, abajo el resultado.
- La barra inferior queda fija y siempre muestra cuántos productos lleva el pedido.
- Tocar "Ver" despliega el resumen; "Cerrar" lo vuelve a esconder.
- Los botones - y + y los de acción miden 44 px de alto como mínimo.

Textos exactos: "Pedido: 3 productos", "Ver", "Cerrar", y los mismos botones de la pantalla 2.

Para revisar: ¿le sirve la barra fija abajo, o prefiere el resumen como una pestaña aparte?

---

## 4. Lista de pedidos

Sirve para ver todos los pedidos hechos, su estado y aprobarlos.

Escritorio:

```
+------------------------------------------------------------------------------+
| Pedidos a proveedores                                  [ Nuevo pedido ]      |
| Estado [Todos v]                                                             |
+------------------------------------------------------------------------------+
| N.º       | Fecha      | Creado por | Proveedores    | Ítems | Estado  | Acc. |
|-----------|------------|------------|----------------|-------|---------|------|
| PC-000003 | 13/11/2026 | Administr. | Corrales,      |   3   |Por      | Ver  |
|           |            |            | Eduhg          |       |aprobar  |Imprim|
|           |            |            |                |       |         |Aprobar|
| PC-000002 | 10/11/2026 | Administr. | Corrales       |   1   |Aprobado | Ver  |
|           |            |            |                |       |         |Imprim|
| PC-000001 | 09/11/2026 | Administr. | Eduhg          |   2   |Borrador | Ver  |
|           |            |            |                |       |         |Imprim|
+------------------------------------------------------------------------------+
```

Móvil 360 px (una tarjeta por pedido):

```
+--------------------------------------+
| Pedidos a proveedores                |
| [ Nuevo pedido ]                     |
| Estado [Todos            v]          |
|                                      |
| PC-000003            [Por aprobar]   |
| 13/11/2026 - Administrador           |
| Corrales, Eduhg - 3 ítems            |
| [ Ver ] [ Imprimir ] [ Aprobar ]     |
|--------------------------------------|
| PC-000002            [Aprobado]      |
| 10/11/2026 - Administrador           |
| Corrales - 1 ítem                    |
| [ Ver ] [ Imprimir ]                 |
+--------------------------------------+
```

Lo que se puede hacer:

- Filtrar por estado: Borrador, Por aprobar, Aprobado.
- Ver el pedido (abre la hoja A4), imprimirlo.
- Aprobar un pedido que está "Por aprobar"; el botón no aparece en los demás estados.
- Crear un pedido nuevo.

Estados: Borrador, Por aprobar, Aprobado.

Textos exactos: "Pedidos a proveedores", "Nuevo pedido", "Ver", "Imprimir", "Aprobar". Aviso al aprobar: "¿Aprobar el pedido PC-000003? Quedará registrado a su nombre." con "Aprobar" y "Cancelar".

Para revisar: ¿el formato del número (PC-000003) le parece bien? ¿Quién puede aprobar: solo usted? ¿Un pedido aprobado se puede reabrir?

---

## 5. Hoja A4 del pedido

Sirve para imprimir o guardar en PDF el pedido y enviarlo a los proveedores.

```
+------------------------------------------------------------------------------+
| Glass & Aluminum Company S.A.C.                  PEDIDO DE COMPRA            |
| Av. Los Fresnos 1250 - La Molina                 N.º PC-000003               |
| WhatsApp 974 278 303 - acueva@gyacompany.com     Fecha: 13/11/2026           |
|------------------------------------------------------------------------------|
| PROVEEDOR: CORPORACIÓN CORRALES                                              |
| +------+-----------+---------------------------+------+----------+----------+|
| | Foto | Código    | Descripción               | Cant.| Precio   | Subtotal ||
| +------+-----------+---------------------------+------+----------+----------+|
| |(foto)| 03AM00004 | JALADOR CIRCULAR P/PUERTA |   4  | S/ --    | S/ --    ||
| |      |           | TEMPL. NEGRO 10MM         |      |          |          ||
| +------+-----------+---------------------------+------+----------+----------+|
| Total Corporación Corrales: Sin información de precio                        |
|                                                                              |
| PROVEEDOR: EDUHG                                                             |
| +------+-----------+---------------------------+------+----------+----------+|
| | Foto | Código    | Descripción               | Cant.| Precio   | Subtotal ||
| +------+-----------+---------------------------+------+----------+----------+|
| |(foto)| 03BU00003 | BURLETE CUÑA NEGRO P/4MM  |  10  | S/ --    | S/ --    ||
| |      |           | (SERIE 35)                |      |          |          ||
| +------+-----------+---------------------------+------+----------+----------+|
| Total Eduhg: Sin información de precio                                       |
|                                                                              |
| Notas: ____________________________________________________________________ |
|                                                                              |
| Pedido por: Administrador              Aprobado por: ____________________    |
| Fecha: 13/11/2026                      Fecha: ___________                    |
+------------------------------------------------------------------------------+
```

Lo que se puede hacer:

- Imprimir o guardar como PDF desde el navegador (botón "Imprimir").
- Cerrar la vista previa y volver al pedido (botón "Volver al pedido").
- Un pedido con varios proveedores se imprime con una sección por cada uno; si una sección no entra en la hoja, sigue en la siguiente.
- "Aprobado por" queda en blanco hasta que el pedido se apruebe; después muestra el nombre y la fecha.
- El total de cada proveedor solo se calcula si todos sus productos tienen precio; si falta uno, dice "Sin información de precio".

Textos exactos: "PEDIDO DE COMPRA", "Proveedor", "Foto", "Código", "Descripción", "Cantidad", "Precio", "Subtotal", "Total", "Sin información de precio", "Pedido por", "Aprobado por", "Imprimir", "Volver al pedido".

Para revisar: ¿el membrete debe ser completo como en el presupuesto, o un documento interno más simple? ¿Se imprime la foto del producto? ¿Hace falta un espacio para firma?

---

## 6. Sistemas, escritorio (`/admin/sistemas`)

Sirve para revisar los sistemas de cada servicio cargados desde los proveedores, y publicar o eliminar los que usted decida.

```
+------------------------------------------------------------------------------+
| Sistemas por servicio  [18 registros]       [ Cargar sistemas ]              |
| Servicio [Todos v]   Estado [Todos v]                                        |
+------------------------------------------------------------------------------+
| Nombre propio  | Servicio  | Alias por proveedor | Estado  | Origen | Acciones|
|----------------|-----------|---------------------|---------|--------|---------|
| Serie 35       | Ventanas  | Corrales: Serie 35  |Borrador | Ficha  | Ver     |
|                | de aluminio| Eduhg: Línea 35    |         | Corrales| Publicar|
|                |           |                     |         |        | Eliminar|
| Mampara de     | Mamparas  | Corrales: ....      |Publicado| Ficha  | Ver     |
| ducha          | de baño   |                     |         | Corrales|Despublic|
|                |           |                     |         |        | Eliminar|
+------------------------------------------------------------------------------+
```

Lo que se puede hacer:

- Filtrar por servicio y por estado (Borrador, Publicado).
- Ver el detalle de un sistema (pantalla 7).
- Publicar un sistema en borrador; despublicar uno publicado.
- Eliminar un sistema, con confirmación.
- "Cargar sistemas" trae los sistemas nuevos desde los catálogos de los proveedores; solo agrega los que no existen y todos entran como Borrador.
- Los sistemas no se editan a mano en esta etapa; son de solo lectura.

Textos exactos: "Sistemas por servicio", "Cargar sistemas", "Ver", "Publicar", "Despublicar", "Eliminar", "Borrador", "Publicado". Aviso al eliminar: "¿Eliminar el sistema Serie 35? Esta acción no se puede deshacer." con "Eliminar" y "Cancelar". Aviso al cargar: "Se agregaron 18 sistemas como borrador." (el número es de ejemplo).

Para revisar: ¿"Nombre propio" es la palabra correcta para el nombre con que usted llama al sistema? ¿Quiere ver el origen (documento y página) en la tabla o solo en el detalle? ¿Publicar un sistema debe cambiar algo en la web pública? (por ahora no cambia nada).

---

## 7. Detalle de un sistema (solo lectura)

Sirve para ver todo lo que se sabe de un sistema antes de publicarlo. Se abre como panel al costado en escritorio y como pantalla completa en el celular.

```
+------------------------------------------+
| Serie 35                         [ Cerrar]|
| Ventanas de aluminio - [Borrador]        |
|------------------------------------------|
| DESCRIPCIÓN                              |
| Texto del sistema, redactado para el     |
| rubro. (Por completar si falta.)         |
|                                          |
| COMO LO LLAMA CADA PROVEEDOR             |
| Corporación Corrales: Serie 35           |
| Eduhg: Por confirmar                     |
|                                          |
| PERFILES DE ALUMINIO                     |
| - Riel, jamba, hoja ...                  |
|   (lista de la ficha del proveedor)      |
|                                          |
| ACCESORIOS                               |
| 03BU00003  BURLETE CUÑA NEGRO P/4MM      |
|            (SERIE 35)       Eduhg        |
| 03AM00004  JALADOR CIRCULAR P/PUERTA     |
|            TEMPL. NEGRO 10MM             |
|                        Corporación Corrales|
|                                          |
| VIDRIO COMPATIBLE                        |
| Por confirmar                            |
|                                          |
| PRECIO                                   |
| Precio a definir                         |
|                                          |
| ORIGEN DEL DATO                          |
| Ficha del proveedor (documento y página) |
|                                          |
| [ Publicar ]  [ Eliminar ]               |
+------------------------------------------+
```

Lo que se puede hacer:

- Leer todos los datos del sistema.
- Publicar o eliminar desde aquí, igual que en la lista.
- Cerrar y volver a la lista.
- Donde falta un dato aparece "Por confirmar", nunca un valor inventado.

Textos exactos: "Descripción", "Cómo lo llama cada proveedor", "Perfiles de aluminio", "Accesorios", "Vidrio compatible", "Precio a definir", "Origen del dato", "Por confirmar", "Cerrar".

Nota: esta pantalla es solo para usted. El cliente de la web no ve los nombres de los proveedores ni sus códigos.

Para revisar: ¿falta algún dato que usted quiera ver aquí (medidas, espesores, series compatibles)? ¿Los accesorios deben mostrar el proveedor?

---

## 8. Sistemas, móvil 360 px

Sirve para lo mismo que la pantalla 6, con tarjetas en lugar de tabla.

```
+--------------------------------------+
| Sistemas por servicio                |
| [ Cargar sistemas ]                  |
| Servicio [Todos            v]        |
| Estado   [Todos            v]        |
|                                      |
| +----------------------------------+ |
| | Serie 35             [Borrador]  | |
| | Ventanas de aluminio             | |
| | Corrales: Serie 35               | |
| | Origen: Ficha Corrales           | |
| | [ Ver ] [ Publicar ] [ Eliminar ]| |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | Mampara de ducha    [Publicado]  | |
| | Mamparas de baño                 | |
| | Corrales: ....                   | |
| | Origen: Ficha Corrales           | |
| | [ Ver ] [Despublicar][ Eliminar ]| |
| +----------------------------------+ |
+--------------------------------------+
```

Lo que se puede hacer:

- Lo mismo que en escritorio.
- Si los tres botones no caben en una fila, pasan a una columna, cada uno de 44 px de alto como mínimo.
- Tocar la tarjeta abre el detalle (pantalla 7) a pantalla completa.

Textos exactos: los de la pantalla 6.

Para revisar: ¿qué dato de la tarjeta le importa más ver sin abrirla?

---

## 9. Estados vacíos y de error

Sirven para que usted sepa qué pasa cuando no hay datos o algo falla, sin pantallas en blanco.

Catálogo sin sincronizar (al buscar productos):

```
+--------------------------------------+
|              (icono caja)            |
| Todavía no hay productos de          |
| proveedores. Pida que se actualice   |
| el catálogo.                         |
+--------------------------------------+
```

Búsqueda sin resultados:

```
+--------------------------------------+
| No encontramos productos para        |
| "jalador 99". Revise el código o     |
| pruebe con otra palabra.             |
| [ Quitar filtros ]                   |
+--------------------------------------+
```

Pedido vacío (en el resumen):

```
+--------------------------------------+
| Su pedido está vacío.                |
| Busque un producto y toque Agregar.  |
+--------------------------------------+
```

Sin conexión:

```
+--------------------------------------+
| No hay conexión. Sus cambios no se   |
| han guardado. Revise su internet e   |
| intente de nuevo.                    |
| [ Reintentar ]                       |
+--------------------------------------+
```

Otros casos de la misma familia:

- Sin pedidos aún: "Todavía no hay pedidos. Cree el primero con Nuevo pedido."
- Sin sistemas aún: "Todavía no hay sistemas cargados. Toque Cargar sistemas para traerlos de los catálogos."
- Carga en curso: "Cargando productos..." (con el círculo giratorio que ya usa el panel).

Textos exactos: los de los recuadros de arriba, tal cual.

Para revisar: ¿los avisos suenan naturales para usted? ¿Quiere que el aviso de catálogo sin sincronizar diga a quién pedirlo?
