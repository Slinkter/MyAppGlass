# Diploma Ingeniería de Software con IA — Sesión 1: Repaso sobre Diseño Frontend Engineering

- **Institución**: DMC Institute
- **Sesión**: 1 — Repaso sobre diseño frontend engineering
- **Docente**: Jorge Lozano
- **Proyecto Integrador**: TurnoYa (reservas de citas para negocios de servicios)

---

## Bienvenida y Agenda de la Sesión

| # | Bloque | Descripción | Duración |
| :---: | :--- | :--- | :---: |
| **1** | **Apertura · Objetivos, ruta del curso y proyecto integrador** | Qué construiremos en las 5 sesiones: TurnoYa | 8 min |
| **2** | **Principios de UX/UI: fundamentos, heurísticas y leyes** | Jerarquía, tipografía, color, Gestalt, 10 heurísticas de Nielsen y 6 leyes de UX | 27 min |
| **3** | **Accesibilidad web: WCAG 2.2** | POUR, niveles A/AA/AAA, criterios clave, contraste, ARIA y cómo probar | 20 min |
| **4** | **Taller 1 · Auditoría UX/UI y corrección accesible** | Auditas la pantalla de reserva y corriges 4 grupos de problemas en código | 25 min |
| **5** | **Receso** | Pausa activa | 10 min |
| **6** | **Components & Design Systems + Taller 2** | Atomic design, tokens en 3 capas, anatomía y estados · Tokens y componentes | 35 min |
| **7** | **Responsive & Mobile Design** | Mobile-first, unidades, grid intrínseco, container queries · Catálogo responsive | 25 min |
| **8** | **Cierre · Recursos y próxima sesión** | Resumen y preguntas | 5 min |

---

## Proyecto Integrador — TurnoYa: Reservas de citas para negocios de servicios

### El Problema
Barberías, consultorios y spas agendan por WhatsApp y llamadas: **dobles reservas, clientes que no llegan** y el dueño contestando mensajes en vez de atender.

### Dos usuarios, dos contextos (User Personas)
1. **Camila, 29 · cliente**:
   Reserva desde el celular, en el bus, con una mano. No quiere crear cuenta. Necesita ver horarios libres y confirmar en menos de 60 segundos.
2. **Don Raúl, 52 · dueño**:
   Revisa la agenda en una tablet en el mostrador, entre cliente y cliente. Necesita ver el día de un vistazo y bloquear horarios.

### Pantallas del MVP

| Historia de Usuario | Pantalla | Dispositivo / Contexto |
| :--- | :--- | :--- |
| **HU-01** | Catálogo de servicios | Móvil |
| **HU-02** | Selección de horario | Móvil |
| **HU-03** | Reserva y confirmación | Móvil |
| **HU-05 / 06** | Agenda del negocio | Tablet · Tarea |

---

# 01. Principios de UX/UI
*Fundamentos visuales, heurísticas de usabilidad y leyes de UX que todo frontend debe dominar.*

## 1.1 UX y UI: dos disciplinas, un mismo objetivo

**UX (User Experience)** es cómo se siente y funciona el producto para la persona: si logra su objetivo, con cuánto esfuerzo y con qué confianza. La norma **ISO 9241-210** la define como las percepciones y respuestas de una persona que resultan del uso de un producto. **UI (User Interface)** es la capa visible e interactiva donde esa experiencia ocurre.

| UX responde: *¿funciona?* | UI responde: *¿se entiende?* |
| :--- | :--- |
| - Flujos y número de pasos<br>- Arquitectura de información<br>- Estados: vacío, carga, error, éxito<br>- Microcopy: qué dice cada texto<br>- Métricas: tasa de éxito, tiempo, abandono | - Jerarquía visual<br>- Tipografía, color y espaciado<br>- Componentes y sus estados<br>- Consistencia entre pantallas<br>- Feedback visual de cada acción |

---

## 1.2 Fundamentos de UI

### A. Jerarquía visual: decidir qué se ve primero
La jerarquía visual ordena la atención: el ojo recorre la pantalla de lo más llamativo a lo menos. Si todo destaca, nada destaca. Se construye con **5 herramientas** que se combinan:

1. **Tamaño**: Lo más grande se lee primero. Usa una escala con saltos claros (`16 → 20 → 24 → 32 px`), no `16 vs 17 px`.
2. **Peso**: Negrita (`600–700`) para títulos y datos clave; regular (`400`) para el cuerpo.
3. **Color y contraste**: El color de marca solo en lo accionable o importante. El texto secundario en gris.
4. **Posición**: En occidente se lee de arriba a la izquierda hacia abajo a la derecha.
5. **Espacio**: El espacio en blanco aísla y da importancia. Agrupa lo relacionado y separa lo distinto.

#### Ejemplo: Mismo contenido, dos jerarquías

| ✗ Sin jerarquía (todo pesa igual) | ✓ Con jerarquía (`nombre → precio → acción`) |
| :--- | :--- |
| Corte clásico<br>30 min<br>S/ 35<br>Disponible hoy<br>Reservar | `[Badge: Disponible hoy]`<br>**Corte clásico** *(Título grande en negrita)*<br>30 min · Tijera y máquina *(Texto secundario gris)*<br>**S/ 35** *(Precio destacado en color primario)*<br>`[Botón primario sólido: Reservar]` |

---

### B. Tipografía: legibilidad antes que estilo
En una interfaz el 90 % del contenido es texto. Una buena tipografía de UI se decide con **números**, no con gusto: escala, interlineado, longitud de línea y unidades.

- **Escala modular**: Multiplica una base por una razón fija. Base `16 px × 1.25 → 16, 20, 25, 31…` Así los saltos se perciben como intencionales.
- **Interlineado (`line-height`)**: `1.5` para párrafos, `1.2` para títulos. Sin unidades: `line-height: 1.5` escala con la letra.
- **Longitud de línea**: Entre 45 y 75 caracteres por línea. Más larga cansa; más corta corta la lectura. En CSS: `max-width: 65ch`.
- **Pocas familias**: Una o dos familias como máximo. Las fuentes del sistema (`system-ui`) cargan al instante.
- **Unidades `rem`**: `1rem` = tamaño base que eligió el usuario en su navegador. Con `px` ignoras esa preferencia.

```css
/* Escala tipográfica */
:root {
  /* base 16px, razón 1.25 (tercera mayor) */
  --font-size-sm:  .875rem; /* 14px · ayudas    */
  --font-size-md:  1rem;    /* 16px · cuerpo    */
  --font-size-lg:  1.25rem; /* 20px · subtítulo */
  --font-size-xl:  1.5rem;  /* 24px · título    */
  --font-size-2xl: 2rem;    /* 32px · portada   */
}
body {
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: var(--font-size-md);
  line-height: 1.5;
}
h1, h2 { line-height: 1.2; }
p      { max-width: 65ch; } /* 45–75 caracteres */
```

---

### C. Color: roles, proporciones y significado
En UI el color no es decoración: **comunica jerarquía y estado**. Por eso se organiza por **roles**, no por tonos favoritos.

| Rol de Color | Uso en la Interfaz |
| :--- | :--- |
| **Marca / acción** | Botones primarios, links, selección |
| **Texto** | Títulos y cuerpo |
| **Texto secundario** | Ayudas, metadatos |
| **Fondo / superficie** | Canvas, tarjetas |
| **Error / peligro** | Validación, acciones destructivas |
| **Éxito** | Confirmaciones, disponible |

> **Regla 60-30-10**: 60 % neutro dominante, 30 % color secundario, 10 % acento para lo accionable.

#### Reglas clave del color en UI
- **El color nunca va solo**: Un estado (error, ocupado, seleccionado) siempre se acompaña de texto, ícono o forma. Así lo entiende quien no distingue colores (**WCAG 1.4.1**).
- **Un color, un significado**: Si el teal es "acción", no lo uses para decorar un título. Si el rojo es "error", no lo uses para una oferta.
- **Contraste medible**: Texto `4.5:1` y componentes `3:1`.
- **Modo oscuro ≠ invertir**: Se redefinen los roles: superficies oscuras, marca más clara, sombras casi invisibles.

---

### D. Espaciado y grilla: el ritmo invisible
El espaciado consistente es lo que hace que una interfaz se vea "profesional" sin que nadie sepa explicar por qué. La técnica más usada es la **grilla de 8 puntos** (con medio paso de 4).

- **Escala fija**: Todos los márgenes, paddings y gaps salen de `4, 8, 12, 16, 24, 32, 40…` Nunca `13` ni `17 px`.
- **Proximidad = relación**: Lo que está cerca se percibe como un grupo. El label va pegado a su campo (`8 px`) y lejos del campo anterior (`20 px`).
- **Interno ≤ externo**: El espacio dentro de un componente debe ser menor o igual que el espacio que lo separa de otros.
- **Áreas táctiles**: Mínimo `44 px` de alto en móvil, con al menos `8 px` entre objetivos.

#### Escala de espaciado de TurnoYa
- `--space-1`: `4 px`
- `--space-2`: `8 px`
- `--space-3`: `12 px`
- `--space-4`: `16 px`
- `--space-6`: `24 px`
- `--space-8`: `32 px`

---

### E. Principios de Gestalt: cómo agrupa el cerebro
La psicología de la Gestalt (Alemania, década de 1920) explica que percibimos **conjuntos** antes que elementos sueltos. En UI se usa para que la estructura se entienda sin leer.

| Principio | Concepto | Aplicación en UI |
| :--- | :--- | :--- |
| **1. Proximidad** | Elementos cercanos se ven como grupo. | Label pegado a su input; tarjetas separadas por `16 px`. |
| **2. Similitud** | Lo que se parece se percibe como de la misma clase. | Todos los links del mismo color; todos los chips con la misma forma. |
| **3. Región común** | Lo que comparte un fondo o borde forma un grupo. | La tarjeta del servicio agrupa nombre, precio y botón. |
| **4. Continuidad** | El ojo sigue líneas y alineaciones. | Indicador de pasos `1 → 2 → 3`; campos alineados a la izquierda. |
| **5. Cierre** | Completamos formas incompletas. | Un carrusel con la última tarjeta cortada invita a deslizar. |
| **6. Figura-fondo** | Separamos lo que está delante de lo que está atrás. | Un modal con fondo oscurecido enfoca la atención. |

