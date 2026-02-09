# 🤖 AI Agent Directory

Este directorio contiene planes y documentación para ser ejecutados por agentes AI (como Gemini CLI).

## 📂 Estructura

```
.agent/
├── README.md                    # Este archivo
└── plans/                       # Planes de implementación
    ├── implementation_plan.md   # Plan detallado de optimización
    ├── task.md                  # Lista de tareas (100 tareas)
    └── project_analysis.md      # Análisis completo del proyecto
```

## 📋 Planes Disponibles

### 1. Plan de Optimización y Mejora de Código

**Archivo:** `plans/implementation_plan.md`  
**Tareas:** `plans/task.md`  
**Análisis:** `plans/project_analysis.md`

**Objetivo:** Optimizar el código, mejorar la documentación JSDoc y aplicar las mejores prácticas de React según estándares de Vercel 2026.

**Fases:**
1. 📦 **Fase 1:** Limpieza de Código y Corrección de Linting (30-45 min)
2. 📚 **Fase 2:** Mejora de Documentación JSDoc (2-3 horas)
3. ⚡ **Fase 3:** Optimizaciones de Rendimiento (3-4 horas)
4. 🧪 **Fase 4:** Implementación de Testing (4-6 horas)
5. ♿ **Fase 5:** Mejoras de Accesibilidad (2-3 horas)
6. 📊 **Fase 6:** Monitoreo y Análisis (1-2 horas)

**Tiempo Total Estimado:** 13-19 horas

### 2. Plan de Refactorización Feature-Based Architecture

**Archivo:** `plans/refactoring_plan.md`  
**Instrucciones:** `plans/GEMINI_INSTRUCTIONS.md`  
**Diagnóstico:** `plans/technical_diagnosis.md`

**Objetivo:** Migrar proyecto de arquitectura type-based a feature-based sin testing ni TypeScript.

**Fases:**
1. 📦 **FASE 1:** Preparación (2-3 días) - Estructura y configuración
2. 🔄 **FASE 2:** Migración por Features (1.5 semanas) - Projects, Services, Home, ReclamationBook
3. 🎨 **FASE 3:** Shared Components (4 días) - Refactorizar FadingImage, Hooks
4. 🧹 **FASE 4:** Layout y Limpieza (3 días) - Reorganizar y actualizar imports

**Tiempo Total Estimado:** 2-3 semanas

## 🚀 Cómo Usar con Gemini CLI

### Opción 1: Ejecutar Plan Completo

```bash
# Desde la raíz del proyecto
gemini "Lee el archivo .agent/plans/implementation_plan.md y .agent/plans/task.md, luego ejecuta todas las fases del plan de optimización en orden. Marca las tareas como completadas en task.md a medida que avanzas."
```

### Opción 2: Ejecutar por Fases

```bash
# Fase 1: Limpieza de Código
gemini "Lee .agent/plans/implementation_plan.md y ejecuta solo la Fase 1: Limpieza de Código y Corrección de Linting. Actualiza task.md con el progreso."

# Fase 2: JSDoc
gemini "Lee .agent/plans/implementation_plan.md y ejecuta solo la Fase 2: Mejora de Documentación JSDoc. Actualiza task.md con el progreso."

# Y así sucesivamente...
```

### Opción 3: Ejecutar Tareas Específicas

```bash
# Corregir solo los warnings de linting
gemini "Lee .agent/plans/implementation_plan.md sección 1.1 y corrige todas las advertencias de linting listadas."

# Mejorar JSDoc de hooks
gemini "Lee .agent/plans/implementation_plan.md sección 2.2 y mejora la documentación JSDoc de todos los hooks personalizados."
```

## 📊 Seguimiento de Progreso

El archivo `plans/task.md` contiene una lista de verificación de todas las tareas. El agente AI debe:

1. Marcar tareas como `[/]` cuando estén en progreso
2. Marcar tareas como `[x]` cuando estén completadas
3. Actualizar el contador de progreso al final del archivo

## ⚠️ Notas Importantes

### Antes de Ejecutar

1. **Crear una rama nueva:**
   ```bash
   git checkout -b optimize/ai-improvements
   ```

2. **Asegurar que el proyecto compile:**
   ```bash
   pnpm run build
   ```

3. **Verificar que no hay cambios sin commitear:**
   ```bash
   git status
   ```

### Durante la Ejecución

- El agente debe hacer commits atómicos después de cada tarea importante
- Ejecutar `pnpm run lint` después de cada fase
- Ejecutar tests si están disponibles

### Después de Ejecutar

1. **Verificar que todo funciona:**
   ```bash
   pnpm run lint
   pnpm run build
   pnpm run test:run  # Si los tests están implementados
   ```

2. **Crear Pull Request:**
   ```bash
   git push origin optimize/ai-improvements
   ```

## 🔗 Referencias

- [Vercel Best Practices 2026](https://vercel.com/docs/concepts/best-practices)
- [JSDoc TypeScript Support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📝 Historial de Ejecuciones

| Fecha | Agente | Fase Ejecutada | Estado | Notas |
|-------|--------|----------------|--------|-------|
| 2026-02-08 | Gemini CLI | Fase 1 | Completada | Linting y limpieza de código |

---

**Última actualización:** 2026-02-08  
**Creado por:** Antigravity AI (Claude)
