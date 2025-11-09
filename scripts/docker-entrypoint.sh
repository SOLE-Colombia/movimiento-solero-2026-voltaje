#!/bin/bash
set -e

echo "=========================================="
echo "  SOLE Voltaje - Docker Entrypoint"
echo "=========================================="
echo ""

# Sincronizar contenido a quartz/content/
echo "📦 Sincronizando contenido a quartz/content/..."
rsync -av --delete /workspace/content/ /workspace/quartz/content/
echo "✅ Contenido sincronizado exitosamente"
echo ""

echo "📊 Archivos sincronizados:"
echo "   • Español: $(find /workspace/quartz/content/es -type f -name "*.md" 2>/dev/null | wc -l) archivos"
echo "   • English: $(find /workspace/quartz/content/en -type f -name "*.md" 2>/dev/null | wc -l) archivos"
echo "   • Imágenes: $(find /workspace/quartz/content/assets/images -type f 2>/dev/null | wc -l) archivos"
echo ""

# Verificar e instalar dependencias de npm si no existen
echo "🔍 Verificando dependencias de npm..."
if [ ! -d "/workspace/quartz/node_modules" ] || [ ! -f "/workspace/quartz/package-lock.json" ]; then
    echo "📦 Instalando dependencias de npm..."
    cd /workspace/quartz
    npm ci
    npm cache clean --force
    echo "✅ Dependencias instaladas"
else
    echo "✅ Dependencias ya instaladas"
fi
echo ""

# Iniciar servidor de desarrollo
echo "🚀 Iniciando servidor de desarrollo..."
echo "🌐 Accede a: http://localhost:8080"
echo ""

cd /workspace/quartz
exec "$@"

