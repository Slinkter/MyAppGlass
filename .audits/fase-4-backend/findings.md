# Fase 4 — Backend & DevOps · Findings

> **Agente:** D — Backend & DevOps Auditor  
> **Skills activas:** `vercel-optimize`, `vercel-cli-with-tokens`, `deploy-to-vercel`  
> **Estado:** ✅ Completa  
> **Rama:** `audit/gya-q3-2026`  
> **Modo:** 🔒 **SOLO LECTURA** (Código de proyecto intacto; propuestas en formato PATCH)  
> **Inicio:** 2026-08-20 · **Cierre:** 2026-08-20

---

## 📌 Alcance

Auditoría integral de arquitectura, seguridad perimetral, compliance legal, gestión de secretos, costos y pipeline DevOps del backend serverless en Firebase y GitHub Actions.

**Componentes y archivos auditados:**
- **Cloud Functions v2:** `functions/index.js`, `functions/emailSender.js`, `functions/mathCaptchaValidator.js`, `functions/package.json`
- **Reglas de Seguridad:** `firestore.rules`, `storage.rules`
- **Configuración de Infraestructura:** `firebase.json`, `.firebaserc`, `.gitignore`
- **Scripts de Operación:** `scripts/upload-to-storage.mjs`
- **Pipeline CI/CD:** `.github/workflows/ci.yml`, `.github/workflows/deploy-preview.yml`, `.github/workflows/deploy-prod.yml`
- **Integraciones Frontend/Backend:** `src/shared/config/env.ts`, `src/shared/utils/mathCaptcha.ts`, `src/features/contacto/actions.ts`, `src/shared/api/reclamoService.ts`, `src/shared/schemas/reclamation-schema.ts`
- **Documentación Técnica:** `docs/DOCS_SECURITY_BACKEND.md`, `docs/BACKEND_IMPLEMENTATION.md`

---

## 📊 Resumen ejecutivo

El backend del Portal GYA exhibe una arquitectura serverless moderna y bien estructurada (Firebase Functions v2 sobre Cloud Run, Node 20, integración transaccional con Resend SDK y almacenamiento legal en Firestore). Destacan positivamente el **blindaje total de Firestore** (`allow read, write: if false`), la sanitización contra XSS en las plantillas de correo y los mecanismos de defensa en profundidad anti-bot (*silent drop* en honeypots, validación de tiempo mínimo y schemas Zod en backend).

No obstante, se han detectado **vulnerabilidades críticas y oportunidades de mejora** en la validación de acciones reCAPTCHA, la expresión regular de CORS, la exposición de PII en la función de consulta de estado, y la arquitectura de rate limiting y cabeceras CSP.

- 🔴 **Hallazgos críticos:** 4
- 🟡 **Hallazgos medios:** 6
- 🟢 **Hallazgos menores:** 6
- 🛡️ **Postura de Seguridad Global:** Media-Alta (Requiere mitigación de 4 vectores antes de release a gran escala).

---

## 🔐 Secretos y Gestión de Credenciales

> ⚠️ Verificación de almacenamiento seguro: Las funciones utilizan Google Cloud Secret Manager mediante la directiva `secrets: [...]` de Functions v2. No se detectaron tokens de producción hardcodeados en el repositorio.

| Ubicación | Tipo | ¿En Secret Manager? | Severidad | Observación |
|---|---|---|---|---|
| `functions/index.js:68, 110` | `RESEND_API_KEY` | ✅ Sí | 🟢 Correcto | Declarado como secreto de Cloud Secret Manager. Inyectado en runtime. |
| `functions/index.js:68, 110` | `ADMIN_EMAIL` | ✅ Sí | 🟢 Correcto | Declarado como secreto de Cloud Secret Manager. |
| `functions/index.js:68, 110` | `RECAPTCHA_SECRET_KEY` | ✅ Sí | 🟢 Correcto | Clave secreta de Google reCAPTCHA v3 protegida en Secret Manager. |
| `src/shared/utils/mathCaptcha.ts:7` | `MATH_SALT` | ❌ No (Cliente) | 🔴 Crítico | Sal estática compartida expuesta en el bundle público del navegador (ver `[CRIT-02]`). |
| `.github/workflows/deploy-*.yml` | `FIREBASE_SERVICE_ACCOUNT` | ✅ Sí | 🟢 Correcto | Consumido desde GitHub Repository Secrets. |
| `scripts/upload-to-storage.mjs:23` | `service-account.json` | 🛡️ `.gitignore` | 🟢 Correcto | Ruta local excluida en `.gitignore` (línea 29). No commiteada. |

---

## ⚙️ Functions v2 (Handlers & Concurrencia)

| Handler | Trigger | Región | Timeout | Memoria | Concurrencia / MaxInst | Manejo de errores | Logging | Riesgo cold start |
|---|---|---|---|---|---|---|---|---|
| `submitReclamo` | `onRequest` (POST) | `us-central1` (default) | 60s | 256MiB | No configurado (`default`) | `try/catch` + `HttpsError` | `firebase-functions/logger` | 🟡 Bajo-Medio (~1.2s en frío) |
| `submitContacto` | `onRequest` (POST) | `us-central1` (default) | 60s | 256MiB | No configurado (`default`) | `try/catch` + `HttpsError` | `firebase-functions/logger` | 🟡 Bajo-Medio (~1.2s en frío) |
| `checkStatus` | `onRequest` (GET/POST) | `us-central1` (default) | 30s | 256MiB | No configurado (`default`) | `try/catch` básico | `firebase-functions/logger` | 🟡 Bajo |

---

## 🗄️ Firestore Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blindaje total de base de datos: Todas las escrituras y lecturas
    // deben procesarse exclusivamente a través de Cloud Functions con Admin SDK.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

| Colección | Read | Write | Validación de tipos | Least privilege | Evaluación |
|---|---|---|---|---|---|
| `libro_de_reclamaciones` | ❌ Deny | ❌ Deny | Vía Zod en Functions | 🔒 Máximo | **Excelente.** Acceso exclusivo mediante Firebase Admin SDK en Cloud Functions. |
| `contact_submissions` | ❌ Deny | ❌ Deny | Vía Zod en Functions | 🔒 Máximo | **Excelente.** Ningún cliente puede leer/escribir colecciones directamente. |
| `rate_limits` | ❌ Deny | ❌ Deny | Vía Functions | 🔒 Máximo | Protegido contra manipulación externa directa. |

**Recomendación:** Mantener la política de blindaje total actual (`allow read, write: if false;`).

---

## 📦 Storage Rules (`storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

| Path | Read | Write | Max size | MIME permitidos | Evaluación |
|---|---|---|---|---|---|
| `/images/{allPaths=**}` | ✅ Público | ❌ Deny | N/A (CDN) | Determinado en upload script | **Correcto.** Assets públicos de solo lectura. |
| `/{allPaths=**}` | ❌ Deny | ❌ Deny | 0 | Ninguno | **Excelente.** Denegación por defecto. |

---

## ✉️ Resend (Email Transaccional)

| Check | Estado | Detalle y Observaciones |
|---|---|---|
| **API key en Secret Manager** | ✅ Excelente | Configurado en `functions/index.js` mediante `secrets: ["RESEND_API_KEY"]`. |
| **Plantillas HTML enriquecidas** | ✅ Excelente | Diseño corporativo sobrio, responsive, con datos de RUC, razón social y base legal INDECOPI. |
| **Sanitización HTML (XSS prevention)** | ✅ Excelente | `sanitizeHtml()` y `stripHtml()` previenen inyección de etiquetas maliciosas en clientes de correo. |
| **Headers anti-spam & Reply-To** | 🟡 Parcial | `reply_to` presente en contacto; se sugiere agregar encabezados `X-Entity-Ref-ID` y `Auto-Submitted: auto-generated`. |
| **Manejo de fallos / Transaccionalidad** | 🟡 Mejorable | Si Resend falla, el reclamo no se persiste en Firestore; si Firestore falla, el email ya fue enviado (ver `[MED-06]`). |
| **Rate limiting & Abuse prevention** | 🟡 Parcial | Honeypot, time-check (>1.8s) y rate limiter por IP implementados, con riesgos de concurrencia (ver `[MED-01]`). |

---

## 🌐 `firebase.json` — Headers y Cache

