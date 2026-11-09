# Glass & Aluminum Company S.A.C. – Web

Vidriería de La Molina (Lima) que compra vidrio, aluminio y accesorios a proveedores, ensambla en su taller e instala. Audiencia principal: constructoras e inmobiliarias; secundaria: hogares.

## Lee antes de trabajar (en este orden)

1. `AGENTS.md`: comandos, arquitectura, reglas de negocio y código congelado.
2. `apps/web/PRODUCT.md`: usuarios, posicionamiento, restricciones y datos decididos por el dueño.
3. `apps/web/DESIGN.md` (con `apps/web/.impeccable/design.json`): **única fuente de verdad del diseño** (color, tipografía, componentes, estados). No existe otro documento de diseño.
4. `docs/gya/catalogo/` (catálogo y proveedores) y `docs/gya/data/`: datos de producto y presupuestos reales.
5. `apps/web/src/features/blog/data/blog-posts.ts`: artículos del blog (11).

## Reglas que no se negocian

- **Precedencia de datos:** lo que dicen los proveedores (`docs/gya/catalogo/proveedores.md`) pesa más que los datos locales; los datos locales pesan más que las suposiciones.
- **No inventar:** si falta un dato (precio, plazo, garantía, capacidad, series), se deja un marcador visible y se pregunta al dueño.
- Datos de la empresa solo desde `companyData` (`@/shared/config/company-data`); nunca escritos a mano en componentes.
- El cliente nunca ve a los proveedores. Del material de proveedores se usan solo textos y datos técnicos, sin sus fotos ni planos.
- Sin hex, `rgba`, `colorPalette`, degradados, emojis ni `100vh` en componentes: se usan los tokens del tema (`apps/web/src/shared/providers/theme/index.ts`, que edita una sola persona por tarea).
- La empresa no fabrica perfiles ni vidrio: ensambla en taller e instala.
- Plan de migración y estado: `docs/25_PLAN_MIGRACION_DISENO.md`. Trabajo abierto: `docs/PENDIENTES.md`.
