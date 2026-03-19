# Plan de Migración Next.js - Fase 4 y 5

Este documento complementa el plan de migración principal y cubre la migración de Cloud Functions a API Routes y la configuración de SEO/Metadata para Next.js.

---

## Fase 4: Migrar API (Cloud Functions → API Routes)

### 4.1 Visión General

La migración de Firebase Cloud Functions a Next.js API Routes ofrece múltiples ventajas:
- **Unified deployment**: Todo el código queda en un solo proyecto
- **Menor cold start**: Next.js optimiza automáticamente las funciones
- **Type safety**: Posibilidad de usar TypeScript completo
- **Desarrollo local simplificado**: Sin emuladores de Firebase

### 4.2 Estructura de Archivos

```
myappglass/
├── app/
│   └── api/
│       └── contacto/
│           └── route.js        # Endpoint único para contacto
├── lib/
│   ├── firebase-admin.js       # Admin SDK para server-side
│   ├── resend.js              # Cliente de email
│   └── validation.js          # Funciones de validación
├── app/
│   └── components/
│       └── ContactForm.jsx    # Frontend del formulario
```

### 4.3 Código de Cloud Functions Actual

**Archivo: `functions/index.js`**

```javascript
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

admin.initializeApp();

const { sendEmailLogic } = require("./emailSender");

/**
 * Función HTTP para enviar un correo desde un formulario de contacto.
 */
exports.sendContactEmail = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY"],
  },
  (request, response) => {
    cors(request, response, async () => {
      if (request.method !== "POST") {
        response.status(405).json({
          success: false,
          message: "Método no permitido. Por favor, usa POST.",
        });
        return;
      }

      try {
        logger.info("Nueva petición de formulario de contacto recibida.", { body: request.body });
        
        const emailData = request.body;
        const result = await sendEmailLogic(emailData, admin);

        response.status(200).json({
          success: true,
          message: "Correo enviado exitosamente.",
          data: result,
        });

      } catch (error) {
        logger.error("Error en la función sendContactEmail:", error);
        
        const statusCode = error.code === "invalid-argument" ? 400 : 500;
        
        response.status(statusCode).json({
          success: false,
          message: error.message,
          details: error.details || null,
        });
      }
    });
  }
);
```

### 4.4 Nueva API Route en Next.js

**Archivo: `app/api/contacto/route.js`**

```javascript
import { NextResponse } from "next/server";
import { sendContactEmailLogic } from "@/lib/email-service";
import { validateContactForm } from "@/lib/validation";

/**
 * POST /api/contacto
 * Envía un correo de contacto desde el formulario
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const result = await sendContactEmailLogic(body);

    return NextResponse.json({
      success: true,
      message: "Correo enviado exitosamente.",
      data: result,
    });
  } catch (error) {
    console.error("Error en POST /api/contacto:", error);

    const statusCode = error.status || 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: statusCode }
    );
  }
}

/**
 * GET /api/contacto
 * Health check para verificar que la API está operativa
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "API de contacto operativa",
  });
}
```

### 4.5 Configuración de Firebase Admin

**Archivo: `lib/firebase-admin.js`**

```javascript
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdminConfig() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error("Firebase Admin credentials not configured");
  }

  return {
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  };
}

let adminApp;
let adminDb;

function initFirebaseAdmin() {
  if (getApps().length === 0) {
    adminApp = initializeApp(getFirebaseAdminConfig());
  } else {
    adminApp = getApps()[0];
  }
  adminDb = getFirestore(adminApp);
  return { app: adminApp, db: adminDb };
}

export function getAdminApp() {
  if (!adminApp) {
    initFirebaseAdmin();
  }
  return adminApp;
}

export function getAdminDb() {
  if (!adminDb) {
    initFirebaseAdmin();
  }
  return adminDb;
}
```

### 4.6 Servicio de Email con Resend

**Archivo: `lib/email-service.js`**

