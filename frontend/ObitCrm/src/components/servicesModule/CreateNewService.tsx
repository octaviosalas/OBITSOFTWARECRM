import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import { useState } from "react";
import apiBackendUrl from "../../lib/axiosData";
import handleError from "../../utils/axiosErrorHanlder";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import SpinnerComponent from "../Spinner/Spinner";

type newServiceType = { 
    name: string
}

const CreateNewService = () => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [serviceName, setServiceName] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)


  const handleChangeServiceName = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const service = e.target.value
    setServiceName(service)
  }

  const createNewServiceNow = async () => { 
    setLoad(true)
    const newData : newServiceType = ({ 
        name: serviceName
    })
    try {
         const {data, status} = await apiBackendUrl.post("/service/createService", newData)
         if(status === 200) { 
            setLoad(false)
            onClose()
            shootSuccesToast(data)
            setServiceName("")
         }
    } catch (error) {
        setServiceName("")
        handleError(error, setLoad)
    }
  }

  return (
    <>
        <button className="btn-configure-alert" onClick={onOpen}>Añadir Nuevo Servicio</button>     
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                            <form id="serviceForm">
                                <div className="form-group mt-4">
                                    <h2>Agregar Servicios</h2>
                                    <div className="form-group mt-4">
                                        <label >Nombre del Servicio</label>
                                        <input type="text" id="clientRef" name="clientRef" required  onChange={handleChangeServiceName} value={serviceName}/>                                
                                   </div>
                                </div> 
                                {!load ? 
                                <div className="form-buttons">
                                    <button type="submit" className="btn-submit" onClick={() => createNewServiceNow()}>Guardar</button>
                                    <button type="button" className="btn-cancel" id="closeServiceSection" onClick={onClose}>Cancelar</button>
                                </div> : 
                                <div className="flex items-center justify-center mt-2 mb-2">
                                   <SpinnerComponent/>
                                </div>
                                }
                            </form>

              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewService
