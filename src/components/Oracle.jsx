import { useEffect, useMemo, useRef, useState } from "react";
import { Hexagram } from "./Hexagram.jsx";
import Hero from "./Hero.jsx";
import hexagrams from "../data/i-ching-basic.js";
import wilhelm from "../data/iching_wilhelm_translation.js";
import styles from "./Oracle.module.css";

// Índice de busca: binário visual (cima → baixo) → hexagrama.
const byBinary = new Map(
  hexagrams.map((h) => [String(h.binary).padStart(6, "0"), h]),
);

// Método das três moedas: cada moeda vale 2 ou 3; a soma decide a linha.
// 6 e 8 = yin, 7 e 9 = yang. (Sem linhas mutáveis, para manter simples.)
function throwCoin() {
  return Math.random() < 0.5
    ? { face: "cara", value: 3, glyph: "乾" }
    : { face: "coroa", value: 2, glyph: "坤" };
}

function buildLine() {
  const coins = [throwCoin(), throwCoin(), throwCoin()];
  const value = coins.reduce((sum, coin) => sum + coin.value, 0);
  return { coins, yang: value === 7 || value === 9 };
}

// As linhas saem de baixo para cima; o binário do dataset é de cima para baixo.
function lookupHexagram(lines) {
  const binary = lines
    .map((line) => (line.yang ? "1" : "0"))
    .reverse()
    .join("");
  return byBinary.get(binary) || null;
}

const TOTAL_LINES = 6;

export default function Oracle() {
  const [phase, setPhase] = useState("ask"); // "ask" | "casting" | "result"
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState([]);
  const [coins, setCoins] = useState(() => [
    throwCoin(),
    throwCoin(),
    throwCoin(),
  ]); // faces do último lançamento
  const [rolling, setRolling] = useState(false);

  const consultButtonRef = useRef(null);
  const modalRef = useRef(null);

  const trimmedQuestion = question.trim();
  const isComplete = lines.length === TOTAL_LINES;
  const result = useMemo(
    () => (isComplete ? lookupHexagram(lines) : null),
    [isComplete, lines],
  );

  // Foco vai para o modal ao abrir; volta para o botão de consulta ao fechar.
  useEffect(() => {
    if (phase === "casting") modalRef.current?.focus();
    else if (phase === "result") consultButtonRef.current?.focus();
  }, [phase]);

  // Esc fecha o modal de lançamento e volta para a pergunta.
  useEffect(() => {
    if (phase !== "casting") return undefined;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setLines([]);
      setPhase("ask");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const handleStart = (event) => {
    event.preventDefault();
    if (!trimmedQuestion) return;
    setLines([]);
    setPhase("casting");
  };

  const handleThrow = () => {
    if (rolling || isComplete) return;
    setRolling(true);
    const nextLine = buildLine();
    window.setTimeout(() => {
      setLines((current) => [...current, nextLine]);
      setCoins(nextLine.coins);
      setRolling(false);
    }, 600);
  };

  const handleClose = () => {
    setLines([]);
    setPhase("ask");
  };

  const handleReveal = () => setPhase("result");

  const handleNewConsultation = () => {
    setQuestion("");
    setLines([]);
    setPhase("ask");
  };

  return (
    <section className={styles.oracle}>
      <Hero />

      <div className={`container ${styles.consult}`}>
        {phase === "result" && result ? (
          <ResultCard
            question={question}
            result={result}
            onNew={handleNewConsultation}
            newButtonRef={consultButtonRef}
          />
        ) : (
          <form className={styles.ask} onSubmit={handleStart}>
            <label className={styles.label} htmlFor="question">
              Qual é a sua pergunta?
            </label>
            <textarea
              id="question"
              className={styles.input}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={3}
              maxLength={280}
              placeholder="Ex.: Como devo lidar com a mudança que estou enfrentando?"
            />
            <button
              type="submit"
              className={styles.primary}
              disabled={!trimmedQuestion}
              ref={consultButtonRef}
            >
              Lançar as moedas
            </button>
          </form>
        )}
      </div>

      {phase === "casting" && (
        <div className={styles.backdrop} onMouseDown={handleClose}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cast-title"
            tabIndex={-1}
            ref={modalRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Fechar e voltar à pergunta"
            >
              ✕
            </button>

            <h2 id="cast-title" className={styles.modalTitle}>
              Lance as moedas
            </h2>
            <p className={styles.modalHint}>
              Mantenha a pergunta em mente e lance as três moedas seis vezes.
            </p>

            <div className={styles.coins}>
              {coins.map((coin, index) => (
                <span
                  key={index}
                  className={`${styles.coin} ${
                    rolling ? styles.coinRolling : ""
                  } ${coin.face === "coroa" ? styles.coinTails : ""}`}
                >
                  <span className={styles.coinGlyph}>{coin.glyph}</span>
                </span>
              ))}
            </div>

            <p className={styles.progress} aria-live="polite">
              {isComplete
                ? "Hexagrama completo."
                : `${lines.length} de ${TOTAL_LINES} linhas`}
            </p>

            <div className={styles.castStage}>
              <Hexagram
                lines={lines.map((line) => (line.yang ? "yang" : "yin"))}
                width={120}
                label={`Hexagrama em formação: ${lines.length} de ${TOTAL_LINES} linhas`}
              />
            </div>

            {isComplete ? (
              <button
                type="button"
                className={styles.primary}
                onClick={handleReveal}
              >
                Ver resultado
              </button>
            ) : (
              <button
                type="button"
                className={styles.primary}
                onClick={handleThrow}
                disabled={rolling}
              >
                {rolling ? "Girando…" : "Lançar"}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function trigramLabel(trigram) {
  if (!trigram) return "";
  const symbolic = String(trigram.symbolic || "").replace(/,\s*$/, "");
  return [trigram.alchemical, symbolic].filter(Boolean).join(" · ");
}

function ResultCard({ question, result, onNew, newButtonRef }) {
  const detail = wilhelm[String(result.hex)] || null;

  return (
    <div className={styles.result} aria-live="polite">
      <p className={styles.questionRecap}>
        <span className={styles.questionLabel}>Sua pergunta</span>
        {question}
      </p>

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
          <h2 className={styles.resultName}>
            <span className={styles.resultGlyph}>{result.hex_font}</span>
            {result.english}
          </h2>
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
              <h3 className={styles.passageTitle}>The Judgment</h3>
              <p className={styles.passageText}>{detail.wilhelm_judgment.text}</p>
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
              <h3 className={styles.passageTitle}>The Image</h3>
              <p className={styles.passageText}>{detail.wilhelm_image.text}</p>
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
        className={styles.secondary}
        onClick={onNew}
        ref={newButtonRef}
      >
        Nova consulta
      </button>
    </div>
  );
}
