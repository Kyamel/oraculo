import { useEffect, useState } from "react";
import Hexagram from "./Hexagram";
import { heroWisdom } from "../data/heroWisdom";
import heroImg from "../assets/I_Ching_Song_Dynasty_print.jpg";
import styles from "./Hero.module.css";

const ROTATION_MS = 5500;

/**
 * Hero da página: apresentação + imagem com legenda + um hexagrama que se
 * alterna (texto dinâmico). Sem chamada para ação — a consulta começa no
 * formulário logo abaixo.
 */
function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return undefined;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroWisdom.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = heroWisdom[index];

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark}>易經</span>
            <span aria-hidden="true" className={styles.eyebrowDot}>
              ·
            </span>
            <span className={styles.eyebrowText}>Livro das Mutações</span>
          </p>
          <h1 className={styles.title}>O oráculo que devolve perguntas</h1>
          <p className={styles.lead}>
            Uma experiência interativa de consulta ao I Ching, o oráculo chinês
            com mais de três mil anos. Aqui ele não prevê o futuro; ele oferece
            uma imagem simbólica para você refletir sobre a sua questão.
          </p>
        </div>

        <div className={styles.figureWrap}>
          <figure className={styles.figure}>
            <img
              className={styles.figureImg}
              src={heroImg}
              alt="Página de rosto de uma edição do I Ching impressa na dinastia Song, por volta de 1100."
              loading="lazy"
            />
            <figcaption className={styles.figureCaption}>
              Edição do I Ching, dinastia Song (c. 1100)
            </figcaption>
          </figure>

          <div className={styles.wisdom} aria-label="Hexagramas do I Ching">
            <div key={index} className={styles.wisdomBody}>
              <Hexagram
                binary={current.binary}
                width={62}
                label={`Hexagrama: ${current.name}`}
              />
              <div>
                <p className={styles.wisdomName}>
                  {current.name}
                  <span className={styles.wisdomChinese}>{current.chinese}</span>
                </p>
                <p className={styles.wisdomPhrase}>{current.phrase}</p>
              </div>
            </div>

            <div className={styles.wisdomFoot}>
              <button
                type="button"
                className={styles.pauseBtn}
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
              >
                {paused ? "▶ Retomar" : "❚❚ Pausar"}
              </button>
              <div className={styles.dots} role="tablist">
                {heroWisdom.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`${styles.dot} ${
                      i === index ? styles.dotActive : ""
                    }`}
                    aria-label={`Mostrar o hexagrama ${item.name}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
