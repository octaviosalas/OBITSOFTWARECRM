import ClientDetailModal from "./ClientDetailModal";
import ClientProjectsModal from "./ClientProjectsModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useEffect, useState } from 'react';
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";
import ClientFollowUpModal from "./ClientFollowUpModal";
import ClientDeleteModal from "./ClientDeleteModal";
import { userStore } from "../../store/UserAccount";
import { pruebaType } from "../../types/Clients";

const MainClient = () => { 

    const [originalClientsData, setOriginalClientsData] = useState<clientPersonalDataType[] | []>([])
    const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])

    const {user} = userStore()

   

    const getClientsAccesUserData = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get(`/user/userClientAcces/${user?.id}`)
            console.log("getClientsAccesUserData", data)            
            if(status === 200) { 
                console.log("getClientsAccesUserData", data)   
                const clientsOnlyData = data.map((c : pruebaType) => { 
                    const onlyClientsData = c.clientData
                    return onlyClientsData
                })
                setEveryClientsData(clientsOnlyData)
                setOriginalClientsData(clientsOnlyData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getClientsAccesUserData()
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
                <CreateNewClientModal resetTableData={getClientsAccesUserData}/>
                <div className="bottom-bar">
                    <input
                        type="text"
                        id="search"
                        className="text-black"
                        onChange={handleChangeTableData}
                    />
                    {user?.name}
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
                                    <ClientDetailModal clientId={client.id}  resetTable={getClientsAccesUserData}/>
                                    <ClientProjectsModal clientId={client.id}/>
                                    <ClientFollowUpModal clientId={client.id}/>
                                    <ClientDeleteModal clientId={client.id} resetTableData={getClientsAccesUserData}/>
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