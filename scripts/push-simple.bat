@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Push Simplificado a GitHub
echo ========================================
echo.

REM Asegurarse de estar en el directorio correcto
cd /d "c:\Users\David Vega\Downloads\Sole"
echo 📍 Directorio: %CD%
echo.

REM Verificar que estamos en el lugar correcto
if not exist "quartz" (
    echo ❌ ERROR: No se encuentra la carpeta quartz
    echo Asegúrate de estar en c:\Users\David Vega\Downloads\Sole
    pause
    exit /b 1
)

REM Verificar si ya existe .git
if not exist ".git" (
    echo 📁 Inicializando Git...
    git init
    
    echo 📧 Configurando usuario...
    git config user.name "David Vega - SOLE Colombia"
    git config user.email "voltaje@solecolombia.org"
    
    echo 🔗 Configurando remote...
    git remote add origin git@github.com:SOLE-Colombia/dev_voltaje.git
    echo.
)

REM Verificar SSH
echo 🔐 Verificando SSH...
ssh -T git@github.com 2>&1 | findstr /C:"successfully authenticated" >nul
if errorlevel 1 (
    echo.
    echo ⚠️  SSH no conectado
    echo.
    echo Agrega tu SSH key en: https://github.com/settings/keys
    echo.
    echo Tu key:
    echo ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
    echo.
    pause
    exit /b 1
)
echo ✅ SSH conectado
echo.

REM Mostrar archivos a subir
echo 📋 Preparando archivos...
git add .
echo.

REM Mostrar resumen
echo 📊 Resumen de archivos:
git status --short | findstr /V "^??" | find /C "M " >nul 2>&1 && echo    ✅ Archivos listos para subir
echo.

REM Crear commit
echo 📝 Creando commit...
git commit -m "🚀 Initial commit: SOLE Voltaje - Sitio web bilingüe" -m "Migración completa desde Notion a Quartz v4" -m "" -m "- Contenido bilingüe (ES/EN)" -m "- Imágenes optimizadas WebP" -m "- Scripts de migración" -m "- Configuración de Quartz" -m "- Docker y CI/CD" -m "- Documentación completa"

if errorlevel 1 (
    echo.
    echo ⚠️  Nada que commitear o error
    echo.
)

REM Configurar rama main
echo 🌿 Configurando rama main...
git branch -M main

REM Push
echo.
echo 🚀 Subiendo a GitHub...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Error al hacer push
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ ¡PUSH EXITOSO A MAIN!
echo.

REM Crear desarrollo
echo 🌿 Creando rama development...
git checkout -b development
git push -u origin development
echo.

REM Crear content-editing
echo 🌿 Creando rama content-editing...
git checkout -b content-editing
git push -u origin content-editing
echo.

REM Volver a development
git checkout development

echo.
echo ========================================
echo ✅ ¡TODO LISTO!
echo ========================================
echo.
echo 📊 Repositorio: https://github.com/SOLE-Colombia/dev_voltaje
echo.
echo 🌳 Ramas creadas:
echo    ✅ main
echo    ✅ development
echo    ✅ content-editing
echo.
echo 📝 Próximos pasos:
echo    1. Configurar protección de ramas en GitHub
echo    2. Activar GitHub Pages
echo    3. Agregar colaboradores
echo.

pause

