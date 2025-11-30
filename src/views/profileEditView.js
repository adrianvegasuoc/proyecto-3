import { baseLayout } from "./baseLayout";
import { getState } from "../state/state";

export function profileEditView() {
  const state = getState();
  const currentName = state?.player?.name || "NUEVO JUGADOR";

  const leftContent = `
    <div class="worlds-list">
      <button class="world-item">MUNDO CULTURA DIGITAL</button>
      <button class="world-item">MUNDO HTML</button>
      <button class="world-item">MUNDO CSS</button>
      <button class="world-item">MUNDO LÓGICA</button>
    </div>
  `;

  const safeName = currentName.replace(/"/g, "&quot;");

  const rightContent = `
    <div class="profile-edit">
      <div class="profile-form">
        <label class="profile-field">
          <span>Nombre</span>
          <input
            type="text"
            id="profile-name-input"
            value="${safeName}"
          />
        </label>

        <button class="profile-btn" disabled>ALTURA</button>
        <button class="profile-btn" disabled>OPCIÓN 2</button>
        <button class="profile-btn" data-action="save-profile">GUARDAR</button>
        <button class="profile-btn" data-action="cancel-profile">VOLVER</button>
      </div>

      <div class="profile-preview">
        <!-- ESPACIO DE PERSONAJE (placeholder) -->
      </div>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
