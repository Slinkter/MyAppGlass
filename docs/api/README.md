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
