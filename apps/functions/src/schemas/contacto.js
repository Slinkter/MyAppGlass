// Esquema Zod del formulario de Contacto/Cotización (validación backend).
const { z } = require("zod");

const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(100).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
  email: z.string().email("Email inválido").max(200),
  phone: z.string().max(20).regex(/^\+?[0-9 \-()]*$/, "Teléfono inválido").optional().default(""),
  message: z.string().min(5, "Mensaje muy corto").max(2000).regex(/^[^<>{}]+$/, "Caracteres no permitidos"),
});

module.exports = { contactSchema };
