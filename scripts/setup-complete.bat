@echo off
REM Script maestro para configuración completa del proyecto
REM SOLE Voltaje - Fundación SOLE Colombia

:menu
cls
echo ================================================================================
echo   CONFIGURACION COMPLETA - SOLE VOLTAJE
echo   Fundacion SOLE Colombia
echo ================================================================================
echo.
echo   Este asistente te guiara por todos los pasos necesarios para:
echo   - Copiar contenido a Quartz
echo   - Configurar Git y GitHub
echo   - Hacer el primer deploy
echo   - Configurar Docker
echo.
echo ================================================================================
echo   MENU PRINCIPAL
echo ================================================================================
echo.
echo   1. Copiar contenido a Quartz
echo   2. Inicializar Git y conectar con GitHub
echo   3. Hacer primer commit y push
echo   4. Probar localmente (desarrollo)
echo   5. Construir para produccion
echo   6. Probar con Docker
echo   7. Ver guia completa (GUIA_DEPLOY.md)
echo   8. Ver estado del proyecto
echo   9. Salir
echo.
echo ================================================================================
echo.

set /p OPTION="Selecciona una opcion (1-9): "

if "%OPTION%"=="1" goto :copy_content
if "%OPTION%"=="2" goto :init_git
if "%OPTION%"=="3" goto :first_push
if "%OPTION%"=="4" goto :dev_server
if "%OPTION%"=="5" goto :build_prod
if "%OPTION%"=="6" goto :docker_test
if "%OPTION%"=="7" goto :show_guide
if "%OPTION%"=="8" goto :show_status
if "%OPTION%"=="9" goto :exit
goto :menu

:copy_content
cls
echo ================================================================================
echo   PASO 1: COPIAR CONTENIDO A QUARTZ
echo ================================================================================
echo.
call scripts\copy-to-quartz.bat
if errorlevel 1 (
    echo.
    echo Hubo un error al copiar el contenido.
    pause
    goto :menu
)
echo.
echo EXITO: Contenido copiado correctamente!
echo.
pause
goto :menu

:init_git
cls
echo ================================================================================
echo   PASO 2: INICIALIZAR GIT
echo ================================================================================
echo.
call scripts\init-git.bat
if errorlevel 1 (
    echo.
    echo Hubo un error al inicializar Git.
    pause
    goto :menu
)
echo.
echo EXITO: Git configurado correctamente!
echo.
pause
goto :menu

:first_push
cls
echo ================================================================================
echo   PASO 3: PRIMER COMMIT Y PUSH
echo ================================================================================
echo.

REM Verificar que Git esté inicializado
if not exist ".git" (
    echo ERROR: Git no esta inicializado.
    echo Ejecuta primero la opcion 2.
    pause
    goto :menu
)

call scripts\first-push.bat
if errorlevel 1 (
    echo.
    echo Hubo un error al hacer push.
    pause
    goto :menu
)
echo.
echo EXITO: Codigo subido a GitHub!
echo.
pause
goto :menu

:dev_server
cls
echo ================================================================================
echo   PASO 4: SERVIDOR DE DESARROLLO
echo ================================================================================
echo.

REM Verificar que Quartz tenga contenido
if not exist "quartz\content\es" (
    echo ERROR: No se encuentra el contenido en Quartz.
    echo Ejecuta primero la opcion 1.
    pause
    goto :menu
)

REM Verificar node_modules
if not exist "quartz\node_modules" (
    echo Node modules no encontrados. Instalando dependencias...
    echo.
    cd quartz
    call npm install
    cd ..
    echo.
)

echo Iniciando servidor de desarrollo...
echo.
echo El sitio estara disponible en: http://localhost:8080
echo.
echo Presiona Ctrl+C para detener el servidor.
echo.
cd quartz
call npx quartz build --serve
cd ..
pause
goto :menu

:build_prod
cls
echo ================================================================================
echo   PASO 5: CONSTRUIR PARA PRODUCCION
echo ================================================================================
echo.

REM Verificar que Quartz tenga contenido
if not exist "quartz\content\es" (
    echo ERROR: No se encuentra el contenido en Quartz.
    echo Ejecuta primero la opcion 1.
    pause
    goto :menu
)

echo Construyendo sitio para produccion...
echo.
cd quartz
call npx quartz build
cd ..

if errorlevel 1 (
    echo.
    echo ERROR en el build.
    pause
    goto :menu
)

echo.
echo ================================================================================
echo   BUILD EXITOSO!
echo ================================================================================
echo.
echo   Los archivos estaticos estan en: quartz\public\
echo.
echo   Para probar localmente, puedes usar un servidor HTTP simple:
echo     cd quartz\public
echo     python -m http.server 8000
echo.
echo   Luego visita: http://localhost:8000
echo.
echo ================================================================================
echo.
pause
goto :menu

