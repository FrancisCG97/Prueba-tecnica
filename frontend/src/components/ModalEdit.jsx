import { useEffect, useState } from "react";
import axios from "axios";

export function EditarTarea({ tarea, onActualizar, onCancelar }) {
  const [tareaEditando, setTareaEditando] = useState(tarea);

  useEffect(() => {
    setTareaEditando(tarea);
  }, [tarea]);

  if (!tareaEditando) return null;

  const editarTarea = () => {
    const tareaActualizada = {
      title: tareaEditando.title,
      due_date: tareaEditando.due_date,
      priority: tareaEditando.priority.toLowerCase(),
      status: tareaEditando.status.toLowerCase(),
    };

    axios
      .put(`http://localhost:8000/tasks/${tareaEditando.id}`, tareaActualizada)
      .then(() => {
        if (onActualizar) onActualizar();
        if (onCancelar) onCancelar();
      })
      .catch((err) => {
        console.error("Error al editar tarea", err.response?.data || err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editarTarea();
  };

  return (
    <div id="modal-editar" className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog ">
        <div className="modal-content p-3">
          <h5>Editar Tarea</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Título:</label>
              <input
                className="form-control"
                type="text"
                value={tareaEditando.title}
                onChange={(e) =>
                  setTareaEditando({ ...tareaEditando, title: e.target.value })
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
              onClick={onCancelar}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
