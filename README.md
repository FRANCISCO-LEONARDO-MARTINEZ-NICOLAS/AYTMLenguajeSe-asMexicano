# LSM para niños (AYTMLenguajeSe-asMexicano)

Aplicación web educativa interactiva para la enseñanza de **Lengua de Señas Mexicana (LSM)**, pensada para niños de primaria. Incluye diccionario visual con videos, ejercicios de práctica tipo quiz y juegos didácticos (memorama y ahorcado).

## Características

- **Inicio** — Presentación y acceso rápido a las secciones.
- **Diccionario** — Categorías: abecedario (A–Z y Ñ), números (0–20), colores y partes del cuerpo. Cada entrada puede mostrar un video o un placeholder si el archivo aún no existe.
- **Practicar** — Preguntas con video de seña y opciones de respuesta; puntuación y retroalimentación con sonido.
- **Juegos** — Memorama de parejas y ahorcado con vocabulario LSM.

La interfaz usa un diseño claro y accesible (navegación fija, botón atrás, textos en español).

## Stack tecnológico

| Área        | Tecnología                          |
| ----------- | ----------------------------------- |
| Framework   | React 18                            |
| Lenguaje    | TypeScript                          |
| Build       | Vite 5                              |
| Estilos     | Tailwind CSS 3                      |
| Enrutado    | React Router 7                      |
| Iconos      | Lucide React                        |

> **Nota:** El paquete `@supabase/supabase-js` está en las dependencias del proyecto, pero **no se usa aún** en el código fuente. Sirve como base si más adelante quieres backend, autenticación o almacenamiento en la nube.

## Requisitos

- [Node.js](https://nodejs.org/) **18 o superior** (recomendado LTS).
- npm (incluido con Node).

## Instalación y desarrollo

```bash
# Clonar el repositorio (ajusta la URL si usas otro remoto)
git clone <url-del-repositorio>
cd AYTMLenguajeSe-asMexicano

# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173 por defecto)
npm run dev
```

## Scripts disponibles

| Comando        | Descripción                                      |
| -------------- | ------------------------------------------------ |
| `npm run dev`  | Arranca Vite en modo desarrollo con recarga en caliente. |
| `npm run build` | Genera la versión optimizada en `dist/`.       |
| `npm run preview` | Sirve localmente el contenido de `dist/` (prueba del build). |
| `npm run lint` | Ejecuta ESLint sobre el proyecto.                |
| `npm run typecheck` | Comprueba tipos con TypeScript sin emitir archivos. |

## Videos del diccionario

Los videos esperados van en **`public/videos/lsm/`**. Los nombres deben coincidir con las rutas definidas en `src/data/lsmContent.ts` (por ejemplo `letra-a.mp4`, `numero-5.mp4`, `color-rojo.mp4`). Si falta un archivo, la interfaz muestra un **placeholder** hasta que agregues el video.

## Estructura relevante del proyecto

```
src/
  App.tsx              # Rutas de la aplicación
  components/          # Layout, VideoPlaceholder, etc.
  data/lsmContent.ts   # Categorías del diccionario, preguntas de práctica y datos de juegos
  hooks/               # Por ejemplo sonidos de retroalimentación
  pages/               # Home, Dictionary, Practice, Games, MemoryGame, HangmanGame
public/
  videos/lsm/          # Videos LSM (añadir aquí los .mp4)
```

## Despliegue

Tras `npm run build`, sube la carpeta **`dist/`** a cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.). No hace falta servidor Node en producción: es una SPA estática.

---

¿Ideas para seguir mejorando el proyecto? Completar la biblioteca de videos, añadir más categorías en `lsmContent.ts`, o conectar Supabase si necesitas usuarios o contenido remoto.
