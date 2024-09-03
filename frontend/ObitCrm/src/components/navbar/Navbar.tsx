import React, { useState } from 'react';
import "./navbar.css"
import obitLogo from "../../images/obitLogo.png"

const Navbar: React.FC = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="flex navbar-logo">
                    <img className="h-6 w-24" src={obitLogo}/>
                </div>
                <nav className="navbar-menu">
                    <button className="menu-toggle" aria-label="Open menu" onClick={toggleMenu}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"></path>
                        </svg>
                    </button>
                    <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                        <li><a href={`${PROJECT_URL}/`}>Clientes</a></li>
                        <li><a href="http://crm-obit.local/?page_id=77">Seguimientos</a></li>
                        <li><a href="http://crm-obit.local/?page_id=95">Proyectos</a></li>
                        <li><a href="http://crm-obit.local/?page_id=110">Servicios</a></li>
                        <li><a href="http://crm-obit.local/?page_id=2">Mi equipo</a></li>
                    </ul>
                    <button className="profile-button"><a href="http://crm-obit.local/?page_id=6">Mi perfil</a></button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;