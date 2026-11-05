# Prompts para Figma Make · Cotizador de ventana nueva

> Planifica 7 a 9 prompts (plan Starter: 500 créditos/mes, tope de 150 por día).
> Regla de oro: **un cambio por prompt**, nombra la pantalla y cierra con "No cambies nada más".

## Prompt maestro · 6 bloques (pantallas 01 a 05, móvil)

```text
[1 · CONTEXTO]
Diseña los wireframes de un cotizador web para "Glass & Aluminum Company", empresa de vidrio y aluminio
en La Molina, Lima. El cliente cotiza cuánto cuesta instalar una ventana nueva, ve qué se le instalará y
solicita una visita técnica.

[2 · USUARIO]
Propietario o dueño de negocio en La Molina. Usa el celular con una mano, sin crear cuenta. Objetivo:
conocer el precio y qué incluye en menos de 2 minutos, y agendar la visita.

[3 · PANTALLAS Y FLUJO]
Crea 5 pantallas móviles conectadas, navegables con clic, en este orden:
1) Elige el servicio y el sistema  2) Diseña tu ventana  3) Tu cotización  4) Visita técnica  5) Solicitud enviada.
Cada pantalla tiene "Volver" excepto la primera y la última. Las pantallas 1 a 4 muestran "Paso X de 4".

[4 · CONTENIDO REAL]
Pantalla 1: lista vertical de 10 categorías de servicio que se despliega como acordeón (una abierta a
la vez): Ventana, Mampara, Ducha, Techo de policarbonato, Baranda, Parapeto y muro cortina,
Cerramiento de balcón, Puerta de vidrio templado, Puerta de aluminio y Celosía. Ventana muestra
"Sistema Nova" disponible y "Serie 20", "Serie 25", "Serie 32", "Serie 42", "Serie 62" y "Sistema PVC".
Mampara: Nova, Serie 25, Serie 42. Ducha: Kit Europeo, Kit Español, Kit Económico, Kit Plástico.
Techo, Baranda, Parapeto, Balcón y Celosía: "Sistema único". Puerta de vidrio: Batiente y Corrediza.
Puerta de aluminio: Serie 25, 35 y 62. Solo Ventana > Sistema Nova se puede elegir; todo lo demás
queda deshabilitado, con candado y "En proceso de implementación".
Pantalla 2: Color de vidrio (Incoloro o Bronce); Color de aluminio (Natural, Negro o Madera); campo
bloqueado "Espesor del vidrio: 6 mm · No se puede cambiar"; "Alto (cm)" y "Ancho (cm)". Debajo, un
diagrama de cajas de la ventana según el ancho: 120 a 160 cm = 2 hojas (el cliente elige "Doble
corrediza" o "Corrediza + fija"); 161 a 200 cm = 3 hojas (fija, corrediza, corrediza); 201 a 320 cm =
4 hojas (fija, corrediza, corrediza, fija). Ejemplo: 150 x 120 cm, 2 hojas. Barra fija inferior:
"Desde S/ 324.00" y botón "Ver cotización".
Pantalla 3: Tipo de vidrio: Crudo (económico), Laminado (para negocios) o Templado; luego Forma de pago:
Efectivo, Transferencia o Tarjeta. Ejemplo vidrio Crudo: S/ 324.00 con tarjeta; con efectivo o
transferencia, 5% de descuento: S/ 307.80. Lista plegable "Qué vamos a instalar" con la línea resumen
"2 vidrios de 6 mm · perfiles · riel · 4 ruedas · felpa · 2 seguros · silicona" que se abre para ver el
detalle (zócalos, guías plásticas, 2 contrapestillos). Nota "Recargos por piso o distancia: se confirman
en la visita técnica". Botones fijos: "Solicitar visita técnica" y "Modificar medidas".
Pantalla 4: días en una fila con scroll horizontal, Lun 9 a Sáb 14 de noviembre; horas de 9:00 a 17:00
cada 60 minutos en grilla de 3 columnas; ocupados 10:00 y 15:00; bloqueado 13:00. Campos "Tu nombre",
"Celular" (9 dígitos), "Dirección" y "Piso".
Pantalla 5: código GA-4821, resumen y botón "Confirmar por WhatsApp".

[5 · FIDELIDAD Y RESTRICCIONES]
Baja fidelidad: solo escala de grises, cajas con una X en lugar de imágenes, sin colores de marca, sin
íconos decorativos, sin gradientes ni sombras. Ancho 360 px. Es una app, no una landing: sin hero, sin
testimonios, sin footer de marketing. Sin banners promocionales ni casillas pre-marcadas.

[6 · ESTADOS Y ACCESIBILIDAD]
Muestra junto al estado normal: aviso al tocar un sistema no disponible, error de medida bajo el campo,
total "Calculando…", día sin horarios con el próximo día libre, error en el celular y botón
"Enviando…" bloqueado. Botones y horarios de al menos 44 px de alto. Sistema no disponible: candado y
texto, no solo gris. Horario ocupado o bloqueado: tachado, texto "Ocupado" y fondo gris; seleccionado:
relleno oscuro y check. Etiquetas siempre visibles sobre cada campo. Errores debajo del campo, en
lenguaje simple, sin borrar lo escrito. Ninguna opción (color, vidrio, hojas, pago) viene
seleccionada de antemano. Guarda todas las selecciones (sistema, medidas, hojas, vidrio, pago) en un
solo estado compartido y úsalas en todas las pantallas, incluidos los resúmenes.
```

