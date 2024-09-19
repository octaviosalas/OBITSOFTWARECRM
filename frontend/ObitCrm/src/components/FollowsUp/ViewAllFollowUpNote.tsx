import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { useState } from "react";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    message: string,
    followUpId: number,
    clientId: number,
    updateTable: () => void

}

type newFollowNoteType = { 
  note: string
}

const ViewAllFollowUpNote = ({message, followUpId, clientId, updateTable}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [changeMessage, setChangeMessage] = useState<boolean>(false)
  const [note, setNote] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)
  const {user} = userStore()

  const handleChangeNewNote = (e:React.ChangeEvent<HTMLTextAreaElement>) => { 
     setNote(e.target.value)
  }

    const updateMessage = async () => { 
      const newFollowNote : newFollowNoteType= ({ 
        note: note
      })
      if(note.length === 0) { 
        return shootErrorToast("Debes escribir un mensaje")
      } 
      setLoad(true)
          try {
            const {data, status} = await apiBackendUrl.put(`/client/updateFollowUpMessage/${followUpId}/${clientId}/${user?.id}`, newFollowNote)
            if(status === 200) { 
              onClose()
              updateTable()
              shootSuccesToast(data)
              setLoad(false)
            }
            } catch (error) {
              handleError(error, setLoad)
            }
    }

    const handleClose = () => { 
      onClose()
      setChangeMessage(false)
    }

  return (
    <>
      <p onClick={onOpen} className="cursor-pointer underline font-bold text-xs text-blue-500">Abrir mensaje</p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col items-center mt-2">
                 {!changeMessage ? 
                  <div className=" shadow-lg p-6">
                      <p> {message} </p>
                  </div> :
                     <div className="form-group w-full p-3">
                           <textarea id="clientRef" className="w-full" onChange={handleChangeNewNote}/>
                    </div>}    

                {!load ? 
                  <div className="flex">
                        {!changeMessage ? 
                        <button className="btn-submit"  onClick={() => setChangeMessage(prevState => !prevState)}>Modificar</button> 
                          : 
                        <button className="btn-submit"  onClick={() => updateMessage()}>Confirmar</button>}
                        <button className="btn-cancel" onClick={() => handleClose()}>Cerrar</button>
                  </div> 
                     : 
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

export default ViewAllFollowUpNote