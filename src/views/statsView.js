import { baseLayout } from "./baseLayout";
import { getState } from "../state/state";

export function statsView() {
  const state = getState();

  const worldsProgress = state.worlds
    .map((world) => {
      const completed = world.completedLevels.length;
      const total = world.levels;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return `
        <div class="stats-world-item">
          <div class="stats-world-name">${world.name}</div>
          <div class="stats-world-info">${completed} / ${total} niveles completados</div>
          <div class="stats-world-bar">
            <div class="stats-world-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    })
    .join("");

  const leftContent = `
    <div class="stats-progress">
      <div class="stats-progress-header">PROGRESO POR MUNDO</div>
      <div class="stats-worlds-list">
        ${worldsProgress}
      </div>
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
