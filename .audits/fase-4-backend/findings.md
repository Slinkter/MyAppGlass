# Fase 4 — Backend & DevOps · Findings

> **Agente:** D — Backend & DevOps Auditor  
> **Skills activas:** `vercel-optimize`, `vercel-cli-with-tokens`, `deploy-to-vercel`  
> **Estado:** ⬜ Pendiente  
> **Rama:** `audit/gya-q3-2026`  
> **Modo:** 🔒 **SOLO LECTURA** — nunca modificar `functions/**`, `firestore.rules`, `storage.rules`  
> **Inicio:** — · **Cierre:** —

---

## 📌 Alcance

Auditoría de seguridad y confiabilidad del backend Firebase + pipeline de deploy.

**Archivos a revisar (lectura):**
- `functions/**` (Functions v2, Node 20+)
- `firestore.rules`
- `storage.rules`
- `firebase.json`, `.firebaserc`
- Integración Resend (emails transaccionales)

---

## 📊 Resumen ejecutivo

- 🔴 Hallazgos críticos: —
- 🟡 Hallazgos medios: —
- 🟢 Hallazgos menores: —

---

## 🔐 Secretos

> ⚠️ Si encuentras un secreto hardcodeado: indícalo como 🔴 **sin mostrar su valor**.

| Ubicación | Tipo | ¿En Secret Manager? | Severidad |
|---|---|---|---|
| — | — | — | — |

---

## ⚙️ Functions v2

| Handler | Trigger | Timeout | Manejo de errores | Logging | Riesgo cold start |
|---|---|---|---|---|---|
| — | onCall/onRequest | — | try/catch + retries | pino | — |

---

## 🗄️ Firestore Rules (`firestore.rules`)

| Colección | read | write | Validación de tipos | Least privilege |
|---|---|---|---|---|
| — | — | — | — | — |

**Reglas sugeridas (PATCH):**
```js
// reglas más restrictivas si aplica
```

---

## 📦 Storage Rules (`storage.rules`)

| Path | read | write | Max size | MIME permitidos |
|---|---|---|---|---|
| — | — | — | — | — |

---

## ✉️ Resend (email transaccional)

| Check | Estado | Notas |
|---|---|---|
| API key en Secret Manager | — | — |
| Plantillas HTML enriquecidas | — | — |
| Headers anti-spam (SPF/DKIM hints) | — | — |
| Manejo de rebotes/errores 4xx/5xx | — | — |
| Rate limiting / abuse prevention | — | — |

---

## 🌐 `firebase.json` — headers y cache

| Header | ¿Configurado? | Valor |
|---|---|---|
| Content-Security-Policy | — | — |
| Strict-Transport-Security | — | — |
| X-Frame-Options | — | — |
| X-Content-Type-Options | — | — |
| Cache-Control (assets estáticos) | — | — |

---

## 🚀 Pipeline de deploy

| Check | Estado | Notas |
|---|---|---|
| Secretos fuera del código en CI | — | — |
| Rollback plan documentado | — | — |
| Health check post-deploy | — | — |
| Separación staging/prod | — | — |

---

## 💰 Costos (Firebase)

| Fuente | Riesgo detectado | Mitigación sugerida |
|---|---|---|
| Function Invocations | — | — |
| Firestore reads/writes | — | — |
| Egress / FDT | — | — |

---

## 🔴 Hallazgos críticos

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| — | — | — | — |

## 🟡 Hallazgos medios

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| — | — | — | — |

## 🟢 Hallazgos menores

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| — | — | — | — |

---

## 🚫 Bloqueos / Preguntas para humano

- —

---

## 🔄 Log de actividad del agente

| Fecha | Acción |
|---|---|
| — | Inicio de fase |

---

**Próximo paso:** al cerrar, actualizar `.audits/PLAN_AUDITORIA_GYA.md` y commitear con formato `security(audit): phase-4 backend & devops findings` (ver `.audits/AGENTS.md`).