import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articulos from "./pages/Articulos";
import Subida from "./pages/Subida";
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Articulos />} />
        <Route path="/subida" element={<Subida />} />
      </Routes>
    </Router>
  )
}

export default App
