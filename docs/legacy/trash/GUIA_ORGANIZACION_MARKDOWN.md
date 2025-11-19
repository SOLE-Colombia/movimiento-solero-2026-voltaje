# Guía de Organización de Archivos Markdown

## Introducción

Esta guía detalla el proceso para organizar y centralizar todos los archivos Markdown (`.md`) en una carpeta específica del proyecto. Esta práctica mejora la estructura del proyecto y facilita el mantenimiento de la documentación.

## Requisitos Previos

- Acceso a una terminal (Terminal en macOS/Linux, o Git Bash en Windows)
- Permisos de escritura en el directorio del proyecto

## Comandos Necesarios

Antes de comenzar, es importante entender los comandos que utilizaremos:

- `cd`: Cambiar de directorio (Change Directory)
- `mkdir`: Crear un nuevo directorio (Make Directory)
- `mv`: Mover archivos o directorios (Move)
- `ls`: Listar contenido del directorio (List)

## Proceso Paso a Paso

1. **Navegar al directorio del proyecto**
   ```bash
   cd /ruta/a/tu/proyecto
   ```

2. **Verificar la ubicación actual**
   ```bash
   pwd
   ```
   Este comando mostrará la ruta actual para confirmar que estamos en el lugar correcto.

3. **Crear la carpeta de guías** (si no existe)
   ```bash
   mkdir -p guias
   ```
   El flag `-p` creará el directorio solo si no existe.

4. **Listar archivos Markdown actuales**
   ```bash
   ls *.md
   ```
   Este comando mostrará todos los archivos Markdown en el directorio actual.

5. **Mover todos los archivos Markdown a la carpeta guías**
   ```bash
   mv *.md guias/
   ```
   Este comando moverá todos los archivos con extensión `.md` a la carpeta `guias`.

## Verificación

Para asegurarse de que todos los archivos se movieron correctamente:

1. **Verificar el directorio original**
   ```bash
   ls *.md
   ```
   No debería mostrar ningún archivo `.md` (excepto README.md si decides mantenerlo en la raíz).

2. **Verificar la carpeta guías**
   ```bash
   ls guias/*.md
   ```
   Debería mostrar todos los archivos Markdown movidos.

## Notas Importantes

- Si deseas mantener algunos archivos `.md` específicos (como README.md) en la raíz del proyecto, muévelos de vuelta después:
  ```bash
  mv guias/README.md ./
  ```
- Es recomendable hacer un commit de Git antes de realizar estos cambios para poder revertirlos si es necesario.

## Resolución de Problemas

Si encuentras algún error durante el proceso:

- Verifica los permisos de escritura en ambos directorios
- Asegúrate de no tener archivos abiertos en un editor
- Comprueba que no haya conflictos de nombres en la carpeta destino

---

Esta guía forma parte de la documentación del proyecto. Para cualquier duda o sugerencia, contacta al equipo de desarrollo.
