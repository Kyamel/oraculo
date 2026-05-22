# Oráculo I Ching — Aplicativo Web de Consulta Simbólica

Aplicativo web acadêmico desenvolvido para a disciplina de **Interação Humano-Computador (IHC)**, com foco em uma interface simples, visual, acessível e culturalmente contextualizada para simular uma consulta ao **I Ching**, também conhecido como **Livro das Mutações**.

O I Ching é um antigo texto chinês de divinação e reflexão filosófica, tradicionalmente associado aos clássicos chineses e organizado em torno de **64 hexagramas**. Cada hexagrama é formado por **seis linhas**, que podem ser *yin* ou *yang*, e algumas dessas linhas podem ser "mutáveis", gerando um segundo hexagrama de transformação.

---

## Objetivo do projeto

O objetivo principal **não** é criar uma versão completa e definitiva do oráculo, mas sim desenvolver uma **experiência interativa bem projetada**, demonstrando princípios de IHC como:

- clareza visual;
- consistência de navegação;
- feedback imediato;
- redução de carga cognitiva;
- acessibilidade;
- estética minimalista;
- controle do usuário;
- fluxo de interação compreensível.

A interface deve permitir que o usuário entenda o contexto cultural do I Ching, faça uma pergunta simbólica ao oráculo, acompanhe uma simulação visual do sorteio e receba um resultado interpretável.

As **heurísticas de Nielsen** são uma boa base para justificar decisões da interface, especialmente *visibilidade do estado do sistema*, *correspondência com o mundo real*, *controle do usuário*, *consistência*, *prevenção de erros*, *reconhecimento em vez de memorização* e *design estético/minimalista*.

---

## Stack tecnológica

O projeto já está inicializado. Stack atual:

| Item | Versão / escolha |
|---|---|
| Biblioteca de UI | React `19` |
| Build tool / dev server | Vite `8` |
| Roteamento | `react-router-dom` `7` |
| Linguagem | **JavaScript + JSX** (sem TypeScript) |
| Lint | ESLint `10` (`eslint.config.js`) |
| Estilo | CSS puro (`index.css`, `App.css`) — sem framework de CSS |
| Backend | **Nenhum** — aplicação 100% front-end |
| Banco de dados | **Nenhum** — dados em arquivos locais; sessão em `localStorage` |

> **Nota sobre linguagem:** este README descreve os tipos de dados em **JavaScript com JSDoc**. O projeto está em JavaScript puro. Se no futuro você quiser a segurança de tipos do TypeScript, os `@typedef` deste documento servem de base direta para a migração.

---

## Escopo do MVP

### Funcionalidades obrigatórias

**Landing page**
- Apresenta o projeto.
- Explica brevemente o que é o I Ching.
- Mostra o contexto histórico-cultural.
- Usa imagens, cards e textos curtos.
- Possui botão principal: **"Perguntar ao Oráculo"**.

**Página de pergunta**
- Usuário escreve uma pergunta aberta.
- A interface orienta o usuário a fazer uma pergunta reflexiva, **não** uma pergunta de "sim ou não".
- Exemplo: *"O que devo considerar sobre esta decisão?"* em vez de *"Vou passar na prova?"*.

**Página de simulação**
- Simula o método das três moedas.
- O usuário clica em um botão para lançar as moedas seis vezes.
- Cada lançamento gera uma linha do hexagrama.
- As linhas aparecem **de baixo para cima**, como na tradição dos hexagramas.

**Página de resultado**
- Mostra o hexagrama principal.
- Mostra o hexagrama transformado, caso existam linhas mutáveis.
- Exibe nome, imagem/símbolo e texto interpretativo.
- Reforça que o resultado **não é uma previsão absoluta**, mas um convite à reflexão.

---

## Fluxo principal do usuário

```text
Landing Page
    ↓
Perguntar ao Oráculo
    ↓
Usuário escreve uma pergunta
    ↓
Simulação das moedas
    ↓
Formação do hexagrama
    ↓
Resultado interpretativo
    ↓
Opções:
  - Refazer consulta
  - Voltar para início
  - Ler mais sobre o I Ching
```

---

## Estrutura de pastas sugerida

