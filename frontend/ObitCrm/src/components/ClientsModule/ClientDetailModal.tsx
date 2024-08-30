
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
                           <div className="flex justify-betweem">
                              <h2>Detalles del Cliente</h2>
                              <span className="edit-icon">✎</span>
                           </div>                
                            <form id="client-form" className="mt-4">
                                  <p><strong>Nombre:</strong> Cliente A</p>
                                  <p><strong>Teléfono:</strong> (123) 456-7890</p>
                                  <p><strong>Email:</strong> clientea@example.com</p>
                                  <p><strong>Fecha de Creación:</strong> 2024-08-01</p>
                                  <p><strong>Estado:</strong> Activo</p>
                                  <p><strong>Redes Sociales:</strong> Instagram</p>
                                    <div className="flex items-center gap-2 mt-4">
                                      <button className="mt-2">Ir a Proyectos</button>
                                      <button className="mt-2">Ir a Seguimientos</button>
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

export default ClientDetailModal