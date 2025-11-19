#!/bin/bash
# Script para iniciar desarrollo local con Docker

set -e

echo "🚀 Iniciando entorno de desarrollo SOLE Voltaje"
echo "=============================================="

# Sincronizar contenido a Quartz
echo "📦 Sincronizando contenido a Quartz..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/sync-content-to-quartz.sh"
echo ""

# Verificar que Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo"
    echo "Por favor inicia Docker Desktop e intenta nuevamente"
    exit 1
fi

# Construir imágenes si no existen
echo "📦 Verificando imágenes Docker..."
docker compose -f docker-compose.dev.yml build

# Iniciar servicios
echo "🔄 Iniciando servicios..."
docker compose -f docker-compose.dev.yml up -d

# Esperar que los servicios estén listos
echo "⏳ Esperando que los servicios inicien..."
sleep 5

# Verificar estado
echo ""
echo "✅ Servicios iniciados!"
echo ""
echo "📝 Accede al sitio en desarrollo:"
echo "   → http://localhost:8080"
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs:        docker compose -f docker-compose.dev.yml logs -f"
echo "   Detener:         docker compose -f docker-compose.dev.yml down"
echo "   Ejecutar script: docker compose -f docker-compose.dev.yml exec voltaje-scripts python scripts/NOMBRE_SCRIPT.py"
echo "   Shell Python:    docker compose -f docker-compose.dev.yml exec voltaje-scripts bash"
echo ""
echo "🎉 ¡Todo listo para desarrollar!"




