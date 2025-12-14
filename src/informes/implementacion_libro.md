# Guía de Implementación del Libro de Reclamaciones

Este documento detalla paso a paso cómo replicar el sistema de Libro de Reclamaciones (que integra **Firebase Functions**, **Resend** para correos y **Firestore** para base de datos) en un nuevo proyecto React.

---

## 🏗️ Parte 1: Configuración del Backend (Firebase Cloud Functions)

En tu nuevo proyecto, necesitarás iniciar Firebase Functions y agregar las dependencias necesarias.

### 1. Inicializar Firebase Functions

Si aún no has configurado Functions en tu proyecto nuevo:

```bash
# En la raíz de tu proyecto nuevo
firebase init functions

# Selecciona:
# - Use an existing project (tu proyecto de Firebase)
# - JavaScript (como lenguaje)
# - "Yes" para instalar dependencias con npm (o pnpm si prefieres)
```

### 2. Instalar Dependencias

Navega a la carpeta `functions` generada e instala las librerías requeridas:

```bash
cd functions
npm install resend firebase-admin cors
```

### 3. Crear la Lógica de Envío (`functions/emailSender.js`)

Crea un nuevo archivo llamado `emailSender.js` dentro de la carpeta `functions`. Copia y pega el siguiente código. Este maneja las plantillas HTML y el flujo de envío de correos + guardado en base de datos.

```javascript
const { HttpsError } = require("firebase-functions/v2/https");
const { Resend } = require("resend");
const { FieldValue } = require("firebase-admin/firestore");

// --- Plantillas HTML (Modificar textos y estilos según tu marca) ---

const createAdminEmailHtml = (data) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Nuevo Reporte: ${data.tipoSolicitud}</h2>
    <p>Se ha recibido una nueva solicitud vía web.</p>
    <ul>
      <li><strong>Cliente:</strong> ${data.nombreCompleto}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Teléfono:</strong> ${data.telefono}</li>
      <li><strong>Documento:</strong> ${data.tipoDocumento} - ${data.numeroDocumento}</li>
    </ul>
    <h3>Detalle:</h3>
    <p>${data.detalle}</p>
    <h3>Pedido:</h3>
    <p>${data.pedido}</p>
  </div>
`;

const createClientEmailHtml = (data, reclamoId) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Hemos recibido tu ${data.tipoSolicitud}</h2>
    <p>Hola ${data.nombreCompleto},</p>
    <p>Tu solicitud ha sido registrada correctamente.</p>
    <p><strong>Código de seguimiento:</strong> ${reclamoId}</p>
    <p>Te responderemos en el plazo legal establecido.</p>
  </div>
`;

// --- Lógica Principal del Negocio ---

async function sendEmailLogic(reclamoData, admin) {
    // Inicializamos Resend con la API KEY guardada en secretos
    const resend = new Resend(process.env.RESEND_API_KEY);
    const db = admin.firestore();

    // 1. Validaciones básicas
    if (
        !reclamoData.email ||
        !reclamoData.nombreCompleto ||
        !reclamoData.detalle
    ) {
        throw new HttpsError(
            "invalid-argument",
            "Faltan campos obligatorios en el formulario."
        );
    }

    // 2. Enviar correo interno al Administrador
    // IMPORTANTE: 'from' debe ser un dominio que hayas verificado en el panel de Resend.com
    const adminEmail = await resend.emails.send({
        from: "Libro de Reclamaciones <noreply@tudominio.com>",
        to: "admin@tudominio.com", // Correo donde quieres recibir los avisos
        subject: `Nuevo ${reclamoData.tipoSolicitud} de ${data.nombreCompleto}`,
        html: createAdminEmailHtml(reclamoData),
    });

    if (adminEmail.error) {
        throw new HttpsError(
            "internal",
            "Error al enviar correo al admin",
            adminEmail.error
        );
    }

    const reclamoId = adminEmail.data.id; // Usamos el ID del email como ID del reclamo

    // 3. Enviar correo de confirmación al Cliente
    await resend.emails.send({
        from: "Atención al Cliente <noreply@tudominio.com>",
        to: reclamoData.email,
        subject: `Confirmación de ${reclamoData.tipoSolicitud} - ID: ${reclamoId}`,
        html: createClientEmailHtml(reclamoData, reclamoId),
    });

    // 4. Guardar registro en Firestore
    await db
        .collection("libro_de_reclamaciones")
        .doc(reclamoId)
        .set({
            ...reclamoData,
            reclamoId: reclamoId,
            timestamp: FieldValue.serverTimestamp(),
            estado: "Pendiente",
        });

    return reclamoId;
}

module.exports = { sendEmailLogic };
```

