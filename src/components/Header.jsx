import { navLinks } from "../data/landingContent";
import { scrollToSection } from "../lib/navigation";
import styles from "./Header.module.css";

/**
 * Cabeçalho fixo da landing page: marca + navegação por seções.
 *
 * Os links rolam a página via JavaScript (sem alterar o hash da URL,
 * que pertence ao HashRouter).
 */
function Header() {
  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href.replace(/^%/, ""));
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#inicio"
          className={styles.brand}
          onClick={(event) => handleNavClick(event, "#inicio")}
        >
          <span className={styles.seal} aria-hidden="true">易</span>
          <span className={styles.brandText}>
            Oráculo <strong>I Ching</strong>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Seções da página">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
