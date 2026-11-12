# Plan técnico: Cotizador de presupuesto (Ventana · Nova)

> Depende de `spec.md`, ya aprobada con las respuestas del dueño (§10 y §11).
> Plan de fases y agentes, con casillas por tarea: `tasks.md` en esta carpeta (aprobado por el dueño el 2026-11-11).

## 1. Estado actual (verificado en el repo)

| Pieza            | Archivo                                                                     | Situación                                                                                        |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Motor de ventana | `entities/quote/lib/windowRules.ts` y `entities/quote/config/pricing.ts`    | Hecho (commit `9cae5c75`): `validateWindow`, `computeSashes`, `splitBodies`, `priceWindow`, `quoteTotals`; constantes `WINDOW_PRICING`. Pruebas en `tests/unit/window-rules.test.ts` |
| Pantalla         | `screens/Presupuesto/PresupuestoWizardScreen.tsx` (168 líneas)              | Pendiente. Sigue el flujo antiguo: exige login (`LoginRequired`) y `CustomerPanel` con DNI/correo/dirección |
| Cálculo antiguo  | `entities/quote/lib/quoteCalculator.ts`, `quoteSummary.ts`, `quoteLines.ts` | Modelo vidrio + perfil + kit + instalación. Se reemplaza por el motor nuevo en la pantalla; `parseSystemParam` sigue en `quoteLines.ts` |
| Precios          | `entities/quote/config/pricing.ts`                                          | IGV 18 %; `WINDOW_PRICING` ya definido. Falta `heightMaxM: 2.4` (Fase 1) |
| Guardado         | `features/presupuesto/services/quoteService.ts`                             | Transacción: contador `contadores/presupuesto-AAAA` + `presupuestos_solicitados/{GYA-AAAA-XXXX}` |
| Hoja             | `entities/quote/ui/QuoteSheet.tsx`                                          | Existe; se adapta a HTML A4 con `window.print()` (Fase 5) |
| Reglas Firestore | `firestore.rules` L151–185                                                  | Creación pública permitida, con `hasOnly` de campos fijos. Se revisa en Fase 6 |
| Backend          | `apps/functions/src/http/submitContacto.js`, `adapters/mailer.js`           | Envío de correos (Resend); congelado. Se toca solo en emuladores (Fase 6) |
| Servicios        | `features/services/components/ServicePageLayout.tsx`                        | Aquí vive el CTA "Cotizar". Pendiente (Fase 2) |

## 2. Decisiones técnicas

**D1. Motor de reglas puro** en `entities/quote/lib/windowRules.ts`: `validateWindow`, `computeSashes`, `splitBodies`, `priceWindow`, `quoteTotals`. Sin React ni Firebase. Constantes en `entities/quote/config/pricing.ts`. Se verifica con `pnpm --filter @gya/web exec vitest run tests/unit/window-rules.test.ts`. Ya está hecho.

**D2. No se reescribe el wizard de golpe.** `PresupuestoWizardScreen.tsx` pasa a ser el flujo nuevo en pasos (Fase 4). Los componentes nuevos van en `screens/Presupuesto/presupuesto/` y se muestran primero en `/design-system` (Fase 3).

**D3. Carrito en el cliente.** Estado con un hook y `localStorage` envuelto en try/catch (RF21, RNF9). Sin cuenta y sin backend hasta el momento de generar. Si el almacenamiento falla, la página sigue funcionando sin guardar el carrito.

**D4. Entrada sin sesión.** Se quita el bloqueo `LoginRequired` solo para este flujo. El dueño lo confirmó (spec §10, P11). Si hay sesión, se autocompleta nombre y celular.

**D5. Hoja A4 en HTML + `window.print()`, sin librería ni Storage.** Decisión del dueño (spec §11, pregunta 6; §12). La hoja es HTML con `@page { size: A4 }`, membrete de marca, número `GYA-AAAA-XXXX`, líneas, totales, datos bancarios y detalle de cuerpos. El cliente la imprime o la guarda como PDF desde el navegador. No se añade `jspdf` ni `features/presupuesto/lib/pdf.ts`. No se sube ningún archivo a Storage. Un botón de PDF directo queda para más adelante.

**D6. Guardado y aviso.**