---

## 1.3 Heurísticas de Usabilidad de Nielsen

Son **10 principios generales de usabilidad** publicados por **Jakob Nielsen en 1994** (a partir de su trabajo con Rolf Molich en 1990). Se llaman heurísticas porque son reglas prácticas, no normas exactas. Con ellas se hace una **evaluación heurística**: revisar una interfaz contra cada principio sin necesidad de usuarios.

> Según Nielsen, **3 a 5 evaluadores** encuentran cerca del **75 %** de los problemas. Uno solo encuentra alrededor de un tercio.

### Resumen de las 10 Heurísticas y Escala de Severidad

| Código | Heurística | Nivel | Escala de Severidad (Nielsen) |
| :---: | :--- | :---: | :--- |
| **H1** | Visibilidad del estado del sistema | **0** | No es un problema |
| **H2** | Coincidencia con el mundo real | **1** | **Cosmético**: arreglar si sobra tiempo |
| **H3** | Control y libertad del usuario | **2** | **Menor**: prioridad baja |
| **H4** | Consistencia y estándares | **3** | **Mayor**: prioridad alta |
| **H5** | Prevención de errores | **4** | **Catástrofe**: impide la tarea, corregir ya |
| **H6** | Reconocer antes que recordar | | |
| **H7** | Flexibilidad y eficiencia de uso | | |
| **H8** | Diseño estético y minimalista | | |
| **H9** | Reconocer, diagnosticar y recuperarse de errores | | |
| **H10** | Ayuda y documentación | | |

---

### Detalle de las 10 Heurísticas (H1 – H10)

#### H1 · Visibilidad del estado del sistema
El sistema debe **mantener informado al usuario** sobre lo que está pasando, con un feedback adecuado y en un tiempo razonable. Nadie debería preguntarse *"¿funcionó?"*.

- **En la práctica**:
  - **Feedback inmediato**: Cada clic produce un cambio visible en menos de `0.1 s`.
  - **Progreso visible**: Indicador "Paso 2 de 3", barras de carga, contador de caracteres.
  - **Estado actual claro**: Qué filtro está activo, qué horario está elegido, en qué pantalla estoy.
- **✗ Así se viola (TurnoYa)**: Camila toca "Reservar", la pantalla no cambia durante 6 segundos y vuelve a tocar: **se crean dos reservas**.
- **✓ Así se cumple**: El botón cambia de inmediato a `"Reservando…"` con un spinner, se deshabilita y al terminar aparece la confirmación con código.

```javascript
// Estado de carga accesible
btn.disabled = true;                 // evita el doble envío
btn.setAttribute('aria-busy', 'true');
btn.textContent = 'Reservando…';
```
```html
<p aria-live="polite">Paso 2 de 3</p> <!-- se anuncia -->
```

---

#### H2 · Coincidencia entre el sistema y el mundo real
El sistema debe **hablar el lenguaje del usuario**, con palabras, conceptos y convenciones que le sean familiares, no términos internos del sistema. La información aparece en un orden natural y lógico.

- **En la práctica**:
  - **Vocabulario del cliente**: "Reserva tu cita" en lugar de "Booking de slot"; "Celular" en lugar de "MSISDN".
  - **Formatos locales**: `S/ 35`, `"sáb 24 oct"`, `"10:30 a. m."`.
- **✗ Así se viola (TurnoYa)**: La lista de servicios muestra `SRV-001`, `SRV-002`… y el botón dice `"Submit"`.
- **✓ Así se cumple**: `"Corte clásico · 30 min · S/ 35"` y un botón `"Confirmar reserva"`.

```javascript
// Formatos locales con la API Intl
const soles = new Intl.NumberFormat('es-PE',
  { style: 'currency', currency: 'PEN' });
soles.format(35);                    // "S/ 35.00"

new Intl.DateTimeFormat('es-PE',
  { weekday: 'short', day: 'numeric', month: 'short' })
  .format(fecha);                    // "sáb, 24 oct"
```

---

#### H3 · Control y libertad del usuario
Los usuarios se equivocan a menudo y necesitan una **"salida de emergencia"** claramente marcada para abandonar la acción no deseada sin pasar por un proceso largo. Deshacer y rehacer.

- **En la práctica**:
  - **Volver sin perder datos**: El botón atrás conserva lo que se eligió en el paso anterior.
  - **Deshacer**: "Cita cancelada · Deshacer" durante unos segundos, mejor que un diálogo de confirmación.
  - **Cerrar siempre**: Todo modal se cierra con `X`, con `Esc` y tocando fuera.
- **✗ Así se viola (TurnoYa)**: `"CANCELAR"` borra el formulario completo sin preguntar, y no hay forma de recuperarlo.
- **✓ Así se cumple**: `"Volver a servicios"` pide confirmación si hay datos; al cancelar una cita aparece `"Deshacer"`.

```javascript
// Confirmar antes de perder datos
volver.addEventListener('click', () => {
  const hayDatos = nombre.value || hora;
  if (!hayDatos || confirm('¿Salir sin reservar?'))
    location.href = '/servicios';
});
// <dialog> nativo: Esc ya lo cierra (salida)
```

---

#### H4 · Consistencia y estándares
Los usuarios no deberían preguntarse si **palabras, situaciones o acciones distintas significan lo mismo**. Consistencia interna (dentro de tu producto) y externa (con las convenciones de la plataforma y la industria).

- **En la práctica**:
  - **Un componente, un aspecto**: El botón primario se ve igual en todas las pantallas.
  - **Una palabra, un significado**: Si dices "cita", no cambies a "turno" o "reserva" en otra pantalla.
  - **Convenciones de plataforma**: Logo arriba a la izquierda lleva al inicio; el link subrayado es un link.
- **✗ Así se viola (TurnoYa)**: Tres botones con tres estilos distintos; dos de ellos (`"Submit"` y `"Reservar"`) hacen exactamente lo mismo.
- **✓ Así se cumple**: Un design system: `.btn` primario, `.btn--secondary` y `.btn--link`, iguales en todo el producto.

```html
<!-- La consistencia vive en el design system -->
<!-- en todas las pantallas, la misma clase -->
<button class="btn">Confirmar reserva</button>
<button class="btn btn--link">Volver</button>
```
```css
/* un solo lugar define cómo se ve */
.btn { background: var(--color-action-primary); }
```

---

#### H5 · Prevención de errores
Mejor que un buen mensaje de error es un **diseño que evita que el error ocurra**. Elimina las condiciones propensas a errores o pide confirmación antes de una acción irreversible.

- **En la práctica**:
  - **Restringe la entrada**: Selector de fecha en lugar de texto libre; horarios ocupados deshabilitados.
  - **Valida mientras escribe**: Indica el formato esperado antes de enviar: "9 dígitos".
  - **Valores por defecto sensatos**: La fecha de hoy ya seleccionada; el profesional "Cualquiera".
- **✗ Así se viola (TurnoYa)**: Fecha en un campo de texto: `"dd/mm o mm/dd"`. El `03/04` puede ser 3 de abril o 4 de marzo.
- **✓ Así se cumple**: `<input type="date">` con la fecha de hoy y los días sin horarios deshabilitados.

```html
<!-- Que el HTML impida el error -->
<input type="date" id="fecha" min="2026-10-25">
<input type="tel" inputmode="numeric"
       pattern="9[0-9]{8}" autocomplete="tel">
<input type="radio" name="hora" disabled> <!-- ocupado -->
```

---

#### H6 · Reconocer antes que recordar
Minimiza la **carga de memoria** del usuario haciendo visibles los elementos, acciones y opciones. El usuario no debería tener que recordar información de una parte de la interfaz a otra.

- **En la práctica**:
  - **Resumen persistente**: En el paso 3 se sigue viendo qué servicio, profesional y hora se eligió.
  - **Labels siempre visibles**: El placeholder desaparece al escribir: no sirve como label.
  - **Historial y sugerencias**: "Tu último servicio: Corte clásico".
- **✗ Así se viola (TurnoYa)**: El placeholder `"Nombre*"` hace de label: al escribir, el campo ya no dice qué era.
- **✓ Así se cumple**: `<label>` visible encima del campo y un resumen fijo `"Corte clásico · sáb 24 · 10:00 a. m."`.

```html
<!-- Label visible, placeholder solo como ejemplo -->
<label for="nombre">Tu nombre</label>
<input id="nombre" placeholder="Ej. Camila Torres">
<aside class="resumen">
  Corte clásico · sáb 24 oct · 10:00 a. m.
</aside>
```

---

#### H7 · Flexibilidad y eficiencia de uso
Atajos y aceleradores, invisibles para el novato, que **aceleran al usuario experto**. El sistema sirve a ambos y permite personalizar acciones frecuentes.

- **En la práctica**:
  - **Autocompletar**: `autocomplete="name"` y `"tel"` llenan los datos en un toque.
  - **Atajos**: Repetir la última reserva.
  - **Defaults inteligentes**: Recordar el profesional preferido del cliente.
- **✗ Así se viola (TurnoYa)**: Camila, que reserva cada 2 semanas, debe escribir su nombre y celular cada vez.
- **✓ Así se cumple**: El navegador autocompleta sus datos y aparece `"Repetir: Corte clásico con Raúl"`.

```html
<!-- Autocompletado del navegador -->
<input autocomplete="name">
<input type="tel" autocomplete="tel">
<input type="email" autocomplete="email">
```
```javascript
// en el panel del negocio
document.addEventListener('keydown', e => {
  if (e.key === 'b') abrirBloquearHorario();
});
```

---

#### H8 · Diseño estético y minimalista
Las interfaces no deben contener **información irrelevante o rara vez necesaria**. Cada unidad extra de información compite con la relevante y reduce su visibilidad. Minimalista no significa vacío: significa enfocado.

- **En la práctica**:
  - **Una acción primaria por vista**: Lo demás es secundario y se ve secundario.
  - **Divulgación progresiva**: Mostrar lo esencial y dejar el detalle en "Ver más".
  - **Sin ruido persuasivo**: Ni banners que compiten ni cuentas regresivas falsas.
- **✗ Así se viola (TurnoYa)**: Banner `"¡20 % OFF! se cierra en 15 s"`, tres botones y la letra pequeña con "cobros automáticos" en gris claro.
- **✓ Así se cumple**: Título, 5 campos, una acción primaria y las condiciones en texto legible.

