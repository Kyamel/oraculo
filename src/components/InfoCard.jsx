import YinYang from "./YinYang";
import styles from "./InfoCard.module.css";

/**
 * Cartão de contexto histórico-cultural.
 * Mostra uma fotografia histórica ou, na ausência dela, um símbolo
 * desenhado (definido por `glyph`).
 */
function InfoCard({ title, text, image, imageAlt, glyph }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={imageAlt}
            loading="lazy"
          />
        ) : (
          <div className={styles.glyphBox}>
            {glyph === "yinyang" && <YinYang size={88} />}
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}

export default InfoCard;
