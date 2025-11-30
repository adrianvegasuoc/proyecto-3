import { baseLayout } from "./baseLayout";
import { getState, getAchievementsCatalog } from "../state/state";

export function medalView() {
  const state = getState();
  const unlockedIds = state.achievements || [];
  const catalog = getAchievementsCatalog();

  const grid = catalog
    .map((ach) => {
      const isUnlocked = unlockedIds.includes(ach.id);

      const classes = ["medal-slot", isUnlocked ? "is-unlocked" : "is-locked"]
        .filter(Boolean)
        .join(" ");

      const mainLabel = ach.short;
      const detail = isUnlocked ? ach.name : "";

      return `
        <div class="${classes}">
          <div class="medal-main">${mainLabel}</div>
          <div class="medal-detail">${detail}</div>
        </div>
      `;
    })
    .join("");

  const leftContent = `
    <div class="medal-grid">
      ${grid}
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
