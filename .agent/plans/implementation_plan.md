# Plan de Optimización y Mejora de Código - MyAppGlass

**Proyecto:** GYA Glass & Aluminum - Aplicación Web Corporativa  
**Fecha de Creación:** 2026-02-08  
**Objetivo:** Optimizar el código, mejorar la documentación JSDoc y aplicar las mejores prácticas de React según estándares de Vercel 2026

---

## 📋 Resumen Ejecutivo

Este plan de implementación detalla las mejoras necesarias para optimizar el proyecto MyAppGlass siguiendo las mejores prácticas de React 2026, estándares de documentación JSDoc modernos y las recomendaciones de rendimiento de Vercel. El plan está diseñado para ser ejecutado por otro agente AI de forma autónoma.

---

## ⚠️ User Review Required

> [!IMPORTANT]
> **Decisiones Críticas que Requieren Aprobación del Usuario**
> 
> 1. **Migración a TypeScript (Opcional):** Este plan incluye mejoras de JSDoc, pero se recomienda considerar migración gradual a TypeScript para mayor robustez. ¿Desea incluir esta migración en el plan?
> 
> 2. **Breaking Changes Potenciales:**
>    - Refactorización de algunos hooks personalizados puede requerir actualización de componentes que los consumen
>    - Cambios en la estructura de props de componentes comunes
> 
> 3. **Dependencias Nuevas:**
>    - Se agregarán herramientas de testing (Vitest, React Testing Library)
>    - Se agregará herramienta de análisis de bundle (vite-plugin-bundle-analyzer)
>    - Se agregará herramienta de accesibilidad (eslint-plugin-jsx-a11y)

---

## 🎯 Proposed Changes

Este plan está organizado en **6 fases principales**, cada una con tareas específicas y archivos a modificar.

---

### 📦 Fase 1: Limpieza de Código y Corrección de Linting

**Objetivo:** Eliminar las 12 advertencias de linting detectadas y limpiar código no utilizado.

**Prioridad:** 🔴 Alta  
**Impacto:** Bajo riesgo, alta mejora en calidad de código  
**Tiempo estimado:** 30-45 minutos

---

#### 1.1 Corrección de Variables y Imports No Utilizados

##### [MODIFY] [Franja.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/Franja.jsx)

**Problema:** Variable `bgColor` declarada pero no utilizada (línea 20)

**Acción:**
- Eliminar la línea 20: `const bgColor = useColorModeValue("franja.bg.light", "franja.bg.dark");`
- O implementar el uso de `bgColor` descomentando la línea 27 y aplicando el estilo

**Recomendación:** Eliminar si no se planea usar el efecto glassmorphism

---

##### [MODIFY] [ClientsSection.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/home/ClientsSection.jsx)

**Problemas:**
- `useMemo` importado pero no usado (línea 1)
- `Box` importado pero no usado (línea 2)
- `Spinner` importado pero no usado (línea 2)
- `useIntersectionObserver` importado pero no usado (línea 8)

**Acción:**
```javascript
// ANTES
import { useState, useEffect, useMemo } from "react";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

// DESPUÉS
import { useState, useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
```

---

##### [MODIFY] [ServiceListSkeleton.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/services/ServiceListSkeleton.jsx)

**Problema:** Variable `cardBorderColor` declarada pero no utilizada (línea 18)

**Acción:**
- Eliminar la declaración de `cardBorderColor`
- O aplicar el color al componente correspondiente

---

##### [MODIFY] [SpecItem.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/services/service-pages/components/SpecItem.jsx)

**Problemas:**
- `Box` importado pero no usado (línea 2)
- `Icon` importado pero no usado (línea 2)
- Parámetro `icon` definido pero no usado (línea 14)
- Variable `iconBg` declarada pero no utilizada (línea 17)

**Acción:**
```javascript
// Limpiar imports no utilizados
// Eliminar parámetro 'icon' de la desestructuración de props
// Eliminar declaración de 'iconBg'
```

---

##### [MODIFY] [palmer.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/data/proyectos/palmer.js)

**Problemas:**
- `PALMER03` importado/declarado pero no usado (línea 3)
- `PALMER07` importado/declarado pero no usado (línea 7)

**Acción:**
- Eliminar las importaciones/declaraciones no utilizadas
- O exportar y usar estas constantes si son necesarias

---

### 📚 Fase 2: Mejora de Documentación JSDoc

**Objetivo:** Actualizar toda la documentación JSDoc siguiendo los estándares modernos de 2026.

