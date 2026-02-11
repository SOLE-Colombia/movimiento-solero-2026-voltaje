# Contribuir en `feat-ajuste-de-informacion`

Este flujo está pensado para que el equipo edite contenido en Obsidian con una apariencia lo más cercana posible al sitio final generado por Quartz.

## 1) Clonar y abrir la rama correcta

```bash
git clone https://github.com/SOLE-Colombia/voltaje.git
cd voltaje
git checkout feat-ajuste-de-informacion
```

Si ya tienes el repo clonado:

```bash
git fetch origin
git checkout feat-ajuste-de-informacion
git pull origin feat-ajuste-de-informacion
```

## 2) Abrir como Vault en Obsidian

1. Abre Obsidian.
2. Elige `Open folder as vault`.
3. Selecciona la carpeta `content/` dentro del repositorio.

Ruta esperada:

```text
<tu-ruta>/voltaje/content
```

## 3) Configuración compartida incluida en la rama

Esta rama ya versiona la configuración del Vault en `content/.obsidian/` para compartir:

- Plugins y su configuración.
- Snippets CSS para paridad visual con Quartz.
- Ajustes generales del editor.

## 4) Frontmatter y estilo editorial

- Usa la plantilla base: `content/templates/plantilla-nota-quartz.md`.
- El plugin Linter está configurado en `content/.obsidian/plugins/obsidian-linter/data.json`.
- Al guardar (`Ctrl/Cmd + S`), se normaliza el frontmatter para mantener consistencia con Quartz.

## 5) Recomendaciones de trabajo con Git

```bash
git checkout feat-ajuste-de-informacion
git pull origin feat-ajuste-de-informacion
# editar notas
git add .
git commit -m "docs: actualiza contenido"
git push origin feat-ajuste-de-informacion
```

Evita mezclar cambios de configuración del Vault con cambios de contenido si no son necesarios.
