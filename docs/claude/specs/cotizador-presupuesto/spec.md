# Spec: Cotizador de presupuesto (flujo servicio → `/presupuesto`)

> Estado: **borrador para revisar**, ya con las respuestas del dueño (§10). Fuente: `docs/claude/tareas.md` + lectura del repo del 2026-11-11.
> Convención: lo que el dueño no dijo queda como **[PENDIENTE]** y no se inventa (lista en §11).

## 1. Problema

Hoy el cliente que entra a `/servicios/ventana` y elige un sistema (Nova) no tiene un camino claro hacia un precio:

- `/presupuesto` exige iniciar sesión y pide DNI/RUC, correo y dirección antes de mostrar nada.
- El cálculo actual suma vidrio + perfil + kit + instalación por separado (`entities/quote/config/pricing.ts`); la regla del dueño es **área × precio por m² con todo incluido**.
- No hay reglas de hojas, ni límites de medida, ni carrito de varias ventanas, ni hoja A4 imprimible.
- Un cliente que no sabe de vidrio no tiene una opción simple ("quiero que me visiten").

## 2. Objetivo

Que un visitante, **sin registrarse**, parta del botón "Cotizar Nova" y en pocos pasos obtenga una **cotización referencial** de una o varias ventanas, la imprima o guarde en A4 y deje su solicitud registrada para que la empresa la encuentre cuando venga a la tienda.

## 3. Alcance

### Incluye (primera entrega: solo categoría **ventana**, sistema **Nova**)

1. Enlace desde `/servicios/ventana` (CTA "Cotizar Nova") a `/presupuesto` con categoría y sistema preseleccionados.
2. Pantalla `/presupuesto` con **2 opciones**: visita técnica gratuita o crear presupuesto.
3. Cotizador de ventana: medidas, vidrio (crudo o templado), colores, arenado/laminado, hojas, flete y precio.
4. Carrito de varias ventanas que se conserva al recargar, con opción de limpiar.
5. Generar presupuesto con solo nombre y teléfono; vista previa; hoja A4.
6. Guardado en Firestore y búsqueda del presupuesto por el personal de la tienda (nombre o teléfono).
7. Aviso a la empresa.

### No incluye (fases posteriores, anotar en `docs/PENDIENTES.md`)

- Otros sistemas de ventana (Serie 25, 35, 62, Acústica, PVC) y otras categorías: se reutilizará el motor, pero sus reglas se definen aparte. La puerta de ducha sí lleva kit; su regla va aparte.
- Los 3 servicios nuevos (espejos, frenos, mantenimiento) y su alta en el panel.
- Colores de vidrio reflejante (azul, gris): entran cuando la API del proveedor esté lista.
- Documento de pedido de compra desde el dashboard (HU13).
- Pedidos a proveedores y la API del bot de catálogo; bot vendedor.
- Notificación por WhatsApp automática (queda como idea).

## 4. Historias de usuario

Personas: **Cliente** (hogar, visitante sin cuenta, cliente eventual), **Personal de tienda** (valida la cotización cuando el cliente viene) y **Empresa** (dueño, recibe los avisos).

