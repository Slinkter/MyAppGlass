# 🧪 Guía de Simulación de Backend (Libro de Reclamaciones)

Sigue estos pasos para probar la inserción de datos y el envío de correos localmente.

## Paso 1: Iniciar Emuladores de Firebase
Abre una terminal y ejecuta:

```bash
firebase emulators:start --only functions,firestore
```
*Mantén esta terminal abierta.*

## Paso 2: Ejecutar Prueba de Envío (CURL)
Abre **otra terminal** y pega el siguiente comando (es una sola línea):

```bash
curl -X POST http://127.0.0.1:5001/gya-app-4c8a9/us-central1/submitReclamo -H "Content-Type: application/json" -d @functions/test-reclamo.json
```

---

## 🔍 Verificación de Resultados

1.  **Respuesta Exitosa:** Deberías recibir un JSON como este:
    `{"success":true,"message":"Reclamo procesado...","data":{"id":"..."}}`

2.  **Base de Datos (Firestore):**
    Entra a: [http://127.0.0.1:4000/firestore](http://127.0.0.1:4000/firestore)
    Verás que se creó la colección `libro_de_reclamaciones` con los datos de `test-reclamo.json`.

3.  **Logs de Función:**
    Entra a: [http://127.0.0.1:4000/functions](http://127.0.0.1:4000/functions)
    Verás el registro de las acciones realizadas por el script `emailSender.js`.

4.  **Correo Real:**
    Si tu `RESEND_API_KEY` en `functions/.env` es válida, revisa tu bandeja de entrada.

---

## 🛠️ Notas Técnicas
- **Project ID:** `gya-app-4c8a9`
- **Archivo de datos:** `functions/test-reclamo.json`
- **Endpoint:** `submitReclamo`
