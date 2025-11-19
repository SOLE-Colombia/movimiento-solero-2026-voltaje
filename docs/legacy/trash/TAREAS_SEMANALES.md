# 🗓️ Tareas de la Semana — Proyecto SOLE Voltaje

> Lista de seguimiento semanal para organización del repositorio y contenido

---

## 📁 Organización General del Repositorio

### ✅ Crear el repositorio Git del proyecto SOLE

- **Responsable**: David
- **Estado**: ⏳ Pendiente / ✅ Completado
- **Tareas**:
  - [ ] Crear el repo `SOLE-Colombia/dev_voltaje` (o verificar acceso)
  - [ ] Configurar permisos de edición para Sanjay, Belén y Catalina
  - [ ] Asegurar que el repositorio incluya `README.md` y `LICENSE`
  - [ ] Ejecutar script: `scripts\push-to-sole-colombia.bat`
  - [ ] Verificar que las 3 ramas existen: main, development, content-editing

**Comandos**:
```cmd
cd "c:\Users\David Vega\Downloads\Sole"
scripts\push-to-sole-colombia.bat
```

**Verificación**:
- URL del repo: https://github.com/SOLE-Colombia/dev_voltaje
- Colaboradores agregados en: Settings → Collaborators

---

### ✅ Definir la estructura base de carpetas y subcarpetas

- **Responsable**: David
- **Estado**: ⏳ Pendiente / ✅ Completado
- **Estructura implementada**:

```
content/
├── es/
│   ├── soluciona/         # Soluciones técnicas
│   ├── inspirate/         # Historias inspiradoras
│   ├── nuevo-aqui/        # Bienvenida
│   ├── pregunta-comenta/  # Q&A
│   ├── desconectado/      # Contenido offline
│   └── conceptorio/       # Glosario
├── en/
│   ├── solve/
│   ├── inspire/
│   ├── new-here/
│   ├── question-comment/
│   └── glossary/
└── assets/
    └── images/
        ├── soluciones/    # Imágenes de soluciones
        ├── inspiracion/   # Imágenes de historias
        ├── general/       # Imágenes generales
        └── recursos/      # Íconos, canvas, etc.
```

**Tareas**:
- [ ] Verificar que todas las carpetas existen
- [ ] Crear subcarpetas faltantes si es necesario
- [ ] Documentar la estructura en README.md

**Comandos**:
```cmd
# Verificar estructura
tree content /F

# Crear carpetas faltantes
mkdir content\assets\images\soluciones
mkdir content\assets\images\inspiracion
mkdir content\assets\images\general
mkdir content\assets\images\recursos
```

**Reglas**:
- ✅ Usar nombres cortos y consistentes
- ✅ Mantener rutas relativas para referencias internas
- ✅ Separar contenido por idioma (es/en)

---

## 🖼️ Gestión de Imágenes y Nombres

### ✅ Renombrar imágenes de las soluciones

- **Responsables**: Catalina (principal), Belén (apoyo), David (revisión)
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Formato de nombres**:
```
[PalabraClave]_[TipoContenido]_[Descripción].[extensión]

Ejemplos correctos:
✅ Antena3G_Instalar_Paso1.webp
✅ Antena3G_Comprar_Opciones.webp
✅ RouterWiFi_Configurar_Panel.webp
✅ PanelSolar_Instalar_Orientacion.webp
✅ SOLE_Lab_Colombia.webp

Ejemplos INCORRECTOS:
❌ imagen1.jpg
❌ foto final 2.png
❌ IMG_12345.jpg
❌ Screenshot 2024.jpg
```

**Tareas Catalina**:
- [ ] Hacer inventario de imágenes actuales
- [ ] Renombrar según convención
- [ ] Verificar que no haya duplicados
- [ ] Coordinar con Belén para revisión

**Tareas Belén**:
- [ ] Revisar nombres propuestos por Catalina
- [ ] Sugerir mejoras descriptivas
- [ ] Verificar coherencia con contenido

**Tareas David**:
- [ ] Revisar que se siga la convención
- [ ] Ejecutar script de validación
- [ ] Aprobar cambios finales

**Comandos**:
```cmd
# Cambiar a rama de contenido
scripts\switch-branch.bat
# Seleccionar: 1 (content-editing)

# Ver imágenes actuales
dir content\assets\images /S

# Renombrar (ejemplo)
ren "imagen vieja.jpg" "Antena3G_Instalar_Paso1.webp"

# Guardar cambios
git add content\assets\images\
git commit -m "🖼️ Renombrar imágenes según convención"
git push
```

---

### ✅ Organizar imágenes en carpetas correctas

- **Responsable**: David (con ayuda de Catalina)
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Distribución por carpeta**:

```
content/assets/images/
├── soluciones/         ← Imágenes de tutoriales técnicos
├── inspiracion/        ← Fotos de historias y casos
├── general/            ← Logos, banners, elementos UI
└── recursos/           ← Íconos, canvas, diagramas
```

