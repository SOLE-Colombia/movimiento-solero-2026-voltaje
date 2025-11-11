#!/bin/bash
# Sync content from root to quartz/content

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Sincronizando contenido a quartz/content/${NC}"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Check if content/ exists
if [ ! -d "content" ]; then
    echo "❌ Error: No se encontró la carpeta content/"
    exit 1
fi

# Check if quartz/content/ exists
if [ ! -d "quartz/content" ]; then
    echo "📁 Creando carpeta quartz/content/"
    mkdir -p quartz/content
fi

# Sync content using rsync
echo "🔄 Copiando archivos..."
rsync -av --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.DS_Store' \
    content/ quartz/content/

echo ""
echo -e "${GREEN}✅ Contenido sincronizado exitosamente${NC}"
echo ""
echo "📊 Estadísticas:"
echo "  • Español: $(find quartz/content/es -name '*.md' 2>/dev/null | wc -l) archivos"
echo "  • English: $(find quartz/content/en -name '*.md' 2>/dev/null | wc -l) archivos"
echo "  • Imágenes: $(find quartz/content/assets/images -type f 2>/dev/null | wc -l) archivos"

