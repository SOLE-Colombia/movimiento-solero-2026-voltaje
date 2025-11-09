# 🌐 SOLE Voltaje

Sistema de documentación para SOLE Colombia usando Quartz v4.

## ⚡ Inicio Rápido

### Opción 1: Con npm (Recomendado)

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ver en tiempo real (con logs)
npm run dev:watch

# Detener
npm run stop

# Ver logs
npm run logs
```

### Opción 2: Con Make

```bash
# Iniciar servidor de desarrollo
make dev

# Ver logs
make logs

# Detener
make stop

# Ver todos los comandos
make help
```

### Opción 3: Directo con Docker

```bash
# Iniciar
docker compose -f docker-compose.dev.yml up -d

# Detener
docker compose -f docker-compose.dev.yml down
```

## 🌐 Acceder al Sitio

Una vez iniciado, abre tu navegador en:
- **Español:** http://localhost:8080/es/
- **English:** http://localhost:8080/en/

## 📁 Estructura del Proyecto

```
dev_voltaje/
├── content/              # Tu contenido (edita aquí)
│   ├── es/              # Español
│   ├── en/              # English
│   └── assets/          # Imágenes y recursos
├── quartz/              # Framework Quartz
├── docs/                # Documentación del proyecto
└── docker-compose.dev.yml
```

## 📝 Desarrollo

### Editar Contenido

1. Edita archivos en `content/es/` o `content/en/`
2. Guarda (Ctrl+S)
3. Los cambios se reflejan automáticamente en http://localhost:8080

### Estructura de Archivos Markdown

```markdown
---
title: "Título de la página"
description: "Descripción para SEO"
---

# Contenido aquí
```

## 🛠️ Comandos Disponibles

### Con npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor (background) |
| `npm run dev:watch` | Inicia con logs en tiempo real |
| `npm run stop` | Detiene el servidor |
| `npm run logs` | Ver logs |
| `npm run shell` | Acceder al contenedor |
| `npm run build` | Rebuild de imágenes |
| `npm run clean` | Limpiar todo |
| `npm run setup` | Configuración inicial |

### Con Make

| Comando | Descripción |
|---------|-------------|
| `make dev` | Inicia el servidor |
| `make stop` | Detiene el servidor |
| `make logs` | Ver logs |
| `make shell` | Acceder al contenedor |
| `make build` | Rebuild de imágenes |
| `make clean` | Limpiar todo |
| `make setup` | Configuración inicial |

## 📚 Documentación

Ver la carpeta `docs/` para documentación detallada:
- `docs/DESARROLLO.md` - Guía de desarrollo
- `docs/DOCKER.md` - Información sobre Docker
- `docs/DESPLIEGUE.md` - Deployment y CI/CD

## 🐛 Troubleshooting

### Puerto 8080 ocupado

```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :8080

# O cambiar el puerto en docker-compose.dev.yml
```

### Hot reload no funciona

```bash
# Reiniciar el contenedor
npm run stop
npm run dev
```

### Problemas con node_modules

```bash
# Limpiar y reconstruir
npm run clean
npm run build
npm run dev
```

## 🤝 Contribuir

1. Crea un branch: `git checkout -b feature/mi-feature`
2. Commitea cambios: `git commit -m "feat: descripción"`
3. Push: `git push origin feature/mi-feature`
4. Crea un Pull Request

## 📞 Soporte

- **Documentación Quartz:** https://quartz.jzhao.xyz/
- **Issues:** https://github.com/SOLEvoltaje/quartz/issues

---

**SOLE Colombia** - Conectando comunidades rurales 🌱

