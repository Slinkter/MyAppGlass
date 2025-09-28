# Guía de Solución de Problemas: Formulario de Reclamos

Este documento detalla los pasos que se siguieron para diagnosticar y solucionar los problemas con el formulario de reclamos y la Cloud Function `enviarCorreoReclamo`.

## 1. Problema Inicial

El formulario no enviaba correos. Al investigar, se descubrió que la Cloud Function no se estaba ejecutando.

## 2. Diagnóstico y Soluciones

Se identificaron y solucionaron varios problemas en cadena:

### Problema 2.1: La clave de SendGrid no estaba configurada

La función no podía enviar correos porque no tenía la clave de la API de SendGrid.

-   **Solución:** Se configuró la clave como un "secret" en Firebase para que la función tuviera acceso a ella de forma segura.
    ```bash
    firebase functions:secrets:set SENDGRID_KEY
    ```

### Problema 2.2: Error de inicialización en la Cloud Function

El código intentaba configurar SendGrid en el momento equivocado, lo que podía causar que la clave no se cargara correctamente.

-   **Solución:** Se movió la inicialización de SendGrid (`sgMail.setApiKey(...)`) para que se ejecute justo al principio del manejador de la función, asegurando que la clave siempre esté disponible.

### Problema 2.3: Desconexión entre Frontend y Backend

Este fue el problema principal. La función seguía sin ejecutarse.

-   **Síntoma:** La consola del navegador mostraba un error `projectId: undefined`.
-   **Causa:** La página web (frontend) no sabía a qué proyecto de Firebase conectarse. El script `build` en `package.json` no estaba cargando el archivo de configuración correcto (`.env.functions`) que contenía los datos del proyecto `gya-reclamos`.
-   **Solución:**
    1.  Se modificó el script `build` en `package.json` para que use el modo correcto:
        ```json
        // Antes
        "build": "vite build"

        // Después
        "build": "vite build --mode functions"
        ```
    2.  Se reconstruyó y desplegó la página web con la nueva configuración.

### Problema 2.4: Error de "Emails Duplicados" en SendGrid

Una vez que la página web se conectó al proyecto correcto y la función se empezó a ejecutar, apareció un nuevo error en los logs.

-   **Síntoma:** La función fallaba con un error de SendGrid: `Each email address... should be unique`.
-   **Causa:** Si se probaba el formulario usando el mismo correo que estaba fijo en el código (`luis.j.cueva@gmail.com`), la lista de destinatarios tenía emails duplicados, lo cual SendGrid no permite.
-   **Solución:** Se modificó el código de la función para usar un `Set`, que elimina duplicados automáticamente.
    ```javascript
    // Antes
    to: [data.email, "luis.j.cueva@gmail.com"]

    // Después
    to: [...new Set([data.email, "luis.j.cueva@gmail.com"])]
    ```

## Conclusión

La solución completa requirió configurar correctamente las variables de entorno, asegurar la correcta inicialización de la función y manejar casos borde como los emails duplicados.
