# 🚀 Inicio Rápido - SOLE Voltaje

## 📝 Resumen

Este proyecto te permite migrar tu contenido de Notion a un sitio web estático optimizado usando Quartz v4.

## ⚡ En 5 Pasos

### 1. Verificar Requisitos ✅

Asegúrate de tener instalado:
```cmd
py --version          # Python 3.8+
node --version        # Node.js 18+
git --version         # Git
```

### 2. Instalar Dependencias 📦

```cmd
REM Python
py -m pip install -r requirements.txt

REM Node.js - Clonar e instalar Quartz
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
cd ..
```

### 3. Migrar Contenido 🔄

```cmd
REM Asegúrate de tener tu exportación de Notion en:
REM   Privado y Compartido/

REM Ejecutar migración completa
scripts\run-all-migrations.bat
```

Este script:
- ✅ Analiza todos tus archivos
- ✅ Limpia sintaxis de Notion
- ✅ Genera slugs SEO-friendly
- ✅ Separa contenido en español e inglés
- ✅ Optimiza imágenes a WebP
- ✅ Valida todo el contenido

**Tiempo estimado**: 2-4 horas (dependiendo del tamaño)

### 4. Copiar a Quartz 📋

```cmd
REM Copiar contenido generado a Quartz
xcopy /E /I /Y content quartz\content
xcopy /E /I /Y public quartz\public
```

### 5. Probar Localmente 🌐

```cmd
scripts\dev.bat
```

Visita: `http://localhost:8080`

## 🎯 ¿Qué se generó?

Después de la migración tendrás:

```
Sole/
├── content/
│   ├── es/                    ← Contenido en español
│   │   ├── index.md
│   │   ├── nuevo-aqui/
│   │   ├── inspirate/
│   │   ├── soluciona/
│   │   ├── pregunta-comenta/
│   │   ├── desconectado/
│   │   └── conceptorio/
│   ├── en/                    ← Contenido en inglés
│   │   ├── index.md
│   │   ├── new-here/
│   │   ├── inspire/
│   │   ├── solve/
│   │   ├── question-comment/
│   │   ├── offline/
│   │   └── glossary/
│   └── assets/
│       └── images/            ← Imágenes optimizadas WebP
├── public/
│   └── downloads/             ← PDFs
└── reports/                   ← Reportes de migración
    ├── inventory.json
    ├── metadata-schema.json
    ├── slug-mapping.json
    ├── image-mapping.json
    ├── video-analysis.json
    ├── pdf-mapping.json
    └── validation-errors.txt  ← ¡Revisar este!
```

## 📊 Revisar Resultados

### 1. Validación

```cmd
type reports\validation-errors.txt
```

Revisa:
- ❌ Errores (deben corregirse)
- ⚠️ Advertencias (opcional)

### 2. Estadísticas

Los reportes en `reports/` contienen:
- **inventory.json**: Todos los archivos encontrados
- **metadata-schema.json**: Tags, categorías, idiomas
- **slug-mapping.json**: Mapeo de nombres antiguos → nuevos
- **image-mapping.json**: Optimización de imágenes
- **validation-errors.txt**: Problemas encontrados

## 🎨 Personalizar Quartz

Ver `QUARTZ_CONFIG.md` para:
- Configurar colores de marca
- Agregar header y footer personalizados
- Configurar idiomas
- Agregar analytics

## 🚀 Deploy a GitHub Pages

### 1. Crear Repositorio

```cmd
git init
git add .
git commit -m "Initial commit: SOLE Voltaje"
```

### 2. Subir a GitHub

```cmd
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**, selecciona: **GitHub Actions**

¡Listo! Tu sitio estará en: `https://TU-USUARIO.github.io/sole-voltaje/`

## 🐳 Alternativa: Docker

Si prefieres usar Docker:

```cmd
REM Build
scripts\docker-build.bat

REM O levantar con docker-compose
docker-compose up -d
```

Visita: `http://localhost:8080`

## 🆘 Problemas Comunes

### Python no funciona
```cmd
REM Prueba con:
py --version      # ← Debe funcionar en Windows
python --version  # ← Puede no funcionar
```

### No encuentra módulos de Python
```cmd
py -m pip install -r requirements.txt
```

### Error en scripts de migración
```cmd
REM Ejecuta scripts individuales para identificar el problema
py scripts\01-inventory.py
py scripts\02-analyze-csv.py
REM ... etc
```

### Quartz no inicia
```cmd
cd quartz
npm install
npx quartz build --serve
```

## 📚 Más Información

- **README.md**: Documentación completa
- **QUARTZ_CONFIG.md**: Configuración de Quartz
- **RESUMEN_PROYECTO.md**: Visión general del proyecto

## 💡 Próximos Pasos

1. ✅ Ejecutar migración
2. ✅ Revisar `reports/validation-errors.txt`
3. ✅ Probar localmente
4. ✅ Personalizar Quartz (opcional)
5. ✅ Deploy a GitHub Pages
6. 🎉 ¡Compartir tu sitio!

---

**¿Necesitas ayuda?**

- 📖 Lee el README completo
- 🐛 Revisa los reportes en `reports/`
- 💬 Contacta: hola@solecolombia.org

**SOLE Colombia** | Cambiando el mundo juntos 🚀

