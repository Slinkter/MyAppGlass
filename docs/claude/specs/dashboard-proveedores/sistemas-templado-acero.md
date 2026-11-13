# Sistemas de vidrio templado y acero inoxidable

Fecha de la investigación: 2026-11-13. Sin precios ni garantías.

Fuentes:
- Corrales (`docs/proveedores/corporacion_corrales_base_conocimiento.md`, abreviado COR). Sección PDF "Kit box y accesorios para ducha" en líneas 22742-22800 y "Accesorios para cristales templados" y "Frenos hidráulicos" en 22130-22275. Listado SKU en 27590-28030.
- API local `http://localhost:8000/productos?categoria=...`, categorías: "Kit Box - Accesorios" (13), "Frenos De Piso" (8), "Accesorios Para Templado" (18), "Bridas Y Canoplas" (33), "Jaladores Y Tiradores" (8), "Chapas Para Puertas Y Vitrinas" (12). Todos los resultados son de `corporacion_corrales`.
- Favitem (`docs/proveedores/favitem_base_conocimiento.md`, 202 líneas): solo menú web, sin SKU, sin fichas técnicas.
- Contexto del dueño: `docs/claude/tareas.md` línea 1.
- Pista no fiable: `docs/gemini/data/proveedores/catalogo-proveedores-servicios.ts`. No se usó como dato.

Hallazgo general: los catálogos tienen accesorios sueltos, no sistemas armados. Ninguno nombra "sistema europeo", "sistema español", "parapeto", "baranda de acero", "spider" ni "zócalo" de puerta de vidrio (el único zócalo es de cerrojo). Favitem lista categorías (Accesorios para vidrio, Accesorios para baranda, Kit de puerta de ducha, Jaladores, Cerraduras, Freno hidraúlico) pero sin productos.

## 1. Tabla resumen

| Sistema (nombre propuesto) | Servicio (slug) | Cómo lo llama cada proveedor | Confianza |
|---|---|---|---|
| Kit de 1 hoja (puerta frontal 1 fija + 1 corrediza) | ducha | COR: "KIT BOX F1 FRONTAL (1F/1C)" 03KB00110 y 03KB00120. Favitem: categoría "Kit de puerta de ducha" (sin productos) | media |
| Kit corredizo (2 hojas corredizas) | ducha | COR: "KIT BOX IMP. P2 FRONTAL (2C)" 03KB00050; también "F3 FRONTAL (2F/2C)" 03KB00130. Favitem: sin dato | baja |
| Kit esquinero | ducha | COR: "KIT BOX C1 ESQUINERO (2F/2C)" 03KB00140 y 03KB00141. No figura entre los 4 del dueño | media (existe, falta confirmar si es uno de los 4) |
| Sistema europeo | ducha | Sin dato en los catálogos. "Europea" en COR solo aparece en ventanas (Serie 62 y 80 Europea Corrediza Perimetral) | baja |
| Sistema español | ducha | Sin dato en los catálogos | baja |
| Parapeto (versión económica aluminio / versión acero inoxidable) | parapeto | Ningún proveedor usa la palabra "parapeto". COR tiene perfil "Pasamanos y Barandas" (solo índice del catálogo Coviaco) y tubos, bridas y canoplas. Favitem: "Accesorios para baranda" (sin productos) | baja |
| Baranda de acero inoxidable (solo acero / acero con vidrio) | baranda | COR: "BRIDA", "CODO", "TEE", "PASANTE", "TERMINAL", "CANOPLA" (categoría "Bridas Y Canoplas"). Favitem: "Accesorios para baranda", "Accesorios para vidrio" | media (piezas confirmadas; no hay modelos armados) |
| Balcón de aluminio y vidrio | baranda (u otro) | Sin dato propio en los catálogos. Solo el índice "Pasamanos y Barandas" de perfiles de aluminio | baja |
| Puerta de vidrio templado (pivotante) | puerta-vidrio | COR: "ACCESORIOS PARA CRISTALES TEMPLADOS": pivotante, base de rotación, bisagra, cerrojo PIC-615, jalador circular. Favitem: "Accesorios para vidrio" | media |
| Freno hidráulico de piso Sevax | frenos-hidraulicos | COR: "FRENO HIDRÁULICO SEVAX TSA" (03FR00005) y "SEVAX MINOS" (03FR0006M). Favitem: "Freno hidraúlico" (sin productos) | alta |
| Freno hidráulico de piso Dorma | frenos-hidraulicos | COR: "FRENO DORMA REFORZADO BTS-75R" (03FR00121) | alta |
| Fachada con arañas (spider) | fachada-spider | Sin dato en COR (0 resultados de "spider" y "araña"). Favitem: sin dato | baja (no aparece) |

## 2. Fichas por sistema

### 2.1 Ducha: kits de puerta y box

Categoría API "Kit Box - Accesorios" (13 productos). COR líneas 22742-22800 y 28005-28029.

Kits completos (todos CROMADO; el sufijo "TV" aparece solo en la API; significado: sin dato en los catálogos):

| SKU | Descripción | Proveedor |
|---|---|---|
| 03KB00110 | KIT BOX F1 FRONTAL (1F/1C) 1.80 / 6 mm CROMADO | COR |
| 03KB00120 | KIT BOX F1 FRONTAL (1F/1C) 1.80 / 8 mm CROMADO | COR |
| 03KB00130 | KIT BOX F3 FRONTAL (2F/2C) 2.00 / 6 mm CROMADO | COR |
| 03KB00140 | KIT BOX C1 ESQUINERO (2F/2C) 1.20 / 6 mm CROMADO | COR |
| 03KB00141 | KIT BOX C1 ESQUINERO (2F/2C) 1.50 / 6 mm CROMADO | COR |
| 03KB00050 | KIT BOX IMP. P2 FRONTAL (2C) 1.80 / 8 mm CROMADO | COR |

Lectura de la nomenclatura (inferida, no la define el catálogo): F = fija, C = corrediza; "1.80", "2.00", "1.20", "1.50" parecen ser la medida del riel en metros; "6 mm" y "8 mm" son el espesor de vidrio compatible. Confirmar con el dueño.

Accesorios sueltos del box:

| SKU | Descripción | Proveedor |
|---|---|---|
| 03GI0003A | GARRUCHA PARA PUERTA DE DUCHA (PDF: "... TEMPLADO") | COR |
| 03GS00005 | GUÍA PLÁSTICA DE DUCHA P/6MM | COR |
| 03GS00006 | GUÍAS PLÁSTICA DE DUCHA P/8MM | COR |
| 03GS00003 | JUEGO DE GUÍA P/DUCHA INT. Y EXT. NEGRO (API); el PDF lo rotula "TRANSPARENTE" | COR |
| 03GS00004 | JUEGO DE GUÍA P/DUCHA INT. Y EXT. TRANSPARENTE | COR |
| 03KB00220 | PERILLA DE ACERO SIMPLE PARA DUCHA | COR |
| 03KB00221 | PERILLA DOBLE DE ACERO PARA DUCHA | COR |
| 03RI00003 | RUEDA IMP. P/DUCHA RODATTECH (COR línea 22312; otra categoría) | COR |
| 03RI00002 | RUEDA IMP. P/DUCHA TRIANGULAR (COR línea 22352; otra categoría) | COR |
| (sin SKU verificado) | VINIL P/PUERTA DE DUCHA (COR línea 1607) | COR |

- Qué kits existen: tres familias de kit con riel (F1, F3/P2 y C1 esquinero). No hay un kit de "una hoja" abatible en Kit Box. Se supone que "kit de 1 hoja" corresponde a F1 frontal (1 fija + 1 corrediza), pero esa suposición no consta en el catálogo.
- Material y acabado: CROMADO en todos los kits; perillas "de acero" (tipo de acero: sin dato en los catálogos); guías de plástico (negro o transparente).
- Espesor de vidrio: 6 mm y 8 mm (según SKU).
- Favitem: "KIT DE PUERTA DE DUCHA" aparece solo como título de categoría; sin productos ni descripción.
- Confianza: media para la existencia de los kits; baja para el mapeo a los 4 sistemas del dueño.

### 2.2 Ducha: sistemas europeo y español

- Sin dato en los catálogos. COR no contiene "europeo" ni "español" aplicados a duchas. Los términos pueden corresponder a una distinción interna del dueño (por ejemplo, tipo de herraje o riel).
- Posibles candidatos para mapear (hipótesis, sin confirmar): kit C1 esquinero, kit F3 (2F/2C) o el kit IMP. P2 ("IMP." podría ser "importado", sin dato).
- Ver Dudas para el dueño.

### 2.3 Parapeto

- Sin dato: ningún proveedor lo llama "parapeto". No se halló un catálogo de accesorios de aluminio para parapeto separado de uno de acero inoxidable.
- Piezas que podrían servir (sin confirmar): categoría "Bridas Y Canoplas", donde figuran bridas, codos, tees, pasantes, terminales y canoplas de tubo. Ver 2.4. El material de esas piezas (aluminio o acero inoxidable) no consta en la descripción.
- Para la versión de acero inoxidable, Favitem lista "Accesorios para vidrio" y "Accesorios para baranda", sin SKU.
- Confianza: baja.

### 2.4 Baranda de acero inoxidable (solo acero / acero con vidrio)

