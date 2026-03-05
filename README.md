<p align="center">
  <img src="public/logo.png" alt="Egida Jurídica" width="180" />
</p>

<h1 align="center">Egida Jurídica</h1>

<p align="center">
  <strong>Rigor jurídico, no ruido.</strong><br />
  Sitio web corporativo de la firma legal Egida Jurídica.
</p>

<p align="center">
  <a href="https://egidajuridica.com">🌐 egidajuridica.com</a> ·
  <a href="https://www.instagram.com/egidajuridica">📸 Instagram</a> ·
  <a href="https://www.linkedin.com/company/egidajuridica">💼 LinkedIn</a>
</p>

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Páginas](#-páginas)
- [Sistema de diseño](#-sistema-de-diseño)
- [SEO y meta tags](#-seo-y-meta-tags)
- [Sistema de animaciones](#-sistema-de-animaciones)
- [Cómo empezar](#-cómo-empezar)
- [Comandos](#-comandos)
- [Despliegue](#-despliegue)
- [Dominio](#-dominio)
- [Documentación complementaria](#-documentación-complementaria)

---

## 🏛️ Sobre el proyecto

**Egida Jurídica** es una firma legal peruana especializada en **derecho laboral, empresarial y civil**, con más de 20 años de experiencia profesional. Este repositorio contiene el código fuente de su sitio web corporativo, diseñado para transmitir confianza, seriedad y profesionalismo.

**Objetivos del sitio:**

- Presentar los servicios y especialidades de la firma
- Generar confianza a través de testimonios y casos de éxito
- Facilitar el contacto con potenciales clientes
- Posicionar la marca en motores de búsqueda (SEO)

---

## ⚙️ Tecnologías

| Tecnología                                                                             | Versión | Propósito                                                                |
| -------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| **[Astro](https://astro.build)**                                                       | 5.17+   | Framework principal — genera HTML estático con islands de interactividad |
| **[React](https://react.dev)**                                                         | 19+     | Componentes interactivos (carruseles, formularios, sliders)              |
| **[TypeScript](https://typescriptlang.org)**                                           | strict  | Tipado estático para la configuración y lógica del proyecto              |
| **[Tailwind CSS](https://tailwindcss.com)**                                            | 4.2+    | Framework de utilidades CSS para estilos                                 |
| **[Swiper](https://swiperjs.com)**                                                     | 12+     | Carruseles y sliders (servicios, equipo, testimonios)                    |
| **[Lucide React](https://lucide.dev)**                                                 | 0.576+  | Iconos SVG consistentes                                                  |
| **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** | 3.7+    | Generación automática de `sitemap.xml`                                   |

### ¿Por qué estas tecnologías?

- **Astro** fue elegido por su enfoque _zero-JS by default_: el sitio se genera como HTML estático puro, enviando JavaScript al navegador solo donde hay interactividad real (formularios, carruseles). Esto resulta en tiempos de carga muy rápidos, ideal para SEO y para la experiencia de un sitio corporativo.

- **React** se integra mediante la arquitectura de **Islands** de Astro: solo los componentes que necesitan interactividad del cliente se hidratan (con `client:load`), manteniendo el bundle de JS mínimo.

- **Tailwind CSS v4** utiliza el nuevo sistema de `@theme inline` con variables CSS nativas (`oklch`), permitiendo un design system coherente con soporte completo para modo oscuro.

- **TypeScript en modo strict** garantiza que la configuración del sitio, las rutas y los meta tags estén tipados y libres de errores.

- **Swiper** ofrece un rendimiento excelente en sliders táctiles, con soporte nativo para navegación por teclado y accesibilidad.

---

## 🏗️ Arquitectura

El proyecto sigue la arquitectura **MPA (Multi-Page Application)** de Astro con componentes **Island Architecture** para interactividad selectiva.

```
┌─────────────────────────────────────────────────┐
│                    Astro SSG                     │
│              (Generación estática)               │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  Pages   │   │  Layouts │   │  Config  │    │
│  │  (.astro)│   │  (Core)  │   │  (.ts)   │    │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘    │
│       │              │              │            │
│       ▼              ▼              ▼            │
│  ┌──────────────────────────────────────────┐   │
│  │            Components Layer              │   │
│  │                                          │   │
│  │  ┌─────────┐  ┌────────┐  ┌──────────┐ │   │
│  │  │  Astro  │  │ React  │  │  Shared  │ │   │
│  │  │ (static)│  │(islands)│  │(comunes) │ │   │
│  │  └─────────┘  └────────┘  └──────────┘ │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Styles Layer                   │   │
│  │  global.css  ·  animations.css           │   │
│  │  Tailwind v4  ·  CSS Variables (oklch)   │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
          │
          ▼
    ┌──────────┐
    │  dist/   │  ← HTML estático + assets optimizados
    │  (build) │
    └──────────┘
```

### Flujo de datos

1. **Configuración** (`src/config/`) centraliza toda la información del sitio: identidad, contacto, rutas, meta tags y datos estructurados
2. **Layout** (`CoreLayout`) recibe los meta tags por props y renderiza el HTML base, incluyendo SEO, View Transitions y el sistema de animaciones
3. **Páginas** (`.astro`) componen secciones usando componentes Astro (estáticos) y React (interactivos con `client:load`)
4. **Componentes** están organizados por página (`principal/`, `acerca/`, `servicios/`, etc.) y compartidos (`shared/`)

---

## 📁 Estructura del proyecto

```
egida_juridica/
├── public/                          # Assets estáticos (sin procesar)
│   ├── favicon.svg
│   ├── logo.png
│   ├── logo_center.png
│   └── og-image.png                 # Imagen para Open Graph
│
├── src/
│   ├── assets/                      # Assets procesados por Astro
│   │   ├── astro.svg
│   │   └── background.svg
│   │
│   ├── components/
│   │   ├── principal/               # Componentes de la página principal
│   │   │   ├── hero_section/        # Hero con imagen de fondo
│   │   │   ├── about_section/       # Sección "Sobre nosotros" (reutilizable)
│   │   │   └── services_section/    # Carrusel de servicios (React + Swiper)
│   │   │
│   │   ├── acerca/                  # Componentes de la página "Acerca de"
│   │   │   └── expertise_section/   # Sección de experiencia
│   │   │
│   │   ├── servicios/               # Componentes de la página "Servicios"
│   │   │   ├── phrase_section/      # Frase destacada
│   │   │   └── specialties_section/ # Especialidades con detalle
│   │   │
│   │   ├── contacto/                # Componentes de la página "Contacto"
│   │   │   └── form_section/        # Formulario de contacto (React)
│   │   │
│   │   ├── testimonios/             # Componentes de la página "Testimonios"
│   │   │   └── testimonials_section/
│   │   │
│   │   └── shared/                  # Componentes compartidos entre páginas
│   │       ├── header/              # Navegación principal (responsive)
│   │       ├── footer/              # Pie de página
│   │       ├── hero_section/        # Hero reutilizable para subpáginas
│   │       ├── team_section/        # Sección de equipo (React + Swiper)
│   │       ├── success_stories_section/ # Casos de éxito (React + Swiper)
│   │       ├── instagram_section/   # Feed de Instagram
│   │       ├── whatsapp_button/     # Botón flotante de WhatsApp
│   │       └── up_button/           # Botón de scroll-to-top
│   │
│   ├── config/
│   │   ├── index.ts                 # Barrel export de toda la config
│   │   ├── sites/index.ts           # Datos del sitio (nombre, contacto, redes)
│   │   ├── routes/index.ts          # Definición de todas las rutas
│   │   └── meta/                    # Meta tags por página
│   │       ├── principal/
│   │       ├── about/
│   │       ├── contact/
│   │       ├── services/
│   │       ├── testimonials/
│   │       ├── privacy/
│   │       ├── terms/
│   │       └── not-found/
│   │
│   ├── layouts/
│   │   ├── index.ts                 # Barrel export
│   │   └── core/index.astro         # Layout principal (head, SEO, scripts)
│   │
│   ├── pages/                       # Rutas del sitio (file-based routing)
│   │   ├── index.astro              # / — Inicio
│   │   ├── acerca/index.astro       # /acerca — Acerca de
│   │   ├── servicios/index.astro    # /servicios — Servicios
│   │   ├── contacto/index.astro     # /contacto — Contacto
│   │   ├── testimonios/index.astro  # /testimonios — Testimonios
│   │   ├── privacidad/index.astro   # /privacidad — Política de privacidad
│   │   ├── terminos/index.astro     # /terminos — Términos y condiciones
│   │   └── 404/index.astro          # 404 — Página no encontrada
│   │
│   └── styles/
│       ├── global.css               # Tema global (Tailwind + CSS vars)
│       └── animations.css           # Sistema de animaciones scroll-reveal
│
├── astro.config.mjs                 # Configuración de Astro
├── tsconfig.json                    # Configuración de TypeScript
├── package.json
└── docs/                            # Documentación del proyecto
    └── AGENTS.md                    # Guía para agentes IA
```

---

## 📄 Páginas

| Ruta           | Archivo                         | Descripción                                                              |
| -------------- | ------------------------------- | ------------------------------------------------------------------------ |
| `/`            | `pages/index.astro`             | Página principal con hero, servicios, equipo, casos de éxito e Instagram |
| `/acerca`      | `pages/acerca/index.astro`      | Información sobre la firma, equipo y trayectoria                         |
| `/servicios`   | `pages/servicios/index.astro`   | Especialidades legales con detalle y carrusel de servicios               |
| `/contacto`    | `pages/contacto/index.astro`    | Formulario de contacto y mapa de ubicación                               |
| `/testimonios` | `pages/testimonios/index.astro` | Testimonios de clientes                                                  |
| `/privacidad`  | `pages/privacidad/index.astro`  | Política de privacidad                                                   |
| `/terminos`    | `pages/terminos/index.astro`    | Términos y condiciones                                                   |
| `404`          | `pages/404/index.astro`         | Página no encontrada                                                     |

---

## 🎨 Sistema de diseño

### Fuentes tipográficas

| Fuente                       | Uso                                                 |
| ---------------------------- | --------------------------------------------------- |
| **Playfair Display** (serif) | Títulos, headings — transmite elegancia y autoridad |
| **Work Sans** (sans-serif)   | Texto de cuerpo, UI — moderno y legible             |
| **Times New Roman** (serif)  | Textos decorativos de fondo                         |

### Paleta de colores

El sistema usa **CSS Custom Properties** con valores `oklch` para colores perceptualmente uniformes:

| Variable                             | Uso                            |
| ------------------------------------ | ------------------------------ |
| `--background` / `--foreground`      | Fondo y texto principal        |
| `--primary` / `--primary-foreground` | Color primario y su contraste  |
| `--secondary`                        | Superficies secundarias        |
| `--muted` / `--muted-foreground`     | Texto suave (descripciones)    |
| `--gold` (`#D3A985`)                 | Color de marca — dorado cálido |
| `--whatsapp` (`#25D366`)             | Botón de WhatsApp              |

El sistema soporta **modo oscuro** completo a través de la clase `.dark`.

---

## 🔍 SEO y meta tags

Cada página tiene su propia configuración de meta tags en `src/config/meta/`, incluyendo:

- **Title** y **description** optimizados
- **Keywords** específicas por página
- **Open Graph** (og:title, og:description, og:image)
- **Twitter Cards** (summary_large_image)
- **Canonical URLs**
- **Robots** directives
- **Schema.org / JSON-LD** (datos estructurados)
- **Sitemap XML** generado automáticamente

---

## ✨ Sistema de animaciones

El sitio incluye un sistema de animaciones basado en `IntersectionObserver`:

| Sistema                | Descripción                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `data-animate`         | Scroll-reveal con variantes: `fade-up`, `slide-left`, `scale-up`, etc. |
| `data-animate-delay`   | Delays escalonados para lists y grids                                  |
| `data-animate-stagger` | Auto-stagger para hijos de un contenedor                               |
| Hero animations        | Animaciones de entrada del hero (title, description, buttons, image)   |
| Parallax text          | Texto decorativo de fondo con efecto parallax                          |
| View Transitions       | Transiciones suaves entre páginas (Astro View Transitions)             |
| Page Loader            | Barra de progreso en la parte superior durante navigation              |

**Accesibilidad**: todas las animaciones respetan `prefers-reduced-motion: reduce`.

---

## 🚀 Cómo empezar

### Requisitos previos

- **Node.js** >= 18.x
- **npm** >= 9.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/egida_juridica.git
cd egida_juridica

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.

---

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando             | Descripción                                              |
| ------------------- | -------------------------------------------------------- |
| `npm install`       | Instala las dependencias                                 |
| `npm run dev`       | Inicia el servidor de desarrollo en `localhost:4321`     |
| `npm run build`     | Genera el sitio estático en `./dist/`                    |
| `npm run preview`   | Pre-visualiza el build de producción localmente          |
| `npm run astro ...` | Ejecuta comandos del CLI de Astro (`add`, `check`, etc.) |

---

## 🌍 Despliegue

### Opción 1: Hosting estático (Recomendado)

Al ejecutar `npm run build`, Astro genera archivos HTML, CSS y JS estáticos en la carpeta `dist/`. Este contenido puede desplegarse en cualquier proveedor de hosting estático:

**Vercel** (recomendado):

```bash
# Instalar CLI de Vercel
npm i -g vercel

# Desplegar
vercel
```

**Netlify**:

```bash
# Build command: npm run build
# Publish directory: dist
```

**GitHub Pages**:

1. Configurar `site` en `astro.config.mjs` con la URL base
2. Añadir el adapter de GitHub Pages: `npx astro add @astrojs/github-pages`
3. Configurar el workflow de GitHub Actions para deploy automático

**Cloudflare Pages**:

```bash
# Build command: npm run build
# Build output directory: dist
```

### Opción 2: Node.js (SSR)

Si se necesita Server-Side Rendering:

```bash
npx astro add node
npm run build
node ./dist/server/entry.mjs
```

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto si se necesitan variables de entorno:

```env
# No se requieren variables de entorno para el build estático actual
```

---

## 🌐 Dominio

| Campo                 | Valor                       |
| --------------------- | --------------------------- |
| **Dominio principal** | `egidajuridica.com`         |
| **URL completa**      | `https://egidajuridica.com` |
| **Locale**            | `es-PE` (Español — Perú)    |
| **País**              | Perú                        |
| **Zona horaria**      | `America/Lima`              |

### Configuración DNS

Para apuntar el dominio al hosting elegido:

1. **Vercel/Netlify**: Agregar un registro CNAME apuntando al subdominio proporcionado por el proveedor
2. **Certificado SSL**: Se configura automáticamente (Let's Encrypt) en la mayoría de proveedores

---

## 📚 Documentación complementaria

- [`docs/AGENTS.md`](docs/AGENTS.md) — Guía para agentes IA que trabajen con este proyecto

---

<p align="center">
  <sub>© 2025 Egida Jurídica. Todos los derechos reservados.</sub>
</p>
