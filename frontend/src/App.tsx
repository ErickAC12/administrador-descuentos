import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articulos from "./pages/Articulos";
import Subida from "./pages/Subida";
import Login from "./pages/Login";
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Articulos />} />
        <Route path="/subida" element={<Subida />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