```text
oraculo/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/                     # assets estáticos servidos na raiz
└── src/
    ├── main.jsx
    ├── App.jsx                 # roteamento (BrowserRouter + Routes)
    ├── index.css               # estilos globais + design tokens (CSS vars)
    ├── routes/
    │   ├── Home.jsx            # landing page
    │   ├── Question.jsx        # página de pergunta
    │   ├── Oracle.jsx          # simulação das moedas
    │   ├── Result.jsx          # resultado
    │   ├── About.jsx           # contexto histórico-cultural (opcional)
    │   └── NotFound.jsx        # rota 404
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── OracleButton.jsx
    │   ├── InfoCard.jsx
    │   ├── StepCard.jsx
    │   ├── QuestionInput.jsx
    │   ├── CoinToss.jsx
    │   ├── HexagramView.jsx
    │   ├── ChangingLineBadge.jsx
    │   ├── ResultCard.jsx
    │   └── ReflectionBox.jsx
    ├── data/
    │   ├── hexagrams.js        # os 64 hexagramas
    │   └── trigrams.js         # os 8 trigramas
    ├── lib/
    │   └── iching.js           # lógica do sorteio, mapeamento e transformação
    └── assets/                 # imagens e ilustrações importadas pelo código
```

---

## Estrutura de páginas

### 1. Landing Page

**Objetivo:** introduzir o usuário ao tema e convidá-lo para a experiência.

#### Seções sugeridas

**Hero**

Conteúdo:
- título grande;
- subtítulo curto;
- imagem ou ilustração inspirada em papel, tinta, moedas, bambu, céu, água ou trigrama;
- botão principal.

Exemplo de texto:

> Consulte o I Ching, o Livro das Mutações, em uma experiência interativa criada para reflexão, simbolismo e contemplação.

Botão: **Perguntar ao Oráculo**

**O que é o I Ching?**

> O I Ching é um antigo sistema chinês de símbolos formado por 64 hexagramas. Cada hexagrama representa uma situação, transformação ou padrão de mudança. Em vez de oferecer respostas diretas, o oráculo propõe imagens simbólicas que ajudam o usuário a refletir sobre uma questão.

**Como funciona a consulta?**

Explicação visual em três passos:

```text
1. Pense em uma pergunta.
2. Lance as moedas para formar seis linhas.
3. Interprete o hexagrama como reflexão simbólica.
```

**Contexto cultural**

Cards com imagens e textos curtos:
- Livro das Mutações;
- Yin e Yang;
- Trigramas;
- Hexagramas;
- Mudança e transformação;
- Interpretação simbólica.

#### Princípio de IHC aplicado

A landing page deve evitar textos longos demais. O ideal é usar **cards curtos, imagens e botões claros**. O usuário deve entender rapidamente:
- O que é?
- Para que serve?
- Como eu começo?

---

### 2. Página de Pergunta

**Objetivo:** permitir que o usuário formule uma pergunta antes da consulta.

#### Elementos
- campo de texto;
- exemplos de boas perguntas;
- botão "Continuar";
- botão "Voltar";
- aviso interpretativo.

Exemplo de interface:

```text
Qual questão você deseja levar ao oráculo?

[ Campo de texto ]

Exemplos:
- O que devo considerar antes de tomar esta decisão?
- Que aspecto desta situação eu não estou percebendo?
- Como posso lidar melhor com este momento?

[Continuar]
```

#### Validações
- Não permitir pergunta vazia.
- Limite sugerido: **200 caracteres**.
- Mostrar feedback claro caso o usuário tente continuar sem escrever:

> Digite uma pergunta antes de continuar.

#### IHC aplicado
- **Prevenção de erro:** impede envio vazio.
- **Ajuda e documentação:** mostra exemplos de perguntas.
- **Controle do usuário:** permite voltar.

---

### 3. Página de Simulação

**Objetivo:** transformar a consulta em uma experiência visual e compreensível.

#### Método recomendado para o MVP

Usar o **método das três moedas**, porque é mais simples de explicar e implementar do que o método tradicional das varetas de milefólio. Os métodos tradicionais do I Ching incluem o uso de varetas ou moedas; a versão com moedas é adequada para uma simulação interativa por ser mais direta.

#### Regra das moedas

Cada lançamento usa três moedas. Podemos representar:

- Cara = `3`
- Coroa = `2`

