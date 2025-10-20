@echo off
chcp 65001 >nul
echo ========================================
echo 🔄 Cambiar entre Ramas - SOLE Voltaje
echo ========================================
echo.

REM Mostrar rama actual
echo 📍 Rama actual:
git branch --show-current
echo.

REM Verificar cambios pendientes
git diff --quiet
if errorlevel 1 (
    echo ⚠️  Tienes cambios sin guardar
    echo.
    choice /C SGD /M "¿Qué deseas hacer? [S=Save, G=Guardar y cambiar, D=Descartar]"
    if errorlevel 3 (
        echo 🗑️ Descartando cambios...
        git reset --hard
    ) else if errorlevel 2 (
        echo 💾 Guardando cambios...
        set /p COMMIT_MSG="Mensaje del commit: "
        git add .
        git commit -m "%COMMIT_MSG%"
        git push
    ) else (
        goto :select_branch
    )
)

:select_branch
echo.
echo 🌿 Ramas disponibles:
echo.
echo    1. content-editing  (Redacción y contenido)
echo    2. development      (Desarrollo de Quartz)
echo    3. main             (Producción)
echo.
set /p OPTION="Selecciona una rama (1-3): "

if "%OPTION%"=="1" (
    set BRANCH=content-editing
    echo.
    echo ✍️  Cambiando a rama de redacción...
) else if "%OPTION%"=="2" (
    set BRANCH=development
    echo.
    echo 👨‍💻 Cambiando a rama de desarrollo...
) else if "%OPTION%"=="3" (
    set BRANCH=main
    echo.
    echo ⚠️  ADVERTENCIA: Main es rama protegida
    choice /C SN /M "¿Estás seguro"
    if errorlevel 2 goto :end
) else (
    echo ❌ Opción inválida
    goto :select_branch
)

REM Cambiar de rama
git checkout %BRANCH%
if errorlevel 1 (
    echo ❌ Error al cambiar de rama
    goto :end
)

REM Actualizar con cambios remotos
echo.
echo 🔄 Actualizando con cambios remotos...
git pull origin %BRANCH%

echo.
echo ========================================
echo ✅ Ahora estás en rama: %BRANCH%
echo ========================================
echo.

if "%BRANCH%"=="content-editing" (
    echo 📝 Puedes trabajar en:
    echo    - content/es/
    echo    - content/en/
    echo    - content/assets/images/
    echo    - public/downloads/
    echo    - public/videos/
    echo.
    echo ⚠️  NO modifiques código de Quartz
)

if "%BRANCH%"=="development" (
    echo 👨‍💻 Puedes trabajar en:
    echo    - quartz/components/
    echo    - quartz/quartz.config.ts
    echo    - quartz/styles/
    echo    - scripts/
    echo.
    echo 💡 Recuerda mergear contenido desde content-editing
)

if "%BRANCH%"=="main" (
    echo ⚠️  SOLO para revisar o hacer hotfixes críticos
    echo 📝 Normalmente debes hacer PR desde development
)

echo.
echo 💡 Comandos útiles:
echo    git status        - Ver cambios
echo    git add .         - Agregar cambios
echo    git commit -m ""  - Guardar cambios
echo    git push          - Subir a GitHub
echo.

:end
pause

