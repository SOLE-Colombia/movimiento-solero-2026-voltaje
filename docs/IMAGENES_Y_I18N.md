# 🖼️ Gestión de Imágenes e Internacionalización (i18n)

## 📸 Parte 1: Corregir Rutas de Imágenes

### Script Python para Actualizar Rutas

Creamos un script que automáticamente corrige las rutas de imágenes en todos tus archivos `.md`.

### Uso del Script

#### 1. **Modo DRY-RUN** (Ver cambios sin guardar)

```bash
# Ver todos los cambios que se harían
python scripts/fix-image-paths.py --dry-run

# Ver solo cambios en español
python scripts/fix-image-paths.py --dry-run --lang es

# Ver solo cambios en inglés  
python scripts/fix-image-paths.py --dry-run --lang en
```

#### 2. **Aplicar Cambios Reales**

```bash
# Aplicar cambios en ambos idiomas
python scripts/fix-image-paths.py

# Solo en español
python scripts/fix-image-paths.py --lang es

# Solo en inglés
python scripts/fix-image-paths.py --lang en
```

### Cómo Funciona

El script:

1. **Escanea** todas las imágenes en `quartz/content/assets/images/`
2. **Encuentra** todas las referencias de imágenes en tus `.md`:
   - `![alt](path)`
   - `![alt](path "title")`
   - `<img src="path">`
3. **Corrige** las rutas para que apunten a `/assets/images/carpeta/imagen.ext`
4. **Reporta** qué archivos cambió y cuántas rutas actualizó

### Ejemplo de Salida

```
🔧 Corrector de Rutas de Imágenes - SOLE Voltaje
══════════════════════════════════════════════════

📸 Escaneando imágenes...
✅ Encontradas 322 imágenes

📁 Procesando archivos en es/
══════════════════════════════════════════════════

📄 es/conceptorio/antena-antenna-conceptorio.md
   2 cambio(s):
  • ../images/antenna.png → /assets/images/conc-antenna/conc-antenna-parabolic.png
  • images/antenna2.webp → /assets/images/conc-antenna-yagi/conc-antenna-yagi-antenna.png

📊 Resumen para es/
   Archivos procesados: 431
   Archivos con cambios: 127
   Total de cambios: 284
```

---

## 🌍 Parte 2: Internacionalización (i18n)

### Opción A: Quartz con Selector de Idioma (Más Fácil)

Quartz no tiene i18n nativo, pero podemos implementar un selector de idioma simple:

#### 1. Crear el Selector de Idioma

**Archivo:** `quartz/quartz/components/LanguageSelector.tsx`

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const LanguageSelector: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // Detectar idioma actual
    const currentPath = fileData.slug || ""
    const isSpanish = currentPath.startsWith("es/") || currentPath === "es"
    const isEnglish = currentPath.startsWith("en/") || currentPath === "en"
    
    // Generar ruta alternativa
    let alternatePath = ""
    if (isSpanish) {
      alternatePath = currentPath.replace(/^es\//, "en/")
    } else if (isEnglish) {
      alternatePath = currentPath.replace(/^en\//, "es/")
    }
    
    const currentLang = isSpanish ? "Español" : "English"
    const targetLang = isSpanish ? "English" : "Español"
    const targetCode = isSpanish ? "EN" : "ES"
    
    return (
      <div class={`language-selector ${displayClass ?? ""}`}>
        <div class="current-lang">
          🌐 {currentLang}
        </div>
        <a href={`/${alternatePath}`} class="switch-lang">
          <span class="icon">🔄</span>
          <span class="text">{targetCode}</span>
        </a>
      </div>
    )
  }
  
  return LanguageSelector
}) satisfies QuartzComponentConstructor
```

#### 2. Agregar Estilos

**Archivo:** `quartz/quartz/styles/custom.scss`

```scss
// Selector de idioma
.language-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: var(--light);
  border-radius: 8px;
  
  .current-lang {
    font-size: 0.9rem;
    color: var(--gray);
  }
  
  .switch-lang {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--secondary);
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    
    &:hover {
      background: var(--tertiary);
      transform: translateY(-2px);
    }
    
    .icon {
      font-size: 1.2rem;
    }
  }
}
```

#### 3. Registrar el Componente

**Archivo:** `quartz/quartz.layout.ts`

```typescript
import LanguageSelector from "./quartz/components/LanguageSelector"

// En la configuración de layout, agregar:
sharedPageComponents: {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.LanguageSelector(), // 👈 Agregar aquí
    Component.Search(),
  ],
  // ... resto de componentes
}
```

---

### Opción B: Estructura de Carpetas Actual con Mejor UX

Si prefieres mantener `/es/` y `/en/` pero mejorar la experiencia:

#### 1. Página de Inicio con Selector

**Archivo:** `quartz/content/index.md`

```markdown
---
title: SOLE Voltaje
---

# 🌍 Selecciona tu idioma / Select your language

<div class="language-selection">
  <a href="/es/" class="lang-card spanish">
    <span class="flag">🇪🇸</span>
    <h2>Español</h2>
    <p>Contenido en español</p>
  </a>
  
  <a href="/en/" class="lang-card english">
    <span class="flag">🇬🇧</span>
    <h2>English</h2>
    <p>Content in English</p>
  </a>
</div>

<style>
.language-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.lang-card {
  padding: 2rem;
  border: 2px solid var(--lightgray);
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;
}

.lang-card:hover {
  border-color: var(--secondary);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.flag {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.lang-card h2 {
  margin: 0.5rem 0;
  color: var(--dark);
}

.lang-card p {
  color: var(--gray);
  margin: 0;
}
</style>
```

#### 2. Botón Flotante de Cambio de Idioma

**Archivo:** Agregar a `quartz/quartz/styles/custom.scss`

```scss
// Botón flotante de idioma
.floating-lang-switch {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: var(--secondary);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 30px rgba(0,0,0,0.3);
    }
  }
}
```

---

## 🎯 Recomendación

### Para tu caso, sugiero:

1. **Primero:** Ejecutar el script de imágenes
   ```bash
   python scripts/fix-image-paths.py --dry-run  # Ver cambios
   python scripts/fix-image-paths.py            # Aplicar cambios
   ```

2. **Después:** Implementar **Opción B** (más simple)
   - Crear página de inicio con selector
   - Agregar botón flotante de cambio de idioma
   - Mantener estructura `/es/` y `/en/`

3. **Futuro:** Si necesitas i18n más avanzado, considerar migrar a un SSG con i18n nativo como:
   - Next.js con next-intl
   - Astro con astro-i18n
   - Docusaurus (tiene i18n nativo)

---

## 📋 Checklist de Implementación

### Fase 1: Imágenes
- [ ] Ejecutar script en modo dry-run
- [ ] Revisar los cambios propuestos
- [ ] Aplicar cambios
- [ ] Verificar que las imágenes se vean correctamente
- [ ] Commitear cambios

### Fase 2: i18n Básico
- [ ] Crear `index.md` con selector de idioma
- [ ] Agregar estilos para selector
- [ ] Crear componente LanguageSelector (opcional)
- [ ] Agregar botón flotante de cambio
- [ ] Probar navegación entre idiomas

### Fase 3: Testing
- [ ] Probar en desarrollo (`npm run dev`)
- [ ] Verificar todas las imágenes
- [ ] Probar cambio de idioma
- [ ] Verificar en producción

---

**Última actualización:** 9 de Noviembre, 2025

