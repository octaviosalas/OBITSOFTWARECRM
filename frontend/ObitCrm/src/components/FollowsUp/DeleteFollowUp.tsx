import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import { useState } from "react";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    updateTable: () => void,
    followUpId: number,
    clientId: number
}

const DeleteFollowUp = ({followUpId, clientId, updateTable}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const {user} = userStore()
  const  [load, setLoad] = useState<boolean>(false)

  const deleteFollowUp = async () => { 
    setLoad(true)
    try {
        const {data, status} = await apiBackendUrl.delete(`/client/deleteMyTrackingData/${followUpId}/${clientId}/${user?.id}`)
        if(status === 200) { 
            updateTable()
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
      <button className="btn-action delete" data-client="Cliente A"><i className="fas fa-trash-alt" style={{color:"red"}} onClick={onOpen}></i></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Eliminar seguimiento</ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center">
                <div>
                    <p> ¿Estas seguro de eliminar el seguimiento? </p>
                </div>
               {!load? 
                <div className="flex gap-4 items-center">
                    <button className="delete-icon" onClick={() => deleteFollowUp()}>Eliminar</button> 
                    <button className="btn-btn" onClick={() => onClose()}>Cancelar</button> 
                </div> : 
                <div>
                    <SpinnerComponent/>
                </div>
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteFollowUp
