import "./styles.css"
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";

const AddNewAlert = () => { 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

   return ( 
        <> 
        <button className="btn-toggle-tables" onClick={onOpen}>Configurar Alerta</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
            <>
            <ModalBody>
               <div>
                    <form id="alertForm">
                        <h2>Crear Alerta</h2>
                        <div className="form-group mt-4">
                            <label >Tipo de Alerta:</label>
                            <select id="alertType" name="alertType" required>
                                <option value="">Seleccionar</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label >Fecha y Hora:</label>
                            <input type="datetime-local" id="alertDateTime" name="alertDateTime" required/>
                        </div>

                        <div className="form-group">
                            <label >Mensaje de Alerta:</label>
                            <textarea id="alertMessage" name="alertMessage" required></textarea>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="btn-submit">Configurar</button>
                            <button type="button" className="btn-cancel" id="closeAlertSection">Cancelar</button>
                        </div>
                    </form>
               </div>
            </ModalBody>
            </>
            )}
        </ModalContent>
        </Modal>
        </>
   )
}

export default AddNewAlert