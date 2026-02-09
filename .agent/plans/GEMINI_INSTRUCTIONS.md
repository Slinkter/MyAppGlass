# 🤖 Instrucciones para Gemini CLI - Plan de Refactorización MyAppGlass

## 📋 RESUMEN

Este documento contiene las instrucciones paso a paso para que **Gemini CLI** ejecute el plan de refactorización Feature-Based Architecture del proyecto MyAppGlass.

**Documentos relacionados:**
- `technical_diagnosis.md` - Análisis completo del proyecto (solo lectura)
- `refactoring_plan.md` - Plan detallado de refactorización (referencia)
- Este archivo - **Instrucciones específicas para ejecutar**

---

## ⚡ INICIO RÁPIDO

### Comando para Gemini CLI

```bash
gemini "Lee el archivo .agent/plans/GEMINI_INSTRUCTIONS.md y ejecuta la refactorización Feature-Based Architecture del proyecto MyAppGlass siguiendo todas las fases en orden. Crea commits atómicos después de cada subtarea completada. Actualiza el progreso en .agent/plans/refactoring_progress.md"
```

---

## 🎯 CONTEXTO DEL PROYECTO

**Proyecto:** GYA Glass & Aluminum - Corporate Web Application  
**Stack:** React 18, Vite, JavaScript, Chakra UI, Firebase  
**Objetivo:** Migrar de arquitectura type-based a feature-based  
**Duración:** 2-3 semanas  
**NO incluir:** Testing ni TypeScript

### Problemas Identificados

1. ❌ Componentes muy grandes (ReclamationForm: 368 líneas)
2. ❌ Código duplicado (patrón fetch en 4+ componentes)
3. ❌ Arquitectura type-based dificulta escalabilidad
4. ❌ No hay Feature-Based Architecture

---

## 📅 FASES DEL PLAN

### FASE 1: Preparación (2-3 días)

#### 1.1 Crear Branch de Trabajo

```bash
git checkout -b refactor/feature-based-architecture
git push -u origin refactor/feature-based-architecture
```

#### 1.2 Crear Estructura de Carpetas

**COMANDO EXACTO:**
```bash
cd src
mkdir -p features/projects/{components,hooks,services,data}
mkdir -p features/services/{components,hooks,services,data}
mkdir -p features/home/{components,hooks,services,data}
mkdir -p features/reclamation-book/{components,hooks,api}
mkdir -p shared/{components,hooks,utils,config}
mkdir -p shared/components/{Card,Image,Gallery,Animation,Layout,Form,UI,SEO}
mkdir -p shared/hooks/{data,ui,observers}
mkdir -p layout/{MainLayout,Navbar,Footer,FloatingActions}
```

**COMMIT:**
```bash
git add .
git commit -m "chore: create feature-based directory structure"
```

#### 1.3 Crear Archivo de Design Tokens

**CREAR:** `src/shared/config/designTokens.js`

```javascript
/**
 * @file designTokens.js
 * @description Design tokens críticos del proyecto MyAppGlass
 * IMPORTANTE: Estos estilos definen la identidad visual
 */

export const glassmorphismTokens = {
  light: {
    bg: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.35)",
  },
  dark: {
    bg: "rgba(0, 0, 0, 0.1)",
    border: "rgba(255, 255, 255, 0.15)",
  },
  backdropFilter: "blur(10px)",
  borderRadius: "2xl",
  boxShadow: "sm",
};

export const colorTokens = {
  primary: {
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    accent: "#ff5757",
  },
};
```

**COMMIT:**
```bash
git add src/shared/config/designTokens.js
git commit -m "feat: add design tokens for glassmorphism styles"
```

#### 1.4 Actualizar vite.config.js

**MODIFICAR:** `vite.config.js`

Agregar estos alias en la sección `resolve.alias`:

```javascript
resolve: {
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
    "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
    "@layout": fileURLToPath(new URL("./src/layout", import.meta.url)),
  },
},
```

**COMMIT:**
```bash
git add vite.config.js
git commit -m "config: add path aliases for feature-based architecture"
```

#### 1.5 Verificar que Build Funciona

```bash
pnpm run build
# Debe completarse sin errores
```

**Checklist FASE 1:**
- [ ] Branch creado
- [ ] Estructura de carpetas creada
- [ ] designTokens.js creado
- [ ] Alias configurados
- [ ] Build funciona

---

### FASE 2: Migración Feature por Feature

#### 2.1 Feature: Projects (Día 1-5)

##### Día 1: Mover Archivos Base

