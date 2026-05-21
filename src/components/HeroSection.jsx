import { useEffect, useState } from "react";
import OracleButton from "./OracleButton";
import Hexagram from "./Hexagram";
import { heroWisdom, consultNotice } from "../data/landingContent";
import heroImg from "../assets/iching/hero-song-print.jpg";
import styles from "./HeroSection.module.css";

const ROTATION_MS = 5500;

/**
 * Herói da landing page: apresentação + chamada para ação +
 * um hexagrama que se alterna (texto dinâmico).
 */
function HeroSection() {
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
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">易經 · Livro das Mutações</p>
          <h1 className={styles.title}>O oráculo que devolve perguntas</h1>
          <p className={styles.lead}>
            Uma experiência interativa de consulta ao I Ching, o oráculo
            chinês com mais de três mil anos. Aqui ele não prevê o futuro;
            ele oferece uma imagem simbólica para você refletir sobre a sua
            questão.
          </p>

          <div className={styles.actions}>
            <OracleButton notice={consultNotice}>
              Perguntar ao Oráculo
            </OracleButton>
            <a href="#sobre" className={styles.secondaryLink}>
              Entender antes de começar →
            </a>
          </div>
        </div>

        <div className={styles.figureWrap}>
          <figure className={styles.figure}>
            <img
              className={styles.figureImg}
              src={heroImg}
              alt="Página de rosto de uma edição do I Ching impressa na dinastia Song, por volta de 1100."
              width="1299"
              height="2148"
            />
            <figcaption className={styles.figureCaption}>
              Edição do I Ching, dinastia Song (c. 1100)
            </figcaption>
          </figure>

          <div className={styles.wisdom} aria-label="Hexagramas do I Ching">
            <div key={index} className={styles.wisdomBody}>
              <Hexagram
                lines={current.lines}
                width={62}
                label={`Hexagrama: ${current.name}`}
                surface="var(--paper-raised)"
              />
              <div>
                <p className={styles.wisdomName}>
                  {current.name}
                  <span className={styles.wisdomChinese}>
                    {current.chinese}
                  </span>
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
                    className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
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

export default HeroSection;
