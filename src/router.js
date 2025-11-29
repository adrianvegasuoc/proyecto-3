const views = {};

export function registerView(name, renderFunction) {
  views[name] = renderFunction;
}

export function navigateTo(name) {
  const app = document.getElementById("app");

  if (!views[name]) {
    app.innerHTML = `<p>Vista no encontrada: ${name}</p>`;
    return;
  }

  app.innerHTML = views[name](); // la vista genera TODO el layout
}
