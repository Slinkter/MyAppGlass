# 🚀 Implementación del Backend - Libro de Reclamaciones y Contacto

Esta documentación detalla el flujo técnico del backend serverless (`functions/`): envío de correos, validación anti-bot y persistencia de datos legales.

> Estado verificado contra `functions/index.js`, `functions/emailSender.js` y `functions/mathCaptchaValidator.js` (octubre 2026). Para el modelo de seguridad ver [08_DOCS_SECURITY_BACKEND.md](./08_DOCS_SECURITY_BACKEND.md).

## 🛠️ Stack Tecnológico
- **Firebase Functions (v2, Node.js 20):** funciones HTTP `onRequest`.
- **Resend SDK:** motor de envío de correos electrónicos transaccionales.
- **Firestore:** registro legal de reclamos, consultas de contacto y control de rate limit.
- **Zod:** validación de esquemas en el servidor (`functions/emailSender.js`).

## ⚙️ Funciones Expuestas

| Función | Método | Secretos | Qué hace | Colección Firestore |
|---|---|---|---|---|
| `submitReclamo` | POST | `RESEND_API_KEY`, `ADMIN_EMAIL`, `RECAPTCHA_SECRET_KEY` | Procesa el Libro de Reclamaciones (`sendEmailLogic`) | `libro_de_reclamaciones` |
| `submitContacto` | POST | `RESEND_API_KEY`, `ADMIN_EMAIL`, `RECAPTCHA_SECRET_KEY` | Procesa contacto y cotizaciones (`sendContactEmailLogic`) | `contact_submissions` |
| `checkStatus` | GET / POST | ninguno | Consulta el estado de una solicitud por código (`id`) | lectura de ambas |

Configuración común: `maxInstances: 10`, `memory: 256MiB`, `timeoutSeconds` 60 (`submitReclamo`, `submitContacto`) o 30 (`checkStatus`).

**CORS por entorno:** en producción solo se aceptan `gyacompany.com` (con o sin `www`), `gya-app-4c8a9.web.app` y `gya-app-4c8a9.firebaseapp.com`. Fuera de producción se añaden `localhost` y `127.0.0.1` (cualquier puerto).

## 🔄 Flujo de Datos (Libro de Reclamaciones)
1.  **Frontend:** `ReclamationForm.tsx` captura los datos y los envía a `src/shared/api/reclamoService.ts`, que incluye el token de reCAPTCHA v3 y la respuesta del captcha matemático.
2.  **API Call:** `fetch` POST al endpoint `submitReclamo` (URL en `NEXT_PUBLIC_API_URL`).
3.  **Backend (`submitReclamo`):**
    1. Solo acepta `POST` (405 en otro caso) y aplica el **rate limit** por IP (429 si se excede).
    2. **Descartes silenciosos anti-bot** (respuesta `GHOST_BLOCKED`, sin enviar correos ni guardar): honeypot (`middleName` / `website_hp`), envío en menos de 1,8 s (`_ts`) y textos basura (`isGibberishOrSpamText`).
    3. **Validación Zod** (`reclamoSchema`): longitudes, caracteres prohibidos (`<>{}()`), enums de tipo de documento/solicitud/bien y monto.
    4. **Captcha matemático** (`validateMathCaptcha`) y **reCAPTCHA v3** (`verifyRecaptcha`, acción `reclamation_submit`, puntuación mínima 0,5).
    5. Validación del documento de identidad peruano (`validateIdentityDocument`).
    6. Envía una notificación HTML al **Administrador** (`ADMIN_EMAIL`).
    7. Envía la constancia al **Cliente** con el código de seguimiento.
    8. Registra el reclamo en `libro_de_reclamaciones` con estado `RECIBIDO`.

`submitContacto` sigue el mismo patrón (honeypot, textos basura, captcha matemático, reCAPTCHA v3 con acción `contact_submit`, Zod con `contactSchema`) y guarda en `contact_submissions` con estado `RECIBIDO`.

### Código de seguimiento (ID del documento)
El código **no** se genera en el servidor con una función propia: es el `id` devuelto por Resend al enviar el correo de notificación al administrador (`adminEmail.data.id`). Ese mismo valor se usa como asunto/código en la constancia del cliente, como ID del documento de Firestore (`.doc(reclamoId)`) y se guarda también en el campo `resendId`. `checkStatus` busca ese `id` primero en `contact_submissions` y luego en `libro_de_reclamaciones`.

> Nota: el HTML del correo al administrador se construye con el literal `"TEMP_ID"` porque el ID real solo existe después de enviarlo; por tanto, el correo al administrador no muestra el código de seguimiento definitivo.

### Rate limit
- Colección `rate_limits` (documento por IP, con `:` y `.` reemplazados por `_`), con la lista de marcas de tiempo y `updatedAt`.
- Máximo **8 envíos por IP cada 15 minutos**, aplicado en las tres funciones.
- Si Firestore falla, la petición se **permite** (decisión explícita para no bloquear a usuarios legítimos).

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

## 🧪 Pruebas Locales
Para probar el backend sin desplegar, use el emulador de Firebase (requiere Java JDK):
```bash
cd functions && pnpm run serve   # firebase emulators:start --only functions
```
Apunte `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CONTACT_API_URL` y `NEXT_PUBLIC_STATUS_API_URL` a las URL del emulador (ver [06_DOCS_DEVELOPMENT.md](./06_DOCS_DEVELOPMENT.md)).

## 📜 Cumplimiento Legal (INDECOPI)
- Los reclamos se guardan con `createdAt: serverTimestamp()` (más `createdAtIso`) para auditoría.
- Cada registro incluye `legalRetentionUntil` (fecha de creación + 2 años), coherente con la política de retención de [04_PLAN_DE_TRABAJO.md](./04_PLAN_DE_TRABAJO.md).
- El ID del documento es el ID del correo de Resend (ver arriba); `libro_de_reclamaciones` no usa un identificador generado por Firestore.
- El plazo de respuesta indicado en las plantillas de correo es de **15 días hábiles** improrrogables (cuyo texto cita la Ley N° 29571 y el D.S. N° 011-2011-PCM, modificado por la Ley N° 31435).

---
*Documentación generada por Gemini CLI - Abril 2026. Actualizada con el estado real del código en octubre 2026.*
