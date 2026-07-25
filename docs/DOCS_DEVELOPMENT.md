# 📘 Guía de Desarrollo - MyAppGlass

Este documento es la referencia técnica para el mantenimiento y expansión del ecosistema GYA Glass & Aluminum.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 16 (App Router) + Chakra UI v3.
- **Estilos:** Aura Design System (basado en proporción áurea `phi`).
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

## 💎 Sistema de Diseño Aura (Phi Tokens)
Para mantener la armonía visual, use **siempre** los tokens `phi_` en lugar de valores fijos:
- `phi_xs` (8px)
- `phi_sm` (13px)
- `phi_md` (21px) - Estándar
- `phi_lg` (34px)
- `phi_xl` (55px)

Ejemplo: `<VStack gap="phi_md" p="phi_lg" />`

## ⚡ Rendimiento 120Hz
Para asegurar fluidez en móviles modernos:
1. Use `translateZ(0)` y `willChange` en elementos animados.
2. Evite el **Layout Shift**: sincronice siempre el esqueleto (Skeleton) con el componente real.
3. Use el `logger` integrado (`@shared/utils/logger`) para capturar errores de renderizado.

## 🔍 SEO & Blog
- Los artículos se gestionan en `src/data/blog-posts.ts`.
- Cada post genera automáticamente JSON-LD y Metadatos para Google.
- **Importante:** Después de agregar un post, actualice el `public/sitemap.xml`.

---
*Documentación generada por Gemini CLI - Versión 1.0 (Abril 2026)*
