# Guia de rutas y nomenclatura

Este documento explica como se transforman los archivos en URLs y como nombrar contenido y assets para que todo sea consistente.

---

## 1) Rutas principales

- `/` -> `content/index.md` (home neutral)
- `/es/` -> `content/es/index.md`
- `/es/solve/...` -> `content/es/solve/...`
- `/es/inspire/...` -> `content/es/inspire/...`
- `/es/glossary/...` -> `content/es/glossary/...`
- `/es/disconnected/...` -> `content/es/disconnected/...`
- `/es/answers-comments/...` -> `content/es/answers-comments/...`
- `/tags/<tag>` -> paginas automaticas por etiqueta

Regla simple: el path dentro de `content/` se vuelve URL (sin `.md`).

---

## 2) Archivos index

Un `index.md` en una carpeta se vuelve la portada de esa carpeta.

Ejemplo:
- `content/es/solve/index.md` -> `/es/solve/`

Si el frontmatter tiene `type: section-index`, se activa el layout de seccion.

---

## 3) Prefijos por seccion

Para mantener orden, se usa un prefijo por seccion:

- Solve: `solv-...`
- Inspire: `insp-...`
- Glossary: `conc-...`
- Disconnected: `disc-...`

Ejemplo:
- `content/es/solve/solv-ally-with-places.md` -> `/es/solve/solv-ally-with-places`

---

## 4) Reglas de nombre

- minusculas
- guiones (`-`) en lugar de espacios
- sin acentos
- evita nombres muy largos y deben ser en ingles cuando sea posible

Esto reduce errores en URLs y links.

---

## 5) Assets (imagenes, audio, archivos)

Los assets viven en `content/assets/`:
- `content/assets/images/`
- `content/assets/videos/`
- `content/assets/audios/`
- `content/assets/files/`

Se referencian desde Markdown asi:

```
![Descripcion](/assets/images/ruta/archivo.webp)
```
El / incial es clave, para que se renderice bien en la pagina de github.
---

## 6) Archivos globales (static)

`quartz/static/` se copia como `/static/` en el sitio.
Ejemplos:
- logos
- iconos
- scripts globales (custom.js)

---

## 7) Frontmatter recomendado

Minimo sugerido:

```
title: "Titulo visible"
description: "Descripcion corta"
tags: [tag1, tag2]
```

Para secciones:
```
type: section-index
lang: es
description: "Texto corto para la tarjeta"
cardImage: /assets/images/...
```

Para solve (metadatos):
```
dificultad: "Facil | Medio | Complejo"
costo: "< USD 25 | etc"
ayudantes: "Sin ayudantes | Con ayudantes"
tarda: "Horas | Dias"
autor: "Nombre del autor"
```

---

## 8) Consejos practicos

- Si cambias un nombre, revisa enlaces internos.
- Para nuevas secciones, agrega el slug en `quartz.layout.ts` (Explorer).
- Mantener prefijos hace mas facil buscar contenido con `rg`.
