import "./App.css";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MiCalendario from "./pages/Calendar";
import ListaTareas from "./pages/FilterTable";

function App() {
  return (
    <div className="App">
      <h1>¡Bienvenido a tu gestor de tareas!</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/calendario" />} />
        <Route path="/calendario" element={<MiCalendario />} />
        <Route path="/filtrar" element={<ListaTareas />} />
      </Routes>
    </div>
  );
}

export default App;