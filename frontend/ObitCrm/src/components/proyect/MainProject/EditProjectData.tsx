import { useEffect, useState } from "react";
import "../proyectMain.css"
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import { servicesNewProjectsType, newProjectDataType } from "../../../types/Projects";
import { clientPersonalDataType } from "../../../types/Clients";
import apiBackendUrl from "../../../lib/axiosData";
import handleError from "../../../utils/axiosErrorHanlder";
import SpinnerComponent from "../../Spinner/Spinner";
import { UserTypeData, usersDataProjectType } from "../../../types/User";
import { userStore } from "../../../store/UserAccount";
import {  shootErrorToast, shootSuccesToast, shootSuccesWithOutLoginFunction } from "../../../utils/succesToastFunction";
import { servicesType, servicesDataType, serviceUserProjectType } from "../../../types/Services";
import { projectDataUserPersonalType, usersWithAccesData } from "../../../types/User";
import {  formatDateInputElement } from "../../../utils/transformDate";



interface Props { 
    projectData: projectDataUserPersonalType,
    updateTable: () => void
}

const EditProjectData =  ({projectData, updateTable}: Props) => { 

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const [availableClients, setAvailableClients] = useState<clientPersonalDataType[] | []>([])
  const [availableUsers, setAvailableUsers] = useState<UserTypeData[] | []>([])
  const [availableServices, setAvailableServices] = useState<servicesType[] | []>([])

  const [filteredClientsNames, setFilteredClientsNames] = useState<clientPersonalDataType[] | []>([])
  const [filteredUserNames, setFilteredUserNames] = useState<UserTypeData[] | []>([])
  const [filteredServices, setFilteredServices] = useState<servicesType[] | []>([])

  const [usersNames, setUsersNames] = useState<usersDataProjectType[] | []>([])
  
  const [projectAmount, setProjectAmount] = useState<number>(projectData.amount)
  const [projectName, setProjectName] = useState<string>(projectData.name)
  const [client, setClient] = useState<number>()
  const [clientName, setClientName] = useState<string>(projectData.clientData.name)
  const [services, setServices] = useState<servicesNewProjectsType[] | []>([])
  const [description, setDescription] = useState<string>(projectData.description)
  const [startDate, setStartDate] = useState<string>(projectData.startDate)

  const [load, setLoad] = useState<boolean>(false)

  const {user} = userStore()

  const getMembersAndServices = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get(`/project/userWithAccesData/${projectData.id}`)
            if(status === 200) { 
                setLoad(false)
                const membersData = data.map((data : usersWithAccesData) => { 
                    const newData = { 
                        name: data.userData.name,
                        id: data.userData.id
                    }
                    return newData
            })
            setUsersNames(membersData)
            const actualProjectServices = projectData.services.map((serv : serviceUserProjectType) => { 
                const services = { 
                    name: serv.service.name,
                    id: serv.serviceId
                }
                return services
            })
            console.log("SERVICIOS", actualProjectServices)
            setServices(actualProjectServices)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
  }

  const handleOpen = async () => { 
    console.log(projectData)
    if(user === null) { 
        onClose()
        return shootSuccesWithOutLoginFunction("Debes iniciar sesion para editar un proyecto")
    }
    setLoad(true)
    getMembersAndServices()
    onOpen()
      try {
         const {data, status} = await apiBackendUrl.get(`/project/dataToCreateProjects/${user?.id}`)
         console.log(data, status)
         if(status === 200) { 
            setAvailableClients(data.clients)
            setAvailableUsers(data.users)
            setAvailableServices(data.services)
            setLoad(false)
         }
      } catch (error) {
         handleError(error, setLoad)
      }
  }

  const handleSearchClient = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const name = e.target.value.toLowerCase();
    setClientName(name)
    if(name.length === 0) { 
        setFilteredClientsNames([]);
    } else { 
        const filteredClients = availableClients.filter(client => 
            client.name.toLowerCase().includes(name) 
        );
        console.log(filteredClients);
        setFilteredClientsNames(filteredClients);
    }
  };

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const name = e.target.value.toLowerCase();
    if(name.length === 0) { 
        setFilteredUserNames([]);
    } else { 
        const filteredUsers = availableUsers.filter(user => 
            user.name.toLowerCase().includes(name) 
        );
        console.log(filteredUsers);
        setFilteredUserNames(filteredUsers);
    }
  };

  const chooseClient = (id: number, name: string) => { 
    setClientName(name)
    setClient(id)
    setFilteredClientsNames([])
  }

  const chooseUser= (id: number, name: string) => { 
     const userExist = usersNames.some((us) => us.id === id)
     if(userExist) { 
        setFilteredUserNames([])
        return shootErrorToast("El usuario ya forma parte del projecto")
     }
     const users : usersDataProjectType = ({
         name: name,
         id: id
     })
     setUsersNames((prevState) => [...prevState, users])
     setFilteredUserNames([]);

  }

  const removeUser= (id: number) => { 
    const filtered = usersNames.filter((us) => us.id !== id)
    console.log(filtered)
    setUsersNames(filtered)
  }

  const handleSearcServices = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const name = e.target.value.toLowerCase();
    if(name.length === 0) { 
        setFilteredServices([]);
    } else { 
        const filteredServices = availableServices.filter(serv => 
            serv.name.toLowerCase().includes(name) 
        );
        console.log(filteredServices);
        setFilteredServices(filteredServices);
    }
  };

  const chooseService= (id: number, name: string) => { 
    const actualServices : servicesDataType = ({
        name: name,
        id: id
    })
    const validateExistence = services.some((serv) => serv.id === id)
    if(!validateExistence) { 
      setServices((prevState) => [...prevState, actualServices])
      setFilteredServices([]);
    } else { 
      setFilteredServices([]);
      shootErrorToast("El servicio elegido ya forma parte de este proyecto")
    }
  }

  const removeService= (id: number) => { 
    const filtered = services.filter((us) => us.id !== id)
    setServices(filtered)
  }

  const editProjectData = async (e : any) => { 
    e.preventDefault()
    setLoad(true)
    const newProjectData : newProjectDataType = ({
       client: Number(client),
       name: projectName,
       amount: Number(projectAmount),
       description: description,
       startDate: startDate,
       usersWithAcces: usersNames,
       services: services
    })
    console.log("newProjectData.services", newProjectData.services)
    try {
         const {data, status} = await apiBackendUrl.put(`/project/editProjectData/${projectData.id}`, newProjectData)
         console.log("data", data)
         console.log("status", status)

         if(status === 200) { 
            console.log(data)
            shootSuccesToast(data)
            setLoad(false)
            updateTable()
            onClose()
         }
    } catch (error) {
        handleError(error, setLoad)
        console.log("error", error)
    }
  }

   useEffect(() => { 
       console.log(services)
   }, [services])


  return (
    <>

     <button className="btn-action edit"><i className="fas fa-pencil-alt"  onClick={handleOpen} style={{color:"#28a745"}}></i></button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}  size="2xl" className="max-h-[650px] 2xl:max-h-[920px] overflow-y-auto">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalBody >
              <div className=" flex flex-col items-center" id="projectSection">
                    <div className="form-section">
                        <h2>Editar Proyecto</h2>
                      {!load ?
                        <form id="projectForm" onSubmit={editProjectData}>
                            <div className="form-group">
                                <label htmlFor="clientRef">Referencia del Cliente:</label>
                                <input type="text" id="clientRef" name="clientRef" required value={clientName} onChange={handleSearchClient}/>
                                {filteredClientsNames.length > 0 ?
                                 <div className="flex flex-col mt-2 shadow-lg">
                                     {filteredClientsNames.map((clients: clientPersonalDataType) => (  
                                        <p key={clients.id} className="mt-1 cursor-pointer" onClick={() => chooseClient(clients.id, clients.name)}>{clients.name}</p>
                                     ))}
                                </div> : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="clientRef">Nombre del Proyecto</label>
                                <input type="text" id="clientRef" name="clientRef" required value={projectName} onChange={(e) => setProjectName(e.target.value)}/>                            
                            </div>

                            <div className="form-group">
                                <label htmlFor="clientRef">Valor del Proyecto</label>
                                <input type="number" id="clientRef" name="clientRef" required value={projectAmount} onChange={(e) => setProjectAmount(Number(e.target.value))}/>                            
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="participants">Usuarios Participantes:</label>
                                <input type="text" id="participants" name="participants" onChange={handleSearchUser}/>
                                {filteredUserNames.length > 0 ?
                                 <div className="flex flex-col mt-2 bg-gray-100 rounded-sm shadow-lg">
                                     {filteredUserNames.map((us: UserTypeData) => (  
                                        <p key={us.id} className="mt-1 cursor-pointer" onClick={() => chooseUser(us.id, us.name)}>{us.name}</p>
                                     ))}
                                </div> : null}
                                {usersNames.length > 0 ? 
                                   usersNames.map((us : usersDataProjectType) => ( 
                                     <div className="flex w-full items-center justify-between max-h-[25px] overflow-y-auto mt-1 bg-gray-100">
                                         <p>{us.name}</p>
                                         <p onClick={() => removeUser(us.id)} className="cursor-pointer text-sm mr-2">X</p>
                                     </div>
                                   ))
                                : null}
                            </div>
                                                       
                            <div className="form-group">
                                <label htmlFor="services">Referencia a Servicios:</label>
                                <input type="text" id="services" name="services" onChange={handleSearcServices}/>
                                {services.length > 0 ? 
                                   services.map((serv : servicesNewProjectsType) => ( 
                                     <div key={serv.id} className="flex w-full items-center justify-between max-h-[25px] overflow-y-auto mt-3 bg-gray-100">
                                         <p >{serv.name}</p>
                                         <p onClick={() => removeService(serv.id)} className="cursor-pointer text-sm mr-2">X</p>
                                     </div>
                                   ))
                                : null}
                                {filteredServices.length > 0 ?
                                 <div className="flex flex-col mt-2 shadow-lg">
                                     {filteredServices.map((serv: servicesType) => (  
                                        <p key={serv.id} className="mt-1 cursor-pointer" onClick={() => chooseService(serv.id, serv.name)}>{serv.name}</p>
                                     ))}
                                </div> : null}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="startDate">Fecha de Inicio:</label>
                                <input type="date" id="startDate" name="startDate" required value={formatDateInputElement(startDate)} onChange={(e) => setStartDate(e.target.value)}/>
                            </div>
                                                
                            
                            <div className="form-group">
                                <label htmlFor="additionalInfo">Descripcion</label>
                                <textarea id="additionalInfo" name="additionalInfo" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            
                            <div className="form-buttons">
                                <button type="submit" className="btn-submit">Guardar</button>
                                <button type="button" className="btn-cancel" id="closeProjectSection" onClick={onClose}>Cancelar</button>
                            </div>
                        </form> 
                        : <SpinnerComponent/>
                        }
                    </div>
               </div>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProjectData
