import { useEffect, useState } from "react";
import Hexagram from "./Hexagram";
import wilhelm from "../data/iching_wilhelm_translation.js";
import heroImg from "../assets/I_Ching_Song_Dynasty_print.jpg";
import styles from "./Hero.module.css";

const ROTATION_MS = 5500;

// Hexagramas em destaque na rotação do hero.
const FEATURED = [1, 2, 11, 24, 52, 61];

// Mostra só um trecho do texto no preview (a leitura completa vive em /leitura).
function preview(text, max = 80) {
  const clean = String(text || "").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trimEnd()}…`;
}

// Dados reais da tradução Wilhelm-Baynes para os cards do hero.
const heroWisdom = FEATURED.map((n) => {
  const h = wilhelm[String(n)];
  return {
    hex: n,
    name: h.english,
    chinese: h.trad_chinese,
    binary: h.binary,
    phrase: preview(h.wilhelm_judgment?.text || h.wilhelm_image?.text),
  };
});

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
                width={64}
                label={`Hexagrama: ${current.name}`}
              />
              <div>
                <p className={styles.wisdomName}>
                  <span lang="en">{current.name}</span>
                  <span className={styles.wisdomChinese} lang="zh-Hant">
                    {current.chinese}
                  </span>
                </p>
                <p className={styles.wisdomPhrase} lang="en">
                  {current.phrase}
                </p>
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
                    key={item.hex}
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
