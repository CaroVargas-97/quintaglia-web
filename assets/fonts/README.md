# Fuentes de marca Quintaglia

Fuentes institucionales del manual de marca, para **inicio** (`index.html`) y **3 de Febrero** (`proyectos/3-de-febrero-2781.html`).
WOOD mantiene su identidad (Cormorant + Montserrat).

| Rol | Fuente | Foundry | Licencia |
|---|---|---|---|
| Títulos (`--serif`) | **Harume Roman** | Metafontsy | Comercial US$19 (Gumroad) |
| Cuerpo (`--sans`) | **Neue Montreal** | Pangram Pangram | Licencia web/comercial (sitio de la foundry) |

> ⚠️ El sitio es **comercial**, así que hay que usar la licencia **webfont/comercial**, no la "free for personal use".

## Cómo activarlas (cuando lleguen los archivos)

1. Copiar los archivos de fuente en esta carpeta (`assets/fonts/`). Formatos ideales: `.woff2` (+ `.woff` de respaldo). También sirven `.otf`/`.ttf` (se convierten a `.woff2`).

   Nombres esperados (ajustar en el CSS si difieren):
   - `HarumeRoman.woff2`
   - `NeueMontreal-Regular.woff2`
   - `NeueMontreal-Medium.woff2`  *(si está disponible)*

2. En `styles.css`, **descomentar** el bloque marcado `/* === FUENTES DE MARCA (PENDIENTE) === */`
   (las reglas `@font-face` + el override de `--serif`/`--sans` para `.theme-brand` y `.theme-3df`).

3. Subir la versión de cache-busting (`?v=N`) en las 3 páginas.

Hasta que se haga el paso 2, el inicio y 3DF siguen con Cormorant + Inter (sin cambios visibles).
