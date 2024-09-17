import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles.css"

const AddNewFollowUp = () => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  return (
    <>
      <button className="btn-new-tracking" id="openTrackingSection" onClick={onOpen}> Agregar Seguimiento </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="full-screen-section" id="trackingSection">
                    <div className="form-section">
                        <button className="btn-close" id="closeTrackingSection" onClick={() => onClose()}>&times;</button>
                        <h2>Agregar/Editar Seguimiento</h2>
                        <form id="trackingForm">
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Referencia al Cliente:</label>
                                        <input type="text" id="clientRef" name="clientRef" required/>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Última Comunicación (Fecha):</label>
                                        <input type="date" id="lastCommDate" name="lastCommDate" required/>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Próxima Comunicación (Fecha):</label>
                                        <input type="date" id="nextCommDate" name="nextCommDate" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Última Comunicación (Detalles):</label>
                                        <textarea id="lastCommDetails" name="lastCommDetails"></textarea>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Próxima Comunicación (Detalles):</label>
                                        <textarea id="nextCommDetails" name="nextCommDetails"></textarea>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Información Adicional:</label>
                                        <textarea id="additionalInfo" name="additionalInfo"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Emails:</label>
                                        <a href="#" className="open-email-modal">Ver Emails</a>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Histórico de Comunicaciones:</label>
                                        <a href="#" className="open-history-modal">Ver Histórico</a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn-submit">Guardar</button>
                                <button type="button" className="btn-cancel" id="closeTrackingSection">Cancelar</button>
                            </div>
                        </form>
                    </div>
               </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewFollowUp