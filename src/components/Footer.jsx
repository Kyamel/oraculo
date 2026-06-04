import styles from "./Footer.module.css";

/**
 * Rodapé enxuto: créditos e a referência essencial.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 · Oráculo I Ching - projeto acadêmico de IHC</span>
      <a
        href="https://en.wikipedia.org/wiki/I_Ching"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sobre o I Ching
      </a>
      <a
        href="https://github.com/adamblvck/iching-wilhelm-dataset/blob/master/data/iching_wilhelm_translation.js"
        target="_blank"
        rel="noopener noreferrer"
      >
        Traduções (Wilhelm dataset)
      </a>
      <a
        href="https://github.com/Kyamel/oraculo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Código no GitHub
      </a>
    </footer>
  );
}

export default Footer;
