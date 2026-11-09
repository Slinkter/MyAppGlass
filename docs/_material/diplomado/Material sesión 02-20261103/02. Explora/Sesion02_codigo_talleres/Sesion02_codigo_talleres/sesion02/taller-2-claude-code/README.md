# Taller 2 · Integración de Claude Code al entorno de desarrollo (40 min)

## Objetivo
Dejar Claude Code **instalado, autenticado e integrado** en VS Code sobre el proyecto TurnoYa,
con un `CLAUDE.md` inicial revisado por ti y permisos de proyecto. Luego completar la primera
tarea **AI-Augmented** con control humano en cada punto de decisión:
implementar el catálogo de servicios (HU-01) a partir del wireframe del Taller 1.

## Qué necesitas
- Windows 10 1809+ u 11, VS Code 1.94+, Git for Windows (recomendado).
- Cuenta de Claude **Pro, Max, Team, Enterprise** o **Console**. El plan gratuito no incluye Claude Code.
- La captura `01-catalogo.png` del Taller 1 (o usa la que ya está en `inicio/turnoya/docs/wireframes/`).
- Extensión **Live Server** de VS Code (de la Sesión 1).

## Archivos
| Ruta | Para qué |
|---|---|
| `guia-instalacion-windows.md` | Instalación detallada y solución de problemas |
| `verificar-entorno.ps1` | Script que revisa requisitos (solo lectura) |
| `prompts.md` | Todos los prompts del taller, listos para copiar |
| `inicio/turnoya/` | Proyecto de partida: resultado del Taller 2 de la Sesión 1 + historias de usuario + wireframes |
| `final/turnoya/` | Resultado esperado: `CLAUDE.md`, `.claude/settings.json`, `catalogo.html`, bitácora HITL |

---

## Parte A · Instalar e integrar (15 min)

### T2-1 · Verificar requisitos (2 min)
En PowerShell, dentro de `taller-2-claude-code`:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\verificar-entorno.ps1
```
Corrige cualquier `[FALTA]` antes de seguir (ver `guia-instalacion-windows.md`).

### T2-2 · Instalar Claude Code (4 min)
```powershell
irm https://claude.ai/install.ps1 | iex
```
Abre una **terminal nueva** y verifica con `claude --version` y `claude doctor`.

### T2-3 · Autenticar (3 min)
```powershell
cd taller-2-claude-code\inicio\turnoya
claude
```
Inicia sesión en el navegador. En la sesión escribe `/status` para confirmar cuenta y modelo.
Sal con `/exit`.

### T2-4 · Extensión de VS Code (4 min)
1. `Ctrl + Shift + X` → **Claude Code** (Anthropic) → Install.
2. **File → Open Folder** → `inicio/turnoya`.
3. Abre `reserva.html` y haz clic en el ícono **Spark** (arriba a la derecha).
4. Selecciona 3 líneas del archivo y presiona `Alt + K`: se inserta la referencia `@reserva.html#…`.

### T2-5 · Red de seguridad con Git (2 min)
En la terminal integrada (`Ctrl + ñ` o `` Ctrl + ` ``):
```bash
git init
git add .
git commit -m "Base Sesión 1: tokens y componentes"
```
Desde aquí, todo lo que haga Claude es visible con `git diff` y reversible.

---

## Parte B · Primer contacto Human-in-the-loop (10 min)

### T2-6 · Explorar en modo Plan (3 min)
Cambia el modo de permisos a **Plan** (en el panel: indicador de modo bajo la caja de texto;
en la terminal: `Shift + Tab` hasta ver `plan mode on`). Usa el **Prompt P-1** de `prompts.md`.
En modo Plan Claude lee y analiza, pero **no puede editar**.

### T2-7 · `/init` y revisión humana del CLAUDE.md (5 min)
1. Escribe `/init`. Claude analiza el proyecto y propone un `CLAUDE.md`.
2. **Léelo completo antes de aceptar.** ¿Inventó comandos de build o tests que no existen? Bórralos.
3. Agrega al final el bloque **"Reglas del proyecto"** de `prompts.md` (las reglas de la Sesión 1).
4. Compara con `final/turnoya/CLAUDE.md`.
> En la Sesión 3 estructuramos el `CLAUDE.md` por capas de contexto. Hoy basta con un archivo correcto y corto.

### T2-8 · Permisos del proyecto (2 min)
Copia `final/turnoya/.claude/settings.json` a `inicio/turnoya/.claude/settings.json`.
Define qué se permite sin preguntar (leer, `git status`, `git diff`), qué se pregunta siempre
(`git commit`) y qué se prohíbe (`git push`, leer `.env`).

---

## Parte C · Primera tarea AI-Augmented: catálogo HU-01 (15 min)

### T2-9 · Planificar (4 min)
Sigue en modo **Plan**. Usa el **Prompt P-2** (adjunta el wireframe y la historia con `@`).
Revisa el plan con la checklist de `prompts.md`. Si algo falla, **pide cambios al plan** (Prompt P-3)
antes de aprobar. Aprobar un plan malo cuesta más que corregirlo ahora.

### T2-10 · Ejecutar en modo Manual y revisar diffs (6 min)
Aprueba el plan y elige el modo **Manual**: Claude pedirá permiso para cada edición y verás
el diff lado a lado. Por cada cambio: **Aceptar**, **Rechazar** o escribir qué hacer en su lugar.

### T2-11 · Verificar como humano (3 min)
1. Abre `catalogo.html` con Live Server.
2. Recorre con **Tab**: ¿ves el foco? ¿los filtros cambian con Enter/Espacio?
3. DevTools → 360 px: ¿hay scroll horizontal?
4. `Ctrl + F` → `#` en el `<style>` de `catalogo.html`: **0 colores hex**.
5. Lighthouse → Accessibility ≥ 95.

### T2-12 · Rewind y commit (2 min)
- ¿Algo salió mal? Pasa el cursor sobre tu mensaje en el panel → **Rewind** (en la terminal: `Esc` dos veces o `/rewind`).
- Si todo está bien: `git add . && git commit -m "HU-01 catálogo (AI-Augmented, revisado)"`.
- Registra tus decisiones en `docs/bitacora-hitl.md` (plantilla en `prompts.md`).

## Cómo sabes que terminaste
- [ ] `claude --version` y `claude doctor` sin errores
- [ ] La extensión abre el panel y `/status` muestra tu cuenta
- [ ] `CLAUDE.md` revisado por ti, menos de 80 líneas, con las reglas de la Sesión 1
- [ ] `.claude/settings.json` con reglas allow / ask / deny
- [ ] `catalogo.html` cumple los 8 criterios de HU-01 y tiene 0 colores hex
- [ ] La bitácora tiene al menos 4 decisiones (aprobado, corregido o rechazado)
- [ ] 2 commits en el historial: la base y el catálogo
