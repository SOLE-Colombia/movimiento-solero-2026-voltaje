# SOLE Voltaje - Migración de Notion a Quartz

> Sitio web estático bilingüe (español/inglés) construido con Quartz v4

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [🚀 Git y Versionado](#-git-y-versionado)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Migración desde Notion](#migración-desde-notion)
- [Desarrollo Local](#desarrollo-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Deploy](#deploy)
- [Licencia](#licencia)

## 🎯 Sobre el Proyecto

**SOLE Voltaje** es una iniciativa de [SOLE Colombia](https://www.solecolombia.org/) dedicada a mejorar el acceso al conocimiento a través de soluciones comunitarias para usar Internet en grupo.

Este repositorio contiene el código y contenido del sitio web estático, migrado desde Notion a Quartz v4, optimizado para SEO, rendimiento y accesibilidad.

### Características

✅ **Bilingüe**: Contenido completamente separado en español e inglés  
✅ **SEO Optimizado**: Slugs limpios, frontmatter estructurado  
✅ **Imágenes Optimizadas**: Formato WebP responsive  
✅ **Filtrado por Aspectos**: Señal, Electricidad, Dispositivos, Personas, Espacio  
✅ **Static Site**: Deploy rápido en GitHub Pages  
✅ **Docker**: Entorno de desarrollo containerizado  

## 🚀 Git y Versionado

### ⚡ Inicio Inmediato (2 comandos)

**Repositorio**: `SOLE-Colombia/dev_voltaje`  
**SSH Key**: ✅ Ya configurada con voltaje@solecolombia.org

👉 **[INICIO_INMEDIATO.md](INICIO_INMEDIATO.md)** ⭐ **Súbelo en 5 minutos**

Ejecuta DOS comandos:

```cmd
scripts\config-git-sole.bat
scripts\push-to-sole-colombia.bat
```

📚 **Documentación**:
- [CONFIGURACION_SSH.md](CONFIGURACION_SSH.md) - Tu SSH key
- [INSTRUCCIONES_SOLE_COLOMBIA.md](INSTRUCCIONES_SOLE_COLOMBIA.md) - Guía completa

### 📚 Documentación Git Completa

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[EMPIEZA_AQUI_AHORA.md](EMPIEZA_AQUI_AHORA.md)** | ⚡ **SÚBELO YA** - 5 minutos | Todos |
| **[INSTRUCCIONES_SOLE_COLOMBIA.md](INSTRUCCIONES_SOLE_COLOMBIA.md)** | ⭐ Específico para SOLE-Colombia/dev_voltaje | Todos |
| **[INICIO_GIT.md](INICIO_GIT.md)** | Setup general | Todos |
| **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** | Guía completa de ramas y flujo de trabajo | Líderes de equipo |
| **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** | Estructura de carpetas y archivos | Desarrolladores |
| **[COMANDOS_GIT.md](COMANDOS_GIT.md)** | Referencia rápida de comandos | Todos |

### 🌳 Estructura de Ramas

Este proyecto usa **3 ramas** con propósitos específicos:

```
content-editing    →    development    →    main
   (Contenido)         (Desarrollo)       (Producción)
```

- **`content-editing`**: Redactores y editores de contenido trabajan aquí
- **`development`**: Desarrolladores trabajan en código y configuración
- **`main`**: Deploy automático a producción (protegida)

### 🎯 Qué se Sube a GitHub

✅ **SÍ subir** (~40 MB):
- `content/` - Contenido en ES/EN
- `public/` - PDFs y videos
- `quartz/` - Código (sin node_modules)
- `scripts/` - Scripts de automatización
- Documentación y configuración

❌ **NO subir** (ignorado automáticamente):
- `temp/` - Archivos temporales
- `reports/` - Reportes generados
- `node_modules/` - Se instala con npm
- Build outputs - Se generan automáticamente

## 🛠️ Requisitos

### Para Migración
- **Python 3.8+** (instalado como `py` en Windows)
- **pip** (gestor de paquetes de Python)

### Para Desarrollo
- **Node.js 18+** y **npm**
- **Git**

### Para Docker (Opcional)
- **Docker** y **Docker Compose**

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sole-voltaje.git
cd sole-voltaje
```

### 2. Instalar dependencias de Python

```bash
# Windows
py -m pip install -r requirements.txt

# Linux/Mac
python3 -m pip install -r requirements.txt
```

### 3. Instalar Quartz v4

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
cd ..
```

## 🔄 Migración desde Notion

Si tienes una exportación de Notion y necesitas migrar el contenido:

### Estructura de la Exportación

Coloca tu exportación de Notion en la carpeta `Privado y Compartido/`.

### Ejecutar Migración Completa

**Windows:**
```cmd
scripts\run-all-migrations.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/*.sh
./scripts/run-all-migrations.sh
```

### Fases de Migración

El script ejecuta automáticamente las siguientes fases:

#### **Fase 1: Análisis**
- `01-inventory.py`: Inventario completo de archivos
- `02-analyze-csv.py`: Extracción de metadata de CSVs
- `03-slug-mapper.py`: Generación de slugs SEO-friendly

#### **Fase 2: Transformación**
- `04-clean-markdown.py`: Limpieza de sintaxis de Notion
- `05-generate-frontmatter.py`: Generación de frontmatter YAML
- `06-split-languages.py`: Separación en `/es/` y `/en/`

#### **Fase 3: Optimización**
- `07-optimize-images.py`: Conversión a WebP responsive
- `08-optimize-videos.py`: Validación de embeds de video
- `09-manage-pdfs.py`: Gestión de archivos PDF

#### **Validación Final**
- `10-validate.py`: Verificación de enlaces e imágenes

### Copiar Contenido a Quartz

Después de la migración:

```bash
# Copiar contenido generado
cp -r content/* quartz/content/
cp -r public/* quartz/public/
```

## 💻 Desarrollo Local

### Opción 1: Node.js directo

**Windows:**
```cmd
scripts\dev.bat
```

**Linux/Mac:**
```bash
./scripts/dev.sh
```

El sitio estará disponible en `http://localhost:8080`

### Opción 2: Docker

**Windows:**
```cmd
scripts\docker-dev.bat
```

**Linux/Mac:**
```bash
./scripts/docker-dev.sh
```

### Build de Producción

**Windows:**
```cmd
scripts\build.bat
```

**Linux/Mac:**
```bash
./scripts/build.sh
```

Los archivos generados estarán en `quartz/public/`

## 📁 Estructura del Proyecto

```
sole-voltaje/
├── quartz/                      # Instalación de Quartz v4
│   ├── content/
│   │   ├── es/                  # Contenido en español
│   │   │   ├── index.md
│   │   │   ├── nuevo-aqui/
│   │   │   ├── inspirate/
│   │   │   ├── soluciona/
│   │   │   ├── pregunta-comenta/
│   │   │   ├── desconectado/
│   │   │   └── conceptorio/
│   │   ├── en/                  # Contenido en inglés
│   │   │   ├── index.md
│   │   │   ├── new-here/
│   │   │   ├── inspire/
│   │   │   ├── solve/
│   │   │   ├── question-comment/
│   │   │   ├── offline/
│   │   │   └── glossary/
│   │   └── assets/
│   │       └── images/          # Imágenes optimizadas WebP
│   └── public/
│       └── downloads/           # Archivos PDF
├── scripts/                     # Scripts de migración
│   ├── 01-inventory.py
│   ├── 02-analyze-csv.py
│   ├── ...
│   ├── 10-validate.py
│   ├── run-all-migrations.bat   # Windows
│   ├── run-all-migrations.sh    # Linux/Mac
│   ├── dev.bat / dev.sh         # Desarrollo
│   └── build.bat / build.sh     # Build producción
├── reports/                     # Reportes de migración (generados)
├── temp/                        # Archivos temporales (no comitear)
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD para GitHub Pages
├── .gitignore
├── README.md
└── requirements.txt             # Dependencias Python
```

## 🎨 Frontmatter

Cada página contiene metadata estructurada:

```yaml
---
title: "Título de la Página"
lang: "es"                       # o "en"
slug: "slug-seo-friendly"
categories: ["tag1", "tag2"]
aspectos: ["señal", "dispositivos"]  # 5 aspectos principales
formato: "Video"                 # Video, Texto, Foto
fecha: "2024-10-12"
draft: false
traduccion: true                 # Si tiene traducción disponible
---
```

### 5 Aspectos Principales

1. **señal**: Conectividad, antenas, WiFi, móvil
2. **electricidad**: Energía, paneles solares, baterías
3. **dispositivos**: Computadores, tablets, routers
4. **personas**: Comunidad, metodología, aprendizaje
5. **espacio**: Lugares físicos, SOLE Labs, escuelas

## 🚀 Deploy

### GitHub Pages (Automático)

El sitio se despliega automáticamente en GitHub Pages cuando haces push a `main`.

#### Configuración:

1. Ve a **Settings** > **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente

Tu sitio estará disponible en: `https://tu-usuario.github.io/sole-voltaje/`

### Deploy Manual

```bash
cd quartz
npx quartz build
# Los archivos en public/ pueden subirse a cualquier hosting estático
```

## 🐳 Docker

### Desarrollo

```bash
docker-compose up -d
```

Sitio disponible en `http://localhost:8080`

### Producción

```bash
docker build -t sole-voltaje:latest .
docker run -p 8080:80 sole-voltaje:latest
```

## 🧪 Validación

Para validar enlaces, imágenes y frontmatter:

**Windows:**
```cmd
py scripts\10-validate.py
```

**Linux/Mac:**
```bash
python3 scripts/10-validate.py
```

Revisa el reporte en `reports/validation-errors.txt`

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

[SOLE Voltaje](http://voltaje.solecolombia.org/) © 2024 por [Fundación SOLE Colombia](http://www.solecolombia.org/) está licenciado bajo [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)

## 🙏 Créditos

- **Proyecto**: [SOLE Colombia](https://www.solecolombia.org/)
- **Apoyo**: [Internet Society Foundation](https://www.isocfoundation.org/)
- **Tecnología**: [Quartz v4](https://quartz.jzhao.xyz/) por Jacky Zhao

---

## 📞 Contacto

- **Web**: [www.solecolombia.org](https://www.solecolombia.org/)
- **Email**: hola@solecolombia.org
- **Instagram**: [@sole_colombia](https://www.instagram.com/sole_colombia/)

---

**¿Tienes problemas para conectarte a Internet?**

SOLE Voltaje te invita a "cacharrear", a sentir curiosidad por el Internet y su funcionamiento y a extender su alcance para que usemos el Internet en grupo y así, ¡cambiar el mundo juntos!






