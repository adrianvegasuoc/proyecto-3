import { baseLayout } from "./baseLayout";

export function medalView() {
  const leftContent = `
    <div class="medal-grid">
      ${Array.from({ length: 12 })
        .map(
          (_, i) => `
        <div class="medal-slot">
          M_${i + 1}
        </div>
      `
        )
        .join("")}
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
