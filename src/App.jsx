import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Oracle from "./components/Oracle";
import Reading from "./components/Reading";
import Footer from "./components/Footer";

/**
 * Oráculo IChing - Lucas dos Anjos Camelo
 *
 * HashRouter mantém o roteamento no fragmento (#), funcionando em
 * hospedagem estática sem configuração de servidor.
 */
function App() {
  return (
    <HashRouter>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Routes>
        <Route path="/" element={<Oracle />} />
        <Route path="/leitura/:hex" element={<Reading />} />
        <Route path="/leitura/:hex/:changing" element={<Reading />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