```html
<!-- Divulgación progresiva nativa -->
<details>
  <summary>Ver políticas de cancelación</summary>
  <p>Puedes cancelar gratis hasta 2 horas antes.</p>
</details>
```

---

#### H9 · Ayudar a reconocer, diagnosticar y recuperarse de errores
Los mensajes de error deben expresarse en **lenguaje sencillo** (sin códigos), **indicar con precisión el problema** y **sugerir una solución** de forma constructiva.

- **En la práctica**:
  - **Qué pasó + cómo arreglarlo**: "Ingresa un celular de 9 dígitos que empiece con 9".
  - **Junto al campo**: El error aparece debajo del campo, no en un `alert` ni arriba de la página.
  - **Conserva lo escrito**: Nunca borres el formulario por un error.
- **✗ Así se viola (TurnoYa)**: `"Error 0x45: VALIDATION_FAILED"` arriba del formulario, y además se borró todo.
- **✓ Así se cumple**: Borde rojo + mensaje debajo del campo + foco en el primer error + datos intactos.

```html
<!-- Error accesible y conectado al campo -->
<input id="cel" aria-invalid="true"
       aria-describedby="err-cel">
<p id="err-cel" aria-live="polite">
  Ingresa un celular de 9 dígitos que empiece con 9.
</p>
```
```javascript
cel.focus(); // lleva al usuario al problema
```

---

#### H10 · Ayuda y documentación
Lo ideal es que el sistema no necesite explicación. Si hace falta, la ayuda debe ser **fácil de encontrar, centrada en la tarea** y con pasos concretos, **en el momento** en que se necesita.

- **En la práctica**:
  - **Ayuda contextual**: Un hint junto al campo: "(te enviaremos la confirmación)".
  - **Estados vacíos que enseñan**: "No hay horarios este día. Prueba el lunes 26".
  - **Ayuda siempre en el mismo lugar**: Ayuda consistente.
- **✗ Así se viola (TurnoYa)**: Un link "Ayuda" que lleva a un PDF de 20 páginas.
- **✓ Así se cumple**: Hints cortos en cada campo, un estado vacío útil y `"¿Dudas? Escríbenos por WhatsApp"` siempre en el pie.

```html
<!-- Hint asociado al campo -->
<label for="cel">Celular</label>
<input id="cel" aria-describedby="hint-cel">
<p id="hint-cel" class="field__hint">
  Te enviaremos la confirmación por SMS.
</p>
```

---

### Cómo hacer una evaluación heurística, paso a paso
Es la técnica que aplicarás en el Taller 1. No necesita usuarios ni laboratorio: solo método. Cada evaluador revisa **por separado** y luego se consolidan los hallazgos.

1. **Define el alcance y la tarea**: Qué pantallas y qué objetivo: *"Camila reserva un corte para hoy"*.
2. **Primera pasada: recorre el flujo completo**: Entiende la tarea de punta a punta sin anotar todavía.
3. **Segunda pasada: revisa cada heurística**: Pantalla por pantalla, con la lista H1–H10 al lado.
4. **Registra cada hallazgo con evidencia**: Qué viste y dónde, qué heurística o criterio viola, severidad 0–4 y propuesta.
5. **Consolida y prioriza**: Une duplicados y ordena por severidad alta y esfuerzo bajo.

#### Cómo redactar un hallazgo

| ✗ Así no | ✓ Así sí |
| :--- | :--- |
| *"Los colores están feos y el formulario es confuso."*<br>No dice dónde, ni qué regla, ni cómo arreglarlo. | - **Evidencia**: la etiqueta "Horarios" es `#bbb` sobre blanco (`1.9:1`).<br>- **Regla**: WCAG 1.4.3 Contraste mínimo.<br>- **Severidad**: 3 (mayor).<br>- **Propuesta**: usar `#52606d` (`6.5:1`). |

---

### Reto relámpago 1 · ¿Qué heurística se viola?
- **Escenario en pantalla**: Formulario *"Confirma tu cita"* que muestra arriba una alerta `Error 422: invalid_payload [field=msisdn]` y los campos `Tu nombre` y `Celular` quedaron vacíos tras el error.
- **Pregunta**: ¿Cuál es la heurística MÁS afectada?
  - A) H1 · Visibilidad del estado del sistema
  - B) H4 · Consistencia y estándares
  - **C) H9 · Reconocer, diagnosticar y recuperarse de errores (Respuesta correcta)**
  - D) H10 · Ayuda y documentación
- **¿Por qué?**: El mensaje usa un código técnico, no dice qué corregir y además **se borró lo escrito**: falla las tres partes de **H9**.

---

## 1.4 Leyes de UX

### 1. Ley de Fitts: tamaño y distancia
> **Enunciado**: El tiempo para alcanzar un objetivo depende de la distancia hasta él y de su tamaño: más lejos y más pequeño = más lento y más errores.
> $$T = a + b \cdot \log_2(1 + D / W)$$
> *(Paul Fitts, 1954. $T$ = tiempo, $D$ = distancia al objetivo, $W$ = ancho del objetivo, $b$ = velocidad del dispositivo, $a$ = tiempo base de reacción del usuario).*

- **Nota clave**: **Duplicar el tamaño** reduce el tiempo tanto como reducir la distancia a la mitad.
- **Cómo se aplica en frontend**:
  1. **CTA principal grande y cerca del pulgar**: Botón a todo el ancho, abajo en móvil, `48 px` de alto.
  2. **Agranda el área clicable**.
  3. **Aleja lo destructivo**: "Cancelar cita" lejos de "Confirmar" y más pequeño.

```css
/* Área táctil cómoda */
.btn     { min-height: 48px; }             /* objetivo grande */
.cta-bar { position: fixed; bottom: 0; }   /* cerca */
```
```html
<input type="radio" id="h1">
<label for="h1">10:00 a. m.</label> <!-- área ×10 -->
```

---

### 2. Ley de Hick: cantidad de opciones
> **Enunciado**: El tiempo para tomar una decisión aumenta con el número y la complejidad de las opciones.
> $$T = b \cdot \log_2(n + 1)$$
> *(William Hick y Ray Hyman, 1952. $n$ = número de opciones igualmente probables. El crecimiento es logarítmico: cada opción extra pesa menos, pero suma).*

- **Notas clave**:
  - **No significa "menos es siempre mejor"**: Significa organizar: agrupar, ordenar y destacar.
  - **Aplica a decisiones, no a búsquedas**: Si el usuario ya sabe lo que busca, una lista larga bien ordenada funciona.
- **Cómo se aplica en frontend**:
  1. **Categorías antes que listas largas**: Chips `"Cortes · Barba · Combos"` en lugar de un `select` de 24 servicios.
  2. **Destaca la opción recomendada**: `"Más pedido"` preseleccionado.
  3. **Divulgación progresiva**: Un paso a la vez: `servicio → horario → datos`.

```html
<!-- Agrupar en lugar de listar -->
<div role="group" aria-label="Filtrar">
  <button aria-pressed="true">Todos</button>
  <button aria-pressed="false">Cortes</button>
  <button aria-pressed="false">Barba</button>
</div>
```

---

### 3. Ley de Miller: memoria de trabajo
> **Enunciado**: La memoria de trabajo retiene pocos elementos a la vez. Agrupar la información en bloques (*chunks*) la hace manejable.
> `7 ± 2 → hoy se estima ~4 bloques`
> *(George Miller, 1956. Estudios posteriores de Cowan, 2001, sitúan el límite real en alrededor de 4 bloques).*

- **Notas clave**:
  - **Mal uso frecuente**: "Máximo 7 ítems en un menú": un menú no se memoriza, se lee. La ley trata de lo que hay que recordar.
  - **Relación con H6**: Si el usuario debe recordar algo de otra pantalla, ya perdiste.
- **Cómo se aplica en frontend**:
  1. **Agrupa números largos**: Celular `"987 654 321"` y código `"TY-7K2QD"`, no `"987654321"`.
  2. **Formularios por secciones**: Servicio / Horario / Tus datos, con encabezados.
  3. **Resumen visible**: No obligues a recordar lo elegido en el paso anterior.

```javascript
// Mostrar agrupado, guardar limpio
const mostrar = cel => cel.replace(
  /(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
mostrar('987654321');   // "987 654 321"
const limpio = valor.replace(/\s/g, '');
```

---

### 4. Ley de Jakob: las convenciones mandan
> **Enunciado**: Los usuarios pasan la mayor parte de su tiempo en **OTROS** sitios. Por eso esperan que el tuyo funcione igual que los que ya conocen.
> *(Jakob Nielsen, 2000. Relacionada con la heurística H4: consistencia externa).*

- **Notas clave**:
  - **Innova en tu propuesta de valor**, no en dónde va el menú o cómo se elige una fecha.
  - **Si cambias una convención**, hazlo gradualmente y con un beneficio claro (y pruébalo con usuarios).
- **Cómo se aplica en frontend**:
  1. **Usa controles nativos**: `<select>`, `<input type="date">`: el usuario ya sabe usarlos y son accesibles.
  2. **Ubicaciones esperadas**: Logo arriba a la izquierda → inicio; usuario arriba a la derecha; acciones al final del formulario.
  3. **Íconos universales**: Lupa = buscar, `X` = cerrar, `←` = volver. Con texto si hay duda.
  4. **Patrones de la plataforma**: En móvil, la navegación principal abajo (*tab bar*).

```html
<!-- Lo nativo ya es conocido y accesible -->
<input type="date">                    <!-- calendario del SO -->
<details><summary>Más</summary></details>
```

---

### 5. Umbral de Doherty y tiempos de respuesta
> **Enunciado**: La productividad aumenta cuando el sistema responde en menos de **400 ms**: el usuario mantiene el ritmo y no pierde la atención.
> `< 0.1 s · < 1 s · < 10 s`
> *(Walter Doherty y Ahrvind Thadani, IBM, 1982. Los 3 límites son de Jakob Nielsen, 1993: `0.1 s` se siente instantáneo, `1 s` mantiene el flujo, `10 s` es el límite de la atención).*

- **Notas clave**:
  - **Lo que importa es la percepción**: Una espera con feedback se siente más corta que una sin él.
  - **Más de 1 s** requiere indicador; **más de 10 s**, barra de progreso y opción de cancelar.
