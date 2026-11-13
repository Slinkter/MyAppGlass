# Pendientes del proyecto

> **Única lista de trabajo abierto.** Cuando se abre un trabajo, se anota aquí; cuando se termina, se borra de aquí y se registra en `05_CHANGELOG.md`.
>
> Dividido en dos partes:
>
> - **Parte 1: trabajo técnico.** Lo que puede hacer Claude, ordenado de lo más fácil a lo más complicado.
> - **Parte 2: decisiones del dueño.** Preguntas que solo el dueño puede responder. Escribe tu respuesta debajo de cada una.

---

## PARTE 1: Trabajo técnico (Claude)

Última revisión: 2026-11-11, rama `feat/cotizador-pantalla`.

### Bloque culminado: cotizador de presupuesto (Ventana · Nova) ✅ (2026-11-12)

- **Fases 0 a 7 completadas y verificadas:** Flujo en /presupuesto funcionando de punta a punta, con captura inmediata de contacto, selector de medidas, checkbox de La Molina y previsualización formal.
- **Render 2D SVG Integrado:** Dibujo dinámico de marcos, hojas (2 vs 4), jaladores y división de cuerpos superiores/inferiores según medidas.
- **Hoja Membretada Oficial A4 y PDF:** Con columna de dibujo 2D SVG y bloque de medios de pago autorizados (logos vectoriales SVG de Yape, Plin y BBVA).
- **Mapeo de Proveedores a 13 Servicios:** 435 productos estructurados y 5 bases de conocimiento consolidadas en docs/proveedores/ y catalogo-proveedores-servicios.ts.
- **Navegación:** Enlace reubicado exclusivamente en el Footer (columna Servicios y Sitelinks).
- **Pruebas y Build:** Typecheck, lint y build con exportación estática de 71 páginas aprobados al 100%.

### Decisiones del dueño ya registradas (2026-11-11)

| Tema                      | Decisión                                                                                                                                                                                                                                                                                                                    | Efecto                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Aprobado                  | Misión y valores (P11); PDF con marca, cuenta bancaria en el pie y validez de 15 días (P13); barra de escritorio de 4 enlaces con Mi cuenta solo en el footer (P14); chip de `/contacto` con el color de texto más oscuro del tema (P15); movimiento cinematográfico en todas las páginas, con coherencia entre ellas (P17) | Pasan de "bloqueado" a "listo para hacer", por lotes                        |
| Se queda como está        | Menú móvil (P18); logo horizontal (P11); commit `f28b102`, que solo baja `versionLimit` del hosting de 5 a 2 (P5)                                                                                                                                                                                                           | Cierra esos ítems                                                           |
| MD3                       | Se aplica MD3 (tamaños, espacios, alineación, anchos) con los colores y la tipografía de la empresa (P12 y P16)                                                                                                                                                                                                             | La escala de h1 y el mínimo de texto salen de MD3, no de un número fijo     |
| Presupuesto               | Mostrar subtotal, IGV y total; sumar 5 % del total si se paga con tarjeta de crédito o débito (P9)                                                                                                                                                                                                                          | Se programa cuando haya precios (P19 a P24 siguen pendientes del dueño)     |
| Seguridad                 | Firebase API key solo para `gyacompany.com` y `localhost` (P4); antes de cualquier deploy se prueba en el emulador (P6); rotar claves al terminar el proyecto (P1); `contadores` en espera (P7)                                                                                                                             | La restricción de la API key la hace el dueño en la consola de Google Cloud |
| En pausa (respuesta "no") | Sentry, cambios en `apps/functions`, `opencode.json`, GitHub Actions, deploys y checklist de Google Maps (P27 a P33)                                                                                                                                                                                                        | Siguen bloqueados                                                           |
| Más adelante              | Bug "vuelvo a Home y veo el footer" (P34): el dueño lo revisa al final                                                                                                                                                                                                                                                      | Sin acción ahora                                                            |

### Bloque nuevo: CRM de servicios y proyectos (prioridad actual)

Pedido del dueño (P7 y P10): editar servicios y proyectos en línea, como un WordPress.

