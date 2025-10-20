@echo off
REM Script para iniciar servidor de desarrollo de Quartz (Windows)

echo 🚀 Iniciando servidor de desarrollo de Quartz...
echo.

REM Verificar si existe el directorio quartz
if not exist "quartz\" (
    echo ❌ Error: El directorio 'quartz' no existe
    echo    Ejecuta primero: git clone https://github.com/jackyzha0/quartz.git
    exit /b 1
)

REM Verificar si node_modules existe
if not exist "quartz\node_modules\" (
    echo 📦 Instalando dependencias de Node.js...
    cd quartz
    call npm install
    cd ..
)

REM Iniciar servidor
cd quartz
echo 🌐 Servidor iniciando en http://localhost:8080
echo    Presiona Ctrl+C para detener
echo.
npx quartz build --serve

