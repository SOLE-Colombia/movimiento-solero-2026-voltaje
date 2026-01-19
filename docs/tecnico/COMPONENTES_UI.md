# 🧩 Activar y desactivar componentes de la UI (Quartz)

Esta guía explica cómo ocultar módulos de la interfaz **sin borrar código**, para poder reactivarlos en el futuro.

---

## ✅ Dónde se configuran los componentes

Los componentes principales se definen en:

- `quartz.layout.ts`

Aquí se controla qué aparece en:

- `sharedPageComponents` → elementos compartidos (head, footer, afterBody, etc.)
- `defaultContentPageLayout` → layout de páginas de contenido
- `defaultListPageLayout` → layout de páginas de listas

---

## ✅ Forma segura de desactivar un componente

**No lo dejes en `undefined`**. Algunos plugins (como `ComponentResources`) leen los recursos de todos los componentes y fallan si alguno es `undefined`.

La forma segura es usar `Component.ConditionalRender` con una condición que siempre sea `false`:

```ts
Component.ConditionalRender({
  component: Component.Graph(),
  condition: () => false,
})
```

Esto mantiene el componente definido, pero evita que se renderice.

---

## 🧱 Ejemplos reales en este proyecto

### 1) Desactivar el módulo de gráfico (“Ideas relacionadas”)

Archivo: `quartz.layout.ts`

```ts
right: [
  Component.ConditionalRender({
    component: Component.Graph(),
    condition: () => false,
  }),
  Component.Backlinks(),
],
```

### 2) Desactivar el footer en todo el sitio

Archivo: `quartz.layout.ts`

```ts
footer: Component.ConditionalRender({
  component: Component.Footer({
    links: {
      "SOLE Colombia": "https://www.solecolombia.org/",
      "GitHub": "https://github.com/SOLE-Colombia/voltaje",
    },
  }),
  condition: () => false,
}),
```

---

## 🔄 Cómo reactivar un componente

Solo cambia la condición a `true` o reemplaza el bloque por el componente original:

```ts
Component.ConditionalRender({
  component: Component.Graph(),
  condition: () => true,
})
```

O:

```ts
Component.Graph()
```

---

## 🧪 Verificación rápida

Después de cambios en layout, corre:

```
npm run dev
```

Si ves errores relacionados con `ComponentResources`, revisa que no haya `undefined` en layouts.

---

**Última actualización:** Enero 2026
