# docs/gya — Material de presupuestos (G&A)

Material recibido de Claude Desktop e integrado el 2026-11-08. Alimenta la mejora de `/presupuesto` (plan en `docs/21_PLAN_FLUJO_PRESUPUESTO.md`). **La marca, los colores y la tipografía ya no viven aquí: están en `docs/apps/web/DESIGN.md`.**

| Archivo | Uso |
|---|---|
| `conceptos-presupuesto.md` | 6 conceptos de hoja (C1–C6); se parte de C1 |
| `data/company.json` | Datos fijos de referencia; en código se usa `companyData` de `@gya/shared` |
| `data/presupuestos-reales.json` | 4 casos reales anonimizados, base de los fixtures |
| `prompts/` | Prompts originales (el 04 propone un generador interno; aquí no se aplica tal cual) |
| `fotos-referencia/` | Fotos de baja resolución, solo referencia (no se sirven en la web) |

## Decisiones que prevalecen sobre el kit
- Datos vigentes: Av. Los Fresnos 1250 - La Molina, WhatsApp 974 278 303, acueva@gyacompany.com.
- Catálogo ampliado: además de Nova, Serie 25, 35 y 62, se aceptan `PVC abatible` y `Acústica`.
- Estructura, rutas y persistencia siguen `AGENTS.md` (FSD, `/presupuesto`, Firestore `presupuestos_solicitados`).
- Valores `VERIFICAR` no se publican sin confirmación del dueño.
