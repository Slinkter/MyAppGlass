# Catálogo canónico: propuesta para aprobar

> **Estado: propuesta del 2026-11-08, sin aprobar.** No cambia código, Firestore ni `AGENTS.md` hasta la puerta de catálogo. Detalle y fuentes por proveedor en [`proveedores.md`](./proveedores.md).

## 1. Los 13 servicios (decisión del dueño, 2026-11-08)

La oferta oficial son **13 servicios: los 10 actuales del sitio + 3 nuevos**.

| # | Slug | Servicio | Estado | Se cotiza | Tipos y líneas candidatas (sin confirmar) |
|---|---|---|---|---|---|
| 1 | `ventana` | Ventanas | En el sitio | por medida | Corrediza, Proyectante |
| 2 | `mampara` | Mamparas | En el sitio | por medida | Corrediza, Batiente |
| 3 | `ducha` | Duchas | En el sitio | por medida | Corrediza, Batiente |
| 4 | `parapeto` | Parapetos | En el sitio | por medida | Muro cortina (Serie 45) |
| 5 | `baranda` | Barandas | En el sitio | por medida | Por definir |
| 6 | `balcones` | Balcones | En el sitio | por medida | Por definir |
| 7 | `techo` | Techos | En el sitio | por medida | Policarbonato, vidrio laminado |
| 8 | `pvidrio` | Puertas de vidrio | En el sitio | por medida | Pivotante con freno de piso |
| 9 | `pserie` | Puertas de aluminio | En el sitio | por medida | Batiente (Serie 35, Serie 36) |
| 10 | `celosias` | Celosías | En el sitio | por medida | Por definir |
| 11 | `espejos` | Venta de espejos | **Nuevo** | por m² o unidad | Belga y otra calidad de 4 mm |
| 12 | `frenos` | Frenos hidráulicos | **Nuevo** | por unidad, con instalación | Marca Sevax |
| 13 | `mantenimiento` | Mantenimiento | **Nuevo** | por servicio, con visita técnica | Productos instalados |

Los slugs nuevos son propuesta. La venta de repuestos no está entre los 13 (ver §6).

## 1.1 Estructura del catálogo

El **proveedor no es un nivel del catálogo**: es un dato interno de cada serie. El cliente elige categoría, tipo y serie; el proveedor se decide al armar o comprar cada pedido y se registra en el presupuesto para conocer el costo real.

```
Servicio         Ventanas
└─ Tipo          Corrediza
   └─ Serie      Serie 20        ← lo ve el cliente y va en el presupuesto
      ├─ Corrales   perfiles, herrajes, costo, fecha   ← solo interno
      ├─ Eduhg      perfiles, herrajes, costo, fecha
      └─ HPD        sin equivalente confirmado
```

Cada proveedor conserva sus propios datos: por ejemplo, la Serie 42 figura con vidrio de 4 mm en Corrales y de 6 mm en Eduhg. Una serie de un solo proveedor funciona igual. Los servicios sin serie (espejos, frenos y mantenimiento) se ordenan por producto o tarea, con el proveedor también como dato interno.

La empresa compra materiales, ensambla en su taller e instala.

## 1.2 Imágenes (decisión del dueño, 2026-11-08)

Del material de proveedores se usan **solo datos de texto**: nombres, títulos y datos técnicos. **No se usan sus fotos, planos ni imágenes**, ni siquiera con autorización previa, salvo que el dueño cambie esta decisión. Las imágenes de `proveedor_info` no se copian al repo ni se publican. Los productos y repuestos de este catálogo se muestran con nombre y título.

## 2. Cómo se compone un producto

```
Producto = perfiles de la serie (fórmula de corte)
         + vidrio (fórmula de medida)
         + herrajes y accesorios (cantidad por unidad)
         + mano de obra de taller + instalación + margen
```

Ejemplo real: **Serie 20, ventana corrediza** (Eduhg, `CATALOGO-ALUMINIO`, p.11, contrastado).

| Tipo | Código | Pieza | Cant. | Fórmula o unidad |
|---|---|---|---|---|
| Perfil | 2001 | Riel superior | 1 | B-12 |
| Perfil | 2002 | Riel inferior | 1 | B-12 |
| Perfil | 2009 | Jamba | 2 | A |
| Perfil | 2004 | Zócalo sup. hoja | 2 | B/2-1 |
| Perfil | 2005 | Zócalo inf. hoja | 2 | B/2-2 |
| Perfil | 2010 | Parante hoja | 2 | A-28 |
| Perfil | 2011 | Traslapo | 2 | A-28 |
| Vidrio | — | Vidrio 4 mm | 2 | B/2-53 x A-102 |
| Herraje | 03GA00321 | Garrucha armada (Serie 20) | 4 | pieza |
| Herraje | 03TA00034 | Guía superior 03 (Serie 20) | 4 | pieza |
| Herraje | 03CD00230/231/232 | Cierre automático MR625 | 2 | pieza |
| Herraje | 03CF0010N/P | Felpa F-10 | 6A + 4B | metro lineal |
| Herraje | TOR8x1"CPPH / CBPH | Tornillo flat / pan 8x1" | 8 / 8 | pieza |

