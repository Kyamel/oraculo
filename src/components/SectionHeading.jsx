/**
 * Cabeçalho padronizado de seção (sobrelinha + título + texto de apoio).
 * Mantém consistência visual entre todas as seções da landing page.
 */
function SectionHeading({ eyebrow, title, lead, center = false, titleId }) {
  return (
    <div className={`section-head ${center ? "section-head--center" : ""}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title" id={titleId}>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

export default SectionHeading;
