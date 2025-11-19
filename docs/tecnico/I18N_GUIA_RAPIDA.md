# 🌐 Sistema Multiidioma - Guía Rápida

Cómo funciona el sistema de cambio de idioma en **SOLE Voltaje**.

---

## 🎯 Funcionamiento

El jardín digital soporta contenido en **español** e **inglés** de forma nativa gracias a la estructura de carpetas de Quartz.

### Estructura de Carpetas
```
content/
├── es/           ← Todo en español
│   ├── index.md
│   ├── inspirate/
│   ├── soluciona/
│   └── ...
└── en/           ← Everything in English
    ├── index.md
    ├── inspire/
    ├── solve/
    └── ...
```

---

## ✍️ Creando Contenido Bilingüe

### 1. Crear la Versión en Español
`content/es/inspirate/mi-historia.md`:
```yaml
---
title: "Mi Historia Inspiradora"
tags:
  - comunidad
---

# Mi Historia Inspiradora
Contenido en español...
```

### 2. Crear la Versión en Inglés
`content/en/inspire/my-story.md`:
```yaml
---
title: "My Inspiring Story"
tags:
  - community
---

# My Inspiring Story
Content in English...
```

*Nota: Los nombres de archivo y rutas pueden ser diferentes entre idiomas.*

---

## 🔗 Enlaces entre Idiomas

Para enlazar a la misma página en otro idioma, usa el frontmatter `lang` y crea enlaces manuales:

```markdown
🇬🇧 [Read in English](../../en/inspire/my-story.md)
```

---

## 🧪 Probar el Sistema

1.  **Inicia el servidor**: `npm run dev`
2.  **Navega a**: `http://localhost:8080`
3.  **Prueba las URLs**:
    *   `/es/` para español.
    *   `/en/` para inglés.

---

## 🎨 Personalización

Si deseas agregar un selector de idioma visual en la interfaz, puedes crear un componente personalizado de Quartz. Consulta la [documentación de componentes](https://quartz.jzhao.xyz/features/custom-components) para más detalles.

---
*Para la guía completa del sistema i18n, consulta [I18N_SISTEMA_IDIOMAS.md](./I18N_SISTEMA_IDIOMAS.md).*
