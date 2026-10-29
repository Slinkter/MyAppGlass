# 🚀 Implementación del Backend - Libro de Reclamaciones y Contacto

Esta documentación resume el flujo técnico del backend serverless (`functions/`): persistencia legal, envío de correos, códigos de seguimiento y validación anti-bot.

> Estado verificado contra el código de `functions/` el 2026-10-29. La arquitectura por capas, el flujo "guardar primero" y el rate limit por función están commiteados en la rama `chore/verificar-functions-backend` y desplegados en producción el 2026-10-29 (runtime `nodejs22`).
>
> La guía completa (capas, tablas, procedimiento de despliegue y cómo agregar una función) está en [functions/README.md](../functions/README.md). El modelo de seguridad está en [08_DOCS_SECURITY_BACKEND.md](./08_DOCS_SECURITY_BACKEND.md).

## 🛠️ Stack Tecnológico
- **Firebase Functions (v2, Node.js 22, CommonJS):** funciones HTTP `onRequest`.
- **Resend SDK:** envío de correos transaccionales (`functions/src/adapters/mailer.js`).
- **Firestore (Admin SDK):** registro legal de reclamos, consultas de contacto y control de rate limit.
- **Zod:** validación de esquemas en el servidor (`functions/src/schemas/`).
- **Pruebas:** `node:test`, 120 pruebas (`cd functions && npm test`).

## ⚙️ Funciones Expuestas

| Función | Método | Secretos | Qué hace | Colección Firestore |
|---|---|---|---|---|
| `submitReclamo` | POST | `RESEND_API_KEY`, `ADMIN_EMAIL`, `RECAPTCHA_SECRET_KEY` | Procesa el Libro de Reclamaciones (`src/services/reclamoService.js`) | `libro_de_reclamaciones` |
| `submitContacto` | POST | `RESEND_API_KEY`, `ADMIN_EMAIL`, `RECAPTCHA_SECRET_KEY` | Procesa contacto y cotizaciones (`src/services/contactoService.js`) | `contact_submissions` |
| `checkStatus` | GET / POST | ninguno | Consulta el estado de una solicitud por código (`id`) | lectura de ambas |

Configuración común: `maxInstances: 10`, `memory: 256MiB`, `timeoutSeconds` 60 (`submitReclamo`, `submitContacto`) o 30 (`checkStatus`).

**CORS por entorno:** en producción solo se aceptan `gyacompany.com` (con o sin `www`), `gya-app-4c8a9.web.app` y `gya-app-4c8a9.firebaseapp.com`. Fuera de producción se añaden `localhost` y `127.0.0.1` (cualquier puerto).

## 🔄 Flujo de Datos (Libro de Reclamaciones)
1.  **Frontend:** `ReclamationForm.tsx` captura los datos y los envía a `src/shared/api/reclamoService.ts`, que incluye el token de reCAPTCHA v3 y la respuesta del captcha matemático.
2.  **API Call:** `fetch` POST al endpoint `submitReclamo` (URL en `NEXT_PUBLIC_API_URL`).
3.  **Backend (`submitReclamo`):** el orden real es el siguiente.
    1. Solo acepta `POST` (405 en otro caso) y aplica el **rate limit** por IP y por función (8 envíos cada 15 minutos; 429 si se excede; 503 si Firestore falla).
    2. **Descartes silenciosos anti-bot** (respuesta `GHOST_BLOCKED`, sin guardar ni enviar correos): honeypot (`middleName` / `website_hp`), envío en menos de 1,8 s (`_ts`) y textos basura (`isGibberishOrSpamText`).
    3. **Validación Zod** (`reclamoSchema`): longitudes, caracteres prohibidos `<>{}` en los campos de texto, enums de tipo de documento, tipo de solicitud y tipo de bien, y monto.
    4. **Captcha matemático** (`validateMathCaptcha`) y **reCAPTCHA v3** (`verifyRecaptcha`, acción `reclamation_submit`, puntuación mínima 0,5).
    5. Validación del documento de identidad peruano (`validateIdentityDocument`: DNI, carné de extranjería, pasaporte o RUC) y de los campos obligatorios.
    6. **Guarda primero** el reclamo en `libro_de_reclamaciones` con estado `RECIBIDO`, código propio y notificaciones en `PENDING`.
    7. Envía en paralelo la notificación HTML al **Administrador** (`ADMIN_EMAIL`) y la constancia al **Cliente**, ambas con el código real.
    8. Registra el resultado de cada correo en `notifications.admin` y `notifications.client` (`SENT` con `resendId`, o `FAILED` con `error`).
    9. Responde `{ success: true, data: { id, createdAt } }`. Si un correo falla, el reclamo queda registrado igualmente y la respuesta sigue siendo de éxito.

`submitContacto` sigue el mismo patrón, con este orden: anti-bot, captcha matemático, reCAPTCHA v3 (acción `contact_submit`) y después Zod con `contactSchema`. No valida documento de identidad y guarda en `contact_submissions` con estado `RECIBIDO`.

