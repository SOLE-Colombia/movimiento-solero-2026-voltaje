# 🚀 Pasos Simples para Publicar - SOLE Voltaje

## ✅ Paso 1: Contenido Copiado

**¡Ya está hecho!** ✓

Tu contenido ya fue copiado a Quartz con éxito:
- ✅ 584 archivos Markdown copiados
- ✅ 812 imágenes copiadas
- ✅ Videos y PDFs en su lugar

---

## 📝 Paso 2: Configurar Git

### 2.1 Configurar tu usuario de Git (primera vez)

Abre PowerShell o CMD y ejecuta:

```cmd
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tuemail@ejemplo.com"
```

**Ejemplo:**
```cmd
git config --global user.name "David Vega"
git config --global user.email "david@solecolombia.org"
```

---

### 2.2 Inicializar Git en el proyecto

```cmd
cd "C:\Users\David Vega\Downloads\Sole"
git init
```

Deberías ver: `Initialized empty Git repository`

---

### 2.3 Crear repositorio en GitHub

1. Ve a: https://github.com/new
2. **Nombre del repositorio**: `sole-voltaje`
3. **Descripción**: `SOLE Voltaje - Plataforma educativa bilingüe sobre conectividad`
4. **Público** o **Privado** (tu elección)
5. **NO marques** "Add README" ni ninguna otra opción
6. Click en **"Create repository"**

GitHub te mostrará una página con instrucciones. **Ignóralas por ahora.**

---

### 2.4 Conectar tu proyecto local con GitHub

Copia la URL de tu repositorio. Se verá así:
```
https://github.com/TU-USUARIO/sole-voltaje.git
```

Luego ejecuta (reemplaza con TU URL):

```cmd
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git
git branch -M main
```

---

## 📤 Paso 3: Subir tu Código a GitHub

### 3.1 Agregar todos los archivos

```cmd
git add .
```

Esto prepara todos los archivos para subirlos.

---

### 3.2 Crear el primer commit

```cmd
git commit -m "feat: Migración inicial SOLE Voltaje de Notion a Quartz v4"
```

Verás un resumen de los archivos que se están guardando.

---

### 3.3 Subir a GitHub

```cmd
git push -u origin main
```

**Nota:** La primera vez puede pedirte que te autentiques con GitHub. Sigue las instrucciones en pantalla.

Si todo sale bien, verás:
```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🌐 Paso 4: Activar GitHub Pages

### 4.1 Ir a tu repositorio

Ve a: `https://github.com/TU-USUARIO/sole-voltaje`

---

### 4.2 Configurar Pages

1. Click en **Settings** (Configuración)
2. En el menú izquierdo, click en **Pages**
3. En **"Source"**, selecciona: **GitHub Actions**
4. Click en **Save** (Guardar)

---

### 4.3 Habilitar permisos de Workflows

1. En **Settings**, click en **Actions** → **General**
2. Baja hasta **"Workflow permissions"**
3. Selecciona: **Read and write permissions**
4. Marca: **Allow GitHub Actions to create and approve pull requests**
5. Click en **Save**

---

### 4.4 Ejecutar el workflow manualmente (primera vez)

1. Ve a la pestaña **Actions**
2. Click en **"Deploy to GitHub Pages"** (en el menú izquierdo)
3. Click en **"Run workflow"** (botón azul)
4. Click en **"Run workflow"** en el diálogo
5. Espera 2-3 minutos

---

## ✅ Paso 5: Verificar tu Sitio

Tu sitio estará disponible en:

```
https://TU-USUARIO.github.io/sole-voltaje/
```

**Ejemplo:**
```
https://davidvega.github.io/sole-voltaje/
```

---

## 🎉 ¡Listo!

Tu sitio está ahora **PUBLICADO** en internet.

---

## 🔄 Workflow Diario (Para futuras actualizaciones)

Cuando edites contenido en `content/`:

```cmd
# 1. Guardar cambios
git add .

# 2. Crear commit con descripción
git commit -m "feat: descripción de lo que cambiaste"

# 3. Subir a GitHub
git push origin main

# 4. GitHub Actions hace el deploy automáticamente (espera 2-3 min)
```

---

## 🆘 Solución de Problemas

### Error: "Git not found"
**Solución:** Reinicia PowerShell/CMD después de instalar Git

### Error: "Permission denied" al hacer push
**Solución:** Necesitas autenticarte con GitHub
- Opción 1: Usar GitHub CLI: `gh auth login`
- Opción 2: Configurar Personal Access Token
  1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token → Marca "repo"
  3. Copia el token
  4. Al hacer push, usa el token como contraseña

### Error: "Remote origin already exists"
**Solución:**
```cmd
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git
```

### El workflow no aparece en Actions
**Solución:** Verifica que el archivo `.github/workflows/deploy.yml` existe en tu repositorio

### El sitio no carga
**Solución:** 
1. Espera 5 minutos más
2. Verifica que el workflow se ejecutó sin errores en la pestaña Actions
3. Verifica que GitHub Pages esté configurado en Settings → Pages

---

## 📞 ¿Necesitas Ayuda?

**Email:** hola@solecolombia.org  
**Documentación completa:** README.md  
**Guía detallada:** GUIA_DEPLOY.md

---

## ✨ Comandos de Referencia Rápida

```cmd
# Ver estado de Git
git status

# Ver qué archivos cambiaron
git diff

# Ver historial de commits
git log --oneline

# Actualizar desde GitHub (trabajo en equipo)
git pull origin main

# Ver ramas
git branch

# Ver remotes configurados
git remote -v
```

---

*SOLE Colombia - Fundación SOLE Colombia*  
*Cambiando el mundo juntos, una gran pregunta a la vez* ⚡




