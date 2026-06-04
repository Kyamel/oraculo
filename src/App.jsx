import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Oracle from "./components/Oracle";
import Response from "./components/Response";
import Footer from "./components/Footer";

/**
 * Rotas:
 *  - "/"         → consulta (hero + pergunta + lançamento das moedas)
 *  - "/response" → resultado da consulta (conteúdo Wilhelm)
 * O Footer fica fora das rotas, então aparece nas duas páginas.
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
        <Route path="/response" element={<Response />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
