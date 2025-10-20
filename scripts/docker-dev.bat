@echo off
REM Script para levantar entorno de desarrollo con Docker (Windows)

echo 🐳 Levantando entorno Docker para SOLE Voltaje...
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker no está instalado
    echo    Instala Docker desde: https://www.docker.com/get-started
    exit /b 1
)

REM Build y levantar contenedores
echo 📦 Construyendo imagen Docker...
docker-compose build

if %errorlevel% equ 0 (
    echo.
    echo 🚀 Iniciando contenedor...
    docker-compose up -d
    
    if %errorlevel% equ 0 (
        echo.
        echo ✅ Contenedor iniciado exitosamente
        echo 🌐 Sitio disponible en: http://localhost:8080
        echo.
        echo Comandos útiles:
        echo   Ver logs:      docker-compose logs -f
        echo   Detener:       docker-compose down
        echo   Reiniciar:     docker-compose restart
        echo.
    ) else (
        echo ❌ Error al iniciar contenedor
        exit /b 1
    )
) else (
    echo ❌ Error en el build
    exit /b 1
)






