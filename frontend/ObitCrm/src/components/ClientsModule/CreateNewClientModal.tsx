
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import apiBackendUrl from "../../lib/axiosData";
import { useState } from "react";
import { newClientDataType } from "../../types/Clients";
import handleError from "../../utils/axiosErrorHanlder";

const CreateNewClientModal = () => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [load, setLoad] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [dischargeDate, setDischargeDate] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)
  const [facebook, setFacebook] = useState<string>("")
  const [instagram, setInstagram] = useState<string>("")

  const handleSubmit = async () => { 
    const newClientData : newClientDataType = ({ 
      name: name,
      phone: phone,
      email: email,
      dischargeDate: dischargeDate,
      active: active,
      socialNetworks: {
        facebook: facebook,
        instagram: instagram
      }
    })
    try {
        const {data, status} = await apiBackendUrl.post("/client/createClient", newClientData)
        console.log(status, data)
        if(status === 200) { 
            console.log(data)
        }
      } catch (error) {
        handleError(error, setLoad)
      }
    }

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

                            <button type="submit" onClick={handleSubmit}>Guardar Cliente</button>
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