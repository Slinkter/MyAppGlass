# Inventario FSD — Portal GYA

> **Propósito:** Mapear la estructura Feature-Sliced Design del proyecto para detectar violaciones de capa.  
> **A llenar por:** Agente de Fase 0 (baseline).

---

## Conteo por capa

| Capa | Ruta | Nº archivos | Nº líneas aprox | Notas |
|---|---|---|---|---|
| app | `src/app/**` | 17 | 772 | Rutas, layouts, metadatos Next.js 16 |
| screens | `src/screens/**` | 18 | 1,059 | Ensamblaje visual de páginas |
| widgets | `src/widgets/**` | 12 | 927 | Navbar, Footer, FloatingActions |
| features | `src/features/**` | 93 | 7,784 | blog, projects, services, contacto, home, reclamation-book |
| shared | `src/shared/**` | 70 | 4,459 | Aura UI, utils, config, api, schemas, providers |
| backend | `functions/**` | 7 | 840 | Cloud Functions v2 (emailSender, mathCaptchaValidator, index) |

---

## Violaciones de capa detectadas

> Regla FSD: una capa solo puede importar de capas **inferiores**  
> (`app → screens → widgets → features → shared`)

| Archivo | Importa de | Capa origen → destino | ¿Válida? |
|---|---|---|---|
| Ninguno detectado | — | — | ✅ 100% Conforme (0 violaciones) |

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