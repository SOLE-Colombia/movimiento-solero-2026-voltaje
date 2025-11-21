#!/bin/bash
# Script para levantar entorno de desarrollo con Docker

echo "🐳 Levantando entorno Docker para SOLE Voltaje..."
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    echo "   Instala Docker desde: https://www.docker.com/get-started"
    exit 1
fi

# Verificar si docker-compose está disponible
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  docker-compose no encontrado, usando 'docker compose' en su lugar"
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Build y levantar contenedores
echo "📦 Construyendo imagen Docker..."
$DOCKER_COMPOSE build

if [ $? -eq 0 ]; then
    echo ""
    echo "🚀 Iniciando contenedor..."
    $DOCKER_COMPOSE up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Contenedor iniciado exitosamente"
        echo "🌐 Sitio disponible en: http://localhost:8080"
        echo ""
        echo "Comandos útiles:"
        echo "  Ver logs:      $DOCKER_COMPOSE logs -f"
        echo "  Detener:       $DOCKER_COMPOSE down"
        echo "  Reiniciar:     $DOCKER_COMPOSE restart"
        echo ""
    else
        echo "❌ Error al iniciar contenedor"
        exit 1
    fi
else
    echo "❌ Error en el build"
    exit 1
fi






