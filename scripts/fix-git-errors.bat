@echo off
chcp 65001 >nul
echo ========================================
echo 🔧 Limpieza de Errores de Git
echo ========================================
echo.

echo 📍 Verificando ubicación actual...
cd
echo.

echo 🔍 Verificando que estamos en la carpeta correcta...
if not exist "quartz" (
    echo ❌ ERROR: No estás en la carpeta del proyecto
    echo.
    echo Por favor ejecuta:
    echo    cd "c:\Users\David Vega\Downloads\Sole"
    echo    scripts\fix-git-errors.bat
    echo.
    pause
    exit /b 1
)
echo ✅ Estás en la carpeta correcta
echo.

echo 🧹 Limpiando configuración problemática de Git...
git config --global --unset safe.directory "C:/Windows/System32" 2>nul
git config --global --remove-section safe.directory 2>nul
echo ✅ Configuración limpiada
echo.

echo 🔍 Verificando si existe repositorio Git aquí...
if exist ".git" (
    echo ⚠️  Ya existe un repositorio .git
    echo.
    choice /C SN /M "¿Deseas eliminar el .git existente y empezar de cero"
    if not errorlevel 2 (
        echo 🗑️ Eliminando .git...
        rmdir /S /Q .git
        echo ✅ .git eliminado
    )
    echo.
)

echo 📍 Estableciendo directorio seguro correcto...
git config --global --add safe.directory "C:/Users/David Vega/Downloads/Sole"
echo ✅ Directorio configurado
echo.

echo 🔄 Inicializando Git en el directorio correcto...
git init
if errorlevel 1 (
    echo ❌ Error al inicializar Git
    pause
    exit /b 1
)
echo ✅ Git inicializado correctamente
echo.

echo 📧 Configurando tu información...
git config user.name "David Vega - SOLE Colombia"
git config user.email "voltaje@solecolombia.org"
echo ✅ Usuario configurado
echo.

echo 🔗 Configurando remote...
git remote remove origin 2>nul
git remote add origin git@github.com:SOLE-Colombia/dev_voltaje.git
if errorlevel 1 (
    echo ❌ Error al configurar remote
    pause
    exit /b 1
)
echo ✅ Remote configurado
echo.

echo 🔐 Verificando SSH...
ssh -T git@github.com 2>&1 | findstr /C:"successfully authenticated" >nul
if errorlevel 1 (
    echo ⚠️  SSH no conectado aún
    echo.
    echo Agrega tu key en: https://github.com/settings/keys
    echo.
    echo Tu key:
    echo ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
    echo.
) else (
    echo ✅ SSH funcionando correctamente
    echo.
)

echo ========================================
echo ✅ ¡LIMPIEZA COMPLETA!
echo ========================================
echo.
echo Git está configurado correctamente en:
echo    C:\Users\David Vega\Downloads\Sole
echo.
echo 🚀 Siguiente paso: Ejecutar
echo    scripts\push-to-sole-colombia.bat
echo.

pause

