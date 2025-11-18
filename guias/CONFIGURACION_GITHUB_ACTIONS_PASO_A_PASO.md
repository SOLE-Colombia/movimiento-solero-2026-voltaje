# 🚀 Configuración de GitHub Actions para SOLE Voltaje - Paso a Paso

## 📋 Resumen

Esta guía te ayudará a configurar el deploy automático de SOLE Voltaje a dos repositorios diferentes:
- **Rama `main`** → Repositorio de **PRODUCCIÓN** (sitio público final)
- **Rama `desarrollo`** → Repositorio de **DESARROLLO** (sitio para pruebas)

Ambos usarán GitHub Pages **gratuito** 🎉

## 🎯 Lo que Lograrás

```
┌────────────────────────────────────┐
│  Repositorio Principal (Privado)  │
│  dev_voltaje                       │
├────────────────────────────────────┤
│                                    │
│  rama: main                        │
│    ↓  (push automático)            │
│  GitHub Actions Build              │
│    ↓  (deploy automático)          │
│  Repo PRODUCCIÓN → GitHub Pages    │
│  🌐 voltaje-prod.github.io         │
│                                    │
│  rama: desarrollo                  │
│    ↓  (push automático)            │
│  GitHub Actions Build              │
│    ↓  (deploy automático)          │
│  Repo DESARROLLO → GitHub Pages    │
│  🌐 voltaje-dev.github.io          │
│                                    │
└────────────────────────────────────┘
```

## ⚙️ Requisitos Previos

- [ ] Cuenta de GitHub
- [ ] Repositorio principal (`dev_voltaje`) con código de Quartz
- [ ] Acceso para crear nuevos repositorios

## 📝 PASO 1: Crear los Repositorios de Deploy

### 1.1 Crear Repositorio de PRODUCCIÓN

1. Ve a: https://github.com/new
2. Configura:
   - **Repository name**: `voltaje-produccion` (o el nombre que prefieras)
   - **Description**: "SOLE Voltaje - Sitio de Producción"
   - **Visibility**: ✅ **Public** (necesario para GitHub Pages gratuito)
   - ❌ **NO** inicializar con README
3. Click **Create repository**
4. **Guarda la URL**: `https://github.com/TU-USUARIO/voltaje-produccion`

### 1.2 Crear Repositorio de DESARROLLO

1. Ve a: https://github.com/new
2. Configura:
   - **Repository name**: `voltaje-desarrollo` (o el nombre que prefieras)
   - **Description**: "SOLE Voltaje - Sitio de Desarrollo"
   - **Visibility**: ✅ **Public** (necesario para GitHub Pages gratuito)
   - ❌ **NO** inicializar con README
3. Click **Create repository**
4. **Guarda la URL**: `https://github.com/TU-USUARIO/voltaje-desarrollo`

## 🔐 PASO 2: Crear Personal Access Token (PAT)

### 2.1 Generar el Token

1. Ve a GitHub Settings: https://github.com/settings/tokens
2. Click **Developer settings** (menú izquierdo)
3. Click **Personal access tokens** > **Tokens (classic)**
4. Click **Generate new token (classic)**
5. Configura:
   - **Note**: `Deploy SOLE Voltaje`
   - **Expiration**: `90 days` (o lo que prefieras)
   - **Select scopes**:
     - ✅ `repo` (marcar TODO el grupo)
     - ✅ `workflow`
6. Click **Generate token**
7. **⚠️ IMPORTANTE**: Copia el token **INMEDIATAMENTE** (no podrás verlo de nuevo)

Ejemplo de token: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2.2 Guardar el Token de Forma Segura

**Opción A: Usar administrador de contraseñas** (Recomendado)
- 1Password
- LastPass
- Bitwarden

**Opción B: Archivo local temporal**
```
# Crear archivo seguro
echo "ghp_tu_token_aqui" > ~/.github_token
chmod 600 ~/.github_token

# Para verlo después:
cat ~/.github_token

# Borrar cuando termines:
rm ~/.github_token
```

## 🔑 PASO 3: Configurar Secrets en el Repositorio Principal

### 3.1 Ir a la Configuración de Secrets

1. Ve a tu repositorio principal: `https://github.com/TU-USUARIO/dev_voltaje`
2. Click **Settings** (pestaña superior)
3. En el menú izquierdo: **Secrets and variables** > **Actions**
4. Click **New repository secret**

### 3.2 Agregar el Secret: DEPLOY_TOKEN

