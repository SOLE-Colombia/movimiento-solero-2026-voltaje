# Guia de arquitectura (resumen)

Esta guia explica como se arma el sitio de punta a punta, sin detalles demasiado tecnicos. Es un resumen para entender el flujo general.

---

## 1) Que es este proyecto

- Sitio **estatico** generado desde Markdown, puede ser un vault de obsidian, esta pensado para que sea un flujo de trabajo simple.
- Motor: **Quartz v4**.
- El resultado final es HTML/CSS/JS en `public/`.

---

## 2) Flujo de datos (simple)

1. Escribes contenido en `content/`.
2. Quartz transforma el Markdown con plugins.
3. El layout decide que componentes aparecen.
4. Los emitters generan paginas y assets en `public/`.

---

## 3) Archivos clave

- `quartz.config.ts`: plugins, temas, analytics, locale. (Configuracion principal)
- `quartz.layout.ts`: composicion de UI (sidebar, header, footer, etc). (Como se ve el sitio)
- `quartz/components/`: componentes visuales (TSX).
- `quartz/components/scripts/`: scripts inline que corren en el navegador. (Complementan la logica del sitio, como waline)
- `quartz/styles/`: estilos globales. (CSS general del sitio, tipografias, colores, etc)

---

## 4) SPA y recursos

Quartz funciona como SPA cuando puede:
- Navega sin recargar toda la pagina.
- Dispara el evento `nav` para re-inicializar scripts.

Los recursos se empaquetan en build:
- CSS -> `public/index.css`
- JS -> `public/prescript.js` y `public/postscript.js`

---

## 5) Servicios externos

- **Analytics**: Plausible (config en `quartz.config.ts`).
- **Comentarios**: Waline (config en `quartz/components/scripts/waline.inline.ts`).

---

## 6) Salida de build

- `public/` es la salida final (no editar a mano).
- `.quartz-cache/` guarda cache del build.

---

## 7) Donde empezar si necesitas cambiar algo

- UI y layout: `quartz.layout.ts`
- Estilos: `quartz/styles/` y `quartz/components/styles/`
- Logica del cliente: `quartz/components/scripts/`
- Plugins y pipeline: `quartz.config.ts`

Si quieres mas detalle, mira `docs/tecnico/MAPA_DEL_PROYECTO.md`.
