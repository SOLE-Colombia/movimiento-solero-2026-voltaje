#!/bin/bash
# Alias para mantener compatibilidad con flujos anteriores
# Simplemente delega al nuevo script unificado

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/watch.sh"
