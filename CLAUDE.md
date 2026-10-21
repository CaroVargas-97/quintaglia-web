# Quintaglia — Sitio web

Sitio de **Quintaglia Desarrollos Inmobiliarios** (Buenos Aires). Home de marca + páginas dedicadas por proyecto. El objetivo es una estética elegante y "delicada", mejor que la página de referencia de cada proyecto, manteniendo la marca Quintaglia.

## Stack y cómo correrlo

- **HTML/CSS/JS puro**, sin framework ni build.
- Servidor local:
  ```bash
  python3 -m http.server 8777
  ```
  Luego abrir `http://localhost:8777/`.
- **Cache-busting manual**: los links a `styles.css` y `script.js` llevan `?v=N`. Al cambiar CSS/JS hay que subir ese número en las 3 páginas. Versión actual: **v88**.
  ```bash
  perl -0pi -e 's{styles\.css\?v=\d+}{styles.css?v=NN}g; s{script\.js\?v=\d+}{script.js?v=NN}g' index.html proyectos/3-de-febrero-2781.html proyectos/wood-recoleta.html
  ```

## Estructura del sitio

```
/
├── index.html                        # Home de marca Quintaglia (hero, proyectos, etc.)
├── proyectos/
│   ├── 3-de-febrero-2781.html        # Proyecto 3 de Febrero 2781 (identidad cálida)
│   └── wood-recoleta.html            # Proyecto WOOD Recoleta (identidad verde)
├── styles.css                        # Hoja de estilos única (tokens + componentes + .theme-wood)
├── script.js                         # Nav, reveal, tabs, modal de cercanos, lightbox, form
├── assets/
│   ├── img/                          # Renders, interiores, fachadas, planos, logos
│   │   └── _plan_originales/         # Backup de los planos en blanco (ignorado en git)
│   └── plans/                        # Plantas 3DF (PNG)
├── CLAUDE.md
└── .gitignore
```

Cada proyecto tiene su propia identidad pero se lee como el mismo desarrollador.

## Paleta y tipografía

### Marca Quintaglia (home + 3 de Febrero)
- Tipografías: **Cormorant Garamond** (serif, títulos) + **Inter** (sans, cuerpo).
- Identidad cálida (tonos tierra/crema).

### WOOD Recoleta — `<body class="theme-wood">`
Bloque `.theme-wood` en `styles.css` con la paleta verde:

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#40584a` (verde ~`#40594a`) | Verde principal (botones, cajas, planos) |
| `--mink` | `#cdd8c2` | Verde grisáceo claro |
| `--navy` | `#28382e` | Verde muy oscuro |
| `--ink` | `#2d322b` | Texto |
| `--paper` | `#f5f2ea` | Fondo claro |
| `--nude` | `#ede4d3` | Fondo cálido |
| `--sans` | **Montserrat** | Sans del tema WOOD |

- Tipografías WOOD: **Cormorant Garamond** + **Montserrat**.
- Botón WhatsApp en verde `#25D366`.

## Decisiones tomadas

- **WOOD = réplica de la página de referencia** (sin branding de Team Scaglia / Red SUMA). Todo bajo marca Quintaglia.
- **Módulo "El edificio piso por piso"** (sección disponibilidad):
  - Fachada frontal `wood-facade.jpg` con 9 bandas (`.fband`) calibradas por brillo para caer justo sobre cada piso (1° abajo → 9° arriba). Mapa `FY` en el script inline de `wood-recoleta.html`.
  - Paso 1 (elegir piso) → Paso 2 (elegir unidad) → detalle con m², precio contado, financiado (30% + 24 cuotas), anticipo y plano de la unidad.
  - **Se quitó** el toggle "Fachada / Lista de precios" y la tabla de precios ordenable: eran agregados propios, la referencia no los tiene.
