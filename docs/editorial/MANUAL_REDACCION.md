# ✍️ Manual de Redacción y Contenido

Este documento es la guía definitiva para el equipo de contenido de **SOLE Voltaje**. Aquí encontrarás cómo escribir, estructurar y publicar contenido en nuestro jardín digital.

## 🎯 Filosofía Editorial
Nuestro contenido debe ser:
1.  **Accesible:** Lenguaje claro, directo e inclusivo.
2.  **Accionable:** Soluciones paso a paso que resuelvan problemas reales.
3.  **Inspirador:** Historias que muestren el impacto de la tecnología en comunidades.

---

## 📁 Estructura de Carpetas

Todo el contenido vive en la carpeta `content/`.

| Carpeta | Descripción |
| :--- | :--- |
| `content/es/` | Contenido en **Español**. |
| `content/es/soluciona/` | **Guías Técnicas:** Cómo instalar antenas, configurar routers, etc. |
| `content/es/inspirate/` | **Historias:** Relatos de comunidades, casos de éxito. |
| `content/es/conceptorio/` | **Glosario:** Definiciones de términos clave (Wiki). |
| `content/es/desconectado/` | **Recursos Offline:** Guías pensadas para imprimir o usar sin internet. |
| `content/assets/` | **Multimedia:** Todas las imágenes, videos y PDFs. |

---

## 📝 Creando una Nueva Nota

### 1. Plantilla Básica para Soluciones (Frontmatter)
Cada archivo Markdown (`.md`) **debe** comenzar con este bloque de metadatos:

```yaml
---
title: "Título Claro y Descriptivo"
date: 2024-11-20
tags: 
  - "Electricidad"
  - "Señal"
  - "Dispositivos"
  - "Espacio"
  - "Personas"
dificultad:
  - "Fácil"
  - "Medio"
  - "Complejo"
costo:
  - "Gratis"
  - "< USD 25"
  - "USD 25 - 50"
  - "> USD 50"
  - "Gasto mensual"
ayudantes:
  - "Sin ayudantes"
  - "1 persona"
  - "2-3 personas"
  - "Más de 3 personas"
tarda:
  - "Minutos"
  - "Horas"
  - "Días"
  - "Semanas"
autor:
  -SOLE Colombia
draft: false
---
```
> En cada uno de las categorias de etiquetas, se debe seleccionar la opción que le corresponde a la solución. Solo la opción de "Tags" se puede seleccionar más de una. Así se ve un ejemplo:

```yaml
---
title: "Bicigenerador"
date: 2025-11-20
tags: 
  - "Electricidad"

dificultad: "Complejo"
costo: "> USD 50"
ayudantes: "2-3 personas"
tarda: "Días"
autor: "SOLE Colombia"
draft: false
---
```


*   **title:** El título principal de la página.
*   **date:** Fecha de creación o actualización (AAAA-MM-DD).
*   **tags:** Etiquetas para agrupar contenido (usar minúsculas).
*   **draft:** `true` si es un borrador (no se publicará), `false` si está listo.

### 2. Estructura del Contenido

#### Para Soluciones Técnicas
```markdown
> El Título de la Solución/Inspiración/Concepto se pone automáticamente desde el Frontmatter. Evitar utilizar el # solo.

## ¿Qué necesitas?
*   Lista de materiales
*   Herramientas

## Pasos
1.  **Paso 1:** Explicación clara.
2.  **Paso 2:** Usa imágenes de apoyo.

> 💡 **Tip:** Usa bloques de cita para consejos importantes.
```

#### Para Historias
```markdown
# Título de la Historia

![Imagen Principal](../../assets/images/inspiracion/foto-comunidad.jpg)

## Contexto
Dónde y cuándo sucedió.

## La Historia
Narrativa de lo que ocurrió.

## Impacto
Resultados y aprendizajes.
```

---

## 🔗 Enlaces y Referencias (Wikilinks)

Una de las potencias de Quartz es conectar el conocimiento.

*   **Enlace a otra nota:** Usa `[[Nombre del Archivo]]` o `[[ruta/al/archivo|Texto Personalizado]]`.
    *   *Ejemplo:* "Consulta el [[conceptorio/antena|glosario sobre antenas]]."
*   **Enlace Externo:** Usa `[Texto](https://ejemplo.com)`.

---

## 🖼️ Imágenes

Consulta la [Guía Multimedia](./GUIA_MULTIMEDIA.md) para detalles sobre formatos y nombres.

**Regla de Oro:** Usa rutas relativas.
*   ✅ `![Descripción](../../assets/images/mi-foto.webp)`
*   ❌ `![Descripción](/content/assets/images/mi-foto.webp)` (No uses rutas absolutas).

---

## 🚀 Flujo de Publicación

1.  **Escribe:** Crea tu archivo `.md` en la carpeta correspondiente.
2.  **Previsualiza:** Si tienes el entorno de desarrollo, verás los cambios en `http://localhost:8080`.
3.  **Guarda:** Haz commit y push de tus cambios.
    *   *Mensaje de commit:* `feat: nueva historia sobre La Guajira`
4.  **Revisión:** El equipo técnico revisará que los enlaces funcionen antes de publicar a producción.

---
*Dudas? Contacta al equipo técnico.*

