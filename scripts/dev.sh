#!/bin/bash
# Script para iniciar servidor de desarrollo de Quartz

echo "🚀 Iniciando servidor de desarrollo de Quartz..."
echo ""

# Verificar si existe el directorio quartz
if [ ! -d "quartz" ]; then
    echo "❌ Error: El directorio 'quartz' no existe"
    echo "   Ejecuta primero: git clone https://github.com/jackyzha0/quartz.git"
    exit 1
fi

# Verificar si node_modules existe
if [ ! -d "quartz/node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    cd quartz
    npm install
    cd ..
fi

# Iniciar servidor
cd quartz
echo "🌐 Servidor iniciando en http://localhost:8080"
echo "   Presiona Ctrl+C para detener"
echo ""
npx quartz build --serve

