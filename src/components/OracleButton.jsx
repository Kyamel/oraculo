import { useState } from "react";
import styles from "./OracleButton.module.css";

/**
 * Botão de ação principal do oráculo.
 *
 * Props:
 *  - variant: "primary" (cheio) ou "ghost" (contornado).
 *  - size:    "md" ou "lg".
 *  - onClick: ação ao clicar (opcional).
 *  - notice:  se informado, ao clicar exibe esta mensagem logo abaixo do
 *             botão, num campo aria-live (feedback acessível). Usado
 *             enquanto a rota de consulta ainda não existe.
 */
function OracleButton({
  children,
  onClick,
  variant = "primary",
  size = "lg",
  type = "button",
  notice,
  ...rest
}) {
  const [noticeShown, setNoticeShown] = useState(false);

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (notice) setNoticeShown(true);
  };

  return (
    <div className={styles.wrap}>
      <button
        type={type}
        className={`${styles.button} ${styles[variant]} ${styles[size]}`}
        onClick={handleClick}
        {...rest}
      >
        <span className={styles.glyph} aria-hidden="true">☰</span>
        <span>{children}</span>
      </button>

      {notice && (
        <p className={styles.notice} role="status" aria-live="polite">
          {noticeShown ? notice : ""}
        </p>
      )}
    </div>
  );
}

export default OracleButton;
