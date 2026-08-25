# AGENTS.md - MyAppGlass (Glass & Aluminum Company S.A.C.)

> **Propósito:** Guía de contexto rápido y de bajo consumo de tokens para Agentes de IA y LLMs locales (Gemma 3, Gemma 4, Qwen 2.5, DeepSeek, Claude, GPT). Lee este archivo primero para entender la arquitectura completa sin explorar recursivamente el repositorio.

---

## ⚡ 1. Comandos Esenciales y Reglas de Tokens

| Comando | Acción |
|---|---|
| `pnpm run dev` | Inicia servidor de desarrollo Next.js (puerto 3000) |
| `pnpm run typecheck` | `tsc --noEmit -p tsconfig.build.json` (**Usar siempre para validar tipos sin gastar tokens**) |
| `pnpm run lint` | ESLint en `src/` |
| `pnpm run build` | Compilación de producción (`next build` export estático a `out/`) |
| `pnpm run deploy:hosting` | Build y despliegue a Firebase Hosting |
| `pnpm run deploy:functions` | Despliegue de Firebase Functions v2 |

> [!IMPORTANT]
> **Ahorro de Tokens:** NO ejecutes `pnpm run test:run` a menos que el usuario lo pida explícitamente. Valida los cambios siempre con `pnpm run typecheck` y `pnpm run build`.

---

## 🗺️ 2. Mapa Rápido del Repositorio (Feature-Sliced Design)

```
MyAppGlass/
├── AGENTS.md                                # Este archivo (Fuente de verdad)
├── src/
│   ├── app/                                 # Rutas Next.js 16 App Router (Solo wrappers ligeros)
│   │   ├── layout.tsx                       # RootLayout (Providers, AuraNavbar, AuraFooter, FloatingActions)
│   │   ├── page.tsx                         # Portada principal (Home)
│   │   ├── servicios/
│   │   │   ├── page.tsx                     # Listado general de servicios
│   │   │   └── [serviceSlug]/page.tsx       # Detalle de servicio dinámico (/servicios/ventana, etc.)
│   │   ├── blog/                            # Artículos de blog con SSG
│   │   ├── proyectos/                       # Catálogo de proyectos y galería
│   │   └── libro-de-reclamacion/            # Libro de reclamaciones con Firebase
│   │
│   ├── features/                            # Dominios de negocio independientes
│   │   ├── services/                        # Módulo de Servicios & Configuradores
│   │   │   ├── components/
│   │   │   │   ├── ServicePageLayout.tsx    # Layout maestro de página de servicio (Galería + Ficha + 3D)
│   │   │   │   ├── UnifiedTechnicalCard.tsx # Ficha técnica unificada con tabs de especificaciones
│   │   │   │   └── VentanaConfigurador3DCard.tsx # Simulador 3D interactivo Three.js de Ventanas
│   │   │   ├── components/configurador3d/   # Constantes y mallas 3D del configurador
│   │   │   └── data/
│   │   │       ├── ventanas-catalogo.json   # 4 Sistemas oficiales, perfiles y vidrios
│   │   │       └── gallery/                 # Imágenes estáticas de servicios (ventana-data.ts, etc.)
│   │   ├── home/                            # Secciones de la landing principal
│   │   ├── projects/                        # Datos y componentes de proyectos
│   │   └── blog/                            # Datos y vistas de artículos
│   │
│   ├── widgets/                             # Bloques estructurales globales
│   │   ├── Navbar/AuraNavbar.tsx            # Header flotante (oculto en /servicios y /admin)
│   │   ├── Footer/AuraFooter.tsx            # Footer corporativo
│   │   └── FloatingActions/                 # Botones flotantes (WhatsApp, teléfono)
│   │
│   └── shared/                              # Utilidades transversales y UI base
│       ├── config/company-data.ts           # Datos fiscales y contacto: RUC, teléfono, razón social
│       └── utils/logger.ts                  # Logger centralizado (NO usar console.log en prod)
│
└── functions/                               # Backend Firebase Functions v2 (Node.js 20 - CONGELADO)
```

---

## 🏢 3. Reglas de Negocio Inmutables

1. **Razón Social:** `"GLASS & ALUMINUM COMPANY S.A.C."` (usar `companyData` de `@/shared/config/company-data`).
2. **Ortografía en Español:**
   - Escribir `"antirruido"` (con doble 'r', no 'antiruido').
   - Escribir `"vidrio y aluminio"` (en singular).
3. **Catálogo Oficial de Ventanas (`ventanas-catalogo.json`):**
   - **4 Sistemas Oficiales Únicos:**
     1. `Sistema Nova` (`sistema-nova`)
     2. `Sistema Serie 25` (`serie-25`)
     3. `Sistema Serie 35` (`serie-35`)
     4. `Sistema Serie 62` (`serie-62`)
   - *Nota:* No inventar series inexistentes (como Serie 31, Serie 20, etc.). Todos los sistemas son **independientes** del tipo de ventana y siempre están disponibles.
4. **Tipos de Ventana:** `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`.
5. **Tipos de Vidrio (3 únicos):** `Crudo`, `Laminado`, `Templado` (sin sufijo de grosor 6mm).
6. **Colores de Vidrio:** `Incoloro`, `Bronce`, `Gris`.
7. **Colores de Aluminio:** `Negro`, `Mate`, `Blanco`, `Madera`, `Champagne`.
8. **Adicionales:** `Arenado`, `Diseño según cliente`.
9. **Simulador 3D (`VentanaConfigurador3DCard`):**
   - Es un **simulador visual e interactivo de características técnicas**, NO un cotizador individual de precios.
   - Proporción estándar: **65% Visor 3D (Izquierda)** / **35% Panel de Configuración (Derecha)**.
   - Altura estándar desktop: **`460px`** (alineada con la galería y la ficha técnica superior).

---

## 🎨 4. Convenciones de Diseño y Chakra UI v3

- **Chakra UI v3 Tokens:** Usar exclusivamente tokens del tema nativo (`space.1` a `space.16`, `borderRadius="xl"`, `fontSize="xs"`).
- **Iconos Lucide:** Cuando uses iconos de `lucide-react`, para evitar colapso de tamaño en flexbox usa: `style={{ flexShrink: 0 }}` (la prop directa `flexShrink` da error de tipos TS en Lucide).
- **Transiciones:** Máximo 2 propiedades CSS (`transition="all 0.2s ease"`, `transform="translateZ(0)"`).
- **Build Estático Next.js:** El proyecto usa `output: 'export'`. Todas las páginas deben poder pre-renderizarse estáticamente en build time (usar `generateStaticParams` en rutas dinámicas).
- **Backend Congelado:** NO modificar la carpeta `functions/`, `firestore.rules` ni `firebase.json` a menos que sea explícitamente solicitado.

---

## 🚢 5. Flujo de Git y Despliegue

```bash
# 1. Verificar tipos
pnpm run typecheck

# 2. Build local
pnpm run build

# 3. Commit semántico
git commit -m "feat(modulo): descripción clara"

# 4. Despliegue Hosting
pnpm run deploy:hosting
```