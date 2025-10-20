@echo off
REM Script para hacer build de producción con Docker (Windows)

echo 🔨 Build de producción con Docker...
echo.

REM Build
docker build -t sole-voltaje:latest .

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build completado exitosamente
    echo 🐳 Imagen creada: sole-voltaje:latest
    echo.
    echo Para ejecutar:
    echo   docker run -p 8080:80 sole-voltaje:latest
    echo.
) else (
    echo ❌ Error en el build
    exit /b 1
)


