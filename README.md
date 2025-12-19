# Proyecto 3 - Cultura Digital

Aplicación web estilo dashboard donde los alumnos pueden navegar por mundos, jugar minijuegos, consultar medallas, estadísticas y comprar cosméticos para su personaje. El proyecto se basa en Vite + JavaScript Vanilla, con vistas renderizadas como plantillas y un estado global sencillo.

## Scripts principales

```bash
npm install       # instala las dependencias
npm run dev       # arranca el entorno de desarrollo (Vite)
npm run build     # genera el build de producción
npm run preview   # sirve el build generado
```

## Estructura destacada

- `src/main.js`: punto de entrada. Gestiona navegación, estado UI y eventos globales.
- `src/views/`: cada vista (mundos, medallas, tienda, stats, juego, perfil, menú) devuelve HTML usando `baseLayout`.
- `src/state/state.js`: almacena el estado del jugador, logros, monedas, tienda y helpers para modificarlo.
- `src/state/uiState.js`: refleja la vista actual y selecciones (mundo, nivel, sección de tienda).
- `src/state/persistence.js`: carga/guarda en `localStorage`.
- `src/data/shopCatalog.js`: catálogo de ítems de tienda con datos de progresión e imágenes.
- `public/assets/`: iconos del menú, fondos de mundos y personajes.

## Notas de desarrollo

- Las rutas de imágenes se construyen usando `import.meta.env.BASE_URL` para evitar 404 en despliegue.
- Las vistas comparten la maquetación definida en `baseLayout`, que también pinta los iconos del menú y el panel del personaje.
- El minijuego de Cultura Digital se implementa en `src/games/`. Cada nivel tiene su propia lógica, pero todos comparten estilos en `src/styles/style.css`.

## Personalización

- Para añadir mundos o logros: editar `DEFAULT_STATE` y `ACHIEVEMENTS_CATALOG` en `src/state/state.js`.
- Para ampliar la tienda: añadir ítems en `src/data/shopCatalog.js`. Los ítems de progresión se gestionan con `canBuyItem` y `buyProgressionItem`.
- Los estilos están centralizados en `src/styles/style.css`, organizado por bloques (layout, menú, tienda, medallas, etc.) para facilitar mantenimiento.

¡Disfruta explorando el proyecto!
