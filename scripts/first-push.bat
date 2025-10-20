@echo off
REM Script para hacer el primer push a GitHub
REM SOLE Voltaje - Fundación SOLE Colombia

echo ================================================================================
echo   PRIMER COMMIT Y PUSH A GITHUB
echo ================================================================================
echo.

REM Verificar que Git está inicializado
if not exist ".git" (
    echo ERROR: Git no esta inicializado
    echo.
    echo Ejecuta primero: scripts\init-git.bat
    echo.
    pause
    exit /b 1
)

REM Verificar que hay remote configurado
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ERROR: No hay remote configurado
    echo.
    echo Ejecuta primero: scripts\init-git.bat
    echo.
    pause
    exit /b 1
)

echo [OK] Git configurado correctamente
echo.

echo ================================================================================
echo   PASO 1: VERIFICAR ARCHIVOS
echo ================================================================================
echo.

echo Archivos que se van a incluir en el commit:
echo.
git status --short
echo.

set /p CONTINUE="Estos archivos se ven correctos? (S/N): "
if /i not "%CONTINUE%"=="S" (
    echo.
    echo Revisa el archivo .gitignore si hay archivos que no quieres incluir.
    echo.
    pause
    exit /b 0
)

echo.

echo ================================================================================
echo   PASO 2: AGREGAR ARCHIVOS AL STAGING
echo ================================================================================
echo.

git add .
if errorlevel 1 (
    echo ERROR al agregar archivos
    pause
    exit /b 1
)

echo [OK] Archivos agregados
echo.

REM Mostrar resumen
for /f %%i in ('git diff --cached --numstat ^| find /c /v ""') do set FILES_COUNT=%%i
echo   Archivos en staging: %FILES_COUNT%
echo.

echo ================================================================================
echo   PASO 3: CREAR COMMIT
echo ================================================================================
echo.

echo Mensaje de commit por defecto:
echo.
echo "feat: Migracion inicial SOLE Voltaje de Notion a Quartz v4
echo.
echo - Estructura bilingue (es/en)
echo - Imagenes optimizadas a WebP
echo - Videos en formato WebM
echo - PDFs organizados
echo - Scripts de migracion completos
echo - Configuracion de Quartz personalizada
echo - Docker configurado
echo - CI/CD con GitHub Actions"
echo.

set /p CUSTOM_MSG="Usar este mensaje? (S/N): "

if /i "%CUSTOM_MSG%"=="S" (
    git commit -m "feat: Migracion inicial SOLE Voltaje de Notion a Quartz v4" -m "- Estructura bilingue (es/en)" -m "- Imagenes optimizadas a WebP" -m "- Videos en formato WebM" -m "- PDFs organizados" -m "- Scripts de migracion completos" -m "- Configuracion de Quartz personalizada" -m "- Docker configurado" -m "- CI/CD con GitHub Actions"
) else (
    echo.
    set /p COMMIT_MSG="Mensaje de commit (una linea): "
    git commit -m "%COMMIT_MSG%"
)

if errorlevel 1 (
    echo ERROR al crear commit
    pause
    exit /b 1
)

echo [OK] Commit creado
echo.

echo ================================================================================
echo   PASO 4: PUSH A GITHUB
echo ================================================================================
echo.

for /f "delims=" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
echo Subiendo a: %REMOTE_URL%
echo.

echo Esto puede tomar varios minutos dependiendo del tamano del proyecto...
echo.

git push -u origin main
if errorlevel 1 (
    echo.
    echo ERROR al hacer push
    echo.
    echo Posibles soluciones:
    echo   1. Verifica tu conexion a Internet
    echo   2. Asegurate de tener permisos en el repositorio
    echo   3. Si es la primera vez, puede que necesites autenticarte
    echo.
    echo Para autenticarte en GitHub desde la linea de comandos:
    echo   - Usa GitHub CLI: gh auth login
    echo   - O configura un Personal Access Token
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Push exitoso!
echo.

echo ================================================================================
echo   EXITO!
echo ================================================================================
echo.
echo   Tu proyecto esta ahora en GitHub: %REMOTE_URL%
echo.
echo   Visita tu repositorio para:
echo   - Ver los archivos
echo   - Configurar GitHub Pages
echo   - Activar GitHub Actions
echo   - Invitar colaboradores
echo.
echo ================================================================================
echo   PROXIMOS PASOS
echo ================================================================================
echo.
echo   1. CONFIGURAR GITHUB PAGES:
echo      - Ve a Settings ^> Pages
echo      - Source: GitHub Actions
echo      - Guarda los cambios
echo.
echo   2. HABILITAR GITHUB ACTIONS:
echo      - Ve a Actions
echo      - Activa los workflows
echo      - El deploy se hara automaticamente
echo.
echo   3. VERIFICAR EL SITIO:
echo      Tu sitio estara disponible en aproximadamente 2-3 minutos en:
echo      https://TU-USUARIO.github.io/sole-voltaje/
echo.
echo   4. SEGUIR TRABAJANDO:
echo      Ver GUIA_DEPLOY.md para el workflow diario
echo.
echo ================================================================================
echo.

pause




