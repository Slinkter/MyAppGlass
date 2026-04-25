# 🚀 Implementación del Backend - Libro de Reclamaciones

Esta documentación detalla el flujo técnico restaurado para el envío de correos y la persistencia de datos legales.

## 🛠️ Stack Tecnológico
- **Firebase Functions (v2):** Hosting de la lógica serverless.
- **Resend SDK:** Motor de envío de correos electrónicos transaccionales.
- **Firestore:** Base de datos NoSQL para el registro legal de reclamos.

## 🔄 Flujo de Datos
1.  **Frontend:** `ReclamationForm.tsx` captura los datos y los envía a `reclamoService.ts`.
2.  **API Call:** Se dispara un `fetch` POST al endpoint de la función `submitReclamo`.
3.  **Backend:** 
    - Valida los datos recibidos.
    - Envía una notificación enriquecida (HTML) al **Administrador**.
    - Envía una confirmación automática con un **ID de seguimiento** al **Cliente**.
    - Registra el reclamo en la colección `libro_de_reclamaciones` en Firestore con estado `RECIBIDO`.

## 🔐 Configuración de Secretos (CRÍTICO)
Para que el sistema funcione en producción, se deben configurar los siguientes secretos en Firebase:

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set ADMIN_EMAIL
```

*Nota: Asegúrese de que el dominio `gyacompany.com` esté verificado en el panel de Resend.*

## 🧪 Pruebas Locales
Para probar el backend sin desplegar, use el emulador de Firebase:
```bash
pnpm run dev # en la carpeta functions
```

## 📜 Cumplimiento Legal (INDECOPI)
- Los reclamos se guardan con `serverTimestamp()` para auditoría.
- El ID de seguimiento generado por Resend se usa como clave primaria para evitar duplicidad.
- El plazo de respuesta configurado en la plantilla de correo es de **15 días hábiles**.

---
*Documentación generada por Gemini CLI - Abril 2026*
