# 📖 Guía de Desarrollo - SOLE Voltaje

## 🚀 Configuración Inicial

### Requisitos

- Docker Desktop instalado
- WSL2 (Debian recomendado)
- Node.js 22+ (opcional, solo si trabajas fuera de Docker)
- Git configurado con SSH

### Primer Setup

```bash
# Clonar el repositorio
git clone git@github.com:tuusuario/dev_voltaje.git
cd dev_voltaje

# Configuración inicial (instala dependencias)
npm run setup

# Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:8080/es/ en tu navegador.

## 📝 Workflow Diario

### 1. Iniciar el Proyecto

```bash
# Opción A: Background (recomendado)
npm run dev

# Opción B: Con logs en tiempo real
npm run dev:watch
```

### 2. Editar Contenido

- Abre archivos en `content/es/` o `content/en/`
- Edita con tu editor favorito (VS Code, etc.)
- Guarda cambios (Ctrl+S)
- **Los cambios se reflejan automáticamente** en el navegador

### 3. Ver Cambios

El servidor detecta cambios automáticamente:
1. Guardas archivo → 2-3 segundos
2. Quartz hace rebuild
3. Navegador se recarga

### 4. Detener al Terminar

```bash
npm run stop
```

## 📁 Estructura de Contenido

### Organización por Categorías

```
content/
├── es/
│   ├── inspirate/      # Historias inspiradoras
│   ├── soluciona/      # Soluciones técnicas
│   ├── conceptorio/    # Definiciones
│   ├── desconectado/   # Contenido offline
│   └── general/        # Páginas generales
├── en/
│   ├── inspire/
│   ├── solve/
│   └── glossary/
└── assets/
    └── images/         # Imágenes organizadas por carpetas
```

### Crear una Nueva Página

1. **Crea el archivo:**
   ```bash
   touch content/es/inspirate/mi-nueva-pagina.md
   ```

2. **Agrega front matter:**
   ```markdown
   ---
   title: "Mi Nueva Página"
   description: "Descripción breve para SEO"
   date: 2025-11-04
   ---

   # Mi Nueva Página

   Contenido aquí...
   ```

3. **Guarda** → Quartz lo detecta automáticamente

### Agregar Imágenes

1. **Crea una carpeta:**
   ```bash
   mkdir -p content/assets/images/mi-proyecto
   ```

2. **Coloca la imagen** en esa carpeta

3. **Referencia en Markdown:**
   ```markdown
   ![Descripción](../../assets/images/mi-proyecto/imagen.jpg)
   ```

## 🔧 Comandos de Desarrollo

### Ver Logs en Tiempo Real

```bash
npm run logs
```

### Acceder al Contenedor

```bash
npm run shell
```

Dentro del contenedor:
```bash
# Ver archivos
ls /workspace/quartz/content

# Build manual
npx quartz build

# Salir
exit
```

### Rebuild de Imágenes Docker

Si cambias `Dockerfile.dev` o dependencias:

```bash
npm run build
npm run dev
```

### Limpiar Todo

Elimina contenedores, volúmenes y cache:

```bash
npm run clean
```

## 🎨 Personalización de Quartz

### Configuración General

Edita `quartz/quartz.config.ts`:

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "SOLE Voltaje",
    enableSPA: true,
    enablePopovers: true,
    // ... más opciones
  },
}
```

### Layout

Edita `quartz/quartz.layout.ts` para cambiar la estructura:

```typescript
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  // ... más componentes
}
```

### Estilos Personalizados

Crea `quartz/styles/custom.scss`:

```scss
// Personaliza colores, tipografía, etc.
:root {
  --primary-color: #your-color;
}
```

## 🌲 Git Workflow

### Branches

- `main` → Producción (deploy automático)
- `desarrollo` → Testing (deploy a dev)
- `feature/*` → Nuevas características

### Commits

Usa conventional commits:

```bash
git commit -m "feat: nueva página sobre X"
git commit -m "fix: corrige enlace roto"
git commit -m "docs: actualiza README"
```

Tipos:
- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Solo documentación
- `style:` - Formato, no afecta código
- `refactor:` - Refactorización de código
- `test:` - Agregar tests
- `chore:` - Mantenimiento

### Pull Requests

