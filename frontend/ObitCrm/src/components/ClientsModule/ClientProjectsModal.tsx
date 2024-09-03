import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import { useState } from "react";
import { getClientData } from "../../utils/getClientData";
import handleError from "../../utils/axiosErrorHanlder";
import { clientProjectsDataType } from "../../types/Clients";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    clientId: number
  }

const ClientProjectsModal = ({clientId}: Props) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [clientsProjectsData, setClientsProjectsData] = useState<clientProjectsDataType[] | []>()
    const [load, setLoad] = useState<boolean>(false)


    const handleOpen = async () => { 
        onOpen()
        try {
           const clientDetail = await getClientData(clientId, setLoad)
           console.log(clientDetail.clientProjects)
           setClientsProjectsData(clientDetail.clientProjects)
           setLoad(false)  
         } catch (error) {
           handleError(error, setLoad)
         }
 }


  return (
    <div>
         <button className="btn-btn" onClick={handleOpen}>Proyectos</button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                
                <div id="projects-modal" className="modal">
                   {load ?  
                   <div className="flex justify-center items-center m-4">
                       <SpinnerComponent/> 
                    </div> : 
                    <div className="modal-content">
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
                            {clientsProjectsData && clientsProjectsData.length > 0 ? (
                                clientsProjectsData.map((project, index) => (
                                    <tr key={project.id}>
                                        <td>{index + 1}</td>
                                        <td>{project.name}</td>
                                        <td><span className="table-icon">Ir</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No hay proyectos</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>}
                </div>
                
                </>
            )}
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ClientProjectsModal
