# Sistemas de aluminio (ventanas, mamparas y puertas): catálogo unificado desde proveedores

Fecha de la investigación: 2026-11-13. Solo lectura de documentos locales; no se tocó código.

## Cómo leer este documento

- Fuentes: `docs/proveedores/corporacion_corrales_base_conocimiento.md` (Corrales, abreviado **COR**), `eduhg_base_conocimiento.md` (Eduhg, **EDU**) y `hpd_glass_base_conocimiento.md` (HPD, **HPD**). Los números son líneas aproximadas del archivo; cuando el documento indica página, se cita como "pág.".
- Consulta complementaria a la API local `/productos` (campos `proveedor`, `cod`, `descripcion`) solo para confirmar SKU y descripciones. El archivo de Gemini (`docs/gemini/data/proveedores/catalogo-proveedores-servicios.ts`) se usó solo como pista y se contradice con las fuentes en varios puntos (ver "Dudas").
- Los dibujos de perfiles de los catálogos son imágenes: en el texto extraído casi no hay códigos de perfil de Corrales. Los códigos de perfil solo aparecen en tablas de Eduhg (series 20, 25 y 35) y en las fichas de HPD. Donde falta, se escribe "sin dato en los catálogos".
- No se incluyen precios. Los porcentajes de ruido citados son los que el catálogo de Corrales dice textualmente, con su fuente.
- Códigos SKU de Corrales y Eduhg comparten la misma numeración "03xxxxxxx" (Eduhg revende el mismo universo de accesorios). Eso permite cruzar alias, pero hay discrepancias de descripción entre ambos (ver Dudas).

---

## 1. Tabla resumen

Servicio: slug propuesto. Confianza: alta = el sistema y su alias están descritos explícitamente en al menos un proveedor con ficha técnica; media = identidad clara pero equivalencia entre proveedores supuesta; baja = poca información o equivalencia solo por hipótesis.

| Sistema (nombre propuesto) | Servicio | Apertura | Alias por proveedor | Confianza |
|---|---|---|---|---|
| Serie 20 | ventana | Corrediza (doble corrediza, fijo-corrediza) | COR: "Serie 20 – Ventana Corrediza" (código 03xx0032x). EDU: "Serie Básica 20 – Ventana Corrediza". HPD: sin equivalente confirmado | Alta |
| Serie 25 | ventana y mampara | Corrediza | COR: "Serie 25 – Mampara y/o Ventana Corrediza". EDU: "Serie Básica 25 – Mampara corrediza". HPD: posible cercana MCO 042 / VCO 042 (hipótesis) | Alta (COR/EDU), baja (HPD) |
| Serie 28 (3142 / 3642) | ventana y mampara | Corrediza | COR: "Serie 28 (3142/3642)", escrito también "3412/3642" en la ficha. EDU y HPD: sin dato | Media |
| Serie 29 (3131 / 8131) | ventana | Corrediza económica | COR: "Serie 29 (3131/8131)". EDU: sin dato. HPD: posible cercana VCO 031 (hipótesis) | Media |
| Serie 3825 | ventana | Corrediza económica | COR: "Serie 3825 – Ventana Corrediza Económica". EDU: sin dato (aparece "Serie 3831" y "Serie 38" en accesorios, no 3825). HPD: sin dato | Media |
| Serie 7038 | mampara | Corrediza (doble y fijo-corrediza) | COR: "Serie 7038 – Mampara corrediza perimetral". EDU y HPD: sin dato | Media |
| Serie 62 (Europea corrediza perimetral) | ventana | Corrediza | COR: "Serie 62 – Europea Corrediza Perimetral". EDU: posible "Serie Europea VT-62 – Ventana corredera" (solo en el índice). HPD: sin dato | Media |
| Serie 80 (Europea corrediza perimetral) | mampara y ventana | Corrediza | COR: "Serie 80 – Europea Corrediza Perimetral". EDU: posible "Serie Europea MP-80 – Mampara corredera" (solo en el índice). HPD: sin dato | Media |
| Serie 3831 | ventana | Proyectante económica (con fijos) | COR: "Serie 3831 – Ventana Proyectante Económica". EDU: "Serie Básica 3831 – Ventana proyectante económica" (solo índice; accesorios sí en tabla). HPD: posible cercana VPR 036 (hipótesis) | Alta (COR/EDU) |
| Serie 42 | ventana | Proyectante (y fija) | COR: "Serie 42 – Ventana Proyectante". EDU: "Serie Básica 42 – Ventana proyectante" (índice y accesorios). HPD: posible cercana VPR 042 (hipótesis) | Alta (COR/EDU) |
| Serie 35 | puerta-aluminio | Batiente | COR: "Serie 35 – Puerta Batiente". EDU: "Serie Básica 35 – Puerta batiente" (con tabla de perfiles 3501 a 3503). HPD: posible cercana MBT 035 (hipótesis) | Alta (COR/EDU) |
| Serie 36 | puerta-aluminio y mampara | Batiente clásica, 2 a 4 hojas | COR: "Serie 36 – Puerta y Mampara Batiente Clásica". EDU: sin dato. HPD: posible cercana MBT 036 (hipótesis) | Media |
| Sistema Nova | ventana (corrediza modular) | Corrediza | COR: "Sistema Nova" (categoría de perfiles "Sistema Modular, Carpintería de Aluminio, Sistema Nova"; garruchas y seguros Nova). EDU y HPD: sin dato | Baja |
| Serie Europea VT-62 / MP-80 / PB-71 "Hermeti-K" | ventana, mampara, puerta-aluminio | Corrediza (VT-62, MP-80) y batiente (PB-71) | Solo en el índice de EDU (págs. 21 a 28). Sin contenido en la base de conocimiento | Baja |
| HPD VCO 031, VCO 036, VCO 042, VCO 043 | ventana | Corrediza | Nombre propio de HPD. Sin alias confirmado en otro proveedor | Alta como sistema propio de HPD; baja como equivalencia |
| HPD MCO 042, MCO 043, MCO 044 | mampara | Corrediza | Nombre propio de HPD | Alta (propio); baja (equivalencia) |
| HPD VPR 036, VPR 042 | ventana | Proyectante | Nombre propio de HPD | Alta (propio); baja (equivalencia) |
| HPD MBT 035, MBT 036 | mampara y puerta-aluminio | Batiente | Nombre propio de HPD | Alta (propio); baja (equivalencia) |
| Serie 45 (fuera de alcance: muro cortina) | muro-cortina | No aplica | COR: "Serie 45 – Muro cortina". EDU: "Serie Básica 45 – Muro cortina". HPD: Muro Cortina Stick (MCS-034) y Frame (MCF-034) | Alta |

Resumen de conteo: 12 sistemas de aluminio de ventana, mampara y puerta con ficha en Corrales/Eduhg (20, 25, 28, 29, 3825, 7038, 62, 80, 3831, 42, 35, 36), más Nova (solo accesorios), más 11 modelos propios de HPD, más la línea europea "Hermeti-K" (solo índice) y Serie 45 (muro cortina, otro servicio).

No se encontró ninguna Serie 80 / 3825 / 29 / 28 / 7038 / 62 / 36 / 45 en las páginas de HPD ni en el texto de Eduhg (más allá del índice).

---

## 2. Fichas por sistema

### 2.1 Serie 20

- Alias: COR "Serie 20 – Ventana Corrediza" (COR pág. 18 del catálogo de series, línea 25873; ficha propia `catalogo-serie20`, línea 26769). EDU "Serie Básica 20 – Ventana corrediza" (EDU línea 275 y tabla en 305 a 337, pág. 10 y 11 del catálogo). HPD: sin dato en los catálogos.
- Para qué sirve: carpintería corrediza funcional y económica para ventanas y mamparas pequeñas. COR dice "mayor hermeticidad por el perfil central del traslape", burletes de caucho extruido que permiten cambiar cristales dañados, perfiles tubulares en las naves, guía superior e inferior que evita desmontar las hojas desde el exterior.
- Medidas máximas recomendadas (COR, líneas 25890 y 26795): diseño CC/CF, ancho 0,95 m, alto 1,50 m (dimensiones de la hoja, altura máxima 70 m, 20 pisos).
- Diferencia con los demás: es la corrediza liviana de la familia (menor tamaño de hoja que Serie 25, 28 y 7038).
- Colores de perfil (COR): Mate (plata), Champagne, Blanco, Negro. EDU: negro mate anodizado (13 a 14 micras) y pintura electrostática "euro black" y "euro white" (50 a 70 micras), EDU líneas 281 a 291.
- Perfiles (EDU tabla fórmulas, líneas 313 a 321): 2001 riel superior; 2002 riel inferior; 2009 jamba (x2); 2004 zócalo superior de hoja (x2); 2005 zócalo inferior de hoja (x2); 2010 parante de hoja (x2); 2011 traslape (x2). COR: dibujo de perfiles (imagen), códigos sin dato en los catálogos.
- Accesorios (COR pág. 21, línea 25946; EDU líneas 328 a 336):
  - Garrucha armada Serie 20: SKU 03GA00321 (EDU y COR) y 03GI00321 (COR).
  - Guía superior 03 (Serie 20): SKU 03TA00034 (COR y EDU).
  - Cierre automático Fermax con llave: 03VP00137 (negro) y 03VP00136 (mate c/llave); sin llave: 03VP00034 según COR (ese SKU no aparece en la API de productos). Con placa: 03VP00133 (blanco), 03VP00134 (mate), 03VP00135 (negro), válidos para series 20, 25, 28 y 7038 (COR). EDU usa cierre automático MR625: 03CD00230 (mate), 03CD00231 (negro), 03CD00232 (blanco).
  - Seguro caracol de aluminio: 03SG00261 (negro) y 03SG00262 (mate), para series 20, 25 y 28 (COR). La ficha de Serie 20 en COR cita "03SG00262 (Gris)" y "03SG00260 (Negra)"; ver Dudas.
  - Felpa: especial F-10 (4 mm) 03CFB010N (negra) y 03CFB010P (gris) (COR); EDU usa "Felpa F-10 China" 03CF0010N / 03CF0010P. Cantidad EDU: 6 m (A) + 4 m (B).
  - Burlete EPDM negro para 4 mm: 03BU00007 (COR y EDU).
  - Tornillos: TOR8x1"CPPH (flat) y TOR8x1"CBPH (pan), 8 piezas cada uno (EDU).
  - Tapón de jebe negro Ø10 mm: 03TA01000 (COR; aparece en series 25, 28, 29 y 3825).
- Vidrio: espesor 4 mm (EDU: "VIDRIO 4MM", 2 piezas); COR: "Cristales de 4mm a más". Tipos de vidrio compatibles: sin dato específico por tipo (crudo, laminado, templado) en los catálogos de la serie.
- Fuente: COR líneas 25873 a 25985 y 26769 a 26845; EDU líneas 273 a 346.

### 2.2 Serie 25

