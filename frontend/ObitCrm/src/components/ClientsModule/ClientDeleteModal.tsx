
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import SpinnerComponent from "../Spinner/Spinner";
import { useState } from "react";
import apiBackendUrl from "../../lib/axiosData";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";

interface Props { 
    clientId: number,
    resetTableData: () => void
}

const ClientDeleteModal = ({clientId, resetTableData}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [load, setLoad] = useState<boolean>(false)

  const deleteClient = async () => { 
    setLoad(true)
    try {
        const {data, status} = await apiBackendUrl.delete(`/client/deleteClient/${clientId}`)
        if(status === 200) { 
            shootSuccesToast(data)
            resetTableData()
            onClose()
        } 
    } catch (error) {
        handleError(error, setLoad)
     }
  }

  return (
    <>
     <button className="delete-icon" onClick={onOpen}>Eliminar</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
            {() => (
                <>              
               {load ?
                <div className="flex justify-center items-center m-4">
                   <SpinnerComponent/> 
                </div>
                 : 
                <div id="details-modal" className="modal">
                        <div  className="modal-content">          
                           <div id="client-form" className="flex flex-col justify-center items-center">
                               <label >¿Estas seguro de eliminar al cliente?</label>
                           </div>                 
                         
                           <div className="flex mt-4 gap-4 justify-center items-center">
                                <button className="delete-icon" onClick={() => deleteClient()}>Eliminar</button> 
                                <button className="btn-btn">Cancelar</button> 
                           </div>                 
                        </div>
                </div>
                }          
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  );
}

export default ClientDeleteModal