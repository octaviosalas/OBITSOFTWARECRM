import ClientDetailModal from "./ClientDetailModal";
import ClientProjectsModal from "./ClientProjectsModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useEffect, useState } from 'react';
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";
import ClientFollowUpModal from "./ClientFollowUpModal";

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
    


    
    const deleteClient = (clientId) => {
        // Aquí iría el código para eliminar un cliente
        alert('Eliminar cliente ' + clientId);
    };
    


    const [searchTerm, setSearchTerm] = useState('');
    const [modals, setModals] = useState({
        clientForm: false,
        details: false,
        projects: false,
        followUps: false
    });


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
                                    <ClientDetailModal clientId={client.id}  resetTable={getClientsData}/>
                                    <ClientProjectsModal clientId={client.id}/>
                                    <ClientFollowUpModal clientId={client.id}/>
                                    <button className="delete-icon" onClick={() => deleteClient(client.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          

        </div>
    );
}

export default MainClient