El catálogo no define A y B; por las fórmulas parecen alto y ancho. **Por confirmar.** Eduhg trae este despiece también para otras series, así que el presupuesto podría calcular costo real con precios de proveedor en lugar de los precios de ejemplo actuales.

## 3. Series propuestas (agrupadas por producto)

Eduhg y Corrales usan la misma numeración básica: **21 de los 34 códigos de accesorios del catálogo de aluminio de Eduhg también aparecen en Corrales**, lo que respalda lo que observa el dueño. HPD usa otra nomenclatura y **ningún proveedor publica equivalencias**; las columnas de HPD y de las series europeas son candidatas por número o función.

| Producto | Serie estándar | Corrales | Eduhg | HPD (candidato) | Nota |
|---|---|---|---|---|---|
| Ventana corrediza | Serie 20 | Serie 20 | Básica 20 | ? | |
| Ventana corrediza económica | Serie 29 | 29 (3131/8131) | — | VCO 031 ? | |
| Ventana corrediza económica | Serie 3825 | 3825 | — | ? | |
| Ventana y mampara corrediza | Serie 25 | Serie 25 | Básica 25 | ? | |
| Ventana y mampara corrediza | Serie 28 | 28 (3142/3642) | — | ? | |
| Mampara corrediza | Serie 7038 | 7038 | — | ? | |
| Ventana corrediza europea | Serie 62 | Serie 62 | VT-62 / Hermeti-K ? | ? | |
| Corrediza europea | Serie 80 | Serie 80 | MP-80 ? | ? | Eduhg la presenta como mampara |
| Puerta batiente | Serie 35 | Serie 35 | Básica 35 | MBT 035 ? | HPD la llama mampara |
| Puerta y mampara batiente | Serie 36 | Serie 36 (3736) | — | MBT 036 ? | |
| Ventana proyectante económica | Serie 3831 | 3831 | Básica 3831 | ? | Vidrio: Corrales 4 mm, Eduhg 6 mm |
| Ventana proyectante | Serie 42 | Serie 42 | Básica 42 | VPR 042 ? | Vidrio: Corrales 4 mm, Eduhg 6 mm |
| Muro cortina | Serie 45 | Serie 45 | Básica 45 | MCS 034 / MCF 034 ? | |
| Por definir | Sistema Nova | Sistema Nova | — | — | Existe en Corrales; falta su composición |

## 4. De la terminología actual a la del proveedor

### Sistemas y servicios
| Hoy | Dónde | Lo que dicen los proveedores | Propuesta |
|---|---|---|---|
| "Serie 35" en Ventanas | Firestore `ventana` | Serie 35 es puerta batiente | Quitar de ventanas, salvo que el dueño la use así |
| "Serie 62" en Puertas | SEO de `pserie` | Serie 62 es ventana corrediza | Corregir |
| "Serie 25" en Puertas | SEO de `pserie` | Serie 25 es mampara/ventana | Corregir |
| "Sistema Puerta Serie" | Firestore `pserie` | Serie 35 y 36 | Reemplazar |
| "Sistema Corredizo", "Sistema Batiente" | Firestore `ducha` | Tipo de apertura, no serie | Pasar a tipo de apertura |
| "Sistema Panorámico", "Parapeto Panorámico", "Baranda Minimalista", "Celosía Fija y Móvil", "Cobertura Aluminio", "Pivotante con Freno de Piso" | Firestore | Sin equivalente con ese nombre | Nombre comercial del dueño o línea real; **decidir uno por uno** |
| "Nova Hermética" | `pricing.ts` | Sistema Nova | Quitar "Hermética" si no hay respaldo |
| "Ventana Acústica" | `pricing.ts` | No hay serie con ese nombre. Existen laminado acústico (Eduhg) y VT-62 termoacústica | Tratarla como combinación de serie + vidrio |
| "Ventana PVC Abatible" | `pricing.ts` | **Ninguno de los 4 ofrece ventanas de PVC en lo extraído**; solo guías de PVC | Necesita otro proveedor o se retira |
| "Antirruido 50/70/80 %" | `pricing.ts`, `company.json` | **Sin cifras de ruido en lo revisado** (HPD: solo frases cualitativas, sin dB) | Se mantienen con la nota "referencial" (decisión del dueño, 2026-11-09) |