A soma das três moedas define a linha:

| Soma | Linha | Símbolo | Comportamento |
|---|---|---|---|
| `6` | Yin mutável | `--   --` | muda para yang |
| `7` | Yang estável | `-------` | permanece yang |
| `8` | Yin estável | `--   --` | permanece yin |
| `9` | Yang mutável | `-------` | muda para yin |

#### Formação do hexagrama

O usuário realiza **seis lançamentos**. As linhas devem ser empilhadas **de baixo para cima**:

```text
Lançamento 1 → linha inferior
Lançamento 2 → segunda linha
Lançamento 3 → terceira linha
Lançamento 4 → quarta linha
Lançamento 5 → quinta linha
Lançamento 6 → linha superior
```

#### Feedback visual

A cada lançamento:
- animar moedas girando;
- mostrar resultado das três moedas;
- adicionar uma linha ao hexagrama;
- exibir progresso: "Linha 3 de 6".

Exemplo:

```text
Linha 3 de 6 formada
Resultado: Yang estável
```

#### IHC aplicado
- **Visibilidade do estado do sistema:** usuário sabe em qual etapa está.
- **Correspondência com o mundo real:** moedas simulam um ritual físico.
- **Reconhecimento em vez de memorização:** a interface mostra o significado de cada linha.
- **Estética minimalista:** foco no ritual, sem poluição visual.

---

### 4. Página de Resultado

**Objetivo:** mostrar o resultado da consulta de forma simbólica, bonita e interpretável.

#### Elementos
- pergunta feita pelo usuário;
- hexagrama principal;
- nome do hexagrama;
- imagem ou ilustração associada;
- resumo interpretativo;
- linhas mutáveis, se houver;
- hexagrama transformado, se houver;
- botões finais.

#### Exemplo de estrutura

```text
Sua pergunta:
"Como devo lidar com esta mudança?"

Hexagrama ䷂ — Dificuldade Inicial

Imagem simbólica:
Trovão sob a água.

Interpretação:
Este hexagrama sugere um momento de começo instável. Há energia para
iniciar algo novo, mas ainda existe confusão, incerteza ou obstáculos
iniciais. O conselho é avançar com cuidado, buscar apoio e organizar
melhor a situação antes de agir impulsivamente.

Linhas mutáveis:
Linha 2 e Linha 5.

Hexagrama transformado:
䷜ — O Abismal

Reflexão final:
O resultado não deve ser lido como uma previsão fechada, mas como um
espelho simbólico para interpretar sua situação.
```

#### Botões
- Consultar novamente
- Voltar ao início
- Ler sobre os hexagramas

---

## Dados necessários

Para o MVP, **não é necessário banco de dados**. Os dados ficam em arquivos locais:

```text
src/data/hexagrams.js
src/data/trigrams.js
```

### Estrutura sugerida de dados (JavaScript + JSDoc)

```js
/**
 * @typedef {6|7|8|9} LineValue
 *
 * @typedef {Object} HexagramLine
 * @property {LineValue} value
 * @property {'yin'|'yang'} type
 * @property {boolean} changing
 *
 * @typedef {Object} Hexagram
 * @property {number}   id            - número do hexagrama (1 a 64)
 * @property {string}   symbol        - caractere Unicode (ex.: "䷀")
 * @property {string}   namePt        - nome em português
 * @property {string}   [nameEn]      - nome em inglês (opcional)
 * @property {string}   [chineseName] - nome em chinês (opcional)
 * @property {string[]} keywords      - palavras-chave para o fallback genérico
 * @property {string}   imageTheme    - tema visual associado
 * @property {string}   shortText     - resumo curto
 * @property {string}   reflection    - texto reflexivo mais longo
 */
```

Exemplo de conteúdo (`src/data/hexagrams.js`):

```js
export const hexagrams = [
  {
    id: 1,
    symbol: "䷀",
    namePt: "O Criativo",
    nameEn: "The Creative",
    chineseName: "乾",
    keywords: ["força", "início", "ação", "criatividade"],
    imageTheme: "céu, luz, movimento ascendente",
    shortText: "Energia criativa, impulso inicial e força ativa.",
    reflection:
      "Este resultado sugere um momento de iniciativa. A situação " +
      "favorece ação, mas exige clareza, responsabilidade e direção.",
  },
];
```