**MOVER archivos:**
```bash
# Components
mv src/components/projects/*.jsx src/features/projects/components/
mv src/components/projects/modal src/features/projects/components/

# Services
mv src/services/projectService.js src/features/projects/services/

# Data
mv src/data/projects.js src/features/projects/data/

# Hooks
mv src/hooks/useProjectModal.js src/features/projects/hooks/
```

**COMMIT:**
```bash
git add .
git commit -m "refactor(projects): move files to feature directory"
```

##### Día 2-3: Refactorizar ProjectCard.jsx

**IMPORTANTE:** ProjectCard tiene 217 líneas. Dividir en 3 archivos.

**PASO 1:** Crear `ProjectCardContent.jsx`

**UBICACIÓN:** `src/features/projects/components/ProjectCardContent.jsx`

```javascript
import React, { useState } from "react";
import { Box, Stack, Heading, Text, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import FadingImage from "@shared/components/Image/FadingImage";

/**
 * @component ProjectCardContent
 * @description Presentational component para el contenido de la tarjeta de proyecto
 */
const ProjectCardContent = ({ image, residencial, address, year, onOpenModal }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue("rgba(255, 255, 255, 0.52)", "rgba(255, 255, 255, 0.15)"),
    text: useColorModeValue("gray.800", "gray.100"),
    icon: useColorModeValue("gray.500", "gray.400"),
    heading: useColorModeValue("primary.700", "primary.300"),
  };

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      bg={styles.bg}
      borderRadius="2xl"
      boxShadow="lg"
      transition="transform 0.3s ease"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Box p={2}>
        <FadingImage
          w="full"
          h={{ base: "275px", md: "375px" }}
          src={image}
          alt={`Obra ${residencial}`}
          showOverlay={false}
          onLoad={() => setIsImageLoaded(true)}
        />

        <Stack p={4} spacing={2} opacity={isImageLoaded ? 1 : 0} transition="opacity 0.4s">
          <Heading size="md" color={styles.heading} textAlign="center" textTransform="uppercase">
            {residencial}
          </Heading>

          <Stack direction="row" justifyContent="space-between" fontSize="sm">
            <Flex alignItems="center">
              <Icon as={MapPinIcon} w={5} h={5} mr={2} color={styles.icon} />
              <Text noOfLines={1}>{address}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={CalendarDaysIcon} w={5} h={5} mr={2} color={styles.icon} />
              <Text>{year}</Text>
            </Flex>
          </Stack>

          <Button onClick={onOpenModal} /* ... estilos del botón ... */>
            Google Maps
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectCardContent;
```

**PASO 2:** Refactorizar `ProjectCard.jsx`

**MODIFICAR:** `src/features/projects/components/ProjectCard.jsx`

```javascript
import React, { lazy, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ProjectCardContent from "./ProjectCardContent";
import ModalSkeleton from "./modal/ModalSkeleton";

const LazyProjectDetailModal = lazy(() => import('./ProjectDetailModal'));

/**
 * @component ProjectCard
 * @description Container component para tarjeta de proyecto
 */
const ProjectCard = React.memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { residencial, name, address, year, g_maps, photosObra, image } = props;

  return (
    <>
      <ProjectCardContent
        image={image}
        residencial={residencial}
        address={address}
        year={year}
        onOpenModal={onOpen}
      />
      
      {isOpen && (
        <Suspense fallback={<ModalSkeleton />}>
          <LazyProjectDetailModal
            isOpen={isOpen}
            onClose={onClose}
            residencial={residencial}
            name={name}
            address={address}
            year={year}
            g_maps={g_maps}
            photos={photosObra}
          />
        </Suspense>
      )}
    </>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
```

**COMMIT:**
```bash
git add src/features/projects/components/
git commit -m "refactor(projects): split ProjectCard into container and content components"
```

##### Día 4: Crear Barrel Exports

**CREAR:** `src/features/projects/index.js`

```javascript
/**
 * @file index.js
 * @description Feature Projects - Barrel exports
 */

// Components
export { default as ProjectCard } from './components/ProjectCard';
export { default as ProjectsList } from './components/ProjectsList';
export { default as ProjectDetailModal } from './components/ProjectDetailModal';
export { default as ProjectCardSkeleton } from './components/ProjectCardSkeleton';
export { default as ProjectListSkeleton } from './components/ProjectListSkeleton';

// Hooks
export { useProjectModal } from './hooks/useProjectModal';

// Services
export { getProjects } from './services/projectService';
```

**COMMIT:**
```bash
git add src/features/projects/index.js
git commit -m "feat(projects): add barrel exports for feature"
```

