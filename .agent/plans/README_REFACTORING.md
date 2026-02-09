# 🚀 PLAN ACTIVO: Refactorización Feature-Based Architecture

**IMPORTANTE:** Este es el plan ACTUAL a ejecutar. Los otros archivos (`implementation_plan.md`, `task.md`) son de un plan ANTERIOR ya completado.

---

## ✅ CONFIRMACIÓN PARA GEMINI CLI

**Pregunta 1: ¿Testing?**
❌ **NO** - Este plan NO incluye testing. Está explícitamente excluido.

**Pregunta 2: ¿TypeScript?**
❌ **NO** - Este plan NO incluye migración a TypeScript. Mantener JavaScript.

**Pregunta 3: ¿Fases anteriores completadas?**
✅ **SÍ** - Las fases del plan anterior (linting, JSDoc, etc.) ya están completadas. Ignorar `task.md`.

---

## 📖 INSTRUCCIONES PARA GEMINI CLI

### Paso 1: Lee SOLO estos archivos

1. **`GEMINI_INSTRUCTIONS.md`** ← **ESTE ES TU PLAN PRINCIPAL**
2. `technical_diagnosis.md` (contexto, solo lectura)
3. `refactoring_plan.md` (resumen, solo lectura)

### Paso 2: Ignora estos archivos (son del plan anterior)

- ❌ `implementation_plan.md` (plan antiguo de optimización)
- ❌ `task.md` (tareas del plan antiguo)
- ❌ `project_analysis.md` (análisis antiguo)

### Paso 3: Ejecuta el plan

```bash
# Lee GEMINI_INSTRUCTIONS.md y sigue las 4 FASES:
# FASE 1: Preparación (2-3 días)
# FASE 2: Migración por Features (1.5 semanas)
# FASE 3: Shared Components (4 días)
# FASE 4: Layout y Limpieza (3 días)
```

---

## 🎯 OBJETIVO DEL PLAN

**Migrar de arquitectura type-based a feature-based:**

```
ANTES:                          DESPUÉS:
src/                           src/
├── components/                ├── features/
│   ├── projects/              │   ├── projects/
│   ├── services/              │   │   ├── components/
│   └── home/                  │   │   ├── hooks/
├── hooks/                     │   │   ├── services/
├── services/                  │   │   └── data/
└── data/                      │   ├── services/
                               │   ├── home/
                               │   └── reclamation-book/
                               └── shared/
                                   ├── components/
                                   ├── hooks/
                                   └── config/
```

---

## 🔴 ACLARACIONES CRÍTICAS

### NO hay contradicción

El plan anterior (testing/optimización) está **completado**.
El plan actual (refactorización) es **nuevo y diferente**.

### NO incluye:
- ❌ Testing
- ❌ TypeScript
- ❌ Migración a Tailwind
- ❌ Optimizaciones de rendimiento

### SÍ incluye:
- ✅ Reorganización de carpetas (feature-based)
- ✅ Refactorización de componentes grandes
- ✅ Eliminación de código duplicado
- ✅ Mejora de estructura del proyecto

---

## 📝 COMANDO PARA EJECUTAR

```bash
gemini "Lee .agent/plans/README_REFACTORING.md primero. Luego lee .agent/plans/GEMINI_INSTRUCTIONS.md y ejecuta SOLO ese plan. Ignora implementation_plan.md y task.md que son de un plan anterior ya completado. Crea commits atómicos después de cada paso."
```

---

## ❓ SI AÚN HAY DUDAS

**Pregunta:** ¿Debo hacer testing?
**Respuesta:** NO. Este plan NO incluye testing.

**Pregunta:** ¿Debo migrar a TypeScript?
**Respuesta:** NO. Mantener JavaScript.

**Pregunta:** ¿Las fases 1-5 del task.md están completas?
**Respuesta:** SÍ, pero son de OTRO plan. Ignora task.md completamente.

**Pregunta:** ¿Qué plan ejecuto?
**Respuesta:** El de `GEMINI_INSTRUCTIONS.md` - Refactorización Feature-Based Architecture.

---

**Creado:** 2026-02-08  
**Para:** Gemini CLI  
**Objetivo:** Eliminar confusión entre planes antiguos y nuevos
