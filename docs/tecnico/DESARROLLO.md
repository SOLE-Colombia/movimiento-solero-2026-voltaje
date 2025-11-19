# 📖 Guía de Desarrollo Avanzado

Flujos de trabajo y comandos avanzados para desarrolladores que contribuyen al proyecto.

---

## 🔄 Flujo de Trabajo con Branches

### 1. Crear una Nueva Feature
```bash
git checkout -b feat/mi-nueva-funcionalidad
```

### 2. Desarrollar
*   Edita archivos.
*   Prueba localmente con `npm run dev`.

### 3. Commit con Conventional Commits
```bash
git add .
git commit -m "feat: agrego selector de categorías"
```

**Tipos de commit:**
*   `feat:` - Nueva funcionalidad.
*   `fix:` - Corrección de bug.
*   `docs:` - Solo documentación.
*   `style:` - Formato de código (no afecta funcionalidad).
*   `refactor:` - Refactorización.
*   `test:` - Agregar tests.
*   `chore:` - Tareas de mantenimiento.

### 4. Push y Pull Request
```bash
git push origin feat/mi-nueva-funcionalidad
```
*Luego crea un Pull Request en GitHub.*

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia servidor de desarrollo con hot reload. |
| `npx quartz build` | Construye el sitio estático para producción. |
| `npx quartz build --clean` | Limpia cache y reconstruye. |
| `npm run format` | Formatea código con Prettier. |

---

## 🧪 Testing y Validación

### Linter
Si el proyecto tiene ESLint configurado:
```bash
npm run lint
```

### Verificar Enlaces Rotos
Antes de hacer commit de cambios grandes:
```bash
# Construir el sitio
npx quartz build

# Verificar enlaces (si tienes herramientas instaladas)
npx linkinator public/ --recurse
```

---

## 🔍 Debugging

### Ver logs de build
```bash
npx quartz build --verbose
```

### Inspeccionar estructura generada
```bash
ls -R public/
```

---

## 📦 Gestión de Dependencias

### Actualizar Quartz
```bash
npx quartz update
```

### Actualizar todas las dependencias
```bash
npm update
```

### Auditar seguridad
```bash
npm audit
npm audit fix
```

---

## 🎨 Personalización de Quartz

### Crear Componentes Personalizados
Consulta la [documentación oficial de Quartz](https://quartz.jzhao.xyz/features/custom-components).

### Modificar Estilos
Edita `quartz/styles/custom.scss` o crea nuevos archivos en `quartz/styles/`.

---

## 🚀 Performance y Optimización

### Analizar tamaño del build
```bash
npx quartz build
du -sh public/
```

### Optimizar imágenes antes de commit
Usa herramientas como:
*   **ImageOptim** (macOS).
*   **GIMP** con "Export for Web".
*   Scripts Python en `scripts/` (si existen).

---

## 🤝 Contribución al Proyecto

1.  **Fork** el repositorio.
2.  Crea un **branch** descriptivo.
3.  Haz tus cambios y **commits** atómicos.
4.  Ejecuta **tests/validaciones**.
5.  Crea un **Pull Request** con descripción clara.

---
*Para arquitectura del proyecto, consulta [ARQUITECTURA.md](./ARQUITECTURA.md).*
