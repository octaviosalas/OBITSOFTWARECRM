import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles.css"

const SendEmail = () => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  return (
    <>
      <button className="btn-send-email"  onClick={onOpen}> Enviar Email </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="full-screen-section" id="emailSection">
    <div className="form-section">
        <button className="btn-close" id="closeEmailSection" onClick={() => onClose()}>&times;</button>
        <h2>Enviar Email</h2>
        <form id="emailForm">
            <div className="form-group">
                <label >Dirección de Email:</label>
                <input type="email" id="emailTo" name="emailTo" required/>
            </div>
            <div className="form-group">
                <label >Asunto:</label>
                <input type="text" id="emailSubject" name="emailSubject" required/>
            </div>
            <div className="form-group">
                <label >Cuerpo del Email:</label>
                <textarea id="emailBody" name="emailBody" required></textarea>
            </div>
            <div className="form-buttons">
                <button type="submit" className="btn-submit">Enviar</button>
                <button type="button" className="btn-cancel" id="closeEmailSection">Cancelar</button>
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

export default SendEmail