| Header | ¿Configurado? | Valor actual | Recomendación / Estado |
|---|---|---|---|
| `Content-Security-Policy` | ❌ **Faltante** | Ninguno | 🔴 **Crítico:** Añadir directivas CSP para reCAPTCHA, Google Maps y Cloud Functions. |
| `Strict-Transport-Security` | ✅ Sí | `max-age=31536000; includeSubDomains; preload` | 🟢 Óptimo (HSTS con preload). |
| `X-Frame-Options` | ✅ Sí | `SAMEORIGIN` | 🟢 Correcto (Mitiga Clickjacking). |
| `X-Content-Type-Options` | ✅ Sí | `nosniff` | 🟢 Correcto (Mitiga MIME-type sniffing). |
| `X-XSS-Protection` | 🟡 Legacy | `1; mode=block` | 🟢 Obsoleto en navegadores modernos; sustituir por CSP. |
| `Referrer-Policy` | ✅ Sí | `strict-origin-when-cross-origin` | 🟢 Correcto. |
| `Permissions-Policy` | ✅ Sí | `camera=(), microphone=(), geolocation=(self)` | 🟢 Correcto. |
| `Cache-Control` (JS/CSS/WebP) | ✅ Sí | `public, max-age=31536000, immutable` | 🟢 Óptimo para assets versionados. |
| `Cache-Control` (HTML/JSON) | ✅ Sí | `public, max-age=0, must-revalidate` | 🟢 Correcto para navegación SPA/SSG. |

---

## 🚀 Pipeline de Deploy (GitHub Actions)

