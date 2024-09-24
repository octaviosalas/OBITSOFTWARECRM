import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import "../proyectDetail.css"
import apiBackendUrl from "../../../lib/axiosData";
import { userStore } from "../../../store/UserAccount";
import { shootSuccesToast } from "../../../utils/succesToastFunction";
import handleError from "../../../utils/axiosErrorHanlder";
import SpinnerComponent from "../../Spinner/Spinner";

interface Props { 
    reminderId: number,
    projectId: number,
    updateReminders: (ejecuteLoad: boolean) => void

}

const DeleteProjectReminder = ({reminderId, projectId, updateReminders}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [load, setLoad] = useState<boolean>(false)
  
  const {user} = userStore()

  const deleteReminder = async () => { 
    setLoad(true)
      try {
        const {data, status} = await apiBackendUrl.delete(`/project/deleteProjectReminder/${reminderId}/${projectId}/${user?.id}`)
        if(status === 200) { 
            updateReminders(false)
            onClose()
            shootSuccesToast(data)
            setLoad(false)
        }
      } catch (error) {
         handleError(error, setLoad)
      }
  }

  return (
    <>
      <button onClick={onOpen} className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Eliminar recordatorio</ModalHeader>
              <ModalBody>             
              {!load ? 
                <div className="flex items-center justify-center gap-6">
                   <button className="bg-red-600 text-white" onClick={() => deleteReminder()}>Eliminar</button>
                   <button className="bg-blue-600 text-white" onClick={onClose}>Cancelar</button>
                </div> : <SpinnerComponent/>}
             
              </ModalBody>          
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteProjectReminder