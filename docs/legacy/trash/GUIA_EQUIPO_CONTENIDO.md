# 📝 Guía para el Equipo de Contenido - SOLE Voltaje

## 👥 Roles y Responsabilidades

### 👨‍💼 David - Coordinador Técnico
- ✅ Configuración del repositorio Git
- ✅ Estructura de carpetas
- ✅ Vínculos Markdown
- ✅ Verificación técnica

### 🖼️ Catalina - Gestión de Imágenes
- ✅ Renombrar imágenes
- ✅ Organizar en carpetas
- ✅ Optimización (con scripts)

### ✍️ Belén - Edición de Contenido
- ✅ Renombrar imágenes (apoyo)
- ✅ Revisión de idioma
- ✅ Coherencia de texto
- ✅ Formato de Markdown

### 📋 Sanjay - Licencias y Consistencia
- ✅ Licenciamiento
- ✅ Frases de cierre
- ✅ Revisión general

---

## 📁 Estructura de Carpetas del Proyecto

### Carpetas Principales

```
content/
├── es/                          # Contenido en español
│   ├── soluciona/              # Soluciones técnicas
│   ├── inspirate/              # Historias inspiradoras
│   ├── nuevo-aqui/             # Bienvenida
│   ├── pregunta-comenta/       # Q&A
│   ├── desconectado/           # Contenido offline
│   └── conceptorio/            # Glosario
│
├── en/                          # Contenido en inglés
│   ├── solve/                  # Soluciones (traducción)
│   ├── inspire/                # Historias (traducción)
│   ├── new-here/               # Bienvenida
│   ├── question-comment/       # Q&A
│   └── glossary/               # Glosario
│
└── assets/
    └── images/                 # TODAS las imágenes
        ├── soluciones/         # Imágenes de soluciones
        ├── inspiracion/        # Imágenes de historias
        ├── general/            # Imágenes generales
        └── recursos/           # Íconos, canvas, etc.
```

### 🎯 Dónde Trabajar Según tu Rol

#### 👨‍💼 David
```
content/es/              ← Revisar vínculos
content/en/              ← Revisar traducciones
.gitignore               ← Configuración
README.md                ← Documentación
```

#### 🖼️ Catalina + ✍️ Belén
```
content/assets/images/   ← Renombrar y organizar imágenes
content/es/soluciona/    ← Actualizar referencias de imágenes
content/es/inspirate/    ← Actualizar referencias de imágenes
```

#### 📋 Sanjay
```
content/es/*/            ← Revisar licencias y cierre
content/en/*/            ← Revisar coherencia
LICENSE                  ← Licencia general
```

---

## 📝 Trabajar con Archivos Markdown

### Estructura de un Archivo .md

Cada archivo markdown debe tener esta estructura:

```markdown
---
title: "Título de la Solución"
lang: "es"
slug: "nombre-url-amigable"
categories: ["Conectividad", "Antenas"]
aspectos: ["señal", "dispositivos"]
formato: "Texto"
fecha: "2024-10-20"
draft: false
traduccion: true
---

# Título de la Solución

## Descripción breve

Texto introductorio de la solución...

## Paso 1: [Acción]

![Descripción de la imagen](../../assets/images/soluciones/NombreImagen.webp)

Texto explicativo del paso...

## Paso 2: [Acción]

...

## Recursos Adicionales

- [Enlace relacionado](../otra-solucion.md)
- Material descargable

---

**Proyecto SOLE Voltaje** — Parte de la iniciativa [SOLE Colombia](https://www.solecolombia.org/)

Licencia: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
```

### ✅ Checklist para Crear/Editar un .md

- [ ] Frontmatter completo (título, categorías, aspectos)
- [ ] Slug SEO-friendly (sin-espacios-con-guiones)
- [ ] Imágenes con rutas relativas correctas
- [ ] Enlaces internos funcionando
- [ ] Texto en español (o inglés según carpeta)
- [ ] Frase de cierre incluida
- [ ] Referencias a licencia

