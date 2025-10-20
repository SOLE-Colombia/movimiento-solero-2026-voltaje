#!/bin/bash
# Script para hacer build de producción de Quartz

echo "🔨 Haciendo build de producción..."
echo ""

# Verificar si existe el directorio quartz
if [ ! -d "quartz" ]; then
    echo "❌ Error: El directorio 'quartz' no existe"
    exit 1
fi

cd quartz

# Build
echo "📦 Generando sitio estático..."
npx quartz build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completado exitosamente"
    echo "📁 Archivos generados en: quartz/public/"
    echo ""
    echo "Para probar localmente:"
    echo "  cd quartz/public && python3 -m http.server 8000"
    echo ""
else
    echo ""
    echo "❌ Error en el build"
    exit 1
fi