1. **Name**: `DEPLOY_TOKEN`
2. **Value**: Pega el token que copiaste (comienza con `ghp_`)
3. Click **Add secret**

### 3.3 Agregar el Secret: PRODUCTION_REPO

1. Click **New repository secret**
2. **Name**: `PRODUCTION_REPO`
3. **Value**: `TU-USUARIO/voltaje-produccion` (reemplaza con tus datos)
   - Ejemplo: `solecolombia/voltaje-produccion`
4. Click **Add secret**

### 3.4 Agregar el Secret: DEVELOPMENT_REPO

1. Click **New repository secret**
2. **Name**: `DEVELOPMENT_REPO`
3. **Value**: `TU-USUARIO/voltaje-desarrollo` (reemplaza con tus datos)
   - Ejemplo: `solecolombia/voltaje-desarrollo`
4. Click **Add secret**

### 3.5 Verificar Secrets

Deberías ver 3 secrets:
- ✅ `DEPLOY_TOKEN`
- ✅ `PRODUCTION_REPO`
- ✅ `DEVELOPMENT_REPO`

## 📄 PASO 4: Verificar los Archivos de Workflow

Los workflows ya están creados en:
```
.github/workflows/
├── deploy-production.yml  # Deploy desde main
└── test-desarrollo.yml    # Deploy desde desarrollo (renombrado)
```

### 4.1 Verificar que Existan

```bash
# En tu terminal:
ls -la .github/workflows/

# Deberías ver:
# deploy-production.yml
# test-desarrollo.yml
```

### 4.2 Si NO Existen

Si por alguna razón no se crearon, estarán disponibles en el diff actual. Puedes:

1. Hacer commit de los cambios actuales
2. O crear los archivos manualmente (están en el diff que ves)

## 🎮 PASO 5: Activar GitHub Pages en los Repos de Deploy

### 5.1 Activar en Repositorio de PRODUCCIÓN

1. Ve a: `https://github.com/TU-USUARIO/voltaje-produccion`
2. Click **Settings**
3. En el menú izquierdo: **Pages**
4. En **Source**:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Espera a que aparezca: "Your site is published at..."
7. **Guarda la URL**: `https://TU-USUARIO.github.io/voltaje-produccion`

### 5.2 Activar en Repositorio de DESARROLLO

1. Ve a: `https://github.com/TU-USUARIO/voltaje-desarrollo`
2. Click **Settings**
3. En el menú izquierdo: **Pages**
4. En **Source**:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Espera a que aparezca: "Your site is published at..."
7. **Guarda la URL**: `https://TU-USUARIO.github.io/voltaje-desarrollo`

## 🚀 PASO 6: Probar el Deploy Automático

### 6.1 Probar Deploy a DESARROLLO

```bash
# 1. Asegurar que estás en desarrollo
git checkout desarrollo

# 2. Hacer un cambio pequeño de prueba
echo "# Test Deploy" >> test.md

# 3. Commit y push
git add test.md
git commit -m "test: probar deploy automático a desarrollo"
git push origin desarrollo
```

### 6.2 Verificar el Workflow de Desarrollo

1. Ve a tu repositorio: `https://github.com/TU-USUARIO/dev_voltaje`
2. Click en la pestaña **Actions**
3. Deberías ver un workflow corriendo: "Development Build and Deploy"
4. Click en el workflow para ver los detalles
5. Espera a que termine (toma 2-3 minutos)

**Si hay errores:**
- Click en el step que falló para ver el error
- Los errores comunes están al final de esta guía

### 6.3 Verificar el Sitio de Desarrollo

1. Ve a: `https://TU-USUARIO.github.io/voltaje-desarrollo`
2. Refresca la página (puede tomar 1-2 minutos)
3. Deberías ver tu sitio actualizado

### 6.4 Probar Deploy a PRODUCCIÓN

```bash
# 1. Cambiar a main
git checkout main

# 2. Hacer un cambio pequeño
echo "# Test Producción" >> test-prod.md

# 3. Commit y push
git add test-prod.md
git commit -m "test: probar deploy automático a producción"
git push origin main
```

### 6.5 Verificar el Workflow de Producción

1. Ve a **Actions**
2. Deberías ver: "Production Build and Deploy"
3. Espera a que termine
4. Ve a: `https://TU-USUARIO.github.io/voltaje-produccion`

## ✅ PASO 7: Verificación Final

### Checklist

- [ ] Repositorio de producción creado y público
- [ ] Repositorio de desarrollo creado y público
- [ ] Personal Access Token creado y guardado
- [ ] 3 secrets configurados en repo principal
- [ ] GitHub Pages activado en ambos repos de deploy
- [ ] Workflow de desarrollo funciona correctamente
- [ ] Workflow de producción funciona correctamente
- [ ] Sitio de desarrollo accesible
- [ ] Sitio de producción accesible

## 🎓 Cómo Usar el Sistema

### Flujo de Trabajo Normal

```bash
# 1. Trabajar en una feature
git checkout desarrollo
git checkout -b feature/mi-cambio

# 2. Hacer cambios
# ... editar archivos ...

# 3. Commit y push
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/mi-cambio

# 4. Crear PR a desarrollo en GitHub

# 5. Mergear PR → Deploy automático a desarrollo

# 6. Cuando desarrollo esté listo:
#    Crear PR de desarrollo → main

# 7. Mergear → Deploy automático a producción
```

## 🐛 Troubleshooting

### Error: "Resource not accessible by integration"

**Causa**: El token no tiene los permisos correctos

**Solución**:
1. Verifica que el token tenga scope `repo` y `workflow`
2. Regenera el token si es necesario
3. Actualiza el secret `DEPLOY_TOKEN`

### Error: "Repository not found"

**Causa**: El nombre del repositorio en los secrets está mal

**Solución**:
1. Verifica que `PRODUCTION_REPO` y `DEVELOPMENT_REPO` sean exactos
2. Formato correcto: `usuario/nombre-repo` (sin https://, sin .git)
3. Actualiza los secrets si es necesario

### Error: "npm ci" falla

**Causa**: No hay `package-lock.json` en quartz/

**Solución**:
```bash
cd quartz
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json"
git push
```

### El sitio no se actualiza

**Causa**: GitHub Pages toma tiempo en actualizarse

**Solución**:
1. Espera 2-3 minutos
2. Refresca con Ctrl+F5 (o Cmd+Shift+R en Mac)
3. Verifica en Settings > Pages que esté activo

### Workflow corre pero no hace deploy

**Causa**: El token expiró

**Solución**:
1. Generar nuevo token
2. Actualizar secret `DEPLOY_TOKEN`
3. Re-correr el workflow

## 📊 Monitoreo

### Ver Estado de los Workflows

1. Ve a: `https://github.com/TU-USUARIO/dev_voltaje/actions`
2. Verás todos los workflows que han corrido
3. Verde ✅ = éxito, Rojo ❌ = error

### Ver Logs Detallados

1. Click en cualquier workflow
2. Click en el job "build"
3. Click en cualquier step para ver logs

### Recibir Notificaciones

GitHub te enviará email si un workflow falla.

## 🎯 Próximos Pasos

1. ☐ Borrar los archivos de prueba (`test.md`, `test-prod.md`)
2. ☐ Continuar con la optimización de imágenes
3. ☐ Mergear cambios a desarrollo
4. ☐ Probar en sitio de desarrollo
5. ☐ Cuando esté listo, mergear a main
6. ☐ Ver el sitio actualizado en producción

## 🔗 URLs Importantes

Guarda estas URLs para acceso rápido:

```
Repositorio principal:
https://github.com/TU-USUARIO/dev_voltaje

Repositorio de producción:
https://github.com/TU-USUARIO/voltaje-produccion

Repositorio de desarrollo:
https://github.com/TU-USUARIO/voltaje-desarrollo

Sitio de producción:
https://TU-USUARIO.github.io/voltaje-produccion

Sitio de desarrollo:
https://TU-USUARIO.github.io/voltaje-desarrollo

Actions del repo principal:
https://github.com/TU-USUARIO/dev_voltaje/actions
```

## 💡 Tips

1. **Siempre prueba en desarrollo primero**
2. **Revisa los workflows antes de mergear a main**
3. **Guarda el token en lugar seguro**
4. **Los workflows son automáticos** - no necesitas hacer nada manual
5. **GitHub Pages es gratis** para repos públicos

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, ¡tienes un sistema de deploy automático completamente funcional!

---

**¿Necesitas ayuda?**
- Revisa la sección de Troubleshooting
- Verifica los logs en Actions
- Los errores comunes tienen solución rápida

**¿Todo funciona?**
¡Excelente! Ahora puedes enfocarte en el contenido y dejar que GitHub se encargue del deploy.


