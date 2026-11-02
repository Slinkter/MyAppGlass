# Contrato de la API (frontend ↔ backend)

`docs/api/openapi.json` (OpenAPI 3.1) describe las Cloud Functions HTTP: `submitReclamo`, `submitContacto` y `checkStatus`.

**El backend manda.** El archivo se genera desde los schemas Zod de `apps/functions/src/schemas/` y no se edita a mano.

## Cómo consumirlo (frontend)

- **Endpoints, métodos y respuestas:** ver `paths` en `openapi.json`. Éxito: `{ success: true, data: { id, createdAt } }`. Error: `{ success: false, message }`.
- **Campos y límites:** ver `components.schemas.ReclamoRequest` y `ContactoRequest` (`required`, `minLength`, `maxLength`, `pattern`, `enum`, `const`).
- **Schema del frontend:** `packages/shared/src/schemas/reclamation-schema.ts` debe cumplir esos límites. Los campos de seguridad (`mathToken`, `mathAnswer`, `recaptchaToken`, `_ts`, `middleName`, `website_hp`) los envía el formulario y están documentados en el mismo archivo.
- **Valores permitidos:** el formulario ofrece un subconjunto de los `enum` del backend (por ejemplo `tipoDocumento`: DNI, CE, PASAPORTE). El backend acepta además "Carné de Extranjería", "Pasaporte" y "RUC".

## Cómo cambiar el contrato

1. Cambia el schema Zod del backend (`apps/functions/src/schemas/reclamo.js` o `contacto.js`) y, si guarda el campo, la lista blanca de `apps/functions/src/adapters/sanitize.js`.
2. Regenera el contrato: `pnpm run contract:generate`.
3. Backend: `pnpm run test:functions` (falla si `openapi.json` quedó desactualizado).
4. Frontend: ajusta `packages/shared/src/schemas/reclamation-schema.ts` y ejecuta `pnpm --filter @gya/web exec vitest run tests/unit/api-contract.test.ts` (falla si el frontend se desalineó).
5. Despliega primero `functions` y después `hosting`. Los campos nuevos deben ser opcionales mientras el sitio publicado no los envíe.

## Registro en Firestore (`libro_de_reclamaciones`)

Cada reclamo guarda los campos validados, más `id` (`GYA-REC-AAAA-XXXXXX`), `status`, `createdAt` (timestamp del servidor, usar para filtrar por fecha), `createdAtIso`, `legalRetentionUntil`, `source`, `clientIp` y `notifications` (`admin` y `client` con `SENT` o `FAILED`). También conserva `nombrePadreMadre`, `aceptaTerminos` y `autorizaEmail` como evidencia del consentimiento.

Los documentos anteriores al 29 de octubre de 2026 tienen como ID el código de Resend y pueden incluir campos extra (por ejemplo `recaptchaToken`).

---

## Protocolo estándar para actualizar y probar otros formularios (guía replicable)

Pasos aplicados en `/libro-de-reclamacion` que deben replicarse al actualizar otros formularios del sitio (`/contacto`, `/presupuesto`, etc.):

1. **Contrato y sanitización en Backend (`apps/functions/`):**
   - Definir los campos, límites y consentimientos obligatorios (`aceptaTerminos`, etc.) en el schema Zod (`apps/functions/src/schemas/*.js`).
   - Incluir los campos nuevos en la lista blanca de `apps/functions/src/adapters/sanitize.js` (`buildSafe*Payload`) para que no se descarten antes de guardar en Firestore.
2. **Generar OpenAPI y validar tests de contrato:**
   - Ejecutar `pnpm run contract:generate` para actualizar `docs/api/openapi.json`.
   - Ejecutar `pnpm run test:functions` (incluye `openapi.test.js`).
3. **Alinear el schema compartido del Frontend (`packages/shared/`):**
   - Sincronizar el schema en `packages/shared/src/schemas/` (reexportado en `apps/web/src/shared/schemas/`) con los mismos límites de `openapi.json` y protegerlo en `apps/web/tests/unit/api-contract.test.ts`.
4. **UI del formulario y plantilla de correo:**
   - Aplicar el Aura Design System (`FormCard`, inputs/selects con `variant="outline"`, botón `variant="aura"`, reto matemático `MathCaptchaField` y `executeRecaptcha`).
   - Usar el layout compartido `apps/functions/src/templates/emailLayout.js` en los correos de empresa y cliente.
5. **Reglas de Firestore (`firestore.rules`):**
   - Mantener `allow create, delete: if false;` desde cliente en colecciones escritas por Cloud Functions (Admin SDK).
   - Habilitar `allow read: if isAdmin();` y `allow update: if isAdmin()` restringido solo a `['status', 'updatedAt', 'adminNotes']` con estados válidos (`['RECIBIDO', 'EN_REVISION', 'EN_PROCESO', 'ATENDIDO']`).
   - Desplegar reglas con `firebase deploy --only firestore:rules`.
6. **Prueba E2E real (Firestore de producción + Resend + `checkStatus`):**
   - **Importante:** No probar con `RESEND_API_KEY` real contra el emulador local de Firestore, ya que enviará correos reales sin dejar registro en el Firestore de producción.
   - Ejecutar la prueba con Playwright sobre el formulario verificando:
     1. Creación del documento `GYA-REC-AAAA-XXXXXX` / `GYA-CON-AAAA-XXXXXX` en la colección de **producción** (`libro_de_reclamaciones` o `contact_submissions`).
     2. Estado `notifications.admin.status === "SENT"` y `notifications.client.status === "SENT"` con sus `resendId`.
     3. Consulta `GET /checkStatus?id=<CODIGO>` respondiendo `200 OK` con nombre ofuscado.
7. **Actualizar colecciones Postman (`apps/web/tests/postman/`):**
   - Actualizar los payloads de `GYA_Company_API.postman_collection.json` con todos los campos vigentes del contrato, casos de rechazo por falta de consentimientos (`400 Zod`) y consulta `200 OK` en `checkStatus` usando el código real registrado.