- **Cómo se aplica en frontend**:
  1. **Feedback en `< 100 ms`**: El botón cambia de estado apenas se toca.
  2. **Skeleton screens**: Mostrar la estructura mientras cargan los datos.
  3. **UI optimista**: Marcar el horario como elegido antes de que responda el servidor y revertir si falla.

```javascript
// UI optimista con reversión
slot.classList.add('is-selected'); // inmediato
try { await api.reservar(slot.id); }
catch {
  slot.classList.remove('is-selected');
  mostrarError('Ese horario acaba de ocuparse');
}
```

---

### Reto relámpago 2 · ¿Qué ley explica el problema?
- **Caso (Don Raúl nos escribe)**: *"Mis clientes se demoran muchísimo en el primer paso. Tengo **24 servicios** en una sola lista desplegable, todos con el mismo formato, y muchos terminan llamándome para preguntar cuál les conviene."*
- **Pregunta**: ¿Qué ley explica mejor la demora y qué harías?
  - A) Fitts · agrandar el select
  - **B) Hick · agrupar en categorías y destacar el recomendado (Respuesta correcta)**
  - C) Jakob · cambiar el select por un calendario
  - D) Doherty · cargar la lista más rápido
- **¿Por qué?**: El problema es **decidir** entre 24 opciones equivalentes (**Hick**). La solución: chips de categoría (`Cortes · Barba · Combos`), una etiqueta `"Más pedido"` y ver precio y duración en cada tarjeta. Así se aplica también **H6** y el **efecto Von Restorff**.

---

# 02. Accesibilidad Web: WCAG 2.2
*Qué exige el estándar, por qué importa y cómo se cumple desde el código.*

## 2.1 ¿Qué es la accesibilidad y por qué es tu responsabilidad?
Accesibilidad web significa que **personas con discapacidad pueden percibir, entender, navegar e interactuar** con un sitio. En la práctica beneficia a todos: quien usa el celular bajo el sol, quien tiene el brazo enyesado o quien navega con teclado por rapidez.

- **1 de cada 9** personas en el mundo vive con una discapacidad significativa (OMS, 2023).
- **3 tipos de limitación** según el diseño inclusivo de Microsoft:
  - **Permanente** (un brazo)
  - **Temporal** (brazo roto)
  - **Situacional** (un bebé en brazos)
- **Marco Legal**:
  - En **Perú**, la **Ley 29973** reconoce el derecho de las personas con discapacidad a acceder a la información.
  - En la **UE**, la **Ley Europea de Accesibilidad** rige desde junio de 2025 y usa WCAG como referencia.

### Discapacidades que el frontend debe considerar
1. **Visual**: ceguera, baja visión, daltonismo.
2. **Auditiva**: sordera, hipoacusia.
3. **Motriz**: temblor, solo teclado, switch.
4. **Cognitiva**: atención, memoria, dislexia.

---

## 2.2 WCAG: El estándar internacional de accesibilidad web
Las **Web Content Accessibility Guidelines** las publica el **W3C** (a través de la Web Accessibility Initiative, WAI). Son neutrales a la tecnología: aplican a HTML, a apps híbridas y a documentos. Cada criterio es **comprobable**: se cumple o no se cumple.

### Línea de tiempo
- **1999**: WCAG 1.0
- **2008**: WCAG 2.0
- **2018**: WCAG 2.1 *(móvil, baja visión)*
- **Oct 2023**: **WCAG 2.2 *(versión vigente)***
- **En borrador**: WCAG 3.0 *(aún no es estándar)*

### Estructura del estándar
1. **4 principios · POUR**: Perceptible, Operable, Comprensible, Robusto.
2. **13 pautas**: Objetivos generales.
3. **86 criterios de éxito**: Comprobables, cada uno con nivel **A**, **AA** o **AAA**.

> **Cómo leer un criterio**:
> `1.4.3` = principio **1** (Perceptible) · pauta **4** (Distinguible) · criterio **3** (Contraste mínimo).
> Cada criterio tiene un nivel (A, AA o AAA), un documento *Understanding* que explica la intención, y técnicas suficientes y fallos comunes.
> *Nota*: WCAG 2.2 retiró el criterio `4.1.1` (Procesamiento/parsing) porque los navegadores modernos ya resuelven esos errores de HTML.

---

## 2.3 Los 4 principios POUR y Niveles de Conformidad

| Principio | Pregunta clave | Ejemplos en Frontend |
| :--- | :--- | :--- |
| **P · Perceptible** | *¿Se puede percibir con al menos un sentido?* | - Texto alternativo en imágenes<br>- Subtítulos en videos<br>- Contraste suficiente<br>- No depender solo del color |
| **O · Operable** | *¿Se puede usar con cualquier dispositivo de entrada?* | - Todo funciona con teclado<br>- Foco visible y en orden lógico<br>- Tiempo suficiente<br>- Nada que parpadee más de 3 veces por segundo<br>- Objetivos táctiles de `24 px` o más |
| **C · Comprensible** | *¿Se entiende el contenido y el funcionamiento?* | - Idioma declarado (`lang="es"`)<br>- Comportamiento predecible<br>- Labels e instrucciones<br>- Errores que explican cómo corregir<br>- No pedir el mismo dato dos veces |
| **R · Robusto** | *¿Lo interpretan bien navegadores y tecnologías de apoyo?* | - HTML nativo válido<br>- Nombre, rol y valor en cada control<br>- Mensajes de estado (`aria-live`) |

### Niveles de conformidad: A, AA y AAA
Los niveles son **acumulativos**: cumplir AA significa cumplir todos los criterios A y todos los AA. La conformidad se declara por página completa, no por componente.

| Nivel | Descripción | Ejemplos de Criterios |
| :--- | :--- | :--- |
| **A (Mínimo)** | Sin esto, algunas personas no pueden usar el sitio en absoluto. | - `1.1.1` Texto alternativo<br>- `2.1.1` Teclado<br>- `1.4.1` Uso del color<br>- `3.3.2` Etiquetas o instrucciones<br>- `4.1.2` Nombre, rol, valor |
| **AA (Estándar recomendado)** | El objetivo de leyes, licitaciones y contratos en la mayoría de países. **Es nuestra meta en TurnoYa.** | - `1.4.3` Contraste `4.5:1`<br>- `1.4.4` Zoom al 200 %<br>- `1.4.10` Reflow a `320 px`<br>- `2.4.7` Foco visible<br>- `2.5.8` Tamaño del objetivo `24 px` |
| **AAA (Mejorado)** | Máximo nivel. El W3C no recomienda exigirlo a sitios completos porque algunos contenidos no pueden cumplirlo. | - `1.4.6` Contraste `7:1`<br>- `2.4.13` Apariencia del foco<br>- `2.5.5` Objetivo de `44 px`<br>- `3.1.5` Nivel de lectura |

---

## 2.4 Criterios Clave por Principio

### Principio 1 · Perceptible: que se pueda ver, oír o leer

| Criterio | Nombre | Nivel | Descripción |
| :---: | :--- | :---: | :--- |
| **1.1.1** | Contenido no textual | **A** | Toda imagen informativa tiene `alt` con su significado. Las decorativas, `alt=""`. Los íconos-botón necesitan nombre. |
| **1.3.1** | Información y relaciones | **A** | La estructura visual existe en el código: listas y tablas reales (`fieldset`, `label`). |
| **1.4.1** | Uso del color | **A** | El color no es el único medio para transmitir información. |
| **1.4.3** | Contraste (mínimo) | **AA** | Texto normal `4.5:1`; texto grande (`24 px`, o `18.66 px` en negrita) `3:1`. |
| **1.4.4** | Cambio de tamaño del texto | **AA** | Con zoom al 200 % no se pierde contenido ni funcionalidad. |
| **1.4.10** | Reflow | **AA** | Manejo de scroll horizontal (a `320 px` CSS de ancho). |
| **1.4.11** | Contraste no textual | **AA** | Bordes de inputs, íconos y anillo de foco con al menos `3:1` frente a lo que los rodea. |
| **1.4.12** | Espaciado del texto | **AA** | Si el usuario aumenta interlineado y espaciado, nada se corta ni se superpone. |

#### Cálculo de Contraste y Ejemplos Reales
El contraste se mide como una **razón entre la luminancia relativa** de dos colores. Va de **1:1** (mismo color) a **21:1** (negro sobre blanco).

```text
razón = (L1 + 0.05) / (L2 + 0.05)
L1 = luminancia del color más claro
L2 = luminancia del color más oscuro
```

- **Umbrales**:
  - `4.5:1` · **texto normal (AA)**: cuerpo, labels, ayudas y botones.
  - `3:1` · **texto grande y componentes (AA)**: texto `≥ 24 px` o `≥ 18.66 px` negrita; bordes, íconos, foco.
  - `7:1` · **texto normal (AAA)**: recomendado para contenido largo de lectura.

| Par de Colores (Texto / Fondo) | Ratio | Resultado (Texto normal AA) |
| :--- | :---: | :--- |
| `#999999` sobre `#FFFFFF` | **2.85:1** | ✗ Gris del Taller 1 (Falla) |
| `#767676` sobre `#FFFFFF` | **4.54:1** | ✓ El gris más claro que pasa AA |
| `#52606D` sobre `#FFFFFF` | **6.46:1** | ✓ Texto secundario TurnoYa |
| `#FFFFFF` sobre `#E53935` | **4.23:1** | ✗ Botón rojo del Taller 1 (Falla) |
| `#FFFFFF` sobre `#0B6E75` | **6.00:1** | ✓ Botón primario TurnoYa |
| `#1F2933` sobre `#FFFFFF` | **14.76:1** | ✓ Texto principal TurnoYa |

---

### Principio 2 · Operable: que se pueda usar con cualquier dispositivo
*(Los criterios marcados con ★ son nuevos en WCAG 2.2)*

