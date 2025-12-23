# 🖼️ Configuración del Logo y Footer - SOLE Voltaje

## 📍 Archivos Clave

| Archivo | Ubicación | Propósito |
|---------|-----------|-----------|
| **Logo principal** | `quartz/static/logo.png` | Logo que aparece en el header y footer |
| **Favicon** | `quartz/static/icon.png` | Icono del navegador |
| **PageTitle.tsx** | `quartz/components/PageTitle.tsx` | Componente del logo en header |
| **Footer.tsx** | `quartz/components/Footer.tsx` | Componente del footer |
| **footer.scss** | `quartz/components/styles/footer.scss` | Estilos del footer |

---

## 🖼️ Logo en el Header

### Configuración Actual

El logo del header está en `quartz/components/PageTitle.tsx`:

```tsx
<img src={joinSegments(baseDir, "static/logo.png")} alt="" class="page-logo" />
```

### Tamaños Responsive

```css
.page-logo {
  height: 6rem;      /* Desktop grande */
}

@media (max-width: 1200px) {
  .page-logo { height: 5rem; }
}

@media (max-width: 768px) {
  .page-logo { height: 4rem; }
}

@media (max-width: 480px) {
  .page-logo { height: 3rem; }
}
```

### Cambiar el Logo

1. Reemplaza el archivo `quartz/static/logo.png`
2. Formato recomendado: **PNG con fondo transparente**
3. Tamaño recomendado: **Mínimo 200px de altura**
4. Rebuild: `npx quartz build --serve`

---

## 🦶 Logo en el Footer

### Configuración Actual

El logo del footer está en `quartz/components/Footer.tsx`:

```tsx
<div class="footer-branding">
  <img src="/static/logo.png" alt="SOLE Voltaje" class="footer-logo" />
</div>
```

### Estilos del Footer

En `quartz/components/styles/footer.scss`:

```scss
.footer-branding {
  display: flex;
  justify-content: flex-end;
  
  .footer-logo {
    width: auto;
    height: 80px;
    object-fit: contain;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
}
```

### Nota Importante

El footer siempre muestra el logo, independientemente de si hay links personalizados configurados.

---

## 📐 Estructura del Footer

El footer tiene tres secciones:

```
┌─────────────────────────────────────────────────────────────────┐
│  footer-links      │  footer-info           │  footer-custom    │
│  ────────────      │  ───────────           │  ─────────────    │
│  • ¿Nuevo aquí?    │  Texto del proyecto    │  [Links opcionales]│
│  • Inspírate       │  Licencia              │                    │
│  • Soluciona       │  Créditos Quartz       │  [LOGO]           │
│  • etc...          │                        │                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Solución de Problemas

### El logo no aparece

1. **Verificar que el archivo existe:**
   ```bash
   ls -la quartz/static/logo.png
   ```

2. **Rebuild limpio:**
   ```bash
   rm -rf .quartz-cache public
   npx quartz build --serve
   ```

3. **Verificar la ruta en el navegador:**
   - Abre las DevTools (F12)
   - Ve a la pestaña Network
   - Busca `logo.png`
   - Verifica que el status sea 200

### El logo se ve muy pequeño o muy grande

Ajustar los valores de `height` en:
- `PageTitle.tsx` para el header
- `footer.scss` para el footer

### El logo se ve pixelado

- Usa una imagen de mayor resolución
- Mínimo 2x el tamaño mostrado (para pantallas Retina)
- Ejemplo: Si se muestra a 80px, usa una imagen de 160px

---

## 📝 Cambiar los Links del Footer

En `Footer.tsx`, editar el objeto `soleLinks`:

```typescript
const soleLinks = {
  "¿Nuevo aquí?": "/es/new-here",
  "Inspírate": "/es/inspire",
  "Soluciona": "/es/solve",
  "Pregunta/Comenta": "/es/answers-comments",
  "¿Desconectado?": "/es/disconnected",
  "Conceptorio": "/es/glossary",
}
```

---

## 🎨 Personalizar Colores del Footer

En `footer.scss`:

```scss
footer {
  border-top: 1px solid var(--lightgray);  // Línea superior
  
  a {
    color: inherit;  // Hereda el color del tema
    
    &:hover {
      opacity: 1;  // Más visible al hover
    }
  }
}
```

---

## ✅ Checklist de Verificación

- [ ] `logo.png` existe en `quartz/static/`
- [ ] El archivo es PNG con fondo transparente
- [ ] La resolución es suficiente (mínimo 200px altura)
- [ ] El tamaño del archivo es razonable (< 500KB)
- [ ] Se hizo rebuild después de cambiar el logo
- [ ] Se limpió la caché del navegador (Ctrl+Shift+R)

---

**Última actualización:** Diciembre 2024
