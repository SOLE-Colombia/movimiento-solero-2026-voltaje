# 📦 Guía de Git (Stash y Flujos Avanzados)

Referencia rápida para manejo de versiones y situaciones comunes con Git en este proyecto.

## 🚑 Emergencias con Git Stash
"Necesito cambiar de rama pero tengo trabajo a medias".

### Guardar cambios temporalmente
```bash
git stash push -u -m "Trabajo pendiente en X cosa"
```
*   `-u`: Incluye archivos nuevos (untracked).
*   `-m`: Mensaje para recordar qué es.

### Recuperar cambios
```bash
git stash pop
```
*Recupera lo último guardado y lo borra de la lista temporal.*

### Ver qué tengo guardado
```bash
git stash list
```

---

## 🔄 Flujo de Trabajo Recomendado

### 1. Empezar el día
```bash
git checkout main
git pull origin main
```

### 2. Crear nueva funcionalidad
```bash
git checkout -b feat/mi-nueva-funcionalidad
# ... trabajar ...
```

### 3. Guardar cambios
```bash
git add .
git commit -m "feat: descripción clara de lo que hice"
```

### 4. Subir cambios
```bash
git push origin feat/mi-nueva-funcionalidad
```

---

## 🛠️ Comandos Útiles

| Comando | Descripción |
| :--- | :--- |
| `git status` | **ÚSALO SIEMPRE.** Te dice en qué rama estás y qué has cambiado. |
| `git log --oneline` | Historial compacto de cambios. |
| `git checkout .` | **PELIGRO.** Borra todos los cambios locales no guardados (volver al último commit). |
| `git clean -fd` | Borra archivos nuevos no guardados. |