##### Día 5: Actualizar Imports

**MODIFICAR:** `src/pages/ProjectPage.jsx`

```javascript
// ANTES:
import ProjectsList from '@/components/projects/ProjectsList';

// DESPUÉS:
import { ProjectsList } from '@features/projects';
```

**VERIFICAR:** La página funciona igual

**COMMIT:**
```bash
git add src/pages/ProjectPage.jsx
git commit -m "refactor(projects): update imports to use feature barrel"
```

**Checklist Feature Projects:**
- [ ] Archivos movidos
- [ ] ProjectCard refactorizado
- [ ] Barrel exports creado
- [ ] Imports actualizados
- [ ] Página funciona visualmente igual

---

#### 2.2 Feature: Services (Día 6-8)

**REPETIR proceso similar a Projects:**

1. Mover archivos a `features/services/`
2. Refactorizar ServiceCard (140 líneas → 2 archivos)
3. Crear barrel exports
4. Actualizar imports

**COMMITS ATÓMICOS:**
```bash
git commit -m "refactor(services): move files to feature directory"
git commit -m "refactor(services): split ServiceCard component"
git commit -m "feat(services): add barrel exports"
git commit -m "refactor(services): update imports in pages"
```

---

#### 2.3 Feature: Home (Día 9-11)

**CRÍTICO:** Crear hook `useAsyncData` PRIMERO

##### Crear Hook useAsyncData

**CREAR:** `src/shared/hooks/data/useAsyncData.js`

```javascript
import { useState, useEffect } from "react";

/**
 * @hook useAsyncData
 * @description Hook genérico para fetch de datos con estados loading/error
 * Elimina código duplicado en múltiples componentes
 */
export const useAsyncData = (fetchFunction) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchFunction()
      .then(data => setState({ data, isLoading: false, error: null }))
      .catch(error => setState({ 
        data: null, 
        isLoading: false, 
        error: error.message || 'Error al cargar datos' 
      }));
  }, [fetchFunction]);

  return state;
};
```

**COMMIT:**
```bash
git add src/shared/hooks/data/useAsyncData.js
git commit -m "feat(shared): add useAsyncData hook to eliminate code duplication"
```

##### Refactorizar ClientsSection

**MODIFICAR:** `src/features/home/components/ClientsSection.jsx`

**ANTES (código duplicado):**
```javascript
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [clients, setClients] = useState([]);

useEffect(() => {
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  fetchClients();
}, []);
```

**DESPUÉS (usando hook):**
```javascript
import { useAsyncData } from '@shared/hooks/data/useAsyncData';
import { getClients } from '../services/clientService';

const { data: clients, isLoading, error } = useAsyncData(getClients);
```

**COMMIT:**
```bash
git add src/features/home/components/ClientsSection.jsx
git commit -m "refactor(home): use useAsyncData hook in ClientsSection"
```

**REPETIR para FeaturesSection y StoreSection**

---

#### 2.4 Feature: ReclamationBook (Día 12-15) ⚠️ CRÍTICO

**ADVERTENCIA:** Este es el componente MÁS GRANDE (368 líneas)

##### Día 12: Backup y Análisis

```bash
# Crear backup
cp src/layout/reclamation-book/ReclamationForm.jsx ReclamationForm.backup.jsx

# Analizar componente actual
# Identificar secciones: Personal Info, Complaint, Product, Actions
```

##### Día 13-14: Crear Sub-componentes

**CREAR 4 archivos:**

1. `PersonalInfoSection.jsx` (~80 líneas)
2. `ComplaintSection.jsx` (~80 líneas)
3. `ProductSection.jsx` (~60 líneas)
4. `FormActions.jsx` (~40 líneas)

**Ejemplo PersonalInfoSection:**

```javascript
/**
 * @component PersonalInfoSection
 * @description Sección de información personal del formulario de reclamaciones
 */
const PersonalInfoSection = ({ formData, handleChange, errors }) => {
  return (
    <Stack spacing={4}>
      <Heading size="md">Información Personal</Heading>
      
      <FormControl isRequired isInvalid={errors?.fullName}>
        <FormLabel>Nombres y Apellidos</FormLabel>
        <Input
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors?.fullName}</FormErrorMessage>
      </FormControl>
      
      {/* Resto de campos */}
    </Stack>
  );
};
```

**COMMIT CADA COMPONENTE:**
```bash
git add src/features/reclamation-book/components/PersonalInfoSection.jsx
git commit -m "feat(reclamation): create PersonalInfoSection component"
```

##### Día 15: Refactorizar Container

