import { useEffect, useRef } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Hexagram } from "./Hexagram.jsx";
import hexagrams from "../data/i-ching-basic.js";
import wilhelm from "../data/iching_wilhelm_translation.js";
import styles from "./Reading.module.css";

// Índices para reconstruir o resultado pela URL.
const byHex = new Map(hexagrams.map((h) => [h.hex, h]));
const byBinary = new Map(
  hexagrams.map((h) => [String(h.binary).padStart(6, "0"), h]),
);

// Binário (cima→baixo) → linhas de baixo para cima ("yang"/"yin").
function binaryToBottomUp(binary) {
  return String(binary)
    .padStart(6, "0")
    .split("")
    .reverse()
    .map((bit) => (bit === "1" ? "yang" : "yin"));
}

function trigramLabel(trigram) {
  if (!trigram) return "";
  const symbolic = String(trigram.symbolic || "").replace(/,\s*$/, "");
  return [trigram.alchemical, symbolic].filter(Boolean).join(" · ");
}

/**
 * Página /leitura/:hex/:changing: mostra o hexagrama e o conteúdo da tradução
 * Wilhelm-Baynes. Tudo é reconstruído pela URL — número do hexagrama mais as
 * posições das linhas mutáveis (ex.: /leitura/3/14) —, então as marcas de
 * mutação e o hexagrama transformado funcionam em refresh/link direto. Só a
 * pergunta, quando houver, chega pelo state. Número inválido volta para a
 * consulta.
 */
export default function Reading() {
  const navigate = useNavigate();
  const { hex, changing } = useParams();
  const { state } = useLocation();
  const headingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, [hex, changing]);

  const result = byHex.get(Number(hex)) || null;
  if (!result) return <Navigate to="/" replace />;

  const question = state?.question;
  const detail = wilhelm[String(result.hex)] || null;

  // Posições mutáveis (1 a 6, de baixo para cima) vindas da URL, ex.: "14".
  const changingSet = new Set(
    String(changing || "")
      .split("")
      .map(Number)
      .filter((n) => n >= 1 && n <= 6),
  );

  // Linhas desenháveis (de baixo para cima) com a marca de mutação.
  const drawnLines = binaryToBottomUp(result.binary).map((type, i) => ({
    type,
    changing: changingSet.has(i + 1),
  }));

  // Hexagrama transformado: inverte só as linhas mutáveis.
  let changed = null;
  if (changingSet.size) {
    const changedBinary = drawnLines
      .map((line) => {
        const type = line.changing
          ? line.type === "yang"
            ? "yin"
            : "yang"
          : line.type;
        return type === "yang" ? "1" : "0";
      })
      .reverse()
      .join("");
    changed = byBinary.get(changedBinary) || null;
  }

  return (
    <main id="conteudo" className={styles.oracle}>
      <div className={`container ${styles.consult}`}>
        <div className={styles.result}>
          {question && (
            <p className={styles.questionRecap}>
              <span className={styles.questionLabel}>Sua pergunta</span>
              {question}
            </p>
          )}

          <div className={styles.resultBody}>
            <div className={styles.hexStage}>
              <Hexagram
                lines={drawnLines}
                width={96}
                label={`Hexagrama ${result.hex}: ${result.english}`}
              />
            </div>

            <div className={styles.resultText}>
              <p className={styles.resultKicker} lang="en">
                Hexagram {result.hex}
              </p>
              <h1 className={styles.resultName} ref={headingRef} tabIndex={-1}>
                <span className={styles.resultGlyph}>{result.hex_font}</span>
                <span lang="en">{result.english}</span>
              </h1>
              <p className={styles.resultChinese} lang="zh-Hant">
                {result.trad_chinese} · {result.pinyin}
              </p>
              {detail && (
                <p className={styles.trigrams} lang="en">
                  <span>Above — {trigramLabel(detail.wilhelm_above)}</span>
                  <span>Below — {trigramLabel(detail.wilhelm_below)}</span>
                </p>
              )}
            </div>
          </div>

          {detail && (
            <div className={styles.detail} lang="en">
              {detail.wilhelm_symbolic && (
                <p className={styles.symbolic}>{detail.wilhelm_symbolic}</p>
              )}

              {detail.wilhelm_judgment?.text && (
                <section className={styles.passage}>
                  <h2 className={styles.passageTitle}>The Judgment</h2>
                  <p className={styles.passageText}>
                    {detail.wilhelm_judgment.text}
                  </p>
                  {detail.wilhelm_judgment.comments && (
                    <details className={styles.comments}>
                      <summary>Commentary</summary>
                      <p>{detail.wilhelm_judgment.comments}</p>
                    </details>
                  )}
                </section>
              )}

              {detail.wilhelm_image?.text && (
                <section className={styles.passage}>
                  <h2 className={styles.passageTitle}>The Image</h2>
                  <p className={styles.passageText}>
                    {detail.wilhelm_image.text}
                  </p>
                  {detail.wilhelm_image.comments && (
                    <details className={styles.comments}>
                      <summary>Commentary</summary>
                      <p>{detail.wilhelm_image.comments}</p>
                    </details>
                  )}
                </section>
              )}
            </div>
          )}

          {changed && <hr className={styles.divider} />}

          {changed && (
            <Link className={styles.changed} to={`/leitura/${changed.hex}`}>
              <Hexagram
                binary={changed.binary}
                width={96}
                label={`Hexagrama transformado ${changed.hex}: ${changed.english}`}
              />
              <span className={styles.changedText}>
                <span className={styles.changedLabel}>
                  As linhas mutáveis levam à
                </span>
                <strong className={styles.changedName}>
                  {changed.hex}. <span lang="en">{changed.english}</span>
                  <span className={styles.changedChinese} lang="zh-Hant">
                    {changed.trad_chinese}
                  </span>
                </strong>
              </span>
              <span className={styles.changedArrow} aria-hidden="true">
                →
              </span>
            </Link>
          )}

          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/")}
          >
            <span aria-hidden="true">←</span>
            Voltar ao início e fazer nova consulta
          </button>
        </div>
      </div>
    </main>
  );
}
