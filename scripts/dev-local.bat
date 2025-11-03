@echo off
REM Script para iniciar desarrollo local con Docker en Windows

echo 🚀 Iniciando entorno de desarrollo SOLE Voltaje
echo ==============================================

REM Verificar que Docker está corriendo
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker no está corriendo
    echo Por favor inicia Docker Desktop e intenta nuevamente
    exit /b 1
)

REM Construir imágenes si no existen
echo 📦 Verificando imágenes Docker...
docker-compose -f docker-compose.dev.yml build

REM Iniciar servicios
echo 🔄 Iniciando servicios...
docker-compose -f docker-compose.dev.yml up -d

REM Esperar que los servicios estén listos
echo ⏳ Esperando que los servicios inicien...
timeout /t 5 /nobreak >nul

echo.
echo ✅ Servicios iniciados!
echo.
echo 📝 Accede al sitio en desarrollo:
echo    → http://localhost:8080
echo.
echo 🔧 Comandos útiles:
echo    Ver logs:        docker-compose -f docker-compose.dev.yml logs -f
echo    Detener:         docker-compose -f docker-compose.dev.yml down
echo    Ejecutar script: docker-compose -f docker-compose.dev.yml exec voltaje-scripts python scripts/NOMBRE_SCRIPT.py
echo    Shell Python:    docker-compose -f docker-compose.dev.yml exec voltaje-scripts bash
echo.
echo 🎉 ¡Todo listo para desarrollar!

pause




