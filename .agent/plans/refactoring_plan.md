# Plan de Refactorización MyAppGlass
## Implementación Práctica (Sin Testing ni TypeScript)

**Fecha:** 8 de Febrero, 2026  
**Duración Estimada:** 2-3 semanas  
**Objetivo:** Migrar a Feature-Based Architecture y refactorizar componentes grandes

---

## 🎯 RESUMEN EJECUTIVO

Este plan implementa la refactorización del proyecto MyAppGlass **sin crear tests** y **sin migración a TypeScript**, enfocándose en:

1. ✅ Feature-Based Architecture
2. ✅ Refactorización de componentes grandes (>200 líneas)
3. ✅ Eliminación de código duplicado
4. ✅ Mejora de organización y mantenibilidad

**Ver:** `GEMINI_INSTRUCTIONS.md` para instrucciones paso a paso para Gemini CLI

---

## 📋 FASES DEL PLAN

### FASE 1: Preparación (2-3 días)
- Crear estructura de carpetas feature-based
- Documentar design tokens
- Configurar alias en Vite

### FASE 2: Migración Feature por Feature (1.5 semanas)
- **2.1 Projects** (5 días) - Refactorizar ProjectCard (217 líneas)
- **2.2 Services** (3 días) - Refactorizar ServiceCard
- **2.3 Home** (3 días) - Crear hook useAsyncData (eliminar duplicación)
- **2.4 ReclamationBook** (4 días) - **CRÍTICO**: Dividir 368 líneas en 5 componentes

### FASE 3: Shared Components (4 días)
- Refactorizar FadingImage (235→3 componentes)
- Organizar hooks compartidos
- Sistema de Cards estandarizado

### FASE 4: Layout y Limpieza (3 días)
- Reorganizar layout
- Actualizar todos los imports
- Resolver TODOs
- Actualizar README

---

## 📊 ESTRUCTURA TARGET

```
src/
├── features/              # Features por dominio
│   ├── projects/
│   ├── services/
│   ├── home/
│   └── reclamation-book/
├── shared/               # Código compartido
│   ├── components/
│   ├── hooks/
│   └── config/
├── layout/               # Layout components
└── pages/                # Route pages
```

---

## 🚀 PARA GEMINI CLI

Ver detalles completos en: **`GEMINI_INSTRUCTIONS.md`**

```bash
gemini "Lee .agent/plans/GEMINI_INSTRUCTIONS.md y ejecuta la refactorización completa"
```

---

## ✅ BENEFICIOS ESPERADOS

1. **Modularidad:** Código organizado por dominio/feature
2. **Mantenibilidad:** Componentes < 150 líneas
3. **DRY:** Eliminación de código duplicado
4. **Escalabilidad:** Fácil agregar nuevas features
5. **Discoverability:** Todo de "projects" en una carpeta

---

**Para más detalles:**
- `technical_diagnosis.md` - Análisis completo del proyecto
- `GEMINI_INSTRUCTIONS.md` - Instrucciones paso a paso para ejecución
