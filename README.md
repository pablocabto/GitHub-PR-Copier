# GitHub PR Copier

Extensión para copiar rápidamente un resumen de una Pull Request de GitHub al portapapeles.

Con un clic, la extensión extrae el título de la PR, su URL y, cuando están disponibles, las estadísticas de cambios (`+additions` y `-deletions`). El contenido se copia en texto plano y en formato HTML para que pueda pegarse cómodamente en Teams, email, documentación o tickets.

## Disponibilidad

- Chrome Web Store: pendiente de publicación
- Safari para macOS: [Latest release](https://github.com/pablocabto/GitHub-PR-Copier/releases/latest)

## Qué hace

- Detecta si la pestaña activa es una Pull Request de GitHub.
- Obtiene el título de la PR.
- Copia la URL actual de la PR.
- Intenta extraer las estadísticas visibles de cambios (`+` y `-`).
- Copia el resultado al portapapeles en formato `text/html`.
- Muestra un mensaje temporal de confirmación en la página.

## Formato copiado

Ejemplo de salida en texto plano:

```text
Name: Fix login redirect bug
PR: https://github.com/org/repo/pull/123
+120 -34
```

Si la extensión no encuentra las estadísticas de cambios, seguirá copiando al menos el título y la URL.

## Cómo usarla

1. Abre una Pull Request en GitHub.
2. Haz clic en el icono de la extensión.
3. Pega el contenido donde lo necesites.

La extensión muestra uno de estos mensajes según el resultado:

- `PR copiada al portapapeles`
- `PR copiada como texto plano`

## Instalación en Safari

1. Descarga el archivo `.zip` de la app desde la última release.
2. Descomprime el `.zip`.
3. Mueve la app a la carpeta `Aplicaciones`.
4. Abre la app.
5. Pulsa el botón que muestra la app.
6. Cuando termine ese paso, puedes cerrar la app.
7. Abre Safari y ve a `Safari > Ajustes > Extensiones`.
8. Activa la extensión.

## Instalación local en Chrome

Si quieres cargar este repositorio manualmente en Chrome:

1. Abre `chrome://extensions`.
2. Activa `Modo de desarrollador`.
3. Pulsa `Cargar descomprimida`.
4. Selecciona la carpeta de este repositorio.

## Permisos

La extensión utiliza los siguientes permisos definidos en `manifest.json`:

- `activeTab`: para actuar sobre la pestaña actual.
- `scripting`: para inyectar el script que extrae la información de la PR.
- `clipboardWrite`: para copiar el contenido al portapapeles.
- `https://github.com/*/*/pull/*`: para limitar la ejecución a páginas de Pull Requests de GitHub.

## Estructura del repositorio

- `manifest.json`: configuración de la extensión.
- `background.js`: escucha el clic en la acción de la extensión e inyecta el script principal.
- `content.js`: extrae los datos de la PR y los copia al portapapeles.

## Limitaciones

- Está pensada para páginas de Pull Requests en `github.com`.
- La extracción del título y de las estadísticas depende de la estructura actual de la interfaz de GitHub.
- Si GitHub cambia sus selectores o su formato visual, puede ser necesario ajustar la extensión.
- No incluye popup ni opciones de configuración en esta versión.

## Desarrollo

Este repositorio no requiere un proceso de build para funcionar en su forma actual. Los archivos principales pueden cargarse directamente como extensión descomprimida.