---

## 🖼️ Convención de Nombres para Imágenes

### Formato Estándar

```
[PalabraClave]_[TipoContenido]_[Descripción].[extensión]

Ejemplos:
✅ Antena3G_Instalar_PasoUno.webp
✅ Antena3G_Comprar_Opciones.webp
✅ RouterWiFi_Configurar_PanelAdmin.webp
✅ PanelSolar_Instalar_Orientacion.webp
```

### Reglas de Nomenclatura

1. **PalabraClave**: Tema principal (SinEspacios)
2. **TipoContenido**: Solución, Inspiración, Recurso
3. **Descripción**: Breve y específica (PascalCase)
4. **Extensión**: `.webp` (preferido) o `.jpg`, `.png`

### 📂 Organización por Carpeta

```
content/assets/images/
├── soluciones/
│   ├── Antena3G_Instalar_PasoUno.webp
│   ├── Antena3G_Instalar_PasoDos.webp
│   ├── RouterWiFi_Configurar_Inicio.webp
│   └── ...
│
├── inspiracion/
│   ├── Comunidad_Historia_Escuela.webp
│   ├── SOLE_Lab_Colombia.webp
│   └── ...
│
├── general/
│   ├── LogoSOLE.webp
│   ├── BannerVoltaje.webp
│   └── ...
│
└── recursos/
    ├── Icono_Antena.png
    ├── Canvas_Metodologia.webp
    └── ...
```

### ❌ Evitar

```
❌ imagen1.jpg
❌ foto final final 2.png
❌ Screenshot 2024-10-20.jpg
❌ IMG_12345.jpg
❌ sin título.webp
```

---

## 🔗 Vínculos en Markdown

### Imágenes - Rutas Relativas

Desde un archivo en `content/es/soluciona/antena-3g.md`:

```markdown
# Correcto ✅
![Antena 3G](../../assets/images/soluciones/Antena3G_Instalar.webp)

# Incorrecto ❌
![Antena](C:\Users\...\imagen.jpg)  # Ruta absoluta
![Antena](/images/imagen.jpg)       # Ruta desde raíz
```

### Enlaces Internos entre Páginas

```markdown
# Dentro de la misma carpeta
[Ver otra solución](./router-wifi.md)

# A otra carpeta en español
[Ver glosario](../conceptorio/antena.md)

# De español a inglés (evitar, usar traducción en frontmatter)
```

### Enlaces Externos

```markdown
[Sitio web de SOLE](https://www.solecolombia.org/)
[Descarga el PDF](../../downloads/manual-antena.pdf)
```

---

## 📋 Frontmatter Explicado

### Campos Obligatorios

```yaml
---
title: "Instalar una Antena 3G"        # Título visible
lang: "es"                              # Idioma: "es" o "en"
slug: "instalar-antena-3g"              # URL amigable
categories: ["Conectividad"]            # Categorías principales
aspectos: ["señal", "dispositivos"]     # Aspectos del sistema
formato: "Texto"                        # Texto, Video, Foto
fecha: "2024-10-20"                     # Fecha de creación
draft: false                            # true = oculto, false = visible
traduccion: true                        # ¿Existe versión en otro idioma?
---
```

### Aspectos Disponibles

Usa **2-3 aspectos** por contenido:

- `señal` - Conectividad, antenas, WiFi, 3G/4G
- `electricidad` - Energía, paneles solares, baterías
- `dispositivos` - Computadores, tablets, routers
- `personas` - Comunidad, metodología, capacitación
- `espacio` - Lugares físicos, SOLE Labs, escuelas

### Formatos Disponibles

- `Texto` - Artículos, tutoriales
- `Video` - Contenido con video embebido
- `Foto` - Principalmente imágenes

---

## ✏️ Flujo de Trabajo - Editar Contenido

