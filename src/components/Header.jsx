import { navLinks } from "../data/landingContent";
import styles from "./Header.module.css";

/**
 * Cabeçalho fixo da landing page: marca + navegação por âncoras.
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
          <span className={styles.seal} aria-hidden="true">易</span>
          <span className={styles.brandText}>
            Oráculo <strong>I Ching</strong>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Seções da página">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
