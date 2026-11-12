/**
 * @file quoteTexts.ts
 * @description Textos del cotizador de presupuesto (primera entrega: Ventana · Sistema Nova).
 * Trato de usted. Sin precios, porcentajes, medidas ni plazos escritos a mano: esos valores
 * llegan como argumento desde `WINDOW_PRICING`. Nombre, teléfono y dirección de la empresa
 * salen de `companyData`, no de aquí. Los mensajes de validación de medidas y de hojas
 * los devuelve `entities/quote/lib/windowRules.ts`; no se repiten.
 * @module features/presupuesto
 */

/** Página `/presupuesto` (RF1). */
const page = {
  title: "Su presupuesto de ventanas",
  lead: "Arme su presupuesto en unos minutos, sin crear cuenta. El precio incluye vidrio, perfiles de aluminio, accesorios e instalación en La Molina.",
} as const;

/** Elección entre visita técnica y presupuesto (RF2, RF3). */
const chooser = {
  heading: (category: string, system: string) => `Para: ${category} · ${system}`,
  question: "¿Cómo quiere continuar?",
  visit: {
    title: "Visita técnica gratuita",
    description:
      "Un técnico va a su casa, toma las medidas y le explica qué ventana le conviene. Ideal si no está seguro de qué vidrio o sistema elegir.",
    zone: "Atendemos en La Molina, Surco, San Borja, San Isidro y Miraflores.",
    button: "Agende su visita técnica",
  },
  quote: {
    title: "Crear presupuesto",
    description:
      "Ponga las medidas de su ventana, elija vidrio y color, y vea el precio al instante. Puede sumar varias ventanas.",
    button: "Cree su presupuesto",
  },
} as const;

/** Formulario de la ventana (RF4 a RF13). */
const form = {
  title: "Datos de su ventana",
  width: {
    label: "Ancho (en metros)",
    help: (example: string) => `Mida el vano de lado a lado. Puede usar coma o punto, por ejemplo ${example}.`,
  },
  height: {
    label: "Alto (en metros)",
    help: (example: string) => `Mida el vano de arriba hacia abajo. Puede usar coma o punto, por ejemplo ${example}.`,
  },
  glassType: {
    label: "Tipo de vidrio",
    options: {
      crudo: { label: "Crudo", help: "Vidrio común, sin tratamiento. Es la opción más económica." },
      templado: {
        label: "Templado",
        help: "Se rompe en trozos pequeños y resiste más los golpes.",
      },
    },
  },
  glassColor: {
    label: "Color del vidrio",
    options: { incoloro: "Incoloro", bronce: "Bronce", gris: "Gris" },
  },
  profileColor: {
    label: "Color del perfil de aluminio",
    options: { negro: "Negro", mate: "Mate", blanco: "Blanco", madera: "Madera", champagne: "Champagne" },
  },
  colorNote: "El color del vidrio y del perfil no cambia el precio.",
  finish: {
    label: "Acabado del vidrio (opcional)",
    options: {
      ninguno: { label: "Ninguno", help: "Vidrio liso, sin acabado adicional." },
      arenado: { label: "Arenado", help: "Superficie opaca que da privacidad y deja pasar la luz." },
      laminado: { label: "Laminado", help: "Dos vidrios unidos por una lámina; si se rompe, los trozos quedan pegados." },
    },
    extraLine: "Acabado (se suma aparte)",
  },
  thickness: (mm: number | string) => `Vidrio de ${mm} mm. Es el espesor para el que están diseñados los perfiles.`,
  sashesTitle: "Cómo queda su ventana",
  sashesLabel: "Hojas",
  priceLabel: "Precio de esta ventana (sin IGV)",
  pricePending: "Precio a definir",
  addButton: "Agregar al presupuesto",
  saveEditButton: "Guardar cambios",
  cancelEditButton: "Cancelar edición",
  visitButton: "Pida su visita técnica",
  visitHelp: "Una medida fuera de lo estándar la revisa un técnico en su domicilio, sin costo.",
} as const;

