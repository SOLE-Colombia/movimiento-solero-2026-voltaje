# 🎯 START HERE - SOLE Voltaje

## ⚡ Inicio en 2 Comandos

```
📦 Proyecto completo listo para GitHub
🔐 Tu SSH ya configurada (voltaje@solecolombia.org)
👥 Documentación para todo tu equipo
🚀 Scripts automáticos
```

---

## 🚀 INICIO INMEDIATO

### David - Lee tu guía personalizada:

👉 **[RESUMEN_FINAL_DAVID.md](RESUMEN_FINAL_DAVID.md)** ⭐

### TRES PASOS SIMPLES:

```cmd
# 1. Configurar SSH con tu key "sole"
scripts\config-ssh-sole.bat

# 2. Agregar la key en GitHub (te la muestra el script)
# https://github.com/settings/keys

# 3. Subir a GitHub
scripts\push-simple.bat
```

✅ Configura SSH para usar tu key "sole"  
✅ Sube todo a SOLE-Colombia/dev_voltaje  
✅ Crea las 3 ramas automáticamente  

**Repositorio**: https://github.com/SOLE-Colombia/dev_voltaje

---

## 👥 PASO 2: Organiza tu Equipo (1 hora)

**Comparte con tu equipo:**

1. **[GUIA_EQUIPO_CONTENIDO.md](GUIA_EQUIPO_CONTENIDO.md)** → Todos leen esto
2. **[TAREAS_SEMANALES.md](TAREAS_SEMANALES.md)** → Lista de tareas con checklist

**Roles**:
- 👨‍💼 **David**: Coordinador técnico (Git, vínculos)
- 🖼️ **Catalina**: Gestión de imágenes
- ✍️ **Belén**: Edición de contenido
- 📋 **Sanjay**: Licencias y coherencia

---

## 📝 PASO 3: Empieza a Trabajar (inmediato)

### David:
```cmd
# Validar vínculos
py scripts\10-validate.py

# Ver reporte
type reports\validation-errors.txt
```

### Catalina y Belén:
```cmd
# Cambiar a rama de contenido
scripts\switch-branch.bat
# Seleccionar: 1 (content-editing)

# Trabajar en:
content\assets\images\    ← Catalina
content\es\               ← Belén
```

### Sanjay:
- Revisar archivos .md
- Agregar licencias (plantilla en GUIA_EQUIPO_CONTENIDO.md)

---

## 📚 Documentación Disponible

### 🎯 Prioridad ALTA (Leer HOY)
- **[EMPIEZA_AQUI_AHORA.md](EMPIEZA_AQUI_AHORA.md)** - Para David
- **[GUIA_EQUIPO_CONTENIDO.md](GUIA_EQUIPO_CONTENIDO.md)** - Para todos
- **[TAREAS_SEMANALES.md](TAREAS_SEMANALES.md)** - Lista de trabajo

### 📖 Referencia (Consultar cuando necesites)
- **[INSTRUCCIONES_SOLE_COLOMBIA.md](INSTRUCCIONES_SOLE_COLOMBIA.md)** - Setup GitHub
- **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Comandos Git
- **[RESUMEN_DOCUMENTACION_COMPLETA.md](RESUMEN_DOCUMENTACION_COMPLETA.md)** - Índice completo

### 📝 Plantillas (Usar para crear contenido)
- **PLANTILLAS/solucion-tecnica.md**
- **PLANTILLAS/historia-inspiradora.md**
- **PLANTILLAS/termino-glosario.md**

---

## 🗓️ Plan de 4 Semanas

### Semana 1: Setup ✅
- David sube a GitHub
- Equipo lee documentación
- Primera reunión

### Semana 2: Imágenes 🖼️
- Catalina + Belén renombran
- Organizar en carpetas
- Commit y push

### Semana 3: Vínculos 🔗
- David actualiza referencias
- Validar enlaces
- Corregir errores

### Semana 4: Publicación 🚀
- Sanjay agrega licencias
- Belén revisa idioma
- Deploy a producción

---

## ✅ Checklist Rápido

### HOY
- [ ] Ejecutar `scripts\push-to-sole-colombia.bat`
- [ ] Verificar en GitHub
- [ ] Compartir GUIA_EQUIPO_CONTENIDO.md con el equipo

### ESTA SEMANA
- [ ] Configurar protección de ramas en GitHub
- [ ] Agregar colaboradores
- [ ] Primera reunión de equipo
- [ ] Asignar tareas de Semana 1

### SIGUIENTE SEMANA
- [ ] Comenzar con organización de imágenes
- [ ] Ejecutar validación semanal
- [ ] Revisar PRs del equipo

---

## 🎯 Estructura del Proyecto

```
📁 content/
├── 🇪🇸 es/              584 archivos markdown en español
├── 🇬🇧 en/              153 archivos markdown en inglés
└── 🖼️ assets/images/    731 imágenes optimizadas

📁 scripts/              32 scripts de automatización
📁 quartz/               Código del sitio web
📁 PLANTILLAS/           Plantillas para contenido nuevo
```

---

## 🌳 Sistema de 3 Ramas

```
content-editing  →  development  →  main
   (Contenido)      (Desarrollo)    (Producción)
```

- **content-editing**: Redactores, editores
- **development**: Desarrolladores
- **main**: Deploy automático (protegida)

---

## 🆘 ¿Necesitas Ayuda?

### Por tipo de tarea:

**Subir a GitHub**  
→ [EMPIEZA_AQUI_AHORA.md](EMPIEZA_AQUI_AHORA.md)

**Trabajar con el equipo**  
→ [GUIA_EQUIPO_CONTENIDO.md](GUIA_EQUIPO_CONTENIDO.md)

**Comandos de Git**  
→ [COMANDOS_GIT.md](COMANDOS_GIT.md)

**Ver todas las guías**  
→ [RESUMEN_DOCUMENTACION_COMPLETA.md](RESUMEN_DOCUMENTACION_COMPLETA.md)

---

## 🎉 ¡Listo!

**Tu proyecto SOLE Voltaje está completo y listo para GitHub.**

**Siguiente acción**: Ejecuta `scripts\push-to-sole-colombia.bat`

---

**¡Adelante! Cambiemos el mundo juntos** ⚡