## Prompts de iteración (usar solo los que hagan falta tras la revisión HITL #1)

```text
I-1 · Sistemas no disponibles
En la pantalla "Elige el sistema", muestra el estado al tocar "Serie 25": un aviso con borde punteado
'Serie 25 está en proceso de implementación. Escríbenos por WhatsApp' y un botón secundario
"Escribir por WhatsApp". No cambies nada más.

I-2 · No solo color
En las pantallas "Diseña tu ventana" y "Tu cotización", las opciones de color de vidrio, color de
aluminio, configuración de hojas, tipo de vidrio y forma de pago deben verse como botones de selección
con texto. La elegida lleva relleno oscuro y un check (✓) antes del texto. No cambies nada más.

I-3 · Medidas, diagrama y precio "Desde"
En la pantalla "Diseña tu ventana": el espesor de 6 mm es un campo bloqueado con candado; bajo "Alto (cm)"
escribe la ayuda "Entre 100 y 160 cm"; muestra un ejemplo de error 'El ancho debe estar entre 120 y
320 cm' con el botón "Escribir por WhatsApp"; y el diagrama de cajas con tres variantes etiquetadas:
"2 hojas", "3 hojas" y "4 hojas", con "Fija" y "Corrediza" escritas en cada hoja. No cambies nada más.

I-4 · Desglose y detalle de instalación
En la pantalla "Tu cotización", muestra el desglose en filas: "Ventana (alto x ancho x tarifa)",
"Descuento 5% efectivo o transferencia" y "Total". Muestra la lista "Qué vamos a instalar" en sus dos
estados: cerrada (una línea) y abierta (una fila por material con su cantidad). Fija abajo, a todo el
ancho y de 48 px de alto, el botón "Solicitar visita técnica", con el total encima. No cambies nada más.

I-5 · Horarios no disponibles
En la pantalla "Visita técnica", los horarios ocupados y el bloqueado de 13:00 muestran texto tachado y
la etiqueta "Ocupado" o "No disponible", y están deshabilitados. Agrega la nota "Atendemos de lunes a
sábado, de 9:00 a 17:00". Mantén la grilla de 3 columnas. No cambies nada más.

I-6 · WhatsApp
En la pantalla "Solicitud enviada", el botón principal "Confirmar por WhatsApp" va fijo abajo a todo el
ancho. "Reprogramar" y "Cancelar" son botones secundarios con borde punteado. No cambies nada más.

I-7 · Tablet
Agrega una sexta pantalla para tablet horizontal de 1024 px: "Agenda de visitas" para el personal.
Columnas Lun a Sáb, filas cada 60 min de 9:00 a 17:00. Panel izquierdo con "Visitas de hoy", botón
principal "+ Bloquear horario" y la próxima visita. Los horarios bloqueados usan trama diagonal.
Agrega un estado "Sin conexión". Mismo estilo de baja fidelidad.

I-8 · Corregir hojas en el resumen (pegar sobre el prototipo existente)
Hay un error: al elegir 4 hojas, el resumen muestra 2. En "Diseña tu ventana" el ancho determina las
hojas: 120 a 160 cm = 2, 161 a 200 cm = 3, 201 a 320 cm = 4. Guarda ese número y la configuración como un
único valor compartido y úsalo en el diagrama, en la línea resumen y en "Qué vamos a instalar" de
"Tu cotización", y en el resumen de "Solicitud enviada". Cantidades: vidrios = hojas; ruedas = 4 en
doble corrediza, 2 en corrediza + fija, 4 en 3 hojas y 4 en 4 hojas; seguros = hojas corredizas.
Ejemplo: ancho 250 cm → 4 hojas, 4 vidrios, 4 ruedas, 2 seguros en todas las pantallas. Si el usuario
vuelve y cambia el ancho, todo se recalcula. No cambies nada más.

I-9 · Acordeón de categorías (pegar sobre el prototipo existente)
Reemplaza la pantalla "Elige el sistema" por "Elige el servicio y el sistema": una lista vertical de
10 categorías (Ventana, Mampara, Ducha, Techo de policarbonato, Baranda, Parapeto y muro cortina,
Cerramiento de balcón, Puerta de vidrio templado, Puerta de aluminio, Celosía). Al tocar una, se
despliega hacia abajo con sus sistemas y se cierra la anterior. Ventana: Nova, Serie 20, 25, 32, 42, 62 y
PVC. Mampara: Nova, Serie 25, Serie 42. Ducha: Kit Europeo, Kit Español, Kit Económico, Kit Plástico.
Las demás: "Sistema único". Solo Ventana > Sistema Nova continúa al siguiente paso; el resto lleva
candado y "En proceso de implementación". No cambies nada más.
```

## Registro de prompts
| # | Prompt (resumen) | ¿Funcionó? | Qué aprendiste |
|---|---|---|---|
| M | Prompt maestro 6 bloques | | |
| I-1 | Sistemas no disponibles | | |
| I-2 | Selección sin depender del color | | |
| I-3 | Medidas, diagrama y precio "Desde" | | |
| I-4 | Desglose y detalle de instalación | | |
| I-5 | Horarios no disponibles | | |
| I-6 | WhatsApp | | |
| I-7 | Agenda tablet | | |
| I-8 | Corregir hojas en el resumen | | |
| I-9 | Acordeón de categorías | | |