| ID                    | Historia                                                                                                                               | Criterio de aceptación (resumen)                                                                                 | RF         |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------- |
| HU1                   | Como **cliente** que mira ventanas Nova, quiero tocar "Cotizar Nova" para llegar al presupuesto sin tener que buscar ni dar mis datos. | Llego a `/presupuesto` con "Ventana · Nova" elegido y sin pedirme datos personales.                              | RF1        |
| HU2                   | Como **cliente** que no sabe de vidrio, quiero poder pedir una visita técnica para que me asesoren en mi casa.                         | Veo dos opciones claras; la visita se presenta como gratuita; envío nombre y teléfono.                           | RF2, RF3   |
| HU3                   | Como **cliente**, quiero ingresar ancho, alto y colores para ver cuánto costaría mi ventana.                                           | Veo el precio al instante; si me equivoco, un mensaje junto al campo me lo dice.                                 | RF4–RF6    |
| HU4                   | Como **cliente**, quiero entender cuántas hojas lleva mi ventana y cómo se reparte para saber qué voy a recibir.                       | Veo número de hojas y distribución en lenguaje claro; si el ancho es muy chico, me recomiendan ventana fija.     | RF7–RF10   |
| HU5                   | Como **cliente**, quiero elegir vidrio crudo o templado y, si quiero, arenado o laminado, para ajustar el precio a mi necesidad.       | El precio cambia según mi elección y el adicional sale como línea aparte.                                        | RF11–RF13  |
| HU6                   | Como **cliente**, quiero agregar varias ventanas a un mismo presupuesto para cotizar toda mi casa.                                     | Puedo agregar, editar y quitar líneas; si recargo la página no pierdo nada; puedo limpiar todo con confirmación. | RF18–RF21  |
| HU7                   | Como **cliente**, quiero ver un total claro, con IGV y flete si vivo fuera de La Molina, para no llevarme sorpresas.                   | Veo subtotal, flete (si aplica), IGV y total; el pago en efectivo o QR muestra su descuento.                     | RF14–RF17  |
| HU8                   | Como **cliente**, quiero obtener mi presupuesto en una hoja A4 para guardarlo o llevarlo a la tienda.                                  | Vista previa con número, líneas, totales y vigencia; puedo imprimirlo o guardarlo en PDF desde el navegador.     | RF24–RF26  |
| HU9                   | Como **cliente eventual**, quiero generar mi presupuesto sin crear una cuenta, dando solo nombre y teléfono.                           | Sin cuenta, sin contraseña; solo nombre, teléfono y aceptación de datos personales.                              | RF22, RF23 |
| HU10                  | Como **personal de tienda**, quiero buscar la cotización por nombre o teléfono para validarla cuando el cliente venga.                 | En el panel de administración encuentro la solicitud con sus líneas y totales.                                   | RF28       |
| HU11                  | Como **empresa**, quiero enterarme cuando alguien genera un presupuesto o pide una visita para llamarlo a tiempo.                      | Recibo un aviso con el número de presupuesto y el contacto del cliente.                                          | RF29       |
| HU12                  | Como **cliente**, quiero que el sistema no se cuelgue si falla la conexión, para no perder lo que armé.                                | Si falla el guardado, conservo mi hoja A4 y mi carrito y veo qué hacer.                                          | RF27       |
| HU13 (fase posterior) | Como **empresa**, quiero generar desde el dashboard un documento de pedido con todo lo que debo comprar a proveedores.                 | Fuera de esta entrega; se define aparte.                                                                         | —          |

## 5. Requisitos funcionales

### Entrada y opciones

- **RF1.** Dado que estoy en `/servicios/ventana` con el sistema Nova elegido, cuando toco "Cotizar Nova", entonces llego a `/presupuesto` con categoría "Ventana" y sistema "Nova" ya elegidos y **sin pedirme datos personales ni sesión**.
- **RF2.** Dado que llego con categoría y sistema, entonces veo dos opciones: "Solicitar visita técnica" y "Crear presupuesto".
- **RF3.** La visita técnica se presenta como **gratuita** (en comunicación, como promoción del mes; en la práctica es siempre gratis). Indica "Visita técnica para: Ventana · Sistema Nova" y se solicita con nombre y teléfono. Atención solo en La Molina, Surco, San Borja, San Isidro y Miraflores.

### Medidas y colores

- **RF4.** Puedo ingresar ancho (m), alto (m), color de vidrio y color de perfil. Se acepta coma y punto decimal. Vidrio: Incoloro, Bronce, Gris. Aluminio: Negro, Mate, Blanco, Madera, Champagne (listas oficiales de `AGENTS.md` §3). El **reflejante** (azul o gris del proveedor) no aparece hasta que la API del proveedor esté lista.
- **RF5.** Dado un valor fuera de rango (vacío, cero, negativo, no numérico o fuera de los límites: ancho máximo 2,80 m; alto de 0,40 m a 2,40 m **[a confirmar: §11, pregunta 10]**), entonces veo un mensaje junto al campo y no se calcula precio. Si las medidas se pasan del máximo, el mensaje dice "Esta medida requiere visita técnica" y ofrece pedirla.
- **RF6.** Puedo editar las medidas y el resultado se recalcula al instante.

### Hojas y cuerpos (ventana corrediza Nova)

