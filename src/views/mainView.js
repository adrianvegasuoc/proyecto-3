export function mainView() {
  return `
    <section class="main-view">
      <h1>Proyecto 3 — Pantalla Principal</h1>
      <p>Este será el inicio del juego.</p>

      <nav class="menu">
        <button data-view="worlds">Mundos</button>
        <button data-view="medals">Medallero</button>
        <button data-view="shop">Tienda</button>
        <button data-view="stats">Estadísticas</button>
        <button data-view="game">Jugar</button>
      </nav>
    </section>
  `;
}
