# Plan de Configuración Completa - SOLE Voltaje

## Contexto

Este documento describe el plan completo para configurar el flujo de trabajo de desarrollo, CI/CD, y publicación del sitio SOLE Voltaje.

## Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────────┐
│                    REPOSITORIO PRIVADO                          │
│                  (github.com/tu-org/dev_voltaje)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  main          ← solo merges desde desarrollo                  │
│    ↑              [GitHub Actions: Build & Push]               │
│    │                                                            │
│  desarrollo    ← recibe merges de feature branches             │
│    ↑              [GitHub Actions: Test & Preview]             │
│    │                                                            │
│  feature/*     ← trabajo en curso (imágenes, contenido, etc)   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ GitHub Actions
                            │ (auto-deploy)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    REPOSITORIO PÚBLICO                          │
│              (github.com/tu-org/voltaje-public)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  main          ← sitio compilado con Quartz                    │
│                  [GitHub Pages activado]                        │
│                                                                 │
│  Contenido:                                                     │
│  - HTML/CSS/JS generado por Quartz                             │
│  - Assets optimizados                                           │
│  - Sin archivos markdown fuente                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ GitHub Pages
                            ↓
                  https://voltaje.solecolombia.org
```

## Estructura de Ramas

### main (Producción)
- **Propósito**: Código estable listo para producción
- **Actualizaciones**: Solo mediante Pull Request desde `desarrollo`
- **Protección**: Branch protection rules activadas
- **CI/CD**: Build automático → Deploy a repo público

### desarrollo (Integración)
- **Propósito**: Integración de features antes de producción
- **Actualizaciones**: Mediante Pull Request desde feature branches
- **Testing**: Builds de prueba automáticos
- **Preview**: Deploy a preview environment (opcional)

### redaccion (Feature Branch)
- **Propósito**: Trabajo en contenido y redacción
- **Merge a**: desarrollo

### feature/* (Feature Branches)
- **Propósito**: Desarrollo de características específicas
- **Ejemplos**: 
  - `feature/optimize-images`
  - `feature/new-content`
  - `feature/fix-links`
- **Merge a**: desarrollo

## Flujo de Trabajo

### 1. Desarrollo Normal

```bash
# 1. Crear rama de feature desde desarrollo
git checkout desarrollo
git pull origin desarrollo
git checkout -b feature/mi-cambio

# 2. Realizar cambios y commits
git add .
git commit -m "descripción del cambio"

# 3. Push y crear Pull Request
git push origin feature/mi-cambio
# Crear PR en GitHub: feature/mi-cambio → desarrollo

# 4. Review y merge
# Alguien revisa el PR
# Se hace merge a desarrollo

# 5. Cuando desarrollo está estable
# Crear PR: desarrollo → main
# Review final
# Merge a main → Trigger deploy automático
```

### 2. Desarrollo con Docker (Local)

```bash
# 1. Iniciar entorno de desarrollo
docker-compose up -d

# 2. Trabajar normalmente
# Los cambios se reflejan en tiempo real

# 3. Ver preview local
# http://localhost:8080

# 4. Detener entorno
docker-compose down
```

## Componentes a Configurar

### A. Repositorios GitHub
1. Repositorio privado (actual)
2. Repositorio público (nuevo)

### B. GitHub Actions
1. Workflow para main (build & deploy)
2. Workflow para desarrollo (test & preview)
3. Workflow para PRs (validation)

### C. Docker
1. Dockerfile para desarrollo
2. docker-compose.yml
3. Scripts de build

### D. Quartz
1. Configuración de build
2. Scripts de exportación
3. Optimización de assets

### E. Scripts
1. Script de sincronización entre repos
2. Script de build local
3. Script de validación

## Próximos Pasos

1. ✅ Documentar plan
2. ⏳ Crear repositorio público
3. ⏳ Configurar GitHub Actions
4. ⏳ Configurar Docker
5. ⏳ Configurar Quartz
6. ⏳ Crear scripts
7. ⏳ Configurar branch protection
8. ⏳ Testing completo
9. ⏳ Documentación para el equipo

## Notas Importantes

- **Seguridad**: Nunca exponer tokens/secrets en el código
- **Backups**: Siempre tener respaldo antes de cambios grandes
- **Testing**: Probar todo en desarrollo antes de main
- **Documentación**: Mantener esta guía actualizada


