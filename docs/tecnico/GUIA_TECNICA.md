# Guia tecnica (operacion y procesos)

Esta guia resume los procesos del dia a dia. Esta escrita para alguien que quiere entender el sistema sin ser experto.

---

## 1) Requisitos basicos

- Node.js >= 22
- npm >= 10
- (Opcional) DevContainer si trabajas en VS Code windows y Macos, para evitar problemas de rutas y permisos.

---

## 2) Comandos utiles

Desde la raiz del repo:

- **Dev server**: `npm run dev` (sirve en `http://localhost:8080`)
- **Build**: `npx quartz build`
- **Build limpio**: `npx quartz build --clean`
- **Check**: `npm run check` (tsc + prettier)
- **Format**: `npm run format`
- **Tests**: `npm run test`

---

## 3) Donde tocar segun el cambio

- **Contenido**: `content/`
- **Layout**: `quartz.layout.ts`
- **Config**: `quartz.config.ts`
- **Componentes**: `quartz/components/`
- **Estilos**: `quartz/styles/` y `quartz/components/styles/`

---

## 4) Deploy (vision general)

El deploy se hace con GitHub Actions:
- rama `main` -> produccion
- rama `desarrollo` -> preproduccion

El build genera `public/` y se publica en el repo destino.

---

## 5) Troubleshooting rapido

- **No veo cambios**: limpia cache (`rm -rf .quartz-cache public`).
- **Errores de SPA**: asegurate de reinicializar scripts con `nav`.
- **404 `/true`**: revisa Waline `reactionIcons` (no usar booleanos).
- **Iconos o imagenes faltantes**: verifica rutas relativas `assets/...`.

---

## 6) Consejos desde experiencia

- Cambios pequenos y frecuentes son mas faciles de revisar.
- Si algo rompe layout, revisa primero `quartz.layout.ts` y `public/index.css`.
- Usa `rg` para ubicar texto o clases rapidamente.
