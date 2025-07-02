import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BotonDia from "./DayButton";
import { useState } from "react";

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
  const [nuevaTarea, setNuevaTarea] = useState("");

  const handleClickBoton = (date) => {
    setFechaSeleccionada(date);
    setModalAbierto(true);
  };

  const guardarTarea = () => {
    if (nuevaTarea && fechaSeleccionada) {
      setTarea([
        ...tarea,
        {
          title: nuevaTarea,
          start: fechaSeleccionada,
          end: fechaSeleccionada,
        },
      ]);
    }
    setNuevaTarea("");
    setModalAbierto(false);
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={tarea}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, backgroundColor: "lavender" }}
        views={["month", "week", "day"]}
        defaultView="month"
        messages={mensajesES}
        culture="es"
        components={{
          dateCellWrapper: (props) => (
            <BotonDia value={props.value} onClick={handleClickBoton} />
          ),
        }}
      />

      {modalAbierto && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Evento</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalAbierto(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Fecha: {fechaSeleccionada?.toLocaleDateString()}</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título del evento"
                  value={nuevaTarea}
                  onChange={(e) => setNuevaTarea(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalAbierto(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarTarea}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MiCalendario;
