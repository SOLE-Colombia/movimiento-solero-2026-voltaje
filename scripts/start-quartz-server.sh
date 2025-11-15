#!/bin/bash
# Script para iniciar el servidor de Quartz con watch (hot-reload) en el contenedor

echo "🚀 Iniciando servidor de Quartz con hot-reload..."
echo ""

# Verificar que el contenedor esté corriendo
if ! docker compose -f docker-compose.dev.yml ps | grep -q "voltaje-dev.*Up"; then
    echo "❌ Error: El contenedor voltaje-dev no está corriendo"
    echo "   Ejecuta primero: npm run dev:start"
    exit 1
fi

# Verificar si el puerto 8080 está en uso y usar alternativo si es necesario
PORT=8080
if command -v nc &> /dev/null; then
    if nc -z localhost 8080 2>/dev/null; then
        PORT=8082
        echo "⚠️  Puerto 8080 en uso, usando puerto alternativo: $PORT"
    fi
fi

# Iniciar el servidor con watch
echo "🌐 Servidor iniciando en http://localhost:$PORT"
echo "   🔄 Hot-reload activado - los cambios se reflejarán automáticamente"
echo "   Presiona Ctrl+C para detener"
echo ""
docker compose -f docker-compose.dev.yml exec voltaje-dev sh -c "npx quartz build --serve --watch --port $PORT"

