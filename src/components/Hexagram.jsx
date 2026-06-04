/**
 * Desenha um hexagrama (ou parte dele) como SVG.
 *
 * Props:
 *  - lines:   array de linhas, de baixo para cima. Cada linha pode ser
 *             a string "yin" / "yang", ou { type: "yin"|"yang", changing: bool }.
 *  - width:   largura em px (a altura é calculada).
 *  - label:   rótulo acessível (aria-label).
 *  - surface: cor de fundo sob o hexagrama (usada para o "vazado" das
 *             linhas mutáveis). Padrão: papel elevado.
 */
function normalizeLine(line) {
  if (typeof line === "string") return { type: line, changing: false };
  return { type: line.type, changing: Boolean(line.changing) };
}

/**
 * Converte o `binary` do dataset (string/número, ordem visual de cima para
 * baixo, 1 = yang / 0 = yin) no array de linhas que o <Hexagram> espera
 * (de baixo para cima).
 */
function binaryToLines(binary) {
  return String(binary)
    .padStart(6, "0")
    .split("")
    .reverse()
    .map((bit) => (bit === "1" ? "yang" : "yin"));
}

export function Hexagram({
  lines,
  binary,
  width = 96,
  label,
  surface = "var(--paper-raised)",
}) {
  const source = binary != null ? binaryToLines(binary) : lines;
  const rows = source.map(normalizeLine);
  const count = rows.length;
  const lineH = 13;
  const gap = 9;
  const height = count * lineH + (count - 1) * gap;
  const yinGap = width * 0.24;
  const segW = (width - yinGap) / 2;
  const cx = width / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label || `Hexagrama de ${count} linhas`}
      style={{ display: "block" }}
    >
      {rows.map((ln, i) => {
        const rowFromTop = count - 1 - i;
        const y = rowFromTop * (lineH + gap);
        const midY = y + lineH / 2;
        return (
          <g key={i}>
            {ln.type === "yang" ? (
              <rect x="0" y={y} width={width} height={lineH} rx="2" fill="var(--ink)" />
            ) : (
              <>
                <rect x="0" y={y} width={segW} height={lineH} rx="2" fill="var(--ink)" />
                <rect x={width - segW} y={y} width={segW} height={lineH} rx="2" fill="var(--ink)" />
              </>
            )}

            {/* Marca de linha mutável */}
            {ln.changing && ln.type === "yang" && (
              <circle
                cx={cx}
                cy={midY}
                r={lineH * 0.42}
                fill={surface}
                stroke="var(--cinnabar)"
                strokeWidth="2"
              />
            )}
            {ln.changing && ln.type === "yin" && (
              <g stroke="var(--cinnabar)" strokeWidth="2.4" strokeLinecap="round">
                <line x1={cx - 4} y1={midY - 4} x2={cx + 4} y2={midY + 4} />
                <line x1={cx - 4} y1={midY + 4} x2={cx + 4} y2={midY - 4} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default Hexagram;
