# 🐳 Guía de Docker y DevContainers

Este proyecto utiliza **DevContainers** para proporcionar un entorno de desarrollo consistente, aislado y reproducible. Ya no utilizamos `docker-compose` para el flujo de desarrollo diario, simplificando así la gestión de contenedores.

## ¿Por qué DevContainers?

*   **Consistencia:** Todos usan la misma versión de Node.js, Python y herramientas del sistema.
*   **Aislamiento:** Las dependencias no ensucian tu sistema operativo principal.
*   **Seguridad:** Ejecutamos todo como un usuario no-root (`sole`), lo que evita problemas de permisos en tus archivos locales.

---

## 📦 Configuración del Contenedor

La configuración reside en la carpeta `.devcontainer/`:

*   **`Dockerfile`**: Define la imagen del sistema.
    *   Basado en `node:22`.
    *   Instala Python 3, Git, Zsh.
    *   Configura el usuario `sole`.
*   **`devcontainer.json`**: Configura VS Code.
    *   Define extensiones a instalar.
    *   Monta tus credenciales SSH y Git del host.
    *   Establece comandos de post-creación (`npm install`).

---

## 🚀 Gestión del Entorno

### Iniciar el Entorno
Simplemente abre la carpeta del proyecto en VS Code y acepta la sugerencia "Reopen in Container", o usa la paleta de comandos (`F1`) > **Dev Containers: Reopen in Container**.

### Reconstruir el Entorno
Si cambias el `Dockerfile` o el `devcontainer.json` (por ejemplo, para añadir una nueva herramienta del sistema), necesitas reconstruir:
1.  `F1` > **Dev Containers: Rebuild Container**.
2.  Si tienes problemas extraños, usa **Dev Containers: Rebuild Container Without Cache**.

---

## 🔧 Solución de Problemas Comunes

### 1. Permisos denegados en archivos
Gracias al usuario `sole`, esto debería ser raro. Si ocurre, puedes arreglar la propiedad de los archivos desde dentro del contenedor:
```bash
sudo chown -R sole:sole .
```

### 2. Git no me deja hacer push
El contenedor intenta montar tus llaves desde `~/.ssh` en tu máquina host.
*   Asegúrate de tener llaves SSH configuradas en tu máquina local.
*   Si estás en Windows (WSL), asegúrate de que el agente SSH esté corriendo o que tus llaves estén accesibles en el sistema de archivos de WSL.

### 3. El servidor no refresca cambios (Hot Reload)
Quartz usa `chokidar` para observar cambios. En algunos sistemas de archivos (especialmente Docker sobre Windows/WSL), los eventos de archivo no se propagan bien.
Si te ocurre, intenta forzar el polling:
```bash
CHOKIDAR_USEPOLLING=true npm run dev
```

### 4. Puertos ocupados
Si el puerto 8080 está ocupado, VS Code intentará reenviarlo a otro puerto libre automáticamente. Mira la pestaña "Ports" en VS Code para ver en qué puerto real quedó tu aplicación.

---

## 📝 Comandos Útiles

### Ver logs del contenedor
```bash
# Desde VS Code, abre la terminal integrada (Ctrl + `)
# Ya estás dentro del contenedor
```

### Reiniciar el servidor
```bash
# Detener: Ctrl + C
# Iniciar de nuevo:
npm run dev
```

### Acceso shell adicional
Si necesitas otra terminal dentro del mismo contenedor:
*   En VS Code: `Terminal > New Terminal` (automáticamente abre en el contenedor).

---
*Para configuración avanzada, consulta [ARQUITECTURA.md](./ARQUITECTURA.md).*
