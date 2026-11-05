# Taller 1 · Wireframes iniciales con Figma AI para TurnoYa (35 min)

## Objetivo
Generar con **Figma Make** los wireframes de baja fidelidad del flujo principal de TurnoYa
y **revisarlos como humano en el circuito (Human-in-the-loop)**: la IA propone, tú apruebas,
corriges o rechazas con criterios de la Sesión 1 (heurísticas, WCAG 2.2, leyes de UX).

Al terminar tendrás 5 pantallas, una bitácora de decisiones y los prompts que funcionaron.
Esas pantallas son la entrada del **Taller 2**, donde Claude Code implementa el catálogo.

## Qué necesitas
- Cuenta gratuita de Figma (plan **Starter**). Incluye Figma Make con **500 créditos de IA al mes**
  y un **tope de 150 créditos por día**. Cada prompt consume créditos: planifica 5 a 7 prompts.
- Navegador Chrome o Edge.
- Esta carpeta abierta en VS Code (para completar los `.md`).

> El **agente de Figma Design** y **First Draft** no están en el plan Starter (requieren Professional o superior).
> Por eso el taller usa **Figma Make**, que sí está en el plan gratuito.

## Archivos
| Archivo | Para qué |
|---|---|
| `inicio/01-brief-pantallas.md` | Defines QUÉ vas a pedir antes de escribir un prompt |
| `inicio/02-prompts.md` | Plantilla del prompt maestro (6 bloques) y de los prompts de iteración |
| `inicio/03-revision-hitl.md` | Checklist de revisión y bitácora: aprobar / corregir / rechazar |
| `final/` | Los mismos archivos completos + `wireframe-referencia.html` (resultado esperado) |

---

## Paso 1 · Brief de pantallas (5 min) → `inicio/01-brief-pantallas.md`
Completa la tabla del flujo: pantalla, historia de usuario, objetivo del usuario, contenido real y
estados que debe mostrar. **No abras Figma todavía.** Un prompt sin brief produce una pantalla "promedio".

## Paso 2 · Crear el archivo de Figma Make (2 min)
1. Entra a figma.com e inicia sesión.
2. En el panel principal, crea un archivo nuevo de **Figma Make** (en Drafts).
3. Nómbralo `TurnoYa · Wireframes S2 · <tu nombre>`.

## Paso 3 · Prompt maestro: el flujo móvil (6 min) → `inicio/02-prompts.md`
Arma el prompt con los **6 bloques** (Contexto, Usuario, Pantallas, Contenido, Fidelidad, Estados).
Pégalo en Figma Make y genera. Mientras genera, **no escribas otro prompt**: espera y observa.

Revisa el resultado en la vista previa: navega con clic las 4 pantallas.

## Paso 4 · Revisión HITL #1 (5 min) → `inicio/03-revision-hitl.md`
Pasa el checklist (12 puntos). Por cada problema anota en la bitácora:
- **Qué viste** (evidencia concreta)
- **Regla** que incumple (H1…H10, WCAG, ley de UX)
- **Decisión**: ✅ Aprobar · ✏️ Corregir · ❌ Rechazar

## Paso 5 · Iterar: una corrección por prompt (8 min)
Usa los prompts de iteración (I-1 a I-4). Regla de oro: **un cambio por prompt** y menciona la pantalla.
Para cambios de texto o de un elemento puntual usa la edición directa (Point and edit) en lugar de un prompt.

| Prompt | Qué corrige |
|---|---|
| I-1 | Estados faltantes (carga, vacío, sin disponibilidad, error) |
| I-2 | Horarios ocupados que dependen solo del color |
| I-3 | CTA fijo en la zona del pulgar y áreas táctiles de 44 px |
| I-4 | Pantalla tablet de la agenda del dueño |

## Paso 6 · Revisión HITL #2 y cierre (5 min)
1. Vuelve a pasar el checklist. Meta: **12/12** o justificar cada excepción en la bitácora.
2. Publica el prototipo (**Publish**) y copia el enlace en la bitácora.
3. Exporta una captura del catálogo como `01-catalogo.png`: la usarás en el Taller 2.
4. Compara con `final/wireframe-referencia.html` (ábrelo con Live Server).

## Plan B (sin créditos o sin acceso a Figma Make)
1. Abre `final/wireframe-referencia.html` con Live Server: es el resultado esperado.
2. Haz igual los pasos 1 y 4: completa el brief y aplica el checklist **sobre la referencia**.
   Busca al menos 2 mejoras posibles y regístralas en la bitácora (la referencia no es perfecta).
3. Para el Taller 2 usa `taller-2-claude-code/inicio/turnoya/docs/wireframes/01-catalogo.png`.

## Cómo sabes que terminaste
- [ ] El brief tiene las 5 pantallas con contenido real y estados
- [ ] Tienes 4 pantallas móviles navegables + 1 tablet en Figma Make
- [ ] Ninguna pantalla usa "Lorem ipsum" ni colores de marca (solo grises)
- [ ] La bitácora tiene al menos 6 decisiones con evidencia y regla
- [ ] Guardaste `01-catalogo.png` y el enlace publicado

## Errores frecuentes
| Síntoma | Causa | Arreglo |
|---|---|---|
| La IA genera una landing con hero y testimonios | El prompt no dijo "app móvil" ni el ancho | Bloque Fidelidad: "app móvil 360 px, sin landing" |
| Sale a todo color con gradientes | No pediste baja fidelidad | "escala de grises, sin imágenes, sin íconos decorativos" |
| Cada iteración rompe otra pantalla | Pediste varios cambios a la vez | Un cambio por prompt, nombrando la pantalla |
| "Límite alcanzado" | Tope diario de 150 créditos | Edición directa, o continúa con el Plan B |