**Prioridad:** 🟡 Media-Alta  
**Impacto:** Mejora significativa en mantenibilidad y DX (Developer Experience)  
**Tiempo estimado:** 2-3 horas

---

#### 2.1 Estándares de JSDoc para Componentes React

**Aplicar a todos los componentes (.jsx):**

```javascript
/**
 * @component ComponentName
 * @description Descripción detallada del propósito del componente y su comportamiento.
 * 
 * @param {ComponentNameProps} props - Las propiedades del componente
 * @returns {JSX.Element} Elemento JSX renderizado
 * 
 * @example
 * ```jsx
 * <ComponentName 
 *   prop1="value1"
 *   prop2={true}
 * />
 * ```
 */
```

**Para componentes con props complejas, usar `@typedef`:**

```javascript
/**
 * @typedef {Object} GalleryProps
 * @property {Array<{src: string, alt: string, title?: string}>} images - Array de objetos de imagen
 * @property {boolean} [showThumbnails=true] - Mostrar miniaturas
 * @property {number} [initialIndex=0] - Índice inicial de la imagen
 * @property {(index: number) => void} [onImageChange] - Callback cuando cambia la imagen
 */

/**
 * @component Gallery
 * @description Componente de galería de imágenes con navegación y zoom.
 * 
 * @param {GalleryProps} props - Propiedades del componente
 * @returns {JSX.Element}
 * 
 * @example
 * ```jsx
 * <Gallery 
 *   images={[{src: '/img1.jpg', alt: 'Image 1'}]}
 *   showThumbnails={true}
 *   onImageChange={(index) => console.log(index)}
 * />
 * ```
 */
```

---

#### 2.2 Archivos a Actualizar con JSDoc Mejorado

##### Componentes Comunes (Alta Prioridad)

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| [Gallery.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/Gallery.jsx) | Agregar `@typedef` para props, `@example` | 🔴 Alta |
| [DataLoader.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/DataLoader.jsx) | Documentar patrón render props | 🔴 Alta |
| [ScrollReveal.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/ScrollReveal.jsx) | Documentar props de animación | 🔴 Alta |
| [GlassCard.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/GlassCard.jsx) | Documentar variantes de estilo | 🟡 Media |

##### Hooks Personalizados (Alta Prioridad)

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| [useGallery.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/hooks/useGallery.js) | Mejorar documentación de retorno | 🔴 Alta |
| [useIntersectionObserver.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/hooks/useIntersectionObserver.js) | Documentar opciones de configuración | 🔴 Alta |
| [useProjectModal.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/hooks/useProjectModal.js) | Agregar ejemplos de uso | 🟡 Media |
| [useReclamoForm.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/hooks/useReclamoForm.js) | Documentar validaciones | 🔴 Alta |

##### Servicios (Media Prioridad)

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| [reclamoService.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/api/reclamoService.js) | Mejorar documentación de errores | 🟡 Media |
| [projectService.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/services/projectService.js) | Documentar estructura de datos | 🟡 Media |
| [serviceService.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/services/serviceService.js) | Agregar ejemplos de respuesta | 🟡 Media |

---

#### 2.3 Ejemplo de Mejora: useGallery.js

**ANTES:**
```javascript
/**
 * Hook para gestionar la lógica y el estado de un componente de galería de imágenes.
 * @param {Array} images - El array de imágenes a mostrar.
 * @returns {object} Un objeto con el estado de la galería y los manejadores de eventos.
 */
export const useGallery = (images) => { ... }
```