- Alias: COR "Serie 25 – Mampara y/o Ventana Corrediza" (pág. 30, línea 26221; ficha `catalogo-serie25`, línea 26846). EDU "Serie Básica 25 – Mampara corrediza" (EDU líneas 350 a 407; páginas 12 y 13 del catálogo). HPD: ninguna ficha equivalente confirmada (hipótesis: MCO 042 y VCO 042 tienen sección 67,10 mm, cercana a la de 66 mm de COR; no está confirmado en ningún documento).
- Para qué sirve: sistema corredizo de alta resistencia para vanos mayores que Serie 20 (COR: "mampara corrediza de alta performance"). Sección de marco de 66 mm en dos carriles y espesor medio de perfiles de 1,20 mm (COR línea 26853 a 26858).
- Medidas máximas recomendadas (COR): CC/CF, ancho 1,50 m, alto 2,20 m (hoja, 70 m de altura, 20 pisos).
- Diferencia: es la corrediza intermedia, con riel de 66 mm; Serie 20 es más liviana y Serie 28 es más robusta pero con menor tamaño de hoja recomendado en COR (0,90 x 1,60 m).
- Colores: Mate, Champagne, Blanco, Negro (COR).
- Perfiles (EDU líneas 374 a 382): 2501 riel superior; 2502 riel inferior; 2509 jamba; 2504 zócalo superior de hoja; 2505 zócalo inferior de hoja; 2510 parante de hoja; 2507 traslape. COR: sin dato de códigos.
- Accesorios:
  - Garrucha armada Serie 25: SKU 03GA00322 (EDU y COR) y 03GI00322 (COR).
  - Guía superior/inferior 04 (Serie 25): SKU 03TA00035 (COR y EDU). La ficha COR rotula ese SKU como "Guía Superior 03 (Serie 20)" (COR línea 26300 aprox.); parece error de la ficha (ver Dudas).
  - Cierre automático Fermax: 03VP00137 / 03VP00034 (COR) o MR625 03CD00230 / 00231 / 00232 (EDU).
  - Felpa: COR ficha "03CF0030P Felpa sistral Negra o Gris"; la API lista "FELPA SYSTRAL P/SERIE 25 NEGRA/GRIS CHINA (5.5MM)": 03CF000SN y 03CF000SP. EDU: 03CF000SN (negro) y 03CF000SG (gris). Cantidad EDU: 6 m (A) + 4 m (B).
  - Chapa pico loro: 03CH00205 (COR). Jalador simple de nylon: 03AMJE40B (COR).
  - Seguro caracol: 03SG00260 (negra, según ficha), 03SG00261 / 03SG00262 (aluminio, para series 20/25/28).
  - Burlete EPDM: 03BU00008, descrito como "negro para 6 mm" por COR y como "negro para 3 mm" por EDU (ver Dudas).
  - Tapón de jebe 03TA01000 (COR).
- Vidrio: 6 mm (EDU: "VIDRIO 6MM", 2 piezas). COR no declara espesor en su ficha de Serie 25. Tipos de vidrio: sin dato.
- Fuente: COR líneas 26221 a 26341 y 26846 a 26898; EDU líneas 360 a 409.

### 2.3 Serie 28 (3142 / 3642)

- Alias: COR "Serie 28 (3142/3642)" (ficha dice "3412/3642" en un título; el resto del documento dice 3142). Las garruchas se rotulan "SERIE 3142/28". Páginas 14 a 17 del catálogo (COR línea 25765) y ficha `catalogo-serie28` (línea 26899). EDU y HPD: sin dato.
- Para qué sirve: ventana y mampara corrediza "robustez y elegancia del sistema": hermeticidad total para exteriores e interiores, desalojo de agua hacia el exterior, cierre lateral y central, rodamientos de nylon y guías plásticas. Guía superior e inferior (la ficha dice que evita el desmontaje desde el interior).
- Medidas máximas recomendadas (COR): CC/CF, ancho 0,90 m, alto 1,60 m (hoja). Diseños: FC / CC / CFC / FCCF.
- Diferencia: es una serie corrediza con garruchas específicas (de ventana y de mampara, alta y baja) y burlete de 6 mm. Su relación de tamaño con Serie 25 no es clara (ver Dudas).
- Perfiles: sin dato en los catálogos (solo imagen).
- Accesorios (COR pág. 17, línea 25805):
  - Garrucha de nylon para ventana: 03GI00284 (serie 3142/28) y 03GI00283 (serie 62/28/3142, de fierro).
  - Garrucha de nylon para mampara: 03GI00281 (reforzada con aguja, alta) y 03GI00282 (con aguja, baja).
  - Guía plástica superior 05: 03TA00037.
  - Cierre automático Fermax: 03VP00137 / 03VP00034 (COR) y la familia 03VP00133 a 03VP00137 (series 20, 25, 28, 7038).
  - Seguro caracol de aluminio: 03SG00261 / 03SG00262.
  - Felpa especial F-10 (4 mm): 03CFB010N / 03CFB010P.
  - Burlete EPDM negro 6 mm: 03BU00014. Tapón de jebe negro Ø10 mm: 03TA01000.
- Vidrio: "Acepta cristales de 6 mm a más" (COR).
- Fuente: COR líneas 25765 a 25872 y 26899 a 26947.

### 2.4 Serie 29 (3131 / 8131)

- Alias: COR "Serie 29 (3131/8131)" (págs. 26 a 29, línea 26130; ficha `catalogo-serie29`, línea 26948). Garrucha rotulada "SERIE 3131/8131/29". EDU: sin dato. HPD: hipótesis VCO 031 (económica, 37,60 mm); sin confirmación.
- Para qué sirve: ventana corrediza económica, funcional y hermética, para viviendas modulares, multifamiliares y programas de vivienda (COR línea 26132).
- Medidas máximas recomendadas (COR): FC/CC 0,75 x 1,40 m; CFC/FCCF 0,60 x 1,20 m.
- Perfiles: sin dato (imagen). Hay mención de tornillos "PH 8x1" y tarugo.
- Accesorios (COR pág. 29, línea 26185):
  - Rodamiento de 2 ruedas: 03GI00291 (garrucha imp. guía serie 3131/8131/29).
  - Guía superior e inferior: SKU 03TA00034 según la página de series; la API lista guía superior 06: 03TA00038 e inferior 07: 03TA00039. Conflicto interno (ver Dudas).
  - Seguro caracol de aluminio: 03SG00260 (negro), 03SG00262 (aluminio).
  - Burlete EPDM negro 4 mm: 03BU00015.
  - Felpa especial F-10 (4 mm): 03CFB010N / 03CFB010P. Tapón 03TA01000.
- Vidrio: 4 mm (COR: "Cristales de 4mm").
- Fuente: COR líneas 26130 a 26220 y 26948 a 27001.

### 2.5 Serie 3825

- Alias: COR "Serie 3825 – Ventana Corrediza Económica" (índice de COR "43 Serie 3825"; págs. 22 a 25 del catálogo, línea 25986; ficha `catalogo-serie-3825`, línea 26721). EDU y HPD: sin dato. La ficha de EDU menciona "Serie 38" solo en escuadras expansivas (ver Dudas).
- Para qué sirve: sistema corredizo económico para edificaciones de mediana altura (COR). Puede armarse con riel doble (doble corrediza) o riel sencillo (fijo-corrediza) con perfiles horizontales más pequeños en la nave fija. Desalojo de agua con alféizar de alfajía incorporada. Cierre caracol Fermax; la guía superior e inferior evita desmontar hojas desde el exterior.
- Medidas máximas recomendadas (COR): FC/CC 0,90 x 1,40 m; CFC/FCCF 0,40 x 1,25 m. Otra tabla de la misma ficha (línea 26130 aprox., bajo "Funcional, Práctica, Hermética y Económica") da 0,75 x 1,40 m y 0,60 x 1,20 m, que corresponden más bien a la Serie 29 (ver Dudas).
- Perfiles (COR, imagen con códigos de dibujo 2622, 2623, 2628): 2622, 2623 y 2628 aparecen como perfiles en el despiece, "Burlete BU-1" y "Felpa Burlete BU-1". Función de cada código: sin dato en los catálogos.
- Accesorios (COR pág. 25, línea 26082):
  - Rodamiento 2 ruedas: 03GI03825 / 03GA03825 (garrucha doble nylon Serie 3825).
  - Guía inferior 01: 03TA00032. Guía superior 02: 03TA00033.
  - Seguro caracol derecho con placa: 03SG00260.
  - Burlete negro 4 mm: 03BU00001.
  - Felpa especial F-10 (4 mm): 03CFB010N / 03CFB010P. Tapón 03TA01000.
- Vidrio: 3 y 4 mm (COR línea 25997); "Cristales de 4mm" en la lista de accesorios.
- Fuente: COR líneas 25986 a 26129 y 26721 a 26768.

### 2.6 Serie 7038

- Alias: COR "Serie 7038 – Mampara corrediza perimetral" (página `mampara-corrediza-perimetral-serie7038`, línea 2331, solo navegación; ficha `catalogo-serie7038`, línea 27323). EDU y HPD: sin dato.
- Para qué sirve: carpintería corrediza para mamparas "estéticas y duraderas": doble corrediza o fijo-corrediza, perfiles tubulares en las naves, hermética con burletes y felpas (COR).
- Medidas máximas recomendadas (COR línea 27340 aprox.): fijos 2,00 x 2,80 m; corredizos 2,00 x 2,80 m.
- Diferencia: es la mampara corrediza de mayor tamaño de hoja entre las series de COR (junto con Serie 80: 1,50 x 3,00 m). Usa garrucha pesada doble con aguja.
- Perfiles: sin dato en los catálogos.
- Accesorios (API y fichas COR):
  - Garrucha imp. pesada doble c/aguja: 03GI07038 / 03GA00345.
  - Guía superior 08: 03TA00040.
  - Cierre automático Fermax: 03VP00133 a 03VP00137 (series 20, 25, 28, 7038).
  - Burlete negro 6 mm: 03BU00016.
- Vidrio: sin dato de espesor en los catálogos.
- Fuente: COR líneas 27323 a 27364; accesorios en API de productos.

### 2.7 Serie 62 (Europea corrediza perimetral)

- Alias: COR "Serie 62 – Europea Corrediza Perimetral" (págs. 2 a 5 del catálogo de series, línea 25447; ficha `catalogo-serie62`, línea 27249; página `europea-corrediza-perimetral-serie62`, línea 1980). EDU: posible equivalente "Serie Europea VT-62 – Ventana corredera" (índice EDU línea 182, pág. 23; sin contenido). HPD: sin dato.
- Para qué sirve: ventana corrediza de diseño europeo moderno, silenciosa, de alto desempeño. COR: espesor de carpintería 1,3 mm, resistencia de carga por rueda de 20 y 50 kg, cierre embutido, sección de marco doble 100 mm, hojas limpias con junquillos, mínimo mantenimiento. Altura de marco de hoja 80 mm (ficha).
- Medidas máximas recomendadas (COR): CC/FC/CFC/CCCC/FCCF, ancho 1,30 m, alto 2,30 m.
- Colores: Mate, Blanco, Negro (catálogo de series) o Blanco, Plata, Negro (ficha).
- Perfiles: sin dato de códigos. Esquinero de unión chico: 03TA00400 ("escuadra de alineamiento"); la API muestra esquineros 03TA00100 (para 6019, 6020, 6025), 03TA00200 (para 6040, 6045) y 03TA00300 (para 6145), cuya relación con Serie 62/80 no se declara.
- Accesorios (COR pág. 5, línea 25523):
  - Garrucha de nylon: 03GI00283.
  - Cierre automático Fermax: 03VP00137 (con llave) / 03VP00034 (sin llave); cierre automático roto: 03FE00016 (mate) y 03FE00017 (blanco), "serie 80 y 62".
  - Set de calzos + kit multipunto + cremona 40, 60 u 80 cm: 03FE00013, 03FE00014, 03FE00015.
  - Felpa F-15 negra 03CF0015N o gris 03CF0015P.
  - Burlete EPDM cuña 6 mm: 03BU00021; 8 mm: 03BU00022.
  - Manijas "serie 80 y 62": negro 03FE00020, blanca 03FE00004, marrón 03FE00006 (roto-Fermax).
  - Esquinero de unión chico: 03TA00400.
- Vidrio: dos versiones del mismo documento: "Cristales de 4mm a más" (accesorios, pág. 5) y "trabaja con vidrios de 6 y 8 mm" (ficha de Serie 62). Ver Dudas.
- Fuente: COR líneas 25447 a 25562 y 27249 a 27322.

