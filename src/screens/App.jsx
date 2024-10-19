//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const OrdenesPendientes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const [successMessage, setSuccessMessage] = useState(''); // Para mensajes de éxito

  useEffect(() => {
    // Función para obtener las órdenes pendientes desde el servidor
    const fetchOrdenes = async () => {
      try {
        setLoading(true); // Empieza cargando
        const response = await axios.get('http://localhost:8080/api/ordenes'); 
        console.log("Ordenes recibidas:", response.data)
        setOrdenes(response.data);
      } catch (error) {
        console.error("Error en la llamada a la API:", error)
        setError('Error al obtener las órdenes.');
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchOrdenes(); // Llamar la función al montar el componente
  }, []);

  const prepararOrden = async (id) => {
    // Llamada API para preparar la orden
    try {
      await axios.put(`http://localhost:8080/api/ordenes/${id}`, { estado: 'preparado' });
      setSuccessMessage(`Orden ${id} preparada exitosamente.`);
      setOrdenes(ordenes.filter((orden) => orden.id !== id)); // Filtra la orden preparada
    } catch (error) {
      setError('Error al preparar la orden.');
    }
  };

  const descartarOrden = async (id) => {
    // Llamada API para descartar la orden
    try {
      await axios.delete(`http://localhost:8080/api/ordenes/${id}`);
      setSuccessMessage(`Orden ${id} descartada.`);
      setOrdenes(ordenes.filter((orden) => orden.id !== id)); // Filtra la orden descartada
    } catch (error) {
      setError('Error al descartar la orden.');
    }
  };

  const limpiarMensajes = () => {
    setError(null);
    setSuccessMessage('');
  };

  if (loading) {
    return <div className="loading">Cargando órdenes...</div>;
  }

  return (
    <div className="ordenes-pendientes-container">
      <h2>Mis órdenes pendientes</h2>
      <a href="/historial" className="historial-link">Ver historial</a>

      {/* Mostrar mensajes de éxito o error */}
      {error && (
        <div className="error-message">
          {error} <button onClick={limpiarMensajes}>Cerrar</button>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          {successMessage} <button onClick={limpiarMensajes}>Cerrar</button>
        </div>
      )}

      {/* Si no hay órdenes */}
      {ordenes.length === 0 ? (
        <p>No hay órdenes pendientes.</p>
      ) : (
        <div className="ordenes-container">
          {ordenes.map((orden) => (
            <div key={orden.id} className="orden-card">
              <div className="orden-detalle">
                <p><strong>{orden.descripcion}</strong></p>
                <p>Pedido hace {orden.tiempoDesdePedido} minutos</p>
                <p>Estado: <strong>{orden.estado}</strong></p> {/* Estado de la orden */}
              </div>
              <div className="orden-actions">
                <button className="btn-preparar" onClick={() => prepararOrden(orden.id)}>Preparar</button>
                <button className="btn-descartar" onClick={() => descartarOrden(orden.id)}>Descartar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdenesPendientes;
