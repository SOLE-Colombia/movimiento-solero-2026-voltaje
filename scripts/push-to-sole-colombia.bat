@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Push a SOLE-Colombia/dev_voltaje
echo ========================================
echo.
echo 📍 Repositorio: SOLE-Colombia/dev_voltaje
echo 🔗 URL: git@github.com:SOLE-Colombia/dev_voltaje.git
echo.

REM Verificar si ya existe repositorio git
if not exist .git (
    echo 📁 Inicializando repositorio Git...
    git init
    echo ✅ Repositorio Git inicializado
    echo.
)

REM Verificar si ya existe el remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Configurando remote origin...
    git remote add origin git@github.com:SOLE-Colombia/dev_voltaje.git
    echo ✅ Remote configurado
) else (
    echo ℹ️  Remote origin ya existe
    git remote get-url origin
    echo.
    choice /C SN /M "¿Deseas reconfigurar el remote"
    if not errorlevel 2 (
        git remote remove origin
        git remote add origin git@github.com:SOLE-Colombia/dev_voltaje.git
        echo ✅ Remote reconfigurado
    )
)
echo.

REM Configurar Git user si no está configurado
git config user.name >nul 2>&1
if errorlevel 1 (
    echo 📧 Configurando identidad de Git...
    git config user.name "David Vega - SOLE Colombia"
    git config user.email "voltaje@solecolombia.org"
    echo ✅ Git configurado con: voltaje@solecolombia.org
    echo.
)

REM Verificar SSH
echo 🔐 Verificando conexión SSH con GitHub...
ssh -T git@github.com 2>&1 | findstr /C:"successfully authenticated" >nul
if errorlevel 1 (
    echo.
    echo ⚠️  Tu SSH key necesita estar agregada en GitHub
    echo.
    echo 📝 Tu SSH public key:
    echo    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
    echo.
    echo 🔗 Agrégala en: https://github.com/settings/keys
    echo    1. Click "New SSH key"
    echo    2. Title: SOLE Voltaje - Windows PC
    echo    3. Pega la key de arriba
    echo    4. Click "Add SSH key"
    echo.
    echo 💡 Alternativa: Usar HTTPS (requiere token cada vez)
    echo.
    choice /C SN /M "¿Deseas cambiar a HTTPS"
    if not errorlevel 2 (
        git remote remove origin
        git remote add origin https://github.com/SOLE-Colombia/dev_voltaje.git
        echo ✅ Cambiado a HTTPS
    )
    echo.
) else (
    echo ✅ SSH conectado correctamente a GitHub
    echo.
)

REM Mostrar archivos que se van a subir
echo 📋 Archivos que se van a subir...
echo.
git status --short
echo.
echo ⚠️  Verifica que NO aparezcan:
echo    - temp/
echo    - reports/
echo    - node_modules/
echo.
choice /C SN /M "¿Los archivos se ven correctos"
if errorlevel 2 goto :end

REM Verificar si es primera vez o actualización
git rev-parse --verify main >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🎯 Primera subida detectada - Se creará todo desde cero
    goto :first_push
) else (
    echo.
    echo 🔄 Repositorio existente - Se hará actualización
    goto :update_push
)

:first_push
echo.
echo ========================================
echo 📦 PRIMERA SUBIDA A GITHUB
echo ========================================
echo.

REM Agregar archivos
echo 📦 Agregando archivos...
git add .
echo ✅ Archivos agregados
echo.

REM Crear commit inicial
echo 📝 Creando commit inicial...
git commit -m "🚀 Initial commit: SOLE Voltaje - Sitio web bilingüe" -m "Migración completa desde Notion a Quartz v4" -m "" -m "Incluye:" -m "- Contenido bilingüe (ES/EN)" -m "- Imágenes optimizadas WebP" -m "- Scripts de migración" -m "- Configuración de Quartz" -m "- Docker y CI/CD" -m "- Documentación completa" -m "" -m "Repositorio: SOLE-Colombia/dev_voltaje"
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
echo ⚠️  Asegúrate de tener acceso al repositorio SOLE-Colombia/dev_voltaje
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ Error al hacer push
    echo.
    echo 💡 Posibles soluciones:
    echo    1. Verifica que tienes acceso al repo SOLE-Colombia/dev_voltaje
    echo    2. Si usas SSH, verifica tus keys SSH
    echo    3. Si usas HTTPS, usa un Personal Access Token
    echo    4. Verifica que eres miembro de la organización SOLE-Colombia
    echo.
    goto :end
)
echo.
echo ✅ Push exitoso a rama main
echo.

REM Crear rama development
echo 🌿 Creando rama development...
git checkout -b development
git push -u origin development
if errorlevel 1 (
    echo ⚠️  Error al subir rama development
) else (
    echo ✅ Rama development creada y subida
)
echo.

REM Crear rama content-editing
echo 🌿 Creando rama content-editing...
git checkout -b content-editing
git push -u origin content-editing
if errorlevel 1 (
    echo ⚠️  Error al subir rama content-editing
) else (
    echo ✅ Rama content-editing creada y subida
)
echo.

REM Volver a development
git checkout development

echo.
echo ========================================
echo ✅ ¡PRIMERA SUBIDA COMPLETADA!
echo ========================================
echo.
goto :success

:update_push
echo.
echo ========================================
echo 🔄 ACTUALIZACIÓN DE REPOSITORIO
echo ========================================
echo.

REM Verificar rama actual
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo 📍 Rama actual: %CURRENT_BRANCH%
echo.

REM Verificar cambios
git diff --quiet
if errorlevel 1 (
    echo 📝 Hay cambios pendientes
    echo.
    set /p COMMIT_MSG="Mensaje del commit: "
    
    git add .
    git commit -m "%COMMIT_MSG%"
    if errorlevel 1 (
        echo ❌ Error al crear commit
        goto :end
    )
    echo ✅ Commit creado
    echo.
) else (
    echo ℹ️  No hay cambios pendientes
    echo.
    choice /C SN /M "¿Deseas hacer push de todas formas"
    if errorlevel 2 goto :end
)

REM Push
echo 🚀 Subiendo a GitHub...
git push
if errorlevel 1 (
    echo ❌ Error al hacer push
    goto :end
)
echo ✅ Push exitoso
echo.

:success
echo ========================================
echo ✅ ¡ÉXITO!
echo ========================================
echo.
echo 📊 Resumen:
echo    ✅ Repositorio: SOLE-Colombia/dev_voltaje
echo    ✅ URL: https://github.com/SOLE-Colombia/dev_voltaje
echo.
echo 📝 Próximos pasos en GitHub.com:
echo.
echo 1. Configurar protección de ramas:
echo    https://github.com/SOLE-Colombia/dev_voltaje/settings/branches
echo    - Proteger main (require PR)
echo    - Proteger development (require PR)
echo.
echo 2. Activar GitHub Pages:
echo    https://github.com/SOLE-Colombia/dev_voltaje/settings/pages
echo    - Source: GitHub Actions
echo.
echo 3. Verificar el workflow:
echo    https://github.com/SOLE-Colombia/dev_voltaje/actions
echo.
echo 4. Agregar colaboradores:
echo    https://github.com/SOLE-Colombia/dev_voltaje/settings/access
echo.
echo ========================================
echo 🎉 ¡TODO LISTO!
echo ========================================
echo.

:end
pause

