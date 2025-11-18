# 🚀 Guía de Uso Rápido - SOLE Voltaje

## 📁 Estructura del Proyecto

```
dev_voltaje/
├── content/              ← TU CONTENIDO (editar aquí)
│   ├── es/              ← Archivos en español
│   ├── en/              ← Archivos en inglés
│   └── assets/          ← Imágenes y recursos
├── quartz/              ← MOTOR DE QUARTZ (no tocar)
├── scripts/             ← Scripts auxiliares
├── docs/                ← Documentación
└── package.json         ← Scripts npm
```

---

## 🖥️ Comandos DESDE WINDOWS (PowerShell)

### Iniciar Desarrollo

```powershell
# Opción 1: Iniciar en background (recomendado)
npm run dev

# Opción 2: Iniciar con logs en tiempo real
npm run dev:watch
```

### Ver el Sitio

Abre tu navegador en:
- **Español:** http://localhost:8080/es/
- **English:** http://localhost:8080/en/

### Otros Comandos Útiles

```powershell
# Ver logs
npm run logs

# Detener servidor
npm run stop

# Reiniciar (si hay cambios en Docker)
npm run rebuild

# Entrar al contenedor (modo avanzado)
npm run shell
```

---

## 🐋 Comandos DENTRO del Contenedor

**⚠️ IMPORTANTE:** Estos comandos SOLO funcionan después de entrar al contenedor con `npm run shell`

```bash
# Entrar al contenedor primero
npm run shell

# Luego, dentro del contenedor:
cd quartz
npx quartz build --serve    # Servidor desarrollo
npx quartz build            # Build producción
npm run docs                # Documentación
```

---

## ✏️ Workflow de Edición

### 1. Inicia el servidor
```powershell
npm run dev
```

### 2. Abre el navegador
```
http://localhost:8080/es/
```

### 3. Edita tu contenido
- Abre archivos en `content/es/` o `content/en/`
- Edita con tu editor favorito (VS Code, Notepad++, etc.)
- Guarda los cambios

### 4. Ve los cambios automáticamente
- El navegador se recarga solo
- Los cambios aparecen en ~2-3 segundos

---

## ❌ Errores Comunes

### ❌ Error: `npm error could not determine executable to run`

**Causa:** Intentaste ejecutar `npx quartz ...` desde Windows

**Solución:** 
- Si quieres iniciar el servidor: `npm run dev`
- Si necesitas comandos de Quartz: `npm run shell` primero

### ❌ Error: `404` al visitar `http://localhost:8080`

**Causa:** No hay `index.md` en la raíz

**Solución:** 
- Visita `http://localhost:8080/es/` (español)
- Visita `http://localhost:8080/en/` (inglés)

### ❌ Error: Contenedor "unhealthy"

**Causa:** El health check falla porque no hay raíz

**Solución:** Es normal, el servidor funciona correctamente. Ignora este warning.

---

## 🔄 Git Workflow

### Antes de empezar a trabajar
```bash
git pull origin desarrollo
npm run dev
```

### Después de hacer cambios
```bash
git add content/
git commit -m "Descripción de tus cambios"
git push origin desarrollo
```

### Para crear una nueva feature
```bash
git checkout -b feature/mi-nueva-funcionalidad
# ... hacer cambios ...
git add .
git commit -m "Descripción"
git push origin feature/mi-nueva-funcionalidad
# Crear Pull Request en GitHub
```

---

## 📊 Resumen Visual

```
┌─────────────────────────────────────────┐
│  WINDOWS (Tu Computadora)               │
│                                         │
│  Comandos:                              │
│  • npm run dev     ← Inicia Docker      │
│  • npm run stop    ← Detiene Docker     │
│  • npm run logs    ← Ver logs           │
│                                         │
│  Editar:                                │
│  • content/es/*.md                      │
│  • content/en/*.md                      │
│                                         │
└─────────────┬───────────────────────────┘
              │
              │ Docker gestiona todo
              ▼
┌─────────────────────────────────────────┐
│  DOCKER (Contenedor)                    │
│                                         │
│  • Node.js 22                           │
│  • Quartz instalado                     │
│  • Servidor en puerto 8080              │
│  • Hot-reload automático                │
│                                         │
│  ⚠️ NO necesitas entrar aquí            │
│  ⚠️ Todo funciona automáticamente       │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 TL;DR (Muy Rápido)

```powershell
# 1. Iniciar
npm run dev

# 2. Abrir navegador
http://localhost:8080/es/

# 3. Editar archivos en content/

# 4. Ver cambios automáticamente

# 5. Detener
npm run stop
```

---

## 💡 Consejos

1. **Siempre usa `npm run dev`** desde Windows, nunca `npx quartz`
2. **Los cambios se ven automáticamente**, no necesitas reiniciar
3. **Si algo falla**, prueba `npm run rebuild`
4. **Mantén Docker Desktop abierto** mientras trabajas
5. **No edites nada dentro de `quartz/`**, solo edita `content/`

---

## 📞 ¿Necesitas Ayuda?

- Los logs te dirán qué está pasando: `npm run logs`
- Para ver el estado: `docker ps`
- Para reiniciar todo: `npm run rebuild`

---

**¡Listo para trabajar! 🚀**

