# 🔐 Solución: SSH Key con Nombre Personalizado "sole"

## 🎯 El Problema

Tu SSH key se llama **`sole`** y **`sole.pub`**, pero Git/SSH está buscando los nombres estándar **`id_ed25519`** y **`id_ed25519.pub`**.

Por eso sale: `Permission denied (publickey)`

---

## ✅ Solución Automática (30 segundos)

### Ejecuta este script:

```powershell
.\scripts\config-ssh-sole.bat
```

Este script:
1. ✅ Verifica que `sole.pub` existe
2. ✅ Crea archivo `~/.ssh/config` que le dice a SSH usar la key `sole` para GitHub
3. ✅ Prueba la conexión
4. ✅ Te muestra tu public key para copiar

---

## 📋 Después del Script

### 1. Copia tu SSH Public Key

El script te mostrará algo como:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
```

### 2. Agrégala en GitHub

1. Ve a: **https://github.com/settings/keys**
2. Click **"New SSH key"**
3. Title: `SOLE Voltaje - Windows PC`
4. Key: Pega lo que copiaste
5. Click **"Add SSH key"**

### 3. Verifica

```powershell
ssh -T git@github.com
```

Deberías ver:
```
Hi [tu-usuario]! You've successfully authenticated...
```

### 4. Sube a GitHub

```powershell
.\scripts\push-simple.bat
```

---

## 🔧 Solución Manual (si prefieres hacerlo a mano)

### Crear archivo SSH config

En PowerShell:

```powershell
# Crear el archivo config
notepad $env:USERPROFILE\.ssh\config
```

Agregar este contenido:

```
# Configuración para GitHub con key "sole"
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/sole
    IdentitiesOnly yes
```

Guardar y cerrar.

### Ver tu public key

```powershell
cat $env:USERPROFILE\.ssh\sole.pub
```

Copiar y pegar en GitHub.

---

## 🎯 ¿Por qué pasó esto?

Las SSH keys tienen nombres estándar que SSH busca automáticamente:
- `id_rsa` / `id_rsa.pub` (antiguo)
- `id_ed25519` / `id_ed25519.pub` (moderno)
- `id_ecdsa` / `id_ecdsa.pub`

Tu key se llama `sole` / `sole.pub` (personalizado), entonces SSH no la encuentra automáticamente.

**Solución**: Crear archivo `~/.ssh/config` que le diga a SSH:
- "Para github.com, usa la key `sole`"

---

## 📁 Ubicación de tus Keys

```
C:\Users\David Vega\.ssh\
├── sole          ← Private key (NO compartir)
├── sole.pub      ← Public key (la que agregas en GitHub)
└── config        ← Configuración (creada por el script)
```

---

## 🔍 Verificar Configuración

### Ver el archivo config

```powershell
cat $env:USERPROFILE\.ssh\config
```

Debería mostrar:

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/sole
    IdentitiesOnly yes
```

### Probar SSH

```powershell
# Con verbose para ver qué key usa
ssh -vT git@github.com
```

Deberías ver en el output:
```
debug1: Will attempt key: C:\\Users\\David Vega/.ssh/sole
```

---

## ✅ Checklist Completo

- [ ] Ejecutar `.\scripts\config-ssh-sole.bat`
- [ ] Verificar que muestra tu public key
- [ ] Copiar la public key
- [ ] Ir a https://github.com/settings/keys
- [ ] Agregar nueva SSH key
- [ ] Pegar la key copiada
- [ ] Ejecutar `ssh -T git@github.com`
- [ ] Ver mensaje "successfully authenticated"
- [ ] Ejecutar `.\scripts\push-simple.bat`
- [ ] ✅ ¡Código en GitHub!

---

## 🆘 Si Sigue sin Funcionar

### Ver qué keys tienes

```powershell
dir $env:USERPROFILE\.ssh\
```

### Ver contenido de sole.pub

```powershell
cat $env:USERPROFILE\.ssh\sole.pub
```

### Probar con verbose

```powershell
ssh -vvv git@github.com 2>&1 | Select-String "Offering"
```

Esto te muestra qué keys está intentando usar.

---

## 🎉 Resultado Final

Después de configurar correctamente:

```powershell
PS> ssh -T git@github.com
Hi SOLE-Colombia! You've successfully authenticated, but GitHub does not provide shell access.
```

✅ **Perfecto!** Ahora puedes hacer push sin problemas.

---

## 💡 Script Auxiliar

Si solo quieres VER tu public key:

```powershell
.\scripts\mostrar-mi-key.bat
```

Este script encuentra y muestra tu SSH public key, sin importar cómo se llame.

---

**¡Con el archivo `config` configurado, SSH usará automáticamente tu key `sole` para GitHub!** 🚀


