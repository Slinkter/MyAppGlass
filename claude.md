# Glass & Aluminum Company S.A.C. – Web

Vidriería de La Molina (Lima) que compra vidrio, aluminio y accesorios a proveedores, ensambla en su taller e instala. La web capta hogares; las constructoras llegan por recomendación y trabajos pasados, y la web respalda esa recomendación.

## Lee antes de trabajar (en este orden)

1. `AGENTS.md`: comandos, arquitectura, reglas de negocio y código congelado.
2. `docs/marca/MANUAL-DE-MARCA.md`: **manual de marca**. Es el origen de todo el diseño.
3. `apps/web/PRODUCT.md`: usuarios, restricciones y datos decididos por el dueño.
4. `apps/web/DESIGN.md` (con `apps/web/.impeccable/design.json`): sistema de diseño (tokens y componentes), ya alineado con el manual de marca v1.0 y validado en `/design-system`.
5. `docs/gya/catalogo/` (catálogo y proveedores) y `docs/gya/data/`: datos de producto y presupuestos reales.
6. `docs/PENDIENTES.md`: única lista de trabajo abierto.

## Orden de trabajo de diseño (decisión del dueño)

1. **Manual de marca**, iterado con el dueño.
2. **Sistema de diseño y componentes, solo en `/design-system`.**
3. **Páginas**, por lotes, y solo después de que el dueño apruebe cada lote.

No se aplica diseño nuevo a las páginas del sitio, no se hace merge a `main` ni deploy sin la aprobación explícita del dueño para ese lote.

## Reglas que no se negocian

- **Precedencia de datos:** lo que dicen los proveedores (`docs/gya/catalogo/proveedores.md`) pesa más que los datos locales; los datos locales pesan más que las suposiciones.
- **No inventar:** si falta un dato (precio, plazo, garantía, capacidad, series), se deja un marcador visible y se pregunta al dueño.
- **Pocos documentos:** no se crean planes nuevos como archivos `.md`. El trabajo abierto se anota en `docs/PENDIENTES.md` y lo terminado en `docs/05_CHANGELOG.md`.
- Datos de la empresa solo desde `companyData` (`@/shared/config/company-data`); nunca escritos a mano en componentes.
- El cliente nunca ve a los proveedores. Del material de proveedores se usan solo textos y datos técnicos, sin sus fotos ni planos.
- Sin hex, `rgba`, `colorPalette`, degradados, emojis ni `100vh` en componentes: se usan los tokens del tema (`apps/web/src/shared/providers/theme/index.ts`, que edita una sola persona por tarea).
- La empresa no fabrica perfiles ni vidrio: ensambla en taller e instala.
