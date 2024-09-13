import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import { UnifiedProjectType } from "../../types/Services"
import { useState } from "react";

interface Props { 
    servicesData: UnifiedProjectType 
}

const EditService = ({servicesData}: Props) => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [serviceType, setServiceType] = useState<string>(servicesData.projectData.services[0].service.name);


    const handleOpen = () => { 
        onOpen()
        console.log(servicesData)
    }


  return ( 
    <>
      <button className="btn-action edit"  onClick={handleOpen}><i className="fas fa-pencil-alt"></i></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <form id="serviceForm">
                     <h2>Editar Servicio</h2>
                          <div className="form-group mt-4">
                              <label >Referencia del Cliente:</label>
                              <input type="text" id="clientRef" name="clientRef" className="bg-gray-200" value={servicesData.projectData.clientData.name} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Referencia al Proyecto:</label>
                              <input type="text" id="projectRef" name="projectRef" className="bg-gray-200" value={servicesData.projectData.name} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Tipo de Servicio:</label>
                              <select id="serviceType" name="serviceType" required value={serviceType}>
                                  <option value="">Seleccionar</option>
                                  <option value="Tipo1">Tipo 1</option>
                                  <option value="Tipo2">Tipo 2</option>                            
                              </select>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Contratación:</label>
                              <input type="date" id="contractDate" name="contractDate" required/>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Renovación:</label>
                              <input type="date" id="renewalDate" name="renewalDate" required/>
                          </div>

                          <div className="form-group">
                              <label> Monto: </label>
                              <input type="number" id="amount" name="amount" step="0.01" required/>
                          </div>

                          <div className="form-buttons">
                              <button type="submit" className="btn-submit">Guardar</button>
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

export default EditService