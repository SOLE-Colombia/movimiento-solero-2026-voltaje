# 📚 Guía de Obsidian para SOLE Voltaje

> **Biblioteca del Futuro** — Jardín Digital / Wiki colaborativa
>
> Esta guía explica cómo configurar Obsidian para crear y editar contenido
> de SOLE Voltaje, sincronizar con GitHub, y aprovechar el grafo de
> conocimiento como herramienta de exploración.

---

## Tabla de contenido

- [¿Qué es esto?](#qué-es-esto)
- [Instalación rápida](#instalación-rápida)
- [Estructura del contenido](#estructura-del-contenido)
- [Creación de notas](#creación-de-notas)
- [Plugins recomendados](#plugins-recomendados)
- [El Grafo de conocimiento](#el-grafo-de-conocimiento)
- [Sincronización con GitHub](#sincronización-con-github)
- [GitHub Desktop — Flujo visual](#github-desktop--flujo-visual)
- [¿Qué archivos comitear?](#qué-archivos-comitear)
- [Enlaces y relaciones](#enlaces-y-relaciones)
- [Tutoriales externos](#tutoriales-externos)
- [Resolución de problemas](#resolución-de-problemas)

---

## ¿Qué es esto?

SOLE Voltaje funciona como un **jardín digital**: una colección de notas
interconectadas que crecen orgánicamente. A diferencia de un blog (lineal,
cronológico), un jardín digital se navega por **enlaces** entre ideas.

La web se genera con [Quartz](https://quartz.jzhao.xyz/) a partir del
contenido Markdown que editamos en Obsidian. Lo que ves en Obsidian es
prácticamente lo que se publica en la web.

```
Tu Obsidian  →  Git/GitHub  →  Quartz build  →  Web pública
(edición)       (versiones)     (compilación)    (lectura)
```

---

## Instalación rápida

### 1. Instalar herramientas

| Herramienta | Enlace | ¿Para qué? |
|---|---|---|
| **Obsidian** | [obsidian.md/download](https://obsidian.md/download) | Editor de notas Markdown |
| **Git** | [git-scm.com/downloads](https://git-scm.com/downloads) | Control de versiones |
| **GitHub Desktop** | [desktop.github.com](https://desktop.github.com/) | Interfaz visual para Git (recomendado) |

### 2. Clonar el repositorio

**Con GitHub Desktop:**
1. Abrir GitHub Desktop → `File > Clone Repository`
2. Pegar: `https://github.com/SOLE-Colombia/voltaje-dev.git`
3. Elegir la carpeta donde quieras guardar el proyecto
4. Clic en `Clone`

**Con terminal (opcional):**
```bash
git clone https://github.com/SOLE-Colombia/voltaje-dev.git
cd voltaje-dev
git checkout desarrollo
```

### 3. Abrir el vault en Obsidian

1. Abrir Obsidian
2. Clic en `Abrir carpeta como vault`
3. Navegar hasta la carpeta `voltaje-dev/content/` y seleccionarla
4. **¡Importante!** Abrir `content/` como vault, NO la raíz del repositorio

> 💡 La carpeta `content/` ya incluye configuraciones de Obsidian
> compartidas (`.obsidian/`), incluyendo el tema visual, snippets CSS y
> configuración de plugins.

### 4. Instalar plugins de la comunidad

Al abrir el vault por primera vez:
1. Ir a `Ajustes > Plugins de la comunidad`
2. Desactivar `Modo restringido` (es seguro — los plugins están verificados)
3. Los plugins del listado se instalan buscándolos por nombre
4. Ver la sección [Plugins recomendados](#plugins-recomendados) abajo

### 5. Verificar el tema visual

1. Ir a `Ajustes > Apariencia`
2. Los `CSS Snippets` deben tener activado `quartz-theme`
3. Seleccionar **modo oscuro** o **claro** según tu preferencia
4. Deberías ver las fuentes VT323 en títulos y Roboto Mono en el cuerpo

---

## Estructura del contenido

```
content/
├── index.md                    ← Página de inicio
├── es/                         ← Contenido en español
│   ├── index.md
│   ├── new-here.md             ← ¿Nuevo aquí?
│   ├── solve/                  ← 🔧 Soluciones técnicas
│   ├── inspire/                ← ✨ Historias inspiradoras
│   ├── glossary/               ← 📖 Glosario de términos
│   ├── disconnected/           ← 📡 SOLE Desconectado
│   └── answers-comments/       ← 💬 Preguntas y respuestas
├── assets/                     ← Imágenes, videos, PDFs
│   ├── images/
│   ├── videos/
│   ├── audios/
│   └── files/
└── templates/                  ← Plantillas Obsidian
```

### Secciones del jardín digital

| Sección | Carpeta | Color en el grafo | Descripción |
|---|---|---|---|
| **Solve** | `es/solve/` | 🔵 Azul (#1a84ae) | Soluciones técnicas paso a paso |
| **Inspire** | `es/inspire/` | 🟡 Dorado (#f9c369) | Historias y experiencias |
| **Glossary** | `es/glossary/` | 🟢 Verde (#26bfb8) | Términos y definiciones |
| **Disconnected** | `es/disconnected/` | 🟠 Coral (#e57349) | Internet sin Internet |
| **Answers** | `es/answers-comments/` | 🟣 Púrpura (#968786) | FAQ y comunidad |

---

## Creación de notas

### Usar plantillas

Las plantillas están en la carpeta `PLANTILLAS/` (en la raíz del repo) y
en `content/templates/` para Obsidian.

| Tipo de contenido | Plantilla | Carpeta destino |
|---|---|---|
| Solución técnica | `solucion-tecnica.md` | `es/solve/` |
| Historia inspiradora | `historia-inspiradora.md` | `es/inspire/` |
| Término del glosario | `termino-glosario.md` | `es/glossary/` |

#### Crear una nueva nota

1. `Ctrl/Cmd + N` para nueva nota
2. `Ctrl/Cmd + P` → escribir "Insertar plantilla" → elegir la plantilla
3. Rellenar el frontmatter (título, categorías, aspectos...)
4. Mover la nota a la carpeta correcta dentro de `es/`

### Frontmatter obligatorio

Cada nota **debe** tener un encabezado YAML. Ejemplo mínimo:

```yaml
---
title: "Nombre de la nota"
lang: "es"
slug: "nombre-url-amigable"
categories: ["Conectividad"]
aspectos: ["señal"]
formato: "Texto"
fecha: "2024-10-20"
draft: false
traduccion: false
---
```

#### Campos explicados

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | texto | Título visible en la web |
| `lang` | `"es"` | Idioma (español) |
| `slug` | texto | URL amigable (sin espacios, minúsculas) |
| `categories` | lista | Categorías: Conectividad, Dispositivos, etc. |
| `aspectos` | lista | señal, electricidad, dispositivos, personas, espacio |
| `formato` | texto | Texto, Foto, Video, PDF |
| `fecha` | fecha | Formato YYYY-MM-DD |
| `draft` | bool | `true` = borrador (no se publica) |
| `traduccion` | bool | `true` si necesita traducción |

### Convenciones de nombres de archivo

- Usar **kebab-case**: `instalar-antena-3g.md`
- Sin espacios, sin caracteres especiales
- Sin acentos en el nombre del archivo (sí en el contenido)
- El `slug` en el frontmatter debe coincidir con el nombre del archivo

### Imágenes y archivos adjuntos

- Pegar imágenes directamente en la nota (Obsidian las moverá a `assets/`)
- Formatos preferidos: `.webp` para imágenes, `.webm` para videos
- Nombrar imágenes descriptivamente: `antena-3g-instalacion-paso1.webp`
- Rutas relativas: `![Descripción](../../assets/images/soluciones/foto.webp)`

---

## Plugins recomendados

### Esenciales (instalar primero)

| Plugin | ¿Para qué? |
|---|---|
| **Obsidian Git** | Sincronizar automáticamente con GitHub |
| **Linter** | Formatear automáticamente el Markdown y YAML |
| **Templater** | Plantillas avanzadas con variables dinámicas |
| **Dataview** | Consultar y listar notas por propiedades |
| **Editing Toolbar** | Barra de herramientas visual para formatear |

### Navegación y enlaces

| Plugin | ¿Para qué? |
|---|---|
| **Graph Analysis** | Análisis del grafo: notas cercanas, clusters |
| **Find Unlinked Files** | Encontrar notas huérfanas sin enlaces |
| **Auto Link Title** | Al pegar un URL, obtiene el título automáticamente |
| **Breadcrumbs** | Navegación jerárquica entre notas padre/hijo |
| **Hover Editor** | Editar notas enlazadas sin salir de la actual |

### Organización

| Plugin | ¿Para qué? |
|---|---|
| **Tag Wrangler** | Renombrar y gestionar tags masivamente |
| **Outliner** | Mejorar el manejo de listas anidadas |
| **Icon Folder** | Añadir iconos a las carpetas del explorador |
| **Kanban** | Tablero visual para gestionar tareas/contenido |

### Configuración recomendada de Obsidian Git

Una vez instalado el plugin **Obsidian Git**:

1. `Ajustes > Obsidian Git`
2. **Auto backup interval**: `0` (desactivado — hacer commits manuales)
3. **Pull on startup**: `Activado`
4. **Commit message**: `docs: {{date}} — {{hostname}}`
5. **Push on backup**: `Activado`
6. **Disable push**: `Desactivado`

> ⚠️ Recomendamos commits manuales (`Ctrl/Cmd + P` → "Git: Create backup")
> para controlar exactamente qué cambios se suben.

---

## El Grafo de conocimiento

El grafo es el **mapa visual** de tu jardín digital. Muestra cómo se
conectan las notas entre sí a través de enlaces.

### Propuesta visual del grafo

El grafo está configurado con **grupos de colores** por sección:

```
🔵 Azul        = Soluciones (es/solve/)
🟡 Dorado      = Inspiración (es/inspire/)
🟢 Aguamarina  = Glosario (es/glossary/)
🟠 Coral       = Desconectado (es/disconnected/)
🟣 Gris-púrpura = Preguntas (es/answers-comments/)
```

Además hay colores por **tags temáticos**:

```
🔵 señal / conectividad
🟡 electricidad / energía
🔮 dispositivos
🟢 personas / comunidad
🟠 espacio
```

### Cómo leer el grafo

- **Nodos grandes** = notas con muchos enlaces (son "hubs" de conocimiento)
- **Nodos pequeños** = notas con pocos enlaces (candidatas a conectar más)
- **Clusters** = grupos de notas muy interconectadas (temas)
- **Nodos aislados** = notas huérfanas (necesitan enlaces)
- **Flechas** = dirección del enlace (A → B significa "A menciona a B")

### Cómo usar el grafo para crear contenido

1. **Abrir el grafo global**: `Ctrl/Cmd + P` → "Graph view: Open graph view"
2. **Identificar huérfanos**: Notas flotando solas sin conexiones
3. **Buscar clusters**: ¿Hay temas que deberían estar conectados pero no lo están?
4. **Crear puentes**: Si una solución menciona un término del glosario, ¡enlázalos!

### Mejores prácticas para enlaces

```markdown
<!-- Enlace a otra nota del vault -->
[[nombre-de-la-nota]]

<!-- Enlace con texto personalizado -->
[[nombre-de-la-nota|texto que se muestra]]

<!-- Enlace a una sección específica -->
[[nombre-de-la-nota#sección]]
```

**Regla de oro**: Cada nota debería tener al menos **3 enlaces salientes**
(a otras notas) y ser enlazada por al menos **1 nota** (backlink).

---

## Sincronización con GitHub

### Opción A: Con plugin Obsidian Git (recomendado)

El plugin sincroniza directamente desde Obsidian:

| Acción | Atajo | Comando |
|---|---|---|
| Hacer backup (commit + push) | `Ctrl+Shift+K` | Git: Create backup |
| Traer cambios (pull) | `Ctrl+Shift+J` | Git: Pull |
| Ver cambios pendientes | — | Git: Open source control view |

#### Flujo diario

```
1. Abrir Obsidian → automáticamente hace pull
2. Editar notas normalmente
3. Cuando estés satisfecho → Ctrl+Shift+K (backup)
4. El plugin hace commit y push automáticamente
```

### Opción B: Con GitHub Desktop (alternativa visual)

Ideal para personas que prefieren una interfaz gráfica.

#### Configuración inicial

1. Abrir GitHub Desktop
2. `File > Add Local Repository` → seleccionar la carpeta `voltaje-dev`
3. Asegurarte de estar en la rama `desarrollo`

#### Flujo de trabajo diario

```
1. Antes de empezar: Click "Fetch origin" → "Pull origin"
2. Editar en Obsidian normalmente
3. Al terminar → Volver a GitHub Desktop
4. Revisar los archivos cambiados en el panel izquierdo
5. ✅ Marcar solo los archivos que quieres subir
6. Escribir un mensaje descriptivo del commit
7. Click "Commit to desarrollo"
8. Click "Push origin"
```

#### Qué revisar antes de hacer commit

En GitHub Desktop verás los archivos modificados. Antes de hacer commit:

| ✅ Comitear | ❌ NO comitear |
|---|---|
| Archivos `.md` que editaste | `workspace.json` (cambia solo por abrir) |
| Nuevas imágenes en `assets/` | `workspace-mobile.json` |
| Cambios en `graph.json` (si editaste la config) | Archivos de caché |
| Cambios en snippets CSS | Temas descargados automáticamente |
| Configuración de plugins (si es intencional) | Archivos `.DS_Store` |

> 💡 El archivo `.gitignore` ya está configurado para ignorar los archivos
> auto-generados, pero si ves `workspace.json` en los cambios, **no lo
> selecciones** al hacer commit.

---

## ¿Qué archivos comitear?

### Regla simple

> **Si tú lo cambiaste intencionalmente → comitear.**
> **Si Obsidian lo cambió solo por abrirse → ignorar.**

### Archivos que cambian solos (NO comitear)

Estos archivos se modifican automáticamente cada vez que abres Obsidian o
mueves paneles. Están en el `.gitignore` pero si aparecen:

- `.obsidian/workspace.json` — Layout de paneles
- `.obsidian/workspace-mobile.json` — Layout móvil
- `.obsidian/themes/` — Temas descargados

### Archivos que SÍ se comparten

Estos archivos se comitean para que todo el equipo tenga la misma experiencia:

- `.obsidian/app.json` — Configuración general de Obsidian
- `.obsidian/appearance.json` — Tema y fuentes
- `.obsidian/core-plugins.json` — Plugins core activados
- `.obsidian/community-plugins.json` — Lista de plugins comunitarios
- `.obsidian/graph.json` — Configuración visual del grafo
- `.obsidian/templates.json` — Configuración de plantillas
- `.obsidian/snippets/quartz-theme.css` — Tema visual que replica la web
- `.obsidian/plugins/obsidian-linter/` — Configuración del linter

### Cómo revisar en GitHub Desktop

1. Abrir GitHub Desktop
2. En el panel izquierdo, ver la lista de archivos cambiados
3. **Desmarcar** archivos auto-generados (workspace.json, etc.)
4. **Marcar** solo los archivos que editaste intencionalmente
5. Escribir un commit message descriptivo
6. Commit + Push

---

## Enlaces y relaciones

### Tipos de enlaces

En un jardín digital, los enlaces son el corazón del sistema. Usa estos
tipos de enlaces para crear una red de conocimiento rica:

#### 1. Enlaces directos entre notas

```markdown
Para instalar la antena, necesitas [[cable-coaxial|cable coaxial]].
```

#### 2. Tags para categorización

```markdown
---
categories: ["Conectividad", "Antenas"]
aspectos: ["señal"]
---
```

#### 3. Backlinks automáticos

Obsidian muestra automáticamente qué notas enlazan a la nota actual.
Esto aparece en el panel derecho bajo "Backlinks".

#### 4. Notas cercanas (Graph Analysis)

Con el plugin **Graph Analysis** puedes ver qué notas están
"temáticamente cerca" aunque no estén directamente enlazadas.

### Cuándo crear un enlace

| Situación | Acción |
|---|---|
| Mencionas un término técnico | Enlazar al glosario: `[[termino]]` |
| Refieres a otra solución | Enlazar: `[[otra-solucion]]` |
| Citas una historia de inspiración | Enlazar: `[[historia]]` |
| Mencionas un material/herramienta | Verificar si existe en el glosario |

### Descubrir notas para enlazar

1. **Find Unlinked Files**: Busca notas sin enlaces (huérfanas)
2. **Graph Analysis > Co-citations**: Notas que aparecen juntas frecuentemente
3. **Buscar términos**: `Ctrl/Cmd + Shift + F` para buscar palabras en todo el vault
4. **Backlinks sin resolver**: En el panel de backlinks, ver "Unlinked mentions"

---

## Tutoriales externos

### Videos recomendados

| Recurso | Descripción | Enlace |
|---|---|---|
| **Obsidian Git en 4 min** | Tutorial más sencillo de setup | [YouTube](https://www.youtube.com/watch?v=5YZz38U20ws) |
| **Obsidian desde cero** | Curso completo en español | [YouTube](https://www.youtube.com/results?search_query=obsidian+tutorial+espa%C3%B1ol) |
| **Nicole van der Hoeven** | Playbook avanzado de Obsidian (inglés) | [Fork My Brain](https://notes.nicolevanderhoeven.com/obsidian-playbook) |
| **Linking Your Thinking** | Curso sobre grafos de conocimiento | [linkingyourthinking.com](https://www.linkingyourthinking.com/) |

### Guías escritas

| Recurso | Descripción |
|---|---|
| [Sync Obsidian with Git (gratis)](https://desktopofsamuel.com/how-to-sync-obsidian-vault-for-free-using-git/) | Tutorial completo con GitHub Desktop |
| [Obsidian Git Forum Tutorial](https://forum.obsidian.md/t/the-easiest-way-to-setup-obsidian-git-to-backup-notes/51429) | Guía del foro oficial |
| [Digital Garden Guide](https://jzhao.xyz/posts/networked-thought/) | Filosofía de jardines digitales (Quartz) |
| [Connect Vault with GitHub](https://linked-blog-starter.vercel.app/connect-obsidian-vault-with-github) | Paso a paso con Git token |

### Conceptos clave

- **Jardín digital**: Colección de notas interconectadas que se cultivan con el tiempo
- **Zettelkasten**: Método de toma de notas atómicas e interconectadas
- **MOC (Map of Content)**: Nota índice que organiza enlaces a un tema
- **Backlinks**: Enlaces inversos automáticos (¿quién me enlaza?)
- **Graph view**: Visualización de la red de notas

---

## Resolución de problemas

### "No veo los estilos del tema"

1. `Ajustes > Apariencia > CSS Snippets`
2. Refrescar (icono de recarga)
3. Activar `quartz-theme`

### "Los plugins no se instalan"

1. `Ajustes > Plugins de la comunidad > Desactivar modo restringido`
2. Buscar cada plugin por nombre e instalar
3. **Activar** cada plugin después de instalarlo

### "Obsidian Git no funciona"

1. Verificar que `git` está instalado: abrir terminal → `git --version`
2. Verificar que estás dentro del repositorio clonado
3. Verificar credenciales: `Ajustes > Obsidian Git > Authentication`
4. Si usas GitHub Desktop, asegúrate de no tener ambos haciendo push al mismo tiempo

### "Hay conflictos de merge"

1. Abrir GitHub Desktop
2. Si hay conflicto: `Stash & Continue` → `Pull Origin` → `View Stashed`
3. Restaurar los cambios del stash
4. Si el conflicto está en una nota, abrir en Obsidian y resolver manualmente
5. Buscar `<<<<<<<` y `>>>>>>>` en el archivo y elegir la versión correcta

### "Veo cambios en archivos que no edité"

Probablemente son archivos auto-generados por Obsidian:
1. En GitHub Desktop, **desmarca** esos archivos
2. Si es `workspace.json`, ignorarlo — el `.gitignore` debería manejarlo
3. Si persiste: `git checkout -- content/.obsidian/workspace.json`

---

## Resumen del flujo de trabajo

```
┌─────────────────────────────────────────────────┐
│                FLUJO DIARIO                     │
│                                                 │
│  1. Abrir Obsidian (auto-pull si está config.)  │
│  2. Editar / crear notas                        │
│  3. Crear [[enlaces]] entre notas               │
│  4. Revisar el grafo → buscar huérfanos         │
│  5. Commit manual (Ctrl+Shift+K)                │
│  6. Push automático                             │
│                                                 │
│  ¿Conflicto? → GitHub Desktop → Resolver        │
└─────────────────────────────────────────────────┘
```

---

> **¿Dudas?** Pregunta en el grupo de WhatsApp de cacharreros o crea un
> issue en [GitHub](https://github.com/SOLE-Colombia/voltaje-dev/issues).
