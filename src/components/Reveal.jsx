import { useEffect, useRef, useState } from "react";

/**
 * Revela o conteúdo com um leve fade ao entrar na viewport.
 * Respeita `prefers-reduced-motion` (a animação é neutralizada no CSS).
 *
 * Props:
 *  - as:    elemento a renderizar (padrão: "div").
 *  - delay: atraso da animação em ms (para revelar itens em sequência).
 */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  // Sem IntersectionObserver (ambientes muito antigos), revela de imediato.
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
