# AGENTS.md - MyAppGlass (Glass & Aluminum Company S.A.C.)

> Guía de contexto obligatoria para Agentes de IA. Contiene reglas de negocio, flujos de trabajo y comandos que un agente probablemente omitiría sin esta referencia.

---

## 1. Comandos Esenciales y Flujo de Trabajo

**Package Manager:** Usar exclusivamente `pnpm`.

| Comando | Acción |
|---|---|
| `pnpm run dev` | Inicia servidor Next.js (Port: 3000) |
| `pnpm run typecheck` | `tsc --noEmit -p tsconfig.build.json` **(SIEMPRE ejecutar para validar tipos)** |
| `pnpm run lint` | ESLint en `src/` |
| `pnpm run build` | Compila para **exportación estática** (`next build` a `out/`) |
| `pnpm run deploy:hosting` | Ejecuta `build` + despliega `out/` a Firebase Hosting |
| `pnpm run deploy:functions` | Despliega Firebase Functions v2 |
| `pnpm run test` | Vitest (watch mode) |
| `pnpm run test:run` | Vitest (single run) |

**⚠️ Token-saving rule:** NO ejecutar `pnpm run test:run` a menos que el usuario lo pida. Siempre validar con `pnpm run typecheck` y `pnpm run build`.

**Required commit order:**
```bash
pnpm run typecheck && pnpm run build
git commit -m "feat(modulo): descripción clara"
pnpm run deploy:hosting
```

---

## 2. Arquitectura (Feature-Sliced Design)

```
src/
├── app/          # Next.js App Router - wrappers ligeros (page.tsx, layout.tsx)
├── features/     # Dominios de negocio: services/, home/, projects/, blog/
├── widgets/      # Componentes globales: AuraNavbar, AuraFooter, FloatingActions
├── shared/       # Utils transversales: company-data.ts, logger.ts
functions/        # Firebase Functions v2 (Node.js 20 - CONGELADO)
```

**Archivos clave:**
- `features/services/components/ServicePageLayout.tsx` — Layout maestro página de servicio
- `features/services/components/VentanaConfigurador3DCard.tsx` — Simulador 3D Three.js
- `features/services/data/ventanas-catalogo.json` — Catálogo oficial de sistemas de ventanas

---

## 3. Reglas de Negocio Inmutables

**Identidad:**
- Razón Social: `"GLASS & ALUMINUM COMPANY S.A.C."` → usar `companyData` de `@/shared/config/company-data`

**Ortografía (siempre en español):**
- `"antirruido"` (doble 'r', NO 'antiruido')
- `"vidrio y aluminio"` (en singular)

**Catálogo Oficial de Ventanas (`ventanas-catalogo.json`):**
- Solo existen 4 sistemas: `Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`
- NO inventar series inexistentes (Serie 31, Serie 20, etc.)
- Tipos de ventana: `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`
- Tipos de vidrio (3): `Crudo`, `Laminado`, `Templado` (sin sufijo de grosor)
- Colores de vidrio: `Incoloro`, `Bronce`, `Gris`
- Colores de aluminio: `Negro`, `Mate`, `Blanco`, `Madera`, `Champagne`
- Adicionales: `Arenado`, `Diseño según cliente`

**Simulador 3D (`VentanaConfigurador3DCard`):**
- NO es cotizador individual de precios — es simulador visual de características técnicas
- Proporción: **65%** Visor 3D (izq) / **35%** Panel de configuración (der)
- Altura estándar desktop: **`460px`**

---

## 4. Convenciones de Código

- **Static Export:** El proyecto usa `output: 'export'`. Rutas dinámicas requieren `generateStaticParams`.
- **Chakra UI v3:** Usar tokens nativos (`space.1` a `space.16`, `borderRadius="xl"`, `fontSize="xs"`).
- **Lucide icons en flexbox:** Usar `style={{ flexShrink: 0 }}` (la prop directa `flexShrink` da error de tipos TS en Lucide).
- **Transiciones:** Máximo 2 propiedades CSS (`transition="all 0.2s ease"`, `transform="translateZ(0)"`).
- **Logger:** Usar `@/shared/utils/logger.ts`. NO usar `console.log` en producción.

---

## 5. Backend (Firebase Functions)

**⚠️ CÓDIGO CONGELADO:** NO modificar `functions/`, `firestore.rules` ni `firebase.json` a menos que sea explícitamente solicitado.
