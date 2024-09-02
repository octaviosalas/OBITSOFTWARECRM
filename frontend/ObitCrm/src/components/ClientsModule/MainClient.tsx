import ClientDetailModal from "./ClientDetailModal";
import ClientProjectsModal from "./ClientProjectsModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useEffect, useState } from 'react';
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";

const MainClient = () => { 

    const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])

    const getClientsData = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get("/client/everyClientsData")
            console.log(status)
            console.log(data)
            if(status === 200) { 
                console.log(data)
                setEveryClientsData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getClientsData()
    }, [])
    

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

    const filteredClients = everyClientsData.filter(client =>
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
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.name}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                {client.active === true ? 
                                <td>Activo</td> : <td>Inactivo</td>}
                                <td className="flex">
                                    <ClientDetailModal clientId={client.id}/>
                                    <ClientProjectsModal/>
                                    <button className="btn-btn" onClick={() => openModal('followUps')}>Seguimientos</button>
                                    <button className="delete-icon" onClick={() => deleteClient(client.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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