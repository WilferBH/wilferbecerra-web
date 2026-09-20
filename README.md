# wilferbecerra.com

Portafolio personal de Wilfer Becerra. Next.js (App Router), TypeScript, Tailwind CSS y Motion.

## Desarrollo

```bash
npm install
npm run dev
```

La web queda en http://localhost:3000. Español en `/es` e inglés en `/en`; la raíz redirige según el idioma del navegador.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación de producción |
| `npm run lint` | Revisa el código |

## Estructura

```
src/
  app/[lang]/        paginas y rutas por idioma
  components/        cabecera, pie, secciones y animaciones
  content/           textos (es.ts, en.ts), proyectos, datos del sitio
  proxy.ts           redirección al idioma del navegador
public/
  capturas/          imágenes de los proyectos
  clientes/          fotos de clientes que dan reseña
```

## Editar contenido

- **Textos:** `src/content/es.ts` y `src/content/en.ts`. Un `*texto*` se muestra en cursiva destacada.
- **Proyectos:** `src/content/projects.ts`.
- **Datos del sitio y reseñas:** `src/content/site.ts`.
- **Certificados:** `src/content/certifications.ts`. La sección aparece sola al añadir el primero.
