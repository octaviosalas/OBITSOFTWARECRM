import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import { useState } from "react";
import { getClientData } from "../../utils/getClientData";
import handleError from "../../utils/axiosErrorHanlder";
import { clientProjectsDataType } from "../../types/Clients";
import SpinnerComponent from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

interface Props { 
    clientId: number
  }

const ClientProjectsModal = ({clientId}: Props) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [clientsProjectsData, setClientsProjectsData] = useState<clientProjectsDataType[] | []>()
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()


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

    const redirectToPage = (projectId: number) => { 
        navigate(`/projectDetail/${projectId}`)
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
                           {clientsProjectsData && clientsProjectsData.length > 0 ? ( 
                             <table>
                             <thead>
                                 <tr>
                                     <th>ID</th>
                                     <th>Nombre del Proyecto</th>
                                     <th>Acción</th>
                                 </tr>
                             </thead>
                             <tbody>
                             
                                 {clientsProjectsData.map((project, index) => (
                                     <tr key={project.id}>
                                         <td>{index + 1}</td>
                                         <td>{project.name}</td>
                                         <td><span className="table-icon" onClick={() => redirectToPage(project.id)}>Ir</span></td>
                                     </tr>
                                 ))}
                        
                             </tbody>
                         </table>
                           ) : ( 
                            <p>nada</p>
                           )}
                            

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