1. **Crea branch:**
   ```bash
   git checkout -b feature/mi-feature
   ```

2. **Haz cambios y commits:**
   ```bash
   git add .
   git commit -m "feat: descripción"
   ```

3. **Push:**
   ```bash
   git push origin feature/mi-feature
   ```

4. **Crea PR en GitHub** apuntando a `desarrollo`

5. **Después de aprobar**, merge a `main` para producción

## 🐛 Debugging

### Hot Reload No Funciona

```bash
# Reiniciar contenedor
docker compose -f docker-compose.dev.yml restart voltaje-dev

# Ver si hay errores
npm run logs
```

### Build Falla

```bash
# Ver logs detallados
npm run logs

# Problemas comunes:
# - Markdown con sintaxis incorrecta
# - Imágenes que no existen
# - Front matter inválido
```

### Puerto 8080 Ocupado

```bash
# Opción 1: Detener lo que usa el puerto
netstat -ano | findstr :8080

# Opción 2: Cambiar puerto en docker-compose.dev.yml
ports:
  - "8081:8080"  # Usar 8081
```

### Contenedor No Inicia

```bash
# Ver estado
docker compose -f docker-compose.dev.yml ps

# Ver logs de error
docker compose -f docker-compose.dev.yml logs

# Rebuild completo
npm run clean
npm run build
npm run dev
```

## 📊 Análisis y Optimización

### Ver Tamaño del Build

```bash
npm run shell
du -sh /workspace/quartz/public
```

### Optimizar Imágenes

Antes de subir imágenes:

```bash
# Instala herramientas de optimización
sudo apt-get install imagemagick

# Optimiza JPG/PNG
convert imagen.jpg -quality 85 imagen-optimizada.jpg

# Convierte a WebP (mejor compresión)
convert imagen.jpg imagen.webp
```

### Verificar Enlaces Rotos

```bash
# Dentro del contenedor
npm run shell
npx broken-link-checker http://localhost:8080 -ro
```

## 🚀 Rendimiento

### Hot Reload Lento

Si el hot reload es lento:

1. **Reduce archivos a watchear** en `docker-compose.dev.yml`:
   ```yaml
   volumes:
     - ./content:/workspace/content:ro  # Solo content
   ```

2. **Aumenta recursos de Docker:**
   - Docker Desktop > Settings > Resources
   - Memoria: 4GB+
   - CPUs: 4+

### Build Lento

```bash
# Usa build incremental (ya está configurado)
# Evita clean a menos que sea necesario
npm run dev  # ✅ Usa cache
npm run build  # ❌ Rebuild completo
```

## 📱 Desarrollo desde Diferentes Dispositivos

### Acceder desde Móvil (misma red)

1. **Encuentra tu IP local:**
   ```bash
   # En WSL
   ip addr show eth0 | grep inet
   ```

2. **Abre en móvil:**
   ```
   http://TU-IP:8080/es/
   ```

3. **Configura en `docker-compose.dev.yml`** si es necesario:
   ```yaml
   ports:
     - "0.0.0.0:8080:8080"  # Permite acceso externo
   ```

## 💡 Tips Avanzados

### Usar Quartz CLI Directamente

```bash
npm run shell
npx quartz create
npx quartz build
npx quartz serve
```

### Sincronizar Contenido Manualmente

```bash
npm run shell
rsync -av /workspace/content/ /workspace/quartz/content/
```

### Variables de Entorno

Crea `.env` en la raíz:

```env
NODE_ENV=development
QUARTZ_PORT=8080
```

Úsalas en `docker-compose.dev.yml`:

```yaml
env_file:
  - .env
```

## 📞 Ayuda

### Recursos

- **Docs Quartz:** https://quartz.jzhao.xyz/
- **Markdown Guide:** https://www.markdownguide.org/
- **Git Guide:** https://git-scm.com/doc

### Checklist de Problemas

- [ ] ¿Docker Desktop está corriendo?
- [ ] ¿Hay errores en `npm run logs`?
- [ ] ¿El archivo tiene front matter válido?
- [ ] ¿Las rutas de imágenes son correctas?
- [ ] ¿Hay caracteres especiales en nombres de archivo?

---

**Última actualización:** 4 de Noviembre, 2025

