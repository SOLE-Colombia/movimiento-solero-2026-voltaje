@echo off
chcp 65001 >nul
echo ========================================
echo 🔑 Tu SSH Public Key
echo ========================================
echo.

if exist "%USERPROFILE%\.ssh\sole.pub" (
    echo ✅ Encontrada: %USERPROFILE%\.ssh\sole.pub
    echo.
    echo 📋 Copia esto y pégalo en GitHub:
    echo ========================================
    type "%USERPROFILE%\.ssh\sole.pub"
    echo.
    echo ========================================
    echo.
    echo 🔗 Agrégala en: https://github.com/settings/keys
    echo.
) else if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
    echo ✅ Encontrada: %USERPROFILE%\.ssh\id_ed25519.pub
    echo.
    echo 📋 Copia esto y pégalo en GitHub:
    echo ========================================
    type "%USERPROFILE%\.ssh\id_ed25519.pub"
    echo.
    echo ========================================
    echo.
    echo 🔗 Agrégala en: https://github.com/settings/keys
    echo.
) else (
    echo ❌ No se encontró ninguna SSH key
    echo.
    echo 💡 Genera una nueva con:
    echo    ssh-keygen -t ed25519 -C "voltaje@solecolombia.org"
    echo.
)

pause

