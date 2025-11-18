# 📖 Cómo Trabajar Correctamente con SOLE Voltaje

Guía rápida para evitar errores comunes al trabajar con el proyecto.

---

## ❌ Errores Comunes

### Error 1: Ejecutar comandos en el directorio incorrecto

**❌ INCORRECTO:**
```powershell
PS C:\Users\Danvegamo> npm run dev
# Error: no puede encontrar package.json
```

**✅ CORRECTO:**
```powershell
PS C:\Users\Danvegamo\Documents\SOLE\dev_voltaje> npm run dev
# ✅ Funciona correctamente
```

### Error 2: Editar archivos en la carpeta de backup

**❌ INCORRECTO:**
```
Editando en:
  content_backup_20251110_ANTIGUA/es/...  ❌ Carpeta antigua archivada
```

**✅ CORRECTO:**
```
Editando en:
  quartz/content/es/...  ✅ Carpeta correcta
  quartz/content/en/...  ✅ Carpeta correcta
```

---

## ✅ Flujo de Trabajo Correcto

### Paso 1: Navegar al proyecto

**En PowerShell:**

```powershell
# Navegar a la carpeta del proyecto
cd C:\Users\Danvegamo\Documents\SOLE\dev_voltaje

# Verificar que estás en el lugar correcto
pwd
# Debería mostrar: C:\Users\Danvegamo\Documents\SOLE\dev_voltaje
```

**Truco rápido:** Guarda este comando en un archivo `.bat`:

```batch
@echo off
cd /d C:\Users\Danvegamo\Documents\SOLE\dev_voltaje
powershell
```

Guárdalo como `ir-a-voltaje.bat` en tu escritorio y ejecútalo para ir directo al proyecto.

---

### Paso 2: Iniciar el servidor de desarrollo

**Con Docker (Recomendado):**

```powershell
# Asegúrate de estar en C:\Users\Danvegamo\Documents\SOLE\dev_voltaje

# Iniciar Docker
npm run dev

# O manualmente:
docker compose -f docker-compose.dev.yml up
```

**Sin Docker:**

```powershell
# Navegar a quartz
cd quartz

# Iniciar servidor
npx quartz build --serve

# Volver a la raíz
cd ..
```

---

### Paso 3: Editar archivos

**Ubicación correcta de archivos:**

```
📁 dev_voltaje/
└── 📁 quartz/
    └── 📁 content/              ✅ EDITA AQUÍ
        ├── 📁 es/               ← Contenido en español
        │   ├── 📁 inspirate/
        │   ├── 📁 soluciona/
        │   ├── 📁 conceptorio/
        │   └── 📁 desconectado/
        │
        ├── 📁 en/               ← Content in English
        │   ├── 📁 inspire/
        │   ├── 📁 solve/
        │   ├── 📁 glossary/
        │   └── ...
        │
        └── 📁 assets/
            └── 📁 images/       ← Imágenes
```

**❌ NO edites en:**

```
📁 dev_voltaje/
└── 📁 content_backup_20251110_ANTIGUA/  ❌ NO EDITAR - Es un backup antiguo
```

---

### Paso 4: Guardar cambios en Git

```powershell
# Ver qué archivos cambiaste
git status

# Agregar los archivos modificados
git add quartz/content/

# Hacer commit
git commit -m "actualizar contenido"

# Subir a GitHub
git push
```

---

## 🌐 Abrir el sitio en el navegador

Una vez que el servidor esté corriendo:

```
http://localhost:8080
```

Deberías ver:
1. **Página de inicio** con selector de idioma (🇪🇸 🇬🇧)
2. **Botón flotante** en la esquina inferior derecha para cambiar idioma

---

## 🔍 Verificación Rápida

### Verificar que estás en el directorio correcto:

```powershell
# Comando 1: Ver dónde estás
pwd

# Debería mostrar:
# Path
# ----
# C:\Users\Danvegamo\Documents\SOLE\dev_voltaje

# Comando 2: Listar archivos
ls

# Deberías ver:
# - package.json
# - docker-compose.dev.yml
# - Makefile
# - quartz/
# - docs/
# - scripts/
```

### Verificar que los archivos están en su lugar:

```powershell
# Contar archivos en español
(Get-ChildItem -Path "quartz\content\es" -Recurse -File -Filter "*.md" | Measure-Object).Count

# Deberías ver: 431

# Contar archivos en inglés
(Get-ChildItem -Path "quartz\content\en" -Recurse -File -Filter "*.md" | Measure-Object).Count

# Deberías ver: 153
```

---

## 🚨 Si algo sale mal

### Problema: "npm: command not found"

```powershell
# Verificar si Node.js está instalado
node --version
npm --version

# Si no están instalados:
# 1. Instalar Node.js 22+ desde: https://nodejs.org/
# 2. Reiniciar PowerShell
```

### Problema: "docker: command not found"

```powershell
# Verificar si Docker Desktop está instalado y corriendo
docker --version

# Si no está instalado:
# 1. Instalar Docker Desktop para Windows
# 2. Iniciar Docker Desktop
# 3. Esperar a que el ícono de Docker esté verde
```

### Problema: "Los archivos desaparecieron de quartz/content/"

```powershell
# Restaurar desde Git
git checkout HEAD -- quartz/content/

# Verificar
ls quartz\content\es
ls quartz\content\en
```

---

## 📝 Resumen de Carpetas

| Carpeta | Uso | ¿Editar? |
|---------|-----|----------|
| `quartz/content/es/` | Contenido en español | ✅ SÍ |
| `quartz/content/en/` | Content in English | ✅ SÍ |
| `quartz/content/assets/` | Imágenes y recursos | ✅ SÍ |
| `content_backup_20251110_ANTIGUA/` | Backup antiguo | ❌ NO |
| `quartz/public/` | Build generado | ❌ NO (se genera automáticamente) |
| `quartz/node_modules/` | Dependencias npm | ❌ NO |
| `scripts/` | Scripts de automatización | ⚠️ Solo si sabes qué haces |
| `docs/` | Documentación | ✅ Sí (si actualizas docs) |

---

## 🎯 Comandos más usados

```powershell
# Ir al proyecto
cd C:\Users\Danvegamo\Documents\SOLE\dev_voltaje

# Iniciar servidor
npm run dev

# Ver estado de Git
git status

# Guardar cambios
git add quartz/content/
git commit -m "actualizar contenido"
git push

# Detener servidor
# Presiona Ctrl+C en la terminal donde está corriendo

# Detener Docker
docker compose -f docker-compose.dev.yml down
```

---

## ✅ Checklist antes de empezar a trabajar

- [ ] Estoy en el directorio correcto (`C:\Users\Danvegamo\Documents\SOLE\dev_voltaje`)
- [ ] El servidor está corriendo (`npm run dev`)
- [ ] Puedo abrir `http://localhost:8080` en mi navegador
- [ ] Sé que debo editar en `quartz/content/` (NO en `content_backup_*/`)
- [ ] Tengo Git configurado y puedo hacer `git status`

---

**Última actualización:** 10 de Noviembre, 2025
**Versión:** 1.0.0

