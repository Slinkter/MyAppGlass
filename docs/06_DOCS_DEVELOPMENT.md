# 📘 Guía de Desarrollo - MyAppGlass

Este documento es la referencia técnica para el mantenimiento y expansión del ecosistema GYA Glass & Aluminum.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 16 (App Router) + Chakra UI v3.
- **Estilos:** Chakra UI v3 (spacing scale 4px base) + Aura Components.
- **Backend:** Firebase Functions v2 (Node.js 20+).
- **Base de Datos:** Firestore (NoSQL).
- **Email:** Resend API.

## 🚀 Configuración del Entorno Local

### 1. Variables de Entorno
Cree los siguientes archivos (ignorados por Git):

**Raíz (`.env.local`):**
```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/gya-app-4c8a9/us-central1/submitReclamo
```

**Carpeta Functions (`functions/.env`):**
```bash
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=admin@example.com
```

### 2. Comandos de Inicio
- **Frontend:** `pnpm run dev`
- **Backend (Emuladores):** `cd functions && pnpm run serve` (Requiere Java JDK).

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
3. Use el `logger` integrado (`@shared/utils/logger`) para capturar errores de renderizado.

## 🔍 SEO & Blog
- Los artículos se gestionan en `src/features/blog/data/blog-posts.ts`.
- Cada post genera automáticamente JSON-LD y Metadatos para Google.
- **Importante:** La generación de `sitemap.xml` y `robots.txt` es dinámica en `src/app/sitemap.ts` y `src/app/robots.ts`.

---
*Documentación generada por Gemini CLI - Versión 1.0 (Abril 2026)*