- **RF7.** La hoja estándar mide como mínimo **60 cm** de ancho. Cada hoja debe medir entre 60 y 80 cm, con un margen de 5 cm por vanos no exactos.
- **RF8.** Si el ancho total da una hoja menor a 60 cm, el sistema recomienda **ventana o vidrio fijo**.
- **RF9.** Distribución según el ancho: 2 hojas (fija + corrediza), 3 hojas (fija + corrediza + corrediza) y 4 hojas (fija + corrediza + corrediza + fija). Anchos de referencia del dueño (aproximados, porque los vanos no son exactos): 2 hojas ≈ 120 cm, 3 hojas ≈ 180 cm, 4 hojas ≈ 240 cm. Para anchos intermedios se elige el número de hojas que deje cada hoja más cerca de 60 a 80 cm (margen 5 cm); por ejemplo, 1,70 m se cotiza como 2 hojas de 85 cm. Si ninguna opción cumple, se muestra "la medida exacta la define el técnico en la visita".
- **RF10.** El resultado muestra cuántas hojas lleva y su distribución, en lenguaje claro.
- **RF10a.** Dado un alto que obliga a dividir en cuerpos (ventana de piso a techo), se parte en paño fijo superior, cuerpo corredizo central y **paño fijo inferior de 1,10 m** (norma de seguridad). Ejemplo del dueño: 1,80 m de ancho → 1,80 × 0,60, 1,80 × 1,20 y 1,80 × 1,10. El detalle aparece en la vista previa y en el A4.

### Precio

Todos los importes se calculan **sin IGV** y viven en `pricing.ts`, no en componentes.

- **RF11.** **Vidrio crudo:** área (m²) × **S/ 240**.
- **RF12.** **Vidrio templado:** área × **S/ 312** (S/ 240 + 30 %).
- **RF12a.** El precio por m² es el **costo total**: incluye vidrio, perfiles de aluminio, accesorios e **instalación dentro de La Molina**. El espesor es **6 mm fijo** (los perfiles están diseñados para 6 mm; no hay selector de espesor). La ventana **no lleva kit** (el kit es solo de la puerta de ducha). El color de perfil y de vidrio no cambia el precio.
- **RF13.** **Arenado o laminado** (opcional): área × **S/ 80**. Igual precio para ambos; se suma al vidrio, crudo o templado, y no lleva el 30 %. Sale como línea aparte.
- **RF14.** **Flete:** el precio por m² con instalación vale **solo para La Molina**. En cualquier otro distrito se suma un flete **estándar de S/ 120 sin IGV** (el IGV se aplica sobre el subtotal, como en todo el presupuesto). El texto lo aclara: "Otros distritos tienen un costo adicional de S/ 120 sin IGV". Cómo sabe el sistema si el trabajo es en La Molina es **[PENDIENTE: §11, pregunta 11]**.
- **RF15.** **IGV:** 18 % sobre el subtotal. Se muestran subtotal, IGV y total.
- **RF16.** **Formas de pago:** sea T el total con IGV. El **precio de lista** que ve el cliente es **T × 1,05** (ya incluye la comisión de tarjeta, sin llamarla "recargo"). Si paga en **efectivo o QR (Yape, Plin, billetera digital)**, paga **T** (por ejemplo, lista S/ 105 → efectivo S/ 100). Cómo se redacta el beneficio es **[PENDIENTE: §11, pregunta 12]**.
- **RF17.** Todo importe se redondea a 2 decimales y se muestra como `S/ 1 234,56`. Dado un sistema sin precio definido, se muestra "Precio a definir" y no se calcula total. El área mínima cobrada es **0,10 m²**.

### Carrito

- **RF18.** "Agregar al presupuesto" añade la ventana con medidas, vidrio, perfil, hojas, adicionales y precio; limpia el formulario; mantiene categoría y sistema.
- **RF19.** Puedo agregar varias ventanas y cambiar de categoría. Puedo **editar o quitar** una línea.
- **RF20.** El total es la suma de líneas, con las reglas RF14–RF16.
- **RF21.** El carrito **se conserva siempre** al recargar la página (almacenamiento del navegador). Hay un botón "Limpiar presupuesto" que pide confirmar en un modal antes de borrar todo.

### Cierre y datos

- **RF22.** "Generar presupuesto" pide **solo nombre y teléfono** (obligatorios) y la aceptación del tratamiento de datos personales (Ley 29733; autoridad ANPDP). **No se exige cuenta ni sesión.** El texto de aceptación reutiliza el del formulario de contacto ("He leído y acepto las Políticas de Privacidad (Ley N° 29733) y el tratamiento de mis datos para la cotización solicitada") con enlace a `/politicas-empresa`, que ya está publicada.
- **RF23.** Sin nombre, teléfono peruano válido (9 dígitos que empiezan con 9) o aceptación marcada, no se genera y se indica qué falta.
- **RF24.** Vista previa del presupuesto con datos de la empresa **solo desde `companyData`**.
- **RF25.** La hoja es **HTML en formato A4** con membrete de marca, número correlativo (`GYA-AAAA-XXXX`), líneas, totales, datos bancarios y detalle de cuerpos. El cliente la imprime o la guarda en PDF con el navegador. Se imprime desde el navegador, lo más sencillo posible; un botón de PDF directo queda para más adelante. **No se sube ningún PDF a Storage.**
- **RF26.** El documento dice que los precios son **aproximados**, que medidas y precios los valida un técnico y un vendedor autorizado, que pueden cambiar sin aviso, y su **vigencia**: **24 horas** si se generó por la web; **15 días** si lo arma la tienda después de la visita técnica (medidas verificadas en sitio).

