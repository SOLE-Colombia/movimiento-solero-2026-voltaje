@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Inicialización de Git para Organización
echo ========================================
echo.

REM Verificar si ya existe repositorio git
if exist .git (
    echo ✅ Ya existe un repositorio Git en esta carpeta
    echo.
    choice /C SN /M "¿Deseas continuar de todas formas"
    if errorlevel 2 goto :end
    echo.
) else (
    echo 📁 Inicializando repositorio Git...
    git init
    echo ✅ Repositorio Git inicializado
    echo.
)

REM Solicitar nombre de la organización
echo 📝 Configuración del repositorio remoto
echo.
set /p ORG_NAME="Nombre de tu organización en GitHub: "
set /p REPO_NAME="Nombre del repositorio (por defecto: sole-voltaje): "
if "%REPO_NAME%"=="" set REPO_NAME=sole-voltaje

echo.
echo 🔗 URL del repositorio será:
echo    https://github.com/%ORG_NAME%/%REPO_NAME%.git
echo.
choice /C SN /M "¿Es correcto"
if errorlevel 2 goto :end

REM Agregar remote origin
echo.
echo 🔗 Configurando remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/%ORG_NAME%/%REPO_NAME%.git
if errorlevel 1 (
    echo ❌ Error al configurar remote
    goto :end
)
echo ✅ Remote configurado correctamente
echo.

REM Verificar archivos a subir
echo 📋 Verificando archivos a subir...
echo.
git status --short
echo.
echo ⚠️  Asegúrate de que:
echo    - temp/ NO aparece en la lista
echo    - reports/ NO aparece en la lista
echo    - node_modules/ NO aparece en la lista
echo.
choice /C SN /M "¿Los archivos se ven correctos"
if errorlevel 2 goto :end

REM Agregar archivos
echo.
echo 📦 Agregando archivos al staging...
git add .
echo ✅ Archivos agregados
echo.

REM Crear commit inicial
echo 📝 Creando commit inicial...
git commit -m "🚀 Initial commit: Migración completa de SOLE Voltaje desde Notion a Quartz v4" -m "Incluye:" -m "- Contenido bilingüe (ES/EN)" -m "- Imágenes optimizadas WebP" -m "- Scripts de migración" -m "- Configuración de Quartz" -m "- Docker y CI/CD"
if errorlevel 1 (
    echo ❌ Error al crear commit
    goto :end
)
echo ✅ Commit creado
echo.

REM Cambiar a rama main
echo 🌿 Configurando rama main...
git branch -M main
echo ✅ Rama main configurada
echo.

REM Push a GitHub
echo 🚀 Subiendo a GitHub...
echo ⚠️  Se te pedirá autenticación de GitHub
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ Error al hacer push
    echo.
    echo 💡 Posibles soluciones:
    echo    1. Verifica que el repositorio existe en GitHub
    echo    2. Usa un Personal Access Token en vez de contraseña
    echo    3. Configura SSH keys
    echo.
    goto :end
)

echo.
echo ✅ Push exitoso a rama main
echo.

REM Crear y subir rama development
echo 🌿 Creando rama development...
git checkout -b development
git push -u origin development
echo ✅ Rama development creada y subida
echo.

REM Crear y subir rama content-editing
echo 🌿 Creando rama content-editing...
git checkout -b content-editing
git push -u origin content-editing
echo ✅ Rama content-editing creada y subida
echo.

REM Volver a development
git checkout development

echo.
echo ========================================
echo ✅ ¡CONFIGURACIÓN COMPLETADA!
echo ========================================
echo.
echo 📊 Resumen:
echo    ✅ Repositorio: https://github.com/%ORG_NAME%/%REPO_NAME%
echo    ✅ Rama main: Configurada
echo    ✅ Rama development: Configurada
echo    ✅ Rama content-editing: Configurada
echo.
echo 📝 Próximos pasos:
echo.
echo 1. Ve a GitHub.com y verifica que todo se subió correctamente
echo.
echo 2. Configura protección de ramas:
echo    Settings → Branches → Add rule
echo.
echo 3. Activa GitHub Pages:
echo    Settings → Pages → Source: GitHub Actions
echo.
echo 4. Revisa el workflow de deploy:
echo    Actions → Deploy SOLE Voltaje
echo.
echo 5. Lee la guía completa:
echo    GUIA_GIT_ORGANIZACION.md
echo.
echo ========================================
echo 🎉 ¡LISTO PARA EMPEZAR A TRABAJAR!
echo ========================================
echo.

:end
pause

