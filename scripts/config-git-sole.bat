@echo off
chcp 65001 >nul
echo ========================================
echo ⚙️  Configurar Git para SOLE Colombia
echo ========================================
echo.

echo 📧 Configurando identidad de Git...
echo.

REM Configurar usuario y email
git config user.name "David Vega - SOLE Colombia"
git config user.email "voltaje@solecolombia.org"

echo ✅ Usuario: David Vega - SOLE Colombia
echo ✅ Email: voltaje@solecolombia.org
echo.

echo 🔐 Verificando SSH key...
echo.

REM Verificar si la SSH key existe
if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
    echo ✅ SSH key encontrada: %USERPROFILE%\.ssh\id_ed25519.pub
    echo.
    echo 📋 Tu SSH public key:
    type "%USERPROFILE%\.ssh\id_ed25519.pub"
    echo.
) else (
    echo ⚠️  No se encontró SSH key en la ubicación estándar
    echo.
)

echo 🔗 Verificando conexión con GitHub...
ssh -T git@github.com 2>&1 | findstr /C:"successfully authenticated" >nul
if errorlevel 1 (
    echo.
    echo ⚠️  No se pudo verificar conexión con GitHub
    echo.
    echo 💡 Pasos para agregar tu SSH key en GitHub:
    echo.
    echo 1. Ve a: https://github.com/settings/keys
    echo 2. Click "New SSH key"
    echo 3. Title: SOLE Voltaje - Windows PC
    echo 4. Pega tu key:
    echo    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
    echo 5. Click "Add SSH key"
    echo.
) else (
    echo ✅ Conexión SSH con GitHub exitosa
    echo.
)

echo ========================================
echo ✅ Configuración Completa
echo ========================================
echo.
echo Git está configurado con:
echo   👤 Nombre: David Vega - SOLE Colombia
echo   📧 Email: voltaje@solecolombia.org
echo   🔐 SSH: Configurado para GitHub
echo.
echo 🚀 Siguiente paso: Ejecutar push-to-sole-colombia.bat
echo.

pause

