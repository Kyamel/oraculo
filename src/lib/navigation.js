/**
 * Rola suavemente a página até a seção com o id informado.
 *
 * Os links internos da landing page usam esta função em vez de âncoras
 * #id na URL: como o roteamento é feito por HashRouter, o # da URL é
 * reservado para as rotas e não pode ser usado como âncora de página.
 *
 * @param {string}  id            id do elemento de destino.
 * @param {object}  [options]
 * @param {boolean} [options.focus]  move também o foco do teclado para o
 *                                   destino (usado no "pular para o conteúdo").
 */
export function scrollToSection(id, { focus = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  if (focus) el.focus({ preventScroll: true });

  const reduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}