### 4. Exponer la Función (`functions/index.js`)

Edita el archivo `index.js` (generado automáticamente por Firebase) para crear el endpoint HTTP que consumirá tu frontend.

```javascript
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

// Importar nuestra lógica
const { sendEmailLogic } = require("./emailSender");

admin.initializeApp();

exports.sendContactEmail = onRequest(
    {
        // Aumentamos timeout y memoria por seguridad
        timeoutSeconds: 60,
        memory: "256MiB",
        // IMPORTANTE: Damos acceso al secreto de Resend
        secrets: ["RESEND_API_KEY"],
    },
    (request, response) => {
        // Middleware CORS para permitir peticiones desde cualquier dominio (o configurar whitelist)
        cors(request, response, async () => {
            // Solo aceptamos peticiones POST
            if (request.method !== "POST") {
                return response
                    .status(405)
                    .json({ message: "Método no permitido" });
            }

            try {
                const emailData = request.body;
                // Ejecutamos la lógica de envío
                const resultId = await sendEmailLogic(emailData, admin);

                response.status(200).json({
                    success: true,
                    message: "Reclamo enviado correctamente",
                    data: { id: resultId },
                });
            } catch (error) {
                logger.error("Error en function:", error);
                response.status(500).json({
                    success: false,
                    message: error.message || "Error interno del servidor",
                });
            }
        });
    }
);
```

### 5. Configuración de Secretos y Despliegue

1.  Obtén tu **API Key** desde [Resend.com](https://resend.com).
2.  Configura el secreto en Firebase (esto es más seguro que poner la clave en el código):

```bash
firebase functions:secrets:set RESEND_API_KEY
# (Pega tu API Key cuando te lo pida)
```

3.  Despliega la función a la nube:

```bash
firebase deploy --only functions
```

> **Nota:** Al terminar el despliegue, la terminal te mostrará la **URL de la función** (ej. `https://us-central1-proyecto.cloudfunctions.net/sendContactEmail`). Cópiala.

---

## 💻 Parte 2: Implementación en el Frontend (React)

En tu aplicación React, configura la conexión con esa nueva URL.

### 1. Variables de Entorno (`.env`)

En la raíz de tu proyecto React:

```env
VITE_API_URL=https://us-central1-tu-proyecto.cloudfunctions.net/sendContactEmail
```

### 2. Servicio de API (`src/api/reclamoService.js`)

Crea un archivo para centralizar la llamada a la API.

```javascript
const API_URL = import.meta.env.VITE_API_URL;

export const reclamoService = {
    submitReclamo: async (formData) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Error en el servidor");
            }

            return result.data.id; // Retorna el ID del reclamo
        } catch (error) {
            console.error("Error envío:", error);
            throw error;
        }
    },
};
```

### 3. Hook Personalizado (`src/hooks/useReclamoForm.js`)

Para separar la lógica de la vista.

```javascript
import { useState } from "react";
import { reclamoService } from "../api/reclamoService";

export const useReclamoForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successId, setSuccessId] = useState(null);

    const enviarReclamo = async (datos) => {
        setLoading(true);
        setError(null);
        try {
            const id = await reclamoService.submitReclamo(datos);
            setSuccessId(id);
            return id;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { enviarReclamo, loading, error, successId };
};
```

### 4. Ejemplo de Integración en Vista (`src/pages/Reclamaciones.jsx`)

```jsx
import React, { useState } from "react";
import { useReclamoForm } from "../hooks/useReclamoForm";

export default function LibroReclamaciones() {
    const { enviarReclamo, loading, error, successId } = useReclamoForm();

    // Estado local para el formulario (simplificado)
    const [form, setForm] = useState({
        nombreCompleto: "",
        email: "",
        telefono: "",
        tipoSolicitud: "Reclamo", // o 'Queja'
        detalle: "",
        pedido: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await enviarReclamo(form);
    };

    if (successId) {
        return (
            <div className="alert success">
                ¡Enviado! Tu código es: <strong>{successId}</strong>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Libro de Reclamaciones</h1>

            {error && <p className="error">{error}</p>}

            <input
                name="nombreCompleto"
                placeholder="Nombre Completo"
                onChange={handleChange}
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                onChange={handleChange}
                required
            />

            {/* ... Resto de campos ... */}

            <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Reclamo"}
            </button>
        </form>
    );
}
```
