import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import { useState } from "react";
import handleError from "../../utils/axiosErrorHanlder";
import { clientDataType } from "../../types/Clients";
import { ProjectUserClientsData } from "../../types/Projects";
import { servicesDataType } from "../../types/Services";

const AddNewService = () => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {user} = userStore()

    const [availableClients, setAvailableClients] = useState<clientDataType[] | []>([])
    const [availableProjects, setAvailableProjects] = useState<ProjectUserClientsData[] | []>([])
    const [availableServices, setAvailableServices] = useState<servicesDataType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [clientReference, setClientReference] = useState<number>()//
    const [projectReference, setProjectReference] = useState<number>()//
    const [serviceReference, setServiceReference] = useState<number>()//
    const [serviceStartDate, setServiceStartDate] = useState<string>("")//
    const [serviceEndDate, setServiceEndDate] = useState<string>("")//
    const [amount, setAmount] = useState<string>("")//

    const [serviceName, setServiceName] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [clientName, setClientName] = useState<string>("")
    const [filteredClientsNames, setFilteredClientsName] = useState<clientDataType[] | []>([])
    const [filteredProjectsNames, setFilteredProjectsNames] = useState<ProjectUserClientsData[] | []>([])


    const handleOpen = async () => { 
      onOpen()
      setLoad(true)
      try {
         const {data, status} = await apiBackendUrl.get(`/user/projectsAndClientsToCreateService/${user?.id}`)
         if(status === 200) { 
            setAvailableClients(data.clients)
            setAvailableProjects(data.projects)
            setAvailableServices(data.services)
            setLoad(false)
            console.log("data", data)
            console.log("dataclients", data.clients)
            console.log("dataprojects", data.projects)
         }
      } catch (error) {
         handleError(error, setLoad)
      }
    }

    const handleChangeClientName = (e: React.ChangeEvent<HTMLInputElement>) => { 
      const name = e.target.value
      setClientName(name)
      if(name.length === 0) { 
         setFilteredClientsName([]);
       } else { 
          const filteredClients = availableClients.filter(client => 
              client.clientData.name.toLowerCase().includes(name) 
          );
          console.log(filteredClients);
          setFilteredClientsName(filteredClients);
      }
    }

    const chooseClient = (id: number, name: string) => { 
      setClientName(name)
      setClientReference(id)
      setFilteredClientsName([])
    }

    const handleChangeProject = (e: React.ChangeEvent<HTMLInputElement>) => { 
      const name = e.target.value
      setProjectName(name)
      if(name.length === 0) { 
         setFilteredProjectsNames([]);
       } else { 
          const filteredProjectsNames = availableProjects.filter(project => 
            project.projectData.name.toLowerCase().includes(name) 
          );
          console.log(filteredProjectsNames);
          setFilteredProjectsNames(filteredProjectsNames);
      }
    }

    const chooseProject = (id: number, name: string) => { 
      setProjectName(name)
      setProjectReference(id)
      setFilteredProjectsNames([])
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedService = JSON.parse(e.target.value);
      console.log("ID RECIBIDO EN SERVICEREFERENCE", selectedService.id);
      console.log("NAME RECIBIDO EN SERVICEREFERENCE", selectedService.name);
      setServiceName(selectedService.name);
      setServiceReference(selectedService.id);
  };

    const addServiceToProject = async () => { 
       setLoad(true)
       const newServiceProject = ({ 
         endDate: serviceEndDate,
         startDate: serviceStartDate,
         amount: amount
       })
       const projectId = projectReference
       const serviceId = serviceReference
       const clientId = clientReference
      try {
          const {data, status} = await apiBackendUrl.post(`/service/addServiceNewToProject/${projectId}/${serviceId}/${clientId}`, newServiceProject)
          if(status === 200) { 
            setLoad(false)
            onClose()
            console.log(data)
          }
       } catch (error) {
          console.log(error)
          handleError(error, setLoad)
       }
    }



    

  return ( 
    <>
      <button className="btn-new-service" onClick={handleOpen}>Agregar Servicio a un Proyecto</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <form id="serviceForm">
                     <h2>Agregar Servicios</h2>
                          <div className="form-group mt-4">
                              <label >Referencia del Cliente:</label>
                              <input type="text" id="clientRef" name="clientRef" required onChange={handleChangeClientName} value={clientName}/>
                              {filteredClientsNames.length > 0 ?
                                 <div className="flex flex-col mt-2 shadow-lg">
                                     {filteredClientsNames.map((clients: clientDataType) => (  
                                        <p key={clients.id} className="mt-1 cursor-pointer" onClick={() => chooseClient(clients.id, clients.clientData.name)}>{clients.clientData.name}</p>
                                     ))}
                                </div> : null}
                          </div>

                          <div className="form-group">
                              <label >Referencia al Proyecto:</label>
                              <input type="text" id="projectRef" name="projectRef" required onChange={handleChangeProject} value={projectName}/>
                              {filteredProjectsNames.length > 0 ?
                                 <div className="flex flex-col mt-2 shadow-lg">
                                     {filteredProjectsNames.map((project: ProjectUserClientsData) => (  
                                        <p key={project.id} className="mt-1 cursor-pointer" onClick={() => chooseProject(project.projectData.id, project.projectData.name)}>{project.projectData.name}</p>
                                     ))}
                                </div> : null}
                          </div>

                          <div className="form-group">
                              <label >Tipo de Servicio:</label>
                                <select  id="serviceType"  name="serviceType" required  onChange={(e) => handleSelectChange(e)}>
                                    {availableServices.map((serv: servicesDataType) => (
                                        <option key={serv.id} value={JSON.stringify({ id: serv.id, name: serv.name })}>
                                            {serv.name}
                                        </option>
                                    ))}
                                </select>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Contratación:</label>
                              <input type="date" id="contractDate" name="contractDate" required onChange={(e) => setServiceStartDate(e.target.value)}/>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Renovación:</label>
                              <input type="date" id="renewalDate" name="renewalDate" required onChange={(e) => setServiceEndDate(e.target.value)}/>
                          </div>

                          <div className="form-group">
                              <label> Monto: </label>
                              <input type="number" id="amount" name="amount" step="0.01" required onChange={(e) => setAmount(e.target.value)}/>
                          </div>

                          <div className="form-buttons">
                              <button type="button" className="btn-submit" onClick={() => addServiceToProject()}>Guardar</button>
                              <button type="button" className="btn-cancel" id="closeServiceSection">Cancelar</button>
                          </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewService