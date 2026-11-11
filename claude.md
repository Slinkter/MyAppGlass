# Glass & Aluminum Company S.A.C. – Web

Vidriería de La Molina (Lima). Compra vidrio, aluminio y accesorios a proveedores, ensambla en su taller e instala. La web capta hogares; las constructoras llegan por recomendación y la web respalda esa recomendación.

## Dónde mirar

- `AGENTS.md`: comandos, arquitectura y reglas de negocio.
- `docs/marca/MANUAL-DE-MARCA.md`: manual de marca, origen del diseño.
- `apps/web/PRODUCT.md` y `apps/web/DESIGN.md`: usuarios, restricciones y sistema de diseño (se valida en `/design-system`).
- `docs/gya/catalogo/` y `docs/gya/data/`: catálogo, proveedores y presupuestos reales.
- `docs/PENDIENTES.md` (trabajo abierto) y `docs/05_CHANGELOG.md` (lo terminado).
- `docs/claude/`: especificaciones, planes y notas de trabajo con Claude.

## Cómo trabajar

- Para tareas grandes, propón un plan corto antes de tocar código. Specs, planes y tareas en `.md` están bien cuando el dueño los pide o ayudan; usa `docs/claude/`.
- Diseño: manual de marca → componentes en `/design-system` → páginas. Antes de cambiar el diseño de páginas públicas, merge a `main` o deploy, confirma con el dueño.
- Un componente nuevo debe respetar el design system y ser mobile-first.
- Los textos deben sonar naturales y propios del rubro (vidrio y aluminio), no robóticos.

## Reglas de negocio y código

- Si falta un dato (precio, plazo, garantía, medida, serie), deja un marcador visible y pregunta; no lo inventes.
- Prioridad de datos: proveedores > datos locales > suposiciones.
- Datos de la empresa solo desde `companyData` (`@/shared/config/company-data`).
- El cliente no ve a los proveedores ni sus fotos o planos; de ellos solo se usan textos y datos técnicos.
- La empresa no fabrica perfiles ni vidrio: ensambla e instala.
- En componentes usa los tokens del tema (`apps/web/src/shared/providers/theme/index.ts`) en vez de hex, `rgba`, degradados, emojis o `100vh`.
