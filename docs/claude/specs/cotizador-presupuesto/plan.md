# Plan técnico: Cotizador de presupuesto

> Depende de `spec.md` aprobada. No hay código nuevo hasta resolver Q1–Q6 (o dejarlas como constantes editables en `pricing.ts`).

## 1. Estado actual (verificado en el repo)

| Pieza            | Archivo                                                                     | Situación                                                                                        |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Pantalla         | `screens/Presupuesto/PresupuestoWizardScreen.tsx` (168 líneas)              | Exige login (`LoginRequired`), una o más líneas, `CustomerPanel` con DNI/correo/dirección        |
| Cálculo          | `entities/quote/lib/quoteCalculator.ts`, `quoteSummary.ts`, `quoteLines.ts` | Modelo vidrio + perfil + kit + instalación                                                       |
| Precios          | `entities/quote/config/pricing.ts`                                          | IGV 18 %, tabla por vidrio/color/sistema                                                         |
| Guardado         | `features/presupuesto/services/quoteService.ts`                             | Transacción: contador `contadores/presupuesto-AAAA` + `presupuestos_solicitados/{GYA-AAAA-XXXX}` |
| Hoja             | `entities/quote/ui/QuoteSheet`                                              | Existe; revisar si sirve como base del A4                                                        |
| Reglas Firestore | `firestore.rules` L151–185                                                  | Creación pública permitida, con `hasOnly` de campos fijos                                        |
| Backend          | `apps/functions/src/http/submitContacto.js`, `adapters/mailer.js`           | Envío de correos (Resend); **congelado**                                                         |
| Servicios        | `features/services/components/ServicePageLayout.tsx`                        | Aquí vive el CTA "Cotizar"                                                                       |

## 2. Decisiones técnicas propuestas

**D1. Motor de reglas nuevo y puro** en `entities/quote/lib/windowRules.ts`:
`computeSashes(widthM)`, `splitBodies(widthM, heightM)`, `priceWindow({...})`. Sin React ni Firebase. Entra el valor S/ 240 en `pricing.ts` como `windowPerM2`. Se prueba con un script (`scripts/verificar-cotizador.mjs`).

**D2. No se reescribe el wizard; se añade un modo "ventana por m²"** y se mantiene el modelo antiguo mientras el dueño no responda Q4. Así no se rompe lo que ya existe.

**D3. Carrito en el cliente** (estado + `sessionStorage` envuelto en try/catch). Sin cuenta, sin backend hasta el momento de generar.

**D4. Entrada sin sesión.** Quitar el bloqueo `LoginRequired` solo para este flujo (depende de Q10). Si hay sesión, se autocompleta nombre y celular.

**D5. PDF A4.** Tres opciones; recomiendo la A:

- **A. `window.print()` con CSS `@page { size: A4 }`** sobre la vista previa: sin dependencias, funciona en móvil como "Guardar como PDF", pero no genera un archivo para Storage.
- **B. `jspdf` (+ autoTable):** archivo real que sí se sube a Storage. Añade una dependencia.
- **C. Generación en Cloud Function:** control total, pero toca `apps/functions` (congelado).
  Recomendación: **B** si se exige guardar el PDF en Storage (así lo pidió el dueño); A como respaldo. Requiere aprobar la dependencia.

**D6. Guardado y aviso.**

1. Firestore: reutilizar `submitQuoteRequest` ampliando `params` a `{ version: 2, items }` (ya previsto en PENDIENTES nivel 3). Verificar que las reglas actuales lo aceptan (`params is map`, `total < 10 000 000`): sí, sin cambios de reglas.
2. Storage: subir el PDF requiere regla en `storage.rules` (**congelado: pedir autorización**).
3. Correo: opciones: (a) nueva función `submitPresupuesto` que guarda y envía, como `submitReclamo` (**congelado: pedir autorización**); (b) mientras tanto, el enlace de WhatsApp con el número del presupuesto (sin tocar backend).
   Orden recomendado: entregar primero la experiencia completa con (b) y Firestore; la subida a Storage y el correo van en una segunda entrega con tu autorización.

**D7. Texto y diseño.** Todos los textos pasan por el agente de redacción (skill `copy-vidrieria`). La UI se valida con `uiv3` y `responsive-check` contra `/design-system`. Componentes nuevos se agregan **primero** en `/design-system`.

## 3. Archivos

| Archivo                                              | Acción                                                             | Requisitos     |
| ---------------------------------------------------- | ------------------------------------------------------------------ | -------------- |
| `entities/quote/config/pricing.ts`                   | Añadir `windowPerM2`, `cardSurchargePct`, límites de medida        | R13, R15, R5   |
| `entities/quote/lib/windowRules.ts`                  | Nuevo: hojas, cuerpos, precio                                      | R7–R12         |
| `scripts/verificar-cotizador.mjs`                    | Nuevo: casos de la spec §6–§7                                      | todas          |
| `screens/Presupuesto/PresupuestoWizardScreen.tsx`    | Dividir en pasos; quitar login para este flujo                     | R1–R3, R17–R21 |
| `screens/Presupuesto/presupuesto/`                   | Nuevos: `OptionChooser`, `WindowForm`, `QuoteCart`, `PreviewSheet` | R2–R6, R17–R22 |
| `features/services/components/ServicePageLayout.tsx` | CTA "Cotizar {sistema}" con parámetros                             | R1             |
| `features/presupuesto/services/quoteService.ts`      | Aceptar `params` v2 y `phone` único                                | R25            |
| `features/presupuesto/schemas/quote-form-schema.ts`  | Validación nombre/celular/consentimiento                           | R20–R21        |
| `features/presupuesto/lib/pdf.ts`                    | Nuevo: arma el PDF A4                                              | R23–R24        |
| `docs/PENDIENTES.md`, `docs/05_CHANGELOG.md`         | Actualizar                                                         | cierre         |

## 4. Riesgos

| Riesgo                                         | Mitigación                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| Los S/ 240 por m² contradicen el modelo actual | Q4; convivencia temporal                                               |
| Umbrales de hojas ambiguos                     | Q1; constantes en `pricing.ts` y casos de borde en el script           |
| Reglas congeladas bloquean Storage/correo      | Dividir en 2 entregas (D6)                                             |
| Spam o abuso: creación pública sin sesión      | Reutilizar `guards/` (captcha, rate limit) si se mueve a función       |
| PDF en móvil                                   | Probar en teléfono real                                                |
| Datos personales (Ley 29733)                   | Texto legal revisado por el dueño; no guardar más que nombre y celular |
| Promesa de precio vinculante                   | Aviso "aproximado" en pantalla y A4 (R24)                              |

## 5. Orden de entregas

1. **Entrega 1 (sin tocar código congelado):** motor + script, CTA, `/presupuesto` con 2 opciones, carrito, vista previa, PDF por el navegador, guardado en Firestore, WhatsApp.
2. **Entrega 2 (con tu autorización):** PDF en Storage + correo desde función + reglas.
3. **Entrega 3:** repetir con Serie 25 y demás sistemas.
