# 🤖 AGENTS.md — Guía para agentes IA

> Este documento es una referencia completa para cualquier agente IA (Copilot, Cursor, Claude, etc.) que trabaje con el proyecto **Egida Jurídica**. Contiene las convenciones, patrones, reglas y contexto necesario para contribuir de forma coherente al codebase.

---

## 📌 Información del proyecto

- **Nombre**: Egida Jurídica
- **Tipo**: Sitio web corporativo (firma legal)
- **Dominio**: `https://egidajuridica.com`
- **Idioma**: Español (es-PE)
- **Framework**: Astro 5 + React 19 + Tailwind CSS 4 + TypeScript
- **Enfoque**: SSG (Static Site Generation) con Islands Architecture

---

## 🏗️ Arquitectura y patrones

### Framework principal: Astro

Este proyecto usa **Astro** como framework principal con generación de sitios estáticos (SSG). Astro genera HTML puro por defecto y solo envía JavaScript al navegador cuando un componente necesita interactividad.

### Islands Architecture

- Los componentes `.astro` son **estáticos** — NO envían JS al cliente
- Los componentes `.tsx` (React) son **interactivos** — se hidratan con `client:load`
- Solo usar `client:load` cuando haya interactividad real (carruseles, formularios, sliders)

```astro
<!-- ✅ Correcto: componente estático -->
<HeroSection />

<!-- ✅ Correcto: componente interactivo -->
<ServicesSection client:load />

<!-- ❌ Incorrecto: no hidratar componentes sin interactividad -->
<Footer client:load />
```

### File-based routing

Las páginas se crean en `src/pages/`. La estructura de carpetas define las rutas:

```
src/pages/index.astro        → /
src/pages/acerca/index.astro  → /acerca
src/pages/servicios/index.astro → /servicios
```

---

## 📁 Convenciones de estructura

### Organización de componentes

Los componentes están organizados **por página/dominio**, no por tipo:

```
src/components/
├── principal/          # Solo usados en la página principal (/)
├── acerca/             # Solo usados en la página /acerca
├── servicios/          # Solo usados en la página /servicios
├── contacto/           # Solo usados en la página /contacto
├── testimonios/        # Solo usados en la página /testimonios
└── shared/             # Usados en múltiples páginas
```

### Naming conventions

| Elemento                  | Convención                  | Ejemplo                          |
| ------------------------- | --------------------------- | -------------------------------- |
| Carpetas de componentes   | `snake_case`                | `hero_section/`, `form_section/` |
| Archivos de componentes   | `index.astro` o `index.tsx` | `hero_section/index.astro`       |
| Archivos de configuración | `index.ts`                  | `config/sites/index.ts`          |
| Barrel exports            | `index.ts` en cada carpeta  | `components/shared/index.ts`     |
| Variables CSS             | `--kebab-case`              | `--primary-foreground`           |
| Clases de animación       | `kebab-case`                | `hero-animate-title`             |
| Data attributes           | `data-kebab-case`           | `data-animate="fade-up"`         |

### Crear un nuevo componente

1. Crear carpeta en `src/components/{pagina}/{nombre_componente}/`
2. Crear `index.astro` (estático) o `index.tsx` (interactivo)
3. Exportar desde el barrel `index.ts` de la carpeta padre
4. Si es compartido, colocarlo en `shared/`

```bash
# Ejemplo: nuevo componente para la página de servicios
src/components/servicios/nuevo_componente/index.astro
```

---

## 🎨 Sistema de estilos

### Tailwind CSS v4

El proyecto usa **Tailwind CSS v4** con el plugin Vite (`@tailwindcss/vite`). La configuración del tema se define en `src/styles/global.css` usando `@theme inline`.

### Variables CSS del tema

Todas las variables están definidas en `src/styles/global.css`:

```css
:root {
  --background: oklch(1 0 0); /* Fondo */
  --foreground: oklch(0.145 0 0); /* Texto */
  --primary: oklch(0.205 0 0); /* Color primario */
  --gold: #d3a985; /* Color de marca */
  --whatsapp: #25d366; /* WhatsApp */
  /* ... más variables */
}
```

### Reglas de estilo

1. **SIEMPRE** usar las variables de tema en lugar de colores hardcodeados
2. Usar las utilidades de Tailwind que mapean a las variables (ej: `text-primary`, `bg-background`, `text-gold`)
3. Para componentes complejos, usar `<style>` scoped en Astro
4. Las fuentes disponibles son:
   - `font-serif` → Playfair Display (títulos)
   - `font-sans` → Work Sans (cuerpo)
   - `font-times` → Times New Roman (textos decorativos)

```astro
<!-- ✅ Correcto -->
<h2 class="text-primary font-serif">Título</h2>
<p class="text-muted-foreground font-sans">Descripción</p>

<!-- ❌ Incorrecto: colores hardcodeados -->
<h2 class="text-black">Título</h2>
<p class="text-gray-500">Descripción</p>
```

### Modo oscuro

