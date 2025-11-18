# Guía de Configuración de GitHub

## Paso a Paso para Configurar Todo el Sistema

### PARTE 1: Crear Repositorio Público

#### 1.1 Crear nuevo repositorio en GitHub

1. Ve a GitHub: https://github.com/new
2. Configura:
   - **Nombre**: `voltaje-public` (o el que prefieras)
   - **Descripción**: "Sitio web público de SOLE Voltaje"
   - **Visibilidad**: ✅ Público
   - **NO** inicializar con README (lo haremos después)
3. Crear repositorio

#### 1.2 Configurar GitHub Pages

1. En el nuevo repositorio, ve a **Settings** > **Pages**
2. Configurar:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/` (root)
3. Guardar

#### 1.3 Configurar dominio personalizado (opcional)

Si tienes dominio `voltaje.solecolombia.org`:

1. En **Settings** > **Pages** > **Custom domain**
2. Agregar: `voltaje.solecolombia.org`
3. En tu proveedor de DNS, agregar registro CNAME:
   ```
   voltaje  CNAME  tu-usuario.github.io
   ```

### PARTE 2: Configurar Secrets en Repositorio Privado

#### 2.1 Crear Personal Access Token

1. Ve a GitHub **Settings** (tu perfil) > **Developer settings**
2. **Personal access tokens** > **Tokens (classic)**
3. **Generate new token (classic)**
4. Configurar:
   - **Note**: "Deploy to voltaje-public"
   - **Expiration**: 90 días (o custom)
   - **Scopes**: 
     - ✅ `repo` (todos los sub-items)
     - ✅ `workflow`
5. **Generate token**
6. **⚠️ COPIAR EL TOKEN INMEDIATAMENTE** (no se volverá a mostrar)

#### 2.2 Agregar Secrets al Repositorio Privado

1. En tu repositorio **dev_voltaje**, ve a **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret**:
   
   **Secret 1:**
   - Name: `DEPLOY_TOKEN`
   - Value: [pegar el token copiado]
   
   **Secret 2:**
   - Name: `PUBLIC_REPO`
   - Value: `tu-usuario/voltaje-public` (reemplazar con tus datos)

### PARTE 3: Configurar Branch Protection Rules

#### 3.1 Proteger rama `main`

1. En **dev_voltaje** > **Settings** > **Branches**
2. **Add branch protection rule**
3. Configurar:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1
   - ✅ **Require status checks to pass before merging**
     - Buscar y agregar: `validate-and-test`
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Include administrators** (opcional, recomendado)
4. **Create**

#### 3.2 Proteger rama `desarrollo`

1. **Add branch protection rule**
2. Configurar:
   - **Branch name pattern**: `desarrollo`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
3. **Create**

### PARTE 4: Configurar Git Local

#### 4.1 Actualizar configuración de ramas

```bash
# Asegurar que estás en la ubicación correcta
cd /ruta/a/dev_voltaje

# Ver ramas actuales
git branch -a

# Si no existe la rama desarrollo localmente
git checkout -b desarrollo origin/desarrollo

# Configurar rama main
git checkout main
git branch --set-upstream-to=origin/main main

# Configurar rama desarrollo
git checkout desarrollo
git branch --set-upstream-to=origin/desarrollo desarrollo
```

#### 4.2 Configurar Git para el flujo de trabajo

```bash
# Configurar pull con rebase por defecto
git config pull.rebase true

# Configurar push simple
git config push.default simple

# Ver configuración
git config --list | grep -E "(branch|pull|push)"
```

### PARTE 5: Configurar Docker Local

#### 5.1 Verificar instalación de Docker

```bash
# Verificar Docker
docker --version
docker-compose --version

# Si no está instalado:
# Windows: Descargar Docker Desktop desde https://www.docker.com/products/docker-desktop
# Mac: Descargar Docker Desktop desde https://www.docker.com/products/docker-desktop
# Linux: sudo apt-get install docker docker-compose
```

#### 5.2 Dar permisos a scripts

En Linux/Mac:
```bash
chmod +x scripts/dev-local.sh
chmod +x scripts/sync-to-public.sh
```

En Windows (Git Bash):
```bash
# Los archivos .bat ya tienen permisos de ejecución
```

#### 5.3 Iniciar entorno de desarrollo

**En Windows:**
```bash
.\scripts\dev-local.bat
```

**En Linux/Mac:**
```bash
./scripts/dev-local.sh
```

### PARTE 6: Probar el Flujo Completo

#### 6.1 Crear rama de prueba

```bash
# Desde desarrollo
git checkout desarrollo
git pull origin desarrollo

# Crear rama de feature
git checkout -b feature/test-workflow

# Hacer un cambio pequeño
echo "# Test" >> test.md

# Commit
git add test.md
git commit -m "test: probar workflow"

# Push
git push origin feature/test-workflow
```

#### 6.2 Crear Pull Request

1. Ve a GitHub > tu repositorio
2. Verás banner "Compare & pull request"
3. **base**: `desarrollo` ← **compare**: `feature/test-workflow`
4. Título: "Test: Probar workflow"
5. Descripción: "Probando el flujo de CI/CD"
6. **Create pull request**
7. Esperar que pasen los checks ✅
8. **Merge pull request**
9. Borrar la rama de feature

#### 6.3 Probar deploy a producción

```bash
# Checkout a desarrollo
git checkout desarrollo
git pull origin desarrollo

# Crear PR a main (en GitHub)
# base: main ← compare: desarrollo
```

1. En GitHub, crear PR de `desarrollo` a `main`
2. Esperar checks
3. Aprobar y hacer merge
4. **Automáticamente se desplegará a voltaje-public**
5. Verificar en https://tu-usuario.github.io/voltaje-public

### PARTE 7: Configuración del Equipo

#### 7.1 Invitar colaboradores

1. **Settings** > **Collaborators**
2. **Add people**
3. Buscar por username
4. Rol recomendado: **Write** (no Admin para proteger main)

#### 7.2 Documentar para el equipo

Crear archivo `guias/FLUJO_DE_TRABAJO_EQUIPO.md` con:
- Cómo crear feature branches
- Cómo hacer PRs
- Proceso de review
- Comandos comunes

## Troubleshooting

### Problema: GitHub Actions falla

**Solución:**
1. Verificar que los secrets estén configurados
2. Ver logs en Actions tab
3. Verificar que el token tenga los permisos correctos

### Problema: Docker no inicia

**Solución:**
1. Verificar que Docker Desktop esté corriendo
2. Verificar que no haya conflictos de puertos:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   
   # Linux/Mac
   lsof -i :8080
   ```
3. Reiniciar Docker Desktop

### Problema: Build de Quartz falla

**Solución:**
1. Limpiar cache:
   ```bash
   cd quartz
   rm -rf .quartz-cache
   rm -rf node_modules
   npm install
   ```
2. Verificar versión de Node: `node --version` (debe ser 18+)

## Recursos Adicionales

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Docker Documentation](https://docs.docker.com/)

## Checklist Final

- [ ] Repositorio público creado
- [ ] GitHub Pages configurado
- [ ] Personal Access Token creado
- [ ] Secrets configurados en repo privado
- [ ] Branch protection rules activadas
- [ ] Git local configurado
- [ ] Docker funcionando localmente
- [ ] Workflow testeado
- [ ] Deploy a producción testeado
- [ ] Equipo invitado y documentado

## Próximos Pasos

1. Completar optimización de imágenes en rama `redaccion`
2. Hacer merge a `desarrollo`
3. Testear en desarrollo
4. Hacer merge a `main`
5. Verificar deploy automático
6. Compartir con el equipo




