import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articulos from "./pages/Articulos";
import Subida from "./pages/Subida";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Articulos />} />
        <Route path="/subida" element={<Subida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </Router>
  )
}

export default App