El proyecto soporta modo oscuro con la clase `.dark` en el root. Los colores se invierten automáticamente a través de las CSS vars definidas en `.dark { ... }` en `global.css`.

---

## 🔧 Configuración centralizada

### `src/config/sites/index.ts`

Fuente de verdad de toda la información del sitio:

```typescript
export const site = {
  name: "Egida Jurídica",
  website: "https://egidajuridica.com",
  email: "egidajuridica.developers@gmail.com",
  phone: "+51 964 943 865",
  whatsapp: "https://wa.me/51964943865",
  // ... más campos
};
```

**Regla**: NUNCA hardcodear datos del sitio en los componentes. Siempre importar desde `src/config`.

### `src/config/routes/index.ts`

Todas las rutas del sitio están centralizadas:

```typescript
export const routes = {
  home: "/",
  about: "/acerca",
  contact: "/contacto",
  services: "/servicios",
  testimonials: "/testimonios",
  terms: "/terminos",
  privacy: "/privacidad",
};
```

**Regla**: NUNCA hardcodear rutas como strings. Siempre usar `routes.xxx`.

### `src/config/meta/{pagina}/index.ts`

Cada página tiene su propia configuración de meta tags con: `title`, `description`, `keywords`, `canonical`, `type`, `robots`, y `structuredData` (Schema.org JSON-LD).

---

## 📐 Layout principal: `CoreLayout`

El layout `src/layouts/core/index.astro` es el wrapper de todas las páginas. Proporciona:

- `<head>` completo con SEO meta tags
- Open Graph y Twitter Cards
- View Transitions (SPA-like navigation)
- Page loader (barra de progreso)
- Sistema de animaciones (IntersectionObserver)
- Componentes flotantes: WhatsappButton y UpButton
- Skip-to-content link (accesibilidad)

### Props del layout

```typescript
{
  title: string;
  description: string;
  keywords: string;
  canonical?: string;  // Default: Astro.url.pathname
  type?: string;
  robots?: string;
  headerTransparent?: boolean;
  structuredData?: object;  // JSON-LD
}
```

### Patrón de uso en páginas

```astro
---
import { Header, Footer } from "../components/shared";
import { CoreLayout } from "../layouts";
import { nombreMeta } from "../config";
---

<CoreLayout
  title={nombreMeta.title}
  description={nombreMeta.description}
  keywords={nombreMeta.keywords}
  canonical={nombreMeta.canonical}
  type={nombreMeta.type}
  robots={nombreMeta.robots}
  structuredData={nombreMeta.structuredData}
>
  <Header />
  <main id="main-content">
    <!-- Contenido de la página -->
  </main>
  <Footer />
</CoreLayout>
```

---

## ✨ Sistema de animaciones

### Scroll Reveal (`data-animate`)

Definido en `src/styles/animations.css`. Usa `IntersectionObserver` (configurado en el layout).

```html
<!-- Tipos disponibles -->
<div data-animate="fade-up">
  <!-- Aparece desde abajo -->
  <div data-animate="fade-up-sm">
    <!-- Aparece con offset menor -->
    <div data-animate="fade-down">
      <!-- Aparece desde arriba -->
      <div data-animate="fade-in">
        <!-- Solo opacity -->
        <div data-animate="slide-left">
          <!-- Desde la izquierda -->
          <div data-animate="slide-right">
            <!-- Desde la derecha -->
            <div data-animate="scale-up">
              <!-- Escala desde 0.92 -->
              <div data-animate="zoom-in">
                <!-- Escala desde 0.85 -->
                <div data-animate="slide-up-scale">
                  <!-- Combinación -->
                  <div data-animate="line-grow">
                    <!-- Línea que crece -->
                    <div data-animate="map-reveal">
                      <!-- Para iframes de mapa -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Delays y stagger

```html
<!-- Delays manuales -->
<div data-animate="fade-up" data-animate-delay="200">
  <!-- Auto-stagger para hijos -->
  <div data-animate-stagger>
    <div data-animate="fade-up">Hijo 1 (0ms)</div>
    <div data-animate="fade-up">Hijo 2 (120ms)</div>
    <div data-animate="fade-up">Hijo 3 (240ms)</div>
  </div>
