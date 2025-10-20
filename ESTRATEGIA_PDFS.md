# 📄 Estrategia: PDFs Inteligentes para SOLE Voltaje

## 🔍 Problema Identificado

### Situación Actual
- **410 PDFs** en el repositorio
- **7,489 MB (7.5 GB)** de espacio
- Optimización solo reduce **0.2%** (ya están comprimidos)
- Muchos PDFs son **exports de Notion** de páginas que ya existen en markdown

### Por qué es un problema
- ❌ Duplicación de contenido (PDF + Markdown)
- ❌ Tamaño excesivo del repositorio
- ❌ Difícil de mantener (actualizar contenido requiere regenerar PDFs)
- ❌ GitHub Pages tiene límite de 1 GB recomendado
- ❌ PDFs estáticos no se actualizan cuando cambias el contenido

---

## ✅ Solución: PDFs Bajo Demanda

### Concepto
**NO almacenar PDFs estáticos** → **Generar PDFs dinámicamente cuando el usuario los solicita**

### Arquitectura

```
Usuario en página web
    ↓
Clic en "📥 Descargar PDF"
    ↓
[Opción A] Cliente genera PDF con JavaScript
[Opción B] API serverless genera PDF
[Opción C] GitHub Action pre-genera PDFs clave
    ↓
Usuario descarga PDF generado
```

---

## 🚀 Implementación: 3 Opciones

### **Opción 1: Generación Client-Side (Recomendado para Quartz)**

#### Tecnología: jsPDF + html2canvas

**Ventajas:**
- ✅ Sin servidor necesario
- ✅ Funciona en sitio estático (GitHub Pages)
- ✅ Sin costos adicionales
- ✅ PDFs siempre actualizados con contenido web

**Desventajas:**
- ⚠️ Calidad media (rendering del navegador)
- ⚠️ Estilos pueden variar
- ⚠️ Procesa en el navegador del usuario

#### Implementación en Quartz:

```typescript
// quartz/components/PDFDownload.tsx
import { QuartzComponent, QuartzComponentConstructor } from "../components/types"
import { classNames } from "../util/lang"

export default (() => {
  const PDFDownload: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <button
        class={classNames(displayClass, "pdf-download-btn")}
        onclick="generatePDF()"
      >
        📥 Descargar como PDF
      </button>
    )
  }

  PDFDownload.css = `
    .pdf-download-btn {
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `

  return PDFDownload
}) satisfies QuartzComponentConstructor
```

```javascript
// quartz/static/scripts/pdf-generator.js
async function generatePDF() {
  // Importar librerías
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  // Obtener contenido de la página
  const content = document.querySelector('article');
  
  // Generar canvas
  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
    logging: false
  });

  // Crear PDF
  const imgWidth = 210; // A4 width in mm
  const imgHeight = canvas.height * imgWidth / canvas.width;
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  
  pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
  // Descargar
  const pageTitle = document.title || 'documento';
  pdf.save(`${pageTitle}.pdf`);
}
```

```html
<!-- quartz/template.html - Agregar librerías CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

---

### **Opción 2: API Serverless (Mejor calidad)**

#### Tecnología: Cloudflare Workers + Puppeteer

**Ventajas:**
- ✅ Excelente calidad (renderiza con Chrome)
- ✅ Estilos perfectos
- ✅ Puede generar PDFs complejos
- ✅ Cloudflare Workers: 100,000 requests/día gratis

**Desventajas:**
- ⚠️ Requiere configuración serverless
- ⚠️ Más complejo de mantener

#### Estructura:

```javascript
// cloudflare-worker/pdf-generator.js
import puppeteer from '@cloudflare/puppeteer';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pageUrl = url.searchParams.get('url');
    
    if (!pageUrl) {
      return new Response('Missing URL parameter', { status: 400 });
    }

    // Lanzar navegador
    const browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();
    
    // Cargar página
    await page.goto(pageUrl, { waitUntil: 'networkidle0' });
    
    // Generar PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });
    
    await browser.close();
    
    // Retornar PDF
    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="documento.pdf"'
      }
    });
  }
}
```

**En tu página Quartz:**

```html
<a href="https://tu-worker.workers.dev?url=https://solevoltaje.org/es/pagina" 
   class="pdf-download-btn">
  📥 Descargar PDF
