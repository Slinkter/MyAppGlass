// Lógica del presupuesto formal (colección `presupuestos`, id PRES-0001).
// Los totales y el correlativo se calculan aquí, dentro de una transacción; el cliente nunca los envía.
const { HttpsError } = require("firebase-functions/v2/https");
const { calcularTotales, formatNumeroPresupuesto, IGV_RATE } = require("../shared/presupuesto-totales");
const {
  guardarPresupuestoInputSchema,
  cambiarEstadoInputSchema,
  puedeCambiarEstado,
  ESTADO_PRESUPUESTO_LABELS,
} = require("../shared/presupuesto-schema");
const { validarEntrada } = require("../guards/requireAdmin");

const COL_PRESUPUESTOS = "presupuestos";
const COL_CLIENTES = "clientes";
const COL_PRODUCTOS = "productos";
const COL_CONTADORES = "contadores";
const CONTADOR_ID = "presupuestos-formales";
const DIA_MS = 24 * 60 * 60 * 1000;

// Correo de relleno que generaba el panel anterior cuando el cliente no tenía correo.
const CORREO_DE_RELLENO = /^cliente_\d+@gyacompany\.com$/i;

/** Copia de los datos del cliente que queda fija en el presupuesto. */
function copiarCliente(c) {
  const email = typeof c.email === "string" && !CORREO_DE_RELLENO.test(c.email) ? c.email : "";
  return {
    fullName: String(c.fullName || ""),
    dniRuc: String(c.dniRuc || ""),
    contactName: String(c.contactName || ""),
    phone: String(c.phone || ""),
    email,
    address: String(c.address || ""),
    district: String(c.district || ""),
  };
}

/**
 * Crea un presupuesto en borrador (sin `numero`) o edita uno existente en borrador.
 * @param {object} db Firestore (Admin SDK)
 * @param {unknown} entrada ver `guardarPresupuestoInputSchema`
 * @param {{ uid: string }} actor administrador que guarda
 * @param {Date} [ahora]
 * @return {Promise<{ numero: string, estado: string, subtotal: number, igv: number, total: number }>}
 */