### Para Belén (Edición de Texto)

#### 1. Cambiar a la Rama Correcta

```cmd
scripts\switch-branch.bat
# Seleccionar: 1 (content-editing)
```

#### 2. Ubicar el Archivo

```cmd
cd content\es\soluciona
# O la carpeta que necesites editar
```

#### 3. Editar el Archivo

- Abre con VS Code, Notepad++, o cualquier editor
- Respeta el frontmatter (entre `---`)
- Edita el contenido markdown
- Verifica que las imágenes apunten correctamente

#### 4. Guardar Cambios

```cmd
git add .
git commit -m "📝 Editar: [nombre del archivo]"
git push
```

#### 5. Crear Pull Request

En GitHub: https://github.com/SOLE-Colombia/dev_voltaje/pulls

---

### Para Catalina (Gestión de Imágenes)

#### 1. Cambiar a la Rama Correcta

```cmd
scripts\switch-branch.bat
# Seleccionar: 1 (content-editing)
```

#### 2. Renombrar Imágenes

Antes:
```
IMG_1234.jpg
foto final.png
```

Después:
```
Antena3G_Instalar_Paso1.webp
RouterWiFi_Configurar_Panel.webp
```

#### 3. Mover a Carpeta Correcta

```cmd
# Crear carpeta si no existe
mkdir content\assets\images\soluciones

# Mover imagen
move imagen.webp content\assets\images\soluciones\
```

#### 4. Optimizar (Opcional - Usar Script)

```cmd
py scripts\07-optimize-images.py
```

#### 5. Guardar Cambios

```cmd
git add content\assets\images\
git commit -m "🖼️ Organizar imágenes de soluciones"
git push
```

---

### Para David (Verificación de Vínculos)

#### 1. Script de Validación

```cmd
py scripts\10-validate.py
```

Revisa: `reports\validation-errors.txt`

#### 2. Verificar Manualmente

Abre los archivos y busca:
```markdown
![](../../assets/images/...)  # ¿Existe la imagen?
[Ver](../otra-pagina.md)      # ¿Existe el enlace?
```

#### 3. Corregir Rutas

Si una imagen está en lugar incorrecto:
```markdown
# Antes
![](../images/foto.jpg)

# Después
![](../../assets/images/soluciones/Antena3G_Instalar.webp)
```

---

### Para Sanjay (Licencias y Consistencia)

#### 1. Plantilla de Cierre

Copia esto al final de cada archivo `.md`:

```markdown
---

**Proyecto SOLE Voltaje** — Parte de la iniciativa [SOLE Colombia](https://www.solecolombia.org/)

Apoyado por [Internet Society Foundation](https://www.isocfoundation.org/)

📄 Licencia: [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
```

#### 2. Verificar LICENSE

El archivo `LICENSE` en la raíz debe contener:
```
Creative Commons Attribution-ShareAlike 4.0 International
```

#### 3. Buscar y Reemplazar

En VS Code o editor:
- Buscar: Texto en inglés que no debería estar
- Buscar: Frases inconsistentes
- Reemplazar con versión unificada

---

## 🎯 Comandos Git Esenciales

### Ver Qué Cambió

```cmd
git status
```

### Guardar Todo

```cmd
git add .
git commit -m "📝 Descripción del cambio"
git push
```

### Actualizar tu Rama Local

```cmd
git pull
```

### Cambiar de Rama

```cmd
scripts\switch-branch.bat
```

### Ver Historial

```cmd
git log --oneline
```

---

## 📋 Plantillas Listas

### Plantilla: Solución Técnica