:docker_test
cls
echo ================================================================================
echo   PASO 6: PROBAR CON DOCKER
echo ================================================================================
echo.

REM Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no esta instalado o no esta en el PATH.
    echo.
    echo Descarga Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    goto :menu
)

echo [OK] Docker esta instalado
echo.
echo Opciones de Docker:
echo   1. Desarrollo (con hot-reload)
echo   2. Produccion (build optimizado)
echo   3. Volver
echo.
set /p DOCKER_OPT="Selecciona una opcion (1-3): "

if "%DOCKER_OPT%"=="1" (
    echo.
    echo Iniciando contenedor de desarrollo...
    echo El sitio estara en: http://localhost:8080
    echo.
    docker-compose up dev
) else if "%DOCKER_OPT%"=="2" (
    echo.
    echo Construyendo imagen de produccion...
    echo.
    docker-compose up build
) else (
    goto :menu
)

pause
goto :menu

:show_guide
cls
echo ================================================================================
echo   GUIA COMPLETA DE DEPLOY
echo ================================================================================
echo.
echo Abriendo GUIA_DEPLOY.md...
echo.
start GUIA_DEPLOY.md
echo.
echo Si no se abrio automaticamente, busca el archivo: GUIA_DEPLOY.md
echo.
pause
goto :menu

:show_status
cls
echo ================================================================================
echo   ESTADO DEL PROYECTO
echo ================================================================================
echo.

REM Verificar estructura
echo ESTRUCTURA DE ARCHIVOS:
echo.
if exist "content\es" (
    echo   [OK] content\es\
) else (
    echo   [X] content\es\ - NO ENCONTRADO
)

if exist "content\en" (
    echo   [OK] content\en\
) else (
    echo   [X] content\en\ - NO ENCONTRADO
)

if exist "content\assets\images" (
    echo   [OK] content\assets\images\
) else (
    echo   [X] content\assets\images\ - NO ENCONTRADO
)

if exist "quartz" (
    echo   [OK] quartz\
    
    if exist "quartz\content\es" (
        echo   [OK] quartz\content\es\ - CONTENIDO COPIADO
    ) else (
        echo   [!] quartz\content\es\ - FALTA COPIAR CONTENIDO
    )
    
    if exist "quartz\node_modules" (
        echo   [OK] quartz\node_modules\ - DEPENDENCIAS INSTALADAS
    ) else (
        echo   [!] quartz\node_modules\ - FALTA INSTALAR (npm install)
    )
) else (
    echo   [X] quartz\ - NO ENCONTRADO
    echo       Clona Quartz: git clone https://github.com/jackyzha0/quartz.git
)

echo.
echo GIT:
echo.
if exist ".git" (
    echo   [OK] Repositorio Git inicializado
    
    git remote get-url origin >nul 2>&1
    if not errorlevel 1 (
        for /f "delims=" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
        echo   [OK] Remote configurado: !REMOTE_URL!
        
        git branch --show-current >nul 2>&1
        if not errorlevel 1 (
            for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
            echo   [OK] Rama actual: !CURRENT_BRANCH!
        )
    ) else (
        echo   [!] Sin remote configurado
    )
) else (
    echo   [X] Git no inicializado
    echo       Ejecuta: scripts\init-git.bat
)

echo.
echo DOCKER:
echo.
docker --version >nul 2>&1
if not errorlevel 1 (
    echo   [OK] Docker instalado
) else (
    echo   [X] Docker no instalado
)

echo.
echo SCRIPTS DISPONIBLES:
echo.
echo   - scripts\copy-to-quartz.bat     : Copiar contenido a Quartz
echo   - scripts\init-git.bat           : Inicializar Git
echo   - scripts\first-push.bat         : Primer push a GitHub
echo   - scripts\dev.bat                : Servidor de desarrollo
echo   - scripts\build.bat              : Build de produccion
echo   - scripts\docker-dev.bat         : Docker desarrollo
echo   - scripts\docker-build.bat       : Docker produccion
echo.
echo DOCUMENTACION:
echo.
echo   - README.md                      : Documentacion principal
echo   - GUIA_DEPLOY.md                 : Guia de deploy completa
echo   - INICIO_RAPIDO.md               : Guia rapida
echo   - QUARTZ_CONFIG.md               : Configuracion de Quartz
echo.
echo ================================================================================
echo.
pause
goto :menu

:exit
cls
echo.
echo ================================================================================
echo   GRACIAS POR USAR EL ASISTENTE DE CONFIGURACION
echo   SOLE Voltaje - Fundacion SOLE Colombia
echo ================================================================================
echo.
echo   Recursos utiles:
echo   - Guia completa: GUIA_DEPLOY.md
echo   - Documentacion: README.md
echo   - Soporte: hola@solecolombia.org
echo.
echo   Cambiando el mundo juntos, una gran pregunta a la vez
echo.
echo ================================================================================
echo.
exit /b 0

