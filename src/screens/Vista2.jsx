import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vista2.css'; // Importamos el archivo de estilos específico para el cocinero

const CocineroDashboard = () => {
  // Estado para almacenar los datos del cocinero
  const [cocineroData, setCocineroData] = useState({
    platillosPreparados: 0,
    tiempoPromedioPreparacion: 0,
    horasTrabajadas: 0,
  });

  // Utilizamos useEffect para cargar los datos del cocinero cuando el componente se monta
  useEffect(() => {
    // Fetch de los datos del cocinero desde una orden específica (cambiar el ID si es necesario)
    axios.get('http://localhost:8080/api/ordenes/1')
      .then(response => {
        const orden = response.data;
        setCocineroData({
          platillosPreparados: orden.cantidadPlatillos || 0, // Suponiendo que el modelo Orden tiene este campo
          tiempoPromedioPreparacion: orden.tiempoPromedioPreparacion || 0,
          horasTrabajadas: orden.horasTrabajadas || 0,
        });
      })
      .catch(error => console.error('Error fetching cocinero data:', error));
  }, []);

  return (
    <div className="cocinero-dashboard-container">
      <h2>Cocinero</h2>
      <div className="data-card">
        <div className="data-row">
          <p>Cantidad de platillos preparados:</p>
          <span className="data-value">{cocineroData.platillosPreparados}</span>
        </div>
        <div className="data-row">
          <p>Tiempo promedio de preparación:</p>
          <span className="data-value">{cocineroData.tiempoPromedioPreparacion} min</span>
        </div>
        <div className="data-row">
          <p>Horas trabajadas en el día:</p>
          <span className="data-value">{cocineroData.horasTrabajadas} horas</span>
        </div>
      </div>
    </div>
  );
};

export default CocineroDashboard;

