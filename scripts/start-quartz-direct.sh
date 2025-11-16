#!/bin/bash
# Script para iniciar Quartz directamente (dentro del contenedor o sin Docker)
# - Detiene procesos anteriores
# - Limpia directorios temporales
# - Elige automáticamente un puerto disponible

set -euo pipefail

ROOT_DIR="/workspace"
QUARTZ_DIR="$ROOT_DIR/quartz"
PUBLIC_DIR="$QUARTZ_DIR/public"
CACHE_DIR="$QUARTZ_DIR/.quartz-cache"

if [ ! -d "$QUARTZ_DIR" ]; then
  echo "❌ No se encontró $QUARTZ_DIR. ¿Estás dentro del contenedor correcto?"
  exit 1
fi

cd "$QUARTZ_DIR"

echo "🛑 Deteniendo procesos anteriores de Quartz (si existen)..."
pkill -f "quartz build" 2>/dev/null || true
sleep 1

echo "🧹 Limpiando artefactos previos..."
rm -rf "$PUBLIC_DIR"
rm -rf "$CACHE_DIR"

is_port_in_use() {
  local PORT_TO_CHECK=$1
  python3 - <<'PY' "$PORT_TO_CHECK"
import socket, sys
port = int(sys.argv[1])
s = socket.socket()
s.settimeout(0.3)
try:
    s.connect(("127.0.0.1", port))
except OSError:
    sys.exit(1)  # puerto libre
else:
    s.close()
    sys.exit(0)  # puerto ocupado
PY
}

PORT=8080
if is_port_in_use 8080; then
  PORT=8082
  echo "⚠️  Puerto 8080 en uso, se utilizará el puerto alternativo $PORT"
fi

echo "🌐 Servidor iniciando en http://localhost:$PORT"
echo "   🔄 Hot-reload activado - los cambios se reflejarán automáticamente"
echo "   Presiona Ctrl+C para detener"
echo ""

npx quartz build --serve --watch --port "$PORT"
