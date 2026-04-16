# Aura Design System | Style Guide
**GYA Glass & Aluminum**

Este documento define los estándares visuales, tipográficos y espaciales del ecosistema digital de GYA. El sistema **Aura** está diseñado para reflejar la precisión técnica del aluminio y la transparencia inmersiva del cristal.

---

## 1. Filosofía de Diseño: "Digital Materiality"
El diseño no es solo estético, sino estructural. Buscamos replicar la sensación de los materiales físicos del negocio:
- **Transparencia**: Uso extensivo de Glassmorphism (efectos de vidrio).
- **Precisión**: Alineación basada en reglas matemáticas estrictas.
- **Minimalismo**: Menos es más. Cada píxel debe tener una función.

---

## 2. Tipografía: Editorial Sophistication
Utilizamos una única familia tipográfica principal para todo el sitio, variando su peso y espaciado para crear jerarquías.

### Fuente Principal: **Lora (Serif)**
Elegida por su elegancia clásica y legibilidad premium.

| Uso | Peso (Weight) | Espaciado (Tracking) | Caso |
| :--- | :--- | :--- | :--- |
| **Título Principal (H1)** | `900` / `Black` | `tight` (-0.02em) | Nombres de proyectos residenciales. |
| **Etiquetas / Overlines** | `900` | `0.4em` (Wide) | "PROYECTO DE INGENIERÍA", "COLECCIÓN". |
| **Cuerpos de Texto** | `400` / `500` | `normal` | Descripciones, especificaciones. |
| **Botones** | `600` | `wider` (0.1em) | Llamadas a la acción (CTAs). |

---

## 3. Escala de Espaciado: El Sistema Phi (Fibonacci)
Para garantizar una armonía natural, el espaciado (`margin`, `padding`, `gap`) **NUNCA** usa valores arbitrarios. Se rige por la sucesión de Fibonacci (Proporción Áurea).

| Token | Valor | Uso Recomendado |
| :--- | :--- | :--- |
| `phi_xs` | 8px | Espacios entre línea de texto y subtítulo. |
| `phi_sm` | 13px | Padding interno de botones o elementos pequeños. |
| `phi_md` | 21px | Espaciado entre elementos de una lista o card. |
| `phi_lg` | 34px | Padding general de contenedores o cards grandes. |
| `phi_xl` | 55px | Espaciado entre secciones menores de una página. |
| `phi_2xl` | 89px | Espaciado entre bloques arquitectónicos de la página. |
| `phi_3xl` | 144px | Margen superior/inferior de secciones principales. |

---

## 4. Paleta de Colores: Zinc & Transparency
La paleta se inspira en metales y cristales, evitando colores saturados genéricos.

### Tonos Zinc (Escala Cromática)
Utilizados para fondos, bordes y superficies.
- **Deep Obsidian (`#09090b`)**: Fondo principal de la página (Dark Mode).
- **Anodized Glass (`rgba(255, 255, 255, 0.25)`)**: Superficie de vidrios interactivos.
- **Border Glass (`rgba(255, 255, 255, 0.08)`)**: Bordes ultra-delgados de 1px.

### Acento Primario
- **Primary / Gold / Orange**: Utilizado solo para puntos de enfoque (iconos de ubicación, números de precisión, botones elite).

---

## 5. Efectos de Material (Glassmorphism)
Para que un elemento se considere "Aura Glass", debe cumplir:
1.  **Backdrop Blur**: Mínimo `12px` de desenfoque.
2.  **Border Profile**: Borde de 1px sólido con baja opacidad (`rgba(255,255,255,0.06)`).
3.  **Shadow Depth**: Sombra suave y extendida para dar sensación de flotabilidad.

---

## 6. Animación y Movimiento
El movimiento debe ser **físico** y **fluido** (Motion).
- **Aparición**: Fade-in con un ligero `scale(0.95 -> 1.0)`.
- **Interpolación**: Usar `easeOut` o `cubic-bezier(0.16, 1, 0.3, 1)` para transiciones elegantes.
- **Spinner**: Grosor de `2px`, velocidad `0.8s`, diseño minimalista sin card.

---
*Manual de Estilo - Propiedad de GYA Company 2026. Basado en el Aura Design System.*