| Criterio | Nombre | Nivel | Descripción |
| :---: | :--- | :---: | :--- |
| **2.1.1** | Teclado | **A** | Toda funcionalidad se puede usar con teclado. |
| **2.1.2** | Sin trampas de teclado | **A** | Si el foco entra en un componente (modal, mapa), también puede salir. |
| **2.2.1** | Tiempo ajustable | **A** | Si hay límite de tiempo, se puede apagar, ajustar o extender. |
| **2.4.3** | Orden del foco | **A** | El foco recorre la página en un orden lógico, el mismo de lectura. |
| **2.4.7** | Foco visible | **AA** | Siempre se ve qué elemento tiene el foco. |
| **2.4.11 ★** | Foco no oculto (mínimo) | **AA** | El elemento enfocado no queda tapado por completo por un header fijo, un banner o un CTA fijo. |
| **2.5.7 ★** | Movimientos de arrastre | **AA** | Todo lo que se hace arrastrando tiene alternativa con un solo toque. |
| **2.5.8 ★** | Tamaño del objetivo (mínimo) | **AA** | Objetivos táctiles de al menos `24 × 24 px` CSS, o con espacio suficiente alrededor. |

---

### Principio 3 · Comprensible: que se entienda qué es y qué pasa

| Criterio | Nombre | Nivel | Descripción |
| :---: | :--- | :---: | :--- |
| **3.1.1** | Idioma de la página | **A** | `<html lang="es">`: el lector de pantalla elige la voz y la pronunciación correctas. |
| **3.2.2** | Al introducir datos | **A** | Cambiar un campo no provoca un cambio de contexto inesperado (enviar el form, cambiar de página). |
| **3.3.1** | Identificación de errores | **A** | El error se detecta y se describe en texto, identificando el campo. |
| **3.3.2** | Etiquetas o instrucciones | **A** | Cada campo tiene un label visible e indica el formato esperado. |
| **3.3.3** | Sugerencia ante errores | **AA** | Si se sabe cómo corregir, se dice: *"Ingresa 9 dígitos que empiecen con 9"*. |
| **3.2.6 ★** | Ayuda consistente | **A** | Si hay ayuda (chat, teléfono), aparece en el mismo lugar relativo en todas las páginas. |
| **3.3.7 ★** | Entrada redundante | **A** | No pedir dos veces el mismo dato en un proceso: se precarga o se permite elegirlo. |
| **3.3.8 ★** | Autenticación accesible | **AA** | El login no exige resolver acertijos ni memorizar; se permite pegar y usar gestores de contraseñas. |

---

### Resumen: Qué trajo WCAG 2.2 (9 criterios nuevos — Octubre 2023)
Pone el foco en usuarios con **baja visión, discapacidad motriz y cognitiva**, sobre todo en dispositivos móviles:

1. **2.4.11 · AA — Foco no oculto (mínimo)**: El foco no queda totalmente tapado por contenido fijo.
2. **2.4.12 · AAA — Foco no oculto (mejorado)**: No queda tapado ni parcialmente.
3. **2.4.13 · AAA — Apariencia del foco**: Indicador de foco grande y con buen contraste.
4. **2.5.7 · AA — Movimientos de arrastre**: Alternativa de un solo toque a todo arrastre.
5. **2.5.8 · AA — Tamaño del objetivo (mínimo)**: `24 × 24 px` CSS o espacio equivalente.
6. **3.2.6 · A — Ayuda consistente**: La ayuda, siempre en el mismo lugar.
7. **3.3.7 · A — Entrada redundante**: No pedir dos veces el mismo dato.
8. **3.3.8 · AA — Autenticación accesible (mínimo)**: Sin pruebas cognitivas para iniciar sesión.
9. **3.3.9 · AAA — Autenticación accesible (mejorado)**: Ni siquiera reconocer objetos o imágenes.
- **Retirado**: `4.1.1 Procesamiento (parsing)`.

---

## 2.5 Cómo probar la accesibilidad: Manual + Automático

Las herramientas automáticas detectan **solo una parte** de los problemas (contraste, labels faltantes, atributos inválidos). Que el foco tenga sentido o que un mensaje se entienda lo verifica una persona. Se combinan siempre.

### Pruebas manuales (5 minutos por pantalla)
1. **Teclado**: Recorre todo con `Tab` / `Shift+Tab`. ¿Ves el foco? ¿Llegas a todo? ¿El orden es lógico?
2. **Zoom 200 %**: `Ctrl + +` cuatro veces. ¿Se lee y funciona todo?
3. **Reflow 320 px**: DevTools → vista móvil a `320 px`. ¿Hay scroll horizontal?
4. **Lector de pantalla**: Windows: **Narrador** (`Ctrl + Win + Enter`) o **NVDA** (gratis). ¿Se anuncian labels, estados y errores?
5. **Sin color**: DevTools → `Rendering` → `Emulate vision deficiencies` → `Achromatopsia`.

### Herramientas automáticas
- **Lighthouse**: Integrado en Chrome y Edge (`F12 → Lighthouse`). Da un puntaje de 0 a 100 y la lista de fallos.
- **axe DevTools**: Extensión gratuita de Deque. Pocos falsos positivos; indica el criterio WCAG de cada fallo.
- **WAVE**: Extensión de WebAIM. Dibuja sobre la página dónde está cada problema.

---

# 03. Taller 1 · Auditoría UX/UI y Corrección Accesible
*Diagnosticar con heurísticas y WCAG, y corregir en código lo que impide reservar.*

## 3.1 Parte A: Las 4 pasadas de auditoría

| Pasada | Tiempo | Checklist de Inspección |
| :--- | :---: | :--- |
| **1 · Visual** | 3 min | - ¿Entiendo qué hace y qué botón presionar? (H2, H8)<br>- Si elijo un horario, ¿se ve elegido? (H1)<br>- ¿Hay botones iguales que hacen cosas distintas? (H4)<br>- Envía el formulario vacío: ¿qué pasa con lo escrito? (H5, H9) |
| **2 · Teclado** | 2 min | - Clic en la barra de direcciones y luego solo `Tab`<br>- ¿Ves siempre dónde está el foco? (2.4.7)<br>- ¿Llegas a los horarios y eliges uno? (2.1.1)<br>- ¿El orden del foco es el de lectura? (2.4.3) |
| **3 · Móvil y zoom** | 2 min | - `F12 → Ctrl + Shift + M → 360 px`<br>- ¿Se lee? ¿Hay scroll horizontal? (1.4.10)<br>- ¿Cada cosa se toca sin errar? (2.5.8)<br>- `Ctrl + '+'` hasta 200 %: ¿se pierde algo? (1.4.4) |
| **4 · Contraste y herramientas** | 3 min | - Selector de color de DevTools: ratio de "Horarios" (1.4.3)<br>- ¿Algún estado depende solo del color? (1.4.1)<br>- Revisa qué criterios marca como fallidos |

### Cómo usar DevTools para auditar (Chrome o Edge)
- **Medir contraste**:
  1. `F12` → pestaña **Elements**.
  2. Selecciona el texto con el ícono de flecha (`Ctrl + Shift + C`).
  3. En **Styles**, clic en el cuadrado de color de `color`.
  4. Lee **Contrast ratio**: `✓ AA` / `✓ AAA` o `✗`.
- **Vista móvil**:
  1. `F12` → `Ctrl + Shift + M`.
  2. Arriba elige `Dimensions: Responsive`.
  3. Escribe el ancho: `360`, `768`, `1280`.
  4. En la **Console**: `document.documentElement.scrollWidth`.

---

### Solución Parte A · 18 hallazgos agrupados por corrección

#### Grupo T1-1 · Estructura y lectura
1. Zoom bloqueado y ancho fijo de `1024` · `1.4.4` · **sev 4**
2. Textos `#999` / `#bbb` / `#ccc`: `2.8`, `1.9` y `1.6:1` · `1.4.3` · **sev 3**
3. Placeholder como label · `3.3.2` · `H6` · **sev 3**
4. Sin `lang` en `<html>` · `3.1.1` · **sev 2**
5. `"Booking de Slot"`, `"Submit"`, `SRV-001` · `H2` · **sev 3**

#### Grupo T1-2 · Operable
6. `outline: none`: foco invisible · `2.4.7` · **sev 4**
7. Horarios en `<span>`: sin teclado · `2.1.1` · `4.1.2` · **sev 4**
8. Elegir horario no da feedback · `H1` · **sev 4**
9. Libre vs ocupado solo por color · `1.4.1` · **sev 3**
10. Objetivos de `16–20 px` · `2.5.8` · `Fitts` · **sev 3**

#### Grupo T1-3 · Errores
11. `"Error 0x45: VALIDATION_FAILED"` · `H9` · `3.3.1` · **sev 3**
12. El error borra todo lo escrito · `H5` · `H3` · **sev 4**
13. Error no asociado ni anunciado · `4.1.2` · **sev 3**
14. Fecha en texto `"dd/mm o mm/dd"` · `H5` · **sev 3**

#### Grupo T1-4 · Estado del sistema
15. `6 s` sin feedback y `alert('OK')` · `H1` · `Doherty` · **sev 3**
16. 3 botones, 2 iguales, destructivo destacado · `H4` · `H8` · **sev 3**
17. `CANCELAR` borra sin preguntar · `H3` · **sev 3**
18. Cuenta regresiva y letra pequeña · `2.2.1` · `H8` · **sev 3**

---

## 3.2 Parte B: Corregir en código (`reserva.html`)

### Corrección T1-1: Idioma, viewport, contraste y labels
Archivo: `taller-1-auditoria/final/reserva.html · [T1-1]`

```html
<!-- 1. ANTES: <html> y width=1024, user-scalable=no -->
<html lang="es">
<!-- 2. Viewport correcto -->
<meta name="viewport"
      content="width=device-width, initial-scale=1">
```
```css
/* 3. ANTES: color:#999 (2.85:1) y #bbb (1.92:1) */
body { color: #1f2933; } /* 14.8:1 */
.sub { color: #52606d; } /*  6.5:1 */
```
```html
<!-- 4 y 5. ANTES: <input placeholder="Nombre*"> -->
<label for="servicio">Servicio</label>
<select id="servicio">
  <option>Corte clásico · 30 min · S/ 35</option>
</select>

<!-- 6. Placeholder como ejemplo y autocomplete -->
<label for="nombre">Tu nombre</label>
<input id="nombre" autocomplete="name"
       placeholder="Ej. Camila Torres">
```

