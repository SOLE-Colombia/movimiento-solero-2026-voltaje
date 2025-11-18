# 📹 Guía de Conversión de Videos a WebM

## 🎯 Resumen

Tienes **51 videos locales** (2.4 GB total) que necesitan ser convertidos a WebM para optimizar el tamaño y mejorar la compatibilidad web.

## 📊 Análisis de Videos

Según `reports/video-analysis.json`:

- **Videos locales**: 51 archivos (.mp4, .mov)
- **Tamaño total**: 2,431.55 MB (~2.4 GB)
- **Videos de YouTube**: 145 (ya están embebidos, no requieren acción)
- **Video más grande**: 297.82 MB
- **Video más pequeño**: 0.64 MB

## 🚀 Cómo Convertir los Videos

### Paso 1: Ejecutar el Script

```cmd
py scripts\11-convert-videos-to-webm.py
```

### Paso 2: Seleccionar Calidad

El script te preguntará qué calidad quieres:

1. **Alta** - Mejor calidad, más tamaño (~60-70% de reducción)
2. **Media** - Balance ideal (~70-80% de reducción) ✅ **Recomendado**
3. **Baja** - Menor tamaño, calidad aceptable (~80-90% de reducción)

**Recomendación**: Usa **Media** (opción 2)

### Paso 3: Esperar la Conversión

⏱️ **Tiempo estimado**: 30-60 minutos (dependiendo de tu CPU)

El script:
- ✅ Convierte cada video a WebM (formato VP9 + Opus)
- ✅ Optimiza para streaming web
- ✅ Reduce significativamente el tamaño
- ✅ Actualiza referencias en archivos markdown
- ✅ Crea un índice de videos

## 📁 Estructura de Salida

Los videos convertidos se guardarán en:

```
public/
└── videos/
    ├── video-slug-1.webm
    ├── video-slug-2.webm
    └── ...
```

## 💾 Reducción Esperada de Tamaño

| Calidad | Reducción Estimada | Tamaño Final Esperado |
|---------|-------------------|----------------------|
| Alta    | 60-70%            | ~730-970 MB          |
| **Media**   | **70-80%**        | **~485-730 MB**      |
| Baja    | 80-90%            | ~240-485 MB          |

**Con calidad Media (recomendada)**: De **2.4 GB a ~600 MB** 🎉

## 🎨 Formato WebM (VP9)

### Ventajas:
- ✅ **Mejor compresión** que MP4 H.264
- ✅ **Open source** y libre de royalties
- ✅ **Soportado** por todos los navegadores modernos
- ✅ **Streaming optimizado** para web
- ✅ **Calidad visual** excelente

### Compatibilidad:
- Chrome ✅
- Firefox ✅
- Edge ✅
- Safari ✅ (desde macOS Big Sur / iOS 14)
- Opera ✅

## 🔄 Alternativa: Usar CDN

Si prefieres no alojar los videos localmente:

### Opción 1: YouTube

**Ventajas**: Gratis, ancho de banda ilimitado, analytics

```cmd
# 1. Subir videos a YouTube
# 2. Obtener IDs de los videos
# 3. Reemplazar referencias locales con embeds
```

### Opción 2: Cloudflare Stream

**Ventajas**: CDN global, transcodificación automática, $1/1000 minutos

### Opción 3: Vimeo

**Ventajas**: Sin anuncios, controles de privacidad

## 📝 Actualización de Referencias

El script **automáticamente** actualizará las referencias en tus archivos markdown:

**Antes:**
```markdown
![Video](20240611_SOLEWLH_Sintonizacin_LaDelfina66.1.mp4)
```

**Después:**
```markdown
<video controls width="100%">
  <source src="/videos/solewlh-sintonizacion-la-delfina66-1.webm" type="video/webm">
  Tu navegador no soporta el elemento de video.
</video>
```

## ⚠️ Consideraciones Importantes

### 1. GitHub Pages - Límite de 1 GB

Si planeas usar GitHub Pages:
- Límite de repositorio: **1 GB**
- Con videos convertidos (~600 MB) + imágenes (~41 MB) = ~650 MB
- **✅ Cabe perfectamente**

### 2. Git LFS (Large File Storage)

Para videos >100 MB, considera Git LFS:

```cmd
git lfs install
git lfs track "*.webm"
git add .gitattributes
```

### 3. CDN Futuro

Si decides mover a CDN después:

```cmd
# 1. Subir public/videos/ a tu CDN
# 2. Buscar y reemplazar en markdown:
#    /videos/ → https://tu-cdn.com/videos/
```

## 🎬 Ejemplo de Video Convertido

**Original**:
- Formato: MP4 (H.264)
- Tamaño: 39.18 MB
- Bitrate: ~2.5 Mbps

**Convertido (Calidad Media)**:
- Formato: WebM (VP9)
- Tamaño: ~10-12 MB
- Bitrate: ~1 Mbps
- **Reducción: ~70%**

## 🔍 Verificar Resultados

Después de la conversión, revisa:

```cmd
# Ver reporte
type reports\video-mapping.json

# Verificar tamaño
dir /s public\videos
```

## 🆘 Solución de Problemas

### Error: "ffmpeg not found"

Ya lo tienes instalado, pero si aparece este error:

```cmd
# Verificar instalación
ffmpeg -version

# Si no funciona, reinstalar
winget install FFmpeg
```

### Conversión muy lenta

- **Normal**: Videos grandes tardan
- **297 MB** puede tomar 5-10 minutos
- **Total**: 30-60 minutos para todos

### Video no se reproduce

- Verifica compatibilidad del navegador
- Prueba en Chrome/Firefox primero
- Revisa la consola del navegador (F12)

## 📋 Checklist

Antes de ejecutar:
- [ ] ffmpeg instalado ✅
- [ ] Espacio en disco: ~1 GB libre
- [ ] Tiempo disponible: 30-60 minutos
- [ ] Respaldo de archivos importantes (opcional)

Durante la conversión:
- [ ] No cierres la terminal
- [ ] Deja que termine completamente
- [ ] Revisa los mensajes de progreso

Después de la conversión:
- [ ] Verificar `reports/video-mapping.json`
- [ ] Probar algunos videos en navegador
- [ ] Verificar que las referencias se actualizaron

## 🎉 Resultado Final

Con este proceso tendrás:
- ✅ Videos optimizados para web
- ✅ Tamaño reducido en ~70-80%
- ✅ Referencias actualizadas automáticamente
- ✅ Listo para deploy en GitHub Pages
- ✅ Experiencia de usuario mejorada

---

**¿Listo para empezar?**

```cmd
py scripts\11-convert-videos-to-webm.py
```

⏱️ Toma un café, esto tomará un rato... ☕






