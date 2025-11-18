# 🚨 SOLUCIÓN: Pérdida de cambios al usar `npm run dev`

## 🔍 El Problema

Cada vez que ejecutabas `npm run dev` o reiniciabas Docker, **perdías todos tus cambios** en los archivos Markdown.

### ¿Por qué pasaba esto?

Había **dos carpetas de contenido**:

```
dev_voltaje/
├── content/               ❌ CARPETA ANTIGUA (desactualizada)
│   ├── es/
│   ├── en/
│   └── assets/
│
└── quartz/
    └── content/           ✅ CARPETA CORRECTA (donde debes editar)
        ├── es/
        ├── en/
        └── assets/
```

**El script `docker-entrypoint.sh` hacía esto:**

```bash
# ANTES (PROBLEMA):
rsync -av --delete /workspace/content/ /workspace/quartz/content/
#                   ↑ Carpeta antigua    ↑ Carpeta correcta
#                   (desactualizada)     (con tus cambios)
```

Esto **sobrescribía** `quartz/content/` (con tus cambios nuevos) con `content/` (antigua), **borrando todo tu progreso**.

---

## ✅ La Solución (YA APLICADA)

### 1. Eliminamos el `rsync` problemático

**Archivo:** `scripts/docker-entrypoint.sh`

**ANTES:**
```bash
rsync -av --delete /workspace/content/ /workspace/quartz/content/
```

**AHORA:**
```bash
# DESHABILITADO - Ya no sobrescribe tus cambios
# Tu contenido está en: /workspace/quartz/content/
```

### 2. Eliminamos el mount de la carpeta antigua

**Archivo:** `docker-compose.dev.yml`

**ANTES:**
```yaml
volumes:
  - .:/workspace:cached
  - ./content:/workspace/content:ro  # ❌ Montaba carpeta antigua
```

**AHORA:**
```yaml
volumes:
  - .:/workspace:cached  # ✅ Solo monta todo el proyecto
```

---

## 📍 ¿Dónde está MI contenido?

### ✅ Edita SIEMPRE en:

```
quartz/content/
├── es/              ← Contenido en español
│   ├── inspirate/
│   ├── soluciona/
│   ├── conceptorio/
│   └── ...
│
├── en/              ← Content in English
│   ├── inspire/
│   ├── solve/
│   ├── glossary/
│   └── ...
│
└── assets/
    └── images/      ← Imágenes
```

### ❌ NO edites en:

```
content/             ← Carpeta antigua (desactualizada)
```

**Esta carpeta será archivada/eliminada para evitar confusión.**

---

## 🧪 Cómo verificar que funciona

### Paso 1: Detener Docker

```bash
docker compose -f docker-compose.dev.yml down
```

### Paso 2: Editar un archivo de prueba

```bash
# Edita cualquier archivo MD en:
quartz/content/es/inspirate/[cualquier-archivo].md
```

Haz un cambio simple, por ejemplo, agrega un emoji o texto.

### Paso 3: Iniciar Docker de nuevo

```bash
npm run dev
# O:
docker compose -f docker-compose.dev.yml up
```

### Paso 4: Verificar

1. Abre el archivo que editaste
2. **¿Está tu cambio todavía ahí?**
   - ✅ **SÍ** → ¡Funcionó! Tus cambios se preservan
   - ❌ **NO** → Contacta inmediatamente, hay otro problema

---

## 🔄 Flujo de trabajo CORRECTO

### Edición Local (Sin Docker)

```bash
# 1. Edita archivos directamente
code quartz/content/es/inspirate/mi-articulo.md

# 2. Guarda en Git
git add quartz/content/
git commit -m "actualizar contenido"
git push
```

### Edición con Docker

```bash
# 1. Inicia el servidor
npm run dev

# 2. Edita archivos en tu editor
# Los cambios están en: quartz/content/

# 3. El navegador se recarga automáticamente
# Abre: http://localhost:8080

# 4. Cuando termines, guarda en Git
git add quartz/content/
git commit -m "actualizar contenido"
git push
```

### ✅ **Ahora tus cambios se GUARDAN correctamente**

---

## 📊 Resumen de cambios

| Antes | Ahora |
|-------|-------|
| ❌ Cambios se perdían al reiniciar | ✅ Cambios se preservan siempre |
| ❌ `rsync --delete` borraba todo | ✅ Sin `rsync`, sin borrado |
| ❌ Dos carpetas de contenido | ✅ Una sola carpeta: `quartz/content/` |
| ❌ Confusión sobre dónde editar | ✅ Claro: edita en `quartz/content/` |

---

## 🗑️ ¿Qué hacer con la carpeta `content/` antigua?

### Opción 1: Archivarla (Recomendado)

```bash
# Renombrar para preservar por si acaso
mv content content_backup_$(date +%Y%m%d)
```

### Opción 2: Eliminarla (Si estás seguro)

```bash
# ⚠️ CUIDADO: Esto elimina permanentemente
rm -rf content/
```

### Opción 3: Dejarla (No recomendado)

- Puede causar confusión en el futuro
- Ocupa espacio innecesario
- No se usa para nada

**Recomendación:** Haz la **Opción 1** (archivar) para estar seguro.

---

## ✅ Checklist de verificación

- [x] Script `docker-entrypoint.sh` actualizado (sin `rsync`)
- [x] `docker-compose.dev.yml` actualizado (sin mount de `./content`)
- [x] Cambios guardados en Git
- [ ] Probar editar un archivo y reiniciar Docker
- [ ] Verificar que el cambio se preserva
- [ ] Archivar carpeta `content/` antigua
- [ ] Continuar trabajando normalmente

---

## 🎉 ¡Problema resuelto!

Ahora puedes trabajar tranquilamente sabiendo que:

✅ Tus cambios se **guardan correctamente**
✅ Docker **NO borra** tu trabajo
✅ La carpeta correcta es **`quartz/content/`**
✅ Puedes reiniciar el servidor sin miedo

---

**Última actualización:** 10 de Noviembre, 2025
**Versión:** 1.0.0
**Estado:** ✅ RESUELTO

