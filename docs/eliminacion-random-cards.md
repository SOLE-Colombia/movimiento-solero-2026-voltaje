# Eliminación del sistema de "Random Cards"

## Contexto

El componente `RandomCardGrid` (sección "Explora también estas notas") se utilizaba para mostrar sugerencias aleatorias al final de las páginas de índice de sección (`section-index`). 

Se decidió eliminar esta funcionalidad el 21 de Enero de 2026 debido a que:
1. Generaba ruido visual innecesario.
2. Causaba confusión con las tarjetas de navegación principales.
3. No aportaba un valor claro de navegación en este momento.

## Cómo estaba implementado

El componente se encontraba configurado en `quartz.layout.ts` dentro de la sección `sharedPageComponents.afterBody`:

```typescript
Component.ConditionalRender({
  component: Component.RandomCardGrid({ count: 3 }),
  condition: (props) =>
    props.fileData.frontmatter?.type === "section-index" &&
    props.fileData.slug !== "index",
}),
```

Esto renderizaba 3 tarjetas aleatorias (o pseudo-aleatorias) seleccionadas del pool de notas disponibles.

### Componentes relacionados

El sistema dependía de los siguientes archivos:
- `quartz/components/RandomCardGrid.tsx`: El componente principal.
- `quartz/components/randomCardUtils.ts`: Lógica para seleccionar tarjetas.
- `quartz/components/styles/randomCards.scss`: Estilos.
- `quartz/components/scripts/randomCards.inline.ts`: Script de cliente.

## Cómo restaurarlo

Si en el futuro se decide volver a habilitar esta característica:

1. Abrir `quartz.layout.ts`.
2. Buscar `sharedPageComponents`.
3. Agregar nuevamente el bloque de código mostrado arriba en el array `afterBody` (o donde se desee ubicar).

Alternativamente, se puede usar en páginas individuales mediante el comando de Markdown (si el soporte en `renderPage.tsx` sigue activo):
`random-card(count=3)`
