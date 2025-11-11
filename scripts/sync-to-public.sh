#!/bin/bash
# Script para sincronizar cambios al repositorio público
# Uso: ./scripts/sync-to-public.sh

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
PUBLIC_REPO_URL=${PUBLIC_REPO_URL:-""}  # Se configura vía variable de entorno o secrets
TEMP_DIR="temp-public-repo"

echo "🚀 Sincronización a Repositorio Público"
echo "========================================"

# Verificar que estamos en main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}❌ Error: Debes estar en la rama main${NC}"
    echo "Rama actual: $CURRENT_BRANCH"
    exit 1
fi

# Verificar que no hay cambios sin commitear
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}❌ Error: Hay cambios sin commitear${NC}"
    echo "Por favor haz commit o stash de tus cambios"
    exit 1
fi

# Verificar que existe la configuración del repo público
if [ -z "$PUBLIC_REPO_URL" ]; then
    echo -e "${YELLOW}⚠️  Configurando repositorio público...${NC}"
    echo "Por favor ingresa la URL del repositorio público:"
    read PUBLIC_REPO_URL
    
    if [ -z "$PUBLIC_REPO_URL" ]; then
        echo -e "${RED}❌ Error: URL no puede estar vacía${NC}"
        exit 1
    fi
fi

# Limpiar directorio temporal si existe
if [ -d "$TEMP_DIR" ]; then
    echo "🧹 Limpiando directorio temporal anterior..."
    rm -rf "$TEMP_DIR"
fi

# Build del sitio con Quartz
echo "🏗️  Compilando sitio con Quartz..."
cd quartz
npm ci
npx quartz build
cd ..

if [ ! -d "quartz/public" ]; then
    echo -e "${RED}❌ Error: El build de Quartz falló${NC}"
    exit 1
fi

# Clonar repositorio público
echo "📥 Clonando repositorio público..."
git clone "$PUBLIC_REPO_URL" "$TEMP_DIR"
cd "$TEMP_DIR"

# Limpiar contenido anterior (excepto .git)
echo "🧹 Limpiando contenido anterior..."
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Copiar nuevo build
echo "📦 Copiando nuevo build..."
cp -r ../quartz/public/* .

# Crear archivos adicionales
echo "📝 Creando archivos adicionales..."

# CNAME para GitHub Pages
echo "voltaje.solecolombia.org" > CNAME

# README para el repo público
cat > README.md << 'EOF'
# SOLE Voltaje - Sitio Web

Este es el sitio web público de SOLE Voltaje, generado automáticamente desde el repositorio de desarrollo.

🌐 **Sitio en vivo**: https://voltaje.solecolombia.org

## Sobre este repositorio

Este repositorio contiene únicamente el sitio compilado y listo para servir. El código fuente y desarrollo se encuentran en un repositorio privado.

### Tecnologías

- [Quartz](https://quartz.jzhao.xyz/) - Generador de sitios estáticos
- GitHub Pages - Hosting

### Licencia

[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)

---

SOLE Voltaje es un proyecto de [SOLE Colombia](https://www.solecolombia.org/) apoyado por [Internet Society Foundation](https://www.isocfoundation.org/)
EOF

# .nojekyll para GitHub Pages
touch .nojekyll

# Commit y push
echo "📤 Subiendo cambios..."
git add .

COMMIT_MSG="Deploy automático - $(date +'%Y-%m-%d %H:%M:%S')"
if git commit -m "$COMMIT_MSG"; then
    git push origin main
    echo -e "${GREEN}✅ Sincronización completada exitosamente${NC}"
    echo ""
    echo "🌐 El sitio se actualizará en unos minutos en:"
    echo "   https://voltaje.solecolombia.org"
else
    echo -e "${YELLOW}ℹ️  No hay cambios para subir${NC}"
fi

# Limpiar
cd ..
rm -rf "$TEMP_DIR"

echo ""
echo "✨ Proceso completado"




