#!/bin/bash
# Script seguro para iniciar Quartz - mata procesos anteriores si existen

echo "🔄 Verificando procesos anteriores de Quartz..."

# Intentar encontrar y detener procesos de Quartz en el puerto 8080
# Usar diferentes métodos según lo que esté disponible
if command -v fuser &> /dev/null; then
    fuser -k 8080/tcp 2>/dev/null && echo "✅ Puerto 8080 liberado"
elif command -v lsof &> /dev/null; then
    PID=$(lsof -ti:8080 2>/dev/null)
    if [ ! -z "$PID" ]; then
        kill $PID 2>/dev/null && echo "✅ Proceso anterior detenido (PID: $PID)"
    fi
fi

# Esperar un momento para que el puerto se libere
sleep 2

# Cambiar al directorio de Quartz
cd /workspace/quartz || exit 1

echo "🚀 Iniciando servidor de Quartz..."
echo ""

# Iniciar Quartz
npx quartz build --serve --watch

