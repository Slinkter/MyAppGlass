# Inventario FSD — Portal GYA

> **Propósito:** Mapear la estructura Feature-Sliced Design del proyecto para detectar violaciones de capa.  
> **A llenar por:** Agente de Fase 0 (baseline).

---

## Conteo por capa

| Capa | Ruta | Nº archivos | Nº líneas aprox | Notas |
|---|---|---|---|---|
| app | `src/app/**` | — | — | Rutas, layouts, metadatos |
| screens | `src/screens/**` | — | — | Ensamblaje de páginas |
| widgets | `src/widgets/**` | — | — | Navbar, Footer |
| features | `src/features/**` | — | — | blog, projects, services |
| shared | `src/shared/**` | — | — | Aura UI, utils, config, api |
| backend | `functions/**` | — | — | Functions v2 |

---

## Violaciones de capa detectadas

> Regla FSD: una capa solo puede importar de capas **inferiores**  
> (`app → screens → widgets → features → shared`)

| Archivo | Importa de | Capa origen → destino | ¿Válida? |
|---|---|---|---|
| — | — | — | — |

---

## Comando sugerido para detectar imports cruzados

```bash
# Ejemplo: features importando de widgets/app (violación)
rg "from ['\"].*?(widgets|screens|app)" src/features --type ts
rg "from ['\"].*?(widgets|app)" src/shared --type ts
```

---

## Notas adicionales

- —