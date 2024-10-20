import React, { useState } from 'react';
import axios from 'axios';
import './Vista2.css'; // Asegúrate de tener estilos personalizados

const Login = () => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza la llamada al backend para autenticar al usuario
      const response = await axios.post('http://localhost:8080/api/clientes/login', {
        email,
        clave,
      });

      if (response.data) {
        // Guarda el token o los detalles del usuario según la respuesta del backend
        console.log('Login successful', response.data);
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
      console.error('Error during login', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <div className="extra-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
