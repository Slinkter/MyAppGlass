# 🛡️ Seguridad e Infraestructura Backend

Este documento detalla la gestión de servicios serverless y la protección de datos legales.

> Estado verificado contra el código de `functions/` el 2026-10-29. Los cambios de rate limit, IP, persistencia y errores descritos abajo están commiteados en la rama `chore/verificar-functions-backend` y desplegados en producción el 2026-10-29 (runtime `nodejs22`).
>
> Arquitectura completa, tabla de funciones y procedimiento de despliegue: [functions/README.md](../functions/README.md).

## ☁️ Firebase Functions v2
Las funciones están alojadas en Google Cloud Run (vía Firebase). Runtime `nodejs22`.

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
Cada envío sigue este orden (**DESPLEGADO el 2026-10-29**; el código anterior enviaba los correos antes de guardar):
1. **Guardar primero** en Firestore (`libro_de_reclamaciones`) con código propio `GYA-REC-AAAA-XXXXXX`, marca de tiempo de servidor, estado `RECIBIDO`, `legalRetentionUntil` (2 años) y notificaciones en `PENDING`. Si esta escritura falla, no se envía ningún correo y la respuesta es un error genérico.
2. Envío en paralelo (`Promise.allSettled`) del HTML al administrador (`ADMIN_EMAIL`) y de la constancia con el código de seguimiento al cliente.
3. Registro del resultado de cada correo en `notifications.admin` y `notifications.client` (`SENT` con `resendId`, o `FAILED`). Un fallo de correo no invalida el reclamo: la respuesta sigue siendo de éxito.

### Auditoría de Datos
Los reclamos se pueden consultar directamente en la colección `libro_de_reclamaciones` en Firestore. Esta colección es la prueba legal ante INDECOPI. Con el orden nuevo, todo reclamo aceptado queda guardado aunque falle el correo; el campo `notifications` indica qué correos no salieron.

## 🧱 Capas de Protección (defensa en profundidad)
Aplicadas en `submitReclamo` y `submitContacto` (detalle en [07_BACKEND_IMPLEMENTATION.md](./07_BACKEND_IMPLEMENTATION.md)):
1. **CORS por entorno:** orígenes permitidos de producción; `localhost`/`127.0.0.1` solo fuera de producción.
2. **Rate limit en Firestore** (**DESPLEGADO el 2026-10-29**):
   - Colección `rate_limits`, documento `{función}_{ip}`: el límite es por función, no global.
   - La lectura y la escritura ocurren en una **transacción**, por lo que el conteo es atómico.
   - Máximos por IP en 15 minutos: **8** en `submitReclamo` y `submitContacto`, **30** en `checkStatus`. Al excederlo responde 429.
   - Cada documento lleva `expireAt` (24 horas) para una política **TTL** de Firestore. La política debe activarse en la consola (pendiente).
3. **Obtención de la IP del cliente** (**DESPLEGADO el 2026-10-29**): se toma la entrada de `X-Forwarded-For` que añade la infraestructura, no el primer valor, que controla el cliente. Con `TRUSTED_PROXY_HOPS = 1` se usa la última entrada válida. Confirmado: un X-Forwarded-For forjado no evade el límite; falta confirmar en el log que la IP registrada es la pública real.
4. **Fallo de Firestore:** en `submitReclamo` y `submitContacto` la respuesta es **503** (fail-closed) y no se deja pasar la petición. `checkStatus` conserva el comportamiento abierto a propósito, porque solo lee.
5. **`maxInstances: 10`** en las tres funciones, para acotar costos y abuso.
6. **Anti-bot silencioso:** honeypot, tiempo mínimo de 1,8 s (`_ts`) y detección de textos basura. Responde éxito con `GHOST_BLOCKED` y no guarda ni envía nada.
7. **Validación Zod en el servidor:** nunca se confía en el cliente; se rechazan `<>{}` en campos de texto.
8. **Captcha matemático firmado** (`functions/src/guards/captcha.js`, expuesto también por el shim `functions/mathCaptchaValidator.js`): token base64 con firma de integridad y expiración de 15 minutos; debe coincidir con `src/shared/utils/mathCaptcha.ts`.
9. **reCAPTCHA v3:** puntuación mínima 0,5 y acción esperada (`reclamation_submit` / `contact_submit`). Si falla la verificación, responde 403.
10. **Mensajes de error genéricos:** los errores de persistencia responden con un mensaje genérico y el detalle técnico queda en el log. Quedan excepciones pendientes (ver la tabla de puntos).
11. **Sanitización HTML:** `sanitizeHtml` en correos y lista blanca de campos al persistir.
12. **Privacidad en `checkStatus`:** el nombre se ofusca (p. ej. `Lu*** Pe***`) por la Ley N° 29733; solo devuelve id, tipo, estado, fecha y nombre enmascarado.

### Puntos a revisar por el responsable
> Nota: observaciones de la lectura del código. Los puntos marcados como **resueltos** están corregidos en el código commiteado (desplegado el 2026-10-29); los **abiertos** no se han corregido.

| Punto | Estado | Detalle |
|---|---|---|
| IP del rate limit tomada del primer valor de `X-Forwarded-For` | Resuelto en código (confirmar tras desplegar) | Ahora se usa la entrada según `TRUSTED_PROXY_HOPS = 1`. Falta verificarlo con una petición forjada. |
| Rate limit fail-open en envíos (Firestore caído = petición permitida) | Resuelto en código | `submitReclamo` y `submitContacto` responden 503. `checkStatus` sigue abierto a propósito. |
| Marcador `TEMP_ID` en el correo al administrador | Resuelto en código | El correo se envía después de guardar y usa el código real. No queda rastro de `TEMP_ID` en `functions/src`. |
| Errores internos expuestos al cliente | Parcialmente resuelto | Los fallos de persistencia responden un mensaje genérico. Los handlers aún devuelven `error.message` para cualquier excepción que no sea `HttpsError`. **Abierto.** |
| `MATH_SALT` con valor por defecto en el código | Abierto (fuera de alcance) | La sal `GYA_MATH_SECURE_SALT_2026` es pública: está en `src/shared/utils/mathCaptcha.ts` y como valor por defecto en `functions/src/guards/captcha.js`. La firma es de 32 bits y el token es reutilizable durante 15 minutos. Conviene definir `MATH_CAPTCHA_SALT` como secreto, sin reabrir el diseño. |
| Secreto de reCAPTCHA en la URL de `siteverify` | Abierto (fuera de alcance) | Google también admite enviarlo en el cuerpo del POST. |
| `_ts` lo controla el cliente | Abierto | Un bot puede falsificarlo. El filtro solo detiene bots simples. |
| PII en logs y `clientIp` guardado | Abierto | Correos y nombres aparecen en logs de error y de validación. La IP se guarda en cada registro y en `rate_limits`; revisar su tratamiento bajo la Ley N° 29733. |
| IP desconocida sin límite | Abierto (decisión a revisar) | Con IP `"unknown"` el rate limit deja pasar la petición. |
| Fallo al actualizar `notifications` | Abierto | El documento queda en `PENDING` sin reintento; solo se registra en el log. |
| Sin reintento automático de correos | Abierto (idea) | Posible trigger `onDocumentCreated`. |

## 🚑 Resolución de Problemas
Si el formulario falla en producción:
1. Abra la consola del navegador y revise el mensaje de error de la respuesta del backend.
2. Revise los logs de Cloud Functions en Firebase Console (`firebase functions:log` también sirve).
3. Verifique que `RESEND_API_KEY` no haya expirado.
4. Si recibe 403 con "Validación de seguridad", revise `RECAPTCHA_SECRET_KEY` y `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`; si recibe 429, se superó el rate limit (8 envíos / 15 min por IP en el formulario; 30 en la consulta de estado). Si recibe 503, Firestore no respondió al rate limit: reintente más tarde y revise el estado del servicio.

### Error de despliegue: «Secret environment variable overlaps non secret environment variable»
Ocurrió el 2026-10-29 al migrar a Node.js 22: `submitReclamo` y `submitContacto` fallaron con HTTP 400 al actualizar. Causa: `functions/.env` (archivo local, ignorado por git) define `RECAPTCHA_SECRET_KEY` como variable de entorno, mientras que `functions/index.js` la declara también como secreto (`secrets: [...]`, Secret Manager). El CLI carga ambos y Cloud Run los rechaza.
- **Qué se hizo:** se verificó que la última versión del secreto en Secret Manager coincide con la del `.env` y se desplegó apartando `functions/.env` solo durante el comando.
- **Solución permanente (pendiente del responsable):** eliminar la línea `RECAPTCHA_SECRET_KEY` de `functions/.env`; el valor ya vive en Secret Manager. Mientras tanto, cada despliegue de esas funciones requiere apartar el archivo.
- Nunca use `firebase deploy --only functions --force`: borra las funciones desplegadas que no estén en el código (por ejemplo `testFunction`). El comando seguro para estas tres funciones está en [functions/README.md](../functions/README.md), sección 9.

---
*Documentación original generada por Gemini CLI - Versión 1.0 (Abril 2026). Actualizada con el estado real del código el 2026-10-29.*
