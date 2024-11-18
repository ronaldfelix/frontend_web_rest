import React, { useEffect, useState } from "react";
import "./Cocinero.css";

function Cocinero() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenesPendientes = async () => {
      try {
        console.log("Fetching órdenes pendientes...");
        const response = await fetch("http://localhost:8080/api/ordenes/estado/Pendiente");
        const data = await response.json();
        console.log("Órdenes obtenidas:", data);
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener órdenes pendientes:", error);
      }
    };

    fetchOrdenesPendientes();
    const interval = setInterval(fetchOrdenesPendientes, 5000);

    return () => clearInterval(interval);
  }, []);

  const prepararOrden = async (idOrden) => {
    try {
      await fetch(`http://localhost:8080/api/ordenes/${idOrden}/preparar`, { method: "PUT" });
      setOrdenes((prevOrdenes) => prevOrdenes.filter((orden) => orden.idOrden !== idOrden));
    } catch (error) {
      console.error("Error al preparar orden:", error);
    }
  };

  const descartarOrden = async (idOrden) => {
    try {
      await fetch(`http://localhost:8080/api/ordenes/${idOrden}/descartar`, { method: "PUT" });
      setOrdenes((prevOrdenes) => prevOrdenes.filter((orden) => orden.idOrden !== idOrden));
    } catch (error) {
      console.error("Error al descartar orden:", error);
    }
  };

  return (
    <div className="cocinero-container">
      <h1>Mis órdenes pendientes</h1>
      <a href="/historial" className="ver-historial">Ver historial</a>
      <div className="ordenes">
        {ordenes.map((orden) => (
          <div key={orden.idOrden} className="orden-card">
            <div className="orden-detalle">
              {orden.detalleOrdenes.map((detalle, index) => (
                <p key={index}>
                  {detalle.cantidad} {detalle.productoNombre}
                </p>
              ))}
            </div>
            <div className="orden-info">
              <p>
                Pedido hace {Math.floor((new Date() - new Date(orden.fecha)) / 60000)} minutos
              </p>
            </div>
            <div className="orden-acciones">
              <button className="preparar-btn" onClick={() => prepararOrden(orden.idOrden)}>
                Preparar
              </button>
              <button className="descartar-btn" onClick={() => descartarOrden(orden.idOrden)}>
                Descartar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cocinero;
