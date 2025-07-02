import "./App.css";
import MiCalendario from "./Calendar";
import VisualizarDatos from "./DataTable";
import FormularioTareas from "./TasksForm";

function App() {
  return (
    <div className="App">
      <h1> ¡Bienvenido a tu gestor de tareas! </h1>
      <div id="inputs">
        <FormularioTareas />
      </div>
      <div id="tabla">
        <VisualizarDatos />
      </div>
      <div id="calendario">
        <MiCalendario />
      </div>
    </div>
  );
}

export default App;
