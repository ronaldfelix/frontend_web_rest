import React, { useState } from 'react';

const RegistroCliente = () => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      email: email,
      nombre: nombre,
      telefono: telefono,
      clave: clave,
    };

    try {
      const response = await fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),

      
        
      });
      console.log(response);
      console.log(JSON.stringify(nuevoCliente));

      if (response.ok) {
        alert('Cliente registrado exitosamente');
        setEmail('');
        setNombre('');
        setTelefono('');
        setClave('');
      } else {
        setError('Error al registrar cliente');
      }
    } catch (err) {
      console.error(err);
      setError('Error de red');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#d3d3d3' }}>
      <form onSubmit={handleSubmit} style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2>Registro Cliente</h2>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Correo Electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Nombre y Apellidos" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="tel" 
            placeholder="Teléfono" 
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            placeholder="Clave" 
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Registrarse</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#00cccc',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default RegistroCliente;