</a>
```

---

### **Opción 3: Pre-generación con GitHub Actions (Híbrido)**

#### Concepto
- GitHub Action genera PDFs solo para páginas clave
- Se ejecuta en cada deploy
- Almacena solo PDFs importantes (~10-20)

**Ventajas:**
- ✅ Calidad excelente
- ✅ Sin servidor
- ✅ PDFs listos instantáneamente

**Desventajas:**
- ⚠️ Solo para páginas específicas
- ⚠️ Build time más largo

#### Implementación:

```yaml
# .github/workflows/generate-pdfs.yml
name: Generate Key PDFs

on:
  push:
    branches: [main]
    paths:
      - 'content/es/desconectado/**'
      - 'content/en/offline/**'

jobs:
  generate-pdfs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          npm install -g puppeteer
          npm install
      
      - name: Build Quartz site
        run: npx quartz build
      
      - name: Generate PDFs
        run: |
          node scripts/generate-key-pdfs.js
      
      - name: Upload PDFs
        uses: actions/upload-artifact@v3
        with:
          name: generated-pdfs
          path: public/downloads/*.pdf
```

```javascript
// scripts/generate-key-pdfs.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const KEY_PAGES = [
  { url: 'http://localhost:8080/es/desconectado/', output: 'guia-desconectado.pdf' },
  { url: 'http://localhost:8080/es/nuevo-aqui/', output: 'introduccion-sole.pdf' },
  // ... solo páginas clave
];

async function generatePDFs() {
  const browser = await puppeteer.launch();
  
  for (const page of KEY_PAGES) {
    const webPage = await browser.newPage();
    await webPage.goto(page.url, { waitUntil: 'networkidle0' });
    
    await webPage.pdf({
      path: `public/downloads/${page.output}`,
      format: 'A4',
      printBackground: true
    });
    
    console.log(`✓ Generated: ${page.output}`);
  }
  
  await browser.close();
}

generatePDFs();
```

---

## 📊 Comparación de Opciones

| Criterio | Client-Side (jsPDF) | Serverless (Cloudflare) | GitHub Actions |
|----------|---------------------|-------------------------|----------------|
| **Calidad** | 6/10 | 10/10 | 10/10 |
| **Costo** | Gratis | Gratis (100k/día) | Gratis |
| **Complejidad** | Baja | Media | Media |
| **Velocidad** | Rápida | Rápida | Instantánea |
| **Mantenimiento** | Bajo | Medio | Bajo |
| **PDFs siempre actualizados** | ✅ | ✅ | Solo en deploy |
| **Funciona offline** | ✅ | ❌ | ✅ |
| **Tamaño del repo** | Mínimo | Mínimo | Pequeño |

---

## 🎯 Recomendación Final

### Para SOLE Voltaje:

**Estrategia Híbrida:**

1. **Opción 1 (Client-Side)** para páginas generales
   - Fácil de implementar
   - Sin costos
   - Perfecto para Quartz estático

2. **Opción 3 (Pre-generación)** solo para documentos oficiales clave:
   - Guía del Desconectado
   - Manual de SOLE Voltaje
   - Documentos de introducción
   - ~5-10 PDFs máximo (~50 MB total)

### Implementación Inmediata

```bash
# Paso 1: Analizar qué PDFs son duplicados
py scripts\13-analyze-pdf-duplicates.py

# Paso 2: Revisar reporte
# Verás cuáles PDFs corresponden a páginas markdown

# Paso 3: Eliminar duplicados identificados
# Conservar solo PDFs únicos (documentos externos, scans, etc.)

# Paso 4: Agregar botón de descarga en Quartz
# Implementar Opción 1 (jsPDF)
```

---

## 📝 Paso a Paso: Limpiar PDFs

### 1. Analizar duplicados

```cmd
py scripts\13-analyze-pdf-duplicates.py
```

Esto generará `reports/pdf-analysis.json` con:
- PDFs que coinciden con páginas markdown (eliminar)
- PDFs únicos (conservar)
- Casos inciertos (revisar manualmente)

### 2. Revisar reporte

```cmd
code reports\pdf-analysis.json
```

### 3. Eliminar duplicados confirmados

```python
# scripts/14-remove-duplicate-pdfs.py
import json
from pathlib import Path
import shutil

# Cargar análisis
with open('reports/pdf-analysis.json') as f:
    data = json.load(f)

# Mover duplicados a carpeta temporal
duplicates_dir = Path('temp/pdf-duplicates')
duplicates_dir.mkdir(parents=True, exist_ok=True)

for pdf in data['results']['likely_duplicates']:
    src = Path('public/downloads') / pdf['filename']
    dst = duplicates_dir / pdf['filename']
    if src.exists():
        shutil.move(src, dst)
        print(f"Movido: {pdf['filename']}")

print(f"\n✅ {len(data['results']['likely_duplicates'])} PDFs movidos a temp/")
print("💡 Revisa temp/pdf-duplicates/ antes de eliminar permanentemente")
```

### 4. Conservar solo PDFs únicos

Criterios para **conservar**:
- ✅ Documentos oficiales externos (no creados en Notion)
- ✅ Scans de documentos físicos
- ✅ PDFs con formularios interactivos
- ✅ Certificados, diplomas, etc.
- ✅ Documentos de socios externos

Criterios para **eliminar**:
- ❌ Exports de páginas de Notion que ya existen en markdown
- ❌ Documentos que se pueden regenerar desde el sitio web
- ❌ PDFs duplicados (misma página en diferentes formatos)

---

## 🔮 Futuro: Sistema Avanzado

### Fase 1 (Inmediato): Limpiar duplicados
- Reducir de 7.5 GB a ~500 MB

### Fase 2 (Corto plazo): Botón PDF client-side
- Implementar jsPDF en Quartz
- Usuarios pueden descargar cualquier página

### Fase 3 (Mediano plazo): Serverless para calidad
- Cloudflare Worker con Puppeteer
- Solo para documentos que requieren alta calidad

### Fase 4 (Largo plazo): Sistema de plantillas
- Templates específicos para tipos de documento
- Headers/footers personalizados
- Índices automáticos
- Watermarks con licencia CC

---

## 💾 Espacio Esperado Después de Limpieza

| Categoría | Actual | Después | Ahorro |
|-----------|--------|---------|--------|
| **PDFs duplicados** | ~6.5 GB | 0 GB | -6.5 GB |
| **PDFs únicos** | ~1.0 GB | 1.0 GB | - |
| **PDFs optimizados únicos** | - | ~500 MB | -500 MB |
| **Total** | 7.5 GB | 500 MB | **-7 GB** |

---

## 🚀 Próximos Pasos

1. **Ejecutar análisis:** `py scripts\13-analyze-pdf-duplicates.py`
2. **Revisar:** `reports/pdf-analysis.json`
3. **Decidir:** ¿Qué PDFs conservar?
4. **Implementar:** Botón de descarga con jsPDF
5. **Documentar:** Qué PDFs se conservan y por qué

---

## 📚 Referencias

- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [html2canvas](https://html2canvas.hertzen.com/)
- [Cloudflare Workers + Puppeteer](https://developers.cloudflare.com/browser-rendering/)
- [GitHub Actions PDF Generation](https://github.com/marketplace/actions/markdown-to-pdf)

**¡Con esta estrategia reducirás el repositorio en ~7 GB y tendrás PDFs siempre actualizados!** 🎉