**Tareas**:
- [ ] Mover imágenes a carpetas correspondientes
- [ ] Crear subcarpetas por tema si es necesario (ej: `soluciones/antenas/`)
- [ ] Eliminar imágenes duplicadas o no utilizadas
- [ ] Actualizar referencias en archivos .md

**Comandos**:
```cmd
# Mover imagen a carpeta correcta
move "content\assets\images\foto.webp" "content\assets\images\soluciones\"

# Verificar que no hay duplicados
dir content\assets\images\soluciones\*3G*.webp

# Optimizar imágenes (si es necesario)
py scripts\07-optimize-images.py
```

**Criterios de clasificación**:
- **soluciones/**: Pasos técnicos, instalaciones, configuraciones
- **inspiracion/**: Personas, comunidades, SOLE Labs
- **general/**: Logos, identidad visual, elementos reutilizables
- **recursos/**: Íconos, diagramas, canvas de metodología

---

## 🧩 Contenido y Vínculos Markdown

### ✅ Vincular correctamente los archivos .md con las imágenes

- **Responsable**: David
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Regla de rutas relativas**:

Desde `content/es/soluciona/antena-3g.md`:
```markdown
✅ CORRECTO:
![Antena 3G](../../assets/images/soluciones/Antena3G_Instalar.webp)

❌ INCORRECTO:
![Antena](C:\Users\David\images\foto.jpg)    # Ruta absoluta
![Antena](/images/foto.jpg)                  # Desde raíz
![Antena](foto.jpg)                          # Sin ruta
```

**Tareas**:
- [ ] Revisar todos los archivos .md en `content/es/`
- [ ] Verificar que las rutas de imágenes sean relativas
- [ ] Comprobar que las imágenes referenciadas existen
- [ ] Actualizar rutas después de mover imágenes
- [ ] Hacer lo mismo para `content/en/`

**Comandos**:
```cmd
# Ejecutar script de validación
py scripts\10-validate.py

# Revisar errores
type reports\validation-errors.txt

# Buscar referencias de imágenes
findstr /S /I "![" content\es\*.md
```

**Herramienta**:
- Script: `scripts\10-validate.py`
- Reporte: `reports\validation-errors.txt`

---

### ✅ Verificar los nodos y vínculos internos del sistema Markdown

- **Responsable**: David
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Tipos de vínculos a verificar**:

1. **Enlaces entre soluciones**:
   ```markdown
   [Ver solución relacionada](./otra-solucion.md)
   ```

2. **Enlaces al glosario**:
   ```markdown
   [¿Qué es una antena?](../conceptorio/antena.md)
   ```

3. **Enlaces a recursos**:
   ```markdown
   [Descargar manual](../../downloads/manual.pdf)
   ```

**Tareas**:
- [ ] Verificar que todos los enlaces internos funcionen
- [ ] Actualizar enlaces rotos
- [ ] Crear enlaces faltantes entre contenido relacionado
- [ ] Mantener consistencia en el estilo de enlaces

**Comandos**:
```cmd
# Buscar todos los enlaces en markdown
findstr /S /I "\[.*\](.*\.md)" content\es\*.md

# Verificar con script
py scripts\10-validate.py
```

**Mantener consistencia visual**:
- 🔗 Enlaces internos: `[Texto](./archivo.md)`
- 🌐 Enlaces externos: `[Texto](https://url.com)`
- 📥 Descargas: `[Descargar](../../downloads/archivo.pdf)`

---

## ⚙️ Licencias y Consistencia

### ✅ Revisar el licenciamiento y frases de cierre

- **Responsable**: Sanjay
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Plantilla de cierre**:

Agregar al final de cada archivo `.md`:

```markdown
---

**Proyecto SOLE Voltaje** — Parte de la iniciativa [SOLE Colombia](https://www.solecolombia.org/)

Apoyado por [Internet Society Foundation](https://www.isocfoundation.org/)

📄 Licencia: [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
```

**Tareas**:
- [ ] Revisar que todos los archivos tengan la frase de cierre
- [ ] Verificar que el archivo `LICENSE` esté actualizado
- [ ] Agregar nota de licencia al README.md
- [ ] Verificar coherencia en todas las páginas

**Comandos**:
```cmd
# Buscar archivos sin frase de cierre
findstr /S /L /V "SOLE Voltaje" content\es\*.md

# Editar LICENSE
notepad LICENSE
```

**Archivo LICENSE** debe contener:
```
Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

[Texto completo de la licencia]
```

---

### ✅ Revisar idioma y coherencia de texto

- **Responsable**: Belén
- **Estado**: ⏳ Pendiente / 🔄 En Proceso / ✅ Completado

**Aspectos a revisar**:

1. **Idioma correcto**:
   - `content/es/` → Todo en español
   - `content/en/` → Todo en inglés
   - Sin mezcla de idiomas

2. **Coherencia de estilo**:
   - Tono consistente (tutorial, informativo, cercano)
   - Terminología unificada
   - Formato de títulos y subtítulos

3. **Corrección**:
   - Ortografía y gramática
   - Puntuación consistente
   - Tildes y acentos correctos

**Tareas**:
- [ ] Revisar todos los archivos en `content/es/`
- [ ] Buscar bloques en inglés que deban traducirse
- [ ] Unificar terminología técnica
- [ ] Crear glosario de términos preferidos
- [ ] Verificar coherencia de tono

**Comandos**:
```cmd
# Buscar palabras comunes en inglés
findstr /S /I "the and or" content\es\*.md

# Buscar para reemplazar
# (usar VS Code o editor con búsqueda y reemplazo)
```

**Glosario de términos preferidos**:
- ✅ "Internet" (no "internet")
- ✅ "WiFi" (no "Wi-Fi" ni "wifi")
- ✅ "Antena 3G" (no "antena móvil")
- ✅ "Panel solar" (no "placa solar")
- ✅ "Router" (no "ruteador" ni "enrutador")

---

## ✅ Orden Sugerido de Ejecución

### Semana 1: Configuración Base

1. **Configurar el repositorio Git** (David)
   - Ejecutar `scripts\push-to-sole-colombia.bat`
   - Agregar colaboradores
   - Configurar protección de ramas

2. **Crear estructura de carpetas** (David)
   - Verificar carpetas existentes
   - Crear subcarpetas de imágenes
   - Documentar en README

### Semana 2: Organización de Imágenes

3. **Renombrar y organizar imágenes** (Catalina + Belén)
   - Inventario de imágenes
   - Renombrar según convención
   - Mover a carpetas correctas
   - Commit y push de cambios

### Semana 3: Vínculos y Contenido

4. **Vincular y probar archivos Markdown** (David)
   - Actualizar referencias de imágenes
   - Verificar enlaces internos
   - Ejecutar script de validación
   - Corregir errores encontrados

### Semana 4: Revisión Final

5. **Revisar licencias e idioma** (Sanjay + Belén)
   - Agregar frases de cierre
   - Revisar idioma y coherencia
   - Última validación
   - Preparar para publicación

---

## 📊 Progreso General

### Estado del Proyecto

- [ ] ⚙️ Repositorio configurado
- [ ] 📁 Estructura de carpetas definida
- [ ] 🖼️ Imágenes renombradas (___/731)
- [ ] 📂 Imágenes organizadas en carpetas
- [ ] 🔗 Vínculos Markdown verificados (___/584 archivos)
- [ ] ⚙️ Licencias agregadas
- [ ] ✍️ Idioma y coherencia revisados

### Métricas

- **Total de archivos .md**: 584
- **Total de imágenes**: 731
- **Carpetas principales**: 12
- **Idiomas**: 2 (ES, EN)

---

## 🗓️ Reunión Semanal

### Agenda Sugerida

1. **Revisión de progreso** (10 min)
   - Cada persona reporta avance
   - Actualizar checklist

2. **Problemas encontrados** (15 min)
   - Discutir blockers
   - Pedir ayuda técnica

3. **Coordinación** (10 min)
   - Definir prioridades de la semana
   - Asignar tareas específicas

4. **Próximos pasos** (5 min)
   - Confirmar tareas para cada persona
   - Fecha de siguiente reunión

---

## 📋 Plantillas de Commit

Para mantener historial limpio:

```bash
# Catalina - Imágenes
git commit -m "🖼️ Renombrar imágenes de antenas 3G"
git commit -m "🖼️ Organizar imágenes en carpeta soluciones"
git commit -m "🖼️ Optimizar imágenes de soluciones"

# Belén - Contenido
git commit -m "📝 Editar: instalar-antena-3g.md"
git commit -m "✏️ Corregir ortografía en página de inicio"
git commit -m "🌍 Revisar idioma en soluciones"

# David - Técnico
git commit -m "🔗 Actualizar vínculos de imágenes"
git commit -m "✅ Validar enlaces internos"
git commit -m "📁 Reorganizar estructura de carpetas"

# Sanjay - Licencias
git commit -m "📄 Agregar licencias a archivos .md"
git commit -m "⚖️ Actualizar archivo LICENSE"
git commit -m "📝 Unificar frases de cierre"
```

---

## 🆘 Contacto del Equipo

| Persona | Rol | Áreas | Contacto |
|---------|-----|-------|----------|
| **David** | Coordinador Técnico | Git, Vínculos, Estructura | - |
| **Catalina** | Gestión de Imágenes | Renombrar, Organizar | - |
| **Belén** | Edición de Contenido | Texto, Idioma, Formato | - |
| **Sanjay** | Licencias y Consistencia | Revisión General | - |

---

## 📚 Recursos de Apoyo

- **[GUIA_EQUIPO_CONTENIDO.md](GUIA_EQUIPO_CONTENIDO.md)** - Guía completa del equipo
- **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Referencia de Git
- **[INSTRUCCIONES_SOLE_COLOMBIA.md](INSTRUCCIONES_SOLE_COLOMBIA.md)** - Setup del repo
- **[EMPIEZA_AQUI_AHORA.md](EMPIEZA_AQUI_AHORA.md)** - Inicio rápido

---

**¡Vamos equipo! Juntos hacemos SOLE Voltaje realidad** ⚡

*Última actualización: 2024-10-20*


