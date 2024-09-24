import ClientDetailModal from "./ClientDetailModal";
import ClientProjectsModal from "./ClientProjectsModal";
import CreateNewClientModal from "./CreateNewClientModal";
import "./styles/clientModule.css"
import { useEffect, useState, useCallback } from 'react';
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";
import ClientFollowUpModal from "./ClientFollowUpModal";
import ClientDeleteModal from "./ClientDeleteModal";
import { userStore } from "../../store/UserAccount";
import SpinnerComponent from "../Spinner/Spinner";
import WithOutAcces from "../reusableComponents/withOutAcces";

const MainClient = () => { 

    const [originalClientsData, setOriginalClientsData] = useState<clientPersonalDataType[] | []>([])
    const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)

    const {user} = userStore()

   

    const getClientsAccesUserData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/user/userClientAcces/${user?.id}`)
            console.log("getClientsAccesUserData", data)            
            if(status === 200) { 
                console.log("getClientsAccesUserData", data)   
                const clientsOnlyData = data.map((c : any) => { 
                    const onlyClientsData = c.clientData
                    return onlyClientsData
                })
                setEveryClientsData(clientsOnlyData)
                setOriginalClientsData(clientsOnlyData)
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getClientsAccesUserData()
    }, [])
    

    const handleChangeTableData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { 
        const item = e.target.value.toLowerCase();
        if(item === "") { 
            setEveryClientsData(originalClientsData);
        } else {
            const searched = everyClientsData.filter(client => 
                Object.values(client).some(value =>
                    value.toString().toLowerCase().includes(item)
                )
            );
            setEveryClientsData(searched);
        }
    }, [everyClientsData, originalClientsData]);

    return (
        <div className="main-client">
            {!load && everyClientsData.length > 0 ? ( 
                <>
                 <div className="top-bar">
                <CreateNewClientModal resetTableData={getClientsAccesUserData}/>
 
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
                </>
            ) : load ? ( 
                <div className="flex items-center justify-center mt-36">
                  <SpinnerComponent/>
                </div>
            ) : !load && everyClientsData.length === 0 ? ( 
                <> 
                <div className="top-bar">
                    <CreateNewClientModal resetTableData={getClientsAccesUserData}/>
                </div>
                    <WithOutAcces typeData="clientes"/>
                </>

            ) : null}
           

        </div>
    );
}

export default MainClient