---

## Algoritmo da consulta

### Passo 1 — Lançar três moedas

```js
// Retorna 2 (coroa) ou 3 (cara)
function tossCoin() {
  return Math.random() < 0.5 ? 2 : 3;
}

// Soma de três moedas: resultado entre 6 e 9
function tossThreeCoins() {
  return tossCoin() + tossCoin() + tossCoin();
}
```

### Passo 2 — Converter valor em linha

```js
/**
 * @param {6|7|8|9} value
 * @returns {{ value:number, type:'yin'|'yang', changing:boolean }}
 */
function lineFromValue(value) {
  if (value === 6) return { value, type: "yin",  changing: true  };
  if (value === 7) return { value, type: "yang", changing: false };
  if (value === 8) return { value, type: "yin",  changing: false };
  return                  { value, type: "yang", changing: true  }; // 9
}
```

### Passo 3 — Formar o hexagrama

```js
const lines = [line1, line2, line3, line4, line5, line6];
```

> **Atenção:** `line1` é a **linha inferior**. A ordem do array é de baixo para cima.

### Passo 4 — Gerar o hexagrama transformado

Linhas mutáveis mudam; linhas estáveis permanecem:

```text
yin mutável  → yang
yang mutável → yin
```

---

## Como mapear linhas para hexagramas

Cada hexagrama pode ser representado por **seis bits**:

```text
yin  = 0
yang = 1
```

Exemplo: `[yang, yang, yang, yang, yang, yang]` → `111111` → hexagrama 1, "O Criativo".

> **Atenção:** como as linhas são contadas **de baixo para cima**, o array deve respeitar essa ordem ao montar a chave binária.

```js
/**
 * @param {{type:'yin'|'yang'}} line
 * @returns {0|1}
 */
function lineToBinary(line) {
  return line.type === "yang" ? 1 : 0;
}
```

> **Importante:** não existe fórmula matemática direta entre os 6 bits e o número do hexagrama na sequência tradicional (King Wen). O mapeamento precisa ser uma **tabela de consulta** — por exemplo, um objeto `{ "111111": 1, "000000": 2, ... }`, ou um campo `binary` em cada hexagrama.

Para o MVP existem duas abordagens:

**Opção simples** — criar manualmente um mapa com alguns hexagramas principais.
- ✅ mais rápido; suficiente para apresentação; permite terminar uma página bem polida.
- ❌ não cobre todos os 64 resultados.

**Opção completa** — criar uma tabela com os 64 hexagramas.
- ✅ sistema completo; qualquer consulta gera resultado válido.
- ❌ exige mais tempo para preencher textos e revisar conteúdo.

**Recomendação:** implementar a lógica para os 64 (a tabela binária completa), mas preencher **interpretação detalhada** só para alguns inicialmente. Para os demais, usar um **texto genérico baseado nas palavras-chave**.

---

## Estratégia de conteúdo

Evitar copiar textos completos de traduções modernas do I Ching, porque muitas traduções são **protegidas por direitos autorais**.

O ideal é escrever **interpretações próprias**, inspiradas nos temas tradicionais. Cada resultado pode ter:
- Nome
- Símbolo Unicode
- Palavras-chave
- Imagem simbólica
- Resumo
- Reflexão
- Pergunta para o usuário pensar

Exemplo:

```text
Hexagrama: O Poço

Palavras-chave:
fonte, cuidado, comunidade, recurso interior

Resumo:
Este hexagrama aponta para algo essencial que sustenta a vida, mas que
precisa ser cuidado.

Reflexão:
Talvez a questão não seja criar algo totalmente novo, mas recuperar uma
fonte de valor que já existe. O resultado convida você a observar quais
recursos, relações ou conhecimentos estão disponíveis, mas negligenciados.

Pergunta reflexiva:
Que fonte de apoio você tem ignorado?
```

---

## Ideias visuais

### Estilo recomendado

Para um projeto de IHC, a estética sugerida é:

> **minimalista + contemplativa + culturalmente inspirada**

