# 🚀 Guía Rápida - Sistema i18n

Pasos para probar el sistema de cambio de idioma en SOLE Voltaje.

---

## ✅ Paso 1: Verificar archivos creados

Asegúrate de que existen estos archivos:

```
✓ quartz/content/index.md
✓ quartz/static/custom.scss
✓ quartz/static/custom.js
✓ quartz/quartz.config.ts (actualizado)
✓ docs/I18N_SISTEMA_IDIOMAS.md
```

---

## ✅ Paso 2: Probar en desarrollo

### Opción A: Con Docker (Recomendado)

```bash
npm run dev
```

Esto ejecutará:
```bash
docker compose -f docker-compose.dev.yml up
```

### Opción B: Sin Docker

```bash
cd quartz
npx quartz build --serve
```

---

## ✅ Paso 3: Abrir el navegador

Abre tu navegador en:

```
http://localhost:8080
```

**Deberías ver:**
- 🏠 Página de inicio con selector de idioma
- 🇪🇸 🇬🇧 Dos botones grandes (Español / English)
- 🌐 Mensaje detectando tu idioma del navegador

---

## ✅ Paso 4: Probar navegación

### 1. Página de inicio

**Prueba:**
1. Accede a `http://localhost:8080`
2. Verifica que aparece el selector de idioma
3. Haz clic en "Español" → Deberías ir a `/es/`
4. Vuelve atrás y haz clic en "English" → Deberías ir a `/en/`

**✓ Esperado:** Navegación funciona correctamente

---

### 2. Botón flotante

**Prueba:**
1. Navega a cualquier página en español: `http://localhost:8080/es/inspirate/...`
2. Busca en la esquina **inferior derecha** el botón flotante
3. Verifica que muestra: **🇬🇧 EN** (para cambiar a inglés)
4. Haz clic en el botón
5. Deberías ir a la misma página pero en `/en/`

**✓ Esperado:** El botón aparece y funciona correctamente

---

### 3. Cambio entre idiomas

**Prueba:**
1. Ve a una página en español, por ejemplo:
   ```
   http://localhost:8080/es/inspirate/bicigenerador-solutions-db
   ```

2. Haz clic en el botón flotante **🇬🇧 EN**

3. Deberías ir a:
   ```
   http://localhost:8080/en/inspirate/bicigenerador-solutions-db
   ```

**Nota:** Si la página no existe en inglés, serás redirigido a `/en/`

**✓ Esperado:** Cambio de idioma funciona

---

### 4. Responsive (Móviles)

**Prueba:**
1. Abre las herramientas de desarrollador: `F12`
2. Activa el modo responsive/móvil
3. Verifica que el botón flotante se ve bien en pantallas pequeñas
4. Verifica que la página de inicio se adapta correctamente

**✓ Esperado:** Todo se ve bien en móvil

---

## 🐛 Solución rápida de problemas

### ❌ El botón flotante NO aparece

**Solución 1: Reconstruir**
```bash
# Detener el servidor (Ctrl+C)
npm run dev:rebuild
# O manualmente:
cd quartz
npm ci
npx quartz build --serve
```

**Solución 2: Limpiar caché**
- Presiona `Ctrl + Shift + R` (Windows/Linux)
- Presiona `Cmd + Shift + R` (Mac)
- O abre en modo incógnito

**Solución 3: Verificar consola del navegador**
1. Abre DevTools (`F12`)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Compártelos si necesitas ayuda

---

### ❌ La página de inicio se ve mal

**Solución:** Los estilos en línea deberían funcionar. Si no:

1. Abre `quartz/content/index.md`
2. Verifica que el `<style>` block esté completo
3. Recarga con `Ctrl + Shift + R`

---

### ❌ El botón cambia la URL pero la página no existe

**Esto es normal** si la página solo existe en un idioma.

**Solución:** Crear la versión en el otro idioma:

```
quartz/content/es/mi-carpeta/mi-pagina.md
quartz/content/en/my-folder/my-page.md  ← Crear esta
```

---

## 📊 Checklist de pruebas

Marca cada elemento cuando lo hayas probado:

- [ ] Página de inicio carga correctamente
- [ ] Botones de idioma funcionan
- [ ] Detección de idioma del navegador funciona
- [ ] Botón flotante aparece en páginas `/es/` y `/en/`
- [ ] Botón NO aparece en la página de inicio `/`
- [ ] Cambio de español a inglés funciona
- [ ] Cambio de inglés a español funciona
- [ ] Se ve bien en escritorio
- [ ] Se ve bien en móvil
- [ ] Animaciones funcionan suavemente

---

## 🎉 ¡Listo!

Si todos los puntos funcionan, el sistema i18n está **completamente operativo**.

Ahora puedes:

1. **Personalizar colores y estilos** en `quartz/static/custom.scss`
2. **Cambiar las banderas** en `quartz/static/custom.js`
3. **Agregar más contenido** en `/es/` y `/en/`
4. **Desplegar a producción** con GitHub Actions

---

## 📚 Siguiente paso

Lee la documentación completa en:
- `docs/I18N_SISTEMA_IDIOMAS.md` - Guía completa del sistema

---

**¿Problemas?** Revisa:
1. `docs/I18N_SISTEMA_IDIOMAS.md` - Sección "Solución de problemas"
2. `docs/DOCKER.md` - Si hay problemas con Docker
3. `docs/DESPLIEGUE.md` - Para desplegar a producción

---

**Última actualización:** 10 de Noviembre, 2025

