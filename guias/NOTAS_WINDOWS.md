# 📝 Notas Importantes para Windows

## ⚠️ Problema Común: Python no se encuentra

### El Problema

En Windows, Python puede estar instalado pero no responder a los comandos `python` o `python3`. 
Esto es porque Windows usa el **Python Launcher** (`py`) para ejecutar Python.

### Síntomas

```cmd
python --version
# Error: Python was not found
```

### Solución ✅

Usa el comando `py` en lugar de `python`:

```cmd
# ✅ Correcto en Windows
py --version
py -m pip install -r requirements.txt
py scripts\01-inventory.py

# ❌ No funciona en Windows
python --version
python3 --version
python scripts\01-inventory.py
```

### ¿Por qué `py`?

El Python Launcher (`py`) es la forma recomendada por Python.org para ejecutar Python en Windows:

- **Detecta automáticamente** qué versión de Python usar
- **Funciona siempre** independientemente de cómo se instaló Python
- **Permite elegir versión**: `py -3.12`, `py -3`, etc.

## 🔧 Scripts Adaptados para Windows

Todos los scripts `.bat` del proyecto ya están configurados para usar `py`:

### Scripts de Migración
```cmd
REM ✅ Ya usa 'py' internamente
scripts\run-all-migrations.bat
```

### Scripts Individuales
```cmd
REM ✅ Ejecuta así
py scripts\01-inventory.py
py scripts\02-analyze-csv.py
py scripts\10-validate.py
```

### Instalar Dependencias
```cmd
REM ✅ Forma correcta
py -m pip install -r requirements.txt

REM ❌ Puede no funcionar
pip install -r requirements.txt
```

## 🐍 Verificar Instalación de Python

### 1. Verificar que Python está instalado

```cmd
py --version
```

**Salida esperada:**
```
Python 3.12.6
```

### 2. Verificar pip

```cmd
py -m pip --version
```

**Salida esperada:**
```
pip 25.1.1 from C:\Users\...\site-packages\pip (python 3.12)
```

### 3. Instalar dependencias

```cmd
py -m pip install -r requirements.txt
```

## 🪟 Diferencias Windows vs Linux/Mac

| Tarea | Windows | Linux/Mac |
|-------|---------|-----------|
| Ejecutar Python | `py` | `python3` |
| Instalar paquetes | `py -m pip install` | `python3 -m pip install` o `pip3 install` |
| Ejecutar script | `py script.py` | `python3 script.py` |
| Scripts de shell | `.bat` | `.sh` |
| Separador de rutas | `\` | `/` |
| Variables de entorno | `%VAR%` | `$VAR` |

## 📋 Comandos PowerShell vs CMD

### PowerShell (Recomendado)

```powershell
# ✅ Listar archivos
ls
Get-ChildItem

# ✅ Ver contenido
cat archivo.txt
Get-Content archivo.txt

# ✅ Crear directorio
mkdir nombre
New-Item -ItemType Directory -Name nombre

# ✅ Copiar archivos
cp origen destino
Copy-Item origen destino

# ✅ Ejecutar script
.\scripts\run-all-migrations.bat
```

### CMD (Tradicional)

```cmd
REM Listar archivos
dir

REM Ver contenido
type archivo.txt

REM Crear directorio
mkdir nombre

REM Copiar archivos
copy origen destino

REM Ejecutar script
scripts\run-all-migrations.bat
```

## 🎯 Comandos Comunes del Proyecto

### Instalación

```cmd
REM Instalar dependencias Python
py -m pip install -r requirements.txt

REM Instalar Quartz (Node.js)
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
cd ..
```

### Migración

```cmd
REM Migración completa automática
scripts\run-all-migrations.bat

REM Scripts individuales (si necesitas)
py scripts\01-inventory.py
py scripts\02-analyze-csv.py
py scripts\03-slug-mapper.py
```

### Desarrollo

```cmd
REM Iniciar servidor de desarrollo
scripts\dev.bat

REM Build de producción
scripts\build.bat
```

### Docker (si tienes Docker instalado)

```cmd
REM Desarrollo con Docker
scripts\docker-dev.bat

REM Build con Docker
scripts\docker-build.bat
```

### Validación

```cmd
REM Validar contenido migrado
py scripts\10-validate.py

REM Ver errores
type reports\validation-errors.txt
```

## 🔍 Troubleshooting Windows

### Problema: "No se puede ejecutar scripts"

**Error:**
```
Execution of scripts is disabled on this system
```

**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problema: "ENOENT: no such file or directory"

**Causa:** Rutas con espacios o caracteres especiales

**Solución:** Usa comillas
```cmd
py "scripts\01-inventory.py"
```

### Problema: "ModuleNotFoundError"

**Solución:**
```cmd
REM Reinstalar dependencias
py -m pip install --upgrade -r requirements.txt
```

### Problema: "Permission denied"

**Solución:** Ejecuta PowerShell/CMD como Administrador
- Click derecho en PowerShell/CMD
- "Ejecutar como administrador"

## 📦 Estructura de Rutas en Windows

El proyecto usa rutas relativas que funcionan en Windows:

```
C:\Users\David Vega\Downloads\Sole\
├── scripts\
│   ├── 01-inventory.py
│   ├── run-all-migrations.bat
│   └── ...
├── reports\
├── temp\
├── Privado y Compartido\
├── README.md
└── requirements.txt
```

## ✅ Checklist Pre-Migración Windows

Antes de ejecutar la migración, verifica:

- [ ] Python instalado (`py --version` funciona)
- [ ] pip funciona (`py -m pip --version`)
- [ ] Dependencias instaladas (`py -m pip install -r requirements.txt`)
- [ ] Exportación de Notion en `Privado y Compartido\`
- [ ] Al menos 1GB de espacio libre en disco
- [ ] PowerShell o CMD abierto en la carpeta del proyecto

## 🚀 Inicio Rápido (Windows)

```cmd
REM 1. Verificar Python
py --version

REM 2. Instalar dependencias
py -m pip install -r requirements.txt

REM 3. Ejecutar migración
scripts\run-all-migrations.bat

REM 4. Revisar resultados
type reports\validation-errors.txt

REM 5. (Después de instalar Quartz) Iniciar desarrollo
scripts\dev.bat
```

## 💡 Tips para Windows

1. **Usa PowerShell** en lugar de CMD (más moderno)
2. **Tab para autocompletar** nombres de archivos
3. **Ctrl+C** para detener scripts en ejecución
4. **Flecha arriba** para repetir comandos anteriores
5. **cls** para limpiar la pantalla
6. **exit** para cerrar la terminal

## 📞 Ayuda Adicional

Si sigues teniendo problemas:

1. Lee `README.md` - Documentación completa
2. Lee `INICIO_RAPIDO.md` - Guía paso a paso
3. Revisa `reports\validation-errors.txt` - Errores específicos
4. Contacta: hola@solecolombia.org

---

**Nota**: Todos los scripts del proyecto ya están configurados correctamente para Windows. 
Solo necesitas usar `py` cuando ejecutes scripts Python manualmente.

✅ **El problema está solucionado** - Puedes proceder con la migración.