- Entran con permisos completos los 3 correos admin: el del dueño, el de la empresa y el de pruebas (`admin@gyacompany.com`, usado para pruebas de UX y UI).
- Pueden crear, editar y quitar servicios y proyectos, corregir nombres e imágenes y subir, editar o quitar fotos del álbum.
- Los clientes **no** ven el dashboard: solo crean una cotización desde el celular o la web.
- Servicios nuevos (espejos, frenos hidráulicos y mantenimiento): hecho en `1d0687a8`. Están definidos en `entities/service/api/approvedNewServices.ts` y se cargan desde `/admin/servicios`. Falta: validar con el dueño los costos y el flete por m² de espejos (nota técnica en su texto) y revisar que se hayan cargado en Firestore.
- Orden propuesto: (1) revisar el panel actual en `/admin` y qué falta de CRUD, (2) confirmar el control de acceso por rol en reglas y en el frontend, (3) completar el CRUD de servicios y proyectos con subida de imágenes, (4) probar todo en el emulador antes de cualquier deploy.
- Dudas D1 a D4 resueltas y cerradas por el dueño: solo los 3 correos con `role = 'admin'` en Firestore son admin; AR en pausa; blog auditado sin publicar artículos nuevos.

### Bloque en curso: catálogo de proveedores y pedido de compra (2026-11-13)

- Rama `feat/dashboard-proveedores`. Objetivo: pedido de compra para los 4 proveedores (Corrales, Eduhg, HPD Glass y Favitem) y sistemas por servicio en borrador.
- Documentos en `docs/claude/specs/dashboard-proveedores/`: spec, plan, tasks, entrevista, flujos y pantallas.
- El dueño debe responder `docs/claude/specs/dashboard-proveedores/entrevista.md` (líneas **Respuesta:**).
- Hallazgos: 435 registros sin precio; Favitem sin productos en la API.
- Nada se despliega ni se sube a la base real hasta que el dueño lo autorice.

### Nivel 1. Verificar (sin riesgo)

| Ítem                                         | Resultado de la revisión                                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Galerías `Gallery.tsx` y `GalleryViewer.tsx` | **No se retiran.** Están en uso por `GalleryWithThumbnails` (en `ServicePageLayout`, `VisualViewer` y `/design-system`).                                                             |
| `robots.ts`                                  | **Revisado, sin cambios.** Excluye `/admin`, `/auth`, `/mi-cuenta`, `/tienda` y `/design-system`. Hay reglas para bots de IA.                                                        |
| Redirect del slug "antiruido"                | **No existe** en `firebase.json`. Falta saber si la URL vieja fue pública (ver Parte 2, P8).                                                                                         |
| Modales del admin repetidos                  | **Parcial.** Hay 7 modales en `features/admin/components`; 3 usan `FormModalShell` y 5 usan `AdminDialog`. Pendiente unificar (nivel 4).                                             |
| `generateStaticParams`                       | **Presente** en `blog/[slug]`, `proyectos/[projectId]` y `servicios/[serviceSlug]`. Falta comprobarlo con un `pnpm build` completo.                                                  |
| 404 de precarga                              | Pendiente: comparar con `main` para saber si ya existían.                                                                                                                            |
| Historial del menú móvil (Lote 1)            | **Verificado en un flujo:** abrir menú → enlace `/#proyectos` → atrás vuelve a `/contacto` en un solo paso. Falta probarlo en teléfono real.                                         |

### Nivel 2. Corto

| Ítem                                               | Estado                                                                                                                                                                                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navbar de escritorio: enlaces de 43 a 44 px        | **Pendiente de medir.** En código, `AuraDesktopNav.tsx:89` tiene `h="11"` (2.75 rem = 44 px). Hay que medir el enlace en el navegador.                                                                                           |
| Auditorías de diseño                               | **Ejecutadas** con Playwright. Landing: 0 desbordes y 0 errores JS en 360, 768 y 1280 px. Design system: 1 fallo de contraste por contexto, 6 áreas táctiles pequeñas, 0 desbordes. El baseline se restauró tras sobrescribirse. |
| Lote 6: escala de h1 y texto mínimo 14 px          | **Bloqueado por Parte 2 (P16).**                                                                                                                                                                                                 |
| IGV en `pricing.ts`                                | P9 respondida: mostrar subtotal, IGV y total. El motor nuevo (`quoteTotals`) ya lo calcula; falta mostrarlo en la pantalla (cotizador, Fase 3). |

### Nivel 3. Medio