**MODIFICAR:** `ReclamationForm.jsx` (debe quedar ~60 líneas)

```javascript
import { useReclamoForm } from '../hooks/useReclamoForm';
import PersonalInfoSection from './PersonalInfoSection';
import ComplaintSection from './ComplaintSection';
import ProductSection from './ProductSection';
import FormActions from './FormActions';
import SuccessModal from './SuccessModal';

const ReclamationForm = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit, isSuccessOpen, onSuccessClose } = useReclamoForm();

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="4xl" mx="auto" p={6}>
      <PersonalInfoSection 
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
      
      <ComplaintSection
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
      
      <ProductSection
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
      
      <FormActions 
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      
      <SuccessModal isOpen={isSuccessOpen} onClose={onSuccessClose} />
    </Box>
  );
};
```

**COMMIT:**
```bash
git add src/features/reclamation-book/components/ReclamationForm.jsx
git commit -m "refactor(reclamation): split ReclamationForm into sub-components (368→60 lines)"
```

**PROBAR MANUALMENTE:**
1. Abrir formulario
2. Llenar campos
3. Validar
4. Enviar
5. Ver modal de éxito

---

### FASE 3: Shared Components (Día 16-19)

#### 3.1 Refactorizar FadingImage (235 líneas → 3 archivos)

**CREAR:** `src/shared/components/Image/ImageWithFallback.jsx`

```javascript
/**
 * @component ImageWithFallback
 * @description Imagen con manejo automático de error y fallback
 */
const ImageWithFallback = ({ src, fallbackSrc, onLoad, onError, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setImageSrc(fallbackSrc || "https://placehold.co/300x300?text=No+disponible");
    setIsLoaded(true);
    if (onError) onError();
  };

  return (
    <Skeleton isLoaded={isLoaded} w="100%" h="100%">
      <Image
        src={imageSrc}
        onError={handleError}
        onLoad={() => { setIsLoaded(true); onLoad?.(); }}
        {...props}
      />
    </Skeleton>
  );
};
```

**CREAR:** `src/shared/components/Image/ImageOverlay.jsx`
**CREAR:** `src/shared/components/Image/FadingImage.jsx` (composición)

**COMMIT:**
```bash
git add src/shared/components/Image/
git commit -m "refactor(shared): split FadingImage into 3 focused components"
```

#### 3.2 Organizar Hooks Compartidos

**MOVER hooks:**
```bash
mv src/hooks/useGallery.js src/shared/hooks/ui/
mv src/hooks/useIsMobile.js src/shared/hooks/ui/
mv src/hooks/useIntersectionObserver.js src/shared/hooks/observers/
```

**CREAR:** `src/shared/hooks/ui/useModal.js` (genérico)

**COMMIT:**
```bash
git commit -m "refactor(shared): reorganize hooks into categorized subdirectories"
```

---

### FASE 4: Layout y Limpieza (Día 20-22)

#### 4.1 Reorganizar Layout

```bash
# Crear subdirectorios
mkdir -p src/layout/{Navbar,Footer,MainLayout,FloatingActions}

# Mover archivos
mv src/layout/common/Navbar.jsx src/layout/Navbar/
mv src/layout/common/DesktopNav.jsx src/layout/Navbar/
mv src/layout/common/MobileNav.jsx src/layout/Navbar/
mv src/layout/common/ColorModeToggle.jsx src/layout/Navbar/
mv src/layout/common/Footer.jsx src/layout/Footer/
mv src/layout/Layout.jsx src/layout/MainLayout/
```

**COMMIT:**
```bash
git commit -m "refactor(layout): organize layout components into feature subdirectories"
```

#### 4.2 Actualizar Todos los Imports

**BUSCAR y REEMPLAZAR en todas las páginas:**

```javascript
// ANTES:
import Navbar from '@/layout/common/Navbar';
import ProjectsList from '@/components/projects/ProjectsList';

// DESPUÉS:
import { Navbar } from '@layout/Navbar';
import { ProjectsList } from '@features/projects';
```

**HERRAMIENTAS sugeridas:**
```bash
# Buscar imports antiguos
grep -r "from '@/components/projects" src/pages/
grep -r "from '@/services/" src/

# Deben retornar 0 resultados cuando termines
```

**COMMIT:**
```bash
git commit -m "refactor: update all imports to use new feature-based paths"
```

#### 4.3 Eliminar Carpetas Vacías

```bash
# VERIFICAR que estén vacías primero
ls -la src/components/projects
ls -la src/components/services
ls -la src/components/home

# Si vacías, eliminar
rmdir src/components/projects
rmdir src/components/services
rmdir src/components/home
# ... etc
```

