const BotonDia = ({ date, label, onClick }) => {

  const esFechaFutura = (fecha) => {
    const hoy = new Date();
    const comparar = new Date(fecha);
    return comparar > hoy;
  };

  const handleClickFecha = (e) => {
    e.stopPropagation();

    if (!esFechaFutura(date)) {
      alert("La fecha debe ser posterior a hoy.");
      return;
    }
    onClick(date);
  };

  return (
    <div style={{ position: "relative" }}>
      <span>{label}</span>
      <button
        id="agregar-tarea"
        className="btn"
        style={{
          display: "inline",
          fontSize: "20px",
          padding: "0px 4px 1px 4px",
          zIndex: 10,
          backgroundColor: "transparent",
          borderRadius: 3,
          marginTop: -7,
          fontWeight: "bold",
        }}
        onClick={handleClickFecha}
      >
        +
      </button>
    </div>
  );
};

export default BotonDia;
