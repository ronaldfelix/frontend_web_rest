import { Link } from 'react-router-dom';

function Vista2() {
  return (
    <div>
      <h2>Bienvenido a la Vista 2</h2>
      <p>Esta es una segunda página o pestaña en tu aplicación.</p>
      {/* Botón para regresar a la página principal */}
      <Link to="/">
        <button>Regresar a Inicio</button>
      </Link>
    </div>
  );
}

export default Vista2;
