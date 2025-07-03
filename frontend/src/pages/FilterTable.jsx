import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todos");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/tasks")
      .then((res) => setTareas(res.data))
      .catch((err) => console.error("Error al cargar tareas", err));
  }, []);

  return (
    <div id="tabla-filtro">
      <button
        id="boton-calendario"
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/calendario")}
      >
        Volver al calendario
      </button>
      <div id="select-filtro">
        <div id="primer-select">
          <select
            className="form-select"
            aria-label="Filtrar por prioridad"
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
          >
            <option value="todos">Filtrar por prioridad</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div id="segundo-select">
          <select
            id="filtroEstado"
            className="form-select"
            aria-label="Filtrar por estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Filtrar por Estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      <div id="lista-tareas">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Prioridad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tareas
              .filter((tarea) =>
                filtroEstado === "todos" ? true : tarea.status === filtroEstado
              )
              .filter((tarea) =>
                filtroPrioridad === "todos"
                  ? true
                  : tarea.priority === filtroPrioridad
              )
              .map((tarea) => (
                <tr key={tarea.id}>
                  <td>{tarea.title}</td>
                  <td>{tarea.due_date}</td>
                  <td>{tarea.priority}</td>
                  <td>{tarea.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaTareas;