Categoría API "Bridas Y Canoplas" (33 productos), COR. El catálogo de COR no dice si el material es acero inoxidable (sin dato sobre AISI 304 o 316).

| SKU | Descripción |
|---|---|
| 03BA00001 | CODO 1" |
| 03BA00002 | CODO DE 3/4 |
| 03BA00006 | CODO DE 30 MM |
| 03BA00004 / 03BA00005 / 03BA00007 / 03BA00008 | BRIDA DE 2" / 1 1/2" / 32 MM / 30 MM |
| 03BA00010 / 03BA00015 / 03BA00020 / 03BA00025 / 03BA00030 | BRIDA DE 1" / 1/2" / 3/4" / 5/8" / 7/8" |
| 03BA00032 / 03BA00033 | TRICODO DE 30 MM / 1" |
| 03CA00001 / 03CA00002 | CANOPLA CUADRADA DE 1" / 1 1/2" |
| 03CA00003 | CANOPLA PARA BALAUSTRE 2431 |
| 03OT00001 / 03OT00002 / 03OT00004 / 03OT00005 / 03OT00007 / 03OT00008 | PASANTE DE 1" / 30 MM / 3/4" / 7/8" / 5/8" / 1 1/2" |
| 03OT00010 / 03OT00011 / 03OT00013 / 03OT00014 / 03OT00015 / 03OT00016 / 03OT00019 | TERMINAL DE 1 1/2" / 30 MM / 1" / 3/4" / 5/8" / 7/8" / 2" |
| 03OT00030 / 03OT00033 / 03OT00034 | TEE GRANDE 30 MM / TEE DE 1 / TEE DE 3/4" |

Proveedor de todas: COR. Dimensiones: diámetro de tubo (pulgadas o mm). Sin dato sobre acabado.

Accesorios de vidrio que se usarían en el modelo "acero con vidrio" (de la categoría "Accesorios Para Templado", 6-8 mm MATE): 03AN5015A unión de cristales esquina, 03AN5034G unión T, 03AN5050A unión de 2 cristales, 03AN5861A fijación piso a techo.

Favitem: "ACCESORIOS PARA BARANDA" y "ACCESORIOS PARA VIDRIO" (solo título). "Acero inoxidable" figura en Favitem como especialidad de la empresa y en COR solo en brazos proyectantes de ventana.

Los dos modelos (solo acero / acero con vidrio) son una decisión del dueño (tareas.md); los catálogos no los definen. Balcón de aluminio y vidrio: sin dato de producto en los catálogos.

### 2.5 Puerta de vidrio templado

Categoría API "Accesorios Para Templado" (18 productos). COR líneas 22130-22190, 27590-27650. Todos 6-8 mm y acabado MATE salvo indicación.

| Función | SKU | Descripción | Proveedor |
|---|---|---|---|
| Rotación | 03AN1596A | PIVOTANTE Y BASE DE ROTACIÓN V/TEMPLADO 6-8 mm MATE | COR |
| Rotación | 03AN1591A | PIVOTANTE V/TEMPLADO 6-8 mm MATE | COR |
| Rotación | 03AN1594A | PIVOTANTE CON GRADUACIÓN V/TEMPLADO 6-8 mm MATE | COR |
| Rotación | 03AN1598A | PIVOT CON SEGURO DE POSICIÓN V/TEMPLADO 6-8 mm MATE | COR |
| Bisagra | 03AN1101A / 03AN1132A | BISAGRA ALTA ROTACIÓN / BAJA ROTACIÓN V/TEMPLADO 6-8 mm MATE | COR |
| Cerrojo | 03AN0615B / 03AN0615C | CERROJO PIC-615 P/CONCRETO VID/TEMP NEGRO / MATE | COR |
| Cerrojo a zócalo | 03AN0615Z / 03ANA615Z / 03ANW615Z | CERROJO PIC-615 P/ZÓCALO SIMPLE NEGRO / MATE / MADERA (categoría "Cerrojos Para Puertas Y Ventanas") | COR |
| Cerradura | 03AN6675A / 03AN6675G | PLACA ADAPT. P/CERRADURA POMO V/TEMPL. (6-8 mm / 6 mm) MATE | COR |
| Cerradura | 03AN6685A | CONTRACHAPA AL CONCRETO (6695) (AL MURO) MATE | COR |
| Jalador | 03AM00005 / 03AM00004 | JALADOR CIRCULAR P/PUERTA TEMPL. MATE / NEGRO (API: 10 MM) | COR |
| Uniones | 03AN5015A, 03AN5034G, 03AN5050A, 03AN5800A, 03AN5861A | esquina, T, 2 cristales, fijación simple piso-techo-muro, fijación piso a techo | COR |

