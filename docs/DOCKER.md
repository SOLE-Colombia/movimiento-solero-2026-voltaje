# 🐳 Docker - SOLE Voltaje

## Arquitectura

### Contenedores

```
┌─────────────────────────────────────┐
│  voltaje-dev (Puerto 8080)          │
│  ├── Node.js 22                     │
│  ├── Quartz v4                      │
│  ├── Hot reload                     │
│  └── Sync automático                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  voltaje-scripts                    │
│  ├── Python 3.11                    │
│  └── Scripts de utilidad            │
└─────────────────────────────────────┘
```

### Volúmenes

```yaml
Volúmenes Montados:
  - ./content → /workspace/content (solo lectura)
  - ./ → /workspace (completo, para edición)

Volúmenes Nombrados (rendimiento):
  - voltaje-quartz-node-modules
  - voltaje-quartz-cache
```

## Configuración

### docker-compose.dev.yml

Archivo principal de configuración:

```yaml
version: '3.8'

services:
  voltaje-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - .:/workspace:cached
      - voltaje-quartz-node-modules:/workspace/quartz/node_modules
      - voltaje-quartz-cache:/workspace/quartz/.quartz-cache
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true  # Hot reload en WSL
```

### Dockerfile.dev

Imagen de desarrollo:

```dockerfile
FROM node:22-slim

RUN apt-get update && apt-get install -y \
    git python3 bash curl rsync \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["dev"]
```

## Comandos Docker

### Gestión Básica

```bash
# Ver contenedores corriendo
docker compose -f docker-compose.dev.yml ps

# Ver logs
docker compose -f docker-compose.dev.yml logs -f

# Detener
docker compose -f docker-compose.dev.yml down

# Reiniciar
docker compose -f docker-compose.dev.yml restart
```

### Build y Rebuild

```bash
# Build normal
docker compose -f docker-compose.dev.yml build

# Build sin cache
docker compose -f docker-compose.dev.yml build --no-cache

# Rebuild completo
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d
```

### Acceso a Contenedores

```bash
# Shell de voltaje-dev
docker compose -f docker-compose.dev.yml exec voltaje-dev sh

# Shell de voltaje-scripts
docker compose -f docker-compose.dev.yml exec voltaje-scripts bash

# Ejecutar comando único
docker compose -f docker-compose.dev.yml exec voltaje-dev npx quartz build
```

## Sincronización de Contenido

### Automática

El script `docker-entrypoint.sh` sincroniza automáticamente al iniciar:

```bash
#!/bin/bash
# Sincroniza content/ → quartz/content/
rsync -av --delete /workspace/content/ /workspace/quartz/content/

# Inicia Quartz
npx quartz build --serve
```

### Manual

```bash
# Acceder al contenedor
docker compose -f docker-compose.dev.yml exec voltaje-dev sh

# Sincronizar
rsync -av /workspace/content/ /workspace/quartz/content/

# Rebuild
npx quartz build
```

## Optimización de Rendimiento

### Volúmenes Nombrados

Los volúmenes nombrados mejoran el rendimiento en WSL:

```yaml
volumes:
  voltaje-quartz-node-modules:
    driver: local
    name: voltaje-quartz-node-modules
```

**Beneficios:**
- ✅ I/O más rápido
- ✅ No cruza el filesystem de WSL
- ✅ Cache persistente

### Hot Reload

Variables de entorno para hot reload en WSL:

```yaml
environment:
  - CHOKIDAR_USEPOLLING=true
  - CHOKIDAR_INTERVAL=1000  # Check cada segundo
```

### Recursos de Docker

Configuración recomendada en Docker Desktop:

- **Memoria:** 4GB mínimo
- **CPUs:** 4 cores mínimo
- **Swap:** 2GB
- **Disco:** 20GB

## Troubleshooting

### Contenedor No Inicia

```bash
# Ver logs de error
docker compose -f docker-compose.dev.yml logs

# Verificar Docker
docker info

# Rebuild
docker compose -f docker-compose.dev.yml build --no-cache
```

### Puerto Ocupado

```bash
# Ver qué usa el puerto
netstat -ano | findstr :8080

# Cambiar puerto
# Edita docker-compose.dev.yml:
ports:
  - "8081:8080"
```

### Hot Reload No Funciona

```bash
# Reiniciar contenedor
docker compose -f docker-compose.dev.yml restart voltaje-dev

# Verificar variables
docker compose -f docker-compose.dev.yml exec voltaje-dev env | grep CHOKIDAR
```

### Build Lento

```bash
# Limpiar caché de Docker
docker system prune -a

# Aumentar recursos en Docker Desktop
# Settings > Resources > Memory/CPUs
```

### Problemas con Volúmenes

```bash
# Ver volúmenes
docker volume ls

# Eliminar volúmenes no usados
docker volume prune

# Eliminar volúmenes específicos
docker compose -f docker-compose.dev.yml down -v
```

## Limpieza

### Limpieza Básica

```bash
# Detener y eliminar contenedores
docker compose -f docker-compose.dev.yml down

# Detener y eliminar volúmenes
docker compose -f docker-compose.dev.yml down -v
```

### Limpieza Completa

```bash
# Eliminar todo (contenedores, imágenes, volúmenes)
docker compose -f docker-compose.dev.yml down -v --rmi all

# Limpiar sistema Docker
docker system prune -a --volumes
```

## Healthchecks

El contenedor tiene healthcheck integrado:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

Ver estado:

```bash
docker compose -f docker-compose.dev.yml ps
# STATUS mostrará (healthy) o (unhealthy)
```

## Redes

Red interna para comunicación entre contenedores:

```yaml
networks:
  voltaje-network:
    driver: bridge
    name: voltaje-network
```

Inspeccionar:

```bash
docker network inspect voltaje-network
```

## Logs

### Ver Logs

```bash
# Todos los servicios
docker compose -f docker-compose.dev.yml logs -f

# Un servicio específico
docker compose -f docker-compose.dev.yml logs -f voltaje-dev

# Últimas N líneas
docker compose -f docker-compose.dev.yml logs --tail=100

# Desde tiempo específico
docker compose -f docker-compose.dev.yml logs --since 30m
```

### Guardar Logs

```bash
docker compose -f docker-compose.dev.yml logs > logs.txt
```

## Estadísticas

Ver uso de recursos:

```bash
# Todos los contenedores
docker stats

# Contenedor específico
docker stats voltaje-dev
```

## Integración con WSL

### Desde WSL

```bash
# Navegar al proyecto
cd /mnt/c/Users/TuUsuario/Documents/SOLE/dev_voltaje

# Usar comandos normalmente
npm run dev
make dev
docker compose -f docker-compose.dev.yml up -d
```

### Desde Windows

```powershell
# WSL tiene acceso a Docker Desktop automáticamente
# Usa los mismos comandos desde WSL
```

## Mejores Prácticas

### ✅ Hacer

- Usar volúmenes nombrados para mejor rendimiento
- Mantener `.dockerignore` actualizado
- Limpiar volúmenes no usados periódicamente
- Usar `down` en lugar de `stop` para cleanup completo
- Monitorear uso de recursos con `docker stats`

### ❌ Evitar

- No usar `docker system prune -a` sin pensar (elimina todo)
- No editar archivos dentro del contenedor directamente
- No ejecutar múltiples instancias del mismo servicio
- No ignorar warnings de healthcheck

---

**Última actualización:** 4 de Noviembre, 2025

