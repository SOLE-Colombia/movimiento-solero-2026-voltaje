@echo off
REM Script simple para deploy completo
REM SOLE Voltaje - Fundación SOLE Colombia

echo.
echo ================================================================================
echo   DEPLOY SIMPLE - SOLE VOLTAJE
echo ================================================================================
echo.
echo   Este script te guiara paso a paso para publicar tu sitio.
echo   Responde las preguntas cuando se te pida.
echo.
echo ================================================================================
echo.

pause

REM ============================================================================
REM PASO 1: Verificar Git
REM ============================================================================

echo.
echo [PASO 1/5] Verificando Git...
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git no esta instalado.
    echo.
    echo Descarga Git desde: https://git-scm.com/download/win
    echo Instala Git y vuelve a ejecutar este script.
    echo.
    pause
    exit /b 1
)

echo Git esta instalado correctamente.
echo.

REM ============================================================================
REM PASO 2: Configurar Git (si no está configurado)
REM ============================================================================

echo [PASO 2/5] Configurando Git...
echo.

git config user.name >nul 2>&1
if errorlevel 1 (
    echo Necesitamos configurar tu nombre y email para Git.
    echo.
    set /p GIT_NAME="Tu nombre completo: "
    set /p GIT_EMAIL="Tu email: "
    
    git config --global user.name "!GIT_NAME!"
    git config --global user.email "!GIT_EMAIL!"
    
    echo.
    echo Configuracion guardada:
    echo   Nombre: !GIT_NAME!
    echo   Email: !GIT_EMAIL!
    echo.
) else (
    for /f "delims=" %%i in ('git config user.name') do set CURRENT_NAME=%%i
    for /f "delims=" %%i in ('git config user.email') do set CURRENT_EMAIL=%%i
    
    echo Git ya esta configurado:
    echo   Nombre: !CURRENT_NAME!
    echo   Email: !CURRENT_EMAIL!
    echo.
)

pause

REM ============================================================================
REM PASO 3: Inicializar Git (si no está inicializado)
REM ============================================================================

echo.
echo [PASO 3/5] Inicializando repositorio Git...
echo.

if exist ".git" (
    echo El repositorio Git ya esta inicializado.
    echo.
) else (
    git init
    if errorlevel 1 (
        echo ERROR al inicializar Git.
        pause
        exit /b 1
    )
    echo Repositorio Git inicializado correctamente.
    echo.
)

git branch -M main
echo Rama principal configurada como 'main'.
echo.

pause

REM ============================================================================
REM PASO 4: Conectar con GitHub
REM ============================================================================

echo.
echo [PASO 4/5] Conectando con GitHub...
echo.

REM Verificar si ya existe remote
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo Ya tienes un remote configurado:
    for /f "delims=" %%i in ('git remote get-url origin') do echo   %%i
    echo.
    set /p CHANGE_REMOTE="Quieres cambiarlo? (S/N): "
    if /i "!CHANGE_REMOTE!"=="S" (
        git remote remove origin
    ) else (
        goto :skip_remote
    )
)

echo.
echo IMPORTANTE: Necesitas crear un repositorio en GitHub primero.
echo.
echo 1. Ve a: https://github.com/new
echo 2. Nombre: sole-voltaje
echo 3. NO marques ninguna opcion adicional
echo 4. Click en "Create repository"
echo 5. Copia la URL del repositorio (ejemplo: https://github.com/usuario/sole-voltaje.git)
echo.

set /p REPO_URL="Pega aqui la URL de tu repositorio GitHub: "

if "!REPO_URL!"=="" (
    echo.
    echo ERROR: No proporcionaste una URL.
    pause
    exit /b 1
)

git remote add origin !REPO_URL!
if errorlevel 1 (
    echo ERROR al agregar el remote.
    pause
    exit /b 1
)

echo Remote configurado correctamente: !REPO_URL!
echo.

:skip_remote

pause

REM ============================================================================
REM PASO 5: Subir a GitHub
REM ============================================================================

echo.
echo [PASO 5/5] Subiendo codigo a GitHub...
echo.

echo Preparando archivos...
git add .

echo Creando commit...
git commit -m "feat: Migracion inicial SOLE Voltaje de Notion a Quartz v4"

if errorlevel 1 (
    echo.
    echo Nota: Si ya existe un commit, no hay problema.
    echo.
)

echo.
echo Subiendo a GitHub (esto puede tomar varios minutos)...
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR al hacer push a GitHub.
    echo.
    echo Posibles soluciones:
    echo 1. Si es la primera vez, GitHub pedira que te autentiques
    echo 2. Verifica que la URL del repositorio sea correcta
    echo 3. Verifica tu conexion a Internet
    echo.
    echo Si necesitas ayuda, lee: PASOS_SIMPLES.md
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================================================
echo   EXITO!
echo ================================================================================
echo.
echo   Tu codigo esta ahora en GitHub!
echo.
echo   Proximos pasos:
echo.
echo   1. Ve a tu repositorio en GitHub
echo   2. Click en "Settings" (Configuracion)
echo   3. Click en "Pages" (en el menu izquierdo)
echo   4. En "Source", selecciona: "GitHub Actions"
echo   5. Click en "Save"
echo.
echo   6. Ve a la pestana "Actions"
echo   7. Click en "Deploy to GitHub Pages"
echo   8. Click en "Run workflow"
echo.
echo   Tu sitio estara disponible en aproximadamente 2-3 minutos en:
echo   https://TU-USUARIO.github.io/sole-voltaje/
echo.
echo   Lee PASOS_SIMPLES.md para instrucciones detalladas de GitHub Pages.
echo.
echo ================================================================================
echo.

pause




