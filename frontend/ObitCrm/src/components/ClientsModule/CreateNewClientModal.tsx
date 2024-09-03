
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import apiBackendUrl from "../../lib/axiosData";
import React, { useState } from "react";
import { newClientDataType } from "../../types/Clients";
import handleError from "../../utils/axiosErrorHanlder";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
  resetTableData: () => void
}

const CreateNewClientModal = ({resetTableData} : Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [load, setLoad] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [dischargeDate, setDischargeDate] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)
  const [facebook, setFacebook] = useState<string>("")
  const [instagram, setInstagram] = useState<string>("")

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
     setName(e.target.value)
  }

  const handleChangePhone= (e: React.ChangeEvent<HTMLInputElement>) => { 
    setPhone(e.target.value)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setEmail(e.target.value)
  }

  const handleChangeDischargeDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setDischargeDate(e.target.value)
  }

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value) 
    if(e.target.value === "Activo") { 
      setActive(true)
    } else { 
      setActive(false)
    }
  }

  const handleChangeInstagram = (e: React.ChangeEvent<HTMLInputElement>) => { 
   setInstagram(e.target.value)
  }

  const handleChangeFacebook = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setFacebook(e.target.value)
  }

  const handleSubmit = async (event: any) => { 
    setLoad(true)
    event.preventDefault()
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
    console.log(newClientData)
    try {
        const {data, status} = await apiBackendUrl.post("/client/createClient", newClientData)
        console.log(status, data)
        if(status === 200) { 
            resetTableData()
            shootSuccesToast(data)
            setLoad(false)
            onClose()
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
                            <input type="text" id="name" name="name" required onChange={handleChangeName}/>
                            
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="text" id="phone" name="phone" required onChange={handleChangePhone}/>
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required onChange={handleChangeEmail}/>
                            
                            <label htmlFor="dischargeDate">Fecha de Creación:</label>
                            <input type="date" id="dischargeDate" name="dischargeDate" required onChange={handleChangeDischargeDate}/>
                            
                            <label htmlFor="active">Estado:</label>
                            <select id="active" name="active" onChange={handleChangeStatus}>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                            
                            <label htmlFor="socialNetworks">Instagram</label>
                            <input type="text" id="instagram" name="instagram" placeholder="Nombre de usuario" onChange={handleChangeInstagram}/>

                            <label htmlFor="socialNetworks">Facebook</label>
                            <input type="text" id="facebook" name="facebook" placeholder="Nombre de usuario" onChange={handleChangeFacebook}/>

                            {!load  ? <button type="submit" onClick={handleSubmit}>Guardar Cliente</button> : <SpinnerComponent/>}
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