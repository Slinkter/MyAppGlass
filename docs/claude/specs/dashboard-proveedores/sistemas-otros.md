# Sistemas y productos de otros servicios: techo, espejos, vidrio, celosía

Fuentes: `docs/proveedores/eduhg_base_conocimiento.md` (leído completo), `docs/proveedores/hpd_glass_base_conocimiento.md` (búsqueda por palabras clave y tramos cortos), API local `http://localhost:8000/productos` (consultas `proveedor=hpd_glass`, `proveedor=eduhg` y `categoria=Accesorios Para Policarbonatos`).

Regla: lo que no aparece en los catálogos figura como "sin dato en los catálogos". No hay precios, garantías ni porcentajes de esta investigación, salvo la transmisión de luz de un policarbonato que el catálogo sí trae como dato técnico.

## 1. Tabla resumen

| Sistema o producto | Servicio (slug) | Proveedor | Confianza |
|---|---|---|---|
| Policarbonato compacto POLYLITE Plus (color bronce, 6-8 mm) | techo | eduhg | media |
| Accesorios para policarbonato: perfiles U, F y H, autoperforantes (6, 8 y 10 mm) | techo | corporacion_corrales (API) | media |
| Estructura de aluminio para techo y "sol y sombra" | techo | sin dato en los catálogos | baja |
| Vidrio liso: incoloro, bronce, gris humo (2 a 10 mm) | vidrio | eduhg | alta |
| Vidrio reflectivo: bronce, light blue, azul oscuro | vidrio | eduhg | media |
| Vidrio laminado: incoloro, bronce, milk/opal, acústico (6.38, 8.38, 10.38 mm) | vidrio | eduhg | alta |
| Vidrio laminado (ficha técnica) | vidrio | hpd_glass (API, ficha existe) | baja |
| Vidrio templado (ficha técnica) | vidrio | hpd_glass (API y md) | baja |
| Vidrio insulado (ficha técnica, espaciador super spacer) | vidrio | hpd_glass (API y md) | media |
| Vidrio ácido (4.6 mm) | vidrio | eduhg | media |
| Vidrio catedral (llovizna, karatachi, flora, marihuana, cuadriculado) | vidrio | eduhg | media |
| Vidrio crudo (flotado) | vidrio | sin dato en los catálogos | baja |
| Espejos (2, 3 y 4 mm) | espejos | eduhg | media |
| Espejos biselados o formas (cuadrado, rectangular) | espejos | sin dato en los catálogos | baja |
| Celosía de aluminio para ventilación | celosia | sin dato en los catálogos (ver ficha 4) | baja |

Confianza: alta = dato explícito en catálogo con espesor o color; media = dato explícito pero sin ficha técnica completa o solo en un proveedor; baja = referencia indirecta o sin lectura completa.

## 2. Fichas

### 2.1 Techo de policarbonato y "sol y sombra"