| Ítem                                                                                        | Estado                                                                                   |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Lote 3: renombrar 19 archivos kebab-case a camelCase y `DesignSystem/components/motion.tsx` | Pendiente. Cambio amplio de imports; conviene una rama aparte.                           |
| "Mis presupuestos" en `/mi-cuenta`                                                          | Pendiente. Debe leer el formato antiguo (`params`) y el nuevo (`{ version: 2, items }`). |

### Nivel 4. Grande

| Ítem                                                                                                                              | Estado                                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Lote 4: partir `theme/index.ts` (730 líneas); fusionar `field*`/`badge*`                                                          | Pendiente. Ya hecho en `78e1ed87`: `ClientCard` duplicado, `FloatingPanel` y `MenuOverlay`. |
| Unificar modales del admin (ver nivel 1)                                                                                          | Pendiente.                                                 |
| Optimización de 5 componentes: `FloatingPanel`, `ProjectCarousel`, `OrderDraftContext`, `PrototypeTimeline`, `ProjectDetail`      | Pendiente.                                                 |
| Deriva de diseño en `apps/web/DESIGN.md` ("Deriva conocida")                                                                      | Pendiente, antes de los lotes de páginas.                  |
| Movimiento cinematográfico en otras páginas                                                                                       | Aplicado en `78e1ed87` (P17). Pendiente: medir LCP y TBT.  |
| Tests de reglas de Firestore y de `storage.rules` en CI                                                                           | Pendiente. Requiere Java y firebase-tools en el runner.    |
| Job de Playwright en CI                                                                                                           | Pendiente, opcional (nightly o manual).                    |
| Validar curvas con el MCP `motion` y `nav-back` (Lote 2)                                                                          | Pendiente.                                                 |
| Pedido de compra desde el dashboard                                                                                               | Fase posterior. Documento con proveedor, producto, medidas, cantidad y fecha de pedido. Sin precio de compra (decisión del dueño, spec del cotizador §11 pregunta 9). |
| Otros sistemas de ventana y categorías en el cotizador                                                                            | Fase posterior, después del cotizador de ventana Nova.     |
| Un solo formateador de moneda y un solo `round2` | Pendiente. Hallazgo de la auditoría del cotizador: hay `money()` locales en `QuoteSheet`, `QuoteSummaryCard`, `CartDrawer` y `CheckoutScreen`, y tres `round2` distintos (`windowRules`, `quoteSummary`, `cart-engine`). El cotizador nuevo ya usa `formatSoles`. |
| `entities/quote` depende de `entities/window` (`SystemType`) y ciclo de tipos `lib` ↔ `model` | Pendiente. Mover los tipos a `entities/quote/model` o a `shared/types`. ESLint no lo detecta. |
| Tipos del tema de Chakra (`chakra typegen`) | Pendiente. Sin ellos, `variant="field"` exige el cast `as never` (3 archivos del catálogo y `WindowForm`). |
| Tokens de ancho de borde en el tema y `surface.card` translúcido en modo oscuro | Pendiente, requiere aprobación: toca el tema de todo el sitio. Hallazgo de la auditoría MD3 del cotizador. |
| Textos de los 3 servicios nuevos (`entities/service/api/approvedNewServices.ts`) | Pendiente de revisión del dueño y de `copy-vidrieria`: dicen "Fabricación", "retroiluminados", "marcas importadas certificadas" y "Garantía técnica", que chocan con las reglas del negocio. |

### Nivel 5. Complejo (requiere aprobación explícita)

| Ítem                                                    | Estado                                                                      |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Lote 5: tokens MD3 en el tema (~83 archivos)            | **Bloqueado por Parte 2 (P12).**                                            |
| Variantes aprobadas a las recetas reales (~83 archivos) | **Bloqueado por Parte 2 (P12).**                                            |
| Hoja A4 con la marca                                    | Bloqueado: espera el lote de páginas aprobado (P12).                        |
| Endurecer `contadores` y `presupuestos_solicitados`     | **Bloqueado por Parte 2 (P7).** Toca `firestore.rules` y `apps/functions/`. |
| Alinear `pricing.ts` con el catálogo (Serie 35 y 62)    | **Bloqueado por Parte 2 (P10 y P21).**                                      |

---

## PARTE 2: Decisiones del dueño

> Responde en la línea **Respuesta:** de cada pregunta. Si no sabes, escribe "no sé" y lo dejo como está. El ejemplo sirve de guía, no es una respuesta.

