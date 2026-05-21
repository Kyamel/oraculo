/**
 * Símbolo de yin e yang (taijitu) desenhado em SVG, nas cores do tema.
 */
function YinYang({ size = 72, title = "Símbolo de yin e yang" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      style={{ display: "block" }}
    >
      <circle
        cx="50"
        cy="50"
        r="48.5"
        fill="var(--paper-raised)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      {/* Metade escura, formada pela curva em S */}
      <path
        d="M50 1.5 A48.5 48.5 0 0 1 50 98.5 A24.25 24.25 0 0 1 50 50 A24.25 24.25 0 0 0 50 1.5 Z"
        fill="var(--ink)"
      />
      {/* "Olhos": cada metade carrega uma semente da outra */}
      <circle cx="50" cy="25.75" r="8" fill="var(--ink)" />
      <circle cx="50" cy="74.25" r="8" fill="var(--paper-raised)" />
    </svg>
  );
}

export default YinYang;