**DESPUÉS:**
```javascript
/**
 * @typedef {Object} GalleryImage
 * @property {string} src - URL de la imagen
 * @property {string} alt - Texto alternativo
 * @property {string} [title] - Título opcional de la imagen
 */

/**
 * @typedef {Object} UseGalleryReturn
 * @property {number} selectedIndex - Índice de la imagen actualmente seleccionada
 * @property {(index: number) => void} setSelectedIndex - Función para cambiar el índice seleccionado
 * @property {boolean} isModalOpen - Estado del modal de la galería
 * @property {() => void} onOpenModal - Función para abrir el modal
 * @property {() => void} onCloseModal - Función para cerrar el modal
 * @property {boolean} isHovered - Estado de hover sobre la galería
 * @property {(hovered: boolean) => void} setIsHovered - Función para actualizar estado de hover
 * @property {(e: Event) => void} handlePrevious - Manejador para navegar a imagen anterior
 * @property {(e: Event) => void} handleNext - Manejador para navegar a imagen siguiente
 * @property {GalleryImage} currentImage - Imagen actualmente seleccionada
 * @property {number} imageCount - Número total de imágenes
 */

/**
 * Hook personalizado para gestionar la lógica y el estado de un componente de galería de imágenes.
 * Proporciona funcionalidad completa de navegación, modal y selección de imágenes.
 * 
 * @param {GalleryImage[]} images - Array de objetos de imagen a mostrar en la galería
 * @returns {UseGalleryReturn} Objeto con el estado de la galería y los manejadores de eventos
 * 
 * @example
 * ```javascript
 * const images = [
 *   { src: '/img1.jpg', alt: 'Imagen 1', title: 'Proyecto A' },
 *   { src: '/img2.jpg', alt: 'Imagen 2', title: 'Proyecto B' }
 * ];
 * 
 * const {
 *   selectedIndex,
 *   isModalOpen,
 *   onOpenModal,
 *   handleNext,
 *   currentImage
 * } = useGallery(images);
 * ```
 */
export const useGallery = (images) => { ... }
```

---

### ⚡ Fase 3: Optimizaciones de Rendimiento (Vercel Best Practices)

**Objetivo:** Implementar optimizaciones de rendimiento siguiendo las 57 reglas de Vercel 2026.

**Prioridad:** 🟡 Media  
**Impacto:** Mejora significativa en Core Web Vitals  
**Tiempo estimado:** 3-4 horas

---

#### 3.1 Optimización de Re-renders (Impacto Medio)

##### [MODIFY] Componentes con Re-renders Innecesarios

**Archivos a revisar:**
- `src/components/home/ClientCard.jsx`
- `src/components/projects/ProjectCard.jsx`
- `src/components/services/ServiceCard.jsx`

**Acciones:**
1. Envolver componentes en `React.memo` cuando sea apropiado
2. Usar `useCallback` para funciones pasadas como props
3. Usar `useMemo` para cálculos costosos

**Ejemplo de implementación:**

```javascript
// ANTES
const ProjectCard = ({ project, onClick }) => {
  const handleClick = () => onClick(project.id);
  
  return (
    <Box onClick={handleClick}>
      {/* contenido */}
    </Box>
  );
};

// DESPUÉS
const ProjectCard = React.memo(({ project, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(project.id);
  }, [project.id, onClick]);
  
  return (
    <Box onClick={handleClick}>
      {/* contenido */}
    </Box>
  );
});

ProjectCard.displayName = 'ProjectCard';
```

---

#### 3.2 Optimización de Bundle Size (Impacto Crítico)

##### [MODIFY] [vite.config.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/vite.config.js)

**Acciones:**

1. **Agregar análisis de bundle:**
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({ ... }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  // ...
});
```

2. **Mejorar code splitting:**
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Separar vendors grandes
        if (id.includes('firebase')) return 'firebase';
        if (id.includes('@chakra-ui')) return 'chakra-ui';
        if (id.includes('framer-motion')) return 'framer-motion';
        if (id.includes('react-router')) return 'react-router';
        
        // Separar iconos
        if (id.includes('@heroicons') || id.includes('react-icons')) {
          return 'icons';
        }
        
        // Resto de node_modules
        if (id.includes('node_modules')) return 'vendor';
      }
    }
  }
}
```

---

#### 3.3 Lazy Loading de Componentes Pesados

##### [MODIFY] Componentes a Convertir en Lazy

**Archivos a modificar:**

1. **[ProjectDetailModal.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/projects/ProjectDetailModal.jsx)**
   - Este componente es pesado y solo se usa cuando se abre un proyecto
   - Convertir a lazy loading

2. **[ReclamationForm.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/layout/reclamation-book/ReclamationForm.jsx)**
   - Ya está en lazy loading en routes, verificar optimización

**Ejemplo de implementación:**

```javascript
// En el componente padre
import { lazy, Suspense } from 'react';

const ProjectDetailModal = lazy(() => 
  import('./ProjectDetailModal')
);

// En el render
<Suspense fallback={<ModalSkeleton />}>
  {isOpen && <ProjectDetailModal {...props} />}
</Suspense>
```

---

#### 3.4 Optimización de Imágenes

##### [MODIFY] Componentes que Usan Imágenes

**Acciones:**

1. **Implementar lazy loading nativo:**
```javascript
<img 
  src={image.src} 
  alt={image.alt}
  loading="lazy"
  decoding="async"
/>
```