### Seguridad

**P1. ¿Ya rotaste `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY`?**
_Ejemplo: "Sí, rotadas el 12/11 y actualizadas en el entorno de producción."_
**Respuesta:** no, como no se termina el proyecto todavia ,una vez terminado se va a generar nuevas api key

**P2. ¿`isAdmin()` en `firestore.rules` debe dejar de dar admin a cualquier correo `@gyacompany.com` verificado?**
_Ejemplo: "Sí, solo admin los usuarios con `users/{uid}.role = 'admin'`."_
**Respuesta:** el dueño del proyecto es luis.j.cueva@gmail.com y la empresa es acueva@gyacompany.com y un tercero que es de prueba admin@gyacompany.com, los 3 correos son validos para trabajar , usar admin@gyacompany.com para testing prueba de ux , prueba ui ,

**P3. ¿Cuál es la cuenta del responsable que debe tener `role = 'admin'` en Firestore?**
_Ejemplo: "La cuenta `correo-del-responsable@dominio.com`." (escribe el correo real solo si quieres)_
**Respuesta:** de momento que sea admin@gyacompany.com pero puede cambiar

**P4. ¿Qué dominios deben poder usar la API key web de Firebase?**
_Ejemplo: "`gyacompany.com`, `_.web.app`y`localhost` para pruebas."\*
**Respuesta:** gyacompany.com y localhost

**P5. ¿Qué es el commit `f28b102` (`firebase.json`, congelado)?**
_Ejemplo: "Lo hizo [un colaborador] para la redirección de blog; es válido." o "No lo reconozco: revertir."_
**Respuesta:** no se que es, aplicar segun tu recomendacion , pero eso es de firebase estamos trabajo en CRM , para editar servicio y proyectos de manera onlineen tiempo real , casi al final se hara un presupuesto o arma cotizaciones ,

**P6. ¿Autorizas desplegar las reglas validadas en el emulador (`presupuestos_solicitados`, `contadores`, `users`, `clientes`)?**
_Ejemplo: "Sí, desplegar después de probar en staging."_
**Respuesta:** puedes usar emulador antes de hacer algun deploy en firebase

**P7. ¿Autorizas endurecer `contadores` y `presupuestos_solicitados` (App Check, correlativo sin huecos)? Toca `firestore.rules` y `apps/functions/`.**
_Ejemplo: "Sí, con App Check. Los huecos en el correlativo no me preocupan."_
**Respuesta:** dejalo en stand by , ahora la prioridad es CRUD CRM de editar servicios y proyecto como si fuera un wordspress ,que logeado en modo admin [luis.j.cueva@gmail.com,acueva@gyacompany.com,admin@gyacompany.com] pueda editar tener todos los permisos y los cliente no , los cliente no debe tener acceso al dashboar , solo a crear un cotizacion desde el celuar o web

### Contenido y SEO

**P8. ¿La URL del blog con slug "antiruido" fue pública alguna vez?**
_Ejemplo: "Sí, era un artículo; crear redirección a `/blog/ventanas-antirruido`." o "No, nunca existió."_
**Respuesta:** se pido a un agenten crear varios blog apartir del conocmiento obtener de un carperta pero no se si temrino de educarse

**P9. ¿Los precios que se muestran al cliente incluyen IGV?**
_Ejemplo: "Sí, el precio final ya incluye IGV; el calculador debe mostrar el desglose sin sumarlo otra vez."_
**Respuesta:** ahora que lo pienso debe ser con subtotal igv total , tambein agregar el 5% adicional del total si es pago con tarejta de credito o debito

**P10. ¿Apruebas el catálogo propuesto en `docs/gya/catalogo/CATALOGO.md` (13 servicios)?**
_Ejemplo: "Aprobado con cambios: quitar el servicio de techos; los 3 nuevos (espejos, frenos hidráulicos, mantenimiento) sí."_
**Respuesta:** se debe agregar de los 3 nuevos (espejos, frenos hidráulicos, mantenimiento) ,ya que como sera hara un CRM el admin o usario de la emrpesa debe editar corregir el nombre o imagen o subir o editar o quitar imagens del album(gallery)

**P11. ¿Apruebas misión, visión, valores y logo horizontal propuestos en el manual?**
_Ejemplo: "Apruebo misión y valores; el logo horizontal se queda como está."_
**Respuesta:** Apruebo misión y valores; el logo horizontal se queda como está.