### Vidrio y acabados
| Hoy | Proveedor | Propuesta |
|---|---|---|
| Crudo | Liso (Eduhg); primario o flotado (HPD) | Vidrio liso, por confirmar que es lo mismo |
| Laminado 8 mm | 8.38 (Eduhg) | Usar espesor real: 6.38, 8.38, 10.38 |
| Templado | Templado 4 a 12 mm (HPD) | Se mantiene, con espesor |
| Gris | Gris humo (Eduhg), Gris (HPD) | Gris |
| Arenado | Vinil arenado (Eduhg); arenado como servicio (Corrales) | Definir cuál se ofrece |
| Empavonado (presupuestos reales) | Ácido (Eduhg) | Por confirmar |
| Mate, Negro, Blanco, Champagne, Madera | Corrales usa los mismos | Se mantienen; quitar "Anodizado", "Esmaltado" y "Titanio" de las etiquetas donde no correspondan |
| Titanio | Solo HPD | Por confirmar si se trabaja |

### Piezas (glosario)
| Estándar propuesto | También se dice |
|---|---|
| Riel superior / inferior | Marco superior / inferior (HPD) |
| Jamba | Marco lateral (HPD) |
| Zócalo de hoja | Marco de hoja superior / inferior (HPD) |
| Parante de hoja | Marco de hoja lateral (HPD), montante |
| Traslapo | Traslape (HPD) |
| Hoja | Nave (Corrales) |
| Garrucha | Rodamiento (Corrales) |
| Felpa / Burlete | Felpa de polipropileno / Burlete de EPDM |
| Diseños CC, CF, FC, CFC, FCCF | Parecen corrediza y fijo; el catálogo no lo define. **Por confirmar** |

## 5. Los 3 servicios nuevos

| Servicio | Propuesta | Fuente |
|---|---|---|
| Venta de espejos | Belga 4 y 6 mm; 2 y 3 mm Doble Capa o Micorrex (Corrales). Eduhg lista 2, 3 y 4 mm sin indicar calidad. **El espejo brasileño no aparece en ningún proveedor** | Corrales, Eduhg, HPD |
| Frenos hidráulicos | Sevax TSA (03FR00005) y Sevax Minos (03FR0006M) con accesorio 03AM00012, con instalación | Corrales |
| Mantenimiento | Limpieza, lubricación de garruchas, cambio de felpas y burletes, ajuste de seguros | Manual HPD |

## 6. Decisiones del dueño (puerta de catálogo)

> Respuestas ya dadas por el dueño el 2026-11-09 (recogidas en `docs/marca/MANUAL-DE-MARCA.md` y `apps/web/PRODUCT.md`): los 6 sistemas de `AGENTS.md` siguen como lista provisional hasta que funcione el CRUD de administración; no se menciona el origen del aluminio; garantía de 3 meses y precio con IGV.

1. ¿Qué series de la §3 vende de verdad? ¿Con cuáles trabaja también HPD? Respuesta parcial: Sistema Nova, Serie 20 y Serie 25, de Corrales y Eduhg; el cliente elige entre los modelos del taller. Falta la lista completa y HPD.
2. Serie 35 en Ventanas, y Serie 25 y 62 en Puertas: ¿error o lo trabaja así?
3. ¿Cuáles son los modelos de freno Sevax que instala: TSA, Minos o ambos?
4. PVC abatible: ¿qué proveedor? ¿Se mantiene?
5. Acústica: ¿qué serie y vidrio lleva?
6. ~~¿Se mantienen los % antirruido sin respaldo del proveedor?~~ **Respondida:** se mantienen con la nota "referencial". Se había dicho que Serie 25 y 62 tienen respaldo del proveedor; en lo extraído (`proveedores.md`) ningún proveedor da cifras de ruido, así que los cuatro porcentajes son referenciales.
7. Espejo de 4 mm no belga: ¿quién lo vende?
8. ¿Qué nombre comercial reciben los sistemas de la fila "Sistema Panorámico" y siguientes?
9. Repuestos (garruchas, seguros, tornillos): no están entre los 13. ¿Se venden aparte o quedan solo como parte del mantenimiento?
10. Favitem: ¿tiene lista de precios o catálogo que se pueda aportar?

## 7. Después de aprobar (fuera de esta propuesta)
Renombrar implica cambiar a la vez `systems` y `gallery[].system` en Firestore, porque las fotos se enlazan por texto exacto. También `pricing.ts`, `quoteLines.ts`, `aiProducts.ts`, `serviceMappers.ts`, los tests y la documentación. Los presupuestos ya guardados conservan los ids antiguos, así que hará falta compatibilidad. Luego sigue la puerta 1 del design system.
