# Colecciones Postman - GYA Company

## Contenido

- `GYA_Company_API.postman_collection.json`: pruebas del backend (`submitReclamo`, `submitContacto`, `checkStatus`). Solo casos seguros.
- `GYA_Full_Audit.postman_collection.json`: auditoría SEO de la página `/libro-de-reclamacion`. No envía datos.
- `GYA_Produccion.postman_environment.json`: `baseUrl` y `siteUrl` de producción.
- `GYA_Local.postman_environment.json`: `baseUrl` del emulador de Firebase y `siteUrl` de `next dev`.

## Importar

1. En Postman, usa **Import** y selecciona las dos colecciones y los dos entornos.
2. En la esquina superior derecha, elige el entorno **GYA Producción** o **GYA Local**.
3. Ejecuta la colección o una request suelta.

Para el emulador local, arranca antes `firebase emulators:start` (función en el puerto 5001) y `pnpm run dev` (puerto 3000).

## Casos de API

| Carpeta | Caso | Esperado |
|---|---|---|
| submitReclamo | GET | 405 |
| submitReclamo | POST `{}` | 400, `success=false` |
| submitReclamo | Payload válido sin captcha | 400, "seguridad matemática" |
| submitReclamo | Honeypot (`website_hp`) | 200, `GHOST_BLOCKED` |
| submitContacto | GET | 405 |
| submitContacto | POST `{}` | 400, "seguridad matemática" |
| submitContacto | Honeypot (`website_hp`) | 200, `GHOST_BLOCKED` |
| checkStatus | GET sin id | 400 |
| checkStatus | GET `?id=NO-EXISTE-XYZ` | 404 |

Todos fallan antes de enviar correos o guardar datos. El caso honeypot responde 200 solo si el secreto `ADMIN_EMAIL` está configurado; si no, responde 500.

## Advertencia: rate limit

Cada petición cuenta para el rate limit por IP: 8 cada 15 minutos en `submitReclamo` y `submitContacto`, y 30 en `checkStatus`. No ejecutes la colección repetidamente. Si te bloquean, espera la ventana de 15 minutos.

## Por qué no hay camino feliz

El envío real requiere un token de reCAPTCHA v3 generado por un navegador real, además del reto matemático. Esas peticiones enviarían correos y crearían registros legales, por lo que no se incluyen aquí. Para probar el flujo completo usa el formulario desde el navegador en el entorno local.

## Auditoría SEO

La request `Verificar SEO - Libro de Reclamaciones` comprueba estado 200, contenido HTML, el título `<title>Libro de Reclamaciones` y la presencia de JSON-LD. La URL se toma de `siteUrl`.
