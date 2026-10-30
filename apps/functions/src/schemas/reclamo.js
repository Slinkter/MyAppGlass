// Esquema Zod del Libro de Reclamaciones (validación backend).
const { z } = require("zod");

const reclamoSchema = z.object({
  nombreCompleto: z.string().min(3, "Nombre muy corto").max(120).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
  email: z.string().email("Email inválido").max(200),
  tipoDocumento: z.enum(["DNI", "CE", "Carné de Extranjería", "PASAPORTE", "Pasaporte", "RUC"], { message: "Tipo de documento no válido" }),
  numeroDocumento: z.string().min(6).max(15).regex(/^[a-zA-Z0-9]+$/, "Número de documento inválido"),
  domicilio: z.string().min(5, "Domicilio muy corto").max(300).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
  telefono: z.string().min(7).max(20).regex(/^\+?[0-9 \-()]+$/, "Teléfono inválido"),
  tipoSolicitud: z.enum(["Reclamo", "Queja"], { message: "Tipo de solicitud no válido" }),
  tipoBien: z.enum(["producto", "servicio"], { message: "Tipo de bien no válido" }),
  montoReclamado: z.union([z.string(), z.number()]).optional().default(0).transform((v) => Number(v || 0)).refine((n) => !isNaN(n) && n >= 0 && n <= 999999, "Monto inválido"),
  descripcionBien: z.string().min(3).max(500).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
  detalle: z.string().min(10, "El detalle es muy corto").max(2000).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
  pedido: z.string().min(10, "El pedido es muy corto").max(1000).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
});

module.exports = { reclamoSchema };