- **Planos en verde con líneas claras**: la referencia usa imágenes de planos con fondo verde. Las nuestras venían en blanco con líneas grises. Se **recolorearon los archivos** `assets/img/wood-plan-*.jpg` a fondo verde `#40594a` + líneas claras `#d6ddd8` (script PIL, mapeo por brillo). Los originales en blanco quedaron en `assets/img/_plan_originales/`. Se evitó el truco CSS `invert` + `mix-blend-mode:screen` porque se mezclaba con la tarjeta blanca y daba un tono rosado.
- **Efecto contador en los precios**: al elegir la unidad, el valor sube animado desde 0 hasta el precio final (~0,9s, easing suave). Respeta `prefers-reduced-motion`.
- **Tipografía del módulo** (igual a la referencia): números de piso y precios en **Montserrat 700**; letras de unidad (A/B/C) en **Cormorant Garamond 600**.
- **Ubicación**: módulo "didáctico" con categorías (comercios, educación, verdes, gym, salud, transporte, cultura, gastronomía) y modal con cercanos reales + links a Google Maps. Datos WOOD extraídos de la página de referencia; 3DF se arma a mano (geocoding Nominatim + distancias haversine).
- **Nav WOOD**: minimalista (marca WOOD + botón Consultar). El logo Quintaglia vive en el footer ("Desarrolla Quintaglia").

## Pendientes

- [ ] **Datos de contacto reales** (hoy son placeholders): WhatsApp `+5491100000000`, email `info@quintaglia.com`, Instagram `@quintaglia`.
- [ ] **Formulario de contacto**: hoy es demo sin backend (`script.js` solo valida y muestra mensaje). Falta conectar a un endpoint / servicio de mail.
- [ ] Revisar/confirmar el resto de WOOD contra la referencia (secciones que falten pulir).
- [ ] Definir si el home y 3DF necesitan más pasadas de diseño/contenido.
- [ ] Evaluar automatizar el cache-busting (hoy es manual con `?v=N`).
- [ ] **Fuentes de marca** (inicio + 3DF): objetivo del manual = **Harume Roman** (títulos) + **Neue Montreal** (cuerpo). **Estado actual** (bloque `=== FUENTES INTERINAS ===` en `styles.css`, `.theme-brand`/`.theme-3df`):
  - Títulos (combo, decidido con la clienta): **Harume Roman** NO tiene minúsculas ni acentos (es una tipográfica de caja alta, estilo logo). Por eso:
    - **Hero (h1)** → Harume Roman en mayúscula, con `letter-spacing:.05em` para que no quede apretada (impacto de marca). `assets/fonts/HarumeRoman.woff2`.
    - **Títulos de sección (h2/h3/h4)** → mismo sello que el hero del home: cuerpo en **Marcellus** (Google Fonts, may/minúscula, con acentos) + **inicial en Harume** (`::first-letter`). Marcellus se eligió por ser la serif más parecida a Harume (ancha, contraste parejo), así la inicial y el resto se leen parejos. Italiana queda de respaldo. Así todos los títulos de marca (inicio + 3DF) comparten el arranque Harume.
  - Cuerpo → **Neue Montreal** real (`assets/fonts/NeueMontreal-{Light,Regular,Semibold}.woff2`, `@font-face` 300/400/600). Versión free pero **completa (1041 glifos, con acentos/ñ)**: el cuerpo NO tiene mezcla. Hanken Grotesk / Inter quedan solo de fallback.
  - ⚠️ Ambas fuentes subidas son **"free for personal use"**. Para el sitio en vivo falta la **licencia comercial/webfont**: Harume full (US$19 Gumroad → además agrega acentos y quita la mezcla con Italiana) y Neue Montreal (Pangram Pangram, licencia web). Ver `assets/fonts/README.md`.

## Git

- Repo: `https://github.com/CaroVargas-97/quintaglia-web` (rama `main`).
- `.gitignore` excluye `node_modules/`, `.env*`, `.DS_Store` y `assets/img/_plan_originales/`.
- Nota: el push necesitó `http.postBuffer` alto por el peso de las imágenes (ya configurado localmente).
