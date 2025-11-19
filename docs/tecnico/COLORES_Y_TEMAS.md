# 🎨 Guía de Colores y Temas - SOLE Voltaje

## 📍 Ubicación de la Configuración

Los colores globales del sitio se configuran en:
```
/workspace/quartz/quartz.config.ts
```

Líneas 30-53 (sección `colors`)

---

## 🎨 Paleta de Colores Actual

### Modo Claro (Light Mode)

| Color | Código | Uso |
|-------|--------|-----|
| **Fondo principal** | `#ffffff` | Fondo de páginas |
| **Gris muy claro** | `#e8ecf1` | Bordes y separadores |
| **Gris medio** | `#9ca3af` | Texto secundario |
| **Gris oscuro** | `#374151` | Texto importante |
| **Negro** | `#1f2937` | Texto principal |
| **Azul SOLE** 🔵 | `#0066cc` | Enlaces, botones, color principal |
| **Verde energético** 🟢 | `#10b981` | Acentos, badges, estados positivos |
| **Highlight** | `rgba(0, 102, 204, 0.12)` | Fondo de elementos resaltados |
| **Text Highlight** | `#fef3c7` | Texto resaltado con marca-textos |

### Modo Oscuro (Dark Mode)

| Color | Código | Uso |
|-------|--------|-----|
| **Fondo principal** | `#0f1419` | Fondo de páginas |
| **Gris oscuro** | `#1f2937` | Bordes y separadores |
| **Gris medio** | `#6b7280` | Texto secundario |
| **Gris claro** | `#d1d5db` | Texto importante |
| **Blanco** | `#f3f4f6` | Texto principal |
| **Azul brillante** 🔵 | `#3b82f6` | Enlaces, botones, color principal |
| **Verde energético** 🟢 | `#10b981` | Acentos, badges, estados positivos |
| **Highlight** | `rgba(59, 130, 246, 0.15)` | Fondo de elementos resaltados |
| **Text Highlight** | `#fcd34d88` | Texto resaltado con marca-textos |

---

## 🔧 Cómo Cambiar los Colores

### 1. Editar el archivo de configuración

```bash
nano /workspace/quartz/quartz.config.ts
```

O abrirlo en tu editor favorito.

### 2. Encontrar la sección de colores (línea 30)

```typescript
colors: {
  lightMode: {
    light: "#ffffff",
    secondary: "#0066cc",  // ← Cambiar este valor
    // ...
  },
  darkMode: {
    // ...
  },
}
```

### 3. Reconstruir el sitio

```bash
cd /workspace/quartz
npx quartz build --serve
```

---

## 🎯 Qué Hace Cada Color

### `light`
- **Uso:** Color de fondo principal de las páginas
- **Recomendación:** Debe ser muy claro en light mode, muy oscuro en dark mode
- **Ejemplo:** Blanco `#ffffff` o Gris muy claro `#f8f9fa`

### `lightgray`
- **Uso:** Bordes, separadores, líneas divisorias
- **Recomendación:** Debe tener poco contraste con el fondo
- **Ejemplo:** `#e8ecf1` o `#dee2e6`

### `gray`
- **Uso:** Texto secundario, metadatos, fechas
- **Recomendación:** Legible pero no dominante
- **Ejemplo:** `#9ca3af` o `#868e96`

### `darkgray`
- **Uso:** Texto importante pero no principal
- **Recomendación:** Buen contraste con el fondo
- **Ejemplo:** `#374151` o `#495057`

### `dark`
- **Uso:** Texto principal del contenido
- **Recomendación:** Máximo contraste con el fondo
- **Ejemplo:** `#1f2937` o `#212529`

### `secondary` ⭐ (Color Principal)
- **Uso:** Enlaces, botones principales, color de marca
- **Recomendación:** Color característico de tu marca
- **Ejemplo:** Azul SOLE `#0066cc` o tu color corporativo

### `tertiary` ⭐ (Color de Acento)
- **Uso:** Botones secundarios, badges, destacados
- **Recomendación:** Complementa al color principal
- **Ejemplo:** Verde `#10b981` o Naranja `#ff6b35`

### `highlight`
- **Uso:** Fondo de elementos al pasar el mouse (hover)
- **Recomendación:** Versión muy transparente del color principal
- **Ejemplo:** `rgba(0, 102, 204, 0.12)`

### `textHighlight`
- **Uso:** Texto resaltado con marca-textos (==texto==)
- **Recomendación:** Amarillo suave o color pastel
- **Ejemplo:** `#fef3c7` o `#fff3bf`

---

## 🌈 Paletas Sugeridas

### Opción 1: Azul Tecnológico (Actual)
```typescript
lightMode: {
  secondary: "#0066cc",  // Azul SOLE
  tertiary: "#10b981",   // Verde
}
```

### Opción 2: Naranja Energético
```typescript
lightMode: {
  secondary: "#ff6b35",  // Naranja vibrante
  tertiary: "#4ecdc4",   // Turquesa
}
```

### Opción 3: Púrpura Moderno
```typescript
lightMode: {
  secondary: "#6366f1",  // Índigo
  tertiary: "#ec4899",   // Rosa
}
```

### Opción 4: Verde Sostenible
```typescript
lightMode: {
  secondary: "#059669",  // Verde oscuro
  tertiary: "#f59e0b",   // Ámbar
}
```

---

## 🎨 Herramientas Útiles

### Generadores de Paletas
- [Coolors](https://coolors.co/) - Generador de paletas
- [Adobe Color](https://color.adobe.com/) - Rueda de colores
- [Material Design Colors](https://materialui.co/colors/) - Paletas Material

### Verificadores de Contraste (Accesibilidad)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)

### Recomendación
Para accesibilidad, el contraste entre texto y fondo debe ser:
- **Mínimo 4.5:1** para texto normal
- **Mínimo 3:1** para texto grande

---

## 🔄 Aplicar Cambios

Después de modificar los colores:

1. **Guardar el archivo** `quartz.config.ts`
2. **Reconstruir** el sitio:
   ```bash
   cd /workspace/quartz
   npx quartz build
   ```
3. **Verificar** en el navegador (puede necesitar Ctrl+F5 para limpiar caché)
4. **Hacer commit** de los cambios:
   ```bash
   git add quartz/quartz.config.ts
   git commit -m "Actualizar paleta de colores del sitio"
   git push
   ```

---

## 📝 Notas Importantes

- Los colores se aplican **automáticamente** a todo el sitio
- No necesitas modificar archivos CSS manualmente
- Los cambios requieren **rebuild** para verse reflejados
- Prueba siempre en **ambos modos** (claro y oscuro)
- Verifica la **accesibilidad** del contraste

---

## 🐛 Solución de Problemas

### Los colores no cambian después de rebuild

```bash
# Limpiar cache y reconstruir
rm -rf quartz/.quartz-cache quartz/public
npx quartz build
```

### Los colores se ven diferentes en producción

- Asegúrate de hacer `git push` después del commit
- Verifica que el deploy se haya completado
- Limpia la caché del navegador (Ctrl+Shift+R)

---

**Última actualización:** Noviembre 2025
**Versión de Quartz:** 4.x

