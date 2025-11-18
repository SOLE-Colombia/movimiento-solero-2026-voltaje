# 🚀 Inicio Rápido - Deploy SOLE Voltaje

## ⚡ Resumen Ultra-Rápido

Ya tienes todo optimizado. Ahora solo necesitas **3 comandos**:

```cmd
# 1. Verificar requisitos
scripts\check-requirements.bat

# 2. Ejecutar asistente completo
scripts\setup-complete.bat

# 3. ¡Listo! Tu sitio estará en GitHub Pages
```

---

## 📝 Pasos Detallados

### ✅ PASO 1: Verificar Requisitos (2 minutos)

```cmd
scripts\check-requirements.bat
```

**Esto verifica:**
- ✓ Python, Node.js, npm, Git instalados
- ✓ Dependencias instaladas
- ✓ Estructura del proyecto correcta
- ✓ Quartz clonado (si no, te dice cómo hacerlo)

**Si falta Quartz, clónalo:**
```cmd
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
cd ..
```

---

### ✅ PASO 2: Asistente de Configuración (10 minutos)

```cmd
scripts\setup-complete.bat
```

**Menú interactivo que te guía por:**

```
1. Copiar contenido a Quartz              ← Empieza aquí
2. Inicializar Git y conectar con GitHub  ← Luego esto
3. Hacer primer commit y push             ← Después esto
4. Probar localmente (desarrollo)         ← Para ver el sitio
5. Construir para producción
6. Probar con Docker
7. Ver guía completa
8. Ver estado del proyecto
```

**Selecciona las opciones en orden (1 → 2 → 3)**

---

### ✅ PASO 3: Configurar GitHub Pages (2 minutos)

**Después del push, ve a tu repositorio en GitHub:**

1. **Settings** → **Pages**
2. **Source**: Selecciona "GitHub Actions"
3. **Guardar**

---

### ✅ PASO 4: ¡Verificar tu sitio! (2-3 minutos después)

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/sole-voltaje/
```

---

## 🎯 Flujo Visual

```
┌─────────────────────────────────────────────────┐
│  TU PROYECTO ACTUAL (Optimizado)               │
│  ├── content/es/          [✓]                  │
│  ├── content/en/          [✓]                  │
│  ├── content/assets/      [✓]                  │
│  ├── public/              [✓]                  │
│  └── scripts/             [✓]                  │
└─────────────────────────────────────────────────┘
                    │
                    │ scripts\copy-to-quartz.bat
                    ▼
┌─────────────────────────────────────────────────┐
│  QUARTZ (Framework)                             │
│  ├── content/  ← Tu contenido copiado aquí     │
│  ├── public/   ← Tus archivos públicos         │
│  └── quartz/   ← Motor de Quartz               │
└─────────────────────────────────────────────────┘
                    │
                    │ scripts\init-git.bat
                    │ scripts\first-push.bat
                    ▼
┌─────────────────────────────────────────────────┐
│  GITHUB (Repositorio)                           │
│  ├── Código versionado                          │
│  ├── GitHub Actions (CI/CD)                     │
│  └── GitHub Pages (Deploy automático)           │
└─────────────────────────────────────────────────┘
                    │
                    │ GitHub Actions ejecuta
                    │ npx quartz build
                    ▼
┌─────────────────────────────────────────────────┐
│  TU SITIO WEB                                   │
│  https://tu-usuario.github.io/sole-voltaje/     │
│  ✓ Rápido    ✓ Optimizado    ✓ Bilingüe        │
└─────────────────────────────────────────────────┘
```

---

## 📂 Scripts Creados para Ti

### 🔧 Scripts Principales

| Script | Qué hace |
|--------|----------|
| `check-requirements.bat` | Verifica que todo esté instalado |
| `setup-complete.bat` | **Asistente interactivo completo** ⭐ |
| `copy-to-quartz.bat` | Copia contenido a Quartz |
| `init-git.bat` | Inicializa Git y conecta con GitHub |
| `first-push.bat` | Hace el primer commit y push |

### 🚀 Scripts de Desarrollo

| Script | Qué hace |
|--------|----------|
| `dev.bat` | Servidor local en http://localhost:8080 |
| `build.bat` | Construye versión de producción |
| `docker-dev.bat` | Desarrollo con Docker |
| `docker-build.bat` | Build de producción con Docker |

---

## 💡 Comandos Útiles

### Ver el sitio localmente
```cmd
scripts\dev.bat
```
Abre: http://localhost:8080

### Ver estado de Git
```cmd
git status
```

### Actualizar desde GitHub (trabajo en equipo)
```cmd
git pull origin main
```

### Subir cambios nuevos
```cmd
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

