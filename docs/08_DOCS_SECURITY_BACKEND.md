# 🛡️ Seguridad e Infraestructura Backend

Este documento detalla la gestión de servicios serverless y la protección de datos legales.

## ☁️ Firebase Functions v2
Las funciones están alojadas en Google Cloud Run (vía Firebase). 

### Gestión de Secretos (Secret Manager)
NUNCA guarde claves en el código. Use el Secret Manager de Google Cloud:
```bash
# Subir clave de Resend
firebase functions:secrets:set RESEND_API_KEY

# Subir email administrativo
firebase functions:secrets:set ADMIN_EMAIL

# Subir clave secreta de reCAPTCHA v3
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
```
`submitReclamo` y `submitContacto` declaran los tres secretos; `checkStatus` no declara ninguno.

### Despliegue Público
Para que el frontend pueda llamar a las funciones, estas deben estar en modo **"Allow public access"** en la consola de Cloud Run. Si se despliega una nueva función y da error 403, revise la pestaña **Security** en la Consola de Google Cloud.

## 📧 Servicio de Correo (Resend)
- **Dominio:** `gyacompany.com` (Debe estar verificado en Resend).
- **Remitente:** `noreply@gyacompany.com`.
- **Límites:** Monitoree la cuota mensual en el panel de Resend si el volumen de reclamos aumenta.

## 📜 Libro de Reclamaciones (Legal)
Cada envío realiza tres acciones consecutivas (no son una transacción atómica: si falla Firestore después de enviar los correos, se devuelve error pero los correos ya salieron):
1. Envío de HTML detallado al administrador (`ADMIN_EMAIL`).
2. Envío de confirmación con código de seguimiento al cliente.
3. Persistencia en Firestore (`libro_de_reclamaciones`) con marca de tiempo de servidor, estado `RECIBIDO` y `legalRetentionUntil` (2 años).

### Auditoría de Datos
Los reclamos se pueden consultar directamente en la colección `libro_de_reclamaciones` en Firestore. Esta colección es la prueba legal ante INDECOPI.

## 🧱 Capas de Protección (defensa en profundidad)
Aplicadas en `submitReclamo` y `submitContacto` (detalle en [07_BACKEND_IMPLEMENTATION.md](./07_BACKEND_IMPLEMENTATION.md)):
1. **CORS por entorno:** orígenes permitidos de producción; `localhost`/`127.0.0.1` solo fuera de producción.
2. **Rate limit en Firestore:** colección `rate_limits`, 8 envíos por IP cada 15 minutos (429 al excederlo). Si Firestore falla, se permite la petición.
3. **`maxInstances: 10`** en las tres funciones, para acotar costos y abuso.
4. **Anti-bot silencioso:** honeypot, tiempo mínimo de 1,8 s y detección de textos basura.
5. **Validación Zod en el servidor:** nunca se confía en el cliente; se rechazan `<>{}()` en campos de texto.
6. **Captcha matemático firmado** (`functions/mathCaptchaValidator.js`): token base64 con firma de integridad y expiración de 15 minutos; debe coincidir con `src/shared/utils/mathCaptcha.ts`.
7. **reCAPTCHA v3:** puntuación mínima 0,5 y acción esperada (`reclamation_submit` / `contact_submit`).
8. **Sanitización HTML:** `sanitizeHtml` en correos y lista blanca de campos al persistir.
9. **Privacidad en `checkStatus`:** el nombre se ofusca (p. ej. `Lu*** Pe***`) por la Ley N° 29733; solo devuelve id, tipo, estado, fecha y nombre enmascarado.

### Puntos a revisar por el responsable
> Nota: observaciones de la lectura del código, sin cambios aplicados.
- La IP del rate limit se toma del primer valor de `x-forwarded-for`; puede ser manipulable por el cliente según la configuración del proxy.
- `MATH_SALT` tiene un valor por defecto en el código si no existe la variable `MATH_CAPTCHA_SALT`; conviene definirla como secreto/variable de entorno.
- `verifyRecaptcha` envía la clave secreta como parámetro en la URL de `siteverify`; Google también admite enviarla en el cuerpo del POST.
- Las IP de los clientes se guardan en cada registro (`clientIp`) y en `rate_limits`; considere su tratamiento bajo la Ley N° 29733.

## 🚑 Resolución de Problemas
Si el formulario falla en producción:
1. Abra la consola del navegador y busque `[GYA-LOG-ERROR]`.
2. Revise los logs de Cloud Functions en Firebase Console.
3. Verifique que `RESEND_API_KEY` no haya expirado.
4. Si recibe 403 con "Validación de seguridad", revise `RECAPTCHA_SECRET_KEY` y `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`; si recibe 429, se superó el rate limit (8 envíos / 15 min por IP).

---
*Documentación generada por Gemini CLI - Versión 1.0 (Abril 2026)*
