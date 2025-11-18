# 🌍 Sistema de Internacionalización (i18n) - SOLE Voltaje

Guía completa del sistema de cambio de idioma implementado en SOLE Voltaje.

---

## 📋 Tabla de Contenidos

1. [¿Cómo funciona?](#cómo-funciona)
2. [Estructura de archivos](#estructura-de-archivos)
3. [Componentes del sistema](#componentes-del-sistema)
4. [Personalización](#personalización)
5. [Mantenimiento](#mantenimiento)
6. [Solución de problemas](#solución-de-problemas)

---

## 🔍 ¿Cómo funciona?

### URLs del sitio

El sistema utiliza URLs estándares con prefijos de idioma:

```
/                       → Página de inicio (selector de idioma)
/es/                    → Contenido en español
/es/inspirate/...       → Páginas en español
/en/                    → Content in English
/en/inspire/...         → Pages in English
```

### Características principales

✅ **Página de inicio neutral** (`/`) con selector de idioma
✅ **Botón flotante** en todas las páginas para cambiar idioma
✅ **Detección automática** del idioma del navegador
✅ **URLs limpias y SEO-friendly** con prefijos `/es/` y `/en/`
✅ **Navegación intuitiva** entre versiones de idioma

---

## 📁 Estructura de archivos

```
quartz/
├── content/
│   ├── index.md                 # Página de inicio con selector
│   ├── es/                      # Contenido en español
│   │   ├── inspirate/
│   │   ├── soluciona/
│   │   ├── conceptorio/
│   │   └── ...
│   └── en/                      # Content in English
│       ├── inspire/
│       ├── solve/
│       ├── glossary/
│       └── ...
│
├── static/
│   ├── custom.scss              # Estilos del botón flotante
│   ├── custom.js                # Lógica de cambio de idioma
│   ├── i18n-switcher.css        # CSS adicional (backup)
│   └── i18n-switcher.js         # JS adicional (backup)
│
└── quartz.config.ts             # Configuración de Quartz
```

---

## 🧩 Componentes del sistema

### 1. Página de inicio (`content/index.md`)

**Ubicación:** `quartz/content/index.md`

**Función:** Página de bienvenida con selector de idioma visual.

**Características:**
- Diseño centrado y atractivo
- Botones grandes con banderas y descripciones
- Detección automática del idioma del navegador
- Mensaje indicando el idioma detectado
- (Opcional) Redirección automática después de 2 segundos

**Personalización:**

```markdown
<!-- Para cambiar los textos de bienvenida -->
<h1>Bienvenidos | Welcome</h1>
<p class="subtitle">Selecciona tu idioma | Select your language</p>

<!-- Para activar la redirección automática -->
<!-- Descomenta estas líneas en el script al final del archivo: -->
setTimeout(() => {
  if (isSpanish) {
    window.location.href = '/es/';
  } else {
    window.location.href = '/en/';
  }
}, 2000);
```

### 2. Estilos personalizados (`static/custom.scss`)

**Ubicación:** `quartz/static/custom.scss`

**Función:** Estilos CSS del botón flotante y la página de inicio.

**Características:**
- Botón flotante en esquina inferior derecha
- Animaciones suaves y transiciones
- Soporte para modo oscuro
- Responsive (se adapta a móviles)
- Efectos hover y animación de pulso

**Personalización:**

```scss
/* Cambiar posición del botón */
.i18n-switcher-button {
  bottom: 20px;   /* Distancia desde abajo */
  right: 20px;    /* Distancia desde la derecha */
}

/* Cambiar tamaño del botón */
.i18n-switcher-button {
  width: 60px;    /* Ancho */
  height: 60px;   /* Alto */
}

/* Cambiar colores */
.i18n-switcher-button {
  background: var(--lightgray, #f4f4f4);  /* Color de fondo */
  border: 2px solid var(--gray, #d4d4d4); /* Color del borde */
}
```

### 3. Scripts personalizados (`static/custom.js`)

**Ubicación:** `quartz/static/custom.js`

**Función:** Lógica para detectar idioma actual, crear botón flotante y cambiar entre idiomas.

**Características:**
- Detección automática del idioma de la página
- Conversión de URLs entre `/es/` y `/en/`
- Creación dinámica del botón flotante
- Almacenamiento local para marcar primera visita
- No aparece en la página de inicio

**Personalización:**

```javascript
// Configuración de idiomas
const config = {
  languages: {
    es: {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',        // Cambiar bandera/emoji
      switchTo: 'English'
    },
    en: {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',        // Cambiar bandera/emoji
      switchTo: 'Español'
    }
  }
};
```

---

## 🎨 Personalización

### Cambiar las banderas/emojis

Edita `quartz/static/custom.js`:

```javascript
// Opciones de banderas:
// 🇪🇸 España
// 🇲🇽 México
// 🇨🇴 Colombia
// 🇦🇷 Argentina
// 🇺🇸 Estados Unidos
// 🇬🇧 Reino Unido

flag: '🇨🇴',  // Cambia por la bandera que prefieras
```

### Cambiar posición del botón

Edita `quartz/static/custom.scss`:

```scss
/* Mover a la izquierda */
.i18n-switcher-button {
  left: 20px;
  right: auto;
}

/* Mover arriba */
.i18n-switcher-button {
  top: 20px;
  bottom: auto;
}
```

### Cambiar colores del botón

Edita `quartz/static/custom.scss`:

```scss
.i18n-switcher-button {
  /* Colores personalizados */
  background: #ffffff;
  border: 2px solid #284b63; /* Color secundario de SOLE */
}

.i18n-switcher-button:hover {
  background: #84a59d; /* Color terciario de SOLE */
  border-color: #284b63;
}
```

### Agregar más idiomas

Si en el futuro quieres agregar más idiomas (ej: Portugués):

1. **Crear carpeta de contenido:**
   ```
   quartz/content/pt/
   ```

2. **Actualizar `custom.js`:**
   ```javascript
   const config = {
     languages: {
       es: { code: 'es', name: 'Español', flag: '🇪🇸' },
       en: { code: 'en', name: 'English', flag: '🇬🇧' },
       pt: { code: 'pt', name: 'Português', flag: '🇵🇹' }
     }
   };
   ```

3. **Actualizar lógica de conversión de URLs en `custom.js`**

---

## 🔧 Mantenimiento

### Agregar una nueva página

Para agregar contenido en ambos idiomas:

1. **Español:** Crea el archivo en `quartz/content/es/[carpeta]/mi-pagina.md`
2. **English:** Crea el archivo equivalente en `quartz/content/en/[folder]/my-page.md`

**Ejemplo:**

```
quartz/content/es/inspirate/mi-nueva-solucion.md
quartz/content/en/inspire/my-new-solution.md
```

El botón de cambio de idioma automáticamente convertirá:
- `/es/inspirate/mi-nueva-solucion` → `/en/inspirate/mi-nueva-solucion`

⚠️ **Nota:** Si las rutas no coinciden exactamente, el usuario será redirigido a la página principal del otro idioma (`/es/` o `/en/`).

### Mantener coherencia en las URLs

Para que el cambio de idioma funcione correctamente:

✅ **Bueno - URLs paralelas:**
```
/es/inspirate/bicigenerador
/en/inspire/bicigenerator       ← Misma estructura
```

❌ **Malo - URLs diferentes:**
```
/es/inspirate/bicigenerador
/en/solutions/bike-generator    ← Estructura diferente
```

**Recomendación:** Usa la misma estructura de carpetas y nombres de archivo similares (traducidos) en ambos idiomas.

### Verificar que todo funciona

1. **Página de inicio:**
   - Accede a `http://localhost:8080/`
   - Verifica que aparezcan los botones de idioma
   - Verifica que detecta tu idioma del navegador

2. **Botón flotante:**
   - Navega a cualquier página en `/es/` o `/en/`
   - Verifica que aparece el botón flotante en la esquina
   - Haz clic para cambiar de idioma

3. **Navegación:**
   - Cambia entre páginas en español
   - Cambia al inglés con el botón
   - Verifica que la URL cambia correctamente

---

## 🐛 Solución de problemas

### El botón flotante no aparece

**Posibles causas:**

1. **Archivos no copiados:** Quartz no copió los archivos `custom.scss` y `custom.js`
   
   **Solución:**
   ```bash
   # Reconstruir el sitio
   npm run build
   # O en desarrollo
   npm run dev
   ```

2. **Caché del navegador:** El navegador tiene versión antigua
   
   **Solución:**
   - Presiona `Ctrl + Shift + R` (Windows/Linux)
   - Presiona `Cmd + Shift + R` (Mac)
   - O abre en modo incógnito

3. **Estás en la página de inicio:** El botón solo aparece en páginas con idioma (`/es/` o `/en/`)
   
   **Solución:** Navega a cualquier página de contenido

### El botón no cambia de idioma correctamente

**Posibles causas:**

1. **URLs no paralelas:** Las rutas en español e inglés no coinciden
   
   **Solución:** Asegúrate de que las estructuras de carpetas sean similares:
   ```
   /es/inspirate/mi-pagina.md
   /en/inspire/my-page.md    ← Misma estructura
   ```

2. **Página no existe en el otro idioma:** La página solo está en un idioma
   
   **Solución:** El usuario será redirigido a `/es/` o `/en/` (página principal)

### Los estilos del botón se ven mal

**Posibles causas:**

1. **Conflicto con temas de Quartz**
   
   **Solución:** Edita `custom.scss` y aumenta la especificidad:
   ```scss
   body .i18n-switcher-button {
     /* tus estilos */
   }
   ```

2. **Variables de color no definidas**
   
   **Solución:** Usa valores hexadecimales directos en lugar de variables CSS:
   ```scss
   background: #f4f4f4 !important;
   ```

### La página de inicio no se ve bien

**Posibles causas:**

1. **Estilos en línea no funcionan**
   
   **Solución:** Los estilos dentro de `<style>` en el Markdown deberían funcionar. Si no, mueve los estilos a `custom.scss`:
   
   ```scss
   /* En custom.scss */
   .language-selector-home {
     /* estilos aquí */
   }
   ```

---

## 📚 Recursos adicionales

- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Markdown Guide](https://www.markdownguide.org/)
- [MDN - i18n](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)

---

## ✅ Checklist de implementación

- [x] Crear página de inicio en `/` con selector de idioma
- [x] Configurar estilos personalizados en `custom.scss`
- [x] Configurar scripts personalizados en `custom.js`
- [x] Implementar botón flotante de cambio de idioma
- [x] Implementar detección automática de idioma del navegador
- [x] Documentar sistema completo
- [ ] Probar en desarrollo local
- [ ] Probar en todos los navegadores
- [ ] Verificar responsive en móviles
- [ ] Desplegar a producción

---

**Última actualización:** 10 de Noviembre, 2025
**Versión:** 1.0.0
**Autor:** SOLE Colombia con IA Assistant

