import styles from "./Footer.module.css";

/**
 * Rodapé da landing page: identidade do projeto, créditos e referências.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.about}>
          <p className={styles.brand}>
            <span className={styles.seal} aria-hidden="true">易</span>
            Oráculo I Ching
          </p>
          <p className={styles.desc}>
            Projeto acadêmico desenvolvido para a disciplina de Interação
            Humano-Computador (IHC), com foco em interface, usabilidade e
            contexto cultural. O I Ching é um texto de reflexão simbólica.
            Esta aplicação não faz previsões.
          </p>
        </div>

        <nav className={styles.links} aria-label="Referências">
          <span className={styles.linksTitle}>Saiba mais</span>
          <a
            href="https://pt.wikipedia.org/wiki/I_Ching"
            target="_blank"
            rel="noopener noreferrer"
          >
            I Ching na Wikipédia
          </a>
          <a
            href="https://en.wikipedia.org/wiki/I_Ching_divination"
            target="_blank"
            rel="noopener noreferrer"
          >
            O método de consulta (em inglês)
          </a>
        </nav>
      </div>

      <div className={`container ${styles.baseline}`}>
        <span>© 2026 · Projeto acadêmico de IHC</span>
        <span>Imagens históricas: Wikimedia Commons (domínio público)</span>
      </div>
    </footer>
  );
}

export default Footer;