### 2.8 Serie 80 (Europea corrediza perimetral)

- Alias: COR "Serie 80 – Europea Corrediza Perimetral" (págs. 10 a 13, línea 25661; ficha `catalogo-serie80`, línea 27365; página web línea 2034). EDU: posible "Serie Europea MP-80 – Mampara corredera" (índice, pág. 25). HPD: sin dato.
- Para qué sirve: corrediza europea, "deslizamiento silencioso, fácil operación, completamente hermético". COR: "vidrios de 6 y 8 mm", altura de marco de hoja 80 mm. Perfiles de marco 80501 (marco doble corrediza), 80503 (marco de hoja) según el despiece de la ficha (línea 27380 aprox.).
- Medidas máximas recomendadas (COR): CC/FC/FCCFF, ancho 1,50 m, alto 3,00 m.
- Colores: Mate, Blanco, Negro.
- Perfiles (despiece en texto de la ficha): 80501 marco doble corrediza; 80503 marco de hoja; además se nombran ángulo, escuadra, guía sup/inf, manija R-Line, cremona 600 natural, felpa F-15.
- Accesorios (COR pág. 13, línea 25721):
  - Garrucha serie 80 Pabose: 03GA00181 / 03GI00080; garrucha doble de nylon: 03GI00081.
  - Guía plástica (serie 80): 03TA00041.
  - Cierre automático: 03VP00137 / 03VP00034; roto: 03FE00016 / 03FE00017.
  - Set calzos + kit multipunto + cremona natural 40, 60, 80: 03FE00013 a 03FE00015.
  - Felpa F-15: 03CF0015N / 03CF0015P.
  - Burlete EPDM para vidrio de 6 mm: 03BU00021 (y 03BU00022 de 8 mm).
  - Esquinero de unión chico: 03TA00400.
  - Manijas Serie 80 roto-Fermax: blanca 03FE00004, mate 03FE00005, marrón 03FE00006, negra 03FE00020.
- Vidrio: 6 y 8 mm.
- Fuente: COR líneas 25661 a 25764 y 27365 a 27400.

### 2.9 Serie 3831

- Alias: COR "Serie 3831 – Ventana Proyectante Económica" (págs. 38 a 41, línea 26453; ficha `catalogo-serie3831`, línea 27111). EDU "Serie Básica 3831 – Ventana proyectante económica" (índice, pág. 14; los accesorios sí están en tabla EDU). HPD: hipótesis VPR 036 o 042; sin confirmación.
- Para qué sirve: ventana proyectante económica, hermética por burlete de doble contacto en todo el perímetro, buen desempeño ante viento, operación silenciosa, amplia gama de junquillos y portajunquillos para vidrio monolítico y laminado, combina cuerpos fijos y móviles. COR: "si se usa cristal laminado con PVB puede atenuar hasta un 60% el ruido" (COR línea 26482 y 27124; es afirmación del proveedor, no medición propia).
- Medidas máximas recomendadas (COR): fijos 1,10 x 1,40 m; proyectantes 0,45 x 1,30 m (altura máxima 35 m, 10 pisos).
- Diferencia con Serie 42: Serie 3831 es la proyectante económica, con hoja proyectante más pequeña (0,45 x 1,30 m frente a 1,00 x 1,30 m de la Serie 42).
- Colores: Mate, Champagne, Negro (catálogo de series).
- Perfiles: sin dato de códigos.
- Accesorios (COR pág. 41, línea 26510; EDU):
  - Brazos de extensión de aluminio 40, 60 y 95 cm (Fermax) en mate, negro y champagne: 40 cm 03VP00010 (mate), 03VP00011 (negro), 03VP00043 (champagne); 60 cm 03VP00003, 03VP00004, 03VP00044; 95 cm 03VP00005, 03VP00006, 03VP00045.
  - Brazo proyectante de acero inoxidable 12" (03VP00008) y 24" (03VP00009); la ficha cita también 20", sin SKU en la API.
  - Manijas Fermax para proyectantes: derechas 03VP00001 (mate), 03VP00002 (negro), 03VP00015 (blanco), 03VP00042 (champagne); izquierdas 03VP00020 (negro), 03VP00021 (mate); con llave 03VP00038 (mate), 03VP00039 (negro).
  - Burletes: base negro 03BU00003 (series 3831 y 42), cuña negro 4 mm 03BU00004, doble contacto negro 03BU00005 (series 3831, 42 y 45), doble contacto transparente 03BU00011.
  - Cinta Norton 03CF00014 y 03CF00054 (sin descripción en la API).
- Vidrio: 4 mm en la lista de accesorios; admite monolítico y laminado (COR).
- Fuente: COR líneas 26453 a 26549 y 27111 a 27151; EDU líneas 410 a 440 (tabla de SKU líneas 1095 a 1168).

### 2.10 Serie 42

- Alias: COR "Serie 42 – Ventana Proyectante" (págs. 42 a 44, línea 26550; ficha `catalogo-serie42`, línea 27152). EDU "Serie Básica 42 – Ventana proyectante" (índice pág. 16; accesorios en tabla). HPD: hipótesis VPR 042; sin confirmación.
- Para qué sirve: proyectante hermética de alta performance para grandes dimensiones y pesos, con burlete de doble contacto en todo el perímetro; admite vidrio monolítico laminado y termopaneles. COR repite el texto de "atenuar hasta un 60% el ruido con cristal laminado PVB" (línea 26566 y 27163).
- Medidas máximas recomendadas (COR): proyectante 1,00 x 1,30 m (altura máxima 35 m, 10 pisos).
- Variantes del despiece: ventana fija y proyectante con aluminio expuesto, y con aluminio no expuesto (COR pág. 44).
- Colores: Mate, Champagne, Blanco, Negro.
- Perfiles: sin dato de códigos.
- Accesorios:
  - Los mismos brazos y manijas de la Serie 3831 (SKU arriba) más manijas "especiales" de Serie 42: 03VP00040 (mate) y 03VP00041 (negro).
  - Burlete cuña negro 6 mm Serie 42: 03BU00010 (COR y EDU). Burlete base negro 03BU00003 y doble contacto 03BU00005 / 03BU00011 (COR).
  - EDU adicionales: "burlete EPDM burbuja nave (Serie 42)" 03BU00100 (ver Dudas); brazo de extensión DA35/14-900 plata 03VP00404; conjunto manilla 6625/90 FRA323C400/55 plata/negro/blanco 03VP00412, 03VP00411, 03VP00420 (EDU línea 1150 aprox.; a qué serie corresponden no se indica).
