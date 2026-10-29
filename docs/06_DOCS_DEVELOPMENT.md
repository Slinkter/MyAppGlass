# 📘 Guía de Desarrollo - MyAppGlass

Este documento es la referencia técnica para el mantenimiento y expansión del ecosistema GYA Glass & Aluminum.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 16 (App Router) + Chakra UI v3.
- **Estilos:** Chakra UI v3 (spacing scale 4px base) + Aura Components.
- **Backend:** Firebase Functions v2 (Node.js 22).
- **Base de Datos:** Firestore (NoSQL).
- **Email:** Resend API.

## 🚀 Configuración del Entorno Local

### 1. Variables de Entorno
Cree los siguientes archivos (ignorados por Git). La plantilla sin secretos es `.env.example` y la validación (Zod, con valores por defecto) vive en `src/shared/config/env.ts`.

**Raíz (`.env.local`)** — copie `.env.example` y complete los valores:
```bash
# Firebase (cliente)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Endpoints de Cloud Functions (por defecto apuntan a producción; para emuladores use http://127.0.0.1:5001/<proyecto>/us-central1/<función>)
NEXT_PUBLIC_API_URL=        # submitReclamo
NEXT_PUBLIC_CONTACT_API_URL= # submitContacto
NEXT_PUBLIC_STATUS_API_URL=  # checkStatus

# Servicios externos (opcionales)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

**Carpeta Functions (`functions/.env`)** — solo nombres; los valores nunca se versionan:
```bash
RESEND_API_KEY=
ADMIN_EMAIL=
RECAPTCHA_SECRET_KEY=
```
En producción estos tres valores se gestionan como secretos (Secret Manager); ver [07_BACKEND_IMPLEMENTATION.md](./07_BACKEND_IMPLEMENTATION.md).

### 2. Comandos de Inicio
- **Frontend:** `pnpm run dev` (ejecuta `next dev --webpack -H 0.0.0.0 -p 3000`).
- **Backend (Emuladores):** `cd functions && pnpm run serve` (ejecuta `firebase emulators:start --only functions`; requiere Java JDK).

### 3. Scripts de la raíz (`package.json`)
`dev`, `build` (`next build --webpack`, exportación estática a `out/`), `start`, `lint` (ESLint en `src/`), `typecheck` (`tsc --noEmit -p tsconfig.build.json`), `test` (Vitest, modo watch), `test:run`, `clean`, `deploy:hosting` (build + Firebase Hosting) y `deploy:functions`.

## 💎 Chakra UI v3 Spacing Scale (4px base)
Use **exclusivamente** los tokens nativos de spacing de Chakra UI. No definir tokens custom.

| Token | Valor | Uso recomendado |
|-------|-------|-----------------|
| `1` / `space.1` | 4px | Micro spacing, icon gaps |
| `2` / `space.2` | 8px | Espaciado base xs |
| `3` / `space.3` | 12px | Espaciado sm |
| `4` / `space.4` | 16px | **Estándar** (md) |
| `5` / `space.5` | 20px | Espaciado lg |
| `6` / `space.6` | 24px | Secciones, cards |
| `8` / `space.8` | 32px | Layout xl |
| `10` / `space.10` | 40px | Hero sections |
| `12` / `space.12` | 48px | Major sections |
| `16` / `space.16` | 64px | Page-level spacing |

**Ejemplos:**
```tsx
<VStack gap={6} p={8} />           // 24px gap, 32px padding
<Box m={4} px={6} py={4} />        // margin 16px, px 24px, py 16px
<HStack gap="4" />                  // string tokens también funcionan
```

## ⚡ Rendimiento 120Hz
Para asegurar fluidez en móviles modernos:
1. Use `translateZ(0)` y `willChange` en elementos animados.
2. Evite el **Layout Shift**: sincronice siempre el esqueleto (Skeleton) con el componente real.
3. Use el `logger` integrado (`src/shared/utils/logger.ts`, importable como `@/shared/utils/logger`) para capturar errores de renderizado.

## 🔍 SEO & Blog
- Los artículos se gestionan en `src/features/blog/data/blog-posts.ts`.
- Cada post genera automáticamente JSON-LD y Metadatos para Google.
- **Importante:** La generación de `sitemap.xml` y `robots.txt` es dinámica en `src/app/sitemap.ts` y `src/app/robots.ts`.

---
*Documentación generada por Gemini CLI - Versión 1.0 (Abril 2026)*
