import { useEffect, useMemo, useState } from "react";
import { navLinks } from "../data/landingContent";
import { scrollToSection } from "../lib/navigation";
import styles from "./Header.module.css";

const THEME_STORAGE_KEY = "oraculo-theme-mode";

const THEME_OPTIONS = {
  auto: { label: "Automático" },
  light: { label: "Claro" },
  dark: { label: "Escuro" },
};

const THEME_ORDER = ["auto", "light", "dark"];

function isValidMode(value) {
  return THEME_ORDER.includes(value);
}

function nextThemeMode(mode) {
  const index = THEME_ORDER.indexOf(mode);
  return THEME_ORDER[(index + 1) % THEME_ORDER.length];
}

function ThemeIcon({ mode }) {
  if (mode === "light") {
    return (
      <svg
        className={styles.themeSvg}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <circle className={styles.themeSvgStroke} cx="12" cy="12" r="4" />
        <path
          className={styles.themeSvgStroke}
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
    );
  }

  if (mode === "dark") {
    return (
      <svg
        className={styles.themeSvg}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className={styles.themeSvgStroke}
          d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"
        />
      </svg>
    );
  }

  return <span className={styles.themeAuto}>A</span>;
}

/**
 * Cabeçalho fixo da landing page: marca + navegação por seções.
 *
 * Os links rolam a página via JavaScript (sem alterar o hash da URL,
 * que pertence ao HashRouter).
 */
function Header() {
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      return isValidMode(stored) ? stored : "auto";
    } catch {
      return "auto";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignora falhas de persistência (ex.: modo privado restrito).
    }
  }, [themeMode]);

  useEffect(() => {
    if (themeMode !== "auto") return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncAutoTheme = () => {
      document.documentElement.dataset.theme = "auto";
    };

    syncAutoTheme();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncAutoTheme);
      return () => media.removeEventListener("change", syncAutoTheme);
    }

    media.addListener(syncAutoTheme);
    return () => media.removeListener(syncAutoTheme);
  }, [themeMode]);

  const nextMode = useMemo(() => nextThemeMode(themeMode), [themeMode]);
  const themeButtonLabel = `Tema atual: ${THEME_OPTIONS[themeMode].label}. Clique para trocar para ${THEME_OPTIONS[nextMode].label}.`;

  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href.replace(/^%/, ""));
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a
          href="%inicio"
          className={styles.brand}
          onClick={(event) => handleNavClick(event, "%inicio")}
        >
          <span className={styles.seal} aria-hidden="true">易</span>
          <span className={styles.brandText}>
            Oráculo <strong>I Ching</strong>
          </span>
        </a>

        <div className={styles.rightSide}>
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

          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setThemeMode(nextMode)}
            aria-label={themeButtonLabel}
            title={themeButtonLabel}
          >
            <span aria-hidden="true" className={styles.themeIcon}>
              <ThemeIcon mode={themeMode} />
            </span>
            <span className="sr-only">{themeButtonLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
