# ⚡ Comandos Directos - Publicar en 5 Minutos

## ✅ Paso 1 ya está hecho
Tu contenido ya está copiado a Quartz. ¡Perfecto!

---

## 📝 Comandos para copiar y pegar

### PASO 1: Configurar Git (solo la primera vez)

Abre PowerShell o CMD en la carpeta de tu proyecto y ejecuta:

```cmd
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

**Reemplaza con tu información real.**

---

### PASO 2: Inicializar Git

```cmd
git init
git branch -M main
```

Verás: `Initialized empty Git repository`

---

### PASO 3: Crear repositorio en GitHub

**Antes de continuar, haz esto en tu navegador:**

1. Ve a: https://github.com/new
2. Nombre del repositorio: `sole-voltaje`
3. Descripción: `SOLE Voltaje - Plataforma educativa`
4. Selecciona Público o Privado
5. **NO marques** ninguna opción adicional
6. Click en **"Create repository"**
7. **Copia la URL** que aparece (ejemplo: `https://github.com/tuusuario/sole-voltaje.git`)

---

### PASO 4: Conectar con GitHub

**Reemplaza `TU-URL` con la URL que copiaste del paso anterior:**

```cmd
git remote add origin TU-URL
```

**Ejemplo:**
```cmd
git remote add origin https://github.com/davidvega/sole-voltaje.git
```

---

### PASO 5: Subir el código

```cmd
git add .
git commit -m "feat: Migración inicial SOLE Voltaje"
git push -u origin main
```

**Nota:** La primera vez puede pedirte que te autentiques con GitHub. Sigue las instrucciones en pantalla.

---

### PASO 6: Activar GitHub Pages

**En tu navegador, en tu repositorio de GitHub:**

1. Click en **Settings** (Configuración)
2. Click en **Pages** (menú izquierdo)
3. En **"Build and deployment"**:
   - Source: Selecciona **"GitHub Actions"**
4. Click en **Save**

5. Click en **Actions** → **General** (menú izquierdo)
6. Baja hasta **"Workflow permissions"**:
   - Selecciona: **"Read and write permissions"**
   - Marca: **"Allow GitHub Actions to create and approve pull requests"**
7. Click en **Save**

---

### PASO 7: Ejecutar el deploy

**En tu repositorio de GitHub:**

1. Ve a la pestaña **Actions**
2. Click en **"Deploy to GitHub Pages"** (menú izquierdo)
3. Click en el botón **"Run workflow"** (derecha)
4. Click en **"Run workflow"** verde
5. Espera 2-3 minutos

---

## ✅ ¡Listo!

Tu sitio estará disponible en:

```
https://TU-USUARIO.github.io/sole-voltaje/
```

---

## 🔄 Para futuras actualizaciones

Cuando edites archivos, solo ejecuta:

```cmd
git add .
git commit -m "Descripción de lo que cambiaste"
git push origin main
```

El deploy se hace automáticamente. ¡Magia! ✨

---

## 🆘 Si algo sale mal

### "Git not found"
- Instala Git: https://git-scm.com/download/win
- Reinicia PowerShell/CMD

### "Permission denied" al hacer push
- GitHub te pedirá autenticarte
- Sigue las instrucciones en pantalla
- O usa: `gh auth login` (si tienes GitHub CLI)

### "Remote origin already exists"
```cmd
git remote remove origin
git remote add origin TU-URL
```

### El sitio no aparece
- Espera 5 minutos más
- Verifica en Actions que el workflow terminó sin errores
- Verifica que Pages esté activado en Settings

---

## 📋 Todos los comandos en uno

Si quieres copiar y pegar todo de una vez (después de configurar Git):

```cmd
git init
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git
git add .
git commit -m "feat: Migración inicial SOLE Voltaje"
git push -u origin main
```

**Recuerda:** Reemplaza `TU-USUARIO` con tu usuario real de GitHub.

---

*SOLE Colombia - ¡A publicar!* 🚀




