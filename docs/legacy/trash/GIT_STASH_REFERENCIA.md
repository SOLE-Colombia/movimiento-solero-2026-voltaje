# 🎯 Guía Rápida - Git Stash

## ¿Qué es Git Stash?

Git Stash te permite **guardar temporalmente** tus cambios sin hacer commit, para poder cambiar de rama o hacer pull limpiamente.

## 📦 Comandos Esenciales

### Guardar Cambios

```bash
# Guardar cambios (solo archivos tracked)
git stash

# Guardar TODOS los cambios (incluyendo archivos nuevos) ⭐
git stash push -u -m "Descripción de los cambios"

# Guardar con mensaje
git stash push -m "trabajo en progreso"

# Guardar incluyendo archivos sin trackear e ignorados
git stash push -u -a -m "todo guardado"
```

### Recuperar Cambios

```bash
# Recuperar el último stash y eliminarlo de la lista
git stash pop

# Aplicar el último stash pero mantenerlo en la lista
git stash apply

# Aplicar un stash específico
git stash apply stash@{2}
```

### Ver Stashes Guardados

```bash
# Listar todos los stashes
git stash list

# Ver contenido del último stash
git stash show

# Ver contenido completo del último stash
git stash show -p

# Ver contenido de un stash específico
git stash show -p stash@{1}
```

### Eliminar Stashes

```bash
# Eliminar el último stash
git stash drop

# Eliminar un stash específico
git stash drop stash@{2}

# Eliminar TODOS los stashes
git stash clear
```

## 🎬 Casos de Uso Comunes

### Caso 1: Necesitas hacer pull pero tienes cambios

```bash
# 1. Guardar cambios
git stash push -u -m "trabajo en progreso"

# 2. Actualizar rama
git pull origin desarrollo

# 3. Recuperar cambios
git stash pop

# Si hay conflictos, resuélvelos y luego:
git stash drop
```

### Caso 2: Cambiar de rama rápidamente

```bash
# 1. Guardar cambios actuales
git stash

# 2. Cambiar de rama
git checkout otra-rama

# 3. Hacer lo que necesites
# ...

# 4. Volver a tu rama
git checkout desarrollo

# 5. Recuperar cambios
git stash pop
```

### Caso 3: Probar algo sin perder tu trabajo

```bash
# 1. Guardar tu trabajo actual
git stash push -m "trabajo actual"

# 2. Probar algo nuevo
# ... hacer cambios de prueba ...

# 3. Si no te gusta, descartar:
git reset --hard HEAD

# 4. Recuperar tu trabajo original
git stash pop
```

### Caso 4: Dividir cambios en múltiples commits

```bash
# 1. Guardar todo
git stash push -u -m "todos los cambios"

# 2. Recuperar cambios pero no eliminar del stash
git stash apply

# 3. Agregar solo algunos archivos
git add archivo1.txt archivo2.txt
git commit -m "primer commit"

# 4. Limpiar lo demás y recuperar de nuevo
git reset --hard HEAD
git stash apply

# 5. Agregar otros archivos
git add archivo3.txt
git commit -m "segundo commit"

# 6. Eliminar el stash
git stash drop
```

## ⚠️ Importante

### Flags Útiles

| Flag | Qué Hace |
|------|----------|
| `-u` o `--include-untracked` | Guarda archivos nuevos (no tracked) |
| `-a` o `--all` | Guarda TODO incluyendo .gitignore |
| `-m` | Agregar mensaje descriptivo |
| `-p` | Modo interactivo (seleccionar qué guardar) |

### Mejor Práctica

Siempre usa `-u` y `-m` para stashes completos con descripción:

```bash
git stash push -u -m "descripción clara del contenido"
```

## 🔍 Ver Qué Hay en un Stash

```bash
# Listar archivos en el último stash
git stash show --name-only

# Ver diff completo
git stash show -p

# Ver diff de un stash específico
git stash show -p stash@{0}
```

## 🚨 Resolver Conflictos

Si `git stash pop` causa conflictos:

```bash
# 1. Ver los archivos en conflicto
git status

# 2. Resolver conflictos manualmente en cada archivo
# Busca las marcas: <<<<<<< HEAD, =======, >>>>>>> Stashed changes

# 3. Después de resolver:
git add archivo-resuelto.txt

# 4. NO necesitas commit, solo:
git stash drop
```

## 💡 Tips Avanzados

### Crear rama desde un stash

```bash
# Útil si quieres convertir un stash en una rama
git stash branch nombre-de-rama stash@{0}
```

### Stash selectivo (modo interactivo)

```bash
git stash push -p
# Te preguntará por cada cambio si quieres guardarlo
```

### Ver fecha de los stashes

```bash
git stash list --date=local
```

## 📊 Workflow Completo Recomendado

```bash
# 1. Ver qué tienes modificado
git status

# 2. Guardar todo con descripción
git stash push -u -m "feature X en progreso - falta testing"

# 3. Verificar que está limpio
git status

# 4. Hacer lo que necesites (pull, checkout, etc)
git pull origin desarrollo

# 5. Ver tus stashes
git stash list

# 6. Recuperar el trabajo
git stash pop

# 7. Si todo bien, continuar trabajando
git status
```

## 🎯 Comando del Día a Día

**Para guardar y actualizar (lo más común):**

```bash
# Todo en uno:
git stash push -u -m "WIP" && git pull && git stash pop
```

O crear un alias:

```bash
# Agregar a ~/.gitconfig
[alias]
    sync = !git stash push -u -m 'auto stash' && git pull && git stash pop

# Usar:
git sync
```

## ⚡ Atajos Útiles

```bash
# Ver el último stash
git stash show -p | less

# Contar cuántos stashes tienes
git stash list | wc -l

# Buscar en stashes
git stash list | grep "texto"

# Guardar solo staged changes
git stash push -m "solo staged" --staged
```

## 🔄 Diferencia: pop vs apply

```bash
# pop = aplicar + eliminar
git stash pop
# ↓
# Aplica cambios
# Elimina del stash si no hay errores

# apply = solo aplicar
git stash apply
# ↓  
# Aplica cambios
# Mantiene el stash para reusar
```

## 📝 Resumen de Comandos Más Usados

```bash
# Top 5 comandos que usarás más:

1. git stash push -u -m "mensaje"  # Guardar todo
2. git stash list                   # Ver lista
3. git stash pop                    # Recuperar último
4. git stash show -p                # Ver contenido
5. git stash drop                   # Eliminar último
```

## 🎉 Caso Real: Tu Situación de Hoy

```bash
# Error: "cannot pull with rebase: You have unstaged changes"

# Solución aplicada:
git stash push -u -m "GitHub Actions setup"
git pull origin desarrollo
git stash pop

# ✅ Resultado: Rama actualizada con tus cambios preservados
```

---

**💡 Tip Final:** Usa `git stash push -u -m "mensaje"` por defecto. Es la forma más segura y completa de guardar tu trabajo temporalmente.

**🔗 Más info:** `git stash --help`