```javascript
import { Resend } from "resend";
import { getAdminDb } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_CONTACT_EMAIL || "acueva@gyacompany.com";

function createAdminEmailHtml(data) {
  return `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <h2 style="color: #333;">Nuevo Registro en el Libro de Reclamaciones</h2>
      <p>Se ha generado un nuevo ${data.tipoSolicitud} a través de la web.</p>
      
      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">1. Datos del Consumidor</h3>
      <ul>
        <li><strong>Nombre Completo:</strong> ${data.nombreCompleto}</li>
        <li><strong>Domicilio:</strong> ${data.domicilio}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Teléfono:</strong> ${data.telefono}</li>
        <li><strong>Documento:</strong> ${data.tipoDocumento} - ${data.numeroDocumento}</li>
        ${data.nombrePadreMadre ? `<li><strong>Padre/Madre/Tutor:</strong> ${data.nombrePadreMadre}</li>` : ""}
      </ul>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">2. Datos del Bien Contratado</h3>
      <ul>
        <li><strong>Tipo de Bien:</strong> ${data.tipoBien}</li>
        <li><strong>Monto Reclamado:</strong> S/. ${data.montoReclamado || "No especificado"}</li>
        <li><strong>Descripción:</strong> ${data.descripcionBien}</li>
      </ul>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">3. Detalle de la Solicitud</h3>
      <ul>
        <li><strong>Tipo de Solicitud:</strong> ${data.tipoSolicitud}</li>
        <li><strong>Detalle:</strong> <p style="white-space: pre-wrap;">${data.detalle}</p></li>
        <li><strong>Pedido:</strong> <p style="white-space: pre-wrap;">${data.pedido}</p></li>
      </ul>
    </div>
  `;
}

function createClientEmailHtml(data, reclamoId) {
  return `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <h2 style="color: #333;">Confirmación de ${data.tipoSolicitud}</h2>
      <p>Hola ${data.nombreCompleto},</p>
      <p>Hemos recibido tu <strong>${data.tipoSolicitud}</strong> correctamente. Estamos procesando tu solicitud y te contactaremos a la brevedad.</p>
      <p>El código de seguimiento de tu solicitud es: <strong>${reclamoId}</strong></p>
      <p>Gracias por tu paciencia.</p>
      <br>
      <p>Atentamente,</p>
      <p><strong>El equipo de G&A Company</strong></p>
    </div>
  `;
}

/**
 * Envía email de contacto y guarda en Firestore
 * @param {Object} contactoData - Datos del formulario de contacto
 * @returns {Promise<string>} ID del email enviado
 */
export async function sendContactEmailLogic(contactoData) {
  const db = getAdminDb();

  // Validar campos obligatorios
  const requiredFields = [
    "nombreCompleto",
    "tipoDocumento",
    "numeroDocumento",
    "domicilio",
    "email",
    "telefono",
    "tipoBien",
    "descripcionBien",
    "tipoSolicitud",
    "detalle",
    "pedido",
    "aceptaTerminos",
    "autorizaEmail",
  ];

  const missingFields = requiredFields.filter((field) => !contactoData[field]);

  if (missingFields.length > 0) {
    const error = new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(", ")}`);
    error.status = 400;
    throw error;
  }

  // Validar consentimientos explícitos
  if (contactoData.aceptaTerminos !== true || contactoData.autorizaEmail !== true) {
    const error = new Error("Debe aceptar los términos y autorizar el envío de la respuesta por email.");
    error.status = 403;
    throw error;
  }

  // Enviar email al administrador
  const adminEmailPayload = {
    from: "noreply@gyacompany.com",
    to: ADMIN_EMAIL,
    subject: `Nuevo ${contactoData.tipoSolicitud} de: ${contactoData.nombreCompleto}`,
    html: createAdminEmailHtml(contactoData),
  };

  const adminEmailResponse = await resend.emails.send(adminEmailPayload);
  const emailId = adminEmailResponse.data.id;

  // Enviar confirmación al cliente
  const clientEmailPayload = {
    from: "noreply@gyacompany.com",
    to: contactoData.email,
    subject: `Confirmación de tu ${contactoData.tipoSolicitud}`,
    html: createClientEmailHtml(contactoData, emailId),
  };

  await resend.emails.send(clientEmailPayload);

  // Guardar en Firestore
  await db.collection("libro_de_reclamaciones").doc(emailId).set({
    ...contactoData,
    emailId: emailId,
    createdAt: FieldValue.serverTimestamp(),
  });

  return emailId;
}
```

### 4.7 Validación de Formulario

**Archivo: `lib/validation.js`**

```javascript
/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid
 * @property {string[]} errors
 */

