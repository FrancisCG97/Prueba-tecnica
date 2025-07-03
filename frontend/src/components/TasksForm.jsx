import { useState, useEffect } from "react";

function FormularioTareas({ fechaInicial, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [estado, setEstado] = useState("");
  const [validacion, setValidacion] = useState([]);

  useEffect(() => {
    if (fechaInicial) {
      setFecha(fechaInicial.toISOString().split("T")[0]);
    }
  }, [fechaInicial]);

  const handleSubmit = () => {
    const erroresValidacion = [];

    if (!titulo.trim()) erroresValidacion.push("El título es obligatorio.");
    if (!prioridad) erroresValidacion.push("La prioridad es obligatoria.");
    if (!estado) erroresValidacion.push("El estado es obligatorio.");

    if (erroresValidacion.length > 0) {
      setValidacion(erroresValidacion);
      return;
    }
    const fechaConHora = new Date(fecha + "T00:00:00");

    const nuevaTarea = {
      title: titulo,
      start: fechaConHora,
      end: fechaConHora,
      prioridad,
      estado,
    };

    onGuardar(nuevaTarea);
    setTitulo("");
    setFecha("");
    setEstado("");
    setPrioridad("");
    setValidacion([]);
  };

  return (
    <>
      {validacion.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <ul className="mb-0">
            {validacion.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form mb-3">
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese una tarea"
          required
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          required
        >
          <option value="">Prioridad de la tarea</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="">Estado de la tarea</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </>
  );
}

export default FormularioTareas;
