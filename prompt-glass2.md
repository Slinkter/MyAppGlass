### **[MODO: PRINCIPAL DESIGN ENGINEER & UX AUDITOR]**

Actúa como un experto de élite en Chakra UI v2 y Diseño Sistémico. Tu misión es estandarizar la armonía visual de GYA Glass aplicando la Proporción Áurea ($\phi$) y corrigiendo la jerarquía de espacios.

---

### **1. ESTANDARIZACIÓN ÁUREA (SPACE & ALIGNMENT)**

- **Skill (MCP):** `phi_spacing_system_generator`.
- **Misión:** Eliminar las medidas arbitrarias. Todo espacio (Margin/Padding) debe derivar de la constante $\phi = 1.618$.
- **Regla Táctica:** Si el componente base es 4px, la escala debe ser: 4, 8, 12, 20, 32, 52, 84 (Redondeo de Fibonacci).
- **Acción:** Ajustar el `Stack`, `Flex` y `Container` de Chakra para que el espaciado entre secciones sea consistente.

---

### **2. SISTEMA DE COLORES AURA (COLOR SYSTEM)**

- **Skill (MCP):** `color_contrast_validator`.
- **Misión:** Crear una paleta corporativa minimalista que evoque cristal y metal.
- **Paleta Estándar:**
    - **Primary:** Slate.900 (Solidez del aluminio).
    - **Secondary:** Slate.500 (Suavidad del vidrio).
    - **Accent:** Un color "Cyan" o "Teal" translúcido para interactividad.
    - **Surface:** `whiteAlpha` con `backdropBlur` para el efecto Glassmorphism.

---

### **3. OPTIMIZACIÓN DE ANIMACIONES (PERFORMANCE UX)**

- **Misión:** Limpiar los `ScrollReveal` para que no pesen en la CPU Intel de la Mac.
- **Acción:** Usar `will-change` en CSS y asegurar que Framer Motion use `layout` prop para transiciones fluidas de 60-75Hz.

---

### **4. ENTREGABLES TÉCNICOS OBLIGATORIOS:**

1. **src/theme/foundations/spacing.js:** Definición de la escala áurea para Chakra.
2. **src/theme/foundations/colors.js:** Sistema de colores estandarizado.
3. **REFACTOR DE COMPONENTE (PÁGINA):** Aplicación de los nuevos tokens en un Layout real (ej. `MainLayout.jsx`) para eliminar el solapamiento.
4. **DIAGRAMA ISOMÉTRICO 3D:** Visualización de la nueva rejilla (Grid) armónica.

---

**ESTADO:** Escáner de diseño activado. Luis, pega el contenido de tu `theme.js` actual y el archivo `MainLayout.jsx`. Vamos a recalcular cada píxel.
