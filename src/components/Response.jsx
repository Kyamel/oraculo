import { useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Hexagram } from "./Hexagram.jsx";
import wilhelm from "../data/iching_wilhelm_translation.js";
import styles from "./Oracle.module.css";

function trigramLabel(trigram) {
  if (!trigram) return "";
  const symbolic = String(trigram.symbolic || "").replace(/,\s*$/, "");
  return [trigram.alchemical, symbolic].filter(Boolean).join(" · ");
}

/**
 * Página /response: mostra o hexagrama sorteado e o conteúdo da tradução
 * Wilhelm-Baynes. Os dados chegam pelo state da navegação; sem eles
 * (acesso direto/refresh), volta para a consulta.
 */
export default function Response() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const headingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  if (!state?.result) return <Navigate to="/" replace />;

  const { question, result } = state;
  const detail = wilhelm[String(result.hex)] || null;

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
                binary={result.binary}
                width={132}
                label={`Hexagrama ${result.hex}: ${result.english}`}
              />
            </div>

            <div className={styles.resultText}>
              <p className={styles.resultKicker}>Hexagram {result.hex}</p>
              <h1
                className={styles.resultName}
                ref={headingRef}
                tabIndex={-1}
              >
                <span className={styles.resultGlyph}>{result.hex_font}</span>
                {result.english}
              </h1>
              <p className={styles.resultChinese}>
                {result.trad_chinese} · {result.pinyin}
              </p>
              {detail && (
                <p className={styles.trigrams}>
                  <span>Above — {trigramLabel(detail.wilhelm_above)}</span>
                  <span>Below — {trigramLabel(detail.wilhelm_below)}</span>
                </p>
              )}
            </div>
          </div>

          {detail && (
            <div className={styles.detail}>
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