/** Carrito y totales (RF14 a RF21). */
const cart = {
  title: "Su presupuesto",
  empty: "Todavía no agregó ninguna ventana. Complete las medidas y toque \"Agregar al presupuesto\".",
  line: {
    title: (index: number) => `Ventana ${index}`,
    sizeValue: (width: string, height: string) => `${width} × ${height} m`,
    glassValue: (type: string, color: string) => `${type}, ${color}`,
    size: "Medidas",
    glass: "Vidrio",
    profile: "Perfil",
    sashes: "Hojas",
    finish: "Acabado",
    bodies: "Cuerpos",
    price: "Importe",
  },
  editLabel: (index: number) => `Editar ventana ${index}`,
  removeLabel: (index: number) => `Quitar ventana ${index}`,
  edit: "Editar",
  remove: "Quitar",
  subtotal: "Subtotal",
  freight: "Flete",
  igv: "IGV",
  total: "Total",
  location: {
    question: "¿La instalación es en La Molina?",
    yes: "Sí",
    no: "No",
  },
  freightNotice: (amount: string) =>
    `El precio con instalación vale solo para La Molina. En otros distritos hay un costo adicional de ${amount} sin IGV.`,
  listPrice: (amount: string) => `Precio de lista: ${amount}`,
  cashBenefit: (cashAmount: string, listAmount: string) =>
    `Pagando en efectivo o por QR (Yape, Plin) usted paga ${cashAmount} en lugar de ${listAmount}.`,
  cashSaving: (amount: string) => `Ahorra ${amount} si paga en efectivo o por QR.`,
  items: "Ventanas del presupuesto",
  cashTotal: "Total en efectivo o QR",
  clear: "Limpiar presupuesto",
  clearModal: {
    title: "¿Limpiar su presupuesto?",
    body: "Se quitarán todas las ventanas que agregó. Esta acción no se puede deshacer.",
    confirm: "Sí, limpiar todo",
    cancel: "No, conservar",
  },
  generate: "Generar presupuesto",
  generateDisabled: "Agregue al menos una ventana para generar su presupuesto.",
} as const;

/** Cierre: datos del cliente y aceptación (RF22, RF23). */
const closing = {
  title: "Para generar su presupuesto",
  lead: "Solo necesitamos su nombre y su celular. Así lo encontramos cuando venga a la tienda a validar su cotización.",
  name: { label: "Nombre", placeholder: "Su nombre y apellido" },
  phone: { label: "Celular", placeholder: "Su celular peruano" },
  /** El componente arma: before + enlace(link) + after. El enlace va a `/politicas-empresa`. */
  acceptance: {
    before: "He leído y acepto las ",
    link: "Políticas de Privacidad (Ley N° 29733)",
    after: " y el tratamiento de mis datos para la cotización solicitada.",
  },
  errors: {
    name: "Falta su nombre. Escríbalo para generar el presupuesto.",
    phone: "Revise su celular. Debe tener nueve dígitos y empezar con nueve.",
    acceptance: "Marque la casilla de aceptación para poder generar su presupuesto.",
  },
  button: "Generar presupuesto",
  saving: "Guardando su presupuesto...",
} as const;

/** Hoja del presupuesto, formato A4 (RF24 a RF26). */
const sheet = {
  title: "Presupuesto de ventanas",
  number: "Presupuesto N°",
  date: "Fecha",
  customer: "Cliente",
  phone: "Celular",
  notices: {
    approximate: "Los precios son aproximados.",
    validation: "Las medidas y los precios deben ser validados por un técnico y un vendedor autorizado.",
    changes: "Los precios pueden cambiar sin previo aviso.",
  },
  validity: (term: string) => `Vigencia: ${term}.`,
  print: "Imprimir o guardar en PDF",
  printHelp: "En la ventana de impresión, elija \"Guardar como PDF\" si quiere conservarlo en su celular o computadora.",
  newQuote: "Nuevo presupuesto",
} as const;

/** Resultado del envío y aviso por WhatsApp (RF27, RF29). */
const status = {
  success: (number: string) => `Recibimos su pedido. Su número de presupuesto es ${number}.`,
  successNext: "Puede imprimirlo o guardarlo. Preséntelo en la tienda para que lo validemos.",
  error:
    "No pudimos guardar su presupuesto en este momento. Conservamos su hoja y sus ventanas. Escríbanos por WhatsApp y lo atendemos.",
  whatsappButton: "Escribir por WhatsApp",
  whatsappMessage: (number: string, name: string) =>
    `Hola, soy ${name}. Generé el presupuesto ${number} en su web y quisiera validarlo.`,
} as const;

/** Formulario corto de visita técnica (RF3). */
const visit = {
  title: (category: string, system: string) => `Visita técnica gratuita para: ${category} · ${system}`,
  lead: "Déjenos su nombre y su celular. Le escribiremos para coordinar el día y la hora.",
  zone: "Atendemos en La Molina, Surco, San Borja, San Isidro y Miraflores.",
  name: { label: "Nombre", placeholder: "Su nombre y apellido" },
  phone: { label: "Celular", placeholder: "Su celular peruano" },
  button: "Pedir visita técnica",
  saving: "Enviando su pedido...",
  confirmation: "Recibimos su pedido de visita. Le escribiremos por WhatsApp para coordinar.",
  error:
    "No pudimos enviar su pedido en este momento. Escríbanos por WhatsApp y coordinamos su visita.",
  back: "Volver",
} as const;

export const QUOTE_TEXTS = { page, chooser, form, cart, closing, sheet, status, visit } as const;
