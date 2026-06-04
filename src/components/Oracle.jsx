import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hexagram } from "./Hexagram.jsx";
import Hero from "./Hero.jsx";
import hexagrams from "../data/i-ching-basic.js";
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
  const navigate = useNavigate();
  const [phase, setPhase] = useState("ask"); // "ask" | "casting"
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState([]);
  const [coins, setCoins] = useState(() => [
    throwCoin(),
    throwCoin(),
    throwCoin(),
  ]); // faces do último lançamento
  const [rolling, setRolling] = useState(false);

  const modalRef = useRef(null);

  const trimmedQuestion = question.trim();
  const isComplete = lines.length === TOTAL_LINES;
  const result = useMemo(
    () => (isComplete ? lookupHexagram(lines) : null),
    [isComplete, lines],
  );

  // Foco vai para o modal ao abrir.
  useEffect(() => {
    if (phase === "casting") modalRef.current?.focus();
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

  const handleReveal = () => {
    if (!result) return;
    navigate("/response", { state: { question: trimmedQuestion, result } });
  };

  return (
    <main id="conteudo" className={styles.oracle}>
      <Hero />

      <div className={`container ${styles.consult}`}>
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
          >
            Lançar as moedas
          </button>
        </form>
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
    </main>
  );
}