**COMMIT:**
```bash
git commit -m "chore: remove old empty directories after migration"
```

#### 4.4 Resolver TODOs

**MODIFICAR:** `src/config/theme.js`

```javascript
// Expandir radii tokens
radii: {
  card: "lg",
  button: "md",
  input: "md",      // NUEVO
  modal: "2xl",     // NUEVO
  avatar: "full",   // NUEVO
},
```

**COMMIT:**
```bash
git commit -m "feat(theme): expand radii tokens (resolve TODO)"
```

#### 4.5 Actualizar README

**MODIFICAR:** `README.md`

Agregar sección de estructura:

```markdown
## 📂 Estructura del Proyecto (Feature-Based Architecture)

\`\`\`
src/
├── features/              # Features organizados por dominio
│   ├── projects/         # Todo lo relacionado a proyectos
│   ├── services/         # Todo lo relacionado a servicios
│   ├── home/             # Secciones de home
│   └── reclamation-book/ # Libro de reclamaciones
├── shared/               # Código compartido entre features
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Hooks personalizados
│   └── config/           # Configuración y tokens
├── layout/               # Componentes de layout (Navbar, Footer)
├── pages/                # Páginas de rutas
└── routes/               # Configuración de routing
\`\`\`
```

**COMMIT:**
```bash
git commit -m "docs: update README with new feature-based structure"
```

---

## ✅ VERIFICACIÓN FINAL

### Comandos de Verificación

```bash
# 1. Linter debe pasar
pnpm run lint

# 2. Build debe funcionar
pnpm run build

# 3. Dev server debe iniciar
pnpm run dev
```

### Verificación Manual

**PROBAR CADA PÁGINA:**
- [ ] Home page funciona
- [ ] Proyectos page funciona
- [ ] Servicios page funciona
- [ ] Formulario de reclamaciones funciona
- [ ] Dark mode funciona
- [ ] Responsive funciona

### Crear Pull Request

```bash
git push origin refactor/feature-based-architecture

# Crear PR en GitHub/GitLab
# Título: "Refactor: Migrate to Feature-Based Architecture"
# Description: Link a .agent/plans/technical_diagnosis.md
```

---

## 🚨 SI ALGO SALE MAL

### Problemas Comunes y Soluciones

#### 1. Imports Rotos

```bash
# Buscar imports que no funcionan
grep -r "Cannot find module" .

# Verificar alias en vite.config.js
# Reiniciar dev server después de cambiar alias
```

#### 2. Build Falla

```bash
# Ver errores específicos
pnpm run build 2>&1 | grep "error"

# Verificar que todos los exports existen
# Verificar que no hay circular dependencies
```

#### 3. Estilos Se Ven Diferentes

```bash
# Comparar screenshots antes/después
# Verificar que glassmorphism tokens se mantienen
# Verificar useColorModeValue en componentes refactorizados
```

#### 4. Formulario No Funciona

```bash
# Restaurar backup
cp ReclamationForm.backup.jsx src/features/reclamation-book/components/ReclamationForm.jsx

# Revisar props pasados a sub-componentes
# Verificar que useReclamoForm está conectado
```

---

## 📊 PROGRESO

**Actualizar en:** `.agent/plans/refactoring_progress.md`

```markdown
# Progreso de Refactorización

## FASE 1: Preparación
- [x] Branch creado
- [x] Estructura de carpetas
- [x] Design tokens
- [x] Alias configurados

## FASE 2: Features
- [ ] 2.1 Projects
- [ ] 2.2 Services
- [ ] 2.3 Home
- [ ] 2.4 ReclamationBook

## FASE 3: Shared
- [ ] FadingImage refactorizado
- [ ] Hooks organizados

## FASE 4: Finalización
- [ ] Layout reorganizado
- [ ] Imports actualizados
- [ ] README actualizado
```

---

## 🎯 CRITERIOS DE ÉXITO

Al completar, el proyecto debe tener:

- ✅ Todos los archivos en estructura feature-based
- ✅ ReclamationForm < 100 líneas (antes: 368)
- ✅ FadingImage dividido en 3 componentes (antes: 235)
- ✅ Hook useAsyncData elimina código duplicado
- ✅ Build funciona sin errores
- ✅ Todas las páginas funcionan igual visualmente
- ✅ Dark mode funciona
- ✅ No hay carpetas antiguas (`src/components/projects/`, etc.)

---

**FIN DE INSTRUCCIONES**

**Última actualización:** 2026-02-08  
**Para:** Gemini CLI  
**De:** Claude (Antigravity AI)
