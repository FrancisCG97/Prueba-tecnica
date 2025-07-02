const BotonDia = ({ value, onClick }) => {
  return (
    <div style={{ position: "relative", height: "100%", padding: "2px" }}>
      <div>{value.getDate()}</div>
      <button
        className="btn btn-sm btn-outline-primary"
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          fontSize: "10px",
          padding: "0px 4px",
        }}
        onClick={() => onClick(value)}
      >
        +
      </button>
    </div>
  );
};

export default BotonDia;
