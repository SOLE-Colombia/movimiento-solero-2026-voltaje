# 🚀 Inicio Rápido - Configuración SOLE Voltaje

## ✨ ¿Qué acabas de recibir?

Un sistema completo de desarrollo y despliegue automático para SOLE Voltaje con:

- ✅ **CI/CD con GitHub Actions** - Deploy automático
- ✅ **Docker** - Desarrollo local consistente
- ✅ **Dos repositorios** - Privado (desarrollo) + Público (sitio)
- ✅ **Control de versiones** - Flujo de trabajo estructurado
- ✅ **Documentación completa** - Guías paso a paso

## 📚 Archivos Creados

### 1. Workflows de GitHub Actions
```
.github/workflows/
├── deploy-production.yml     # Deploy automático desde main
└── test-desarrollo.yml        # Tests en desarrollo y PRs
```

###2. Configuración de Docker
```
├── docker-compose.dev.yml    # Orquestación de servicios
├── Dockerfile.dev            # Imagen para Quartz/Node
└── Dockerfile.scripts        # Imagen para scripts Python
```

### 3. Scripts de Automatización
```
scripts/
├── dev-local.sh             # Iniciar desarrollo (Linux/Mac)
├── dev-local.bat            # Iniciar desarrollo (Windows)
└── sync-to-public.sh        # Sincronización manual
```

### 4. Guías y Documentación
```
guias/
├── PLAN_CONFIGURACION_COMPLETA.md       # Plan maestro
├── CONFIGURACION_GITHUB.md              # Paso a paso detallado  
├── RESUMEN_EJECUTIVO_CONFIGURACION.md   # Vista general
└── INICIO_RAPIDO_CONFIGURACION.md       # Este archivo
```

## 🎯 Tu Próximo Paso

### Opción A: Configurar Todo (Recomendado)

**Lee este archivo primero:**
```
📖 guias/RESUMEN_EJECUTIVO_CONFIGURACION.md
```

**Luego sigue este:**
```
📋 guias/CONFIGURACION_GITHUB.md
```

**Tiempo estimado:** ~1 hora

### Opción B: Solo Desarrollo Local (Rápido)

**Para Windows:**
```cmd
# 1. Abrir Docker Desktop
# 2. En PowerShell:
cd C:\Users\Danvegamo\Documents\SOLE\dev_voltaje
.\scripts\dev-local.bat
```

**Para Linux/Mac:**
```bash
# 1. En terminal:
cd /ruta/a/dev_voltaje
chmod +x scripts/dev-local.sh
./scripts/dev-local.sh
```

**Tiempo estimado:** ~5 minutos

## 📊 Visualización del Flujo

```
TU MÁQUINA (Docker)
     ↓ git push
┌────────────────────┐
│  GitHub - Privado  │
│                    │
│  feature/algo      │
│       ↓            │
│  desarrollo  ←──── ✅ Tests automáticos
│       ↓            │
│  main        ←──── ✅ Tests + Deploy automático
└────────────────────┘
         ↓
┌────────────────────┐
│  GitHub - Público  │
│                    │
│  Sitio compilado   │
│  con Quartz        │
└────────────────────┘
         ↓
   voltaje.solecolombia.org
```

## 🎬 Tutorial en 3 Pasos

### Paso 1: Configurar Repositorios (10 min)

1. Crear repo público en GitHub
2. Agregar secrets al repo privado
3. Configurar GitHub Pages

**Guía:** `guias/CONFIGURACION_GITHUB.md` - Sección "PARTE 1 y 2"

### Paso 2: Probar Localmente (5 min)

1. Iniciar Docker Desktop
2. Ejecutar `dev-local.bat` o `dev-local.sh`
3. Abrir http://localhost:8080

**Guía:** `guias/RESUMEN_EJECUTIVO_CONFIGURACION.md` - Sección "Inicio Rápido"

### Paso 3: Probar Deploy Automático (15 min)

1. Crear rama de prueba
2. Hacer cambio pequeño
3. Push y crear PR
4. Mergear y ver deploy automático

**Guía:** `guias/CONFIGURACION_GITHUB.md` - Sección "PARTE 6"

## 🔧 Comandos Rápidos

### Docker (Desarrollo Local)

```bash
# Iniciar
.\scripts\dev-local.bat          # Windows
./scripts/dev-local.sh           # Linux/Mac

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Detener
docker-compose -f docker-compose.dev.yml down

# Reconstruir (si hay problemas)
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Git (Flujo de Trabajo)

```bash
# Crear nueva feature
git checkout desarrollo
git pull origin desarrollo
git checkout -b feature/mi-cambio

# Hacer cambios y commit
git add .
git commit -m "descripción"
git push origin feature/mi-cambio

# Actualizar desde desarrollo
git checkout feature/mi-cambio
git rebase desarrollo
```

## ❓ FAQ Rápido

**P: ¿Puedo saltarme la configuración de GitHub?**
R: No para el deploy automático, pero sí para desarrollo local

**P: ¿Docker es obligatorio?**
R: No, pero garantiza consistencia entre máquinas

**P: ¿Cuánto cuesta esto?**
R: $0 - Todo es gratis (GitHub Pages, GitHub Actions)

**P: ¿Qué pasa si algo falla?**
R: Ver sección Troubleshooting en `RESUMEN_EJECUTIVO_CONFIGURACION.md`

**P: ¿Necesito saber Docker?**
R: No, solo ejecutar los scripts

**P: ¿Y si trabajo en Windows?**
R: Todo funciona, usa los archivos .bat

## 📞 Próximos Pasos Sugeridos

### Hoy (30 min)
1. ☐ Leer `RESUMEN_EJECUTIVO_CONFIGURACION.md`
2. ☐ Probar desarrollo local con Docker
3. ☐ Verificar que funcione en localhost:8080

### Esta Semana (2 horas)
1. ☐ Crear repositorio público
2. ☐ Configurar secrets y workflows
3. ☐ Probar deploy automático
4. ☐ Configurar branch protection

### Próxima Semana (1 hora)
1. ☐ Invitar al equipo
2. ☐ Hacer training de flujo de trabajo
3. ☐ Documentar procesos específicos del equipo

## 🎉 ¡Estás Listo!

Tienes todo lo necesario para un flujo de trabajo profesional.

**Recuerda:** 
- Los archivos están organizados en `guias/`
- Cada guía tiene su propósito específico
- Empieza por el RESUMEN_EJECUTIVO si quieres la vista completa
- Empieza por CONFIGURACION_GITHUB si quieres ir directo al grano

---

**¿Dudas?** Lee las guías o pregunta en el canal del equipo.

**¿Todo funciona?** ¡Genial! Marca este checklist:
- ☐ Docker funciona localmente
- ☐ Repo público creado
- ☐ Secrets configurados
- ☐ Deploy automático funciona
- ☐ Equipo puede colaborar


