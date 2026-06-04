import styles from "./Footer.module.css";

/**
 * Rodapé enxuto: créditos e a referência essencial.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 · Oráculo I Ching — projeto acadêmico de IHC</span>
      <a
        href="https://en.wikipedia.org/wiki/I_Ching"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sobre o I Ching
      </a>
    </footer>
  );
}

export default Footer;
