# 🔐 Configuración SSH - SOLE Colombia

## ✅ Ya tienes SSH Key Configurada

Tu SSH public key es:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
```

**Email de GitHub**: `voltaje@solecolombia.org`

---

## 🚀 Setup en 2 Pasos

### Paso 1: Agregar SSH Key en GitHub (2 minutos)

1. Ve a: **https://github.com/settings/keys**

2. Click **"New SSH key"**

3. Llena el formulario:
   - **Title**: `SOLE Voltaje - Windows PC`
   - **Key**: Pega esto:
     ```
     ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIODlIIay9W01gie5F2x0/RfkR4ae3WSE1IZttEHmcFUN voltaje@solecolombia.org
     ```

4. Click **"Add SSH key"**

5. Confirma con tu contraseña de GitHub

### Paso 2: Configurar Git Local (30 segundos)

```cmd
scripts\config-git-sole.bat
```

Este script configura automáticamente:
- ✅ Usuario: David Vega - SOLE Colombia
- ✅ Email: voltaje@solecolombia.org
- ✅ Verifica conexión SSH

---

## ✅ Verificar que Funciona

```cmd
ssh -T git@github.com
```

Deberías ver:
```
Hi SOLE-Colombia! You've successfully authenticated, but GitHub does not provide shell access.
```

✅ **¡Perfecto!** SSH está funcionando.

---

## 🚀 Siguiente Paso

Ahora puedes subir tu proyecto:

```cmd
scripts\push-to-sole-colombia.bat
```

Este script usará SSH automáticamente (más rápido y seguro que HTTPS).

---

## 🔧 Comandos Útiles

### Ver tu configuración Git actual

```cmd
git config --list
```

### Ver tu SSH key local

```cmd
type %USERPROFILE%\.ssh\id_ed25519.pub
```

### Probar conexión SSH

```cmd
ssh -T git@github.com
```

### Ver configuración Git del proyecto

```cmd
git config user.name
git config user.email
git remote -v
```

---

## 💡 Ventajas de SSH vs HTTPS

### ✅ SSH (Recomendado para trabajo local)

- ✅ No pide contraseña cada vez
- ✅ Más rápido
- ✅ Más seguro
- ✅ Ideal para desarrollo diario

**URL**: `git@github.com:SOLE-Colombia/dev_voltaje.git`

### HTTPS (Alternativa)

- ⚠️ Pide token cada vez
- ⚠️ Más lento
- ✅ Funciona en redes restrictivas

**URL**: `https://github.com/SOLE-Colombia/dev_voltaje.git`

---

## 🔄 Cambiar entre SSH y HTTPS

### Cambiar a SSH (recomendado)

```cmd
git remote set-url origin git@github.com:SOLE-Colombia/dev_voltaje.git
```

### Cambiar a HTTPS

```cmd
git remote set-url origin https://github.com/SOLE-Colombia/dev_voltaje.git
```

### Ver configuración actual

```cmd
git remote -v
```

---

## 🆘 Solución de Problemas

### Error: "Permission denied (publickey)"

**Causa**: Tu SSH key no está agregada en GitHub

**Solución**: Sigue el Paso 1 de arriba

### Error: "Host key verification failed"

**Solución**:
```cmd
ssh-keyscan github.com >> %USERPROFILE%\.ssh\known_hosts
```

### Error: "Could not open a connection to your authentication agent"

**Solución**: Reinicia el servicio SSH:
```cmd
# En PowerShell como administrador
Start-Service ssh-agent
```

### ¿Dónde está mi SSH key?

```cmd
# Ver la key pública
type %USERPROFILE%\.ssh\id_ed25519.pub

# Ver la key privada (NO compartir)
type %USERPROFILE%\.ssh\id_ed25519
```

---

## 📋 Checklist de Configuración

- [ ] SSH key agregada en GitHub (https://github.com/settings/keys)
- [ ] Ejecutar `scripts\config-git-sole.bat`
- [ ] Verificar conexión: `ssh -T git@github.com`
- [ ] Ver mensaje "successfully authenticated"
- [ ] Ejecutar `scripts\push-to-sole-colombia.bat`

---

## 🔐 Seguridad

### ✅ Buenas Prácticas

- ✅ Tu SSH **public** key (`id_ed25519.pub`) es segura para compartir
- ✅ Agrégala en GitHub sin problemas
- ❌ **NUNCA** compartas tu SSH **private** key (`id_ed25519`)
- ✅ La key está protegida en tu PC

### 🔒 Tu Private Key

Ubicación: `C:\Users\David Vega\.ssh\id_ed25519`

⚠️ **Esta es PRIVADA** - No la copies ni compartas

### 📋 Tu Public Key

Ubicación: `C:\Users\David Vega\.ssh\id_ed25519.pub`

✅ Esta es PÚBLICA - Puedes agregarla en GitHub, GitLab, etc.

---

## 👥 Para el Equipo

Si otros miembros del equipo necesitan SSH:

### Catalina, Belén, Sanjay - Generar SSH Key

```bash
# En PowerShell o Git Bash
ssh-keygen -t ed25519 -C "su-email@solecolombia.org"
```

Presiona Enter 3 veces (ubicación por defecto, sin passphrase)

### Ver y Copiar la Key

```cmd
type %USERPROFILE%\.ssh\id_ed25519.pub
```

### Agregar en GitHub

1. Ir a https://github.com/settings/keys
2. New SSH key
3. Pegar la key
4. Add key

---

## 🎯 Resumen

**Tu setup actual**:
- ✅ Email: voltaje@solecolombia.org
- ✅ SSH key: ed25519 (moderna y segura)
- ✅ Repositorio: SOLE-Colombia/dev_voltaje
- ✅ Protocolo: SSH (recomendado)

**Comando para empezar**:
```cmd
scripts\config-git-sole.bat
scripts\push-to-sole-colombia.bat
```

---

**¡Listo! Con SSH configurado, trabajar con Git será mucho más fácil** 🚀


