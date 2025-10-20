@echo off
REM Script para verificar requisitos del sistema
REM SOLE Voltaje - Fundación SOLE Colombia

echo ================================================================================
echo   VERIFICACION DE REQUISITOS - SOLE VOLTAJE
echo ================================================================================
echo.

set ALL_OK=1

REM Python
echo [1/6] Verificando Python...
py --version >nul 2>&1
if errorlevel 1 (
    echo   [X] Python NO encontrado
    echo       Descarga: https://www.python.org/downloads/
    set ALL_OK=0
) else (
    for /f "tokens=2" %%i in ('py --version 2^>^&1') do echo   [OK] Python %%i instalado
)
echo.

REM Node.js
echo [2/6] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo   [X] Node.js NO encontrado
    echo       Descarga: https://nodejs.org/
    set ALL_OK=0
) else (
    for /f %%i in ('node --version 2^>^&1') do echo   [OK] Node.js %%i instalado
)
echo.

REM npm
echo [3/6] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo   [X] npm NO encontrado
    echo       Viene con Node.js
    set ALL_OK=0
) else (
    for /f %%i in ('npm --version 2^>^&1') do echo   [OK] npm %%i instalado
)
echo.

REM Git
echo [4/6] Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo   [X] Git NO encontrado
    echo       Descarga: https://git-scm.com/download/win
    set ALL_OK=0
) else (
    for /f "tokens=3" %%i in ('git --version 2^>^&1') do echo   [OK] Git %%i instalado
)
echo.

REM Docker (opcional)
echo [5/6] Verificando Docker (opcional)...
docker --version >nul 2>&1
if errorlevel 1 (
    echo   [!] Docker NO encontrado (opcional)
    echo       Descarga: https://www.docker.com/products/docker-desktop/
) else (
    for /f "tokens=3" %%i in ('docker --version 2^>^&1') do echo   [OK] Docker %%i instalado
)
echo.

REM Dependencias Python
echo [6/6] Verificando dependencias Python...
if exist "requirements.txt" (
    py -m pip show Pillow >nul 2>&1
    if errorlevel 1 (
        echo   [!] Dependencias Python no instaladas
        echo       Ejecuta: py -m pip install -r requirements.txt
        set ALL_OK=0
    ) else (
        echo   [OK] Dependencias Python instaladas
    )
) else (
    echo   [!] No se encuentra requirements.txt
    set ALL_OK=0
)
echo.

echo ================================================================================
echo   ESTRUCTURA DEL PROYECTO
echo ================================================================================
echo.

if exist "content\es" (echo   [OK] content\es\) else (echo   [X] content\es\)
if exist "content\en" (echo   [OK] content\en\) else (echo   [X] content\en\)
if exist "content\assets\images" (echo   [OK] content\assets\images\) else (echo   [X] content\assets\images\)
if exist "public" (echo   [OK] public\) else (echo   [!] public\)
if exist "scripts" (echo   [OK] scripts\) else (echo   [X] scripts\)
if exist "quartz" (echo   [OK] quartz\) else (echo   [!] quartz\ - Necesita clonarse)

echo.

echo ================================================================================
echo   QUARTZ
echo ================================================================================
echo.

if exist "quartz" (
    if exist "quartz\node_modules" (
        echo   [OK] Dependencias de Quartz instaladas
    ) else (
        echo   [!] Dependencias de Quartz NO instaladas
        echo       Ejecuta: cd quartz ^&^& npm install ^&^& cd ..
    )
    
    if exist "quartz\content\es" (
        echo   [OK] Contenido copiado a Quartz
    ) else (
        echo   [!] Contenido NO copiado a Quartz
        echo       Ejecuta: scripts\copy-to-quartz.bat
    )
) else (
    echo   [!] Quartz NO clonado
    echo       Ejecuta: git clone https://github.com/jackyzha0/quartz.git
    echo                cd quartz
    echo                npm install
    echo                cd ..
)

echo.

echo ================================================================================
echo   RESUMEN
echo ================================================================================
echo.

if %ALL_OK%==1 (
    echo   TODO LISTO! Puedes continuar con la configuracion.
    echo.
    echo   Proximos pasos:
    echo   1. Ejecutar: scripts\setup-complete.bat
    echo   2. Seguir la guia: GUIA_DEPLOY.md
) else (
    echo   FALTAN ALGUNOS REQUISITOS
    echo.
    echo   Revisa los errores arriba marcados con [X]
    echo   Instala los programas faltantes y vuelve a ejecutar este script.
)

echo.
echo ================================================================================
echo.

pause




