# Guía de Solución de Problemas Git en Dev Containers

Esta guía ayuda al equipo a resolver problemas comunes con Git, Dev Containers y entornos mixtos (Windows/WSL, macOS).

## 1. Verificación de Configuración Git

Dentro del contenedor, verifica que tu identidad de Git se ha cargado correctamente desde el host.

Ejecuta en la terminal integrada de VS Code:

```bash
git config --list | grep user
```

**Salida esperada:**
```text
user.name=Tu Nombre
user.email=tu@email.com
include.path=/home/sole/.gitconfig_mount
```

Si ves esto, ¡todo está correcto! Tu configuración personal se está usando.

### ¿Qué pasa si no sale nada?
Si no ves tu usuario, es posible que no tengas un archivo `~/.gitconfig` en tu sistema host (Windows o macOS).
El contenedor usará una configuración vacía por defecto para no romperse.

**Solución:**
Crea tu archivo `.gitconfig` en tu máquina local (fuera del contenedor):
```bash
# En tu terminal local (PowerShell o Terminal)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```
Luego, reconstruye el contenedor: `F1` > `Dev Containers: Rebuild Container`.

---

## 2. Resolución de "Unmerged Paths" (Merge Atascado)

Si al abrir el proyecto o hacer un pull ves mensajes como:
`Unmerged paths: both modified: ...`

Significa que hay un conflicto de fusión (merge conflict) pendiente. Git está esperando que decidas qué cambios conservar.

### Pasos para arreglarlo:

1.  **Identifica los archivos en conflicto:**
    ```bash
    git status
    ```

2.  **Abre los archivos marcados como "both modified".**
    VS Code resaltará las diferencias con colores (Current Change vs Incoming Change).

3.  **Elige la versión correcta:**
    - Usa los botones "Accept Current Change", "Accept Incoming Change" o edita manualmente.
    - Guarda el archivo.

4.  **Marca el conflicto como resuelto:**
    ```bash
    git add <archivo-arreglado>
    ```

5.  **Finaliza el merge:**
    ```bash
    git commit
    # Se abrirá un editor para el mensaje del commit. Guarda y cierra.
    ```

### Emergencia: "Quiero descartar el merge y volver a como estaba"
Si te has liado y quieres cancelar el intento de mezcla:

```bash
git merge --abort
```
Esto devolverá el repo al estado limpio anterior al intento de merge.

---

## 3. Antes de abrir el Dev Container

Para evitar errores de montaje o bloqueos al iniciar, asegúrate de que tu repo local está "sano" antes de abrir VS Code en el contenedor.

**Checklist rápido en tu terminal local:**

1.  **Estado limpio:**
    ```bash
    git status
    ```
    No debería haber un merge a medias si vas a cambiar de rama o iniciar el contenedor.

2.  **Pull reciente:**
    Si trabajas en equipo, asegúrate de tener lo último antes de empezar a trabajar:
    ```bash
    git pull
    ```

---

## 4. Explicación Técnica (Para curiosos)

**¿Por qué cambiamos la configuración del Dev Container?**

Antes, montábamos `~/.gitconfig` directamente. Si este archivo no existía en tu ordenador, Docker creaba una **carpeta** vacía en su lugar dentro del contenedor, lo que hacía que Git fallara con el error `unable to access ... Is a directory`.

**La solución aplicada:**
Ahora montamos tu config en un archivo temporal (`.gitconfig_mount`) y le decimos a Git que lo incluya **solo si existe**. Si no tienes config en tu host, el contenedor simplemente usa una configuración por defecto y no se rompe.
