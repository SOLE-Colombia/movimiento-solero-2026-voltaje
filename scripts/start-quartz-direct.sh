#!/bin/bash
# Script para iniciar Quartz directamente (dentro del contenedor)
# Detecta automáticamente si el puerto 8080 está en uso y usa uno alternativo

echo "🚀 Iniciando servidor de Quartz con hot-reload..."
echo ""

cd /workspace/quartz || exit 1

# Verificar si el puerto 8080 está en uso
PORT=8080
if command -v nc &> /dev/null; then
    if nc -z localhost 8080 2>/dev/null; then
        PORT=8082
        echo "⚠️  Puerto 8080 en uso, usando puerto alternativo: $PORT"
    fi
elif command -v timeout &> /dev/null; then
    # Método alternativo usando timeout y /dev/tcp
    if timeout 1 bash -c "echo > /dev/tcp/localhost/8080" 2>/dev/null; then
        PORT=8082
        echo "⚠️  Puerto 8080 en uso, usando puerto alternativo: $PORT"
    fi
fi

echo "🌐 Servidor iniciando en http://localhost:$PORT"
echo "   🔄 Hot-reload activado - los cambios se reflejarán automáticamente"
echo "   Presiona Ctrl+C para detener"
echo ""

# Iniciar Quartz con el puerto detectado
npx quartz build --serve --watch --port $PORT