- **¿Qué hace cada parte?**:
  1. `lang="es"`: El lector de pantalla usa voz y reglas de pronunciación en español (WCAG 3.1.1).
  2. **Viewport correcto**: `device-width` adapta el ancho al celular; sin `user-scalable=no` el usuario puede hacer zoom (1.4.4).
  3. **Colores con contraste**: Texto principal `14.8:1` y secundario `6.5:1`. Ambos superan `4.5:1` (1.4.3).
  4. `label + for`: El `for` apunta al `id`: el lector anuncia "Servicio" y el clic en el label enfoca el campo (1.3.1, 3.3.2).
  5. **Lenguaje del cliente**: Nombre, duración y precio en lugar de `SRV-001` (H2).
  6. **Placeholder como ejemplo**: El label no desaparece al escribir; `autocomplete` acelera (H6, H7).

---

### Corrección T1-2: Foco visible y horarios accesibles
Archivo: `taller-1-auditoria/final/reserva.html · [T1-2]`

```css
/* 1. ANTES: input, select { outline: none; } */
:focus-visible {
  outline: 3px solid #1d4ed8;
  outline-offset: 2px;
}
```
```html
<!-- 2. fieldset + legend -->
<fieldset>
  <legend>Horario</legend>
  <div class="slot">
    <!-- 3. Radio nativo / 4. El label es el botón visible -->
    <input type="radio" name="hora" id="h0" value="9:00 a. m.">
    <label for="h0">9:00 a. m.</label>
  </div>
  <div class="slot">
    <!-- 5. disabled + texto oculto -->
    <input type="radio" name="hora" id="h1" disabled>
    <label for="h1">9:30 a. m.<span class="visually-hidden">
      (ocupado)</span></label>
  </div>
</fieldset>
```
```css
/* 6. 44 px y ✓ */
.slot label { min-height: 44px; }
.slot input:checked + label::before { content: "✓ "; }
```

- **¿Qué hace cada parte?**:
  1. `:focus-visible`: El anillo aparece al navegar con teclado y no al hacer clic con el mouse. Azul `6.7:1` (2.4.7, 1.4.11).
  2. `fieldset + legend`: Agrupa los radios: el lector anuncia "Horario, grupo" antes de cada opción (1.3.1).
  3. **Radio nativo**: `Tab` entra al grupo y las flechas cambian de opción. Rol, nombre y estado sin ARIA (2.1.1, 4.1.2).
  4. **El label es el botón visible**: El input se oculta visualmente; el label es la zona táctil y se pinta según `:checked`.
  5. `disabled` + texto oculto: El ocupado sale del orden de foco y el lector oye "(ocupado)": no depende del color (1.4.1).
  6. `44 px` y `✓`: Área táctil cómoda (2.5.8, Fitts) y un símbolo que confirma la selección (H1).

---

### Corrección T1-3: Errores que ayudan y no borran
Archivo: `taller-1-auditoria/final/reserva.html · [T1-3]`

```html
<!-- 1. Error asociado al campo -->
<input id="cel" type="tel" aria-describedby="err-cel">
<p class="error" id="err-cel" aria-live="polite"></p>
```
```javascript
// 2. Escribe el mensaje y marca el campo ('' = sin error)
function marcar(campo, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  // 3. aria-invalid
  campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
  return !mensaje;
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // no recargar la página
  // 4. Validación tolerante y 5. Mensaje que dice cómo corregir
  const okCel = marcar(cel, 'err-cel',
    /^9\d{8}$/.test(cel.value.replace(/\s/g, ''))
      ? '' : 'Ingresa un celular de 9 dígitos que empiece con 9.');
  // ANTES: limpiar(); ← borraba todo lo escrito
  // 6. Foco al primer error, datos intactos
  if (!okNombre) { nombre.focus(); return; }
  if (!okCel)    { cel.focus();    return; }
});
```

- **¿Qué hace cada parte?**:
  1. **Error asociado al campo**: `aria-describedby` hace que el lector lea el mensaje al enfocar el campo; `aria-live` lo anuncia al aparecer (4.1.3).
  2. **Una función, un patrón**: `marcar()` escribe el texto y pone `aria-invalid`, que además pinta el borde rojo con CSS.
  3. `aria-invalid`: Comunica el estado "inválido" a las tecnologías de apoyo (4.1.2).
  4. **Validación tolerante**: Se quitan espacios antes de validar: `"987 654 321"` es válido (Ley de Tesler).
  5. **Mensaje que dice cómo corregir**: Qué pasó y qué hacer (H9, WCAG 3.3.1 y 3.3.3).
  6. **Foco al primer error, datos intactos**: Nada se borra (H5, H3) y el usuario llega directo al problema.

---

### Corrección T1-4: Estado de carga y confirmación
Archivo: `taller-1-auditoria/final/reserva.html · [T1-4]`

```javascript
// ANTES: setTimeout(() => alert('OK'), 6000); sin feedback
// 1. Bloquear el doble envío
btn.disabled = true;                  // evita el doble envío
btn.setAttribute('aria-busy', 'true');
// 2. Feedback inmediato
btn.innerHTML =
  '<span class="spinner" aria-hidden="true"></span>Reservando…';

// 3. Respuesta del servidor
setTimeout(() => {                    // simula la respuesta
  document.getElementById('form-card').hidden = true;
  const ok = document.getElementById('success');
  ok.hidden = false;
  // 4. Mover el foco
  ok.focus();                         // se anuncia el éxito
}, 1200);
```
```html
<!-- 5. tabindex="-1" -->
<section id="success" hidden tabindex="-1">
  <h1>¡Cita reservada!</h1> <p class="code">TY-7K2QD</p>
</section>
```
```css
/* 6. Movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; }
}
```

- **Criterios de éxito del Taller 1**:
  - Reservas solo con teclado (`Tab`, flechas, `Espacio`, `Enter`).
  - Al enviar vacío: 3 mensajes claros y nada borrado.
  - Lighthouse Accessibility `≥ 95`.
  - axe DevTools: `0` problemas WCAG AA.
  - A `360 px`: sin scroll horizontal.

---

# 04. Components & Design Systems
*Las bases de toda interfaz y el contexto más valioso que le puedes dar a una IA.*

## 4.1 ¿Qué es un componente de UI?
Un componente es una **pieza de interfaz reutilizable** que encapsula estructura (HTML), apariencia (CSS) y comportamiento (JS) detrás de una **API pequeña**. Se diseña una vez y se usa en todas las pantallas.

### La API de un componente
1. **Props / atributos**: Los datos que recibe: texto, `type`, `href`.
2. **Variantes**: Versiones visuales con el mismo propósito: `primary`, `secondary`, `danger`, `link`.
3. **Estados**: Cómo cambia por la interacción o los datos: `hover`, `focus`, `active`, `disabled`, `loading`, `error`.
4. **Contenido (slots)**: Lo que se le inserta: un ícono antes del texto, el cuerpo de una tarjeta.
5. **Eventos**: Lo que comunica hacia afuera: `click`, `change`, `submit`.

```html
<!-- HTML + CSS: clase base · variante · estado -->
<button class="btn btn--secondary" disabled>
  Ver detalle
</button>
```
```jsx
// la misma API como props
<Button variant="secondary" disabled>
  Ver detalle
</Button>
```

> **Un buen componente es…**
> **Accesible por defecto** (usa el elemento nativo), **agnóstico al contenido** (no sabe si dice "Reservar" o "Pagar") y **configurable solo por su API** (nadie le sobrescribe estilos desde afuera).

---

## 4.2 ¿Qué es un Design System (y qué no lo es)?
Un design system es el **conjunto de decisiones, piezas y reglas** que permite construir productos consistentes a escala: incluye los componentes, pero también los tokens que los alimentan, los patrones que los combinan y la documentación que explica cuándo usar cada uno.

| Qué incluye un Design System | Qué NO es lo mismo |
| :--- | :--- |
| - **Principios**: Qué valoramos: *"claridad antes que estética"*, *"accesible por defecto"*.<br>- **Design tokens**: Las decisiones visuales como datos: color, tipografía, espaciado.<br>- **Componentes**: `Button`, `Field`, `Card`… con variantes, estados y código.<br>- **Patrones**: Combinaciones probadas: formulario de reserva, estado vacío, flujo de 3 pasos.<br>- **Documentación y gobierno**: Cuándo usar cada pieza, quién aprueba cambios, cómo se versiona. | - **Guía de estilo**: Colores, logo y tipografías en un PDF. Sin código ni componentes.<br>- **UI kit**: Componentes dibujados en Figma, sin implementación.<br>- **Librería de componentes**: Código reutilizable, pero sin principios ni reglas de uso. |

---

## 4.3 Atomic Design: de lo más pequeño a la página
Metodología propuesta por **Brad Frost (2013)** que organiza la interfaz en 5 niveles inspirados en la química. Ayuda a decidir **dónde vive cada estilo** y en qué orden construir.

| Nivel | Definición | Ejemplos en TurnoYa |
| :--- | :--- | :--- |
| **1. Átomos** | La pieza mínima con sentido propio. | `Button`, `Input`, `Label`, `Badge` |
| **2. Moléculas** | Átomos que funcionan juntos. | `Field` (`label + input + error`), `Slot` |
| **3. Organismos** | Secciones completas de la interfaz. | `SlotGroup`, `ServiceCard`, `Header` |
| **4. Templates** | La estructura de una pantalla, sin datos reales. | `BookingLayout`: pasos + contenido + CTA |
| **5. Páginas** | El template con contenido real. | *"Elige tu horario"* con los horarios de hoy |

> **Regla de dependencia**: Una página **no define estilos**: solo compone organismos. Si cada nivel solo usa el nivel de abajo, el resultado es consistente aunque lo genere una IA.

---

## 4.4 Design Tokens: las decisiones de diseño como datos
Un token es una **decisión de diseño con nombre**, guardada como dato e independiente de la plataforma. En lugar de escribir `#0b6e75` en 29 lugares, escribes `color.action-primary` y la decisión vive en **un solo sitio**.

### Tipos de tokens
- **Color**: texto, fondos, bordes, estados.
- **Tipografía**: familia, tamaño, peso, interlineado.
- **Espaciado**: márgenes, paddings, gaps.
- **Radio**: esquinas de botones y tarjetas.
- **Sombra / elevación**: profundidad de capas.
- **Movimiento**: duración y curvas de animación.
- **Tamaño**: alto de controles, íconos, áreas táctiles.
- **Breakpoints y z-index**: puntos de quiebre y capas.

