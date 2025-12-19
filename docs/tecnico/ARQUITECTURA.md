# 🏗️ Arquitectura del Proyecto SOLE Voltaje

Este documento detalla las decisiones de arquitectura y la estructura técnica del proyecto **SOLE Voltaje**.

## 🎯 Filosofía de Diseño
El proyecto busca ser un "Jardín Digital" sostenible y escalable. Para lograrlo, nos hemos basado en la configuración robusta del proyecto "Kauka", adaptándola a las necesidades de un sitio estático generado con **Quartz v4**.

Principios clave:
1.  **Estandarización:** Todos los desarrolladores usan exactamente el mismo entorno (DevContainers).
2.  **Seguridad:** Gestión correcta de permisos de usuario (evitar `root` en archivos generados).
3.  **Simplicidad:** Estructura de archivos plana y comandos unificados.

## 🐳 Entorno de Desarrollo (DevContainer)

El entorno de desarrollo está contenerizado usando Docker y la especificación DevContainer de VS Code. Esto elimina el clásico problema de "en mi máquina funciona".

### Componentes Clave

#### 1. Imagen Unificada (`Dockerfile`)
En lugar de usar múltiples contenedores con Docker Compose para desarrollo (que añade complejidad de red), usamos una única imagen "toolbox" que contiene todo lo necesario:
*   **Base:** `node:22` (LTS actual).
*   **Python 3:** Incluido para ejecutar scripts de migración y procesamiento de datos legacy.
*   **Utilidades:** `git`, `curl`, `zsh`, `openssl`.
*   **Usuario:** Se crea un usuario `sole` (UID 1000) para coincidir con el usuario por defecto en la mayoría de sistemas Linux/WSL, evitando problemas de permisos de escritura en los volúmenes montados.

#### 2. Inyección de Credenciales (`devcontainer.json`)
Para que trabajar con Git sea transparente, el contenedor monta automáticamente archivos del host:
*   `~/.ssh`: Para permitir `git push` / `git pull` vía SSH.
*   `~/.gitconfig`: Para firmar commits con tu identidad real.
*   `ssh-auth.sock`: Para reenvío del agente SSH (SSH Agent Forwarding).

#### 3. Experiencia de Desarrollador (DX)
*   **Shell:** Zsh configurado con **Powerlevel10k** para una terminal informativa y estética.
*   **Extensiones VS Code:** Se instalan automáticamente extensiones para Tailwind, Prettier, Corrector Ortográfico y herramientas de Markdown.
*   **Puertos:** El puerto `8080` se expone automáticamente para el servidor de desarrollo.

## 📂 Estructura de Carpetas

Hemos migrado de una estructura anidada (`quartz/quartz/...`) a una estructura plana en la raíz para simplificar los imports y la gestión.

| Directorio | Propósito |
| :--- | :--- |
| `/` (Raíz) | Archivos de configuración (`package.json`, `quartz.config.ts`) y punto de entrada. |
| `content/` | **El corazón del proyecto.** Aquí residen todos los archivos Markdown y assets. |
| `quartz/` | Código fuente del framework Quartz. Solo se toca si desarrollas plugins o componentes. |
| `scripts/` | Scripts de Python y Bash para tareas de mantenimiento, migración o limpieza. |
| `docs/` | Documentación técnica y manuales de usuario. |
| `.devcontainer/` | Definición del entorno Docker. |

## 🔄 Flujo de Trabajo Quartz v4

Quartz v4 funciona transformando Markdown en HTML estático.

1.  **Entrada:** Archivos `.md` en `content/`.
2.  **Procesamiento:**
    *   Plugins de Quartz (definidos en `quartz.config.ts`) procesan el texto.
    *   Se aplican layouts y componentes (definidos en `quartz.layout.ts` y `quartz/components/`).
3.  **Salida:** Archivos HTML/CSS/JS en la carpeta `public/`.

### Comandos Principales
El `package.json` en la raíz orquesta todo:
*   `npm run dev`: Inicia `quartz build --serve`. Levanta un servidor local y vigila cambios (Hot Reload).
*   `npx quartz sync`: Ayuda a sincronizar cambios con Git.

---

## 🧭 Visión global (lectura recomendada)

Si necesitas una lógica global del sistema (contenido → build → deploy), además de una guía sobre **rastreo de actividad** e **interactividad en un sitio estático**, consulta:

- `docs/tecnico/MAPA_DEL_PROYECTO.md`

## ⚠️ Notas de Migración

Si vienes de la versión anterior del proyecto:
1.  Ya no se usa `docker-compose.dev.yml` para desarrollo diario. Todo se maneja vía DevContainer.
2.  No necesitas hacer `cd quartz` para correr comandos. Todo se ejecuta desde la raíz.
3.  Los scripts antiguos se han movido a `scripts/` y pueden requerir ajustes de rutas si se ejecutan fuera del contenedor (aunque se recomienda ejecutarlos dentro).