- Vidrio: monolítico, laminado y termopanel (COR); espesor específico: sin dato en los catálogos.
- Fuente: COR líneas 26550 a 26620 y 27152 a 27211; EDU líneas 1095 a 1168.

### 2.11 Serie 35 (puerta batiente)

- Alias: COR "Serie 35 – Puerta Batiente" (págs. 34 a 37, línea 26342; ficha `catalogo-serie35`, línea 27002). EDU "Serie Básica 35 – Puerta batiente" (EDU líneas 411 a 486, pág. 14 y 15 del catálogo). HPD: hipótesis MBT 035; sin confirmación.
- Para qué sirve: puerta batiente "de gran firmeza y duración", hermética por felpa en todo el perímetro, bisagra de aluminio, perfiles fáciles de ensamblar. Versátil: distintos perfiles permiten diferentes diseños.
- Medidas máximas recomendadas (COR): batiente 0,80 m de ancho x 2,10 m de alto.
- Colores: Mate, Champagne, Blanco (COR).
- Perfiles (EDU líneas 479 a 486, puerta batiente de apertura exterior): 3502 marco (con cortes a 45° y 90°); 3501 bastidor; 3503 junquillo; 3511 escuadra de armado (EDU línea 459). COR: sin dato de códigos.
- Accesorios (COR pág. 37, línea 26407; EDU):
  - Chapa Serie 35: 03VP00053 (mate), 03VP00054 (blanco), 03VP00055 (negro); además 03VP00007 (chapa serie 35/62 mate).
  - Bisagra Serie 35: 03BS00035 (mate), 03BS00038 (blanco), 03BS00036 (negro), 03BS00037 (champagne). EDU: cuatro piezas por puerta.
  - Felpa F-10 negra 03CF0010N o gris 03CF0010P.
  - Picaporte para empotrar 10" (Serie 35): 03CD00035.
  - Burlete cuña negro 4 mm: 03BU00003 según EDU (la API de COR lo describe como "base negro Serie 3831-42"; ver Dudas). Cantidad EDU: 8 m (A) + 4 m (B).
- Vidrio: 4 mm ("Cristales de 4mm", COR).
- Fuente: COR líneas 26342 a 26452 y 27002 a 27038; EDU líneas 411 a 486.

### 2.12 Serie 36 (puerta y mampara batiente clásica)

- Alias: COR "Serie 36 – Puerta y Mampara Batiente Clásica" (págs. 6 a 9, línea 25563; ficha `catalogo-serie36`, línea 27039). EDU y HPD: sin dato (hipótesis HPD MBT 036, sección 80 mm).
- Para qué sirve: perfiles multifuncionales que permiten puertas y mamparas de 2 a 4 hojas, bordes redondeados, resistentes a la intemperie, interior y exterior.
- Medidas máximas recomendadas (COR): batiente 1,00 x 2,40 m (altura máxima 15 m, 5 pisos).
- Colores: Plata, Negro (ficha); Mate y Negro (catálogo de series).
- Perfiles: sin dato de códigos (hay referencia a "platina").
- Accesorios (COR pág. 9, línea 25629):
  - Chapa Serie 35 (mate, negro, blanco): 03VP00053 / 03VP00054 / 03VP00055.
  - Bisagra capuchina 4"x4": 03BS00040 (SKU no hallado en la API).
  - Burlete EPDM: 03BU00023, descrito en la API como "negro 6 mm (Serie 3736)".
  - Felpa F-10 negra 03CF0010N o gris 03CF0010P.
  - Picaporte para empotrar 10".
- Vidrio: "Permite vidrios de 6 mm" (COR).
- Fuente: COR líneas 25563 a 25660 y 27039 a 27110.

### 2.13 Sistema Nova

- Alias: COR "Sistema Nova" y "Sistema Modular, Carpintería de Aluminio, Sistema Nova" como categoría de perfiles (COR líneas 23494 y 24211); en el índice del catálogo Coviaco aparece "17 Sistema Nova" dentro de "Perfiles pesados para obras" (COR línea 24021). EDU y HPD: sin dato.
- Para qué sirve: no hay ficha descriptiva en los catálogos; el texto extraído no dice qué tipo de apertura ni vidrio lleva. Por los accesorios (garruchas, rueda, seguros) es un sistema corredizo. Gemini lo rotula "Cristal Templado": no está respaldado por las fuentes.
- Perfiles: sin dato en los catálogos.
- Accesorios (COR, página 17 del catálogo de accesorios, línea 23745 "RODAMIENTOS Y GARRUCHAS: NOVA RI-11"):
  - Garrucha imp. Nova simple aluminio: 03GI00335 / 03GA00335; simple fierro: 03GI00336 / 03GA00336.
  - Garrucha imp. Nova doble aluminio: 03GI00339 / 03GA00339; doble fierro: 03GI00340.
  - Rueda imp. Nova Rodattech: 03RI00011 (RI-11).
  - Seguros Nova: 03SG00001 (negro, pasante horizontal), 03SG00002 (mate, pasante horizontal), 03SG00003 (negro con aleta), 03SG00004 (mate con aleta), 03SG00005 (madera con aleta).
  - Cierre automático "MR625 Nova" (EDU 03CD00230): la asociación con Nova viene solo de Gemini; en EDU el MR625 aparece dentro de la Serie 20.
