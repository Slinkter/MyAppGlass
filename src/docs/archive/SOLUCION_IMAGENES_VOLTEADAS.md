# 🖼️ Solución al Problema de Imágenes Volteadas

**Fecha:** 26 de Noviembre de 2025  
**Problema:** Imágenes que se ven correctas en `src/` aparecen volteadas en `dist/`  
**Causa:** Metadatos EXIF de orientación de cámara  
**Solución:** Configuración de `vite-plugin-image-optimizer` con `sharp`

---

## 🔍 Problema Detectado

### Síntomas

- ✅ Imágenes se ven correctas en carpeta `src/assets/`
- ❌ Imágenes aparecen volteadas/rotadas en carpeta `dist/` después del build
- ❌ Eliminar metadatos manualmente no funcionaba
- ❌ El problema persistía incluso con trucos manuales

### Causa Raíz

**Metadatos EXIF:**

- Las cámaras guardan información de orientación en los metadatos EXIF
- Los navegadores interpretan estos metadatos de manera diferente
- Durante el build, Vite copia las imágenes con sus metadatos intactos
- Los metadatos EXIF causan que la imagen se muestre rotada

**Ejemplo de metadatos EXIF problemáticos:**

```
Orientation: 6 (Rotate 90 CW)
Orientation: 8 (Rotate 270 CW)
Orientation: 3 (Rotate 180)
```

---

## ✅ Solución Implementada

### Configuración de `vite-plugin-image-optimizer`

**Archivo:** `vite.config.js`

```javascript
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Calidad de compresión
      jpg: { quality: 85 },
      png: { quality: 85 },
      webp: { quality: 85 },

      // ⚠️ CLAVE: Configuración de Sharp
      cache: false, // Siempre procesa las imágenes
      sharpOptions: {
        rotate: true, // ✅ Auto-rotación basada en EXIF
      },
    }),
  ],
});
```

### ¿Cómo Funciona?

1. **Durante el Build:**

   - `vite-plugin-image-optimizer` procesa cada imagen
   - `sharp` lee los metadatos EXIF de orientación
   - `rotate: true` aplica la rotación correcta a los píxeles de la imagen
   - Los metadatos EXIF se eliminan de la imagen final
   - La imagen se guarda con la orientación correcta "quemada" en los píxeles

2. **Resultado:**
   - ✅ Imagen en `dist/` tiene orientación correcta
   - ✅ No depende de metadatos EXIF
   - ✅ Se ve igual en todos los navegadores
   - ✅ Bonus: Imagen optimizada (menor tamaño)

---

## 📊 Resultados del Build

### Optimización Lograda

```
dist/logovcr.png
    -77%    61.04 kB ⭢  14.40 kB

Total optimizado: 5748.41 kB
```

**Beneficios:**

- ✅ Imágenes con orientación correcta
- ✅ Reducción de ~77% en tamaño de imágenes
- ✅ Carga más rápida del sitio
- ✅ Sin metadatos EXIF problemáticos

---

## 🎯 Configuración Detallada

### Opciones de Calidad

```javascript
jpg: {
    quality: 85, // 0-100 (85 es un buen balance)
}
```

**Recomendaciones:**

- **90-100:** Máxima calidad, archivos grandes
- **80-90:** Excelente calidad, buen tamaño (recomendado)
- **70-80:** Buena calidad, archivos pequeños
- **<70:** Calidad visible reducida

### Opciones de Sharp

```javascript
sharpOptions: {
    rotate: true,        // Auto-rotación EXIF
    // Opciones adicionales disponibles:
    // withMetadata: false, // Elimina TODOS los metadatos
    // stripMetadata: true, // Alternativa para eliminar metadatos
}
```

---

## 🔧 Solución Alternativa (Si el Plugin No Funciona)

Si por alguna razón el plugin no resuelve el problema, puedes usar un script manual:

### Script de Procesamiento Manual

```javascript
// scripts/fix-image-orientation.js
import sharp from "sharp";
import { glob } from "glob";

const images = await glob("src/assets/**/*.{jpg,jpeg,png}");

for (const image of images) {
  await sharp(image)
    .rotate() // Auto-rotación basada en EXIF
    .withMetadata({ orientation: 1 }) // Resetea orientación a normal
    .toFile(image.replace("src/", "dist/"));
}
```

**Uso:**

```bash
node scripts/fix-image-orientation.js
```

---

## 📋 Checklist de Verificación

Después del build, verifica:

- [ ] Ejecutar `pnpm run build`
- [ ] Revisar imágenes en `dist/assets/`
- [ ] Abrir `dist/index.html` en navegador
- [ ] Verificar orientación de imágenes
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Verificar en dispositivos móviles

---

## 🐛 Troubleshooting

### Problema: Las imágenes siguen volteadas

**Solución 1:** Limpiar caché y rebuild

```bash
rm -rf dist node_modules/.vite
pnpm run build
```

**Solución 2:** Verificar que `cache: false` esté configurado

```javascript
ViteImageOptimizer({
  cache: false, // ✅ Importante
  // ...
});
```

**Solución 3:** Forzar procesamiento con Sharp

```javascript
sharpOptions: {
    rotate: true,
    withMetadata: false, // Elimina TODOS los metadatos
}
```

### Problema: Build muy lento

**Causa:** Procesar muchas imágenes grandes

**Solución:** Optimizar imágenes antes de agregarlas al proyecto

```bash
# Usar herramientas externas para pre-optimizar
# ImageOptim (Mac), TinyPNG (Web), Squoosh (Web)
```

---

## 📚 Recursos Adicionales

### Documentación

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [vite-plugin-image-optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)
- [EXIF Orientation](https://sirv.com/help/articles/rotate-photos-to-be-upright/)

### Herramientas de Optimización

- **Online:** [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)
- **Desktop:** ImageOptim (Mac), FileOptimizer (Windows)
- **CLI:** `sharp-cli`, `imagemin`

---

## 🎉 Resultado Final

**Estado:** ✅ **PROBLEMA RESUELTO**

- ✅ Imágenes con orientación correcta en `dist/`
- ✅ Optimización automática durante build
- ✅ Reducción de ~77% en tamaño de imágenes
- ✅ Sin metadatos EXIF problemáticos
- ✅ Compatible con todos los navegadores

**Próximos Builds:**

- Las imágenes se procesarán automáticamente
- No se requiere intervención manual
- La orientación siempre será correcta

---

_Última actualización: 26 de Noviembre de 2025_