### Guardado, búsqueda y aviso

- **RF27.** Al generar, la solicitud se guarda en Firestore (`presupuestos_solicitados`) con su correlativo y todos sus datos. Si el guardado o el aviso falla, el cliente conserva su hoja A4 y su carrito y ve qué hacer (escribir por WhatsApp).
- **RF28.** El personal de tienda puede **buscar la solicitud por nombre o teléfono** en el panel de administración (solo rol admin).
- **RF29.** La empresa recibe aviso del presupuesto o la visita en el correo de `companyData`. Provisional: enlace de WhatsApp con el número de presupuesto.

## 6. Requisitos no funcionales

- **RNF1. Mobile-first:** funciona desde 360 px sin scroll horizontal; en pantallas anchas el formulario y el resumen se reparten el ancho.
- **RNF2. Diseño:** objetivos táctiles ≥ 44 px, contraste según `DESIGN.md`, `dvh` en vez de `100vh`, solo tokens del tema, componentes primero en `/design-system`.
- **RNF3. Lenguaje:** textos con trato de **usted**, naturales y propios del rubro; sin proveedores a la vista; ortografía "antirruido", "vidrio y aluminio".
- **RNF4. Rendimiento:** el precio se recalcula en el navegador, sin llamadas a la red; respuesta percibida instantánea.
- **RNF5. Exactitud:** el motor de reglas (hojas, cuerpos, precio) es una **función pura**, sin React ni Firebase, verificada con un script contra los datos de §8. Los importes se redondean a 2 decimales de forma consistente.
- **RNF6. Configurable:** precios, porcentajes, flete y límites viven en `pricing.ts`; cambiar un precio no exige tocar componentes.
- **RNF7. Privacidad y seguridad:** cumple Ley 29733 y su reglamento; solo se piden nombre y teléfono; los presupuestos solo los lee el rol admin; el cliente no ve proveedores ni sus fotos o planos.
- **RNF8. Antiabuso:** como se crea sin sesión, se limita la frecuencia de envíos y se evita el doble envío (un solo correlativo por clic).
- **RNF9. Resiliencia:** si el almacenamiento del navegador falla (modo privado), la página sigue funcionando sin guardar el carrito; sin conexión, el cliente no pierde su carrito.
- **RNF10. Accesibilidad:** formularios con etiquetas, errores asociados al campo y navegación por teclado.
- **RNF11. Impresión:** la hoja A4 se ve correcta al imprimir, con márgenes y saltos de página que no cortan líneas.
- **RNF12. Código:** sin `console.log` (usar `@/shared/utils/logger`); reglas de FSD respetadas (reglas en `entities/quote`, UI en `screens/Presupuesto`).
- **RNF13. Entorno:** todo se prueba **solo en emuladores**; ningún despliegue sin autorización del dueño.

## 7. Casos límite

| Caso                                           | Comportamiento esperado                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ancho = 0, negativo, vacío o texto             | Error en el campo; sin precio                                                                           |
| Ancho 10 000 m                                 | Error por máximo; sin precio                                                                            |
| Ancho entre 0,10 y 0,59 m                      | Se recomienda ventana fija (RF8); precio por área igual                                                 |
| Ancho 1,40 m                                   | 2 hojas                                                                                                 |
| Ancho entre dos tramos (por ejemplo 1,70 m)    | Se elige el número de hojas con hoja más cercana a 60–80 cm, con margen de 5 cm                         |
| Ancho sobre 2,80 m o alto fuera de 0,40–2,40 m | Mensaje: requiere visita técnica; se ofrece la opción 1 **[alto máximo a confirmar: §11, pregunta 10]** |
| Alto 1,80–2,40 m                               | Una sola ventana, sin división                                                                          |
| Alto > 2,40 m                                  | Se divide en cuerpos (RF10a)                                                                            |
| Área menor a 0,10 m²                           | Se cobra 0,10 m²                                                                                        |
| Decimales con coma ("1,45")                    | Se acepta coma y punto                                                                                  |
| Instalación fuera de La Molina                 | Se suma flete de S/ 120 sin IGV (RF14)                                                                  |
| Sistema sin precio definido                    | "Precio a definir"; no se calcula total                                                                 |
| Carrito vacío                                  | "Generar" desactivado                                                                                   |
| Doble clic en "Generar"                        | Un solo correlativo y un solo documento                                                                 |
| Sin conexión al guardar                        | RF27                                                                                                    |
| Teléfono peruano                               | 9 dígitos que empiezan con 9 (reutilizar `normalizePhone`)                                              |
| Recarga de página                              | El carrito se conserva (RF21)                                                                           |
| Limpiar presupuesto                            | Modal de confirmación; si cancela, no se borra nada                                                     |
| Cotización de la web después de 24 h           | Se muestra vencida; la tienda emite una nueva con vigencia de 15 días tras la visita                    |

