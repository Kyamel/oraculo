import styles from "./StepCard.module.css";

/**
 * Cartão de um dos passos da consulta ao oráculo.
 */
function StepCard({ number, title, text }) {
  return (
    <article className={styles.card}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  );
}

export default StepCard;
