@echo off
REM Script para copiar contenido optimizado a Quartz
REM SOLE Voltaje - Fundación SOLE Colombia

echo ================================================================================
echo   COPIAR CONTENIDO A QUARTZ
echo ================================================================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "content" (
    echo ERROR: No se encuentra la carpeta content/
    echo Asegurate de ejecutar este script desde la raiz del proyecto Sole
    pause
    exit /b 1
)

if not exist "quartz" (
    echo ERROR: No se encuentra la carpeta quartz/
    echo.
    echo Necesitas clonar Quartz primero:
    echo   git clone https://github.com/jackyzha0/quartz.git
    echo   cd quartz
    echo   npm install
    echo   cd ..
    echo.
    pause
    exit /b 1
)

echo Directorios encontrados:
echo   - content/     [OK]
echo   - public/      [OK]
echo   - quartz/      [OK]
echo.

REM Preguntar confirmacion
echo IMPORTANTE: Esta operacion copiara todo el contenido optimizado a Quartz.
echo.
set /p CONFIRM="Continuar? (S/N): "
if /i not "%CONFIRM%"=="S" (
    echo Operacion cancelada.
    pause
    exit /b 0
)

echo.
echo ================================================================================
echo   PASO 1: HACER BACKUP (opcional)
echo ================================================================================
echo.

if exist "quartz\content\*.*" (
    set /p BACKUP="Hacer backup del contenido actual de Quartz? (S/N): "
    if /i "%BACKUP%"=="S" (
        echo Creando backup...
        if not exist "backups" mkdir backups
        set BACKUP_DIR=backups\quartz-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%
        set BACKUP_DIR=%BACKUP_DIR: =0%
        mkdir "%BACKUP_DIR%"
        xcopy /E /I /Q quartz\content "%BACKUP_DIR%\content" >nul
        if exist quartz\public xcopy /E /I /Q quartz\public "%BACKUP_DIR%\public" >nul
        echo   Backup creado en: %BACKUP_DIR%
        echo.
    )
)

echo ================================================================================
echo   PASO 2: LIMPIAR CONTENIDO ANTERIOR
echo ================================================================================
echo.

echo Eliminando contenido anterior de Quartz...
if exist "quartz\content" (
    rmdir /S /Q "quartz\content"
    echo   - quartz\content eliminado
)
if exist "quartz\public" (
    rmdir /S /Q "quartz\public"
    echo   - quartz\public eliminado
)
echo.

echo ================================================================================
echo   PASO 3: COPIAR CONTENIDO OPTIMIZADO
echo ================================================================================
echo.

echo Copiando contenido...
xcopy /E /I /Q content quartz\content
if errorlevel 1 (
    echo ERROR al copiar content/
    pause
    exit /b 1
)
echo   [OK] content/ copiado

xcopy /E /I /Q public quartz\public
if errorlevel 1 (
    echo ERROR al copiar public/
    pause
    exit /b 1
)
echo   [OK] public/ copiado
echo.

echo ================================================================================
echo   PASO 4: COPIAR CONFIGURACIONES
echo ================================================================================
echo.

REM Solo copiar si existen archivos de configuracion personalizados
if exist "quartz.config.ts" (
    copy /Y quartz.config.ts quartz\quartz.config.ts >nul
    echo   [OK] quartz.config.ts copiado
)

if exist "quartz.layout.ts" (
    copy /Y quartz.layout.ts quartz\quartz.layout.ts >nul
    echo   [OK] quartz.layout.ts copiado
)

REM Copiar componentes personalizados si existen
if exist "components" (
    if not exist "quartz\components" mkdir quartz\components
    xcopy /E /I /Q /Y components quartz\components >nul
    echo   [OK] components/ copiado
)

REM Copiar estilos personalizados si existen
if exist "styles" (
    if not exist "quartz\styles" mkdir quartz\styles
    xcopy /E /I /Q /Y styles quartz\styles >nul
    echo   [OK] styles/ copiado
)

echo.

echo ================================================================================
echo   PASO 5: VERIFICAR ESTRUCTURA
echo ================================================================================
echo.

echo Verificando estructura de Quartz...

REM Verificar carpetas de contenido
if exist "quartz\content\es" (
    echo   [OK] quartz\content\es
) else (
    echo   [ERROR] No se encuentra quartz\content\es
)

if exist "quartz\content\en" (
    echo   [OK] quartz\content\en
) else (
    echo   [ERROR] No se encuentra quartz\content\en
)

if exist "quartz\content\assets\images" (
    echo   [OK] quartz\content\assets\images
) else (
    echo   [ERROR] No se encuentra quartz\content\assets\images
)

REM Verificar carpeta public
if exist "quartz\public\downloads" (
    echo   [OK] quartz\public\downloads
) else (
    echo   [AVISO] No se encuentra quartz\public\downloads
)

if exist "quartz\public\videos" (
    echo   [OK] quartz\public\videos
) else (
    echo   [AVISO] No se encuentra quartz\public\videos
)

echo.

echo ================================================================================
echo   RESUMEN
echo ================================================================================
echo.

REM Contar archivos
for /f %%i in ('dir /s /b quartz\content\*.md ^| find /c /v ""') do set MD_COUNT=%%i
for /f %%i in ('dir /s /b quartz\content\assets\images ^| find /c /v ""') do set IMG_COUNT=%%i

echo   Archivos Markdown copiados: %MD_COUNT%
echo   Imagenes copiadas: %IMG_COUNT%
echo.
echo   EXITO: Contenido copiado a Quartz correctamente!
echo.
echo ================================================================================
echo   PROXIMOS PASOS
echo ================================================================================
echo.
echo   1. Instalar dependencias (si no lo has hecho):
echo      cd quartz
echo      npm install
echo.
echo   2. Probar localmente:
echo      npm run serve
echo      (o usar: ..\scripts\dev.bat)
echo.
echo   3. Construir para produccion:
echo      npm run build
echo      (o usar: ..\scripts\build.bat)
echo.
echo   4. Ver la guia completa:
echo      GUIA_DEPLOY.md
echo.
echo ================================================================================
echo.

pause

