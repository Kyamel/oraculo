# Oráculo I Ching — Consulta Simbólica

Aplicação web acadêmica da disciplina de **Interação Humano-Computador (IHC)**: uma
experiência interativa, simples e acessível para simular uma consulta ao **I Ching**,
o *Livro das Mutações*.

O usuário lê uma breve apresentação, formula uma pergunta, **lança as três moedas seis
vezes** (num modal) e recebe a **leitura do hexagrama** correspondente, com o texto da
tradução clássica de Wilhelm-Baynes.

> O oráculo não prevê o futuro — ele oferece uma imagem simbólica para refletir sobre a
> sua questão.

---

## Stack

| Item | Escolha |
|---|---|
| UI | React `19` |
| Build / dev server | Vite `8` |
| Roteamento | `react-router-dom` `7` (**HashRouter**) |
| Linguagem | JavaScript + JSX (sem TypeScript) |
| Estilo | CSS puro — global em `index.css` + CSS Modules por componente |
| Lint | ESLint `10` |
| Backend / banco | **Nenhum** — 100% front-end, dados em arquivos locais |

Tema fixo (claro, estética papel/tinta) — sem alternância de tema.

---

## Como funciona (fluxo)

```text
/  (Oracle)
   Hero: apresentação + imagem histórica + cards de hexagramas em rotação
   Pergunta: campo de texto → "Lançar as moedas"
        ↓ (abre o modal)
   Modal: lança 3 moedas × 6, formando o hexagrama de baixo para cima
        ↓ "Ver resultado"
/leitura/:hex  (Reading)
   Hexagrama em SVG + nome (EN), chinês/pinyin, trigramas,
   descrição, "The Judgment" e "The Image" (comentários longos recolhíveis)
        ↓ "Voltar ao início e fazer nova consulta"
/
```

### Rotas

```text
/             Consulta (hero + pergunta + lançamento das moedas)
/leitura/:hex Leitura do hexagrama nº :hex (ex.: /#/leitura/11)
*             Redireciona para /
```

O número do hexagrama vive na URL: a página de leitura é **reconstruída pelo número**
(funciona em *refresh* e em link compartilhado). A pergunta é passada via `state` da
navegação — então, ao abrir um link direto, aparece só a leitura, sem o "Sua pergunta".

---

## Método das moedas

Cada lançamento usa três moedas (Cara = `3`, Coroa = `2`). A soma define a linha:

| Soma | Linha |
|---|---|
| `6` ou `8` | Yin (linha quebrada) |
| `7` ou `9` | Yang (linha inteira) |

As seis linhas são empilhadas **de baixo para cima**. Esta versão é simplificada: usa
apenas *yin/yang*, **sem linhas mutáveis** nem hexagrama transformado — o foco é a
clareza da interface.

### Hexagrama em SVG

O componente [`Hexagram`](src/components/Hexagram.jsx) desenha o hexagrama como SVG a
partir do **binário** do dataset (ordem visual de cima para baixo, `1` = yang, `0` = yin),
convertido internamente para as linhas (de baixo para cima). Pode receber `binary` (na
leitura) ou um array `lines` (durante o lançamento, em formação).

---

## Estrutura do projeto

```text
oraculo/
├── index.html              # <html lang="pt-BR">
├── vite.config.js          # base: './' (deploy em subpasta)
├── .github/workflows/      # deploy.yml → GitHub Pages
└── src/
    ├── main.jsx
    ├── App.jsx             # HashRouter + rotas; Footer global
    ├── index.css           # estilos globais + design tokens (tema claro)
    ├── components/
    │   ├── Hero.jsx        # apresentação + imagem + cards rotativos
    │   ├── Oracle.jsx      # pergunta + modal de lançamento das moedas
    │   ├── Hexagram.jsx    # desenho do hexagrama em SVG
    │   ├── Reading.jsx     # página de leitura (/leitura/:hex)
    │   └── Footer.jsx
    ├── data/
    │   ├── i-ching-basic.js               # 64 hexagramas: nº, glifo, chinês, pinyin, inglês, binário
    │   └── iching_wilhelm_translation.js  # tradução Wilhelm-Baynes (julgamento, imagem, etc.)
    └── assets/
        └── I_Ching_Song_Dynasty_print.jpg
```

---

## Acessibilidade e IHC

- **Visibilidade do estado:** progresso "N de 6 linhas" durante o lançamento.
- **Correspondência com o mundo real:** lançar moedas, formar linhas, formar hexagrama.
- **Controle do usuário:** fechar o modal (botão, clique fora ou `Esc`) e "nova consulta".
- **Prevenção de erros:** não permite consultar com pergunta vazia.
- **Modal acessível:** `role="dialog"`, `aria-modal`, foco movido ao abrir e `Esc` para fechar.
- **Foco e navegação:** *skip link* para o conteúdo; foco no título da leitura ao abri-la.
- **`prefers-reduced-motion`:** animações (moedas, transições) são suavizadas/desativadas.
- **Idioma por elemento:** os textos em inglês (tradução Wilhelm) recebem `lang="en"` e os
  chineses `lang="zh-Hant"` — assim o tradutor do navegador e leitores de tela tratam cada
  trecho no idioma certo, mantendo `<html lang="pt-BR">`.
- **Não depender só de cor**, contraste adequado e `alt`/`aria-label` nas imagens e botões.

---

## Como rodar

```bash
pnpm install      # instalar dependências
pnpm dev          # ambiente de desenvolvimento (hot reload)
pnpm build        # build de produção (saída em dist/)
pnpm preview      # pré-visualizar o build
pnpm lint         # checar o lint
```

O Vite sobe por padrão em `http://localhost:5173`.

---

## Deploy (GitHub Pages)

O bundle é 100% estático e está pronto para o GitHub Pages:

- `vite.config.js` usa `base: './'` (caminhos relativos) — funciona em qualquer
  subpasta, como `usuario.github.io/oraculo/`.
- O roteamento usa **HashRouter**: as rotas vivem no fragmento `#`, então não há 404 ao
  recarregar numa hospedagem estática sem fallback de servidor.
- `.github/workflows/deploy.yml` faz build e deploy automáticos a cada push na `main`.

Primeira vez no GitHub: **Settings → Pages → Source: GitHub Actions**, depois faça um push
na `main` (ou rode o workflow na aba **Actions**). O site fica em
`https://<seu-usuario>.github.io/<repositório>/`.

---

## Créditos dos dados

- **Textos dos hexagramas:** tradução Wilhelm-Baynes, via o dataset
  [adamblvck/iching-wilhelm-dataset](https://github.com/adamblvck/iching-wilhelm-dataset).
- **Imagem histórica:** página de rosto de uma edição do I Ching da dinastia Song
  (c. 1100), via Wikimedia Commons.
- **Código:** [github.com/Kyamel/oraculo](https://github.com/Kyamel/oraculo).