1. Firestore: se guarda la solicitud en `presupuestos_solicitados` con `params` v3 (ventanas, medidas, vidrio, perfil, hojas, cuerpos, precios). Se revisan las reglas actuales (`params is map`, `total < 10 000 000`) y se ajustan solo si hace falta.
2. Sin Storage: no hay reglas nuevas de `storage.rules` ni subida de PDF.
3. Correo: el dueño autorizó tocar `firestore.rules` y `apps/functions` solo en emuladores, sin desplegar (spec §11, pregunta 5). Se crea `submitPresupuesto` (guarda y envía, con captcha y límite de frecuencia), siguiendo `submitContacto`. Mientras tanto, el aviso es un enlace de WhatsApp con el número de presupuesto (provisional).
4. Ningún despliegue sin autorización del dueño (spec §6, RNF13).

**D7. Texto y diseño.** Todos los textos pasan por el agente de redacción `copy-vidrieria`. La UI se valida con `auditor-md3`, `espaciado-360` y `ui-navegador-movil`. Componentes nuevos se agregan primero en `/design-system`.

## 3. Archivos

| Archivo                                              | Acción                                                                  | Requisitos     |
| ---------------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| `entities/quote/config/pricing.ts`                   | Ya hecho; falta `heightMaxM: 2.4`                                       | RF5, RF11–RF13, RNF6 |
| `entities/quote/lib/windowRules.ts`                  | Ya hecho                                                                | RF7–RF17       |
| `tests/unit/window-rules.test.ts`                    | Ya hecho; se ajusta el caso de alto (Fase 1)                            | RNF5           |
| `screens/Presupuesto/PresupuestoWizardScreen.tsx`    | Pasos del flujo nuevo; quitar login para este flujo                     | RF1, RF18–RF19 |
| `screens/Presupuesto/presupuesto/`                   | Nuevos: `OptionChooser`, `WindowForm`, `QuoteCart`, formulario de cierre | RF2–RF23       |
| `features/services/components/ServicePageLayout.tsx` | CTA "Cotizar {sistema}" con parámetros                                  | RF1            |
| `features/presupuesto/hooks/`                        | Nuevo: hook del carrito con `localStorage` y try/catch                  | RF21, RNF9     |
| `features/presupuesto/services/quoteService.ts`      | Guardar `params` v3; sin doble envío; conservar carrito si falla        | RF27           |
| `features/presupuesto/schemas/quote-form-schema.ts`  | Esquema `quickCustomerSchema`: nombre, celular, aceptación              | RF22, RF23     |
| `entities/quote/ui/QuoteSheet.tsx`                   | Hoja A4 en HTML, `@page` A4, impresión con `window.print()`            | RF24–RF26, RNF11 |
| `apps/functions/src/http/submitPresupuesto.js`       | Nuevo (solo emuladores): guardar y avisar por correo                    | RF27, RF29     |
| `tests/rules/firestore.rules.test.mjs`               | Reglas y pruebas de `presupuestos_solicitados`                          | RF27, RF28, RNF7 |
| `features/admin/` (panel de `/admin`)                | Búsqueda por nombre o teléfono                                          | RF28           |
| `docs/PENDIENTES.md`, `docs/05_CHANGELOG.md`         | Actualizar                                                              | §9             |

## 4. Riesgos

| Riesgo                                         | Mitigación                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| Alto de piso a techo fuera del cotizador       | Alto mayor a 2,40 m pide visita técnica (spec §11, pregunta 10)        |
| Reglas congeladas bloquean guardado o correo   | Autorización del dueño solo para emuladores; sin deploy (spec §11, pregunta 5) |
| Spam o abuso: creación pública sin sesión      | Captcha y límite de frecuencia en `submitPresupuesto`; un solo correlativo por clic |
| Hoja en móvil                                  | Probar impresión en teléfono real (tarea 7.4)                          |
| Datos personales (Ley 29733)                   | Solo nombre y teléfono; texto legal de la política publicada (`/politicas-empresa`) |
| Promesa de precio vinculante                   | Aviso "aproximado" en pantalla y en la hoja (RF26); vigencia 24 h o 15 días |
| Flete fuera de La Molina                       | El cliente indica si la instalación es en La Molina; aviso del flete de S/ 120 sin IGV (spec §11, pregunta 11) |

## 5. Fases

El detalle de cada tarea (archivo principal, requisitos, agente y modelo) está en `tasks.md`:

- Fase 0: preparación de documentos y agentes.
- Fase 1: alinear el motor con las respuestas del dueño.
- Fase 2: entrada desde el servicio.
- Fase 3: componentes en `/design-system`.
- Fase 4: integración en `/presupuesto`.
- Fase 5: cierre, hoja A4 y guardado.
- Fase 6: panel y aviso por correo (solo emuladores).
- Fase 7: verificación final y cierre.

Después de este plan: otros sistemas (Serie 25, 35, 62, Acústica, PVC) repiten las fases 3 a 5 con sus reglas.
