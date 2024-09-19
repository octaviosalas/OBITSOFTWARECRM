import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { useState } from "react";

interface Props { 
    message: string
}

const ViewAllFollowUpNote = ({message}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [changeMessage, setChangeMessage] = useState<boolean>(false)

  return (
    <>
      <p onClick={onOpen} className="cursor-pointer underline font-bold text-blue-500">Ver</p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col items-center mt-2">
                 {!changeMessage ? <p> {message} </p> :
                     <div className="form-group w-full p-3">
                           <textarea id="clientRef" className="w-full"/>
                    </div>}    
                <div className="flex">
                  <button className="btn-submit"  onClick={() => setChangeMessage(prevState => !prevState)}>Modificar</button>
                  <button className="btn-cancel" onClick={() => onClose()}>Cerrar</button>
                </div>           
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewAllFollowUpNote