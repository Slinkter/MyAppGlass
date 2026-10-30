import { describe, it, expect } from "vitest";
import {
  productSchema,
  clientProfileSchema,
  budgetSchema,
} from "@/shared/schemas/ecommerce-schemas";

describe("E-commerce & Inventario - Zod Schemas Validation", () => {
  it("valida un producto correctamente con stock y dimensiones", () => {
    const validProduct = {
      sku: "VID-TEMP-10MM",
      name: "Vidrio Templado Incoloro 10mm",
      description: "Cristal de seguridad procesado térmicamente bajo norma E.040",
      category: "vidrio",
      unit: "m2",
      stock: 45,
      minStockAlert: 10,
      unitPrice: 165.5,
      costPrice: 110.0,
      dimensions: {
        thickness: 10,
      },
      imageUrl: "https://gyacompany.com/images/products/vidrio-10mm.webp",
      isActive: true,
    };

    const parsed = productSchema.safeParse(validProduct);
    expect(parsed.success).toBe(true);
  });

  it("rechaza un producto con stock negativo o precio inválido", () => {
    const invalidProduct = {
      sku: "ALU",
      name: "Tubo",
      category: "aluminio",
      unit: "barra",
      stock: -5,
      unitPrice: -20,
    };

    const parsed = productSchema.safeParse(invalidProduct);
    expect(parsed.success).toBe(false);
  });

  it("valida un perfil de cliente completo con DNI/RUC", () => {
    const validClient = {
      userId: "usr_client_12345",
      email: "cliente@gyacompany.com",
      role: "cliente",
      fullName: "Juan Carlos Pérez Rodríguez",
      dniRuc: "45879632",
      phone: "974278303",
      address: "Av. Los Fresnos 1214",
      district: "La Molina",
    };

    const parsed = clientProfileSchema.safeParse(validClient);
    expect(parsed.success).toBe(true);
  });

  it("valida y calcula un presupuesto con estructura legal", () => {
    const validBudget = {
      creatorUserId: "usr_admin_001",
      creatorRole: "admin",
      customerData: {
        fullName: "Arq. María Elena Prado",
        dniRuc: "20601542407",
        email: "obras@pradoarq.pe",
        phone: "996537435",
        address: "Calle Los Cedros 340",
        district: "La Molina",
      },
      items: [
        {
          sku: "MAMP-SERIE25",
          description: "Mampara Corrediza 2 Hojas Serie 25 con Vidrio Templado 8mm",
          category: "instalacion",
          quantity: 2,
          unit: "unidad",
          unitPrice: 1450.0,
          totalPrice: 2900.0,
          width: 2.4,
          height: 2.1,
          thickness: 8,
        },
      ],
      subtotal: 2900.0,
      installationCost: 450.0,
      igv: 603.0,
      total: 3953.0,
      status: "EMITIDO",
    };

    const parsed = budgetSchema.safeParse(validBudget);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.budgetNumber).toMatch(/^GYA-\d{4}-\d{4}$/);
    }
  });
});