## 8. Datos de prueba (valores del dueño)

| Entrada                                                  | Esperado                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| 1,20 × 1,60 m, crudo                                     | área 1,92 m² → S/ 460,80 sin IGV                                     |
| 1,45 × 1,60 m, crudo                                     | área 2,32 m² → S/ 556,80 sin IGV                                     |
| 1,48 × 1,80 m, crudo                                     | área 2,664 m² → S/ 639,36 sin IGV                                    |
| 1,20 × 1,60 m, templado                                  | 1,92 × 312 = S/ 599,04 sin IGV                                       |
| 1,20 × 1,60 m, crudo + arenado                           | 460,80 + 153,60 = S/ 614,40 sin IGV                                  |
| 1,20 × 1,60 m, templado + laminado                       | 599,04 + 153,60 = S/ 752,64 sin IGV                                  |
| Crudo + arenado, con IGV (confirmado 2026-11-11)         | subtotal 614,40; IGV 110,59; total 724,99                            |
| Templado + arenado, con IGV (confirmado 2026-11-11)      | subtotal 752,64; IGV 135,48; total 888,12                            |
| Carrito de las 3 ventanas crudas                         | subtotal S/ 1 656,96; IGV S/ 298,25; total S/ 1 955,21               |
| Mismo carrito, precio de lista (5 % de tarjeta incluido) | S/ 1 955,21 × 1,05 = S/ 2 052,97                                     |
| Mismo carrito, pago en efectivo o QR                     | S/ 1 955,21 (total sin comisión)                                     |
| Mismo carrito fuera de La Molina                         | subtotal 1 656,96 + flete 120 = 1 776,96; IGV 319,85; total 2 096,81 |
| 1,80 de ancho, piso a techo                              | cuerpos 1,80 × 0,60, 1,80 × 1,20 y 1,80 × 1,10                       |

(Los cálculos se verifican en el script de la tarea T2; si el redondeo difiere, manda el script.)

## 9. Criterio de terminado

1. Todos los requisitos RF1–RF29 marcados _cumple_ o _no verificado_ con evidencia.
2. `pnpm run typecheck`, `pnpm run lint` y `pnpm run build` pasan.
3. El script de reglas (T2) pasa completo.
4. Prueba manual del dueño en teléfono real (360 px) del flujo completo.
5. Entrada en `docs/05_CHANGELOG.md` y pendientes actualizados en `docs/PENDIENTES.md`.

## 10. Respuestas del dueño (preguntas P1 a P12)

> Cómo responder: escriba después de **Respuesta:**, en la misma línea o debajo. Cada pregunta termina en la línea `---`.

### P1. Instalación

¿La instalación está incluida en los S/ 240 (crudo) y S/ 312 (templado), o se cobra aparte? Si va aparte, ¿cuánto?

**Respuesta:**
es lo que llamana costo total , incluye instalacion , dentro de la molina , si es feura del distrito tiene un aumento de 120 soles adicinoal por el flete o distancia mientra mas lejos va aumentado el precio el tope maximo seria 200 soles , la gasolina esta cara distancia tiempo de ida y vuelta

---

### P2. Espesor del vidrio

El espesor por defecto es 6 mm. ¿El cliente puede elegir otros espesores? Si puede, ¿cuánto cambia el precio?

**Respuesta:**
si por temas de producto las ventanas son de 6 mm aperte , los perfiles de aluminio son para vidrio de espesor de 6 mm ,

---

### P3. Recargo de tarjeta

El 5 % por pagar con tarjeta, ¿se suma al total con IGV o antes del IGV?

**Respuesta:**
al total , o se puede dar el precio total que ya calcule el 5% y ofrece una promocion de descuetno de 5% si el pago es en efectivo o pago con QR (YAPE -PLIN-billetera digital) , asi el cliente no siente que ete pagado ese 5% por eso de tarjeta

---

### P4. Cuántas hojas según el ancho