async function guardarPresupuesto(db, entrada, actor, ahora = new Date()) {
  const datos = validarEntrada(guardarPresupuestoInputSchema, entrada);
  const totales = calcularTotales(datos.items, IGV_RATE);
  if (totales.total <= 0) {
    throw new HttpsError("invalid-argument", "El total del presupuesto debe ser mayor a 0.");
  }

  return db.runTransaction(async (tx) => {
    // --- Lecturas (todas antes de escribir) ---
    const clienteSnap = await tx.get(db.collection(COL_CLIENTES).doc(datos.clienteId));
    if (!clienteSnap.exists) {
      throw new HttpsError("not-found", "El cliente elegido ya no existe.");
    }
    const cliente = clienteSnap.data();
    if (cliente.isActive === false) {
      throw new HttpsError("failed-precondition", "El cliente está desactivado. Actívelo para cotizarle.");
    }

    const idsProducto = [...new Set(datos.items.map((i) => i.productoId).filter(Boolean))];
    const productos = new Map();
    for (const id of idsProducto) {
      const snap = await tx.get(db.collection(COL_PRODUCTOS).doc(id));
      if (snap.exists) productos.set(id, snap.data());
    }

    const items = datos.items.map((item, indice) => {
      const producto = item.productoId ? productos.get(item.productoId) : null;
      if (item.productoId && !producto) {
        throw new HttpsError("not-found", `El ítem ${indice + 1} ya no está en el catálogo. Quítelo y vuelva a agregarlo.`);
      }
      if (producto && producto.isActive === false) {
        throw new HttpsError("failed-precondition", `El ítem ${indice + 1} está desactivado en el catálogo.`);
      }
      const tipo = producto ? (producto.category === "servicio" ? "servicio" : "producto") : item.tipo || "producto";
      const linea = {
        descripcion: item.descripcion,
        tipo,
        unidad: item.unidad,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        importe: totales.importes[indice],
      };
      if (item.productoId) linea.productoId = item.productoId;
      if (producto && producto.sku) linea.sku = String(producto.sku);
      return linea;
    });

    const comunes = {
      clienteId: datos.clienteId,
      cliente: copiarCliente(cliente),
      items,
      subtotal: totales.subtotal,
      igv: totales.igv,
      total: totales.total,
      igvRate: IGV_RATE,
      moneda: "PEN",
      validezDias: datos.validezDias,
      notas: datos.notas || "",
      actualizadoPor: actor.uid,
      updatedAt: ahora,
    };

    if (datos.numero) {
      // --- Edición de un borrador ---
      const ref = db.collection(COL_PRESUPUESTOS).doc(datos.numero);
      const snap = await tx.get(ref);
      if (!snap.exists) {
        throw new HttpsError("not-found", `No existe el presupuesto ${datos.numero}.`);
      }
      if (snap.data().estado !== "borrador") {
        throw new HttpsError("failed-precondition", "Solo se puede editar un presupuesto en borrador.");
      }
      tx.set(ref, comunes, { merge: true });
      return { numero: datos.numero, estado: "borrador", subtotal: totales.subtotal, igv: totales.igv, total: totales.total };
    }

    // --- Alta: reserva del correlativo ---
    const contadorRef = db.collection(COL_CONTADORES).doc(CONTADOR_ID);
    const contadorSnap = await tx.get(contadorRef);
    const previo = contadorSnap.exists ? Number(contadorSnap.data().seq) || 0 : 0;
    const seq = previo + 1;
    const numero = formatNumeroPresupuesto(seq);
    const ref = db.collection(COL_PRESUPUESTOS).doc(numero);
    const existente = await tx.get(ref);
    if (existente.exists) {
      throw new HttpsError("internal", `El correlativo ${numero} ya está en uso. Avise al administrador del sistema.`);
    }

    tx.set(contadorRef, { seq });
    tx.set(ref, {
      ...comunes,
      numero,
      estado: "borrador",
      venceEl: null,
      pdf: null,
      enviadoEl: null,
      resueltoEl: null,
      creadoPor: actor.uid,
      createdAt: ahora,
    });
    return { numero, estado: "borrador", subtotal: totales.subtotal, igv: totales.igv, total: totales.total };
  });
}

/**
 * Cambia el estado: borrador → enviado → aprobado | rechazado.
 * @param {object} db Firestore (Admin SDK)
 * @param {unknown} entrada ver `cambiarEstadoInputSchema`
 * @param {{ uid: string }} actor
 * @param {Date} [ahora]
 * @return {Promise<{ numero: string, estado: string, venceEl?: string }>}
 */
async function cambiarEstadoPresupuesto(db, entrada, actor, ahora = new Date()) {
  const datos = validarEntrada(cambiarEstadoInputSchema, entrada);

  return db.runTransaction(async (tx) => {
    const ref = db.collection(COL_PRESUPUESTOS).doc(datos.numero);
    const snap = await tx.get(ref);
    if (!snap.exists) {
      throw new HttpsError("not-found", `No existe el presupuesto ${datos.numero}.`);
    }
    const actual = snap.data();
    if (!puedeCambiarEstado(actual.estado, datos.estado)) {
      const desde = ESTADO_PRESUPUESTO_LABELS[actual.estado] || actual.estado;
      const hacia = ESTADO_PRESUPUESTO_LABELS[datos.estado];
      throw new HttpsError("failed-precondition", `Un presupuesto en estado "${desde}" no puede pasar a "${hacia}".`);
    }

    const cambios = { estado: datos.estado, actualizadoPor: actor.uid, updatedAt: ahora };
    const salida = { numero: datos.numero, estado: datos.estado };
    if (datos.estado === "enviado") {
      const venceEl = new Date(ahora.getTime() + Number(actual.validezDias || 0) * DIA_MS);
      cambios.enviadoEl = ahora;
      cambios.venceEl = venceEl;
      salida.venceEl = venceEl.toISOString();
    } else {
      cambios.resueltoEl = ahora;
    }
    tx.set(ref, cambios, { merge: true });
    return salida;
  });
}

module.exports = {
  guardarPresupuesto,
  cambiarEstadoPresupuesto,
  copiarCliente,
  COL_PRESUPUESTOS,
  CONTADOR_ID,
};
