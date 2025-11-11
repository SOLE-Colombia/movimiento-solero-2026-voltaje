#!/bin/bash
# Script maestro para ejecutar toda la migración en secuencia

echo "======================================================================"
echo "🚀 SOLE VOLTAJE - MIGRACIÓN COMPLETA NOTION A QUARTZ"
echo "======================================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar si Python está instalado
check_python() {
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Error: Python 3 no está instalado${NC}"
        exit 1
    fi
}

# Función para instalar dependencias
install_dependencies() {
    echo -e "${YELLOW}📦 Instalando dependencias de Python...${NC}"
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error instalando dependencias${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependencias instaladas${NC}"
    echo ""
}

# Función para ejecutar un script
run_script() {
    script_name=$1
    description=$2
    
    echo "======================================================================"
    echo "📝 $description"
    echo "======================================================================"
    python3 "scripts/$script_name"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error ejecutando $script_name${NC}"
        read -p "¿Continuar de todos modos? (s/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Ss]$ ]]; then
            exit 1
        fi
    else
        echo -e "${GREEN}✓ $script_name completado${NC}"
    fi
    echo ""
}

# Verificar Python
check_python

# Instalar dependencias
install_dependencies

# FASE 1: Preparación y Análisis
echo ""
echo "======================================================================"
echo "📊 FASE 1: PREPARACIÓN Y ANÁLISIS"
echo "======================================================================"
echo ""

run_script "01-inventory.py" "Script 01: Inventario de archivos"
run_script "02-analyze-csv.py" "Script 02: Análisis de CSVs y metadata"
run_script "03-slug-mapper.py" "Script 03: Generación de slugs"

# Pausa para revisar reportes
echo -e "${YELLOW}⏸️  Pausa: Revisa los reportes en la carpeta 'reports/'${NC}"
read -p "Presiona Enter para continuar con la Fase 2..."
echo ""

# FASE 2: Transformación de Contenido
echo "======================================================================"
echo "🔄 FASE 2: TRANSFORMACIÓN DE CONTENIDO"
echo "======================================================================"
echo ""

run_script "04-clean-markdown.py" "Script 04: Limpieza de markdown"
run_script "05-generate-frontmatter.py" "Script 05: Generación de frontmatter"
run_script "06-split-languages.py" "Script 06: Separación por idioma"

# Pausa para revisar contenido
echo -e "${YELLOW}⏸️  Pausa: Revisa el contenido generado en 'content/'${NC}"
read -p "Presiona Enter para continuar con la Fase 3..."
echo ""

# FASE 3: Optimización de Assets
echo "======================================================================"
echo "🖼️  FASE 3: OPTIMIZACIÓN DE ASSETS"
echo "======================================================================"
echo ""

run_script "07-optimize-images.py" "Script 07: Optimización de imágenes"
run_script "08-optimize-videos.py" "Script 08: Análisis de videos"
run_script "09-manage-pdfs.py" "Script 09: Gestión de PDFs"

# Validación final
echo "======================================================================"
echo "✓ VALIDACIÓN FINAL"
echo "======================================================================"
echo ""

run_script "10-validate.py" "Script 10: Validación de contenido"

# Resumen final
echo ""
echo "======================================================================"
echo "🎉 MIGRACIÓN COMPLETADA"
echo "======================================================================"
echo ""
echo -e "${GREEN}✓ Todos los scripts se ejecutaron correctamente${NC}"
echo ""
echo "📁 Estructura generada:"
echo "   - content/es/        : Contenido en español"
echo "   - content/en/        : Contenido en inglés"
echo "   - content/assets/    : Imágenes optimizadas"
echo "   - public/downloads/  : PDFs"
echo "   - reports/           : Reportes de análisis"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Revisar reports/validation-errors.txt"
echo "   2. Copiar 'content/' a 'quartz/content/'"
echo "   3. Ejecutar './scripts/dev.sh' para probar localmente"
echo ""
echo "======================================================================"