¿Hasta qué ancho son 2 hojas, 3 hojas y 4 hojas? Referencia con hojas de 60 a 80 cm: 2 hojas = 1,20 a 1,60 m; 3 hojas = 1,80 a 2,40 m; 4 hojas = 2,40 a 3,20 m.

**Respuesta:**
1 hoja es de minimo 60 cm puede ser menos pero el estandar es de 60 cm , si es menos se recomienda ventana o vidrio fijo

---

### P5. Medidas máximas y mínimas

¿Cuál es el ancho máximo (2,40 o 2,80 m)? ¿Cuál es la altura mínima y la máxima?

**Respuesta:**

---

### P6. Área mínima

El código actual cobra como mínimo 0,10 m². ¿Es correcto o usa otro mínimo?

**Respuesta:**
digamos que si , es dificl que exista ventana de 0.10 cm de ancho, no?

---

### P7. Vigencia del presupuesto

¿24 horas o 15 días?

**Respuesta:**
por la web es de 24 horas , presupuesto armados en tienda despues de la visita tecnica es de 15 dias , porque se verifico las medidas en situ

---

### P8. Colores de vidrio

Hoy solo hay incoloro, bronce y gris. ¿Entra "reflejante" u otro color?

**Respuesta:**
segun el proveedor existe reflejante color azul o gris , cuando este listo la api consultaras

---

### P9. Texto de protección de datos

¿Uso el texto de la política de privacidad que ya existe en la web?

**Respuesta:**
hay documentacion sobre libro de reclamaciones - indecopi pero no se si estara completo

---

### P10. Visita técnica

¿Es gratuita o tiene costo? (La atención es solo en La Molina, Surco, San Borja, San Isidro y Miraflores.)

**Respuesta:**
ponerlo como promcion que la visita tecnica es gratis durante este mes , cosas de marketing , pero siempre es gratis

---

### P11. Presupuesto sin iniciar sesión

¿El cliente puede crear su presupuesto sin registrarse? Hoy la página lo exige.

**Respuesta:**
si , estaba pensado que seria por gusto que el cliente cree una cuenta pues solo pidira un servicio de instalacion y alli acaba no va ingresar a cada rato a la pagina , son clientes eventuales , editar esa regla , no es necesario registrarse , solo poner como obligatorio nombre y telefono ,para buscarlo su cotizacion cuando el cliente venga a tienda a validar su cotizacion,

---

### P12. Carrito al recargar la página

Si el cliente recarga la página, ¿se conserva lo que ya agregó?

**Respuesta:**
si siempre , o sino agrega una opcion de limpiar formulario , y el modal de confimar que va a borrar todo "el carrito"

---

## 11. Preguntas pendientes

> Cómo responder: escriba después de **Respuesta:**. Debajo de cada pregunta hay un **ejemplo de respuesta** solo para darle una idea; no es una decisión ni un dato real. Ordenadas de lo que más bloquea a lo que puede esperar.
> **Estado (2026-11-11):** preguntas 1 a 9 respondidas e incorporadas a los requisitos. Quedan 3 nuevas (10 a 12), que salieron de sus respuestas.

### Pregunta 1. Medidas máximas y mínimas

_Bloquea: validación y mensajes de error (T1, T3)._

¿Cuál es el ancho máximo (2,40 o 2,80 m)? ¿Cuál es la altura mínima y la máxima? ¿Qué debe decir el sistema cuando se pasan?

**Ejemplo de respuesta:** Ancho máximo 2,80 m. Alto mínimo 0,40 m y máximo 2,40 m. Si se pasan, el sistema dice: "Esta medida requiere visita técnica" y ofrece pedirla.

**Respuesta:**
Ancho máximo 2,80 m. Alto mínimo 0,40 m y máximo 2,40 m. Si se pasan, el sistema dice: "Esta medida requiere visita técnica" y ofrece pedirla.

---

### Pregunta 2. Hojas: máximo por hoja y anchos intermedios

_Bloquea: cuántas hojas lleva cada ancho (T3)._

Ya tenemos: la hoja estándar mide 60 cm y los anchos de referencia son 2 hojas ≈ 120 cm, 3 hojas ≈ 180 cm, 4 hojas ≈ 240 cm (aproximados, porque los vanos no son exactos). Falta: (a) ¿el máximo por hoja sigue siendo 80 cm? (b) ¿qué hacemos con anchos intermedios como 1,70 m (2 hojas de 85 cm o 3 de 57 cm) o 2,30 m? (c) ¿qué margen de error aceptamos?