Otros de apoyo: categoría "Jaladores Y Tiradores" (8) con jaladores circulares para pegar MATE/NEGRO (03AME040A/B), decorados (03AME041A/B), tiradores de aluminio (03TI00002, 03TI00004) y jaladores para vidrio crudo (03TI00031, 03TI0031C).
Categoría "Chapas Para Puertas Y Vitrinas" (12): chapas botón, serrucho, perilla, lengüeta, pico recto, pico loro, 4 bulones (03CH00018 ... 03CH00300).

Piezas del dueño sin equivalente claro:
- Chapa de bola con seguro: sin dato en los catálogos (ningún SKU con "bola"). Las chapas listadas son de otro tipo.
- Zócalo donde encaja el vidrio: sin dato como perfil; solo "cerrojo para zócalo simple".
- Felpa: existe como burlete de ventana (F-10, F-15, F-20, F-30, Systral Serie 25; categoría "Felpas"), sin dato de uso específico en puerta de vidrio.
- Base de rotación (freno de piso en palabras del dueño): confirmada solo como "PIVOTANTE Y BASE DE ROTACIÓN" (03AN1596A).
- Nota: el PDF rotula 03AN5800A como "contrachapa al cristal p/cerradura de pomo", la API como "unión 2 cristales fij. simple piso/techo/muro". Discrepancia a verificar.

Espesor de vidrio: 6-8 mm (SKU de pivotantes, bisagras y uniones); jalador "10 mm" según la API. Disponibilidad: el PDF de COR indica "Disponible sólo en Sede Independencia" para esta sección.

### 2.6 Frenos hidráulicos de piso

Categoría API "Frenos De Piso" (8). COR líneas 22236-22275, 27929-27943. Proveedor de todos: COR.

| SKU | Descripción |
|---|---|
| 03FR00005 | FRENO HIDRÁULICO SEVAX (PDF: SEVAX TSA) |
| 03FR0006M | FRENO HIDRÁULICO SEVAX MINOS |
| 03AM00012 | ACCES. P/PUERTA INF. SEVAX MATE REFORZADO |
| 03FR00121 | FRENO DORMA REFORZADO BTS-75R C/PIN + TAPA + PERNO |
| 03AM00011 | ACCES. P/PUERTA SUP. / INF. DORMA MATE |
| 03FR00008 | FRENO DE PISO OLIMPIA C/PIN INCORPORADO PTA PESADA (FRN-403), solo en el PDF, no en la API |
| 03FR00002 / 03FR00031 / 03FR00032 | CIERRA PUERTA AÉREO ISEO 65 KG MATE / NEGRO / BLANCO (cierrapuertas aéreo, no de piso) |

- Alias: Sevax TSA = Sevax (misma pieza 03FR00005, según PDF y API). Sevax Minos es otro modelo.
- Material y acabado: accesorios de puerta en MATE; el freno: sin dato.
- Capacidad de peso, espesor de vidrio: sin dato en los catálogos (el único dato de peso es 65 kg del Iseo aéreo).
- Favitem: "Freno hidraúlico" solo como categoría.

### 2.7 Fachada con arañas (spider)

Sin dato en los catálogos. Búsquedas de "spider", "araña" y "arana" en COR (archivo y API) no devuelven nada; Favitem no menciona spider. Solo la pista no fiable de `catalogo-proveedores-servicios.ts` lo cita, y no se tomó como dato.

## 3. Dudas para el dueño

1. Ducha: ¿cuál kit es el "europeo" y cuál el "español"? Los catálogos solo traen F1 (1 fija + 1 corrediza), F3 (2 fijas + 2 corredizas), P2 (2 corredizas, "IMP.") y C1 esquinero. ¿Los 4 sistemas son 1 hoja = F1, corredizo = P2/F3, europeo = ?, español = ? ¿Dónde entra el esquinero C1?
2. Parapeto y baranda: ¿qué piezas exactas componen cada versión (aluminio económica y acero inoxidable)? ¿Las bridas, canoplas y tubos de COR son de aluminio o de acero inoxidable (AISI 304 o 316)? Favitem no publica SKU; ¿hay lista de precios o catálogo en PDF para pedírsela?
3. Puerta de vidrio: ¿qué pieza es la "chapa de bola con seguro" y dónde se compra (no figura en COR)? ¿Qué perfil es el "zócalo donde encaja"? ¿La felpa de puerta es una de las felpas de COR (F-10, F-15...)?
4. Spider: ¿se ofrece fachada con arañas? Ningún catálogo la trae.
5. Confirmar si se incluye el kit esquinero C1 y los cierrapuertas aéreos Iseo como parte de frenos o como otro servicio, y si Olimpia (03FR00008) se maneja además de Sevax y Dorma.
6. Balcón de aluminio y vidrio: ¿qué proveedor y qué perfiles usa? Sin dato en los catálogos.
