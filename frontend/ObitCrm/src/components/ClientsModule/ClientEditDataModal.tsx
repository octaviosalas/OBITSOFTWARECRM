import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { clientPersonalDataType } from "../../types/Clients";
import "./styles/clientModule.css"
import React, { useState } from "react";
import { formatDateInputElement } from "../../utils/transformDate";
import apiBackendUrl from "../../lib/axiosData";
import handleError from "../../utils/axiosErrorHanlder";

interface Props { 
    clientData: clientPersonalDataType |  undefined,
    resetTable: () => void
}

interface clientNewData  { 
    name: string | undefined;
    phone: string | undefined, 
    email: string | undefined,
    dischargeDate: string | undefined,
    socialNetworks: {
        "instagram": string | undefined,
        "facebook": string | undefined
    },
    active: boolean | undefined
}

const ClientEditDataModal = ({clientData, resetTable}: Props) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [load, setLoad] = useState<boolean>(false)
    const [clientName, setClientName] = useState<string | undefined>(clientData?.name)
    const [clientPhone, setClientPhone] = useState<string | undefined>(clientData?.phone)
    const [clientEmail, setClientEmail] = useState<string | undefined>(clientData?.email)
    const [clientDischargeDate, setClientDischargeDate] = useState<string | undefined>(clientData?.dischargeDate)
    const [clientInstagram, setClientInstagram] = useState<string | undefined >(clientData?.socialNetworks.instagram)
    const [clientFacebook, setClientFacebook] = useState<string | undefined >(clientData?.socialNetworks.facebook)
    const [clientStatus, setClientStatus] = useState<boolean | undefined >(clientData?.active)

        const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientName(e.target.value)
        }

        const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientPhone(e.target.value)
        }

        const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientEmail(e.target.value)
        }

        const handleChangeDischargeDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientDischargeDate(e.target.value)
        }

        const handleChangeStatus= (e: React.ChangeEvent<HTMLSelectElement>) => { 
            if(e.target.value === "activo") { 
                setClientStatus(true)
            } else { 
                setClientStatus(false)
            }
        }

        const handleChangeInstagram= (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientInstagram(e.target.value)
        }

        const handleChangeFacebook = (e: React.ChangeEvent<HTMLInputElement>) => { 
            setClientFacebook(e.target.value)
        }

        const handleSubmit = async (event : any) => { 
            event.preventDefault();
            setLoad(false)
            const updatedData : clientNewData = ({ 
                 name: clientName,
                 phone: clientPhone,
                 email: clientEmail,
                 dischargeDate: clientDischargeDate,
                 socialNetworks: {
                    "instagram": clientInstagram,
                    "facebook": clientFacebook
                 },
                 active: clientStatus
            })
            try {
                const {data, status} = await apiBackendUrl.put(`/client/updateClientData/${clientData?.id}`, updatedData)
                console.log(data, status)
                if(status === 200) { 
                    resetTable()
                    console.log(data)
                    setLoad(false)
                    onClose()
                }
            } catch (error) {
                handleError(error, setLoad)
            }
        }


  return (
    <>

       <span className="edit-icon" onClick={onOpen}>✎</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-h-[600px] 2xl:max-h-[800px] 2xl:h-full overflow-y-auto">
        <ModalContent>
          {(onClose) => (
            <>     
              <div id="client-form-modal" className="modal" >
                    <div className="modal-content">
                        <h2>Modificar Datos Cliente</h2>
                        <form id="client-form">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" required  value={clientName} onChange={handleChangeName}/>
                            
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="text" id="phone" name="phone" required value={clientPhone} onChange={handleChangePhone}/>
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required value={clientEmail} onChange={handleChangeEmail}/>
                            
                            <label htmlFor="dischargeDate">Fecha de Creación:</label>
                            <input type="date" id="dischargeDate" name="dischargeDate" required value={formatDateInputElement(clientDischargeDate)} onChange={handleChangeDischargeDate}/>
                            
                            <label htmlFor="active">Estado:</label>
                            <select id="active" name="active" onChange={handleChangeStatus}>
                                <option value="activo">Activo</option>
                                <option value="cerrado">Inactivo</option>
                            </select>
                             
                            <label htmlFor="socialNetworks">Instagram</label>
                            <input type="text" id="socialNetworks" name="socialNetworks" placeholder="Nombre de usuario" value={clientInstagram} onChange={handleChangeInstagram}/>

                            <label htmlFor="socialNetworks">Facebook</label>
                            <input type="text" id="socialNetworks" name="socialNetworks" placeholder="Nombre de usuario" value={clientFacebook} onChange={handleChangeFacebook}/>

                            <button type="submit" onClick={handleSubmit}>Guardar Cliente</button>
                        </form>
                    </div>
                </div>    
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ClientEditDataModal


