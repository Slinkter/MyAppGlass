# Entrevista: catálogo de proveedores y pedido de compra

Estas son las dudas que necesito resolver antes de construir el pedido de compra y los sistemas por servicio.

**Cómo responder:** escriba su respuesta en la línea **Respuesta:** debajo de cada pregunta. Si no sabe, escriba "no sé". Mientras no responda, trabajo con el valor más seguro: precio "a definir", todo en el emulador y sistemas en borrador. Cada fase vuelve a leer este archivo antes de empezar y aplica lo que usted haya respondido.

---

## Precios

**E1. ¿Los costos de kit y los porcentajes antirruido de Serie 20, Serie 35 y Serie 62 que están en el cotizador son suyos?**
Por qué importa: Gemini los agregó (kit S/ 65, 95 y 240; antirruido 40 %, 55 % y 65 %) y ningún proveedor los confirma. Si no son suyos, los paso a "Precio a definir" para que no salgan al cliente como precio real.
_Ejemplo: "No son míos; déjelos como Precio a definir hasta que yo confirme los valores."_
**Respuesta:**

**E2. Ningún producto de los proveedores trae precio. ¿Quiere poder escribir el precio de compra a mano en el panel, o el pedido sale siempre "Sin información de precio"?**
Por qué importa: si puede escribir el precio, el pedido muestra subtotales. Si no, solo muestra cantidades.
_Ejemplo: "Sí, quiero escribir el precio a mano en cada línea del pedido."_
**Respuesta:**

**E3. Si se escribe precio, ¿con o sin IGV?**
Por qué importa: cambia el subtotal y el total de la hoja A4 del pedido.
_Ejemplo: "Con IGV incluido; el total ya lo muestra con el 18 %."_
**Respuesta:**

---

## Proveedores

**E4. Favitem no tiene productos en la API (solo tiene un documento corto). ¿El bot los va a recolectar o se cargan a mano los kits de ducha y accesorios de acero inoxidable?**
Por qué importa: sin productos de Favitem, el pedido de duchas y accesorios de acero queda vacío.
_Ejemplo: "Se cargan a mano; el bot no los va a recolectar."_
**Respuesta:**

**E5. Eduhg trae 26 herrajes sin foto ni categoría. ¿Se muestran igual en el pedido?**
Por qué importa: si aparecen sin foto y sin categoría, la búsqueda los encuentra solo por código o nombre.
_Ejemplo: "Sí, se muestran igual; los busco por código."_
**Respuesta:**

**E6. HPD Glass solo tiene fichas técnicas de vidrio, sin códigos de producto. ¿Cómo pide usted el vidrio: por m², por plancha o por medida cortada?**
Por qué importa: define la unidad de cada línea de vidrio en el pedido y cómo se calcula el subtotal.
_Ejemplo: "Por plancha completa, y después la corto a medida en el taller."_
**Respuesta:**

**E7. Los perfiles de aluminio no están como productos con código. ¿Cómo los pide: por código de perfil y barras de 6 m, o por kilo?**
Por qué importa: el perfil de aluminio se vende por barra o por kilo según el proveedor, y la línea del pedido necesita una unidad.
_Ejemplo: "Por código de perfil, en barras de 6 m."_
**Respuesta:**

**E8. Datos de contacto de cada proveedor para la hoja del pedido (vendedor, WhatsApp o correo): ¿los pone usted o salen en blanco?**
Por qué importa: la hoja A4 de cada proveedor necesita a quién va dirigida. Si se deja en blanco, aparece un marcador visible.
_Ejemplo: "Yo los pongo: Corrales, vendedor y WhatsApp; Eduhg, solo correo."_
**Respuesta:**

---

## Sistemas

**E9. Cuando dos proveedores llaman distinto al mismo sistema (por ejemplo Serie 20 y VR20), ¿qué nombre ve el cliente?**
Por qué importa: el nombre que se publica en la web debe ser uno solo, y los nombres de proveedor no deben salir al cliente.
_Ejemplo: "Serie 20 para el cliente; VR20 queda solo en el panel como alias."_
**Respuesta:**