</div>
```

### Hero animations

Clases CSS especiales para la sección hero:

- `.hero-animate-title`
- `.hero-animate-description`
- `.hero-animate-buttons`
- `.hero-animate-image`

### Parallax background text

```html
<span class="bg-text-parallax">TEXTO DE FONDO</span>
```

### Accesibilidad

**TODAS** las animaciones respetan `prefers-reduced-motion: reduce`. Este media query desactiva animaciones y transiciones automáticamente.

---

## 🧱 Componentes compartidos clave

### `Header` (`shared/header/index.astro`)

- Navegación principal responsive
- Mobile menu hamburger
- Transparent/solid variants

### `Footer` (`shared/footer/index.astro`)

- Links de navegación, contacto y redes sociales
- Animación de entrada (`.footer-animate`)

### `HeroSection` (`shared/hero_section/index.astro`)

- Reutilizable en todas las subpáginas
- Props: `title`, `description`, `imageSrc`, `imageAlt`, `buttons[]`, `className`

### `AboutSection` (`principal/about_section/index.astro`)

- Sección de contenido con imagen
- Props: `backgroundText`, `subtitle`, `title`, `description`, `linkText`, `linkHref`, `imageSrc`, `imageAlt`, `reverseLayout`
- Reutilizable con `reverseLayout` para alternar la posición de la imagen

### `WhatsappButton` (`shared/whatsapp_button/index.astro`)

- Botón flotante fijo en la esquina inferior derecha

### `UpButton` (`shared/up_button/index.astro`)

- Botón de scroll-to-top flotante

---

## ✅ Checklist para nuevas páginas

Al crear una nueva página, seguir estos pasos:

1. [ ] Crear archivo en `src/pages/{ruta}/index.astro`
2. [ ] Crear meta tags en `src/config/meta/{nombre}/index.ts`
3. [ ] Exportar meta desde `src/config/meta/index.ts`
4. [ ] Agregar ruta a `src/config/routes/index.ts`
5. [ ] Usar `CoreLayout` como wrapper con todos los meta props
6. [ ] Incluir `<Header />` y `<Footer />`
7. [ ] Usar `<main id="main-content">` para accesibilidad
8. [ ] Agregar `data-animate` a las secciones relevantes
9. [ ] Verificar responsividad (mobile, tablet, desktop)
10. [ ] Verificar que el enlace aparezca en header y/o footer

---

## ✅ Checklist para nuevos componentes

1. [ ] Crear carpeta en la ubicación correcta (`shared/` o `{pagina}/`)
2. [ ] Usar `index.astro` (estático) o `index.tsx` (interactivo)
3. [ ] Exportar desde el barrel `index.ts` correspondiente
4. [ ] Usar variables de tema para colores (`text-primary`, `bg-background`, etc.)
5. [ ] Usar fuentes del sistema (`font-serif`, `font-sans`)
6. [ ] Agregar aria labels y semántica HTML
7. [ ] Agregar animaciones con `data-animate`
8. [ ] Verificar responsividad
9. [ ] Si usa datos del sitio, importar desde `src/config`

---

## ⚠️ Reglas importantes

### ✅ DO (Sí hacer)

- Importar rutas desde `config/routes`
- Importar datos del sitio desde `config/sites`
- Usar barrel exports (`import { X } from "../components/shared"`)
- Usar CSS custom properties del tema
- Respetar la jerarquía de encabezados (solo un `<h1>` por página)
- Usar HTML semántico (`<section>`, `<article>`, `<nav>`, `<main>`)
- Añadir `aria-label` en secciones y elementos interactivos
- Soportar `prefers-reduced-motion`
- Usar `data-animate` para animaciones de entrada
- Escribir componentes en español (props, contenido)

### ❌ DON'T (No hacer)

- NO hardcodear URLs de rutas (`"/acerca"` → usar `routes.about`)
- NO hardcodear datos del sitio (teléfono, email, etc.)
- NO usar colores fuera del sistema de variables
- NO hidratar componentes estáticos con `client:load`
- NO crear componentes React cuando Astro es suficiente
- NO ignorar el modo oscuro (verificar que se vea bien)
- NO olvidar las animaciones `data-animate` en secciones nuevas
- NO poner más de un `<h1>` por página
- NO usar `rem` / `px` hardcoded cuando Tailwind tiene la utilidad

---

## 🔄 View Transitions

El proyecto usa **Astro View Transitions** para navegación SPA-like:

- Transiciones suaves entre páginas (fade-in/fade-out)
- Page loader con barra de progreso durante la navegación
- `window.scrollTo({ top: 0 })` en cada cambio de página
- Las animaciones `initScrollReveal()` se re-inicializan en cada transición

---

## 📦 Dependencias clave

| Paquete               | Uso                              |
| --------------------- | -------------------------------- |
| `astro`               | Framework principal (SSG)        |
| `@astrojs/react`      | Integración React para islands   |
| `@astrojs/sitemap`    | Generación de sitemap.xml        |
| `@tailwindcss/vite`   | Integración Tailwind v4 vía Vite |
| `tailwindcss`         | Framework CSS                    |
| `react` + `react-dom` | Componentes interactivos         |
| `swiper`              | Carruseles y sliders             |
| `lucide-react`        | Librería de iconos SVG           |

---

## 🧪 Testing y validación

Antes de hacer push, verificar:

1. `npm run build` — Build exitoso sin errores
2. `npm run preview` — Verificar visualmente todas las páginas
3. Validar HTML: [validator.w3.org](https://validator.w3.org/)
4. Verificar Lighthouse score (Performance, SEO, Accessibility)
5. Comprobar responsividad en mobile, tablet y desktop
6. Verificar que las View Transitions funcionan correctamente
7. Verificar que las animaciones respetan `prefers-reduced-motion`

---

> **Última actualización**: Marzo 2026
