import * as XLSX from "xlsx";
import { Product, Order } from "@/shared/schemas/ecommerce-schemas";

/**
 * Exporta cualquier lista de objetos a un archivo Excel (.xlsx) y dispara la descarga en el navegador.
 */
export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  fileName: string,
  sheetName: string = "Datos"
) {
  if (typeof window === "undefined" || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

/**
 * Exporta el catálogo actual de inventario a Excel con columnas amigables.
 */
export function exportInventoryToExcel(products: Product[]) {
  const formatted = products.map((p) => ({
    SKU: p.sku,
    "Nombre del Producto": p.name,
    Categoría: p.category.toUpperCase(),
    "Unidad de Medida": p.unit,
    "Stock Actual": p.stock,
    "Alerta Mínima": p.minStockAlert,
    "Estado de Stock": p.stock === 0 ? "CRÍTICO (AGOTADO)" : p.stock <= p.minStockAlert ? "BAJO" : "ÓPTIMO",
    "Precio Venta (S/.)": p.unitPrice,
    "Precio Costo (S/.)": p.costPrice || 0,
    "Margen Bruto (%)": p.costPrice && p.unitPrice ? Math.round(((p.unitPrice - p.costPrice) / p.unitPrice) * 100) : 0,
    "Valor Total Stock (S/.)": Math.round(p.stock * p.unitPrice * 100) / 100,
  }));

  const dateStr = new Date().toISOString().split("T")[0];
  exportToExcel(formatted, `GYA_Inventario_${dateStr}`, "Inventario");
}

/**
 * Exporta el historial de órdenes a Excel con detalle consolidado.
 */
export function exportOrdersToExcel(orders: Order[]) {
  const formatted = orders.map((o) => ({
    "N° Orden": o.orderNumber,
    "Cliente": o.clientName,
    "DNI / RUC": o.clientDniRuc || "N/A",
    "Teléfono": o.clientPhone || "N/A",
    "Total Productos (Tipos)": o.items.length,
    "Total Unidades Despachadas": o.items.reduce((acc, i) => acc + i.quantity, 0),
    "Subtotal (S/.)": o.subtotal,
    "IGV (S/.)": o.igv,
    "Total Venta (S/.)": o.total,
    "Método de Pago": o.paymentMethod,
    "Estado": o.status,
    "Administrador Responsable": o.adminName,
    "Fecha / Hora": o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString("es-PE") : "N/A",
  }));

  const dateStr = new Date().toISOString().split("T")[0];
  exportToExcel(formatted, `GYA_Reporte_Ventas_${dateStr}`, "Ventas");
}