Evitar a interface "mística genérica" cheia de roxo, brilho e clichês. Melhor algo mais elegante:
- fundo claro ou escuro suave;
- textura de papel;
- linhas finas;
- tons de jade, areia, carvão, vermelho queimado ou dourado discreto;
- imagens de tinta, céu, água, montanhas, bambu, moedas;
- animações lentas e suaves.

### Componentes visuais

```text
HeroSection
InfoCard
StepCard
OracleButton
QuestionInput
CoinToss
HexagramView
ChangingLineBadge
ResultCard
ReflectionBox
```

---

## Princípios de IHC aplicados no projeto

**1. Visibilidade do estado do sistema** — durante a consulta, mostrar "Linha 1 de 6", "Linha 2 de 6", … "Consulta concluída". O usuário nunca deve ficar sem saber o que está acontecendo.

**2. Correspondência com o mundo real** — usar linguagem próxima do ritual real (*lançar moedas*, *formar linha*, *formar hexagrama*, *interpretar resultado*) em vez de termos técnicos (*gerar valor aleatório*, *executar algoritmo*).

**3. Controle e liberdade do usuário** — permitir voltar, refazer pergunta, reiniciar consulta, pular animação e consultar novamente.

**4. Consistência** — botões principais sempre com o mesmo estilo. Botão primário = ação de avanço; botão secundário = voltar/cancelar.

**5. Prevenção de erros** — impedir pergunta vazia, clique repetido durante a animação e avanço sem completar as seis linhas.

**6. Reconhecimento em vez de memorização** — mostrar explicações curtas na tela: *linha quebrada = Yin*, *linha inteira = Yang*, *linha mutável = pode se transformar*.

**7. Design estético e minimalista** — evitar excesso de texto em uma única tela; dividir em seções curtas, com cards, ícones e progressão.

**8. Ajuda e documentação** — adicionar uma seção "Como interpretar meu resultado?":

> O I Ching não entrega uma resposta fechada. Ele apresenta uma imagem simbólica para ajudar você a pensar sobre sua situação.

---

## Acessibilidade

O projeto deve considerar:
- contraste adequado;
- navegação por teclado;
- `label` em todos os inputs;
- textos alternativos (`alt`) em imagens;
- botões grandes;
- fonte legível;
- **não depender apenas de cor** para comunicar informação;
- animações suaves e não obrigatórias;
- respeitar `prefers-reduced-motion` para reduzir/desativar animações.

Exemplo:

```jsx
<button aria-label="Lançar moedas para formar a próxima linha">
  Lançar moedas
</button>
```

---

## Rotas sugeridas

```text
/            Landing page
/question    Página de pergunta
/oracle      Simulação das moedas
/result      Resultado
/about       Contexto histórico-cultural (opcional)
*            Rota 404 (não encontrada)
```

Para um MVP ainda mais simples: `/`, `/oracle`, `/result`.

---

## Estado da aplicação

Não precisa de banco. O estado pode ser mantido em memória (via *state* do React / `location.state` do router) ou persistido em `localStorage`.

```js
/**
 * @typedef {Object} OracleSession
 * @property {string}         question
 * @property {HexagramLine[]} lines
 * @property {number}         primaryHexagramId
 * @property {number}         [transformedHexagramId]
 * @property {string}         createdAt
 */
```

Vantagens de usar `localStorage`:
- permite recarregar a página sem perder o resultado;
- evita backend;
- é suficiente para projeto acadêmico.

> Dica: se o estado for passado apenas via `location.state` do `react-router`, um *refresh* na página de resultado perde os dados. Persistir a última sessão em `localStorage` resolve isso e é uma boa decisão de IHC (recuperação de erro).

---

## Possíveis melhorias futuras

**1. Histórico de consultas** — salvar no `localStorage` pergunta, data, hexagrama e resumo. Não precisa de login.

**2. Modo guiado** — antes da pergunta, sugerir categorias (Relacionamentos, Estudos, Trabalho, Decisão pessoal, Momento de vida). Melhora a experiência sem precisar de IA.

**3. Interpretação assistida** — depois do resultado, mostrar perguntas reflexivas:
- O que neste resultado parece se conectar com sua situação?
- Que parte da resposta te incomodou?
- Que ação pequena você poderia tomar agora?

Essa feature é muito boa para IHC, porque aumenta a interação **sem precisar de NLP**.

