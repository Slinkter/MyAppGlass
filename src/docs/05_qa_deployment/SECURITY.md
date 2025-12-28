# 🛡️ Seguridad del Proyecto (Security)

## 1. Principios Generales

Este proyecto es mayormente un frontend estático, lo que reduce drásticamente la superficie de ataque. Sin embargo, aplicamos defensa en profundidad.

- **Datos Sensibles:** No se almacena información de tarjetas de crédito ni contraseñas de usuarios en nuestro sistema.
- **HTTPS:** Obligatorio para todas las conexiones. Gestionado automáticamente por Firebase Hosting.

## 2. Gestión de Secretos

- **Variables de Entorno:** Las claves de API públicas (ej. `VITE_FIREBASE_API_KEY`) se inyectan en tiempo de construcción.
- **Secretos de Backend:** Las credenciales críticas (como `RESEND_API_KEY`) se almacenan en **Google Cloud Secret Manager** y solo son accesibles por las Cloud Functions. **NUNCA** se commitean al repositorio.

## 3. Seguridad en el Código

- **Sanitización:** React escapa automáticamente el contenido renderizado para prevenir XSS (Cross-Site Scripting).
- **Validación de Entradas:**
    - **Frontend:** Validación inmediata en formularios con `react-hook-form`.
    - **Backend:** Doble validación estricta en Cloud Functions antes de procesar cualquier dato.

## 4. Política de Dependencias

- Ejecutar periódicamente `pnpm audit` para detectar librerías vulnerables.
- Mantener las dependencias críticas actualizadas, especialmente aquellas relacionadas con Firebase y React.
