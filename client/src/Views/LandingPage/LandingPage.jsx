import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="left-section">
                <h1>Bienvenido</h1>
                <p>Por favor, elige una opción:</p>
                <Link to="/home">
                    <button>INGRESAR</button>
                </Link>
            </div>
            <div className="right-section">
                <img src="ruta-de-la-imagen.jpg" alt="Imagen de la Landing Page" />
                <p>Texto descriptivo sobre tu producto o servicio.</p>
            </div>
        </div>
    );
}

export default LandingPage;