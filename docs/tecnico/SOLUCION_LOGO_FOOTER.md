# 🖼️ Solución: Logo no aparece en el Footer

## 📍 Problema

El logo de SOLE Voltaje (`icon.png`) no se muestra en el footer después de hacer el build del sitio.

---

## ✅ Soluciones

### Solución 1: Verificar que el archivo existe

```bash
ls -la /workspace/quartz/quartz/static/icon.png
```

**Si el archivo NO existe:**
- Copia tu logo a `/workspace/quartz/quartz/static/icon.png`
- El tamaño recomendado es **32x32px** o **64x64px**
- Formato: PNG con fondo transparente

### Solución 2: Rebuild limpio

```bash
cd /workspace/quartz
rm -rf .quartz-cache public
npx quartz build --serve
```

Esto eliminará la caché y reconstruirá todo desde cero.

### Solución 3: Verificar la ruta en el Footer

El archivo está en:
```
/workspace/quartz/quartz/components/Footer.tsx
```

Línea 84 debe tener:
```tsx
<img src="/static/icon.png" alt="SOLE Voltaje" class="footer-logo" />
```

**Nota:** La ruta debe ser `/static/icon.png` (con slash inicial).

### Solución 4: Verificar que el Plugin Static está activo

En `/workspace/quartz/quartz.config.ts`, verifica que en la sección `emitters` esté:

```typescript
Plugin.Static(),
```

Este plugin copia los archivos de `quartz/static/` a `public/static/` durante el build.

---

## 🔍 Diagnóstico Paso a Paso

### 1. Verificar el archivo original

```bash
cd /workspace/quartz
ls -lh quartz/static/icon.png
```

Deberías ver algo como:
```
-rw-r--r-- 1 root root 3.3K Nov 10 11:32 quartz/static/icon.png
```

### 2. Hacer un build de prueba

```bash
npx quartz build
```

### 3. Verificar que se copió al public

```bash
ls -lh public/static/icon.png
```

Si este archivo **NO existe**, el problema está en el build/copia.

### 4. Verificar en el navegador

Abre tu sitio y en la consola del navegador (F12), prueba:

```javascript
fetch('/static/icon.png').then(r => console.log('Logo found:', r.ok))
```

Si retorna `Logo found: false`, el archivo no está siendo servido.

---

## 🛠️ Solución Alternativa: Usar el favicon

Si el logo sigue sin funcionar, puedes usar el favicon del sitio:

```tsx
<img src="/favicon.ico" alt="SOLE Voltaje" class="footer-logo" />
```

O usar una URL externa (CDN):

```tsx
<img src="https://voltaje.solecolombia.org/static/icon.png" alt="SOLE Voltaje" class="footer-logo" />
```

---

## 🔄 Después de los Cambios

1. **Guardar** todos los archivos
2. **Rebuild** completo:
   ```bash
   cd /workspace/quartz
   rm -rf .quartz-cache public
   npx quartz build --serve
   ```
3. **Refrescar** el navegador con Ctrl+F5
4. **Verificar** que el logo aparece en el footer

---

## 📝 Checklist de Verificación

- [ ] El archivo `icon.png` existe en `quartz/static/`
- [ ] El tamaño del logo es razonable (< 100KB)
- [ ] La ruta en Footer.tsx es `/static/icon.png`
- [ ] El Plugin.Static() está en la configuración
- [ ] Se hizo un rebuild limpio
- [ ] Se limpió la caché del navegador
- [ ] Se verificó en la consola del navegador

---

## 🆘 Si Nada Funciona

### Opción A: Usar imagen en base64

Convierte tu logo a base64 y úsalo directamente:

```bash
base64 quartz/static/icon.png
```

Luego en Footer.tsx:

```tsx
<img src="data:image/png;base64,iVBORw0KG..." alt="SOLE Voltaje" class="footer-logo" />
```

### Opción B: Usar un componente SVG

Si tu logo es simple, conviértelo a SVG y úsalo como componente React directamente en el Footer.

### Opción C: Subir a un CDN

Sube el logo a:
- Cloudinary
- Imgur  
- GitHub Pages
- Tu servidor

Y usa la URL externa.

---

## 📧 Contacto

Si el problema persiste, revisa:
- [Documentación de Quartz](https://quartz.jzhao.xyz/)
- [GitHub Issues de Quartz](https://github.com/jackyzha0/quartz/issues)
- Logs de build en la consola

---

**Última actualización:** Noviembre 2025

