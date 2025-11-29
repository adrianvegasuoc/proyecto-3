// Mapa en memoria que asocia el nombre de cada vista con su función de renderizado.
const views = {};

export function registerView(name, renderFunction) {
  // Registrar una vista para poder navegar a ella más adelante.
  views[name] = renderFunction; // guardar función de renderizado
}

export function navigateTo(name) {
  // El contenedor principal donde se inyecta la vista solicitada.
  const app = document.getElementById("app");

  if (!views[name]) {
    // Si se intenta acceder a una vista no registrada mostramos un mensaje de error.
    app.innerHTML = `<p>Vista no encontrada: ${name}</p>`;
    return;
  }

  // Ejecuta la función registrada y pinta la salida en el contenedor.
  app.innerHTML = views[name](); // ejecuta función y muestra resultado
}