---

## 🎨 Estructura de Carpetas Quartz

Después de copiar el contenido:

```
quartz/
├── content/
│   ├── es/                    ← Contenido español
│   │   ├── index.md
│   │   ├── inspirate/
│   │   ├── soluciona/
│   │   ├── conceptorio/
│   │   └── desconectado/
│   ├── en/                    ← Contenido inglés
│   │   ├── index.md
│   │   ├── inspire/
│   │   ├── solve/
│   │   └── glossary/
│   └── assets/
│       └── images/            ← Imágenes optimizadas
├── public/
│   ├── downloads/             ← PDFs
│   └── videos/                ← Videos WebM
├── quartz/                    ← Motor de Quartz
├── quartz.config.ts           ← Configuración
└── quartz.layout.ts           ← Layout
```

---

## 🔄 Workflow Diario

```cmd
# Mañana
git pull origin main           # Actualizar

# Durante el día
# ... editar archivos en content/ ...
scripts\dev.bat               # Probar cambios

# Al terminar
git add .
git commit -m "feat: lo que hiciste"
git push origin main          # GitHub Actions hace el deploy automáticamente
```

---

## 🐳 Opción Docker (Alternativa)

Si prefieres usar Docker:

```cmd
# Desarrollo
docker-compose up dev

# Producción
docker-compose up build
```

---

## 📖 Documentación Completa

| Archivo | Para qué |
|---------|----------|
| `INICIO_DEPLOY.md` | ← **Estás aquí** - Inicio rápido |
| `GUIA_DEPLOY.md` | Guía completa paso a paso |
| `README.md` | Documentación principal del proyecto |
| `QUARTZ_CONFIG.md` | Configuración detallada de Quartz |
| `IMPLEMENTACION_COMPLETA.md` | Resumen de implementación |

---

## ⚠️ Antes de Empezar

### 1. Crear cuenta en GitHub (si no tienes)
https://github.com/join

### 2. Instalar Git para Windows
https://git-scm.com/download/win

### 3. Configurar Git (primera vez)
```cmd
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## 🆘 Problemas Comunes

### ❌ "Git no encontrado"
**Solución:** Instala Git desde https://git-scm.com/download/win

### ❌ "Node no encontrado"
**Solución:** Instala Node.js desde https://nodejs.org/

### ❌ "No se encuentra la carpeta quartz"
**Solución:** 
```cmd
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
cd ..
```

### ❌ "Error al hacer push a GitHub"
**Solución:** Verifica que:
1. Creaste el repositorio en GitHub
2. La URL del repositorio es correcta
3. Tienes permisos (es tu repositorio)

---

## ✅ Checklist Rápido

**Antes de empezar:**
- [ ] Git instalado y configurado
- [ ] Node.js y npm instalados
- [ ] Python instalado (ya lo tienes)
- [ ] Cuenta de GitHub creada
- [ ] Quartz clonado e instalado

**Proceso:**
- [ ] Ejecutar `check-requirements.bat` ✓
- [ ] Ejecutar `setup-complete.bat` ✓
- [ ] Opción 1: Copiar contenido ✓
- [ ] Opción 2: Inicializar Git ✓
- [ ] Crear repositorio en GitHub ✓
- [ ] Opción 3: Primer push ✓
- [ ] Configurar GitHub Pages ✓
- [ ] Verificar sitio web ✓

**¡Listo! 🎉**

---

## 🎯 Resultado Final

Al terminar tendrás:

✅ **Sitio web funcionando** en GitHub Pages  
✅ **Deploy automático** cada vez que hagas push  
✅ **Control de versiones** con Git  
✅ **Trabajo colaborativo** listo  
✅ **Desarrollo local** con hot-reload  
✅ **Docker** configurado (opcional)  
✅ **SEO optimizado** automáticamente  
✅ **Imágenes optimizadas** en WebP  
✅ **Bilingüe** (español/inglés)  

---

## 📞 Ayuda

**¿Dudas?** Lee la guía completa: `GUIA_DEPLOY.md`  
**¿Problemas?** Revisa el estado: `scripts\setup-complete.bat` → Opción 8  
**¿Quieres ayuda?** hola@solecolombia.org  

---

**¡Vamos a publicar SOLE Voltaje! 🚀⚡**

---

*SOLE Colombia - Fundación SOLE Colombia*  
*Con apoyo de Internet Society Foundation*  
*Cambiando el mundo juntos, una gran pregunta a la vez*