- Vidrio: sin dato en los catálogos.
- Fuente: COR líneas 22308, 22380 a 22404, 22884 a 22946, 23494, 23745 a 23830, 24021.

### 2.14 Línea europea "Hermeti-K" (solo índice de Eduhg)

- Alias: EDU "HERMETI-K – Ventanas termoacústicas, Serie Europea": VT-62 ventana corredera (pág. 23), MP-80 mampara corredera (pág. 25), PB-71 puerta batiente (pág. 28). El contenido de esas páginas no está en la base de conocimiento (el texto se corta en la pág. 15, línea 486).
- Para qué sirve, perfiles, accesorios, vidrio: sin dato en los catálogos. No se afirma que VT-62 sea la Serie 62 de Corrales ni MP-80 la Serie 80; solo coinciden los números (ver Dudas).
- Fuente: EDU líneas 179 a 184.

### 2.15 Sistemas propios de HPD (VCO, MCO, VPR, MBT)

HPD no usa "Serie N": nombra por tipo y código. Datos de fichas técnicas (HPD líneas 16389 a 17990). Aluminio AA-6063 T5 (ficha CC-E019/CC-E020, líneas 14155 a 14260). Colores de aluminio en cada ficha: negro y titanio; otros acabados a consulta; la ficha general añade blanco y natural.

| Modelo | Servicio | Sección | Datos clave de la ficha | Perfiles nombrados |
|---|---|---|---|---|
| VCO 031 | ventana corrediza | 37,60 mm | económica, viviendas modulares y multifamiliares; felpas arriba y abajo para controlar la vibración de las hojas | 03101 marco superior doble corrediza; 03102 marco superior corrediza-fija; 03103 marco inferior doble corrediza; 03104 marco inferior corrediza-fija; 03107 marco de hoja superior e inferior; 03108 marco de hoja encuentro; 03109 marco de hoja lateral; 03111 marco de hoja fijo; 03113 traslape |
| VCO 036 | ventana corrediza | 63,00 mm | hojas mayores, EPDM para vidrio de 4 y 6 mm, riel inferior inclinado para desalojar agua | 03601 marco superior; 03602 marco inferior; 03604 y 03608 (adaptador de hoja); 03610 marco de hoja lateral |
| VCO 042 | ventana corrediza | 67,10 mm | garruchas con billas de acero, EPDM para vidrio de 6 mm | 04201 marco superior; 04202 marco inferior; 04206 marco de hoja lateral; 04208 traslape inferior; 04209 marco de hoja superior; 04210 marco de hoja |
| VCO 043 | ventana corrediza | 60,00 mm | marcos para vidrio monolítico e insulado, accesorios de ensamble; corrediza-corrediza-corrediza | marco doble corrediza (código no legible en el texto) |
| MCO 042 | mampara corrediza | 67,10 mm | igual de texto que VCO 042; diseños fija, fija-corrediza, doble corrediza hasta fija-corrediza-corrediza-fija | 04201 marco superior; 04202 marco inferior; 04205 marco lateral; 04206 marco de hoja lateral; 04208 traslape; 04209 marco de hoja superior; 04211 marco de hoja inferior reforzada; 04214 traslape reforzado; 04215 riel inferior; 04216 traslape rectangular reforzado; 04217 perfil adaptador de hoja |
| MCO 043 | mampara corrediza | 90,00 mm | robusta y hermética, vidrio monolítico e insulado, accesorios de ensamble | 04301 marco doble corrediza; 04302 marco de hoja; 04303 traslape; 04304 adaptador marco triple corrediza; 04305 marco de hoja para 10-8 mm |
| MCO 044 | mampara corrediza | 109,80 mm | hojas de grandes dimensiones, EPDM para vidrio de 6 u 8 mm | 04401 marco inferior; 04404 marco de hoja lateral; 04440 adaptador |
| VPR 036 | ventana proyectante | 49,20 mm | hermética; vidrio de 6 mm hasta insulado de 24 mm; brazos de proyección y manija; edificios, hospitales, oficinas | 03601 marco; 03602 contramarco; 03603 travesaño; 03604 junquillo; 03605 contramarco para muro cortina; 03606 junquillo para insulado |
| VPR 042 | ventana proyectante | 49,20 mm | mismo texto que VPR 036 | 04201 marco; 04202 marco de hoja; 04203 junquillo; 04204 junquillo para insulado |
| MBT 035 | mampara batiente | 41,30 mm | junquillos inclinados a 45° que sujetan el cristal por ambos lados; para vanos de poco espesor; EPDM | 03501 marco de hoja pesada; 03502 marco de puerta; 03506 tapa; 03507 tapa con portafelpa; 03508 marco de hoja liviana; 03509 tope con portafelpa; 03510 soporte de armado |
| MBT 036 | mampara batiente | 80,00 mm | bordes redondeados; vidrio de 6 mm hasta insulado de 20 mm; EPDM | 03601 marco simple; 03604 montante de hoja pesada; 03606 junquillo para insulado; 03608 junquillo; 03609 adaptador cristal simple; 03610 tope central |

- Accesorios con SKU de HPD: sin dato en los catálogos (las fichas citan garruchas con billas de acero, felpas, burletes EPDM, brazos y manija, pero sin código).
- Ficha general HPD (CC-E019, línea 14155): ventanas VCO 031, 036, 042, 043 y VPR 036; mamparas MCO 042, 043, MBT 036 y MBT 035 (MCO 044 y VPR 042 tienen ficha propia aunque no figuran en esa lista).
- Aviso de calidad del texto: los códigos "VCO 036 / VPR 036 / MBT 036 / 03601..." se repiten entre modelos; la extracción de HPD mezcla prefijos MCO/VCO en las tablas de MCO 042 y VCO 042 (por ejemplo "VCO 04202" dentro de la mampara). Conviene confirmar contra el PDF original antes de cargarlos como datos.

