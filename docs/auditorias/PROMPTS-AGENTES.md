# Prompts para verificar el estado del proyecto

Agentes en `.claude/agents/`. Modelo barato (haiku) para lo mecánico, sonnet para lo analítico. Lanzar en paralelo los que no comparten carpeta ni navegador.

| Agente | Modelo | Cuándo | Prompt base |
|---|---|---|---|
| `qa-gates` | haiku | Antes de cada commit | "Corre build, tsc y eslint en serie y reporta exit codes y errores." |
| `auditor-naming-dry` | haiku | Antes y después de un lote de renombrado | "Audita nombres, duplicados y archivos >300 líneas en `apps/web/src`." |
| `auditor-md3` | sonnet | Antes de tocar tokens | "Compara el tema con Material Design 3 respetando el manual de marca; lee `INFORME-UI-UX-MD3.md`." |
| `ui-navegador-movil` | sonnet | Tras tocar navegación, scroll o transiciones | "Prueba 360×800 en `http://localhost:4173` y reporta lo medido." |
| `espaciado-360` | sonnet | Tras cambios de espaciado | Existente: audita márgenes, padding y áreas táctiles. |
| `rendimiento-movil` | sonnet | Tras añadir movimiento | Existente: mide lentitud y trabas en gama baja. |

## Servir el export para las pruebas de navegador
1. Construir: `next build --webpack` en `apps/web` (con `NODE_PATH`, ver `docs/opencode/PLAN-FSD-Y-AGENTES.md` §7).
2. Servir `apps/web/out` con un servidor estático local en el puerto 4173. Resolver la raíz con `path.resolve`: en Windows, comparar rutas con `/` contra rutas con `\` devuelve 403.
3. Comprobar 200 en `/`, `/contacto` y `/servicios/balcones` antes de lanzar agentes.

## Reglas para quien lanza agentes
- Un navegador por agente: Playwright para móvil, Chrome para escritorio. No compartirlos.
- El redimensionado de Chrome/Edge puede no dar el ancho pedido: exigir que el agente reporte `innerWidth`.
- Un bug que no se reproduce se informa como "no confirmado", no como corregido.
- Ningún agente edita código sin que el lote esté aprobado; los de auditoría son de solo lectura.
