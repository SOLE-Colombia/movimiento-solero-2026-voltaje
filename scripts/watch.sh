#!/bin/bash
# Comando único para iniciar el servidor de Quartz
# - Detecta si Docker está disponible
# - Ejecuta dentro del contenedor cuando sea posible
# - Si no hay Docker (p. ej. dentro del contenedor) usa el script directo

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker-compose.dev.yml"
CONTAINER_NAME="voltaje-dev"

run_inside_container() {
  if ! docker compose -f "$COMPOSE_FILE" ps | grep -q "$CONTAINER_NAME"; then
    echo "❌ El contenedor $CONTAINER_NAME no está levantado."
    echo "   Ejecuta primero: npm run dev:start"
    exit 1
  fi

  echo "🐳 Ejecutando Quartz dentro del contenedor..."
  docker compose -f "$COMPOSE_FILE" exec "$CONTAINER_NAME" bash -lc "/workspace/scripts/start-quartz-direct.sh"
}

run_direct() {
  echo "🧾 Docker no está disponible. Ejecutando Quartz directamente..."
  bash "$ROOT_DIR/scripts/start-quartz-direct.sh"
}

if command -v docker &> /dev/null; then
  if docker compose -f "$COMPOSE_FILE" ps >/dev/null 2>&1; then
    run_inside_container
    exit 0
  fi
fi

run_direct



