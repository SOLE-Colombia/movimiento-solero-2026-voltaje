@echo off
REM Script para hacer build de producción de Quartz (Windows)

echo 🔨 Haciendo build de producción...
echo.

REM Verificar si existe el directorio quartz
if not exist "quartz\" (
    echo ❌ Error: El directorio 'quartz' no existe
    exit /b 1
)

cd quartz

REM Build
echo 📦 Generando sitio estático...
npx quartz build

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build completado exitosamente
    echo 📁 Archivos generados en: quartz\public\
    echo.
echo Para probar localmente:
echo   cd quartz\public ^&^& py -m http.server 8000
    echo.
) else (
    echo.
    echo ❌ Error en el build
    exit /b 1
)

