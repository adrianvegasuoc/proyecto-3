import { baseLayout } from "./baseLayout";
import { getState } from "../state/state";

export function profileEditView() {
  const state = getState();
  const currentName = state?.player?.name || "NUEVO JUGADOR";
  const safeName = currentName.replace(/"/g, "&quot;");

  const leftContent = `
    <div class="profile-simple profile-simple--top">
      <label class="profile-field">
        <span>Nombre</span>
        <input
          type="text"
          id="profile-name-input"
          value="${safeName}"
        />
      </label>

      <div class="profile-simple-actions">
        <button class="btn btn-primary" data-action="save-profile">GUARDAR</button>
        <button class="btn" data-action="cancel-profile">VOLVER</button>
      </div>
    </div>
  `;

  const rightContent = "";

  return baseLayout({
    leftContent,
    rightContent,
  });
}