2. **Usar srcset para responsive images:**
```javascript
<img 
  src={image.src}
  srcSet={`
    ${image.src}?w=400 400w,
    ${image.src}?w=800 800w,
    ${image.src}?w=1200 1200w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={image.alt}
  loading="lazy"
/>
```

---

#### 3.5 Optimización de Fuentes

##### [MODIFY] [index.html](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/index.html)

**Acción:** Agregar preload para fuentes críticas

```html
<head>
  <!-- Preload critical fonts -->
  <link 
    rel="preload" 
    href="/fonts/lora-v20-latin-regular.woff2" 
    as="font" 
    type="font/woff2" 
    crossorigin
  />
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

### 🧪 Fase 4: Implementación de Testing

**Objetivo:** Agregar tests unitarios y de integración para componentes críticos.

**Prioridad:** 🔴 Alta  
**Impacto:** Mejora significativa en confiabilidad y mantenibilidad  
**Tiempo estimado:** 4-6 horas

---

#### 4.1 Configuración de Testing

##### [NEW] [vitest.config.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/vitest.config.js)

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
```

##### [NEW] [src/test/setup.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/test/setup.js)

```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

---

#### 4.2 Tests para Hooks Personalizados

##### [NEW] [src/hooks/__tests__/useGallery.test.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/hooks/__tests__/useGallery.test.js)

```javascript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGallery } from '../useGallery';

describe('useGallery', () => {
  const mockImages = [
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' },
    { src: '/img3.jpg', alt: 'Image 3' }
  ];

  it('should initialize with first image selected', () => {
    const { result } = renderHook(() => useGallery(mockImages));
    
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toEqual(mockImages[0]);
  });

  it('should navigate to next image', () => {
    const { result } = renderHook(() => useGallery(mockImages));
    
    act(() => {
      result.current.handleNext({ stopPropagation: () => {} });
    });
    
    expect(result.current.selectedIndex).toBe(1);
  });

  it('should wrap to first image when at end', () => {
    const { result } = renderHook(() => useGallery(mockImages));
    
    act(() => {
      result.current.setSelectedIndex(2);
      result.current.handleNext({ stopPropagation: () => {} });
    });
    
    expect(result.current.selectedIndex).toBe(0);
  });
});
```

---

#### 4.3 Tests para Componentes

##### [NEW] [src/components/common/__tests__/Gallery.test.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/__tests__/Gallery.test.jsx)

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Gallery from '../Gallery';

const renderWithChakra = (component) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  );
};

describe('Gallery Component', () => {
  const mockImages = [
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' }
  ];

  it('should render gallery with images', () => {
    renderWithChakra(<Gallery images={mockImages} />);
    
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  it('should open modal on image click', () => {
    renderWithChakra(<Gallery images={mockImages} />);
    
    const image = screen.getByAltText('Image 1');
    fireEvent.click(image);
    
    // Verificar que el modal se abrió
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

---

#### 4.4 Tests para Servicios

##### [NEW] [src/api/__tests__/reclamoService.test.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/api/__tests__/reclamoService.test.js)

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reclamoService } from '../reclamoService';

global.fetch = vi.fn();

describe('reclamoService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should submit reclamo successfully', async () => {
    const mockResponse = {
      success: true,
      data: { id: 'test-id-123' }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const reclamoData = {
      nombre: 'Test User',
      email: 'test@example.com',
      mensaje: 'Test message'
    };

    const result = await reclamoService.submitReclamo(reclamoData);

    expect(result).toBe('test-id-123');
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reclamoData)
      })
    );
  });

  it('should handle errors correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ success: false, message: 'Server error' })
    });

    await expect(
      reclamoService.submitReclamo({})
    ).rejects.toThrow('Server error');
  });
});
```

---

#### 4.5 Actualización de package.json

##### [MODIFY] [package.json](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/package.json)

**Agregar scripts de testing:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  },
  "devDependencies": {
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@vitest/ui": "^1.0.4",
    "jsdom": "^23.0.1",
    "vitest": "^1.0.4",
    "@vitest/coverage-v8": "^1.0.4"
  }
}
```

---

### ♿ Fase 5: Mejoras de Accesibilidad

**Objetivo:** Mejorar la accesibilidad del sitio siguiendo WCAG 2.1 AA.

**Prioridad:** 🟡 Media  
**Impacto:** Mejora significativa en inclusividad y SEO  
**Tiempo estimado:** 2-3 horas

---

#### 5.1 Configuración de ESLint para Accesibilidad

##### [MODIFY] [eslint.config.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/eslint.config.js)

