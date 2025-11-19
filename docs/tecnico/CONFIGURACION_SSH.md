# 🔐 Guía de Configuración SSH

Esta guía te ayudará a configurar SSH para trabajar con GitHub sin necesidad de escribir contraseñas cada vez que hagas `git push` o `git pull`.

---

## 🎯 ¿Por qué SSH?

✅ **No más contraseñas:** Autentica automáticamente.  
✅ **Más seguro:** Usa criptografía de clave pública.  
✅ **Más rápido:** Conexiones directas sin pasos intermedios.

---

## 📋 Paso a Paso por Sistema Operativo

Elige tu sistema operativo y sigue los pasos:

*   [🪟 Windows](#windows)
*   [🍎 macOS](#macos)
*   [🐧 Linux](#linux)

---

<a name="windows"></a>
## 🪟 Windows

### Paso 1: Verificar si ya tienes una llave SSH

Abre **PowerShell** y ejecuta:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

**¿Qué esperar?**
*   ✅ Si ves un texto largo que empieza con `ssh-ed25519 AAAA...` → **Ya tienes llave. Salta al [Paso 3](#windows-paso3).**
*   ❌ Si ves un error "no se encuentra el archivo" → **Continúa al Paso 2.**

---

### Paso 2: Generar una nueva llave SSH

En PowerShell, ejecuta:

```powershell
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```

*Reemplaza `tu-email@ejemplo.com` con tu email de GitHub.*

**Preguntas que te hará:**

1.  **"Enter file in which to save the key"**  
    → Presiona `Enter` (usa la ubicación por defecto).

2.  **"Enter passphrase"**  
    → Presiona `Enter` dos veces (sin contraseña, más fácil para desarrollo local).

**✅ Resultado:** Verás un mensaje de confirmación y un "arte ASCII" de tu llave.

---

<a name="windows-paso3"></a>
### Paso 3: Copiar tu llave pública

Ejecuta este comando para copiar tu llave al portapapeles:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | clip
```

*Tu llave ya está copiada. Continúa al [Paso 4](#agregar-github).*

---

<a name="macos"></a>
## 🍎 macOS

### Paso 1: Verificar si ya tienes una llave SSH

Abre **Terminal** y ejecuta:

```bash
cat ~/.ssh/id_ed25519.pub
```

**¿Qué esperar?**
*   ✅ Si ves un texto largo que empieza con `ssh-ed25519 AAAA...` → **Ya tienes llave. Salta al [Paso 3](#macos-paso3).**
*   ❌ Si ves "No such file or directory" → **Continúa al Paso 2.**

---

### Paso 2: Generar una nueva llave SSH

En Terminal, ejecuta:

```bash
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```

*Reemplaza `tu-email@ejemplo.com` con tu email de GitHub.*

**Preguntas que te hará:**

1.  **"Enter file in which to save the key"**  
    → Presiona `Enter` (usa la ubicación por defecto).

2.  **"Enter passphrase"**  
    → Presiona `Enter` dos veces (sin contraseña).

**✅ Resultado:** Tu llave se habrá creado.

---

<a name="macos-paso3"></a>
### Paso 3: Copiar tu llave pública

Ejecuta este comando para copiar tu llave al portapapeles:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

*Tu llave ya está copiada. Continúa al [Paso 4](#agregar-github).*

---

<a name="linux"></a>
## 🐧 Linux

### Paso 1: Verificar si ya tienes una llave SSH

Abre tu **Terminal** y ejecuta:

```bash
cat ~/.ssh/id_ed25519.pub
```

**¿Qué esperar?**
*   ✅ Si ves un texto largo que empieza con `ssh-ed25519 AAAA...` → **Ya tienes llave. Salta al [Paso 3](#linux-paso3).**
*   ❌ Si ves "No such file or directory" → **Continúa al Paso 2.**

---

### Paso 2: Generar una nueva llave SSH

En Terminal, ejecuta:

```bash
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```

*Reemplaza `tu-email@ejemplo.com` con tu email de GitHub.*

**Preguntas que te hará:**

1.  **"Enter file in which to save the key"**  
    → Presiona `Enter` (usa la ubicación por defecto).

2.  **"Enter passphrase"**  
    → Presiona `Enter` dos veces (sin contraseña).

**✅ Resultado:** Tu llave se habrá creado.

---

<a name="linux-paso3"></a>
### Paso 3: Copiar tu llave pública

Ejecuta este comando para ver tu llave:

```bash
cat ~/.ssh/id_ed25519.pub
```

**Selecciona TODO el texto que aparece** (empieza con `ssh-ed25519 AAAA...`) y cópialo con `Ctrl + Shift + C`.

*Tu llave ya está copiada. Continúa al [Paso 4](#agregar-github).*

---

<a name="agregar-github"></a>
## 🌐 Paso 4: Agregar la Llave a GitHub

Este paso es **igual para todos los sistemas operativos**.

1.  **Abre tu navegador** y ve a: [https://github.com/settings/keys](https://github.com/settings/keys)

2.  **Haz clic en el botón verde** "New SSH key".

3.  **Llena el formulario:**
    *   **Title:** Ponle un nombre descriptivo (ej: "Mi Laptop Windows", "MacBook Pro Personal", "PC Linux Trabajo").
    *   **Key:** Pega la llave que copiaste (`Ctrl + V` o `Cmd + V`).

4.  **Haz clic en** "Add SSH key".

5.  **Confirma con tu contraseña de GitHub** si te lo pide.

✅ **¡Listo! Tu llave SSH está agregada.**

---

## ✅ Paso 5: Probar la Conexión

Ejecuta este comando en tu terminal:

**Windows (PowerShell):**
```powershell
ssh -T git@github.com
```

**macOS / Linux:**
```bash
ssh -T git@github.com
```

**¿Qué esperar?**

La primera vez, verás algo como:
```
The authenticity of host 'github.com (...)' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

→ Escribe `yes` y presiona `Enter`.

**Resultado exitoso:**
```
Hi TU-USUARIO! You've successfully authenticated, but GitHub does not provide shell access.
```

✅ **¡Perfecto! SSH está funcionando.**

---

## 🚨 Solución de Problemas

### ❌ Error: "Permission denied (publickey)"

**Causa:** Tu llave no está en GitHub o no se está usando la llave correcta.

**Solución:**
1.  Verifica que agregaste la llave a GitHub (repite el Paso 4).
2.  En Windows, asegúrate de que el servicio "OpenSSH Authentication Agent" esté corriendo:
    *   Busca "Servicios" en el menú Inicio.
    *   Busca "OpenSSH Authentication Agent".
    *   Clic derecho > Iniciar (si está detenido).

---

### ❌ Error: "Could not open a connection to your authentication agent"

**Solución (Windows):**
```powershell
# En PowerShell como Administrador
Start-Service ssh-agent
```

**Solución (macOS/Linux):**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

### ❌ Git sigue pidiendo contraseña

**Causa:** Tu repositorio está usando HTTPS en lugar de SSH.

**Solución:** Cambiar la URL del remote a SSH.

```bash
# Ver la URL actual
git remote -v

# Si ves https://github.com/... cámbiala por SSH:
git remote set-url origin git@github.com:USUARIO/REPOSITORIO.git
```

*Reemplaza `USUARIO` y `REPOSITORIO` con los valores de tu proyecto.*

---

## 📚 Resumen

| Paso | Descripción |
| :--- | :--- |
| 1 | Verificar si ya tienes llave SSH |
| 2 | Generar llave nueva (si es necesario) |
| 3 | Copiar llave pública |
| 4 | Agregar llave a GitHub |
| 5 | Probar conexión |

---

## 🎉 ¡Listo!

Ahora puedes hacer `git push` y `git pull` sin escribir contraseñas. Todo se autentica automáticamente con tu llave SSH.

**Siguiente paso:** Vuelve a la guía principal de desarrollo en [COMO_TRABAJAR_CORRECTAMENTE.md](./COMO_TRABAJAR_CORRECTAMENTE.md).

---

*¿Necesitas ayuda? Contacta al equipo técnico o abre un issue en GitHub.*
