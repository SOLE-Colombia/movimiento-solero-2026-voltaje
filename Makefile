# SOLE Voltaje - Comandos de Desarrollo
# Usa: make <comando>

.PHONY: help dev stop logs shell clean build setup

# Comando por defecto
help:
	@echo "════════════════════════════════════════════════════════"
	@echo "  SOLE Voltaje - Comandos Disponibles"
	@echo "════════════════════════════════════════════════════════"
	@echo ""
	@echo "  make dev       - Inicia el servidor de desarrollo"
	@echo "  make stop      - Detiene todos los servicios"
	@echo "  make logs      - Ver logs en tiempo real"
	@echo "  make shell     - Acceder al contenedor"
	@echo "  make build     - Rebuild de imágenes Docker"
	@echo "  make clean     - Limpia contenedores y volúmenes"
	@echo "  make setup     - Configuración inicial del proyecto"
	@echo ""
	@echo "════════════════════════════════════════════════════════"

# Desarrollo
dev:
	@echo "🚀 Iniciando servidor de desarrollo..."
	@docker compose -f docker-compose.dev.yml up -d
	@echo "✅ Servidor iniciado en http://localhost:8080"

# Detener
stop:
	@echo "🛑 Deteniendo servicios..."
	@docker compose -f docker-compose.dev.yml down

# Ver logs
logs:
	@docker compose -f docker-compose.dev.yml logs -f --tail=50

# Shell
shell:
	@docker compose -f docker-compose.dev.yml exec voltaje-dev sh

# Build
build:
	@echo "🏗️ Reconstruyendo imágenes..."
	@docker compose -f docker-compose.dev.yml build --no-cache

# Clean
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	@docker compose -f docker-compose.dev.yml down -v
	@docker system prune -f

# Setup inicial
setup:
	@echo "📦 Configuración inicial..."
	@if [ ! -d "quartz/node_modules" ]; then \
		echo "Instalando dependencias de Quartz..."; \
		cd quartz && npm install; \
	fi
	@echo "✅ Setup completo"

