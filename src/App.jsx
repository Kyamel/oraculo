import Oracle from "./components/Oracle";
import Footer from "./components/Footer";

/**
 * App de página única: sem rotas. Um texto de apresentação, a consulta
 * ao oráculo (pergunta → moedas → resultado) e um rodapé enxuto.
 */
function App() {
  return (
    <>
      <a className="skip-link" href="#oraculo">
        Pular para a consulta
      </a>
      <main id="oraculo">
        <Oracle />
      </main>
      <Footer />
    </>
  );
}

export default App;
