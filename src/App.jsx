import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* As rotas /question, /oracle e /result serão adicionadas nas próximas etapas. */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
