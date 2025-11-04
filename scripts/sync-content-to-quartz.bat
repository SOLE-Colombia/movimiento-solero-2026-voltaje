@echo off
REM Sync content from root to quartz/content

echo.
echo ===============================================================
echo   SINCRONIZANDO CONTENIDO A QUARTZ/CONTENT
echo ===============================================================
echo.

cd /d "%~dp0\.."

REM Check if content/ exists
if not exist "content\" (
    echo [ERROR] No se encontro la carpeta content/
    exit /b 1
)

REM Check if quartz/content/ exists, if not create it
if not exist "quartz\content\" (
    echo [INFO] Creando carpeta quartz\content\
    mkdir "quartz\content"
)

echo [INFO] Copiando archivos...
echo.

REM Use robocopy to sync (similar to rsync)
REM /MIR = Mirror (delete files in destination that don't exist in source)
REM /XD = Exclude directories
REM /NFL = No file list
REM /NDL = No directory list
REM /NJH = No job header
REM /NJS = No job summary
REM /NP = No progress

robocopy "content" "quartz\content" /MIR /XD ".git" "node_modules" /XF ".DS_Store" /NFL /NDL /NP

REM robocopy returns 0-7 for success, 8+ for errors
if %ERRORLEVEL% GEQ 8 (
    echo.
    echo [ERROR] Error al sincronizar contenido
    exit /b 1
)

echo.
echo ===============================================================
echo   CONTENIDO SINCRONIZADO EXITOSAMENTE
echo ===============================================================
echo.

REM Count files
echo [INFO] Estadisticas:
for /f %%A in ('dir /s /b "quartz\content\es\*.md" 2^>nul ^| find /c /v ""') do echo   - Espanol: %%A archivos
for /f %%A in ('dir /s /b "quartz\content\en\*.md" 2^>nul ^| find /c /v ""') do echo   - English: %%A archivos
for /f %%A in ('dir /s /b "quartz\content\assets\images\*.*" 2^>nul ^| find /c /v ""') do echo   - Imagenes: %%A archivos

echo.

