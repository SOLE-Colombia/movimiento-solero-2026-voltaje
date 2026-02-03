# Home Carousel (Home)

Esta guía explica cómo ajustar el carrusel del Home, las tarjetas, los íconos y el comportamiento de navegación.

**Archivos clave**
1. `quartz/components/HomeCarousel.tsx`  
2. `quartz/components/styles/homeCarousel.scss`  
3. `quartz/components/scripts/homeCarousel.inline.ts`  
4. `quartz/static/icons-home/`  

**Qué renderiza el Home**
El Home usa el componente `HomeCarousel` y se monta en el header del layout. Las tarjetas se generan desde el arreglo `cards` en `quartz/components/HomeCarousel.tsx`.

**Cómo editar las tarjetas**
Cada tarjeta vive dentro del arreglo `cards` en `quartz/components/HomeCarousel.tsx`. Los campos importantes:
1. `question` y `highlight`  
2. `color` y `textColor`  
3. `icon` (archivo SVG dentro de `quartz/static/icons-home`)  
4. `link` (ruta relativa o URL absoluta)  
5. `accentColor` (opcional, cambia el color del highlight)  

Ejemplo:
```tsx
{
  id: 1,
  question: "¿Estás en un sitio sin",
  highlight: "electricidad constante y estable",
  color: "#E91E8C",
  textColor: "#ffffff",
  icon: "ic_pix_thunder.svg",
  accentColor: "#F9C369",
  link: "/es/solve/?solve_cats=Electricidad",
}
```

**Íconos**
Los íconos se cargan como imágenes desde `quartz/static/icons-home/`. Para usar uno nuevo:
1. Agrega el SVG en `quartz/static/icons-home/`.  
2. Usa el nombre del archivo en `icon`, por ejemplo `icon: "ic_pix_box.svg"`.  

**Links y GitHub Pages**
Si necesitas que los links funcionen en GitHub Pages, puedes usar URLs absolutas (por ejemplo `https://sole-colombia.github.io/voltaje/...`).  
Si usas rutas relativas, se resuelven con `baseDir` y funcionan en local o cuando el sitio respeta `baseUrl`.

**Color del texto destacado**
El color del texto resaltado (`highlight`) usa la variable CSS `--card-accent`.  
Puedes cambiarlo por tarjeta con `accentColor`.

**Ajustar diseño en CSS**
El diseño del carrusel vive en `quartz/components/styles/homeCarousel.scss`.
Áreas típicas que se editan:
1. `.home-carousel-card` para padding, borde, sombra, altura.  
2. `.home-carousel-card-question` para tamaño y line-height.  
3. `.home-carousel-card-icon` para tamaño del ícono.  
4. Media queries en `@media #{$mobile}` para ajustes móviles.  

Para fijar el alto en mobile:
```scss
.home-carousel-card {
  @media #{$mobile} {
    min-height: 150px;
    height: 150px;
  }
}
```

**Animación y click**
El comportamiento del carrusel se controla desde `quartz/components/scripts/homeCarousel.inline.ts`.  
Se usa Swiper con `effect: "cards"` y se agrega lógica para que el click funcione en toda la tarjeta.

Si cambias el script, recuerda reconstruir el sitio porque el script se empaqueta en `postscript.js`.

**Logo**
El logo del sitio se carga con la ruta absoluta usando `cfg.baseUrl` cuando está disponible:
```ts
const logoSrc = cfg.baseUrl
  ? `https://${cfg.baseUrl}/static/logo.png`
  : joinSegments(baseDir, "static/logo.png")
```
Esto evita fallos de ruta en páginas profundas.

**Checklist rápido**
1. Cambiar textos y enlaces en `quartz/components/HomeCarousel.tsx`.  
2. Ajustar estilos en `quartz/components/styles/homeCarousel.scss`.  
3. Ajustar comportamiento del carrusel en `quartz/components/scripts/homeCarousel.inline.ts`.  
4. Agregar íconos en `quartz/static/icons-home/`.  
5. Reconstruir el sitio para ver cambios del script.  
