import { useEffect, useState } from "react";
import axios from "axios";

function VisualizarDatos({ fechaSeleccionada, onActualizar }) {
  const [datosTareas, setDatosTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/tasks")
      .then((res) => {
        setDatosTareas(res.data);
      })
      .catch((err) => {
        console.log("Ocurrió un error al obtener los datos ", err);
      });
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

  const editarTarea = (tarea) => {
    const tareaActualizada = {
      title: tarea.title,
      due_date: tarea.due_date,
      priority: tarea.priority,
      status: tarea.status,
    };

    axios
      .put(`http://localhost:8000/tasks/${tarea.id}`, tareaActualizada)
      .then((res) => {
        setDatosTareas((prev) =>
          prev.map((t) => (t.id === tarea.id ? res.data : t))
        );
        if (onActualizar) onActualizar();
      })
      .catch((err) => {
        console.error("Error al editar tarea", err.response?.data || err);
      });
  };

  return (
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
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setTareaEditando(item)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarTarea(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        {tareaEditando && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Editar Tarea</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editarTarea(tareaEditando);
                    setTareaEditando(null);
                  }}
                >
                  <div className="mb-2">
                    <label>Título:</label>
                    <input
                    className="form-control"
                      type="text"
                      value={tareaEditando.title}
                      onChange={(e) =>
                        setTareaEditando({
                          ...tareaEditando,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label>Prioridad:</label>
                    <select
                    className="form-select"
                      value={tareaEditando.priority}
                      onChange={(e) =>
                        setTareaEditando({
                          ...tareaEditando,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label>Estado:</label>
                    <select
                    className="form-select"
                      value={tareaEditando.status}
                      onChange={(e) =>
                        setTareaEditando({
                          ...tareaEditando,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="completada">Completada</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setTareaEditando(null)}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </tbody>
    </table>
  );
}

export default VisualizarDatos;