**Ejemplo de respuesta:**
(a) Sí, máximo 80 cm por hoja.
(b) Se elige el número de hojas que deje cada hoja más cerca de 60 a 80 cm.
(c) Margen de 5 cm: 1,70 m se cotiza como 2 hojas de 85 cm. Si ninguna opción cumple, el sistema dice "la medida exacta la define el técnico en la visita".

**Respuesta:**
(a) Sí, máximo 80 cm por hoja.
(b) Se elige el número de hojas que deje cada hoja más cerca de 60 a 80 cm.
(c) Margen de 5 cm: 1,70 m se cotiza como 2 hojas de 85 cm. Si ninguna opción cumple, el sistema dice "la medida exacta la define el técnico en la visita".

---

### Pregunta 3. Flete fuera de La Molina

_Bloquea: total del presupuesto (T1, T3)._

Usted dijo S/ 120 fuera de La Molina, subiendo con la distancia hasta S/ 200. (a) ¿Cuánto cuesta cada distrito de atención (Surco, San Borja, San Isidro, Miraflores)? (b) ¿El flete lleva IGV? (c) ¿Se le pide el distrito al cliente en el formulario?

**Ejemplo de respuesta:** (Los montos de este ejemplo son inventados, solo para mostrar el formato.) (a) Surco S/ 120, San Borja S/ 140, San Isidro S/ 160, Miraflores S/ 180; nunca más de S/ 200. (b) Sí, lleva IGV como todo el presupuesto. (c) Sí, el cliente elige el distrito (opcional); si no lo elige, el sistema muestra "flete por confirmar".

**Respuesta:**
precio estandar a todo lima 120 soles adiconales sin igv
poner que solo es para la molina , otros distritos tiene costo adicional de 120 soles sin igv

---

### Pregunta 4. Descuento por efectivo o QR

_Bloquea: total que ve el cliente (T3, T7)._

El precio que se muestra ya incluye el 5 % de tarjeta. Si se descuenta otro 5 % por pagar en efectivo o QR, el cliente paga el 99,75 % del total sin comisión (ejemplo: S/ 1 950,32 en lugar de S/ 1 955,21). ¿Está bien así, o el descuento debe devolverlo exactamente al total sin comisión (dividir entre 1,05)?

**Ejemplo de respuesta:** Que lo devuelva exactamente al total sin comisión: el pago en efectivo o QR es S/ 1 955,21.

**Respuesta:**
aqui no te entiendo supognamos que el total despues de igv sale 100 , aqui aplicar el 5%,105 soles , si decise pagar con efectivo paga 100 soles ,

---

### Pregunta 5. Autorización para tocar código congelado

_Bloquea: guardar sin sesión y avisar a la empresa (T12, T20)._

Necesito modificar `firestore.rules` y crear una Cloud Function en `apps/functions/` (hoy congelados por `AGENTS.md`). ¿Me autoriza, siempre probando solo en emuladores y sin desplegar? Si no, empiezo sin tocarlos: el presupuesto se guarda en el navegador y el aviso va por WhatsApp.

**Ejemplo de respuesta:** Sí, autorizo modificar `firestore.rules` y crear la función, solo en emuladores y sin desplegar. Antes de desplegar, usted me muestra los cambios.

**Respuesta:**
si autorizo,primero en emuladores,

---

### Pregunta 6. Hoja A4 y PDF

_Bloquea: botón de descarga (T11)._

Sus notas piden "todo en HTML" y a la vez "o una librería para que el cliente genere un PDF". Propongo empezar con la hoja A4 en HTML y la impresión del navegador (el cliente elige "Guardar como PDF"), sin librería. ¿Está bien, o quiere un botón que baje el PDF directo?

**Ejemplo de respuesta:** Por ahora basta con imprimir desde el navegador. Más adelante vemos el botón de PDF.

**Respuesta:**
Por ahora basta con imprimir desde el navegador. Más adelante vemos el botón de PDF. lo mas sencillo posible ,

---

### Pregunta 7. Quién valida el texto de protección de datos

_Bloquea: casilla de aceptación (T9)._

No hay confirmación de que el texto del libro de reclamaciones esté completo para este uso. ¿Quién lo valida (abogado o usted) antes de publicar? ¿Mientras tanto uso un texto provisional con marcador visible?

**Ejemplo de respuesta:** Lo revisa mi abogado. Mientras tanto, usa el texto del libro de reclamaciones con un marcador visible "texto legal por validar".

**Respuesta:**
indecopi dejas las reglas clara , habia una carpeta donde estaba toda la informacion , normal publicada , laginas web , y la ficha de libro de reclamaciones

