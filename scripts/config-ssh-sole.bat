@echo off
chcp 65001 >nul
echo ========================================
echo 🔐 Configurar SSH Key "sole" para GitHub
echo ========================================
echo.

echo 📁 Verificando tu SSH key...
echo.

REM Verificar si existe la key sole
if exist "%USERPROFILE%\.ssh\sole.pub" (
    echo ✅ Key encontrada: %USERPROFILE%\.ssh\sole.pub
    echo.
    echo 📋 Tu SSH public key es:
    type "%USERPROFILE%\.ssh\sole.pub"
    echo.
) else (
    echo ❌ No se encontró %USERPROFILE%\.ssh\sole.pub
    echo.
    pause
    exit /b 1
)

echo 📝 Creando archivo de configuración SSH...
echo.

REM Crear/actualizar ~/.ssh/config
(
echo # Configuración para GitHub con key "sole"
echo Host github.com
echo     HostName github.com
echo     User git
echo     IdentityFile ~/.ssh/sole
echo     IdentitiesOnly yes
) > "%USERPROFILE%\.ssh\config"

echo ✅ Archivo config creado en: %USERPROFILE%\.ssh\config
echo.

echo 🔐 Configurando permisos (si es necesario en Windows^)...
icacls "%USERPROFILE%\.ssh\sole" /inheritance:r /grant:r "%USERNAME%:F" >nul 2>&1
icacls "%USERPROFILE%\.ssh\sole.pub" /inheritance:r /grant:r "%USERNAME%:F" >nul 2>&1
echo ✅ Permisos configurados
echo.

echo 🧪 Probando conexión con GitHub...
echo.
ssh -T git@github.com 2>&1 | findstr /C:"successfully authenticated" >nul
if errorlevel 1 (
    echo.
    echo ⚠️  Todavía no conecta (es normal si no has agregado la key en GitHub^)
    echo.
    echo 📝 Copia tu SSH public key y agrégala en GitHub:
    echo.
    type "%USERPROFILE%\.ssh\sole.pub"
    echo.
    echo 🔗 Agrégala aquí: https://github.com/settings/keys
    echo    1. Click "New SSH key"
    echo    2. Title: SOLE Voltaje - Windows PC
    echo    3. Pega la key de arriba
    echo    4. Click "Add SSH key"
    echo.
) else (
    echo ✅ ¡SSH funcionando perfectamente con GitHub!
    echo.
)

echo ========================================
echo ✅ Configuración SSH Completa
echo ========================================
echo.
echo SSH está configurado para usar:
echo   🔑 Private key: ~/.ssh/sole
echo   📋 Public key: ~/.ssh/sole.pub
echo   🌐 Host: github.com
echo.
echo 🚀 Siguiente paso:
echo    1. Agregar la key en GitHub (si no lo has hecho)
echo    2. Ejecutar: scripts\push-simple.bat
echo.

pause