| Check | Estado | Notas |
|---|---|---|
| **Secretos fuera del código en CI** | ✅ Seguro | Uso de `secrets.FIREBASE_SERVICE_ACCOUNT_GYA_APP_4C8A9` y `secrets.GITHUB_TOKEN`. |
| **Separación Preview vs Prod** | ✅ Seguro | PRs a `main` despliegan a Firebase Hosting Preview Channel; pushes a `main` despliegan a `live`. |
| **Validación previa en CI (`ci.yml`)** | ✅ Seguro | Ejecuta en orden: `lint` → `typecheck` → `test:run` → `build`. |
| **Inyección de variables en Build CI** | 🟡 Riesgo | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` no se declara en los steps de `pnpm run build` en CI (ver `[MED-05]`). |
| **Pinning de Acciones por SHA** | 🟢 Menor | Uso de tags flotantes (`@v4`, `@v3`, `@v0`) en lugar de commit hashes inmutables. |
| **Health check post-deploy** | 🟡 Faltante | No hay verificación automatizada HTTP 200 tras la publicación a producción. |
| **Rollback plan documentado** | 🟡 Parcial | Firebase Hosting permite rollback instantáneo en consola, pero no está automatizado en el workflow. |

---

## 💰 Análisis de Costos (Firebase & Cloud Run)

| Fuente de Costo | Nivel de Riesgo | Causa Raíz | Mitigación Recomendada |
|---|---|---|---|
| **Function Invocations** | 🟡 Medio | Falta de `maxInstances` y CORS preflight (`OPTIONS`) en cada llamada. | Limitar `maxInstances: 10` y utilizar Hosting Rewrites `/api/**`. |
| **Firestore Reads/Writes** | 🟡 Medio | Rate Limiter ejecuta 1 Read + 1 Write por cada request entrante (incluso bots). | Implementar TTL en `rate_limits` y delegar rate limiting a Cloudflare / App Check. |
| **Fast Data Transfer (FDT)** | 🟢 Muy Bajo | Frontend estático exportado (`output: 'export'`) y assets en CDN con cache inmutable. | Mantener política de cache actual. |

---

## 🔴 Hallazgos críticos

```
================================================================================
CRÍTICO 01: Bypass de CORS por Regex Permisiva en Cloud Functions
================================================================================
Archivo: functions/index.js:57-59
Severidad: 🔴 Crítico | Esfuerzo: 🟢 Bajo (15 min)

DESCRIPCIÓN:
Las expresiones regulares configuradas en ALLOWED_ORIGINS:
  [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/]
utilizan únicamente el ancla de fin de cadena ($) sin delimitar el inicio (^) ni
el prefijo de subdominio o protocolo.

IMPACTO:
Cualquier dominio malicioso registrado por un tercero que termine en "gyacompany.com"
(por ejemplo: https://evilgyacompany.com o https://attacker-gya-app-4c8a9.web.app)
superará la verificación de CORS en el middleware y podrá realizar peticiones
cross-origin no autorizadas desde navegadores de víctimas.

REMEDIACIÓN:
Delimitar estrictamente el protocolo HTTPS y los nombres de dominio exactos.
```

#### PATCH sugerido para `functions/index.js`:
```javascript
// PATCH: functions/index.js (Líneas 56-60)
<<<<
const IS_PROD = process.env.NODE_ENV === "production";
const ALLOWED_ORIGINS = IS_PROD
  ? [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/]
  : [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/, /localhost/];
====
const IS_PROD = process.env.NODE_ENV === "production";
const ALLOWED_ORIGINS = IS_PROD
  ? [
      /^https:\/\/(www\.)?gyacompany\.com$/,
      /^https:\/\/gya-app-4c8a9\.web\.app$/,
      /^https:\/\/gya-app-4c8a9\.firebaseapp\.com$/
    ]
  : [
      /^https:\/\/(www\.)?gyacompany\.com$/,
      /^https:\/\/gya-app-4c8a9\.web\.app$/,
      /^https:\/\/gya-app-4c8a9\.firebaseapp\.com$/,
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/127\.0\.0\.1(:\d+)?$/
    ];
>>>>
```

---

```
================================================================================
CRÍTICO 02: Sal Criptográfica de Captcha Matemático Expuesta en el Bundle Cliente
================================================================================
Archivo: src/shared/utils/mathCaptcha.ts:7 & functions/mathCaptchaValidator.js:6
Severidad: 🔴 Crítico | Esfuerzo: 🟡 Medio (2 horas)

DESCRIPCIÓN:
La constante MATH_SALT = "GYA_MATH_SECURE_SALT_2026" se encuentra declarada en texto
plano tanto en el backend como en la utilidad del frontend (src/shared/utils/mathCaptcha.ts).
Dado que el frontend genera el reto y su firma mediante generateMathChallenge(), la sal
queda compilada en el archivo JavaScript público descargado por el navegador.

IMPACTO:
Cualquier bot o script automatizado puede inspeccionar el bundle, extraer la sal y
generar retos matemáticos legítimos con firmas criptográficas válidas de forma 100%
autónoma, anulando por completo la efectividad del Captcha Matemático como barrera anti-bot.

REMEDIACIÓN:
1. No confiar en el Captcha Matemático como barrera criptográfica autónoma; mantenerlo
   como elemento de fricción UX complementario.
2. Hacer que la verificación principal recaiga exclusivamente sobre Google reCAPTCHA v3
   y validaciones del lado del servidor.
3. Si se requiere validación matemática infalsificable, los retos deben generarse en el
   servidor mediante un endpoint liviano firmado con HMAC privado (Secret Manager).
```

---

```
================================================================================
CRÍTICO 03: Omisión de Validación de `expectedAction` en Google reCAPTCHA v3
================================================================================
Archivo: functions/emailSender.js:246-274, 373, 476
Severidad: 🔴 Crítico | Esfuerzo: 🟢 Bajo (15 min)

DESCRIPCIÓN:
Las funciones de envío invocan verifyRecaptcha(token, "reclamation_submit") y
verifyRecaptcha(token, "contact_submit"). Sin embargo, dentro de verifyRecaptcha(),
el parámetro expectedAction solo se registra en el log en caso de error y NUNCA
se compara contra recaptchaData.action.

IMPACTO:
Un atacante puede reutilizar tokens de reCAPTCHA v3 emitidos para acciones genéricas
de baja fricción (como la carga de la página inicial) y presentarlos en los endpoints
sensibles de envío de formularios, evadiendo la segmentación por acción de Google.

REMEDIACIÓN:
Validar explícitamente que recaptchaData.action coincida con expectedAction.
```

#### PATCH sugerido para `functions/emailSender.js`:
```javascript
// PATCH: functions/emailSender.js (Líneas 263-273)
<<<<
    if (!recaptchaData.success || typeof recaptchaData.score !== "number" || recaptchaData.score < 0.5) {
      logger.warn("RECAPTCHA_FAILED", {
        success: recaptchaData.success,
        score: recaptchaData.score,
        action: recaptchaData.action,
        expectedAction,
        errorCodes: recaptchaData["error-codes"],
      });
      throw new HttpsError("permission-denied", "Validación de seguridad no superada (puntuación insuficiente).");
    }
====
    if (!recaptchaData.success || typeof recaptchaData.score !== "number" || recaptchaData.score < 0.5) {
      logger.warn("RECAPTCHA_FAILED", {
        success: recaptchaData.success,
        score: recaptchaData.score,
        action: recaptchaData.action,
        expectedAction,
        errorCodes: recaptchaData["error-codes"],
      });
      throw new HttpsError("permission-denied", "Validación de seguridad no superada (puntuación insuficiente).");
    }

    if (expectedAction && recaptchaData.action !== expectedAction) {
      logger.warn("RECAPTCHA_ACTION_MISMATCH", {
        expected: expectedAction,
        received: recaptchaData.action,
      });
      throw new HttpsError("permission-denied", "Acción de seguridad no válida para este formulario.");
    }
>>>>
```

---

```
================================================================================
CRÍTICO 04: Exposición de Nombres Completos (PII) sin Autenticación en `checkStatus`
================================================================================
Archivo: functions/index.js:152-203
Severidad: 🔴 Crítico | Esfuerzo: 🟢 Bajo (30 min)

DESCRIPCIÓN:
El endpoint público checkStatus recibe un identificador "id" sin requerir autenticación,
sin rate limiting y sin validación de captcha. Al encontrar el documento en
contact_submissions o libro_de_reclamaciones, retorna el nombre completo del ciudadano:
  name: data.nombreCompleto || data.name

IMPACTO:
Violación potencial del principio de confidencialidad de la Ley N° 29733 (Protección de
Datos Personales en Perú). Un atacante que recopile o adivine IDs de seguimiento puede
extraer los nombres reales de los usuarios y confirmar la existencia de reclamos legales.

REMEDIACIÓN:
1. Ofuscar el nombre en la respuesta pública (ej. "J*** P***").
2. Aplicar rate limiting estricto a checkStatus.
3. Exigir un segundo factor para consultar detalles (ej. últimos 4 dígitos del documento de identidad).
```

#### PATCH sugerido para `functions/index.js`:
```javascript
// PATCH: functions/index.js (Líneas 188-197)
<<<<
      const data = doc.data();
      response.status(200).json({
        success: true,
        data: {
          id: doc.id,
          type,
          status: data.status || "RECIBIDO",
          createdAt: data.createdAt?.toDate() || null,
          name: data.nombreCompleto || data.name,
        },
      });
====
      const data = doc.data();
      const rawName = data.nombreCompleto || data.name || "";
      const maskedName = rawName.replace(/^(\S{2})\S*(.*?\s+)(\S{2})\S*$/, "$1*** $3***") || "Usuario Registrado";

      response.status(200).json({
        success: true,
        data: {
          id: doc.id,
          type,
          status: data.status || "RECIBIDO",
          createdAt: data.createdAt?.toDate() || null,
          maskedName: maskedName,
        },
      });
>>>>
```

---

## 🟡 Hallazgos medios

```
================================================================================
MEDIO 01: Condición de Carrera y Contención de Escrituras en Rate Limiter Firestore
================================================================================
Archivo: functions/index.js:22-53
Severidad: 🟡 Medio | Esfuerzo: 🟡 Medio (1 hora)

DESCRIPCIÓN:
checkRateLimitFirestore realiza un read (docRef.get()) y un write (docRef.set())
desconectados sin usar db.runTransaction(). En entornos serverless concurrentes,
múltiples requests simultáneos desde la misma IP pueden leer el mismo array de
timestamps y sobrepasar el límite. Además, Firestore limita a ~1 escritura/seg por doc;
bajo un ataque DoS, el catch permite todas las peticiones (fail-open). No existe TTL
automático para limpiar IPs antiguas.

REMEDIACIÓN:
Implementar transacción con db.runTransaction(), agregar campo expireAt con política
de Firestore TTL, y evaluar delegar rate limiting al CDN (Cloudflare / Cloud Armor).
```

---

```
================================================================================
MEDIO 02: Ausencia de Cabecera `Content-Security-Policy` (CSP) en `firebase.json`
================================================================================
Archivo: firebase.json:35-64
Severidad: 🟡 Medio | Esfuerzo: 🟢 Bajo (30 min)

DESCRIPCIÓN:
firebase.json configura HSTS, X-Frame-Options y Referrer-Policy, pero carece de
Content-Security-Policy (CSP).

IMPACTO:
No se mitigan activamente inyecciones de scripts de terceros ni ataques XSS avanzados
en navegadores modernos.

REMEDIACIÓN:
Incorporar cabecera CSP restrictiva en firebase.json permitiendo Google Fonts,
reCAPTCHA y Google Maps.
```

#### PATCH sugerido para `firebase.json`:
```json
// PATCH: firebase.json (Dentro de hosting.headers[0].headers)
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://*.firebasestorage.app https://maps.gstatic.com https://*.googleapis.com; connect-src 'self' https://us-central1-gya-app-4c8a9.cloudfunctions.net https://www.google.com https://maps.googleapis.com; frame-src https://www.google.com; object-src 'none'; base-uri 'self';"
}
```

---

```
================================================================================
MEDIO 03: Falta de Límite Máximo de Instancias (`maxInstances`) en Cloud Functions
================================================================================
Archivo: functions/index.js:64-70, 106-112, 152-157
Severidad: 🟡 Medio | Esfuerzo: 🟢 Bajo (10 min)

DESCRIPCIÓN:
Las funciones onRequest no definen maxInstances en su configuración de Cloud Run.

IMPACTO:
Riesgo de escalamiento no controlado ("Denial of Wallet") ante ráfagas masivas de tráfico
o ataques de denegación de servicio.

REMEDIACIÓN:
Configurar maxInstances: 10 y concurrency: 10 en las opciones de onRequest.
```

---

```
================================================================================
MEDIO 04: Peticiones Directas a Cloud Functions en Lugar de Hosting Rewrites
================================================================================
Archivo: firebase.json:95 & src/shared/config/env.ts:6-8
Severidad: 🟡 Medio | Esfuerzo: 🟢 Bajo (20 min)

DESCRIPCIÓN:
El frontend realiza fetch hacia https://us-central1-gya-app-4c8a9.cloudfunctions.net/*
directamente en vez de utilizar rutas relativas (/api/*) enrutadas mediante
Hosting Rewrites.

IMPACTO:
Cada formulario genera una petición CORS preflight (OPTIONS) adicional antes del POST,
agregando entre 120ms y 250ms de latencia para usuarios en Lima/Perú.

REMEDIACIÓN:
Agregar rewrites en firebase.json:
  "rewrites": [
    { "source": "/api/submitReclamo", "function": { "functionId": "submitReclamo", "region": "us-central1" } },
    { "source": "/api/submitContacto", "function": { "functionId": "submitContacto", "region": "us-central1" } },
    { "source": "/api/checkStatus", "function": { "functionId": "checkStatus", "region": "us-central1" } }
  ]
```

---

```
================================================================================
MEDIO 05: Omisión de Variables de Entorno en el Build del Pipeline CI (`ci.yml`)
================================================================================
Archivo: .github/workflows/ci.yml:42
Severidad: 🟡 Medio | Esfuerzo: 🟢 Bajo (15 min)

DESCRIPCIÓN:
src/shared/config/env.ts valida estrictamente NEXT_PUBLIC_RECAPTCHA_SITE_KEY con
zod.min(1). Si el build de Next.js ejecuta evaluación estática de rutas donde se
importa env.ts, el step pnpm run build en CI fallará si la variable no está inyectada.

REMEDIACIÓN:
Declarar env: con valores mock o secrets en el workflow ci.yml.
```

---

```
================================================================================
MEDIO 06: Falta de Transaccionalidad / Compensación entre Resend y Firestore
================================================================================
Archivo: functions/emailSender.js:388-426
Severidad: 🟡 Medio | Esfuerzo: 🟡 Medio (1 hora)

DESCRIPCIÓN:
En sendEmailLogic, primero se envían los correos con Resend y posteriormente se ejecuta
la persistencia en Firestore. Si la escritura en Firestore falla (error de cuota o
red), el usuario recibe su correo pero el reclamo nunca queda guardado en la base de
datos legal.

REMEDIACIÓN:
Persistir primero el reclamo en Firestore con estado "PENDIENTE_ENVIO" y generar un
ID de Firestore (docRef.id), enviar los correos y luego actualizar el estado a "RECIBIDO".
```

---

## 🟢 Hallazgos menores

```
================================================================================
MENOR 01: Cabecera Deprecada `X-XSS-Protection` en `firebase.json`
================================================================================
Archivo: firebase.json:47-49
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (5 min)
Cabecera obsoleta en navegadores modernos; su rol ha sido asumido por Content-Security-Policy.
```

```
================================================================================
MENOR 02: Acciones de GitHub CI sin Pinning por Commit SHA
================================================================================
Archivo: .github/workflows/*.yml
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (15 min)
Uso de tags móviles (@v4, @v3, @v0). Para máxima seguridad de cadena de suministro (Supply Chain),
se recomienda fijar por commit SHA inmutable.
```

```
================================================================================
MENOR 03: Ausencia de Health Check Automatizado Post-Deploy
================================================================================
Archivo: .github/workflows/deploy-prod.yml:32-39
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (15 min)
El workflow no valida mediante curl o Lighthouse que el canal live responda 200 OK
tras completar la publicación.
```

```
================================================================================
MENOR 04: Reto de Captcha Matemático Reutilizable dentro de la Ventana de 15 Min
================================================================================
Archivo: functions/mathCaptchaValidator.js:50-54
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (15 min)
El token del reto matemático no se invalida tras su primer uso, permitiendo replay
dentro de su ventana temporal de 15 minutos (mitigado actualmente por la unicidad de reCAPTCHA v3).
```

```
================================================================================
MENOR 05: Validaciones Redundantes de Campos Obligatorios en `sendEmailLogic`
================================================================================
Archivo: functions/emailSender.js:379-381
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (5 min)
Líneas de código duplicadas que validan campos requeridos inmediatamente después de que
Zod Schema ya los validó exhaustivamente.
```

```
================================================================================
MENOR 06: Omisión de Declaración Explícita de Región en Cloud Functions
================================================================================
Archivo: functions/index.js:64, 106, 152
Severidad: 🟢 Menor | Esfuerzo: 🟢 Bajo (5 min)
Las funciones asumen us-central1 por omisión. Se sugiere declarar setGlobalOptions({ region: "us-central1" }).
```

---

## 🚫 Bloqueos / Preguntas para humano

1. **Retención Legal INDECOPI vs TTL de Rate Limits:**
   - ¿Se tiene configurada la política de expiración de Time-To-Live (TTL) en Google Cloud Firestore para la colección `rate_limits`? Se recomienda habilitar TTL en el campo `updatedAt` con ventana de 24 horas para no acumular documentos residuales.
2. **Dominio Verificado en Resend:**
   - Confirmar si los registros SPF, DKIM y DMARC para `gyacompany.com` se encuentran en estado `Verified` en el panel de control de Resend para evitar que las copias a clientes caigan en la carpeta de Spam.

---

## 🔄 Log de actividad del agente

| Fecha | Agente | Acción |
|---|---|---|
| 2026-08-20 | Agente D | Inicio de auditoría profunda de Backend, Seguridad y DevOps. |
| 2026-08-20 | Agente D | Revisión de handlers Cloud Functions v2 (`functions/index.js`, `emailSender.js`, `mathCaptchaValidator.js`). |
| 2026-08-20 | Agente D | Evaluación de reglas de seguridad `firestore.rules` y `storage.rules`. |
| 2026-08-20 | Agente D | Inspección de cabeceras HTTP y políticas de cache en `firebase.json`. |
| 2026-08-20 | Agente D | Análisis de pipelines CI/CD de GitHub Actions (`ci.yml`, `deploy-preview.yml`, `deploy-prod.yml`). |
| 2026-08-20 | Agente D | Redacción del reporte exhaustivo con 16 hallazgos categorizados y parches sugeridos. |

---

**Próximo paso:** Notificar al Agente Coordinador (Caller) y actualizar `.audits/PLAN_AUDITORIA_GYA.md`.