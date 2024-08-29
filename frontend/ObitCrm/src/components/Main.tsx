import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

const ClientsModule: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes añadir lógica para manejar el formulario
        closeModal();
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <div className="custom-header">
                <div className="header-container">
                    <button className="btn-new-client" onClick={openModal}>Nuevo Cliente</button>
                </div>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Buscar clientes..." />
            </div>

            <table className="clients-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Proyectos</th>
                        <th>Servicios</th>
                        <th>Redes Sociales</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juan Pérez</td>
                        <td>123-456-7890</td>
                        <td>juan@example.com</td>
                        <td>Proyecto A</td>
                        <td>Servicio X</td>
                        <td>@juanperez</td>
                        <td>
                            <button className="btn-action edit"><FontAwesomeIcon icon={faPencilAlt} /></button>
                            <button className="btn-action delete"><FontAwesomeIcon icon={faTrashAlt} /></button>
                            <button className="btn-action details"><FontAwesomeIcon icon={faEye} /></button>
                        </td>
                    </tr>
                    {/* Más filas de clientes */}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Agregar Nuevo Cliente</h2>
                        <form id="clientForm" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Teléfono:</label>
                                <input type="text" id="phone" name="phone" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Correo:</label>
                                <input type="email" id="email" name="email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="projects">Proyectos:</label>
                                <input type="text" id="projects" name="projects" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="services">Servicios:</label>
                                <input type="text" id="services" name="services" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="socials">Redes Sociales:</label>
                                <input type="text" id="socials" name="socials" />
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="btn-submit">Confirmar</button>
                                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientsModule;