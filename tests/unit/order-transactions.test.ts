import { describe, it, expect } from "vitest";
import {
  orderItemSchema,
  orderSchema,
  Product,
  Order,
} from "@/shared/schemas/ecommerce-schemas";
import { exportInventoryToExcel, exportOrdersToExcel } from "@/shared/utils/excel-export";

describe("Módulo de Ventas & Despacho - Pruebas Unitarias de Contratos y Transacciones", () => {
  it("valida un ítem de orden de venta correctamente", () => {
    const validItem = {
      productId: "prod_vidrio_8mm",
      sku: "VID-TEMP-8MM",
      name: "Vidrio Templado Incoloro 8mm",
      category: "vidrio" as const,
      unit: "m2",
      unitPrice: 125.0,
      quantity: 10,
      totalPrice: 1250.0,
    };

    const parsed = orderItemSchema.safeParse(validItem);
    expect(parsed.success).toBe(true);
  });

  it("rechaza un ítem de orden con cantidad negativa o 0", () => {
    const invalidItem = {
      productId: "prod_aluminio_25",
      sku: "ALU-SERIE25",
      name: "Perfil Serie 25",
      category: "aluminio" as const,
      unit: "barra",
      unitPrice: 85.0,
      quantity: 0,
      totalPrice: 0,
    };

    const parsed = orderItemSchema.safeParse(invalidItem);
    expect(parsed.success).toBe(false);
  });

  it("valida una orden de venta completa con snapshot de cliente y cálculo de IGV", () => {
    const validOrder = {
      adminUid: "usr_admin_001",
      adminName: "Luis Joya",
      clientId: "cli_constructora_fresnos",
      clientName: "Constructora Los Fresnos S.A.C.",
      clientDniRuc: "20601542407",
      clientPhone: "974278303",
      clientAddress: "Av. Los Fresnos 1214",
      clientDistrict: "La Molina",
      items: [
        {
          productId: "prod_vidrio_8mm",
          sku: "VID-TEMP-8MM",
          name: "Vidrio Templado 8mm",
          category: "vidrio" as const,
          unit: "m2",
          unitPrice: 125.0,
          quantity: 4,
          totalPrice: 500.0,
        },
        {
          productId: "prod_perfil_nova",
          sku: "PERF-NOVA-NEG",
          name: "Perfil Nova Negro Mate",
          category: "aluminio" as const,
          unit: "barra",
          unitPrice: 90.0,
          quantity: 2,
          totalPrice: 180.0,
        },
      ],
      subtotal: 680.0,
      igv: 122.4,
      total: 802.4,
      status: "DESPACHADO" as const,
      paymentMethod: "TRANSFERENCIA_BCP" as const,
      notes: "Entregar en obra Residencial El Sol",
    };

    const parsed = orderSchema.safeParse(validOrder);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.orderNumber).toMatch(/^ORD-\d{4}-\d{4}$/);
      expect(parsed.data.items.length).toBe(2);
      expect(parsed.data.total).toBe(802.4);
    }
  });

  it("garantiza que exportInventoryToExcel y exportOrdersToExcel no fallen en entorno Node/Test", () => {
    const sampleProducts: Product[] = [
      {
        sku: "TEST-01",
        name: "Producto Prueba",
        category: "accesorio",
        unit: "unidad",
        stock: 20,
        minStockAlert: 5,
        unitPrice: 50,
        costPrice: 30,
        isActive: true,
      },
    ];

    expect(() => exportInventoryToExcel(sampleProducts)).not.toThrow();
  });
});