**Agregar plugin de accesibilidad:**

```javascript
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // ... resto de reglas
    }
  }
];
```

---

#### 5.2 Mejoras de Accesibilidad en Componentes

##### Acciones Generales

1. **Agregar ARIA labels a elementos interactivos:**
```javascript
<button 
  onClick={handleClick}
  aria-label="Cerrar modal de proyecto"
>
  <CloseIcon />
</button>
```

2. **Mejorar navegación por teclado:**
```javascript
const handleKeyDown = (e) => {
  if (e.key === 'Escape') onClose();
  if (e.key === 'ArrowRight') handleNext();
  if (e.key === 'ArrowLeft') handlePrevious();
};

<div 
  role="dialog"
  aria-modal="true"
  onKeyDown={handleKeyDown}
  tabIndex={0}
>
```

3. **Agregar skip links:**
```javascript
// En Layout.jsx
<a 
  href="#main-content" 
  className="skip-link"
  style={{
    position: 'absolute',
    left: '-9999px',
    ':focus': { left: '0' }
  }}
>
  Saltar al contenido principal
</a>
```

---

#### 5.3 Archivos Específicos a Modificar

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| [Gallery.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/Gallery.jsx) | Agregar navegación por teclado, ARIA labels | 🔴 Alta |
| [ProjectDetailModal.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/projects/ProjectDetailModal.jsx) | Agregar role="dialog", aria-modal, focus trap | 🔴 Alta |
| [Navbar.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/layout/common/Navbar.jsx) | Mejorar navegación por teclado, aria-current | 🟡 Media |
| [ReclamationForm.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/layout/reclamation-book/ReclamationForm.jsx) | Agregar aria-invalid, aria-describedby | 🔴 Alta |

---

### 📊 Fase 6: Monitoreo y Análisis

**Objetivo:** Implementar herramientas de monitoreo de rendimiento y errores.

**Prioridad:** 🟢 Baja-Media  
**Impacto:** Mejora en detección proactiva de problemas  
**Tiempo estimado:** 1-2 horas

---

#### 6.1 Web Vitals Tracking

##### [NEW] [src/utils/webVitals.js](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/utils/webVitals.js)

```javascript
/**
 * @file webVitals.js
 * @description Utilidad para medir y reportar Core Web Vitals
 */

/**
 * Reporta métricas de Web Vitals a un endpoint de analytics
 * @param {object} metric - Objeto de métrica de web-vitals
 */
const reportWebVitals = (metric) => {
  // Enviar a analytics (Google Analytics, Firebase, etc.)
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log en desarrollo
  if (import.meta.env.DEV) {
    console.log(metric);
  }
};

export default reportWebVitals;
```

##### [MODIFY] [main.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/main.jsx)

**Agregar tracking de Web Vitals:**

```javascript
import reportWebVitals from './utils/webVitals';

// Al final del archivo
if (import.meta.env.PROD) {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}
```

---

#### 6.2 Error Boundary

##### [NEW] [src/components/common/ErrorBoundary.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/components/common/ErrorBoundary.jsx)