## 🔖 Códigos de seguimiento
- Formato: `GYA-REC-AAAA-XXXXXX` para reclamos y `GYA-CON-AAAA-XXXXXX` para consultas de contacto. `AAAA` es el año en la zona `America/Lima`.
- El código lo genera el propio backend (`functions/src/adapters/idGenerator.js`) con 6 caracteres aleatorios sin `0`, `O`, `1` ni `I`. Se guarda con `create()`, que falla si el código ya existe; ante una colisión se regenera (hasta 5 intentos).
- El código es también el ID del documento en Firestore y aparece en el asunto y el cuerpo de los correos. No es correlativo.
- `checkStatus` acepta códigos nuevos y también los antiguos, que eran el ID devuelto por Resend (buscados en `contact_submissions` y luego en `libro_de_reclamaciones`). **DESPLEGADO el 2026-10-29** para los códigos nuevos.

> Antes de este cambio, el código era el ID de Resend y el correo al administrador se generaba con un marcador temporal. Ese marcador ya no existe en el código: el correo se envía después de guardar y lleva el código real.

## 🗂️ Modelo de datos guardado
- **Reclamo** (`libro_de_reclamaciones`): campos del formulario saneados con lista blanca (`buildSafeReclamoPayload`), más `id`, `status`, `createdAt` (serverTimestamp), `createdAtIso`, `source` (`PROD_WEB`), `clientIp`, `legalRetentionUntil` (creación + 2 años) y `notifications`.
- **Consulta de contacto** (`contact_submissions`): `name`, `email`, `phone`, `message` (`buildSafeContactPayload`), más los mismos campos de control. No incluye `legalRetentionUntil`.
- **Notificaciones:** `notifications.admin` y `notifications.client` pasan de `PENDING` a `SENT` (con `resendId`) o `FAILED` (con `error`, sin direcciones de correo). Si la actualización de este campo falla, el documento queda en `PENDING`.

### Rate limit
- Colección `rate_limits`, documento `{función}_{ip}` (con `:` y `.` reemplazados por `_`), con las marcas de tiempo de la ventana, `ip`, `fn`, `updatedAt` y `expireAt` (24 horas).
- Lectura y escritura en una **transacción**, por lo que el conteo es atómico.
- Máximos por IP en 15 minutos: **8** para `submitReclamo` y `submitContacto`, y **30** para `checkStatus`.
- Si Firestore falla en `submitReclamo` o `submitContacto`, la respuesta es **503** (no se deja pasar la petición). `checkStatus` sigue en modo abierto a propósito.
- La política TTL sobre `expireAt` debe activarse en la consola de Firestore (pendiente).

### Sanitización
- Servidor: `stripHtml`, `buildSafeReclamoPayload` / `buildSafeContactPayload` (lista blanca de campos; nunca se persiste el `request.body` crudo) y `sanitizeHtml` (escape de `& < > " '`) antes de insertar datos en el HTML de los correos.
- Cliente: `src/features/reclamation-book/utils/sanitizer.ts`.

## 🔐 Configuración de Secretos (CRÍTICO)
Para que el sistema funcione en producción, se deben configurar los siguientes secretos en Firebase:

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set ADMIN_EMAIL
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
```

*Nota: Asegúrese de que el dominio `gyacompany.com` esté verificado en el panel de Resend.*

Si `functions/.env` define también `RECAPTCHA_SECRET_KEY`, el despliegue falla. Ver la advertencia en [functions/README.md](../functions/README.md), sección 9.

## 🧪 Pruebas Locales
Pruebas unitarias sin emulador:
```bash
cd functions && npm test
```

Para probar el backend con el emulador de Firebase (requiere Java JDK):
```bash
cd functions && npm run serve   # firebase emulators:start --only functions
```
Apunte `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CONTACT_API_URL` y `NEXT_PUBLIC_STATUS_API_URL` a las URL del emulador (ver [06_DOCS_DEVELOPMENT.md](./06_DOCS_DEVELOPMENT.md)).

## 📜 Cumplimiento Legal (INDECOPI)
- Los reclamos se guardan **antes** de enviar cualquier correo, con `createdAt: serverTimestamp()` (más `createdAtIso`) para auditoría. Así, un fallo de correo no pierde el registro legal.
- Cada reclamo incluye `legalRetentionUntil` (fecha de creación + 2 años, en formato ISO), coherente con la política de retención de [04_PLAN_DE_TRABAJO.md](./04_PLAN_DE_TRABAJO.md).
- El código de seguimiento es propio del backend (`GYA-REC-AAAA-XXXXXX`) y se usa como ID del documento en `libro_de_reclamaciones`.
- El plazo de respuesta indicado en las plantillas de correo es de **15 días hábiles** improrrogables (cuyo texto cita la Ley N° 29571 y el D.S. N° 011-2011-PCM, modificado por la Ley N° 31435).

---
*Documentación original generada por Gemini CLI - Abril 2026. Actualizada con el estado real del código el 2026-10-29.*