**E10. Duchas: usted mencionó kit de 1 hoja, kit corredizo, sistema europeo y sistema español. ¿Son esos 4 los definitivos?**
Por qué importa: cada sistema de ducha se publica como una opción separada en la página del servicio y en el cotizador.
_Ejemplo: "Sí, esos cuatro. El sistema español y el europeo son dos opciones distintas."_
**Respuesta:**

**E11. Parapeto (versión con accesorios de aluminio y versión en acero inoxidable) y barandas (solo acero, o acero con vidrio): ¿se presentan como sistemas o como modelos de un mismo sistema?**
Por qué importa: si son sistemas separados, cada uno tiene su propia ficha, textos y estado de publicación.
_Ejemplo: "Parapeto: dos sistemas separados. Baranda: un solo sistema, con y sin vidrio como modelos."_
**Respuesta:**

**E12. ¿Celosías de aluminio para ventilación y balcones de aluminio y vidrio son servicios nuevos o van dentro de uno existente?**
Por qué importa: un servicio nuevo necesita página propia, dirección en la web y textos. Dentro de uno existente solo agrega sistemas.
_Ejemplo: "Celosías van dentro de Ventanas; balcones son un servicio nuevo."_
**Respuesta:**

**E13. Cuando publique un sistema, ¿debe aparecer de inmediato en la página del servicio y en el cotizador, o solo en la página del servicio?**
Por qué importa: el cotizador calcula precios. Un sistema sin precio confirmado aparece como "Precio a definir" y no debería cotizarse por error.
_Ejemplo: "Solo en la página del servicio; al cotizador lo agrego yo más adelante."_
**Respuesta:**

---

## Pedido de compra

**E14. La hoja A4 del pedido: ¿membrete completo de la empresa o documento interno simple?**
Por qué importa: el membrete completo lleva logo, dirección y datos de contacto. El documento interno es más sencillo y no necesita ese formato.
_Ejemplo: "Membrete completo, como la cotización del cliente."_
**Respuesta:**

**E15. ¿Una hoja por proveedor (para enviar a cada uno por separado) o un solo documento con todos?**
Por qué importa: si cada proveedor recibe su hoja, el panel imprime una por separado. Si es uno solo, se imprime una sola vez.
_Ejemplo: "Una hoja por proveedor, para mandarla separada."_
**Respuesta:**

**E16. ¿Cómo envía hoy el pedido al proveedor: WhatsApp, correo o en persona?**
Por qué importa: define qué formato conviene (imagen o PDF para WhatsApp, o archivo para correo) y si el panel necesita un botón de envío.
_Ejemplo: "WhatsApp con foto de la hoja, y en persona cuando voy al proveedor."_
**Respuesta:**

**E17. ¿El pedido se relaciona con un presupuesto o una obra, o es independiente?**
Por qué importa: si se relaciona, el pedido guarda el número del presupuesto o del proyecto y se puede rastrear.
_Ejemplo: "Se relaciona con el presupuesto del cliente; quiero ver de qué obra es cada pedido."_
**Respuesta:**

**E18. Estados del pedido: borrador, por aprobar y aprobado. ¿Hace falta "enviado" y "recibido"?**
Por qué importa: con "enviado" y "recibido" sabe qué pedidos están pendientes con cada proveedor.
_Ejemplo: "Sí, agregue enviado y recibido después de aprobado."_
**Respuesta:**

**E19. Al recibir la mercadería, ¿debe sumar al inventario del panel?**
Por qué importa: si suma, el inventario se actualiza solo con lo que llega. Si no, el inventario se sigue cargando a mano.
_Ejemplo: "Sí, al marcar recibido que sume al inventario."_
**Respuesta:**

---

## Permisos y datos reales

**E20. ¿Cuándo autoriza guardar el catálogo de proveedores en la base de datos real y publicar las reglas de seguridad?**
Por qué importa: hasta que lo autorice, todo vive en el emulador y nada cambia en la base real ni en la web publicada.
_Ejemplo: "Cuando termine las pruebas en el emulador; avísame antes de publicar."_
**Respuesta:**

**E21. ¿Cada cuánto se actualiza el catálogo desde la API: a pedido o semanal?**
Por qué importa: si es semanal, el catálogo se mantiene al día sin intervención. Si es a pedido, la lista puede quedar desactualizada.
_Ejemplo: "A pedido; yo lo actualizo cuando quiera revisar precios."_
**Respuesta:**
