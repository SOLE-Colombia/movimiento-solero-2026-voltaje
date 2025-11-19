# 🌐 SOLE Voltaje

> **Jardín Digital y Sistema de Documentación para la Fundación SOLE Colombia.**  
> *Desarrollado por David Vega.*

Este repositorio aloja la base de conocimiento de **SOLE Colombia**, estructurada como un jardín digital interconectado. El proyecto utiliza **Quartz v4** como generador de sitios estáticos y un entorno de desarrollo estandarizado basado en **DevContainers** para garantizar que todos los colaboradores (técnicos y no técnicos) trabajen bajo las mismas condiciones.

## 🚀 Inicio Rápido (Recomendado)

Este proyecto está diseñado para funcionar "out-of-the-box" con **VS Code Dev Containers**. No necesitas instalar Node.js, Python ni Quartz en tu máquina local. Solo necesitas Docker y VS Code.

### Prerrequisitos
1.  [Docker Desktop](https://www.docker.com/products/docker-desktop/) (o Docker Engine en Linux).
2.  [Visual Studio Code](https://code.visualstudio.com/).
3.  Extensión [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) para VS Code.

### Pasos para desarrollar
1.  **Clona el repositorio:**
    ```bash
    git clone <url-del-repo>
    cd voltaje-dev
    ```
2.  **Abre la carpeta en VS Code:**
    ```bash
    code .
    ```
3.  **Inicia el Contenedor:**
    *   VS Code detectará la configuración en `.devcontainer` y te mostrará una notificación: *"Reopen in Container"*. Haz clic en ella.
    *   *Alternativa:* Presiona `F1` -> Escribe `Dev Containers: Reopen in Container`.

4.  **Inicia el Servidor:**
    Una vez dentro de la terminal integrada (verás el usuario `sole@...`), ejecuta:
    ```bash
    npm run dev
    ```
    El sitio estará disponible automáticamente en: `http://localhost:8080`

---

## 📂 Estructura del Proyecto

La arquitectura se ha simplificado para facilitar la contribución y el mantenimiento:

```text
.
├── content/           # 📝 AQUÍ SE ESCRIBE. Todo tu contenido Markdown vive aquí.
│   ├── assets/        # Imágenes, videos y archivos estáticos.
│   └── ...            # Tus notas y carpetas de conocimiento.
├── quartz/            # ⚙️ Código fuente de Quartz (Componentes, Plugins, Estilos).
├── docs/              # 📚 Documentación del proyecto.
│   ├── tecnico/       # Guías para desarrolladores (Docker, Deploy, Git).
│   └── archivo/       # Documentación histórica o legada.
├── scripts/           # 🛠️ Scripts de utilidad (Python/Bash) para automatización.
├── .devcontainer/     # 🐳 Configuración del entorno Docker (La "magia" del entorno).
├── quartz.config.ts   # 🔧 Configuración principal de Quartz (Plugins, Markdown).
├── quartz.layout.ts   # 🎨 Configuración de diseño (Cabecera, Pie, Barras laterales).
└── package.json       # 📦 Dependencias y scripts del proyecto.
```

## 🛠️ Comandos Disponibles

Desde la terminal del contenedor (`sole@...`):

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | **Principal.** Levanta el servidor local con recarga automática (Hot Reload). |
| `npx quartz build` | Compila el sitio estático en la carpeta `public/` (listo para producción). |
| `npx quartz update` | Actualiza el núcleo de Quartz a la última versión. |
| `npx quartz sync` | Sincroniza cambios con el repositorio (commit + push simplificado). |
| `npm run format` | Formatea el código y markdown usando Prettier. |

## 📝 Guía de Edición

1.  Crea o edita archivos `.md` dentro de la carpeta `content/`.
2.  Usa `[[Wikilinks]]` para conectar ideas entre páginas.
3.  El servidor detectará los cambios y refrescará el navegador automáticamente.

### Frontmatter Básico
Al inicio de cada nota, puedes usar este bloque de metadatos:

```yaml
---
title: Título de la Nota
date: 2025-11-20
tags:
  - etiqueta1
  - etiqueta2
---
```

## 🐳 Detalles Técnicos del Entorno

Para los curiosos o mantenedores:
*   **Usuario:** El contenedor corre bajo el usuario `sole` (UID 1000) para evitar conflictos de permisos con Linux/WSL.
*   **Credenciales:** Tus llaves SSH (`~/.ssh`) y configuración de Git (`~/.gitconfig`) se inyectan automáticamente desde tu máquina anfitriona. Puedes hacer `git push` sin configuración extra.
*   **Herramientas Incluidas:** Node.js 22, Python 3, Zsh + Powerlevel10k, Git, Curl.

Para más detalles, consulta [docs/tecnico/DOCKER.md](./docs/tecnico/DOCKER.md) y [docs/tecnico/ARQUITECTURA.md](./docs/tecnico/ARQUITECTURA.md).

## 🤝 Contribución

Consulta la carpeta `docs/` para guías detalladas sobre:
*   [Guía de Desarrollo](./docs/tecnico/DESARROLLO.md)
*   [Flujo de Despliegue](./docs/tecnico/DESPLIEGUE.md)

---
*Fundación SOLE Colombia - Conectando el conocimiento.*
