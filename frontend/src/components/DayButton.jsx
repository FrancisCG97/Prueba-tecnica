const BotonDia = ({ date, label, onClick }) => {
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
        onClick={(e) => {
          e.stopPropagation();
          onClick(date);
        }}
      >
        +
      </button>
    </div>
  );
};

export default BotonDia;