```markdown
---
title: "[Nombre de la Solución]"
lang: "es"
slug: "nombre-url-amigable"
categories: ["Conectividad"]
aspectos: ["señal", "dispositivos"]
formato: "Texto"
fecha: "2024-10-20"
draft: false
traduccion: false
---

# [Nombre de la Solución]

## ¿Qué problema resuelve?

Breve descripción del problema que esta solución aborda.

## Materiales necesarios

- Material 1
- Material 2
- Material 3

## Paso 1: [Acción]

![Descripción](../../assets/images/soluciones/NombreImagen.webp)

Explicación del paso...

## Paso 2: [Acción]

...

## Solución de problemas

**Problema común**: Solución

## Recursos relacionados

- [Otra solución](../otra-solucion.md)
- [Glosario](../conceptorio/termino.md)

---

**Proyecto SOLE Voltaje** — Parte de la iniciativa [SOLE Colombia](https://www.solecolombia.org/)

📄 Licencia: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
```

### Plantilla: Historia Inspiradora

```markdown
---
title: "[Título de la Historia]"
lang: "es"
slug: "titulo-url"
categories: ["Historias", "Comunidad"]
aspectos: ["personas", "espacio"]
formato: "Foto"
fecha: "2024-10-20"
draft: false
traduccion: false
---

# [Título de la Historia]

![Imagen principal](../../assets/images/inspiracion/Historia_Principal.webp)

## Contexto

Dónde y cuándo sucedió...

## La Historia

Narrativa completa...

## Impacto

Qué cambió, qué se logró...

## Galería

![](../../assets/images/inspiracion/Historia_Foto1.webp)
![](../../assets/images/inspiracion/Historia_Foto2.webp)

---

**Proyecto SOLE Voltaje** — Parte de la iniciativa [SOLE Colombia](https://www.solecolombia.org/)

📄 Licencia: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
```

---

## ✅ Checklist Semanal del Equipo

### David - Coordinador
- [ ] Verificar que el repo está actualizado
- [ ] Revisar PRs pendientes
- [ ] Ejecutar script de validación
- [ ] Corregir vínculos rotos
- [ ] Actualizar documentación si es necesario

### Catalina - Imágenes
- [ ] Renombrar imágenes nuevas
- [ ] Mover a carpetas correctas
- [ ] Verificar duplicados
- [ ] Optimizar con script
- [ ] Commit y push de cambios

### Belén - Contenido
- [ ] Revisar ortografía y gramática
- [ ] Unificar estilo de redacción
- [ ] Actualizar referencias de imágenes
- [ ] Verificar que no haya inglés
- [ ] Commit y push de cambios

### Sanjay - Licencias
- [ ] Verificar frases de cierre
- [ ] Revisar licencias en archivos nuevos
- [ ] Mantener LICENSE actualizado
- [ ] Verificar coherencia general

---

## 🆘 Preguntas Frecuentes

### ¿Cómo saber si mi imagen está bien nombrada?

✅ Sigue el formato: `PalabraClave_Tipo_Descripcion.webp`
✅ Sin espacios, sin caracteres especiales
✅ Descriptiva y única

### ¿Dónde guardo las imágenes?

Todas en: `content/assets/images/`
Subcarpetas: `soluciones/`, `inspiracion/`, `general/`, `recursos/`

### ¿Cómo sé si mi vínculo es correcto?

Usa rutas relativas:
- `../../assets/images/...` para imágenes
- `../otra-carpeta/archivo.md` para enlaces
- NO uses rutas absolutas (C:\...)

### ¿Qué hago si rompí algo en Git?

```cmd
# Deshacer cambios no guardados
git checkout -- .

# Pedir ayuda a David
```

### ¿Cómo veo mis cambios antes de subirlos?

```cmd
git status
git diff
```

---

## 📚 Recursos Adicionales

- **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Referencia completa de Git
- **[INSTRUCCIONES_SOLE_COLOMBIA.md](INSTRUCCIONES_SOLE_COLOMBIA.md)** - Setup del repo
- **[README.md](README.md)** - Documentación general del proyecto

---

**¡El equipo de contenido es el corazón de SOLE Voltaje!** ❤️


