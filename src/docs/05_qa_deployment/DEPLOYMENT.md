# 🚀 Despliegue (Deployment)

## 1. Infraestructura

El proyecto se despliega en **Firebase**, aprovechando su ecosistema integrado.

-   **Hosting:** Sirve los archivos estáticos de la React SPA. CDN global rápido.
-   **Functions:** Ejecuta el código backend (Node.js) para envío de emails.

## 2. Comandos de Despliegue

### Despliegue Completo (Hosting + Functions)
Es el comando recomendado para actualizaciones mayores.

```bash
pnpm deploy:all
# Alias de: firebase deploy
```

### Despliegue Solo Frontend
Útil para cambios de texto, imágenes o CSS. Más rápido.

```bash
pnpm deploy:hosting
# Alias de: firebase deploy --only hosting
```

### Despliegue Solo Backend
Útil si solo se modificó la lógica de correos.

```bash
pnpm deploy:functions
# Alias de: firebase deploy --only functions
```

## 3. Ambientes

Actualmente operamos con un solo ambiente de **Producción**.
Para probar cambios sin afectar a usuarios reales, usar la Vista Previa local:

```bash
pnpm run build
pnpm run preview
```
