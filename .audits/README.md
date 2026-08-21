# `.audits/` — Auditoría del Portal GYA

> **Carpeta de artefactos para la auditoría del Portal GYA.**  
> Aquí viven el plan maestro, las definiciones de agentes AI y los hallazgos de cada fase.

---

## 🚦 Para otros agentes AI

Si eres un agente AI que acaba de ser invocado para participar en esta auditoría:

1. **Lee primero este README y `.audits/PLAN_AUDITORIA_GYA.md`** — contienen el contexto global, fases, y tu rol si aplica.
2. **Lee `.audits/AGENTS.md`** — define los 5 agentes (A–E) con system prompts y plantillas de commit.
3. **Lee los archivos del proyecto:** `README.md`, `AI_HANDOFF.md`, `ARCHITECTURE.md` (raíz del proyecto).
4. **Verifica tus skills:** `ls .agents/skills/` — comprueba que las skills asignadas a tu agente existen.
5. **Trabaja en tu fase:** respeta el alcance definido en el plan. No invadas otras fases.
6. **Actualiza tu checklist** en `PLAN_AUDITORIA_GYA.md` conforme avanzas (mover `[ ]` → `[x]`).
7. **Cierra con commit:** 1 commit por fase terminada, formato Conventional Commits (ver `AGENTS.md`).

---

## 📂 Estructura

```
.audits/
├── README.md                       ← este archivo
├── PLAN_AUDITORIA_GYA.md           ← plan maestro + checklist vivo
├── AGENTS.md                       ← definición de los 5 agentes AI
├── INFORME_FINAL.md                ← generado en Fase 5
│
├── fase-0-baseline/                ← línea base (lint/type/build/lighthouse)
│   ├── README.md
│   ├── fsd-inventory.md
│   ├── metrics/
│   │   ├── lint.txt
│   │   ├── typecheck.txt
│   │   ├── test.txt
│   │   ├── build.txt
│   │   └── lighthouse/
│   └── screenshots/
│
├── fase-1-ui-ux/                   ← Agente A
│   ├── findings.md
│   └── capturas/
│
├── fase-2-performance/             ← Agente B
│   ├── findings.md
│   └── metrics/
│
├── fase-3-calidad/                 ← Agente C
│   ├── findings.md
│   └── test-inventory.md
│
├── fase-4-backend/                 ← Agente D
│   └── findings.md
│
└── fase-5-documentacion/           ← Agente E (consolidación)
    ├── INFORME_FINAL.md (copia)
    └── pr-description.md
```

---

## 📜 Reglas globales (resumen rápido)

| Regla | Detalle |
|---|---|
| Modo | **Solo lectura.** Cambios solo en formato `PATCH:` en bloques copiables. |
| `package.json` | **No tocar** sin aprobación humana. |
| Secretos | Si los ves, indícalo como 🔴 sin mostrar el valor. |
| Severidad | 🔴 crítico · 🟡 medio · 🟢 menor (obligatoria). |
| Referencias | `file_path:line_number` en cada hallazgo. |
| FSD | Respetar capas (`app` / `screens` / `widgets` / `features` / `shared`). |
| Diseño | Mantener escala Fibonacci y proporción áurea declaradas en `README.md`. |
| Commits | 1 commit por fase, formato Conventional Commits. Ver `AGENTS.md`. |

---

## 🗺️ Mapa rápido de fases

```
Fase 0 → Baseline          [secuencial]  → .audits/fase-0-baseline/
Fase 1 → UI/UX (Agente A)  [paralela   ]  → .audits/fase-1-ui-ux/
Fase 2 → Perf  (Agente B)  [paralela   ]  → .audits/fase-2-performance/
Fase 3 → QA    (Agente C)  [paralela   ]  → .audits/fase-3-calidad/
Fase 4 → Back  (Agente D)  [paralela   ]  → .audits/fase-4-backend/
Fase 5 → Docs  (Agente E)  [secuencial]  → .audits/INFORME_FINAL.md
```

---

## 🔄 Cómo se actualiza el plan maestro

Cada agente, al cerrar su fase, edita `.audits/PLAN_AUDITORIA_GYA.md`:

1. Marca el **estado global** de su fila: `⬜` → `🟡` → `✅`.
2. Marca las **tareas completadas** de su fase: `[ ]` → `[x]`.
3. Añade una **entrada al log de actividad** con fecha y resumen corto.
4. Cierra con **commit** siguiendo el formato definido en `AGENTS.md`.

---

## 🆘 Si encuentras algo bloqueante

Si un agente se topa con algo que requiere decisión humana:

1. Documenta el bloqueo en la sección **"Bloqueos / Preguntas para humano"** dentro de su `findings.md`.
2. Marca la fase con 🔴 en el estado global.
3. **NO commitees hasta tener respuesta** — o commitea el findings parcial indicando el bloqueo.

---

## 📌 Versión

- **v1.0** — 2026-08-20 — Plan inicial materializado (Claude Sonnet, sesión de planificación).