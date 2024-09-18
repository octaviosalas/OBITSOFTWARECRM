
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import apiBackendUrl from "../../lib/axiosData";
import React, { useState } from "react";
import { newClientDataType } from "../../types/Clients";
import handleError from "../../utils/axiosErrorHanlder";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import SpinnerComponent from "../Spinner/Spinner";
import { userStore } from "../../store/UserAccount";
import QuestionAfterCreationClient from "./QuestionAfterCreationClient";

interface Props { 
  resetTableData: () => void
}

const CreateNewClientModal = ({resetTableData} : Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [size, setSize] = useState<number>()
  const [load, setLoad] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [dischargeDate, setDischargeDate] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)
  const [facebook, setFacebook] = useState<string>("")
  const [instagram, setInstagram] = useState<string>("")
  const [secondStep, setSecondStep] = useState<boolean>(false)
  const [newClientId, setNewClientId] = useState<number>()
  const {user} = userStore()

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
        const {data, status} = await apiBackendUrl.post(`/client/createClient/${user?.id}`, newClientData)
        console.log(status, data)
        if(status === 200) { 
            shootSuccesToast(data.message)
            setLoad(false)
            setSecondStep(true)
            setNewClientId(data.data.id)
        }
      } catch (error) {
        handleError(error, setLoad)
      }
  }

  return (
    <>
      <button onClick={onOpen}>Nuevo Cliente</button>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>     
              <div id="client-form-modal" className="modal">
                     {!secondStep ?
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
                     </div> : 
                       <div className="modal-content">
                          <QuestionAfterCreationClient clientId={newClientId} updateTable={resetTableData} closeModal={onClose}/>
                     </div>
                     }
                </div>    
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewClientModal