# 🛡️ Seguridad e Infraestructura Backend

Este documento detalla la gestión de servicios serverless y la protección de datos legales.

## ☁️ Firebase Functions v2
Las funciones están alojadas en Google Cloud Run (vía Firebase). 

### Gestión de Secretos (Secret Manager)
NUNCA guarde claves en el código. Use el Secret Manager de Google Cloud:
```bash
# Subir clave de Resend
firebase functions:secrets:set RESEND_API_KEY

# Subir email administrativo
firebase functions:secrets:set ADMIN_EMAIL
```

### Despliegue Público
Para que el frontend pueda llamar a las funciones, estas deben estar en modo **"Allow public access"** en la consola de Cloud Run. Si se despliega una nueva función y da error 403, revise la pestaña **Security** en la Consola de Google Cloud.

## 📧 Servicio de Correo (Resend)
- **Dominio:** `gyacompany.com` (Debe estar verificado en Resend).
- **Remitente:** `noreply@gyacompany.com`.
- **Límites:** Monitoree la cuota mensual en el panel de Resend si el volumen de reclamos aumenta.

## 📜 Libro de Reclamaciones (Legal)
Cada envío realiza tres acciones atómicas:
1. Envío de HTML detallado al administrador (`ADMIN_EMAIL`).
2. Envío de confirmación con ID de seguimiento al cliente.
3. Persistencia en Firestore con marca de tiempo de servidor.

### Auditoría de Datos
Los reclamos se pueden consultar directamente en la colección `libro_de_reclamaciones` en Firestore. Esta colección es la prueba legal ante INDECOPI.

## 🚑 Resolución de Problemas
Si el formulario falla en producción:
1. Abra la consola del navegador y busque `[GYA-LOG-ERROR]`.
2. Revise los logs de Cloud Functions en Firebase Console.
3. Verifique que `RESEND_API_KEY` no haya expirado.

---
*Documentación generada por Gemini CLI - Versión 1.0 (Abril 2026)*
