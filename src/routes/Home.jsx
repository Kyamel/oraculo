import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import StepCard from "../components/StepCard";
import InfoCard from "../components/InfoCard";
import Hexagram from "../components/Hexagram";
import OracleButton from "../components/OracleButton";
import Reveal from "../components/Reveal";
import { scrollToSection } from "../lib/navigation";
import { steps, lineTypes, culturalCards, consultNotice } from "../data/landingContent";
import styles from "./Home.module.css";

/**
 * Landing page do Oráculo I Ching.
 * Apresenta o oráculo, explica como a consulta funciona e dá o
 * contexto histórico-cultural.
 */
function Home() {
  return (
    <>
      <a
        className="skip-link"
        href="#conteudo"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("conteudo", { focus: true });
        }}
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" tabIndex={-1}>
        <HeroSection />

        {/* ---------- O que é o I Ching ---------- */}
        <section id="sobre" className="section section--deep">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow="O que é"
                title="O I Ching, o Livro das Mutações"
                lead="Um oráculo que, em vez de prever, oferece uma imagem para pensar."
              />
            </Reveal>

            <div className={styles.about}>
              <Reveal className={styles.aboutText}>
                <p>
                  O I Ching — em chinês <em>Yì Jīng</em>, o “Livro das
                  Mutações” — é um dos textos mais antigos da China, com um
                  núcleo escrito há mais de três mil anos. Por milênios ele foi
                  consultado como oráculo e estudado como obra de filosofia, na
                  base das tradições confucionista e taoista.
                </p>
                <p>
                  Sua estrutura é simples. Tudo parte de dois tipos de linha: a
                  linha <strong>yang</strong>, inteira, e a linha{" "}
                  <strong>yin</strong>, partida. Três linhas formam um trigrama;
                  seis formam um hexagrama. Como cada linha tem dois estados,
                  existem exatamente <strong>64 hexagramas</strong>; e cada um
                  descreve uma situação ou um padrão de mudança.
                </p>
                <p>
                  Consultar o oráculo é sortear um desses 64 hexagramas. A
                  resposta nunca é um “sim” ou um “não”: é uma imagem simbólica
                  e aberta, que cabe a você relacionar à sua própria questão.
                </p>
              </Reveal>

              <Reveal className={styles.anatomy} delay={120}>
                <p className={styles.anatomyTitle}>Anatomia de um hexagrama</p>
                <div className={styles.anatomyRow}>
                  <Hexagram
                    lines={["yang", "yang", "yang", "yin", "yin", "yin"]}
                    width={108}
                    label="Exemplo de hexagrama formado por dois trigramas"
                  />
                  <div className={styles.anatomyLabels}>
                    <div className={styles.anatomyLabel}>
                      <strong>Trigrama superior</strong>
                      <small>linhas 4 a 6</small>
                    </div>
                    <div className={styles.anatomyLabel}>
                      <strong>Trigrama inferior</strong>
                      <small>linhas 1 a 3</small>
                    </div>
                  </div>
                </div>
                <p className={styles.anatomyNote}>
                  As seis linhas são formadas e lidas de baixo para cima.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- Como funciona a consulta ---------- */}
        <section id="como-funciona" className="section">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow="Como funciona"
                title="Três passos para consultar"
                lead="A consulta clássica usa varetas de milefólio. Nesta aplicação usamos o método das três moedas; mais direto e fácil de acompanhar."
              />
            </Reveal>

            <div className={styles.steps}>
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 90}>
                  <StepCard
                    number={step.number}
                    title={step.title}
                    text={step.text}
                  />
                </Reveal>
              ))}
            </div>

            <div className={styles.linesBlock}>
              <Reveal>
                <h3 className={styles.linesTitle}>As quatro linhas possíveis</h3>
                <p className={styles.linesLead}>
                  Cada lançamento de três moedas soma 6, 7, 8 ou 9; e esse
                  número define uma das quatro linhas. As linhas “mutáveis”
                  (marcadas em vermelho) transformam-se e geram um segundo
                  hexagrama.
                </p>
              </Reveal>

              <div className={styles.lineGrid}>
                {lineTypes.map((lt, i) => (
                  <Reveal key={lt.value} className={styles.lineItem} delay={i * 80}>
                    <div className={styles.lineGlyph}>
                      <Hexagram
                        lines={[lt.line]}
                        width={92}
                        label={lt.name}
                        surface="var(--paper-raised)"
                      />
                    </div>
                    <p className={styles.lineValue}>Soma {lt.value}</p>
                    <p className={styles.lineName}>{lt.name}</p>
                    <p className={styles.lineNote}>{lt.note}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Contexto histórico-cultural ---------- */}
        <section id="historia" className="section section--deep">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow="História"
                title="Um oráculo de três mil anos"
                lead="Da adivinhação com ossos na China antiga até as mesas de estudo da Europa iluminista."
              />
            </Reveal>

            <div className={styles.cardGrid}>
              {culturalCards.map((card, i) => (
                <Reveal key={card.title} delay={(i % 3) * 90}>
                  <InfoCard
                    title={card.title}
                    text={card.text}
                    image={card.image}
                    imageAlt={card.imageAlt}
                    glyph={card.glyph}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Como interpretar o resultado ---------- */}
        <section id="interpretar" className="section">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow="Interpretar"
                title="Como ler o resultado"
                lead="O oráculo não decide por você — ele amplia o seu olhar."
                center
              />
            </Reveal>

            <div className={styles.interpret}>
              <Reveal>
                <p className={styles.interpretText}>
                  O I Ching não entrega uma resposta fechada nem uma previsão.
                  Ele devolve uma imagem simbólica, um espelho para você
                  observar a sua situação de outro ângulo. Não há resultado
                  “bom” ou “ruim”: há o convite a refletir. Diante do hexagrama,
                  vale perguntar a si mesmo:
                </p>
              </Reveal>

              <Reveal as="ul" className={styles.questions} delay={100}>
                <li>O que neste hexagrama parece conversar com a minha situação?</li>
                <li>Que parte da resposta me incomodou e por quê?</li>
                <li>Que pequeno passo eu poderia dar a partir daqui?</li>
              </Reveal>

              <Reveal className={styles.finalCta} delay={160}>
                <p className={styles.finalCtaText}>
                  Pronto para experimentar? Pense numa questão aberta e
                  consulte o oráculo.
                </p>
                <OracleButton notice={consultNotice}>
                  Perguntar ao Oráculo
                </OracleButton>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
