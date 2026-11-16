// Hoja A4 del presupuesto formal. Membrete tipográfico (igual que la hoja del cotizador web) con los
// datos de `companyData`. No incluye condiciones de pago, plazo ni garantía: el dueño aún no las define.
const PDFDocument = require("pdfkit");
const { companyData } = require("../shared/company-data");
const { UNIDAD_LABELS } = require("../shared/presupuesto-schema");

const TINTA = "#111111";
const GRIS = "#555555";
const LINEA = "#CCCCCC";
const CORAL = "#FF5A5F"; // único acento de marca; solo en texto grande
const MARGEN = 48;

const fmtSoles = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtCantidad = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 3 });
const fmtFecha = new Intl.DateTimeFormat("es-PE", { timeZone: "America/Lima", day: "2-digit", month: "2-digit", year: "numeric" });

const soles = (n) => `S/ ${fmtSoles.format(Number(n) || 0)}`;

/** Acepta Date, Timestamp de Firestore o ISO; devuelve Date o null. */
function aFecha(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  if (typeof valor.toDate === "function") return valor.toDate();
  const d = new Date(valor);
  return Number.isNaN(d.getTime()) ? null : d;
}

const fecha = (valor) => {
  const d = aFecha(valor);
  return d ? fmtFecha.format(d) : "—";
};

// Columnas de la tabla: [título, ancho, alineación]
const COLUMNAS = [
  ["N.º", 28, "left"],
  ["Descripción", 235, "left"],
  ["Und.", 42, "left"],
  ["Cant.", 50, "right"],
  ["P. unit.", 70, "right"],
  ["Importe", 74, "right"],
];

function filaTabla(doc, y, celdas, { negrita = false, color = TINTA } = {}) {
  let x = MARGEN;
  doc.font(negrita ? "Helvetica-Bold" : "Helvetica").fontSize(9).fillColor(color);
  let alto = 0;
  celdas.forEach((texto, i) => {
    const [, ancho, alineacion] = COLUMNAS[i];
    alto = Math.max(alto, doc.heightOfString(String(texto), { width: ancho - 6, align: alineacion }));
  });
  celdas.forEach((texto, i) => {
    const [, ancho, alineacion] = COLUMNAS[i];
    doc.text(String(texto), x, y, { width: ancho - 6, align: alineacion });
    x += ancho;
  });
  return y + alto + 8;
}

function encabezadoTabla(doc, y) {
  const fin = filaTabla(doc, y, COLUMNAS.map((c) => c[0].toUpperCase()), { negrita: true, color: GRIS });
  doc.moveTo(MARGEN, fin - 4).lineTo(doc.page.width - MARGEN, fin - 4).lineWidth(1.2).strokeColor(TINTA).stroke();
  return fin + 2;
}

/**
 * Genera el PDF del presupuesto.
 * @param {object} p documento `presupuestos/{numero}`
 * @return {Promise<Buffer>}
 */