**4. Imagens associadas ao resultado** — cada hexagrama pode ter um tema visual (Céu, Terra, Água, Fogo, Montanha, Lago, Trovão, Vento) usado como *background* do resultado.

**5. IA / NLP** — **não recomendado para o MVP**. Futuramente poderia resumir a pergunta do usuário, sugerir uma reflexão personalizada ou comparar a pergunta com os temas do hexagrama. Para a disciplina, porém, isso desvia o foco — **a interface é mais importante**.

---

## Critérios de avaliação para IHC

O projeto pode ser avaliado com base em:
- Clareza do fluxo
- Consistência visual
- Facilidade de uso
- Feedback ao usuário
- Acessibilidade
- Qualidade estética
- Redução de carga cognitiva
- Adequação cultural
- Capacidade de recuperação de erro
- Compreensão do resultado

---

## Perguntas para teste com usuários

Durante uma avaliação simples, perguntar:
- Você entendeu o que o aplicativo faz?
- Você soube como começar?
- Você entendeu o progresso da consulta?
- Você entendeu o resultado?
- Algum texto ficou confuso?
- Algum botão ficou ambíguo?
- Você conseguiria refazer a consulta sozinho?

---

## Prioridade de implementação

**Etapa 1 — Base visual** *(página a ser entregue finalizada primeiro)*
- Criar layout global e tema visual (design tokens em CSS).
- Criar a landing page completa.
- Criar componentes de card e botão.
- Corrigir os problemas listados em *Estado atual do código*.

**Etapa 2 — Fluxo principal**
- Criar página de pergunta.
- Criar navegação entre páginas.
- Salvar pergunta temporariamente.

**Etapa 3 — Simulação**
- Implementar lançamento das moedas.
- Gerar seis linhas.
- Mostrar o hexagrama progressivamente.

**Etapa 4 — Resultado**
- Mapear resultado para hexagrama.
- Mostrar interpretação.
- Mostrar hexagrama transformado se houver linha mutável.

**Etapa 5 — Refinamento de IHC**
- Melhorar acessibilidade.
- Ajustar responsividade.
- Melhorar feedback visual.
- Testar com usuários.

---

## Recomendação de MVP final

Para entregar algo bonito e viável:

```text
Landing page completa
+ Página de pergunta
+ Simulação das moedas
+ Resultado com hexagrama principal
+ Resultado transformado se houver linhas mutáveis
+ 8 a 16 hexagramas com textos bem escritos
+ Fallback genérico (baseado em palavras-chave) para os demais
```

Isso já parece um produto real, mostra domínio de IHC e evita travar tentando preencher os 64 hexagramas perfeitamente.

O diferencial do projeto **não precisa ser "ter o I Ching inteiro"**. O diferencial pode ser:

> uma experiência simbólica, acessível, calma e bem guiada para consulta reflexiva ao I Ching.

Na prática, isso é exatamente o tipo de projeto que combina bem com IHC.

---

## Como rodar o projeto

```bash
# instalar as dependências
npm install

# ambiente de desenvolvimento (com hot reload)
npm run dev

# build de produção
npm run build

# pré-visualizar o build de produção
npm run preview

# checar o lint
npm run lint
```

O servidor de desenvolvimento do Vite sobe por padrão em `http://localhost:5173`.

---

## Deploy no GitHub Pages

O projeto gera um bundle 100% estático e está pronto para o GitHub Pages.

**Configuração já feita:**

- `vite.config.js` usa `base: './'` (caminhos relativos) — o bundle funciona
  em qualquer subcaminho, como `usuario.github.io/oraculo/`.
- O roteamento usa **`HashRouter`** (`src/App.jsx`): as rotas vivem no
  fragmento `#` da URL, então não há erro 404 ao recarregar uma página numa
  hospedagem estática sem fallback de servidor.
- O workflow `.github/workflows/deploy.yml` faz build e deploy
  automaticamente a cada push na branch `main`.

**Passo único a fazer no GitHub** (apenas na primeira vez):

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça um push na `main` (ou rode o workflow manualmente na aba **Actions**).

Ao terminar, o site fica disponível em
`https://<seu-usuario>.github.io/<nome-do-repositório>/`.

Para gerar o bundle localmente sem publicar: `npm run build` (saída na
pasta `dist/`).
