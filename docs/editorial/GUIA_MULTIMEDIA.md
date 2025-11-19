# 📸 Guía Multimedia (Imágenes y Video)

Esta guía asegura que el jardín digital de **SOLE Voltaje** sea rápido, accesible y visualmente consistente.

---

## 🖼️ Imágenes

### 1. Dónde guardarlas
Todas las imágenes deben ir en: `content/assets/images/`.
Organízalas en subcarpetas para mantener el orden:
*   `content/assets/images/soluciones/`
*   `content/assets/images/inspirate/`
*   `content/assets/images/conceptorio/`

### 2. Formato y Calidad
*   **Formato preferido:** `.webp` (Mejor compresión y calidad).
*   **Alternativas:** `.jpg` para fotos, `.png` para gráficos/logos.
*   **Peso máximo:** Intenta que no superen los **500KB** por imagen.

### 3. Nombres de Archivo (Importante)
Usa nombres descriptivos separados por guiones o guiones bajos. **Evita espacios y ñ**.

*   ✅ `instalacion-antena-paso1.webp`
*   ✅ `taller_comunidad_guajira.jpg`
*   ❌ `IMG_2024.jpg` (No dice nada)
*   ❌ `foto final v2.png` (Tiene espacios)

### 4. Cómo insertarlas
```markdown
![Descripción detallada para accesibilidad](../../assets/images/carpeta/mi-imagen.webp)
```
*Siempre incluye el texto alternativo (alt text) entre los corchetes `[]`.*

---

## 📹 Videos

Para mantener el repositorio ligero, preferimos videos optimizados.

### 1. Formato Estándar
*   **Formato:** `.webm` (VP9). Es el estándar moderno para web.
*   **Ubicación:** `content/assets/videos/` (o `public/videos/` si son muy grandes y gestionados por script).

### 2. Incrustar Videos
Usa la etiqueta HTML estándar para mayor control:

```html
<video controls width="100%">
  <source src="../../assets/videos/mi-tutorial.webm" type="video/webm">
  Tu navegador no soporta el video.
</video>
```

### 3. Videos Externos (YouTube/Vimeo)
Si el video es muy largo, es mejor subirlo a YouTube e incrustarlo para no sobrecargar el sitio.

---

## 🛠️ Herramientas Automáticas

El equipo técnico ha preparado scripts para facilitar tu trabajo. Si tienes acceso al entorno de desarrollo:

*   **Optimizar Imágenes:**
    ```bash
    python3 scripts/07-optimize-images.py
    ```
    *Reduce el peso de las imágenes automáticamente.*

*   **Convertir Videos:**
    ```bash
    python3 scripts/11-convert-videos-to-webm.py
    ```
    *Convierte tus MP4 a WebM optimizados.*

---
*Mantener los medios optimizados garantiza que el sitio cargue rápido, incluso en conexiones lentas.*