function renderPresupuestoPdf(p) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: MARGEN,
      info: { Title: `Presupuesto ${p.numero}`, Author: companyData.razonSocial },
    });
    const partes = [];
    doc.on("data", (parte) => partes.push(parte));
    doc.on("end", () => resolve(Buffer.concat(partes)));
    doc.on("error", reject);

    const anchoUtil = doc.page.width - MARGEN * 2;
    const limiteInferior = doc.page.height - MARGEN - 40;

    // --- Membrete ---
    doc.font("Helvetica-Bold").fontSize(8).fillColor(GRIS).text("VIDRIERÍA & ALUMINIO", MARGEN, MARGEN, { characterSpacing: 1.5 });
    doc.font("Times-Bold").fontSize(17).fillColor(TINTA).text("Glass & Aluminum Company S.A.C.", MARGEN, MARGEN + 14);
    doc.font("Helvetica").fontSize(8.5).fillColor(GRIS);
    doc.text(`RUC: ${companyData.ruc}`, MARGEN, MARGEN + 38);
    doc.text(companyData.direccion, MARGEN, MARGEN + 50);
    doc.text(`WhatsApp ${companyData.whatsappDisplay} · ${companyData.contactEmail}`, MARGEN, MARGEN + 62);

    doc.font("Times-Bold").fontSize(20).fillColor(CORAL).text("PRESUPUESTO", MARGEN, MARGEN, { width: anchoUtil, align: "right" });
    doc.font("Helvetica-Bold").fontSize(12).fillColor(TINTA).text(p.numero, MARGEN, MARGEN + 26, { width: anchoUtil, align: "right" });
    doc.font("Helvetica").fontSize(8.5).fillColor(GRIS);
    doc.text(`Fecha: ${fecha(p.enviadoEl || p.updatedAt || p.createdAt)}`, MARGEN, MARGEN + 44, { width: anchoUtil, align: "right" });
    const vence = p.venceEl ? ` (hasta el ${fecha(p.venceEl)})` : "";
    doc.text(`Validez: ${p.validezDias} días${vence}`, MARGEN, MARGEN + 56, { width: anchoUtil, align: "right" });
    if (p.estado === "borrador") {
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(GRIS).text("BORRADOR: no válido como presupuesto", MARGEN, MARGEN + 68, { width: anchoUtil, align: "right" });
    }

    let y = MARGEN + 86;
    doc.moveTo(MARGEN, y).lineTo(doc.page.width - MARGEN, y).lineWidth(1.5).strokeColor(TINTA).stroke();
    y += 14;

    // --- Cliente ---
    const c = p.cliente || {};
    doc.font("Helvetica-Bold").fontSize(8).fillColor(GRIS).text("CLIENTE", MARGEN, y, { characterSpacing: 1 });
    y += 13;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(TINTA).text(c.fullName || "—", MARGEN, y, { width: anchoUtil });
    y = doc.y + 3;
    const documento = c.dniRuc ? `${String(c.dniRuc).length === 11 ? "RUC" : "DNI"}: ${c.dniRuc}` : "";
    const direccion = [c.address, c.district].filter(Boolean).join(", ");
    const lineasCliente = [
      documento,
      c.contactName ? `Contacto: ${c.contactName}` : "",
      [c.phone ? `Tel.: ${c.phone}` : "", c.email].filter(Boolean).join(" · "),
      direccion ? `Dirección: ${direccion}` : "",
    ].filter(Boolean);
    doc.font("Helvetica").fontSize(9).fillColor(TINTA);
    lineasCliente.forEach((linea) => {
      doc.text(linea, MARGEN, y, { width: anchoUtil });
      y = doc.y + 2;
    });
    y += 14;

    // --- Tabla de ítems ---
    y = encabezadoTabla(doc, y);
    (p.items || []).forEach((item, i) => {
      const celdas = [
        i + 1,
        item.descripcion,
        UNIDAD_LABELS[item.unidad] || item.unidad,
        fmtCantidad.format(item.cantidad),
        fmtSoles.format(item.precioUnitario),
        fmtSoles.format(item.importe),
      ];
      doc.font("Helvetica").fontSize(9);
      const alto = doc.heightOfString(String(item.descripcion), { width: COLUMNAS[1][1] - 6 }) + 8;
      if (y + alto > limiteInferior) {
        doc.addPage();
        y = encabezadoTabla(doc, MARGEN);
      }
      y = filaTabla(doc, y, celdas);
      doc.moveTo(MARGEN, y - 4).lineTo(doc.page.width - MARGEN, y - 4).lineWidth(0.5).strokeColor(LINEA).stroke();
      y += 2;
    });

    // --- Totales ---
    if (y + 90 > limiteInferior) {
      doc.addPage();
      y = MARGEN;
    }
    y += 10;
    const xEtiqueta = doc.page.width - MARGEN - 220;
    const filaTotal = (etiqueta, valor, fuerte) => {
      doc.font(fuerte ? "Helvetica-Bold" : "Helvetica").fontSize(fuerte ? 12 : 10).fillColor(TINTA);
      doc.text(etiqueta, xEtiqueta, y, { width: 110, align: "left" });
      doc.text(valor, xEtiqueta + 110, y, { width: 110, align: "right" });
      y += fuerte ? 20 : 16;
    };
    filaTotal("Subtotal", soles(p.subtotal));
    filaTotal(`IGV (${Math.round((p.igvRate || 0) * 100)} %)`, soles(p.igv));
    doc.moveTo(xEtiqueta, y).lineTo(doc.page.width - MARGEN, y).lineWidth(1.2).strokeColor(TINTA).stroke();
    y += 6;
    filaTotal("Total", soles(p.total), true);

    // --- Notas ---
    if (p.notas) {
      if (y + 50 > limiteInferior) {
        doc.addPage();
        y = MARGEN;
      }
      y += 10;
      doc.font("Helvetica-Bold").fontSize(8).fillColor(GRIS).text("NOTAS", MARGEN, y, { characterSpacing: 1 });
      y += 13;
      doc.font("Helvetica").fontSize(9).fillColor(TINTA).text(p.notas, MARGEN, y, { width: anchoUtil });
      y = doc.y;
    }

    // --- Pie ---
    doc.font("Helvetica").fontSize(8).fillColor(GRIS).text("Precios expresados en soles (S/).", MARGEN, doc.page.height - MARGEN - 22, {
      width: anchoUtil,
      align: "center",
      lineBreak: false,
    });
    doc.text(`${companyData.razonSocial} · ${companyData.horario}`, MARGEN, doc.page.height - MARGEN - 10, {
      width: anchoUtil,
      align: "center",
      lineBreak: false,
    });

    doc.end();
  });
}

module.exports = { renderPresupuestoPdf, aFecha };
