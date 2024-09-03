import ClientDetailModal from "./ClientDetailModal";
import ClientProjectsModal from "./ClientProjectsModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useEffect, useState } from 'react';
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";
import ClientFollowUpModal from "./ClientFollowUpModal";
import ClientDeleteModal from "./ClientDeleteModal";

const MainClient = () => { 

    const [originalClientsData, setOriginalClientsData] = useState<clientPersonalDataType[] | []>([])
    const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])
    const [searchTerm, setSearchTerm] = useState<string>('');

    const getClientsData = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get("/client/everyClientsData")
            console.log(status)
            console.log(data)
            if(status === 200) { 
                console.log(data)
                setEveryClientsData(data)
                setOriginalClientsData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getClientsData()
    }, [])
    

    const handleChangeTableData =  (e: React.ChangeEvent<HTMLInputElement>) => { 
        const item = e.target.value.toLowerCase();
        const searched = everyClientsData.filter(client => 
            Object.values(client).some(value =>
                value.toString().toLowerCase().includes(item)
            )
        )
        setEveryClientsData(searched)
        if(item === "") { 
            setEveryClientsData(originalClientsData)
        }
    }

    return (
        <div className="main-client">
            <div className="top-bar">
                <CreateNewClientModal resetTableData={getClientsData}/>
                <div className="bottom-bar">
                    <input
                        type="text"
                        id="search"
                        className="text-black"
                        onChange={handleChangeTableData}
                    />
                </div>
            </div>

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
                        {everyClientsData.map(client => (
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
                                    <ClientDeleteModal clientId={client.id} resetTableData={getClientsData}/>
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