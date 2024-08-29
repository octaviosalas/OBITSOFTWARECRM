import React from "react";
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"

const CreateNewClientModal = () => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>Nuevo</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>     
              <div id="client-form-modal" className="modal">
                    <div className="modal-content">
                        <h2>Crear/Modificar Cliente</h2>
                        <form id="client-form">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" required />
                            
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="text" id="phone" name="phone" required />
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                            
                            <label htmlFor="dischargeDate">Fecha de Creación:</label>
                            <input type="date" id="dischargeDate" name="dischargeDate" required />
                            
                            <label htmlFor="active">Estado:</label>
                            <select id="active" name="active">
                                <option value="activo">Activo</option>
                                <option value="cerrado">Cerrado</option>
                            </select>
                            
                            <label htmlFor="socialNetworks">Redes Sociales:</label>
                            <input type="text" id="socialNetworks" name="socialNetworks" placeholder="Nombre de usuario" />

                            <button type="submit">Guardar Cliente</button>
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

export default CreateNewClientModal