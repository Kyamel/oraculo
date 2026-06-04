/**
 * Desenha um hexagrama (ou parte dele) como SVG.
 *
 * Props:
 *  - lines:   array de linhas, de baixo para cima. Cada linha pode ser
 *             a string "yin" / "yang", ou { type: "yin"|"yang", changing: bool }.
 *  - width:   largura em px (a altura é calculada).
 *  - label:   rótulo acessível (aria-label).
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

export function Hexagram({ lines, binary, width = 96, label }) {
  const source = binary != null ? binaryToLines(binary) : lines;
  const rows = source.map(normalizeLine);
  const count = rows.length;
  const lineH = 13;
  const gap = 9;
  const height = count > 0 ? count * lineH + (count - 1) * gap : 0;
  const yinGap = width * 0.24;
  const segW = (width - yinGap) / 2;

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
        // Linha mutável: pinta de vermelho em vez de marcar com X/círculo.
        const fill = ln.changing ? "var(--cinnabar)" : "var(--ink)";
        return (
          <g key={i}>
            {ln.type === "yang" ? (
              <rect x="0" y={y} width={width} height={lineH} rx="2" fill={fill} />
            ) : (
              <>
                <rect x="0" y={y} width={segW} height={lineH} rx="2" fill={fill} />
                <rect x={width - segW} y={y} width={segW} height={lineH} rx="2" fill={fill} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default Hexagram;