---

## 3. Dudas para el dueño

Equivalencias que parecen iguales pero no se pueden confirmar:

1. **HPD vs. Corrales/Eduhg.** Ningún documento dice que VCO/MCO/VPR/MBT de HPD equivalgan a Serie 20/25/35/42. Solo coinciden números en los nombres (MBT 035 y Serie 35, VPR 042 y Serie 42, MBT 036 y Serie 36, VCO/MCO 042 y la sección de 66 mm de la Serie 25). Si el taller quiere tratarlos como un mismo sistema, hay que validarlo con HPD y con muestras de perfil (sección en mm, vidrio admitido, garruchas).
2. **Eduhg "Serie Europea VT-62 / MP-80 / PB-71 (Hermeti-K, termoacústica)" frente a Corrales "Serie 62 / Serie 80".** Solo el índice de Eduhg los nombra; no se sabe si son la misma extrusión europea que Corrales (Serie 62 y 80) o una línea distinta con sello termoacústico. Falta pedir ese catálogo a Eduhg.
3. **Sistema Nova.** Solo hay accesorios (garruchas, rueda RI-11, seguros). No hay ficha ni medidas ni vidrio. El archivo de Gemini lo describe como "cristal templado" y no hay respaldo; hay que preguntar a Corrales qué es (corrediza modular, sin marco, etc.) y qué perfiles lleva.
4. **Serie 25 y Serie 28.** Ambas son corredizas de ventana y mampara. Corrales da mayor tamaño de hoja a la 25 (1,50 x 2,20 m) que a la 28 (0,90 x 1,60 m), pero llama a la 28 "robusta". Aclarar cuál se vende para qué tamaño de vano.
5. **Serie 3825 vs. Serie 29.** La ficha de 3825 en Corrales incluye una tabla de medidas (0,75 x 1,40 y 0,60 x 1,20 m) que coincide con la Serie 29; las medidas propias de 3825 son 0,90 x 1,40 y 0,40 x 1,25 m. Parece mezcla de páginas. Confirmar con Corrales.
6. **Serie 36 y "Serie 3736".** El burlete 03BU00023 se llama "Serie 3736" en la API pero la ficha de Serie 36 lo usa; es probable que 3736 sea el código de extrusión de la Serie 36, pero el catálogo no lo dice.
7. **Eduhg "Serie 38".** Las escuadras expansivas 03EE00173 / 03EE00176 se rotulan "Serie 38"; no hay ficha. Puede referirse a 3825 o 3831; sin dato en los catálogos.

Discrepancias de datos entre proveedores o dentro del mismo documento:

8. **Burlete 03BU00008:** COR "negro 6 mm Serie 25"; EDU "negro 3 mm" (usado con vidrio 6 mm de Serie 25). Parece error de rotulado; verificar.
9. **Burlete 03BU00003:** COR "base negro (Serie 3831 y 42)"; EDU "cuña negro 4 mm (Serie 35)".
10. **Burlete 03BU00100:** EDU "EPDM burbuja nave (Serie 42)"; COR "perfil de hermeticidad aleta lateral rígida 8 mm / 2,50 m".
11. **Guía de Serie 25 (03TA00035):** COR la rotula "Guía Superior 03 (Serie 20)" en la ficha, EDU "Guía sup/inf 04 (Serie 25)" y la API de COR "Guía superior e inferior 04 (Serie 25)". Se tomó la versión de EDU y de la API.
12. **Guías de Serie 29:** la página dice SKU 03TA00034 (que es de Serie 20); la API lista 03TA00038 (superior 06) y 03TA00039 (inferior 07).
13. **Cierre automático "sin llave" 03VP00034:** aparece en las fichas de COR pero no en la API de productos. Los demás cierres Fermax tienen SKU 03VP00133 a 03VP00137 (con y sin llave, con placa). Bisagra capuchina 03BS00040 (Serie 36), Cinta Norton 03CF00014/03CF00054 y esquinero 03TA00400 tampoco están en la API.
14. **Seguro caracol:** la ficha de Serie 20 cita "03SG00262 (Gris)" y "03SG00260 (Negra)", mientras la API dice 03SG00261 negro y 03SG00262 mate; 03SG00260 es "derecho con placa (Serie 3825)".
15. **Vidrio de Serie 62:** COR dice "4 mm a más" en una página y "6 y 8 mm" en otra.
16. **Serie 28:** el título de la ficha dice "3412/3642" y el resto "3142/3642".

Datos que faltan para armar el catálogo:

17. Espesores de vidrio y tipos (crudo, laminado, templado) por sistema: solo Series 20, 25, 3825, 28, 29, 35, 36, 62, 80, VCO y VPR dan un espesor; ninguna ficha de serie indica el tipo de vidrio (laminado o templado) salvo menciones sueltas (3831 y 42 admiten laminado y termopanel; HPD admite insulado).
18. Códigos de perfil de Corrales por serie (están en imágenes): pedirlos o extraerlos del PDF original. Solo Eduhg trae códigos de perfil de Series 20, 25 y 35, y la tabla de Serie 35 está cortada en 3503.
19. Garruchas, felpas y burletes de HPD: sin SKU en sus fichas.
20. Peso del perfil y espesor de pared: solo se cita 1,3 mm (Serie 62) y 1,20 mm medio (Serie 25) en Corrales; el resto, sin dato en los catálogos.
21. Reducción de ruido: Corrales dice "hasta un 60%" con cristal laminado PVB en Series 3831 y 42; es afirmación del proveedor y el propio archivo de marca pide confirmar este tipo de cifras antes de publicarlas. No se usa en este catálogo.
22. Series 28, 29, 3825, 7038, 62, 80 y 36: se confirmó que Corrales las vende; falta saber si el taller las ofrece al cliente final o solo Serie 20, 25, 35, 42 y 3831 (las que Eduhg también atiende).
