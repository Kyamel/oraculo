import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"

function App() {
  return (
    // HashRouter: o roteamento vive no fragmento (#) da URL, então
    // funciona em hospedagem estática (GitHub Pages) sem fallback de servidor.
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* As rotas /question, /oracle e /result serão adicionadas nas próximas etapas. */}
        {/* Endereço desconhecido volta para a home — evita tela em branco. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