```json
// tokens.json · formato W3C (DTCG)
{
  "color": {
    "teal-600": { "$type": "color", "$value": "#0b6e75" },
    "action-primary": {
      "$type": "color",
      "$value": "{color.teal-600}"
    }
  }
}
```
*El **Design Tokens Community Group** del W3C definió este formato JSON. Herramientas como **Style Dictionary** lo transforman en variables CSS, Swift, Android o variables de Figma.*

---

## 4.5 Las 3 capas de tokens y cómo nombrarlos

Separar los tokens en capas permite cambiar **una decisión sin tocar las demás**. La regla es una sola: **cada capa solo puede referenciar a la capa de abajo**.

| Capa | Pregunta | Ejemplo CSS | ¿Cuándo cambia? |
| :--- | :--- | :--- | :--- |
| **CAPA 1 · PRIMITIVOS** | *¿Qué valores existen?* | `--teal-600: #0b6e75;`<br>`--gray-900: #1f2933;`<br>`--space-4: 16px;` | Cambia en un **rebranding**: nueva paleta, nueva escala. |
| **CAPA 2 · SEMÁNTICOS** | *¿Para qué se usa?* | `--color-action-primary: var(--teal-600);`<br>`--color-text: var(--gray-900);` | Cambia en un **tema**: modo oscuro, alto contraste, marca blanca. |
| **CAPA 3 · COMPONENTE** | *¿Dónde se aplica?* | `--button-bg: var(--color-action-primary);`<br>`--button-height: 48px;` | Cambia al **ajustar un componente** sin afectar a los demás. |

> **Regla de oro**: Los componentes consumen **semánticos** o **de componente**, nunca primitivos. Si en `components.css` aparece `--teal-600`, alguien se saltó una capa.

### Cómo nombrar tokens: por intención, no por apariencia
- **Patrón para semánticos**: `--[categoría]-[rol]-[variante]-[estado]`
  - Ejemplo: `--color-action-primary-hover` (`color` = categoría, `action` = rol, `primary` = variante, `hover` = estado).
- **Reglas de nomenclatura**:
  - `kebab-case` y en inglés o español, pero **siempre igual** (no mezclar `--colorPrimary` y `--color-texto`).
  - **Escalas numéricas en primitivos**: `--gray-50` (claro) a `--gray-950` (oscuro); `--space-1` = `4 px`.
  - **No codifiques el valor en el nombre**: `--space-16px` deja de ser cierto el día que cambie.

| ✗ Evita | ✓ Prefiere |
| :--- | :--- |
| `--blue`<br>`--color-1`<br>`--rojo-bonito`<br>`--btn-big-green`<br>`--text-999`<br>`--space-13` | `--color-action-primary`<br>`--color-text-muted`<br>`--color-danger`<br>`--button-height`<br>`--color-border`<br>`--space-3` |

---

## 4.6 Anatomía de un componente y Estados de UI

### Anatomía del botón
Un botón parece trivial, pero tiene **partes, variantes y al menos 6 estados**. La IA suele generar solo `default` y `hover`: pedir el resto es parte de tu trabajo.

- **Los 6 estados**:
  1. **Default** (`:default`)
  2. **Hover** (`:hover`)
  3. **Focus** (`:focus-visible`)
  4. **Active** (`:active`)
  5. **Disabled** (`:disabled`)
  6. **Loading** (`.is-loading` → `◌ Reservando…`)
- **Partes**: contenedor · label · ícono opcional · spinner.
- **Variantes**: `primary` · `secondary` · `danger` · `link` *(cambian la apariencia, no el propósito)*.
- **Tamaños**: `sm` · `md` · `lg`, o `--block` para ancho completo.
- **Reglas**: un solo `primary` por vista · texto con verbo (*"Confirmar reserva"*) · `44–48 px` de alto en móvil.
- **Variante ≠ estado**: Error clásico: crear una "variante disabled". `Disabled` es un estado que debe funcionar en **todas** las variantes.

---

### Estados de UI (UI Stack): una pantalla no tiene un solo diseño
Toda pantalla que muestra datos pasa por **6 estados**. Si el diseño (o el prompt) solo describe el ideal, el usuario verá pantallas en blanco o rotas.

| Estado de UI | Descripción | Ejemplo en TurnoYa |
| :--- | :--- | :--- |
| **1. Ideal** | Hay datos y todo funciona. | La grilla con 9 horarios. |
| **2. Vacío** | No hay datos todavía. Es una oportunidad para guiar. | *"No hay horarios este día. Prueba el lunes 26"*. |
| **3. Cargando** | Los datos vienen en camino. | Skeleton de 9 rectángulos grises. |
| **4. Error** | Algo falló. Explica y ofrece una salida. | *"No pudimos cargar los horarios. Reintentar"*. |
| **5. Parcial** | Hay algunos datos, no todos. | Solo 1 horario libre: *"¡Último horario de hoy!"*. |
| **6. Éxito** | Confirmación de que la acción terminó. | *"¡Cita reservada!"* con código `TY-7K2QD`. |

---

## 4.7 Por qué el Design System es tu mejor prompt

Un modelo de IA genera **lo más probable** según lo que ha visto. Sin contexto, eso es un diseño genérico y distinto en cada intento. Con un design system, la IA **solo ensambla piezas que ya aprobaste**.

| ✗ Sin Design System | ✓ Con Design System | 🔌 Cómo se conecta (Sesiones 2 y 3) |
| :--- | :--- | :--- |
| - Cada pantalla inventa un color nuevo<br>- Botones con 3 estilos<br>- Estados olvidados<br>- Revisión lenta: no hay contra qué comparar | - La IA usa `var(--color-action-primary)`<br>- Reutiliza `.btn` y sus variantes<br>- Los estados ya están definidos<br>- Revisas contra reglas explícitas | - `CLAUDE.md`: *"usa solo tokens semánticos"*<br>- `tokens.css` y `components.css` en el repo<br>- Variables de Figma con los mismos nombres<br>- **MCP server de Figma**: el agente lee el diseño |

---

### Reto relámpago 3 · ¿Qué está mal en este componente?
```css
/* components.css */
.card {
  background: var(--gray-0);
  border-radius: var(--card-radius);
  padding: var(--space-6);
  box-shadow: var(--shadow-1);
}
```
- **Pregunta**: ¿Qué problema tiene?
  - A) Nada, todos los valores son tokens
  - **B) Usa un primitivo (`--gray-0`) dentro de un componente (Respuesta correcta)**
  - C) Debería escribir `#ffffff` para ser más claro
  - D) `--card-radius` debería ser `--radius-md`
- **¿Por qué?**: Se saltó la capa semántica. En modo oscuro `--gray-0` seguiría siendo blanco y la tarjeta quedaría brillando. Debe ser `var(--card-bg)` o `var(--color-surface)`.

---

# 05. Taller 2 · Design Tokens y Componentes
*De 11 colores repetidos 29 veces a un design system mínimo con tema oscuro.*

## 5.1 Diseño previo y Paso T2-1: Inventario por intención
**Objetivo**: Que TurnoYa tenga **una sola fuente de verdad visual**: cambiar la marca o el tema en un archivo (`styles/tokens.css` y `styles/components.css`), sin buscar y reemplazar colores en todo el proyecto.

### T2-1 · Inventario de los 11 colores de `reserva.html`

| Valor Hex | Dónde aparece / Uso | Token Semántico |
| :---: | :--- | :--- |
| `#0b6e75` | Botón, slot elegido, links | `--color-action-primary` |
| `#095a60` | Hover del botón | `--color-action-primary-hover` |
| `#1f2933` | Texto principal | `--color-text` |
| `#52606d` | Subtítulo, hints, condiciones | `--color-text-muted` |
| `#7b8794` | Borde de campos y slots | `--color-border` |
| `#e4e7eb` | Línea del header | `--color-divider` |
| `#f5f7fa` | Fondo de la página | `--color-bg` |
| `#ffffff` | Tarjeta, campos / texto en botón *(dos intenciones)* | `--color-surface` / `--color-on-action` |
| `#f0f2f4` | Slot ocupado | `--color-surface-muted` |
| `#b42318` | Errores | `--color-danger` |
| `#1d4ed8` | Anillo de foco | `--color-focus-ring` |

---

## 5.2 Implementación de `styles/tokens.css` y `styles/components.css`

### Paso T2-2 · `styles/tokens.css` — Capa 1: Primitivos
```css
/* taller-2-design-system/final/styles/tokens.css · [T2-2] */
:root {
  /* 1. Familia + escala */
  --teal-600: #0b6e75;            /* marca */
  --teal-700: #095a60;
  --teal-500: #14a3ad;            /* para el tema oscuro */

  /* 2. Neutros: 0 = blanco … 950 = casi negro */
  --gray-0:   #ffffff;
  --gray-600: #52606d;
  --gray-900: #1f2933;

  /* 3. Colores de estado */
  --red-600: #b42318;  --blue-600: #1d4ed8;

  /* 4. Espaciado: escala base 4px */
  --space-1: 4px;  --space-2: 8px;  --space-4: 16px;

  /* 5. Radios */
  --radius-sm: 8px;  --radius-md: 12px;

  /* 6. Tipografía en rem: respeta la preferencia del usuario */
  --font-size-md: 1rem;  --font-size-xl: 1.25rem;
}
```

---

### Paso T2-3 · `styles/tokens.css` — Capa 2: Semánticos y Tema Oscuro
```css
/* taller-2-design-system/final/styles/tokens.css · [T2-3] */
:root {
  /* 1. Nombres por intención */
  --color-bg:                   var(--gray-50);
  --color-surface:              var(--gray-0);
  /* 2. El contraste documentado */
  --color-text:                 var(--gray-900);  /* 14.8:1 */
  --color-text-muted:           var(--gray-600);  /*  6.5:1 */
  /* 3. 3:1 para bordes */
  --color-border:               var(--gray-400);  /*  3.7:1 */
  --color-action-primary:       var(--teal-600);  /*  6.0:1 */
  --color-action-primary-hover: var(--teal-700);
  /* 4. Texto sobre acción */
  --color-on-action:            var(--gray-0);
  --color-focus-ring:           var(--blue-600);
}

/* 5. Tema oscuro = otra capa 2 */
[data-theme="dark"] {
  --color-bg:             var(--gray-950);
  --color-surface:        var(--gray-900);
  --color-text:           var(--gray-50);
  /* 6. La marca se aclara en oscuro */
  --color-action-primary: var(--teal-500);
  --color-on-action:      var(--gray-950);
}
```

