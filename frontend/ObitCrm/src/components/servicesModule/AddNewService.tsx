import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles.css"


const AddNewService = () => { 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return ( 
    <>
      <button className="btn-new-service" onClick={onOpen}>Agregar Servicio</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <form id="serviceForm">
                     <h2>Agregar Servicios</h2>
                          <div className="form-group mt-4">
                              <label >Referencia del Cliente:</label>
                              <input type="text" id="clientRef" name="clientRef" required/>
                          </div>

                          <div className="form-group">
                              <label >Referencia al Proyecto:</label>
                              <input type="text" id="projectRef" name="projectRef" required/>
                          </div>

                          <div className="form-group">
                              <label >Tipo de Servicio:</label>
                              <select id="serviceType" name="serviceType" required>
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

export default AddNewService