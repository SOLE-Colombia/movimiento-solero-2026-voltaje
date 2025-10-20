@echo off
REM Script para inicializar Git y preparar primer commit
REM SOLE Voltaje - Fundación SOLE Colombia

echo ================================================================================
echo   INICIALIZAR GIT Y PREPARAR REPOSITORIO
echo ================================================================================
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git no esta instalado
    echo.
    echo Descargalo desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git esta instalado
echo.

REM Verificar si ya está inicializado
if exist ".git" (
    echo Git ya esta inicializado en este proyecto.
    echo.
    set /p REINIT="Reinicializar? (S/N): "
    if /i not "%REINIT%"=="S" (
        echo Usando repositorio existente.
        echo.
        goto :configure
    )
    echo Reinicializando...
    rmdir /S /Q .git
)

echo ================================================================================
echo   PASO 1: INICIALIZAR REPOSITORIO
echo ================================================================================
echo.

git init
if errorlevel 1 (
    echo ERROR al inicializar Git
    pause
    exit /b 1
)
echo [OK] Repositorio inicializado
echo.

:configure

echo ================================================================================
echo   PASO 2: CONFIGURAR GIT
echo ================================================================================
echo.

REM Verificar configuración actual
git config user.name >nul 2>&1
if errorlevel 1 (
    echo No hay configuracion de usuario de Git.
    echo.
    set /p GIT_NAME="Tu nombre completo: "
    set /p GIT_EMAIL="Tu email: "
    
    git config user.name "%GIT_NAME%"
    git config user.email "%GIT_EMAIL%"
    
    echo.
    echo Configuracion guardada:
    echo   Nombre: %GIT_NAME%
    echo   Email: %GIT_EMAIL%
) else (
    for /f "delims=" %%i in ('git config user.name') do set CURRENT_NAME=%%i
    for /f "delims=" %%i in ('git config user.email') do set CURRENT_EMAIL=%%i
    
    echo Configuracion actual:
    echo   Nombre: %CURRENT_NAME%
    echo   Email: %CURRENT_EMAIL%
    echo.
    set /p CHANGE_CONFIG="Cambiar configuracion? (S/N): "
    if /i "%CHANGE_CONFIG%"=="S" (
        set /p GIT_NAME="Tu nombre completo: "
        set /p GIT_EMAIL="Tu email: "
        
        git config user.name "%GIT_NAME%"
        git config user.email "%GIT_EMAIL%"
        
        echo.
        echo Configuracion actualizada.
    )
)
echo.

echo ================================================================================
echo   PASO 3: CONFIGURAR RAMA PRINCIPAL
echo ================================================================================
echo.

git branch -M main
echo [OK] Rama principal configurada como 'main'
echo.

echo ================================================================================
echo   PASO 4: CONECTAR CON GITHUB
echo ================================================================================
echo.

echo Para continuar, necesitas:
echo   1. Crear un repositorio en GitHub
echo   2. Copiar la URL del repositorio
echo.
echo Visita: https://github.com/new
echo.
echo Nombre sugerido: sole-voltaje
echo Descripcion: SOLE Voltaje - Plataforma educativa bilingue sobre conectividad
echo.

set /p REPO_URL="URL del repositorio (https://github.com/usuario/repo.git): "

if "%REPO_URL%"=="" (
    echo.
    echo No se proporciono URL. Puedes configurarlo despues con:
    echo   git remote add origin URL_DEL_REPO
    echo.
    pause
    exit /b 0
)

REM Verificar si ya existe el remote
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo.
    echo Ya existe un remote 'origin'. Actualizando...
    git remote remove origin
)

git remote add origin %REPO_URL%
if errorlevel 1 (
    echo ERROR al agregar remote
    pause
    exit /b 1
)

echo [OK] Remote configurado: %REPO_URL%
echo.

REM Verificar conexion
echo Verificando conexion con GitHub...
git ls-remote origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo AVISO: No se pudo conectar con el repositorio.
    echo Posibles razones:
    echo   - El repositorio no existe aun
    echo   - Necesitas autenticarte
    echo   - La URL es incorrecta
    echo.
    echo Puedes continuar de todas formas. La conexion se verificara en el primer push.
    echo.
) else (
    echo [OK] Conexion exitosa con GitHub
    echo.
)

echo ================================================================================
echo   PASO 5: VERIFICAR ARCHIVOS
echo ================================================================================
echo.

REM Verificar .gitignore
if not exist ".gitignore" (
    echo AVISO: No se encuentra .gitignore
    echo Se recomienda crear uno antes del primer commit.
    echo.
) else (
    echo [OK] .gitignore encontrado
)

REM Verificar README
if not exist "README.md" (
    echo AVISO: No se encuentra README.md
    echo Se recomienda crear uno antes del primer commit.
    echo.
) else (
    echo [OK] README.md encontrado
)

echo.

echo ================================================================================
echo   RESUMEN
echo ================================================================================
echo.
echo   [OK] Repositorio Git inicializado
echo   [OK] Rama principal: main
echo   [OK] Remote configurado: origin
echo.
echo ================================================================================
echo   PROXIMOS PASOS
echo ================================================================================
echo.
echo   1. Revisar que archivos se van a incluir:
echo      git status
echo.
echo   2. Agregar archivos al staging:
echo      git add .
echo.
echo   3. Crear primer commit:
echo      git commit -m "feat: Migracion inicial SOLE Voltaje"
echo.
echo   4. Subir a GitHub:
echo      git push -u origin main
echo.
echo   O usar el script automatico:
echo      scripts\first-push.bat
echo.
echo ================================================================================
echo.

pause