---

### Pasos T2-4 y T2-5 · Tokens de componente y Button (base y variantes)
```css
/* 1. tokens.css · capa 3 (Contrato del componente) */
:root {
  --button-height: 48px;
  --button-radius: var(--radius-sm);
}

/* components.css */
.btn {
  /* 2. Tokens locales (--_): privados del componente */
  --_bg: var(--color-action-primary);
  --_bg-hover: var(--color-action-primary-hover);
  --_fg: var(--color-on-action);
  --_border: transparent;

  min-height: var(--button-height);
  border-radius: var(--button-radius);
  /* 3. La base usa los locales */
  background: var(--_bg);
  color: var(--_fg);
  border: 1px solid var(--_border);
}

/* 4. Una variante = reasignar */
.btn--secondary {
  --_bg: var(--color-surface);
  --_fg: var(--color-action-primary);
  --_border: var(--_fg);
}

/* 5. Agregar una variante es barato */
.btn--danger {
  --_bg: var(--color-danger);
  --_bg-hover: var(--color-danger-hover);
}
```

---

### Paso T2-6 · `components.css` — Los 6 estados del botón
```css
/* taller-2-design-system/final/styles/components.css · [T2-6] */
/* 1. hover usa el token local */
.btn:hover:not(:disabled)  { background: var(--_bg-hover); }

/* 2. active */
.btn:active:not(:disabled) { transform: translateY(1px); }

/* 3. Foco global */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus-ring);
}

/* 4. disabled */
.btn:disabled {
  background: var(--color-disabled-bg);
  color: var(--color-disabled-text);
  cursor: not-allowed;
}

/* 5. loading sin HTML extra */
.btn.is-loading { pointer-events: none; cursor: progress; }
.btn.is-loading::before {
  content: ""; width: 1em; height: 1em; border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: btn-spin .8s linear infinite;
}

/* 6. Movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .btn.is-loading::before { animation-duration: 2.4s; }
}
```

---

### Pasos T2-7 y T2-8 · Field con tokens y Refactor de `reserva.html`
```css
/* 1. Nombres BEM */
.field__control {
  min-height: var(--field-height);
  border: 1px solid var(--field-border);
  border-radius: var(--field-radius);
}
/* 2. El estilo sigue al atributo ARIA */
.field__control[aria-invalid="true"] {
  border: 2px solid var(--color-danger);
}
/* 3. Error con token semántico */
.field__error { color: var(--color-danger); }
```
```html
<!-- 4. Las hojas de estilo del sistema -->
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/components.css">

<!-- 5. HTML que solo compone (Atomic Design) -->
<label class="field__label" for="nombre">Tu nombre</label>
<input class="field__control" id="nombre">
<button type="submit" class="btn btn--block">
  Confirmar reserva</button>
```

---

# 06. Responsive & Mobile Design
*Una sola base de código para el celular de Camila y la tablet de Don Raúl.*

## 6.1 ¿Qué es el diseño responsive?
Término acuñado por **Ethan Marcotte en 2010**: una sola página que **se adapta al espacio disponible** en lugar de tener una versión por dispositivo. Hoy más de la mitad del tráfico web mundial llega desde celulares, así que el móvil es el caso principal, no el secundario.

### Los 3 ingredientes originales (y su versión moderna)
1. **Grillas fluidas**: Proporciones en lugar de anchos fijos.
2. **Imágenes flexibles**: Nunca más anchas que su contenedor.
3. **Media queries**: Reglas que aplican según el ancho. Hoy: también **container queries** y **unidades fluidas**.

- **Responsive vs. Adaptativo**:
  - **Responsive**: Una sola base de código, layout **fluido** que se reacomoda de forma continua.
  - **Adaptativo**: Varios layouts fijos que se eligen según el dispositivo. Más control, más mantenimiento.

---

## 6.2 El viewport y las unidades de CSS

```html
<!-- La línea que hace posible el responsive -->
<meta name="viewport"
      content="width=device-width, initial-scale=1">
<!-- sin esto el celular simula ~980 px y achica todo -->
```
> **Importante**: `width=device-width` usa el ancho real del dispositivo; `initial-scale=1` arranca sin zoom. **Nunca agregues `user-scalable=no` ni `maximum-scale=1`**: bloquean el zoom (**WCAG 1.4.4**).

### Tabla de Unidades de CSS

| Unidad | Tipo | Uso Recomendado |
| :---: | :--- | :--- |
| `px` | Absoluta | Bordes, sombras, detalles finos |
| `rem` | Relativa al tamaño base del usuario | Tipografía y espaciado |
| `em` | Relativa a la fuente del elemento | Padding de un botón que escala con su texto |
| `%` | Relativa al contenedor | Anchos fluidos |
| `vw / vh` | 1 % del viewport | Tipografía fluida dentro de `clamp()` |
| `dvh` | Viewport dinámico | Pantallas de alto completo en móvil |
| `ch` | Ancho del carácter `"0"` | Longitud de línea: `max-width: 65ch` |
| `fr` | Fracción del espacio libre en Grid | Columnas que reparten el espacio |

---

## 6.3 Flexbox, Grid y Layout Intrínseco

### Flexbox o Grid: una dimensión o dos
No compiten, se complementan. **Flexbox** distribuye elementos en **una dirección** (fila o columna) según su contenido. **Grid** define **filas y columnas a la vez** y coloca los elementos en esa estructura. `gap` funciona en los dos.

```css
/* Flexbox · header, filtros, botones con ícono */
.site-header {
  display: flex;
  justify-content: space-between; /* extremos */
  align-items: center;            /* centrado vertical */
  gap: var(--space-3);
}

/* Grid · catálogo de tarjetas, layouts de página */
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);            /* filas y columnas */
}
```

### Layout intrínseco (sin media queries)
Un layout **intrínseco** deja que el navegador decida según el espacio, sin media queries. Con `auto-fit` y `minmax()` se resuelve la mayor parte del responsive.

```css
/* Grilla que se acomoda sola */
.service-grid {
  display: grid; gap: var(--space-4);
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}
```
1. `auto-fit`: crea tantas columnas como quepan (`auto-fill` deja columnas vacías si sobran).
2. `minmax(280px, 1fr)`: cada columna mide al menos `280 px` y reparte el sobrante.
3. `min(100%, 280px)`: si el contenedor mide menos de `280 px`, usa el `100 %`: nunca desborda.

---

## 6.4 Mobile Design: Zona del pulgar y Formularios en móvil

### Diseñar para el pulgar: zona de alcance y áreas táctiles
En el estudio de **Steven Hoober (2013)**, el **49 %** de las personas sostenía el celular con una mano y usaba el pulgar. La parte baja y central de la pantalla es la más cómoda (*Natural*); el centro requiere *Estirar*; las esquinas superiores son las más *Difíciles*.

| Tamaño Táctil | Estándar / Guía de Referencia |
| :---: | :--- |
| `24 × 24 px` | **WCAG 2.5.8 (AA)** · mínimo |
| `44 × 44 pt` | **Apple Human Interface Guidelines** |
| `48 × 48 dp` | **Material Design (Android)** |
| `44 × 44 px` | **WCAG 2.5.5 (AAA)** · recomendado |

---

### Formularios en móvil: el teclado correcto en cada campo
Escribir en un celular es lento. El HTML puede **elegir el teclado, autocompletar y cambiar la tecla Enter** sin una línea de JavaScript.

```html
<!-- Campos de la reserva de TurnoYa -->
<!-- 1. type="tel" + numeric: Teclado numérico grande para el celular -->
<input type="tel" inputmode="numeric" autocomplete="tel">

<!-- 2. autocomplete="name": Ofrece el nombre guardado (H7, WCAG 1.3.5) -->
<input autocomplete="name" autocapitalize="words">

<!-- 3. type="email": Teclado con @ y validación nativa -->
<input type="email" autocomplete="email">

<!-- 4. type="date": Selector nativo del sistema (Jakob, H5) -->
<input type="date" min="2026-10-26">

<!-- 5. enterkeyhint: Cambia la etiqueta de la tecla Enter ("Siguiente", "Enviar", "Buscar") -->
<input enterkeyhint="send"> <!-- Enter dice "Enviar" -->
```

> **Tip para iOS**: En iOS, un campo con letra **menor a `16 px`** hace zoom automático al enfocarlo. Mantén `font-size: 1rem` en los inputs.

---

# Cierre de la Sesión

## Recursos para seguir profundizando

| Recurso | Para qué sirve |
| :--- | :--- |
| [w3.org/WAI/WCAG22/quickref](https://www.w3.org/WAI/WCAG22/quickref) | Referencia rápida de WCAG 2.2, filtrable por nivel y tecnología |
| [nngroup.com/articles/ten-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Las 10 heurísticas explicadas por Nielsen Norman Group |
| [lawsofux.com](https://lawsofux.com/) | Leyes de UX con ejemplos y fuentes originales |
| [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) | Calculadora de contraste WCAG |
| [developer.mozilla.org · ARIA](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA) | Guía de roles y atributos ARIA (MDN) |
| [designtokens.org](https://www.designtokens.org/) | Especificación del formato de design tokens del W3C |
| [web.dev/learn/design](https://web.dev/learn/design/) | Curso gratuito de responsive design de Google |

## Resumen de la Sesión
1. **Principios de UX/UI**: Jerarquía, tipografía, color, espaciado, Gestalt, 10 heurísticas de Nielsen con severidad y 6 leyes de UX.
2. **Accesibilidad WCAG 2.2**: POUR, niveles A/AA/AAA, criterios clave, contraste, ARIA mínimo y cómo probar.
3. **Components & Design Systems**: Atomic design, tokens en 3 capas, nomenclatura, anatomía, variantes y estados de UI.
4. **Responsive & Mobile**: Unidades, Flex y Grid, layout intrínseco, zona del pulgar.
5. **TurnoYa**: Reserva accesible, design system con tema oscuro, catálogo responsive y wireframe.
