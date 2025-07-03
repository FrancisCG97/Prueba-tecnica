import { useEffect, useState } from "react";
import { EditarTarea } from "./ModalEdit";
import axios from "axios";

function VisualizarDatos({ fechaSeleccionada, onActualizar, editarTarea }) {
  const [datosTareas, setDatosTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  const guardarTareasEditadas = () => {
    axios
      .get("http://localhost:8000/tasks")
      .then((res) => {
        setDatosTareas(res.data);
      })
      .catch((err) => {
        console.log("Ocurrió un error al obtener los datos ", err);
      });
  };

  useEffect(() => {
    guardarTareasEditadas();
  }, []);

  const eliminarTarea = (id) => {
    axios
      .delete(`http://localhost:8000/tasks/${id}`)
      .then(() => {
        setDatosTareas((prev) => prev.filter((tarea) => tarea.id !== id));
        if (onActualizar) onActualizar();
      })
      .catch((err) => {
        console.error("Error al eliminar tarea", err);
      });
  };

  return (
    <>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">Tarea</th>
            <th scope="col">Fecha</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosTareas
            .filter((item) => {
              if (!fechaSeleccionada) return false;
              const fechaTarea = new Date(item.due_date);
              return (
                fechaTarea.toISOString().split("T")[0] ===
                fechaSeleccionada.toISOString().split("T")[0]
              );
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.due_date}</td>
                <td>{item.priority}</td>
                <td>{item.status}</td>
                <td id="botones-acciones">
                  <button
                    className="btn"
                    onClick={() => setTareaEditando(item)}
                  >
                    <img src="../../editar.png" alt="imagen-editar"/>
                  </button>
                  <button
                    className="btn"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    <img src="../../eliminar.png" alt="imagen-eliminar" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <EditarTarea
        tarea={tareaEditando}
        onActualizar={guardarTareasEditadas}
        onCancelar={() => setTareaEditando(null)}
      />
    </>
  );
}

export default VisualizarDatos;
