import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BotonDia from "../components/DayButton";
import { useState, useEffect, useRef } from "react";
import FormularioTareas from "../components/TasksForm";
import VisualizarDatos from "../components/DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const locales = {
  es: es,
};

const mensajesES = {
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDay: "Todo el día",
  week: "Semana",
  day: "Día",
  month: "Mes",
  previous: "Anterior",
  next: "Siguiente",
  yesterday: "Ayer",
  tomorrow: "Mañana",
  today: "Hoy",
  agenda: "Agenda",
  showMore: (total) => `+ Ver más (${total})`,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

function MiCalendario() {
  const [tarea, setTarea] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const navigate = useNavigate();

  const cargarTareas = () => {
    axios
      .get("http://localhost:8000/tasks")
      .then((res) => {
        const tareasFormateadas = res.data.map((t) => ({
          ...t,
          start: parseISO(t.due_date),
          end: parseISO(t.due_date),
        }));
        console.log(tareasFormateadas);
        setTarea(tareasFormateadas);
      })
      .catch((err) => console.error("Error al cargar tareas:", err));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleClickBoton = (date) => {
    console.log("Clic en celda:", date);
    setFechaSeleccionada(date);
    setModalAbierto(true);
  };

  const guardarTarea = (tareaNueva) => {
    const nuevaTarea = {
      title: tareaNueva.title,
      due_date: tareaNueva.start.toISOString().split("T")[0],
      priority: tareaNueva.prioridad,
      status: tareaNueva.estado,
    };

    setModalAbierto(false);

    axios
      .post("http://localhost:8000/tasks", nuevaTarea)
      .then(() => {
        cargarTareas();
      })
      .catch((err) => {
        console.error("Error al guardar tarea", err);
      });
  };

  return (
    <>
      <div id="calendario">
        <button
          id="boton-filtrar"
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/filtrar")}
        >
          Filtrar tareas
        </button>
        <Calendar
          localizer={localizer}
          events={tarea}
          style={{ height: 500, width: 1000, backgroundColor: "lavender" }}
          views={["month", "week", "day"]}
          defaultView="month"
          messages={mensajesES}
          culture="es"
          components={{
            month: {
              dateHeader: (props) => (
                <BotonDia {...props} onClick={handleClickBoton} />
              ),
            },
          }}
        />
      </div>

      {modalAbierto && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Tarea</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalAbierto(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Fecha: {fechaSeleccionada?.toLocaleDateString()}</p>
                <FormularioTareas
                  fechaInicial={fechaSeleccionada}
                  onGuardar={guardarTarea}
                  onCancelar={() => setModalAbierto(false)}
                />
                <VisualizarDatos
                  fechaSeleccionada={fechaSeleccionada}
                  onActualizar={cargarTareas}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MiCalendario;
