import { useState } from "react";
import "../proyectMain.css"
import {Modal, ModalContent, ModalBody, ModalHeader, useDisclosure} from "@nextui-org/react";
import apiBackendUrl from "../../../lib/axiosData";
import { shootSuccesToast } from "../../../utils/succesToastFunction";
import handleError from "../../../utils/axiosErrorHanlder";
import SpinnerComponent from "../../Spinner/Spinner";
import { userStore } from "../../../store/UserAccount";

interface Props { 
    projectId: number,
    updateTable: () => void
}

const DeleteProject =  ({projectId, updateTable}: Props) => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [load, setLoad] = useState<boolean>(false)
    const {user} = userStore()

    const deleteProjectData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.delete(`/project/deleteProject/${projectId}/${user?.id}`)
            if(status === 200) { 
                updateTable()
                shootSuccesToast(data)
                onClose()
                setLoad(false)
                onClose()
            }
        } catch (error) {
            console.log(error)
            handleError(error, setLoad)
        }
    }
  
    return (
      <>
  
       <button className="btn-action delete"  onClick={onOpen}><i className="fas fa-trash-alt" style={{color:"red"}}></i></button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}  size="2xl" className="max-h-[650px] 2xl:max-h-[920px] overflow-y-auto">
          <ModalContent >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Eliminar Proyecto</ModalHeader>
                <ModalBody >
                 <div className=" flex flex-col items-center" id="projectSection">
                      <h2>Si eliminas el proyecto, se eliminara toda la informacion relacionada a el</h2>
                     {!load ?
                      <div className="flex gap-6 items-center mt-4 mb-2">
                        <button className="delete-icon"  onClick={() => deleteProjectData()}>Eliminar</button> 
                        <button className="btn-btn" onClick={onClose}>Cancelar</button> 
                      </div> : 
                      <SpinnerComponent/>}
                 </div> 
                </ModalBody>
                
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default DeleteProject