**P12. ¿Apruebas el cambio de tokens MD3 y de variantes (~83 archivos) en lotes separados, después de revisar `/design-system`?**
_Ejemplo: "Sí, en un lote aparte primero los botones y después los campos."_
**Respuesta:** a mi me gusta mucho MD3 , he estado iterando contigo design-system pero falla mucho por eso te mande a estudiar MD3 para corregir el diseno de componente los espacio los alinamiento como debe ser un boton , los tamaños de los botnes los anchos de los card pero aplicando los colores de la empresa , respteanto la tipograis , respentado ese diseno mimalsita de la empresa ,

**P13. ¿Las cotizaciones en PDF deben llevar la marca (membrete, datos bancarios, plazo y validez)?**
_Ejemplo: "Sí, con cuenta bancaria en el pie y validez de 15 días."_
**Respuesta:** Sí, con cuenta bancaria en el pie y validez de 15 días.

### Diseño y navegación

**P14. ¿Apruebas la barra de escritorio con 4 enlaces (Inicio, Servicios, Proyectos, Ubicación) y Contacto, Mi cuenta y legal en el footer?**
_Ejemplo: "Sí, la barra queda así; Mi cuenta solo en el footer."_
**Respuesta:** Sí, la barra queda así; Mi cuenta solo en el footer.

**P15. ¿Apruebas cambiar el color del chip de `/contacto` para llegar a contraste 4,5:1 (hoy 2,77:1)?**
_Ejemplo: "Sí, usar el color de texto más oscuro del tema."_
**Respuesta:** Sí, usar el color de texto más oscuro del tema.

**P16. ¿Apruebas una escala única de h1 y un texto mínimo de 14 px?**
_Ejemplo: "Sí, h1 máximo 36 px en móvil; ningún texto por debajo de 14 px."_
**Respuesta:** no se si se contradice con el MD3 , usar usar mas o aplicar lo que dice MD3

**P17. ¿Llevamos el movimiento cinematográfico a servicios, proyectos, blog, tienda y contacto?**
_Ejemplo: "No, solo en la home. En las demás, transiciones simples."_
**Respuesta:** si a todos , debe exisitr similutd y coherencia

**P18. En móvil, ¿la barra inferior de 3 a 5 destinos reemplaza al menú o lo complementa?**
_Ejemplo: "Complementa: Inicio, Servicios, Contacto y WhatsApp abajo; el menú sigue arriba a la derecha."_
**Respuesta:** no , deja como esta ahora el diseño de menu en movil

### Presupuesto y producto

**P19. ¿Cómo se cobra cada partida: por medida, por unidad o por servicio?**
_Ejemplo: "Vidrios por m², mamparas por unidad, instalación por servicio."_
**Respuesta:** DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P20. ¿Cuál es el precio real de cada servicio y sistema?**
\*Ejemplo: "[Serie X]: S/ [precio] por [unidad], con/sin IGV." (no hay precios aún: el catálogo bloquea esto; no se inventan)
**Respuesta:** DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P21. ¿Los 6 sistemas de `pricing.ts` se quedan así o se alinean con el catálogo (faltan Serie 35 y 62; sobran ducha y techo)?**
_Ejemplo: "Alinear: quitar ducha y techo, agregar Serie 35 y 62."_
**Respuesta:** DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P22. ¿El pedido sigue solo por WhatsApp o pasa a un checkout con Cloud Function?**
_Ejemplo: "Sigue por WhatsApp hasta tener volumen."_
**Respuesta:** DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P23. ¿Se muestra públicamente el stock y el costo de `productos`?**
_Ejemplo: "No: el cliente solo ve el precio de venta."_
**Respuesta:** DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P24. ¿Qué pasa con las Series 35 y 62 que faltan en el catálogo?**
_Ejemplo: "Agregarlas con precio por confirmar con el proveedor."_
\*\*Respuesta:DEJO EN PENDEINT TENGOQUE ARMA LOS CALCULO O PASARTE

**P25. ¿Tienes los modelos `.glb` y `.usdz` para la realidad aumentada?**
_Ejemplo: "No; descartar AR por ahora."_ o "Sí, llegan el 30/11."
**Respuesta:** "No; descartar AR por ahora." LO IDEA ES QUE el cliente puede ver un AR desde su celular y proyectarlo en su casa o lugar en lo que este pero dejalo todavia

