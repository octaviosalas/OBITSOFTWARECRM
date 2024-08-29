import ClientDetailModal from "./ClientDetailModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useState } from 'react';

const MainClient = () => { 

    const clientsData = [
        { id: 1, nombre: 'Cliente A', telefono: '(123) 456-7890', email: 'clientea@example.com', estado: 'Activo' },
        { id: 2, nombre: 'Cliente B', telefono: '(987) 654-3210', email: 'clienteb@example.com', estado: 'Inactivo' },
        // Añadir más clientes si es necesario
    ];
    
    const projectsData = [
        { id: 1, nombre: 'Proyecto X' },
        { id: 2, nombre: 'Proyecto Y' },
        // Añadir más proyectos si es necesario
    ];
    
    const followUpsData = [
        { id: 1, fecha: '2024-08-15', comentario: 'Reunión inicial' },
        { id: 2, fecha: '2024-08-20', comentario: 'Seguimiento por correo' },
        // Añadir más seguimientos si es necesario
    ];
    
    const deleteClient = (clientId) => {
        // Aquí iría el código para eliminar un cliente
        alert('Eliminar cliente ' + clientId);
    };
    
    const viewProject = (projectId) => {
        // Aquí iría el código para ver los detalles del proyecto
        alert('Ver proyecto ' + projectId);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [modals, setModals] = useState({
        clientForm: false,
        details: false,
        projects: false,
        followUps: false
    });

    const openModal = (modalName) => {
        setModals({ ...modals, [modalName]: true });
    };

    const closeModal = (modalName) => {
        setModals({ ...modals, [modalName]: false });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredClients = clientsData.filter(client =>
        Object.values(client).some(value =>
            value.toString().toLowerCase().includes(searchTerm)
        )
    );

    return (
        <div className="main-client">
            {/* Barra superior con botón de crear cliente */}
            <div className="top-bar">
                <CreateNewClientModal/>
                <div className="bottom-bar">
                    <input
                        type="text"
                        id="search"
                        placeholder="Buscar clientes..."
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </div>
            </div>

            {/* Vista de Clientes */}
            <div id="clientes-view">
                <table id="clientes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.nombre}</td>
                                <td>{client.telefono}</td>
                                <td>{client.email}</td>
                                <td>{client.estado}</td>
                                <td>
                                    <ClientDetailModal/>
                                    <button className="btn-btn" onClick={() => openModal('projects')}>Proyectos</button>
                                    <button className="btn-btn" onClick={() => openModal('followUps')}>Seguimientos</button>
                                    <button className="delete-icon" onClick={() => deleteClient(client.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

       
           

            {/* Modal de Proyectos */}
            {modals.projects && (
                <div id="projects-modal" className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => closeModal('projects')}>&times;</span>
                        <h2>Proyectos del Cliente</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Proyecto</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.nombre}</td>
                                        <td><span className="table-icon" onClick={() => viewProject(project.id)}>Ir</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal de Seguimientos */}
            {modals.followUps && (
                <div id="follow-ups-modal" className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => closeModal('followUps')}>&times;</span>
                        <h2>Seguimientos del Cliente</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {followUpsData.map(followUp => (
                                    <tr key={followUp.id}>
                                        <td>{followUp.id}</td>
                                        <td>{followUp.fecha}</td>
                                        <td>{followUp.comentario}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MainClient