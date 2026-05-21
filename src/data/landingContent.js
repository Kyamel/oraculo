/* ============================================================
   Conteúdo da landing page do Oráculo I Ching.
   Manter o texto separado dos componentes torna a página
   "orientada a dados": para mudar a página, muda-se este arquivo.
   ============================================================ */

import oracleBone from "../assets/iching/oracle-bone-plastron.jpg";
import stele from "../assets/iching/stone-classic-stele.jpg";
import trigramsWoodblock from "../assets/iching/trigrams-woodblock.jpg";
import yarrowStalks from "../assets/iching/yarrow-stalks.jpg";
import leibnizDiagram from "../assets/iching/leibniz-diagram.jpg";

/* --- Navegação por âncoras dentro da própria landing page --- */
export const navLinks = [
  { href: "#sobre", label: "O que é" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#historia", label: "História" },
  { href: "#interpretar", label: "Interpretar" },
];

/* --- Hexagramas que se alternam no herói (texto dinâmico).
   `lines` vai de baixo para cima: lines[0] é a linha inferior.
   As frases são releituras próprias das "imagens" tradicionais. --- */
export const heroWisdom = [
  {
    name: "O Criativo",
    chinese: "乾",
    lines: ["yang", "yang", "yang", "yang", "yang", "yang"],
    phrase: "O movimento do céu é vigoroso; assim age quem persevera.",
  },
  {
    name: "O Receptivo",
    chinese: "坤",
    lines: ["yin", "yin", "yin", "yin", "yin", "yin"],
    phrase: "A amplitude da terra acolhe e sustenta todas as coisas.",
  },
  {
    name: "A Paz",
    chinese: "泰",
    lines: ["yang", "yang", "yang", "yin", "yin", "yin"],
    phrase: "Céu e terra se encontram: o pequeno parte, o grande chega.",
  },
  {
    name: "O Abismal",
    chinese: "坎",
    lines: ["yin", "yang", "yin", "yin", "yang", "yin"],
    phrase: "A água flui sem parar e não teme o lugar profundo.",
  },
  {
    name: "O Retorno",
    chinese: "復",
    lines: ["yang", "yin", "yin", "yin", "yin", "yin"],
    phrase: "Depois do ponto mais escuro, o movimento recomeça.",
  },
];

/* --- Os três passos da consulta --- */
export const steps = [
  {
    number: "01",
    title: "Formule uma pergunta",
    text: "Pense numa questão aberta e reflexiva, algo como “o que devo considerar nesta decisão?”, e não uma pergunta de sim ou não.",
  },
  {
    number: "02",
    title: "Lance as moedas seis vezes",
    text: "Cada lançamento de três moedas desenha uma linha do hexagrama, de baixo para cima, até completar as seis.",
  },
  {
    number: "03",
    title: "Interprete o hexagrama",
    text: "O oráculo devolve uma imagem simbólica. Não é uma previsão fechada: é um espelho para você pensar sobre a sua situação.",
  },
];

/* --- As quatro linhas possíveis (resultado de cada lançamento) --- */
export const lineTypes = [
  {
    value: 7,
    name: "Yang estável",
    line: { type: "yang", changing: false },
    note: "Linha inteira. Permanece como está.",
  },
  {
    value: 8,
    name: "Yin estável",
    line: { type: "yin", changing: false },
    note: "Linha partida. Permanece como está.",
  },
  {
    value: 9,
    name: "Yang mutável",
    line: { type: "yang", changing: true },
    note: "Linha inteira em mutação: transforma-se em yin.",
  },
  {
    value: 6,
    name: "Yin mutável",
    line: { type: "yin", changing: true },
    note: "Linha partida em mutação: transforma-se em yang.",
  },
];

/* --- Cartões de contexto histórico-cultural ---
   `glyph` é usado quando não há fotografia: o componente desenha
   o símbolo correspondente. --- */
export const culturalCards = [
  {
    title: "Origens ancestrais",
    text: "Muito antes do I Ching, a China antiga interpretava rachaduras em ossos e cascos de tartaruga para consultar o oráculo.",
    image: oracleBone,
    imageAlt: "Casco de tartaruga da dinastia Shang com inscrições oraculares.",
  },
  {
    title: "O Livro das Mutações",
    text: "O núcleo do texto vem do período Zhou Ocidental (séc. X–IV a.C.) e chegou a ser gravado em pedra entre os clássicos.",
    image: stele,
    imageAlt: "Estela de pedra com o texto do Yijing, entre os Clássicos em Pedra de Tang.",
  },
  {
    title: "Yin e Yang",
    text: "Cada linha é yin ou yang. A alternância constante entre os dois princípios é a própria ideia de “mutação”.",
    image: null,
    glyph: "yinyang",
  },
  {
    title: "Os oito trigramas",
    text: "A tradição atribui a Fuxi a descoberta dos oito trigramas. Combinados dois a dois, eles formam os 64 hexagramas.",
    image: trigramsWoodblock,
    imageAlt: "Página xilogravada antiga representando os oito trigramas.",
  },
  {
    title: "As varetas de milefólio",
    text: "O método mais antigo de consulta usa 50 varetas de milefólio. As três moedas vieram depois, como um caminho mais simples.",
    image: yarrowStalks,
    imageAlt: "Cinquenta varetas de milefólio usadas na consulta tradicional do I Ching.",
  },
  {
    title: "A travessia para o Ocidente",
    text: "No século XVIII, o diagrama dos hexagramas fascinou pensadores europeus como Leibniz, que nele enxergou um sistema binário.",
    image: leibnizDiagram,
    imageAlt: "Diagrama dos hexagramas do I Ching que pertenceu a Gottfried Wilhelm Leibniz, 1701.",
  },
];

/* --- Aviso exibido ao clicar em "Perguntar ao Oráculo".
   A consulta interativa é a próxima etapa do projeto. --- */
export const consultNotice =
  "A consulta interativa será habilitada na próxima etapa do projeto.";
