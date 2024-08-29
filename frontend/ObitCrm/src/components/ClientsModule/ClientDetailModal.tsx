
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"

const ClientDetailModal = () => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <button className="btn-btn" onClick={onOpen}>Detalle</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                
                <div id="details-modal" className="modal">
                        <div  className="modal-content">
                            <span className="close-button" onClick={() => onClose()}>&times;</span>
                            <h2>Detalles del Cliente</h2>
                            <form id="client-form">
                            <p><strong>Nombre:</strong> Cliente A <span className="edit-icon">✎</span></p>
                            <p><strong>Teléfono:</strong> (123) 456-7890</p>
                            <p><strong>Email:</strong> clientea@example.com</p>
                            <p><strong>Fecha de Creación:</strong> 2024-08-01</p>
                            <p><strong>Estado:</strong> Activo</p>
                            <p><strong>Redes Sociales:</strong> Instagram</p>
                            <button className="mt-2">Ir a Proyectos</button>
                            <button className="mt-1">Ir a Seguimientos</button>
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

export default ClientDetailModal