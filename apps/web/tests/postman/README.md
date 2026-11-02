# Colecciones Postman - GYA Company

## Contenido

- `GYA_Company_API.postman_collection.json`: pruebas del backend (`submitReclamo`, `submitContacto`, `checkStatus`). Solo casos seguros y de lectura.
- `GYA_Full_Audit.postman_collection.json`: auditoría SEO, reCAPTCHA v3 y cabeceras HTTP de seguridad de la página `/libro-de-reclamacion`. No envía datos.
- `GYA_Produccion.postman_environment.json`: `baseUrl` y `siteUrl` de producción.
- `GYA_Local.postman_environment.json`: `baseUrl` del emulador de Firebase y `siteUrl` de `next dev`.

## Importar

1. En Postman, usa **Import** y selecciona las dos colecciones y los dos entornos.
2. En la esquina superior derecha, elige el entorno **GYA Producción** o **GYA Local**.
3. Ejecuta la colección o una request suelta.

Para el emulador local, arranca antes `firebase emulators:start` (función en el puerto 5001) y `pnpm run dev` (puerto 3000).

## Casos de API (`GYA_Company_API`)

| Carpeta | Caso | Esperado |
|---|---|---|
| submitReclamo | GET no permitido | 405 |
| submitReclamo | POST vacío `{}` | 400, `success=false` (Zod) |
| submitReclamo | POST sin consentimientos obligatorios (`aceptaTerminos`, `autorizaEmail`) | 400, `success=false` (Zod) |
| submitReclamo | Payload Reclamo válido sin captcha (incluye `aceptaTerminos` y `autorizaEmail` en `true`) | 400, "seguridad matemática" |
| submitReclamo | Payload Queja válido sin captcha (`tipoSolicitud: "Queja"`, `tipoBien: "producto"`) | 400, "seguridad matemática" |
| submitReclamo | Honeypot (`website_hp`) | 200, `GHOST_BLOCKED` |
| submitContacto | GET no permitido | 405 |
| submitContacto | POST vacío `{}` | 400, "seguridad matemática" |
| submitContacto | Honeypot (`website_hp`) | 200, `GHOST_BLOCKED` |
| checkStatus | Sin id | 400 |
| checkStatus | ID inexistente (`?id=NO-EXISTE-XYZ`) | 404 |
| checkStatus | ID existente en Firestore (`?id=GYA-REC-2026-LK3SG3`) | 200, `success=true`, `type="Libro de Reclamaciones"`, nombre ofuscado |

Todos los casos de escritura fallan antes de enviar correos o guardar datos. El caso honeypot responde 200 solo si el secreto `ADMIN_EMAIL` está configurado; si no, responde 500.

## Advertencia: rate limit

Cada petición cuenta para el rate limit por IP: **8 cada 15 minutos** en `submitReclamo` y `submitContacto`, y **30** en `checkStatus`. La carpeta `submitReclamo` tiene 6 peticiones: no ejecutes la colección repetidamente en menos de 15 minutos. Si recibes `429 Too Many Requests`, espera la ventana de 15 minutos.

## Por qué no hay camino feliz de escritura en Postman

El envío real requiere un token de reCAPTCHA v3 generado por un navegador con interacción humana además del reto matemático firmado, y dispara correos legales reales vía Resend. El registro `GYA-REC-2026-LK3SG3` ya fue creado y verificado en producción (`libro_de_reclamaciones`) y se consulta en el caso `checkStatus → ID existente en Firestore (200 OK)`.

## Auditoría SEO y Seguridad (`GYA_Full_Audit`)

La request `Verificar SEO y Seguridad - Libro de Reclamaciones` comprueba estado 200, contenido HTML, `<title>Libro de Reclamaciones`, presencia de JSON-LD, carga del script de Google reCAPTCHA v3 y cabeceras HTTP (`X-Content-Type-Options: nosniff` y `Content-Security-Policy`).