/**
 * Valida los datos del formulario de contacto
 * @param {Object} data - Datos del formulario
 * @returns {ValidationResult}
 */
export function validateContactForm(data) {
  const errors = [];

  if (!data.nombreCompleto || data.nombreCompleto.trim().length < 2) {
    errors.push("El nombre completo es requerido");
  }

  if (!data.tipoDocumento) {
    errors.push("El tipo de documento es requerido");
  }

  if (!data.numeroDocumento || data.numeroDocumento.trim().length < 5) {
    errors.push("El número de documento es requerido");
  }

  if (!data.domicilio || data.domicilio.trim().length < 5) {
    errors.push("El domicilio es requerido");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("El correo electrónico es inválido");
  }

  const phoneRegex = /^[0-9]{9,12}$/;
  const phoneClean = data.telefono?.replace(/\D/g, "") || "";
  if (!phoneClean || !phoneRegex.test(phoneClean)) {
    errors.push("El teléfono debe tener entre 9 y 12 dígitos");
  }

  if (!data.tipoBien) {
    errors.push("El tipo de bien es requerido");
  }

  if (!data.descripcionBien || data.descripcionBien.trim().length < 10) {
    errors.push("La descripción del bien es requerida");
  }

  if (!data.tipoSolicitud) {
    errors.push("El tipo de solicitud es requerido");
  }

  if (!data.detalle || data.detalle.trim().length < 10) {
    errors.push("El detalle de la solicitud es requerido");
  }

  if (!data.pedido || data.pedido.trim().length < 10) {
    errors.push("El pedido es requerido");
  }

  if (data.aceptaTerminos !== true) {
    errors.push("Debe aceptar los términos y condiciones");
  }

  if (data.autorizaEmail !== true) {
    errors.push("Debe autorizar el envío de respuesta por email");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitiza los datos del formulario para prevenir inyección
 * @param {Object} data - Datos crudos del formulario
 * @returns {Object} Datos saneados
 */
export function sanitizeContactForm(data) {
  const sanitizeString = (str) => {
    if (typeof str !== "string") return "";
    return str
      .replace(/[<>]/g, "")
      .trim()
      .substring(0, 5000);
  };

  return {
    nombreCompleto: sanitizeString(data.nombreCompleto),
    tipoDocumento: data.tipoDocumento,
    numeroDocumento: sanitizeString(data.numeroDocumento),
    domicilio: sanitizeString(data.domicilio),
    email: sanitizeString(data.email).toLowerCase(),
    telefono: sanitizeString(data.telefono),
    tipoBien: data.tipoBien,
    montoReclamado: data.montoReclamado,
    descripcionBien: sanitizeString(data.descripcionBien),
    tipoSolicitud: data.tipoSolicitud,
    detalle: sanitizeString(data.detalle),
    pedido: sanitizeString(data.pedido),
    aceptaTerminos: Boolean(data.aceptaTerminos),
    autorizaEmail: Boolean(data.autorizaEmail),
    nombrePadreMadre: data.nombrePadreMadre ? sanitizeString(data.nombrePadreMadre) : null,
  };
}
```

### 4.8 Manejo de Errores Centralizado

**Archivo: `lib/api-error.js`**

```javascript
/**
 * Clase personalizada para errores de API
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.status = statusCode;
    this.code = code;
    this.name = "ApiError";
  }

  static badRequest(message, details = null) {
    const error = new ApiError(message, 400, "BAD_REQUEST");
    error.details = details;
    return error;
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(message, 401, "UNAUTHORIZED");
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(message, 403, "FORBIDDEN");
  }

  static notFound(message = "Resource not found") {
    return new ApiError(message, 404, "NOT_FOUND");
  }

  static internal(message = "Internal server error") {
    return new ApiError(message, 500, "INTERNAL_ERROR");
  }

  static serviceUnavailable(message = "Service unavailable") {
    return new ApiError(message, 503, "SERVICE_UNAVAILABLE");
  }
}

/**
 * Maneja errores y los convierte en respuestas JSON
 * @param {Error} error
 * @returns {NextResponse}
 */
export function handleApiError(error) {
  console.error("API Error:", {
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    name: error.name,
  });

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.status }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: process.env.NODE_ENV === "production" 
          ? "Internal server error" 
          : error.message,
      },
    },
    { status: 500 }
  );
}
```

### 4.9 Variables de Entorno Requeridas

```env
# Firebase Admin (server-side)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=myappglass
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@myappglass.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Resend
RESEND_API_KEY=re_xxxxx