---

### Pregunta 8. Texto de la visita técnica gratuita

_Puede esperar: textos de la pantalla (T5)._

Usted pidió ponerla como promoción "gratis este mes" aunque siempre sea gratis. Para no cambiar el texto cada mes, ¿lo escribo como "Visita técnica gratuita" sin fecha, o con "este mes" y usted lo actualiza?

**Ejemplo de respuesta:** "Visita técnica gratuita", sin fecha.

**Respuesta:**
visita técnica gratuita"

---

### Pregunta 9. Pedido de compra desde el dashboard

_Puede esperar: fase posterior._

Quedó fuera de esta entrega. ¿Lo anoto en `docs/PENDIENTES.md` como trabajo aparte? ¿Qué datos debe llevar el documento (proveedor, producto, medidas, cantidades, precio de compra)?

**Ejemplo de respuesta:** Sí, anótalo como trabajo aparte. Debe llevar proveedor, producto, medidas, cantidad y fecha de pedido; sin precio de compra en el documento.

**Respuesta:**
Sí, anótalo como trabajo aparte. Debe llevar proveedor, producto, medidas, cantidad y fecha de pedido; sin precio de compra en el documento.

---

### Pregunta 10. Alto máximo y ventanas de piso a techo

_Bloquea: validación de medidas (T1, T3)._

En la pregunta 1 quedó alto máximo de 2,40 m (era un ejemplo mío). Pero su ejemplo de piso a techo suma 0,60 + 1,20 + 1,10 = 2,90 m de alto. ¿Cuál es el alto máximo que debe aceptar el cotizador?

**Ejemplo de respuesta:** Alto máximo 3,00 m. Sobre 2,40 m el sistema divide en cuerpos (paño fijo inferior de 1,10 m) y lo avisa.

**Respuesta:**
como te digo son casos particulares que se necesita una visita tecnica

---

### Pregunta 11. ¿Cómo sabe el sistema si es La Molina?

_Bloquea: flete (T3, T6)._

Como el flete de S/ 120 sin IGV solo aplica fuera de La Molina, el cliente tiene que indicarlo. ¿Pongo una pregunta simple "¿La instalación es en La Molina? Sí / No" en el formulario del presupuesto?

**Ejemplo de respuesta:** Sí, un selector "Sí / No". Si responde "No", se suma el flete y se muestra el aviso.

**Respuesta:**
indicar en label que solo estamos disponbile en la molina , y avissar que fuera de la molina hay costo adicional de hasta 120 soles sin igv o agregar como poltiicas tambien

---

### Pregunta 12. Cómo se dice el beneficio por efectivo o QR

_Puede esperar: textos de la pantalla (T7)._

Con su regla (lista S/ 105, efectivo S/ 100), el descuento real es 4,76 %, no 5 %. Para no decir algo inexacto en un documento de venta, propongo mostrar el ahorro en soles, no el porcentaje. ¿Le parece bien?

**Ejemplo de respuesta:** Sí: "Pagando en efectivo o por QR (Yape, Plin) usted paga S/ 100 en lugar de S/ 105".

**Respuesta:**
alli tiene que trabajar el agente de copy o marketing

---

## 12. Restricciones del repo que afectan esta spec

- `apps/functions/`, `firestore.rules`, `storage.rules` y `firebase.json` están **congelados** (`AGENTS.md` §5). El aviso por correo (RF29) y guardar sin sesión (RF27) probablemente necesitan una Cloud Function y reglas nuevas en Firestore: **requiere autorización explícita del dueño** antes de tocarlos. Como ya no se sube PDF (RF25), `storage.rules` no hace falta. Alternativa temporal: aviso por WhatsApp o por la función de contacto ya existente.
- No hay librería de PDF en `apps/web/package.json`; con la hoja A4 en HTML no hace falta (ver §11, pregunta 6).
- Las páginas siguen congeladas hasta aprobar cada lote (diseño): este trabajo es un **lote nuevo** y se prueba en emulador antes de cualquier deploy.
- No hay tests en el repo; el script de T2 sería el primero.

1. dime como descongelar la carpeta apps/functions/
2. no se debe subir pdf , todo es html , el boton de generar es al nivel de html ya que toda la informacion estara en firebase firestore o firebase realtime ,
3. no usar pdf , todo es html , o agregar un libreria cuando el cliente genere un pdf sea de su pruepuesto
   3.1 tambien cuando se genre un pedido por el dashboar , tambien debe genera un documetno de pedido con todo lo que se pide para comprar

4. ok probar solo en emuladores