```javascript
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

/**
 * @component ErrorBoundary
 * @description Componente de límite de error para capturar errores de React
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service (Sentry, Firebase, etc.)
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Opcional: Enviar a servicio de tracking
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          minH="100vh" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          p={4}
        >
          <Box textAlign="center">
            <Heading mb={4}>Algo salió mal</Heading>
            <Text mb={4}>
              Lo sentimos, ha ocurrido un error inesperado.
            </Text>
            <Button 
              onClick={() => window.location.reload()}
              colorScheme="primary"
            >
              Recargar página
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

##### [MODIFY] [App.jsx](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/src/App.jsx)

**Envolver con ErrorBoundary:**

```javascript
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}
```

---

#### 6.3 Bundle Analyzer

##### [MODIFY] [package.json](file:///c:/Users/LJCR/Documents/GitHub/MyAppGlass/package.json)

**Agregar script de análisis:**

```json
{
  "scripts": {
    "analyze": "vite build --mode analyze",
    "build:analyze": "cross-env ANALYZE=true pnpm run build"
  },
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

---

## 🔍 Verification Plan

### Automated Tests

**Comandos a ejecutar después de cada fase:**

```bash
# Fase 1: Verificar que no hay errores de linting
pnpm run lint

# Fase 2: Verificar que JSDoc está correcto
# (Revisar manualmente en VSCode con hover)

# Fase 3: Verificar mejoras de rendimiento
pnpm run build
pnpm run preview
# Usar Lighthouse para medir Core Web Vitals

# Fase 4: Ejecutar tests
pnpm run test:run
pnpm run test:coverage

# Fase 5: Verificar accesibilidad
pnpm run lint # Debe incluir reglas de jsx-a11y
# Usar herramienta axe DevTools en navegador

# Fase 6: Verificar monitoreo
pnpm run build
# Verificar que web-vitals se reportan en consola
```

---

### Manual Verification

**Checklist de verificación manual:**

#### ✅ Fase 1 - Linting
- [ ] Ejecutar `pnpm run lint` sin errores ni advertencias
- [ ] Verificar que el código se ejecuta sin errores en consola

#### ✅ Fase 2 - JSDoc
- [ ] Hover sobre componentes en VSCode muestra documentación completa
- [ ] Todos los parámetros están documentados
- [ ] Ejemplos de uso son claros y funcionales

#### ✅ Fase 3 - Rendimiento
- [ ] Lighthouse Performance Score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size reducido (verificar con `pnpm run analyze`)

#### ✅ Fase 4 - Testing
- [ ] Cobertura de tests > 70%
- [ ] Todos los tests pasan
- [ ] Tests de hooks críticos implementados
- [ ] Tests de componentes críticos implementados

#### ✅ Fase 5 - Accesibilidad
- [ ] Navegación completa por teclado funciona
- [ ] Screen reader puede leer todo el contenido
- [ ] axe DevTools no reporta errores críticos
- [ ] Contraste de colores cumple WCAG AA

#### ✅ Fase 6 - Monitoreo
- [ ] Web Vitals se reportan correctamente
- [ ] ErrorBoundary captura errores correctamente
- [ ] Bundle analyzer genera reporte

---

## 📦 Dependencias Nuevas a Instalar

```bash
# Testing
pnpm add -D vitest @vitest/ui @vitest/coverage-v8
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D jsdom

# Accesibilidad
pnpm add -D eslint-plugin-jsx-a11y

# Performance Monitoring
pnpm add web-vitals

# Bundle Analysis
pnpm add -D rollup-plugin-visualizer
```

---

## 📅 Timeline Estimado

| Fase | Tiempo Estimado | Prioridad |
|------|----------------|-----------|
| Fase 1: Limpieza de Código | 30-45 min | 🔴 Alta |
| Fase 2: JSDoc | 2-3 horas | 🟡 Media-Alta |
| Fase 3: Rendimiento | 3-4 horas | 🟡 Media |
| Fase 4: Testing | 4-6 horas | 🔴 Alta |
| Fase 5: Accesibilidad | 2-3 horas | 🟡 Media |
| Fase 6: Monitoreo | 1-2 horas | 🟢 Baja-Media |
| **TOTAL** | **13-19 horas** | - |

---

## 🎯 Orden de Ejecución Recomendado

Para un agente AI que ejecute este plan, se recomienda el siguiente orden:

1. **Fase 1** (Limpieza) - Rápido y sin riesgos
2. **Fase 4** (Testing) - Crear tests antes de refactorizar
3. **Fase 2** (JSDoc) - Mejorar documentación
4. **Fase 3** (Rendimiento) - Optimizaciones con tests como red de seguridad
5. **Fase 5** (Accesibilidad) - Mejoras incrementales
6. **Fase 6** (Monitoreo) - Configuración final

---

## 📝 Notas Adicionales

### Consideraciones Importantes

1. **Compatibilidad con Navegadores:**
   - El target actual es ES2015 (Chrome 50+, iOS 10+)
   - Verificar que todas las optimizaciones sean compatibles

2. **Firebase Functions:**
   - Las optimizaciones no afectan las funciones serverless
   - Mantener configuración separada en `functions/`

3. **Chakra UI:**
   - Todas las optimizaciones deben ser compatibles con Chakra UI
   - Respetar el sistema de diseño existente

4. **Git Workflow:**
   - Crear una rama por cada fase: `optimize/fase-1-linting`, etc.
   - Hacer commits atómicos por cada archivo modificado
   - Crear PR al finalizar cada fase

---

## 🔗 Referencias

- [Vercel Best Practices 2026](https://vercel.com/docs/concepts/best-practices)
- [JSDoc TypeScript Support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

---

**Fin del Plan de Implementación**

Este plan está listo para ser ejecutado por otro agente AI de forma autónoma. Cada fase está detallada con archivos específicos, ejemplos de código y criterios de verificación claros.
