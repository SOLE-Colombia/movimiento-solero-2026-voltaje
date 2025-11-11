#!/bin/bash
# Script para hacer build de producción con Docker

echo "🔨 Build de producción con Docker..."
echo ""

# Build
docker build -t sole-voltaje:latest .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completado exitosamente"
    echo "🐳 Imagen creada: sole-voltaje:latest"
    echo ""
    echo "Para ejecutar:"
    echo "  docker run -p 8080:80 sole-voltaje:latest"
    echo ""
else
    echo "❌ Error en el build"
    exit 1
fi