**P26. ¿Quién sube las fotos de las obras que faltan (solo 2 o 3 proyectos tienen álbum completo)?**
_Ejemplo: "cualquiera de los 3 correos admin "_
**Respuesta:** [luis.j.cueva@gmail.com,acueva@gyacompany.com,admin@gyacompany.com]

### Observabilidad y operación

**P27. ¿Tienes cuenta de Sentry y DSN?**
_Ejemplo: "No; la creo esta semana."_ o "Sí, DSN en el entorno de producción."
**Respuesta:** No;

**P28. ¿Autorizas cambios en `apps/functions` para Sentry servidor y la auditoría inmutable de reclamos?**
_Ejemplo: "Sí, después de Sentry cliente."_
**Respuesta:** no

**P29. ¿Las alertas, uptime y BigQuery de `gcp/` ya están aplicadas en GCP?**
_Ejemplo: "No lo sé; lo reviso con el técnico." o "Sí, aplicadas en octubre."_
**Respuesta:** no

**P30. ¿Autorizas `opencode.json` con los permisos propuestos en `docs/opencode/PLAN-FSD-Y-AGENTES.md` §6?**
_Ejemplo: "Sí, lectura libre y comandos de build y lint sin preguntar."_
**Respuesta:** no

**P31. ¿Reactivas el despliegue desde GitHub Actions (cuenta de servicio y secretos `NEXT_PUBLIC_*`)?**
_Ejemplo: "Sí, lo configuro esta semana; hasta entonces despliego a mano."_
**Respuesta:** no

**P32. ¿Autorizas el deploy de hosting y de functions cuando esté listo?**
_Ejemplo: "Sí, hosting ahora; functions después de revisar."_
**Respuesta:** no

**P33. ¿Se completó el checklist de Google Maps (nombre, dirección y teléfono)?**
_Ejemplo: "Sí, verificado; el teléfono es el mismo en todas las fichas."_ o "No, pendiente."
**Respuesta:** no

### Dudas de seguimiento (Cerradas)

**D1. ¿Los 3 correos son los únicos admin, o cualquier `@gyacompany.com` verificado sigue siendo admin?** Hoy `isAdmin()` en `firestore.rules` acepta cualquier correo `@gyacompany.com` verificado.
_Ejemplo: "Solo esos 3 correos; ningún otro `@gyacompany.com` es admin."_
**Respuesta:** Solo esos 3 correos; ningún otro `@gyacompany.com` es admin.
**Estado:** Cerrada (aplicada en `firestore.rules` y `AuthContext.tsx`).

**D2. ¿Cada admin se identifica por su correo en una lista, o por el campo `users/{uid}.role = 'admin'` en Firestore?** El rol en Firestore permite cambiar de admin sin tocar el código (tú dijiste "puede cambiar").
_Ejemplo: "Por rol en Firestore; yo cambio el rol desde la consola."_
**Respuesta:** Por rol en Firestore; yo cambio el rol desde la consola.
**Estado:** Cerrada (el dueño asigna `role = 'admin'` en Firestore).

**D3. Realidad aumentada: ¿se descarta, o se deja para después con la idea de que el cliente proyecte el producto en su espacio?** Tu respuesta decía las dos cosas.
_Ejemplo: "Se deja en pausa; la idea sigue en pie, retomar cuando haya modelos `.glb` y `.usdz`."_
**Respuesta:** Se deja en pausa; la idea sigue en pie, retomar cuando haya modelos `.glb` y `.usdz`.
**Estado:** Cerrada (en pausa hasta contar con modelos 3D).

**D4. Blog: ¿reviso la carpeta de artículos generados por el agente y te digo cuáles están completos, o los dejas como están?**
_Ejemplo: "Revísalos y dime cuáles están incompletos; no publiques nada nuevo."_
**Respuesta:** Revísalos y dime cuáles están incompletos; no publiques nada nuevo.
**Estado:** Cerrada (Fase 1.4 audita y clasifica sin publicar).

### Otros

**P34. ¿Qué hacemos con el bug "vuelvo a Home y veo el footer"?**
_Ejemplo: "Sigue sin reproducirse; cierro el tema si no vuelve a pasar en una semana."_ o "Pasa en Android con Chrome: lo reviso."
**Respuesta:** voy a revisar una vez termines los pendientes
