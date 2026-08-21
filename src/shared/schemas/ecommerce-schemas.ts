import { z } from "zod";

/**
 * Esquema para dimensiones físicas de productos
 */
export const productDimensionsSchema = z.object({
  width: z.number().positive("El ancho debe ser mayor a 0").optional(),
  height: z.number().positive("El alto debe ser mayor a 0").optional(),
  thickness: z.number().positive("El espesor debe ser mayor a 0").optional(), // ej. 6, 8, 10 mm
  length: z.number().positive("El largo de barra debe ser mayor a 0").optional(), // ej. 6.00 m
});

export type ProductDimensions = z.infer<typeof productDimensionsSchema>;

/**
 * Esquema Maestro de Producto para E-commerce e Inventario
 */
export const productSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(3, "El SKU debe tener al menos 3 caracteres").toUpperCase(),
  name: z.string().min(3, "El nombre del producto debe tener al menos 3 caracteres"),
  description: z.string().max(1000, "La descripción no puede exceder 1000 caracteres").optional().default(""),
  category: z.enum(["vidrio", "aluminio", "accesorio", "servicio", "consumible"], {
    message: "Categoría no válida",
  }),
  unit: z.enum(["m2", "barra", "unidad", "kg", "servicio", "plancha"], {
    message: "Unidad de medida no válida",
  }),
  stock: z.number().int().nonnegative("El stock no puede ser negativo").default(0),
  minStockAlert: z.number().int().nonnegative("La alerta de stock mínimo debe ser mayor o igual a 0").default(5),
  unitPrice: z.number().positive("El precio unitario debe ser mayor a 0"),
  costPrice: z.number().nonnegative("El precio de costo debe ser mayor o igual a 0").optional().default(0),
  dimensions: productDimensionsSchema.optional(),
  imageUrl: z.string().optional().default(""),
  glbModelUrl: z.string().optional(),
  usdzModelUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export type Product = z.infer<typeof productSchema>;

/**
 * Esquema de Usuario / Cliente
 */
export const userRoleSchema = z.enum(["admin", "cliente"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const clientProfileSchema = z.object({
  userId: z.string(),
  email: z.string().email("Correo electrónico no válido"),
  role: userRoleSchema.default("cliente"),
  fullName: z.string().min(3, "El nombre completo es requerido"),
  dniRuc: z.string().min(8, "DNI o RUC debe tener al menos 8 dígitos").max(11, "DNI o RUC no puede exceder 11 dígitos"),
  phone: z.string().min(9, "El teléfono celular debe tener al menos 9 dígitos"),
  address: z.string().min(5, "La dirección es requerida"),
  district: z.string().min(3, "El distrito es requerido"),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export type ClientProfile = z.infer<typeof clientProfileSchema>;

/**
 * Esquema de Item en Presupuesto
 */
export const budgetItemSchema = z.object({
  productId: z.string().optional(),
  sku: z.string().optional(),
  description: z.string().min(2, "Descripción del ítem requerida"),
  category: z.enum(["vidrio", "aluminio", "accesorio", "servicio", "instalacion"]),
  quantity: z.number().positive("La cantidad debe ser mayor a 0"),
  unit: z.string().default("unidad"),
  unitPrice: z.number().nonnegative("El precio unitario no puede ser negativo"),
  totalPrice: z.number().nonnegative("El total del ítem no puede ser negativo"),
  width: z.number().optional(),
  height: z.number().optional(),
  thickness: z.number().optional(),
});

export type BudgetItem = z.infer<typeof budgetItemSchema>;

/**
 * Esquema Maestro de Presupuesto Formal
 */
export const budgetSchema = z.object({
  id: z.string().optional(),
  budgetNumber: z.string().default(() => `GYA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`),
  creatorUserId: z.string(),
  creatorRole: userRoleSchema,
  customerData: z.object({
    fullName: z.string().min(2, "Nombre de cliente requerido"),
    dniRuc: z.string().min(8, "DNI o RUC requerido"),
    email: z.string().email("Correo de cliente requerido"),
    phone: z.string().min(9, "Teléfono requerido"),
    address: z.string().min(5, "Dirección de instalación requerida"),
    district: z.string().min(3, "Distrito requerido"),
  }),
  items: z.array(budgetItemSchema).min(1, "El presupuesto debe incluir al menos un ítem"),
  subtotal: z.number().nonnegative(),
  installationCost: z.number().nonnegative().default(0),
  igv: z.number().nonnegative(),
  total: z.number().positive(),
  status: z.enum(["BORRADOR", "EMITIDO", "ACEPTADO", "RECHAZADO"]).default("EMITIDO"),
  notes: z.string().optional().default("Presupuesto válido por 15 días hábiles. Incluye garantía de fábrica."),
  expiresAt: z.any().optional(),
  createdAt: z.any().optional(),
});

export type Budget = z.infer<typeof budgetSchema>;