# Email
ADMIN_CONTACT_EMAIL=acueva@gyacompany.com
```

---

## Fase 5: SEO y Metadata

### 5.1 Visión General

Next.js proporciona un sistema de metadata integrado que optimiza el SEO automáticamente. La configuración incluye sitemap, robots.txt, y metadata dinámica por ruta.

### 5.2 Configuración de Metadata del Sitio

**Archivo: `app/site-metadata.js`**

```javascript
export const siteMetadata = {
  siteUrl: "https://myappglass.com",
  siteName: "G&A Company - Carpintería de Aluminum y Vidrio",
  siteDescription: "Expertos en ventanas de aluminio, puertas, vidrios y soluciones de carpintería de aluminio en Lima, Perú. Cotiza tu proyecto con nosotros.",
  siteLocale: "es-PE",
  siteTimezone: "America/Lima",
  twitterHandle: "@gyacompany",
  facebookPage: "https://facebook.com/gyacompany",
  linkedInPage: "https://linkedin.com/company/gyacompany",
  whatsappNumber: "51974278303",
  contactEmail: "acueva@gyacompany.com",
  companyAddress: "Av. Los Fresnos MZ H Lt.16 - La Molina",
  companyRUC: "20606432870",
  companyName: "GLASS & ALUMINUM COMPANY S.A.C.",
};

export const defaultSeo = {
  title: {
    default: siteMetadata.siteName,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.siteDescription,
  canonical: siteMetadata.siteUrl,
  openGraph: {
    type: "website",
    locale: siteMetadata.siteLocale,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    title: siteMetadata.siteName,
    description: siteMetadata.siteDescription,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteMetadata.siteName,
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: siteMetadata.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### 5.3 Sitemap Dinámico

**Archivo: `app/sitemap.js`**

```javascript
import { MetadataRoute } from "next";
import { siteMetadata } from "./site-metadata";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getDynamicRoutes() {
  const routes = [];

  try {
    const productsCollection = collection(db, "productos");
    const productsSnapshot = await getDocs(productsCollection);

    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      if (product.slug) {
        routes.push({
          url: `${siteMetadata.siteUrl}/productos/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt.toDate()) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  try {
    const servicesCollection = collection(db, "servicios");
    const servicesSnapshot = await getDocs(servicesCollection);

    servicesSnapshot.forEach((doc) => {
      const service = doc.data();
      if (service.slug) {
        routes.push({
          url: `${siteMetadata.siteUrl}/servicios/${service.slug}`,
          lastModified: service.updatedAt ? new Date(service.updatedAt.toDate()) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    });
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
  }

  return routes;
}

export default async function sitemap() {
  const baseUrl = siteMetadata.siteUrl;

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/libro-de-reclamaciones`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const dynamicRoutes = await getDynamicRoutes();

  return [...staticRoutes, ...dynamicRoutes];
}
```

### 5.4 Robots.txt

**Archivo: `app/robots.js`**

```javascript
import { MetadataRoute } from "next";
import { siteMetadata } from "./site-metadata";

export default function robots() {
  const baseUrl = siteMetadata.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/404",
          "/500",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
```

### 5.5 Metadata Dinámica para Páginas

**Layout Raíz: `app/layout.js`**

```javascript
import { Manrope, Poppins } from "next/font/google";
import { siteMetadata, defaultSeo } from "./site-metadata";
import { Providers } from "@/shared/components/Providers";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import "./styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  ...defaultSeo,
  fonts: [
    {
      fontFamily: "Manrope",
      fontWeight: "400 700",
      variable: "--font-manrage",
      display: "swap",
    },
    {
      fontFamily: "Poppins",
      fontWeight: "400 700",
      variable: "--font-poppins",
      display: "swap",
    },
  ],
  verification: {
    google: "google-site-verification-code-xxxxxxxxx",
    yandex: "yandex-verification-code-xxxxxxxxx",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${manrope.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

**Página de Producto Dinámico: `app/productos/[slug]/page.js`**

```javascript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { siteMetadata } from "@/app/site-metadata";
import { ProductDetail } from "@/features/productos/components/ProductDetail";

async function getProduct(slug) {
  const productRef = doc(db, "productos", slug);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    return null;
  }

  return {
    id: productSnap.id,
    ...productSnap.data(),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: true },
    };
  }

  const url = `${siteMetadata.siteUrl}/productos/${slug}`;

  return {
    title: product.metaTitle || `${product.nombre} | ${siteMetadata.siteName}`,
    description: product.metaDescription || product.descripcionCorta,
    openGraph: {
      title: product.metaTitle || product.nombre,
      description: product.metaDescription || product.descripcionCorta,
      url: url,
      type: "website",
      images: product.imagenPrincipal
        ? [
            {
              url: product.imagenPrincipal,
              width: 1200,
              height: 630,
              alt: product.nombre,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle || product.nombre,
      description: product.metaDescription || product.descripcionCorta,
      images: product.imagenPrincipal ? [product.imagenPrincipal] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
```

**Página de Servicio Dinámico: `app/servicios/[slug]/page.js`**

```javascript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { siteMetadata } from "@/app/site-metadata";
import { ServiceDetail } from "@/features/servicios/components/ServiceDetail";

async function getService(slug) {
  const serviceRef = doc(db, "servicios", slug);
  const serviceSnap = await getDoc(serviceRef);

  if (!serviceSnap.exists()) {
    return null;
  }

  return {
    id: serviceSnap.id,
    ...serviceSnap.data(),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado",
      robots: { index: false, follow: true },
    };
  }

  const url = `${siteMetadata.siteUrl}/servicios/${slug}`;

  return {
    title: service.metaTitle || `${service.titulo} | ${siteMetadata.siteName}`,
    description: service.metaDescription || service.descripcionCorta,
    openGraph: {
      title: service.metaTitle || service.titulo,
      description: service.metaDescription || service.descripcionCorta,
      url: url,
      type: "website",
      images: service.imagenPrincipal
        ? [
            {
              url: service.imagenPrincipal,
              width: 1200,
              height: 630,
              alt: service.titulo,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle || service.titulo,
      description: service.metaDescription || service.descripcionCorta,
      images: service.imagenPrincipal ? [service.imagenPrincipal] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
```

### 5.6 Componente de Metadata para Páginas Estáticas

**Archivo: `app/components/SeoHead.jsx`**

```javascript
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SeoHead({ title, description, image, noIndex = false }) {
  const pathname = usePathname();

  useEffect(() => {
    const updateMetadata = () => {
      document.title = title || "G&A Company";

      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (!descriptionMeta) {
        descriptionMeta = document.createElement("meta");
        descriptionMeta.name = "description";
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.content = description || "";

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.property = "og:title";
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = title || "";

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.property = "og:description";
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = description || "";

      if (image) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement("meta");
          ogImage.property = "og:image";
          document.head.appendChild(ogImage);
        }
        ogImage.content = image;
      }

      if (noIndex) {
        let robots = document.querySelector('meta[name="robots"]');
        if (!robots) {
          robots = document.createElement("meta");
          robots.name = "robots";
          document.head.appendChild(robots);
        }
        robots.content = "noindex, nofollow";
      }
    };

    updateMetadata();
  }, [title, description, image, noIndex, pathname]);

  return null;
}
```

### 5.7 Configuración de JSON-LD (Schema.org)

**Archivo: `app/components/JsonLd.jsx`**

```javascript
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GLASS & ALUMINUM COMPANY S.A.C.",
    alternateName: "G&A Company",
    url: "https://myappglass.com",
    logo: "https://myappglass.com/logo.png",
    description: "Expertos en ventanas de aluminio, puertas, vidrios y soluciones de carpintería de aluminio en Lima, Perú.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Los Fresnos MZ H Lt.16",
      addressLocality: "La Molina",
      addressRegion: "Lima",
      addressCountry: "PE",
      postalCode: "15024",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-996537435",
      contactType: "customer service",
      email: "acueva@gyacompany.com",
      availableLanguage: ["Spanish"],
    },
    areaServed: {
      "@type": "Country",
      name: "Peru",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [
      "https://facebook.com/gyacompany",
      "https://instagram.com/gyacompany",
      "https://linkedin.com/company/gyacompany",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://myappglass.com/#business",
    name: "G&A Company - Sucursal La Molina",
    image: "https://myappglass.com/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Los Fresnos MZ H Lt.16",
      addressLocality: "La Molina",
      addressRegion: "Lima",
      addressCountry: "PE",
      postalCode: "15024",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-12.0853",
      longitude: "-76.9690",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nombre,
    description: product.descripcion,
    image: product.imagenes,
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "G&A Company",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: product.precio || "Consultar",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "GLASS & ALUMINUM COMPANY S.A.C.",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 5.8 Archivo de Configuración de next.config.js

**Archivo: `next.config.js`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/contactenos",
        destination: "/contacto",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/servicios",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Resumen de Cambios

### Fase 4: API Routes

| Aspecto | Antes (Firebase) | Después (Next.js) |
|---------|-----------------|-------------------|
| Ubicación | `functions/index.js` | `app/api/contacto/route.js` |
| Runtime | Cloud Functions v2 | Next.js API Routes |
| Autenticación | Secrets de Firebase | Environment variables |
| Validación | En la función | Módulo separado `validation.js` |
| Errores | HttpsError | ApiError personalizado |

### Fase 5: SEO

| Aspecto | Antes (Vite) | Después (Next.js) |
|---------|-------------|-------------------|
| Metadata | React Helmet | Metadata API nativa |
| Sitemap | No disponible | `app/sitemap.js` dinámico |
| Robots | No disponible | `app/robots.js` |
| Schema | Manual | Componentes JsonLd |
| Open Graph | Manual | Automático con defaults |

---

## Siguientes Pasos

1. **Migrar API**: Crear las rutas de API en `app/api/`
2. **Configurar Firebase Admin**: Configurar credenciales en variables de entorno
3. **Implementar SEO**: Crear sitemap, robots y metadata
4. **Testing**: Verificar funcionamiento de API y SEO
5. **Deployment**: Desplegar a Vercel y configurar CI/CD