- **Cómo lo llama el proveedor:** eduhg lo llama "Policarbonato y paneles" y, dentro de eso, "POLYLITE Plus, innovación en policarbonatos" (índice, `eduhg_base_conocimiento.md` ~líneas 1074-1104). La palabra "techo" y "sol y sombra" no aparece en los catálogos leídos.
- **Componentes:**
  - Plancha de policarbonato: POLYLITE Plus, "material 100% virgen" y "50 micras de protección UV" (~línea 1075). Garantía que menciona el catálogo: no se incluye en esta ficha.
  - Estructura de aluminio: sin dato en los catálogos. El catálogo de aluminio (`eduhg`) lista perfiles generales, pero no uno para techo.
  - Accesorios de policarbonato (API `categoria=Accesorios Para Policarbonatos`, proveedor corporacion_corrales):
    - Autoperforante cabeza hexagonal 12 mm x 1 1/2" c/arandela, código 03AU00300.
    - Autoperforante cabeza hexagonal 12 mm x 1" c/arandela, código 03AU00310.
    - Perfil U p/policarbonato 6 mm x 2.10 m, código 04B000062.
    - Perfil U p/policarbonato 8 mm x 2.10 m, código 04B000065.
    - Perfil F p/policarbonato 6-8-10 mm (base y tapa) 5.80 m, código 04BFL0105; 11.60 m, código 04BFL0110.
    - Perfil H p/policarbonato 6 mm x 5.80 m, código 04BFL0115; 8 mm x 5.80 m, código 04BFL0125; 8 mm x 11.60 m, código 04BFL0130.
    - Tornillos de eduhg (TOR8x1"CPPH, TOR8x1"CBPH, TOR8x1/2"CPPH): listados en la API de eduhg como herrajes de aluminio, sin indicación de uso en policarbonato.
- **Colores y espesores:**
  - POLYLITE Plus: color bronce, transmisión de luz 19%, espesores 6-8 mm (eduhg, ~líneas 1095-1100).
  - Otros colores de policarbonato: sin dato en los catálogos. La página 14 del catálogo ("Colores disponibles y accesorios") no se extrajo completa.
  - Los colores azul, rojo, blanco, grafito, negro, silver grey, champagne y madera (eduhg, ~líneas 889-983) corresponden a paneles de aluminio compuesto (Alucopac, núcleo de 4 mm), no a policarbonato. No usar para techo.
- **Fuentes:** eduhg ~líneas 1074-1104; API `categoria=Accesorios Para Policarbonatos`; API `proveedor=eduhg`.

### 2.2 Vidrio (tipos, colores y espesores)

- **Cómo lo llama el proveedor:** eduhg lo llama "VIDRIOS" con categorías numeradas: 01 Liso, 02 Catedrales, 03 Reflectivos, 04 Laminados, 05 Ácidos, 06 Espejos (`eduhg_base_conocimiento.md`, catálogo CATALOGO-DE-VIDRIO, ~líneas 492-625).
- **Liso (crudo o flotado):** colores incoloro, bronce, gris humo; espesores 2, 3, 4, 5, 5.6, 6, 8 y 10 mm (~líneas 508-516). El catálogo no dice que el liso sea "crudo"; ese nombre no aparece.
- **Catedral:** diseños llovizna, karatachi, flora, marihuana, cuadriculado y "otros diseños" (~líneas 524-531). Espesores y colores: sin dato en los catálogos.
- **Reflectivo:** colores bronce, light blue y azul oscuro (~líneas 551-555). Espesores: sin dato en los catálogos.
- **Laminado:** colores incoloro, bronce, milk/opal y acústicos (~líneas 579-585). Espesores 6.38, 8.38 y 10.38 mm (~línea 589).
- **Laminado (ficha técnica hpd_glass):** existe la ficha "Ficha-Tecnica-de-Vidrio-Laminado", 11 páginas (API). Su contenido no se leyó en esta tarea: sin dato en lo leído.
- **Templado (ficha hpd_glass):** existe "CC-E015-Ficha-Tecnica-Vidrio-Templado" (API y `hpd_glass_base_conocimiento.md` línea 14057). El tramo leído solo trae código, fecha y actualización; espesores y colores: sin dato en los catálogos leídos.
- **Insulado (ficha hpd_glass):** "CC-E016 Vidrio Insulado" (`hpd_glass_base_conocimiento.md` líneas 14076-14136). Descripción: dos o más hojas con cámara de aire y sellado hermético. Espaciador "super spacer" de 6.35, 9.53 y 12.7 mm; sellante de silicona estructural bicomponente. Vidrios de composición: laminados, templados o flotados/primario. Vidrios con recubrimiento a solicitud. Espesores de cada hoja y colores: sin dato en los catálogos.
- **Ácido:** espesor 4.6 mm; acabado translúcido (eduhg, ~líneas 595-601). Colores: sin dato.
- **Espejo (vidrio en eduhg):** ver ficha 2.3.
- **Crudo:** sin dato en los catálogos como término. Solo aparece "flotados/primario" en la ficha de insulado.
- **Fuentes:** eduhg ~líneas 492-625; hpd_glass líneas 14057-14136; API `proveedor=hpd_glass` (fichas CC-E015, CC-E016, ficha laminado).

### 2.3 Espejos

- **Cómo lo llama el proveedor:** eduhg lo llama "06 ESPEJOS", "Una solución funcional y decorativa para diferentes espacios" (~línea 607).
- **Espesores:** 2, 3 y 4 mm (eduhg, ~líneas 611-613).
- **Formas (cuadrado o rectangular):** sin dato en los catálogos.
- **Biselado:** sin dato en los catálogos. La búsqueda de "bisel" en hpd_glass no dio resultados.
- **Colores:** sin dato en los catálogos (un espejo de color no aparece).
- **hpd_glass:** la página "Espejos" del sitio (líneas 320-400 y 4088-4224 de `hpd_glass_base_conocimiento.md`) solo trae navegación y títulos; no hay fichas de producto. Sin dato.
- **Fuentes:** eduhg ~líneas 607-613.

### 2.4 Celosías de aluminio para ventilación

- **Cómo lo llama el proveedor:** sin dato en los catálogos como celosía de ventilación.
- **Menciones encontradas:**
  - eduhg índice de aluminio: "Cantoneras Zócalos y persianas" (página 61-62, ~línea 209). "Persiana" no está desarrollada en el catálogo leído.
  - hpd_glass: "Pasamanos - Celosías (Dimensiones en mm.)" (líneas 14914-14962 y 15689-15737) y "Tope celosía" (líneas 15106 y 15881). Por el título, parece una celosía de pasamanos o de barandas, no de ventilación. No se leyó el tramo completo: confianza baja.
- **Componentes, colores, espesores:** sin dato en los catálogos.
- **Fuentes:** eduhg ~línea 209; hpd_glass líneas 14914-14962 y 15106.

## 3. Dudas para el dueño

1. ¿El techo de policarbonato y "sol y sombra" lleva estructura de aluminio de algún proveedor? Ningún catálogo lo describe; hay que definir qué perfil y de quién.
2. ¿Qué colores de policarbonato se venden además del bronce? El catálogo de eduhg solo muestra bronce 19% y espesores 6-8 mm.
3. ¿Los accesorios de policarbonato (perfiles U, F, H y autoperforantes) se compran a corporacion_corrales o a eduhg? La API los asocia a corporacion_corrales.
4. ¿Qué espesor y color de vidrio liso y laminado se ofrece al cliente final? Hay listas de espesores en eduhg y fichas en hpd_glass sin desarrollar.
5. ¿El vidrio "crudo" del servicio corresponde al "liso" de eduhg o al "flotado" de hpd_glass?
6. ¿Los espejos se hacen con bisel? ¿Qué formas y medidas máximas? Ningún catálogo lo indica.
7. ¿La celosía de ventilación existe como producto? Si existe, falta el proveedor y la ficha técnica.
