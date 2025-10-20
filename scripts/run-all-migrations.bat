@echo off
REM Script maestro para ejecutar toda la migración en secuencia (Windows)

echo ======================================================================
echo 🚀 SOLE VOLTAJE - MIGRACIÓN COMPLETA NOTION A QUARTZ
echo ======================================================================
echo.

REM Verificar si Python está instalado
py --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python no está instalado
    exit /b 1
)

REM Instalar dependencias
echo 📦 Instalando dependencias de Python...
py -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias
    exit /b 1
)
echo ✓ Dependencias instaladas
echo.

REM FASE 1: Preparación y Análisis
echo ======================================================================
echo 📊 FASE 1: PREPARACIÓN Y ANÁLISIS
echo ======================================================================
echo.

echo Script 01: Inventario de archivos
py scripts\01-inventory.py
if %errorlevel% neq 0 goto :error

echo Script 02: Análisis de CSVs y metadata
py scripts\02-analyze-csv.py
if %errorlevel% neq 0 goto :error

echo Script 03: Generación de slugs
py scripts\03-slug-mapper.py
if %errorlevel% neq 0 goto :error

echo.
echo ⏸️  Pausa: Revisa los reportes en la carpeta 'reports\'
pause
echo.

REM FASE 2: Transformación de Contenido
echo ======================================================================
echo 🔄 FASE 2: TRANSFORMACIÓN DE CONTENIDO
echo ======================================================================
echo.

echo Script 04: Limpieza de markdown
py scripts\04-clean-markdown.py
if %errorlevel% neq 0 goto :error

echo Script 05: Generación de frontmatter
py scripts\05-generate-frontmatter.py
if %errorlevel% neq 0 goto :error

echo Script 06: Separación por idioma
py scripts\06-split-languages.py
if %errorlevel% neq 0 goto :error

echo.
echo ⏸️  Pausa: Revisa el contenido generado en 'content\'
pause
echo.

REM FASE 3: Optimización de Assets
echo ======================================================================
echo 🖼️  FASE 3: OPTIMIZACIÓN DE ASSETS
echo ======================================================================
echo.

echo Script 07: Optimización de imágenes
py scripts\07-optimize-images.py
if %errorlevel% neq 0 goto :error

echo Script 08: Análisis de videos
py scripts\08-optimize-videos.py
if %errorlevel% neq 0 goto :error

echo Script 09: Gestión de PDFs
py scripts\09-manage-pdfs.py
if %errorlevel% neq 0 goto :error

REM Validación final
echo ======================================================================
echo ✓ VALIDACIÓN FINAL
echo ======================================================================
echo.

echo Script 10: Validación de contenido
py scripts\10-validate.py
if %errorlevel% neq 0 goto :error

REM Resumen final
echo.
echo ======================================================================
echo 🎉 MIGRACIÓN COMPLETADA
echo ======================================================================
echo.
echo ✓ Todos los scripts se ejecutaron correctamente
echo.
echo 📁 Estructura generada:
echo    - content\es\        : Contenido en español
echo    - content\en\        : Contenido en inglés
echo    - content\assets\    : Imágenes optimizadas
echo    - public\downloads\  : PDFs
echo    - reports\           : Reportes de análisis
echo.
echo 📋 Próximos pasos:
echo    1. Revisar reports\validation-errors.txt
echo    2. Copiar 'content\' a 'quartz\content\'
echo    3. Ejecutar 'scripts\dev.bat' para probar localmente
echo.
echo ======================================================================
goto :end

:error
echo.
echo ❌ Error en la ejecución
pause
exit /b 1

:end
pause

